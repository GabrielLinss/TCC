'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/auth/src/Schemes/Jwt')} Auth */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const UserAccessHistory = use('App/Models/UserAccessHistory')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const PasswordReset = use('App/Models/PasswordReset')
/** @type {typeof import('@adonisjs/validator/src/Validator')} */
const { validateAll } = use('Validator')
/** @type {typeof import('@adonisjs/framework/src/Encryption')} */
const Encryption = use('Encryption')

/**
 * Resourceful controller for interacting with authentication
 */
class AuthController {
    /**
     * Register.
     * POST register
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {Auth} ctx.auth
     */
    async register ({ request, response, auth }) {
      const { user_type } = request.get()
      const data = request.only(['username', 'email', 'password', 'password_confirmation'])

      const validation = await validateAll(data, {
          username: 'required',
          email: 'required|email|unique:users',
          password: 'required',
          password_confirmation: 'required_if:password|same:password'
      }, {
          'username.required': 'nome do usuário é obrigatório',
          'email.required': 'email é obrigatório',
          'email.email': 'formato de email inválido',
          'email.unique': 'este email já está em uso',
          'password.required': 'senha é obrigatória',
          'password_confirmation.required_if': 'confirmação de senha é obrigatória',
          'password_confirmation.same': 'as senhas não são iguais',
      })

      if (validation.fails()) return response.status(400).json(validation.messages())

      delete data.password_confirmation

      data.role_id = parseInt(user_type)

      const user = await User.create(data)
      if (!user) return response.status(400).json([{ message: 'Erro ao realizar cadastro' }])

      const token = await auth.withRefreshToken().attempt(data.email, data.password)
      return response.status(201).json({ token, user })
    }

    /**
     * Login.
     * POST login
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {Auth} ctx.auth
     */
    async login({ auth, request, response }) {
        const data = request.only(['email', 'password'])

        const validation = await validateAll(data, {
          email: 'required|email',
          password: 'required'
        }, {
          'email.required': 'email é obrigatório',
          'email.email': 'formato de email inválido',
          'password.required': 'senha é obrigatória'
        })

        if (validation.fails()) return response.status(400).json(validation.messages())

        const user = await User.findBy('email', data.email)
        if (!user) return response.status(404).json([{ message: 'Email não encontrado' }])

        const token = await auth.withRefreshToken().attempt(user.email, data.password)

        await UserAccessHistory.create({ user_id: user.id })

        return { ...token, user }
    }

    /**
     * Logout.
     * POST logout
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {Auth} ctx.auth
     */
    async logout({ auth, request, response }) {
      const user = await auth.getUser()
      const refreshToken = request.header('x-refresh-token')
      const refreshTokenDecrypt = Encryption.decrypt(refreshToken)

      await user
        .tokens()
        .where('token', refreshTokenDecrypt)
        .update({ is_revoked: true })

      return response.json([{ message: 'Logout com sucesso.' }])
    }

    /**
     * Forgot password.
     * POST forgotPassword
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async forgotPassword ({ request, response }) {
        const data = request.only(['email'])

        const validation = await validateAll(data, {
          email: 'required|email'
        }, {
          'email.required': 'email é obrigatório',
          'email.email': 'formato de email inválido'
        })

        if (validation.fails()) return response.status(400).json(validation.messages())

        const user = await User.findBy('email', data.email)
        if (!user) return response.status(404).json([{ message: 'Usuário não encontrado' }])

        if (user.blocked) return response.status(403).json([{ message: 'Esta conta está bloqueada' }])

        const token = Math.floor(100000 + Math.random() * 900000)
        await PasswordReset.create({ email: data.email, token })

        await Mail.send('emails.forgotPassword', { token: token }, (message) => {
          message
            .to(data.email)
            .from('suporte@allocate.com.br')
            .subject('Recuperar Senha - Allocate')
        })

        return response.json([{ message: 'Email enviado com sucesso' }])
    }

    /**
     * Reset password.
     * POST resetPassword
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async resetPassword ({ request, response }) {
        const data = request.only(['email', 'token', 'password', 'password_confirmation'])

        const validation = await validateAll(data, {
          email: 'required|email',
          token: 'required',
          password: 'required',
          password_confirmation: 'required_if:password|same:password'
        }, {
          'email.required': 'email é obrigatório',
          'email.email': 'formato de email inválido',
          'token.required': 'token é obrigatório',
          'password.required': 'senha é obrigatória',
          'password_confirmation.required_if': 'confirmação de senha é obrigatória',
          'password_confirmation.same': 'as senhas não são iguais'
        })

        if (validation.fails()) return response.status(400).json(validation.messages())

        delete data.password_confirmation

        const password_resets = await Database.select('*').table('password_resets').where('token', data.token).where('email', data.email).orderBy('id', 'desc')
        const password_reset = password_resets[0]
        if (!password_reset) return response.status(400).json([{ message: 'Email ou token inválido' }])

        const user = await User.findBy('email', data.email)
        if (!user) response.status(404).json([{ message: `Usuário não encontrado` }])

        user.merge({ password: data.password })
        await user.save()

        await Database.table('password_resets').where('token', data.token).where('email', data.email).delete()
        return response.json([{ message: 'Senha atualizada' }])
    }
}

module.exports = AuthController
