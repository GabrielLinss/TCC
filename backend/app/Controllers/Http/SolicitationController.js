'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Solicitation = use('App/Models/Solicitation')

class SolicitationController {
  /**
   * Show a list of all solicitations.
   * GET solicitations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request }) {
    const { user_id, approved } = request.get()

    const query = Solicitation.query()

    if (user_id) query.where('user_id', user_id)
    if (approved == 'false') query.where('approved', 0)

    query.with('room.block')
    query.with('user')

    return await query.fetch()
  }

  /**
   * Create/save a new solicitation.
   * POST solicitations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const data = request.post()

    const exists = await Solicitation.query()
                                    .where('room_id', data.room_id)
                                    .where('start_at', data.start_at)
                                    .where('end_at', data.end_at)
                                    .first()

    if (exists) return response.status(400).json([{ message: 'Já existe uma reserva com esta sala neste horário' }])

    data.user_id = auth.user.id

    const solicitation = await Solicitation.create(data)
    if (!solicitation) return response.status(400).json([{ message: 'Erro ao fazer solicitação de sala' }])

    return response.status(201).json(solicitation)
  }

  /**
   * Update a solicitation.
   * PUT solicitations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const solicitation = await Solicitation.find(params.id)
    if (!solicitation) return response.status(404).json([{ message: 'Solicitação não encontrada' }])

    const data = request.only(['approved'])

    solicitation.merge(data)
    await solicitation.save()

    return response.json(solicitation)
  }

  /**
   * Delete a solicitation.
   * DELETE solicitations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const solicitation = await Solicitation.find(params.id)
    if (!solicitation) return response.status(404).json([{ message: 'Solicitação não encontrada' }])

    await solicitation.delete()

    return response.noContent()
  }
}

module.exports = SolicitationController
