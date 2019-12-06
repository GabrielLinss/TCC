'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request }) {
    const { role_id } = request.get()
    const query = User.query()

    if (role_id) {
      query.whereIn('role_id', [5, role_id])
    }

    return await query.fetch()
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.post()
    const user = await User.create(data)
    if (!user) return response.status(400).json([{ message: 'Erro ao cadastrar usuário' }])

    return response.json(user)
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    const user = await User.query().where('id', params.id).with('useraccesshistories').first()
    if (!user) return response.status(404).json([{ message: 'Usuário não encontrado' }])

    return response.json(user)
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const user = await User.findBy('id', params.id)
    if (!user) return response.status(404).json([{ message: 'Usuário não encontrado' }])

    const data = request.only(['name', 'email'])
    await user.merge(data)
    await user.save()

    return response.json(user)
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const user = await User.findBy('id', params.id)
    if (!user) return response.status(404).json([{ message: 'Usuário não encontrado' }])

    await user.delete()

    return response.noContent()
  }
}

module.exports = UserController
