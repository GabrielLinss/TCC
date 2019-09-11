'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const User = use('App/Models/User')
const UserAccessHistory = use('App/Models/UserAccessHistory')

/**
 * Resourceful controller for interacting with authentication
 */
class AuthController {
    /**
     * Login.
     * POST login
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async login({ auth, request, response }) {
        const data = request.only(['email', 'password'])

        const user = await User.findBy('email', data.email)
        if (!user) return response.status(404).json([{ message: 'Email não encontrado' }])

        const token = await auth.withRefreshToken().attempt(user.email, data.password)

        await UserAccessHistory.create({ user_id: user.id })

        return { ...token, user }
    }
}

module.exports = AuthController
