'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Room = use('App/Models/Room')

/**
 * Resourceful controller for interacting with rooms
 */
class RoomController {
  /**
   * Show a list of all rooms.
   * GET rooms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request }) {
    const { page, limit } = request.get()
    const query = Room.query()
    query.with('block')

    return await query.paginate(page || 1, limit || 5)
  }

  /**
   * Create/save a new room.
   * POST rooms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.post()
    const room = await Room.create(data)
    if (!room) return response.status(400).json([{ message: 'Erro ao cadastrar sala' }])

    return response.json(room)
  }

  /**
   * Display a single room.
   * GET rooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    const room = await Room.query().where('id', params.id).with('block').first()
    if (!room) return response.status(404).json([{ message: 'Sala não encontrada' }])

    return response.json(room)
  }

  /**
   * Update room details.
   * PUT or PATCH rooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const room = await Room.findBy('id', params.id)
    if (!room) return response.status(404).json([{ message: 'Sala não encontrada' }])

    const data = request.only(['name', 'fk_block_id', 'available', 'capacity', 'number'])
    await room.merge(data)
    await room.save()

    return response.json(room)
  }

  /**
   * Delete a room with id.
   * DELETE rooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const room = await Room.findBy('id', params.id)
    if (!room) return response.status(404).json([{ message: 'Sala não encontrada' }])

    await room.delete()

    return response.noContent()
  }
}

module.exports = RoomController
