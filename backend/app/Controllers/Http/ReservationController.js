'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Reservation = use('App/Models/Reservation')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Solicitation = use('App/Models/Solicitation')

/**
 * Resourceful controller for interacting with reservations
 */
class ReservationController {
  /**
   * Show a list of all reservations.
   * GET reservations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request }) {
    const { user_id, withDay } = request.get()

    const query = Reservation.query()
    if (user_id) query.where('user_id', user_id)

    if (withDay == 'true') {
      query.whereNotNull('day')
    } else if (withDay == 'false') {
      query.whereNull('day')
    }

    query.with('room.block')
    query.with('user')

    return await query.fetch()
  }

  /**
   * Create/save a new reservation.
   * POST reservations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.post()

    let exists

    if (data.start_at && data.end_at) {
      exists = await Reservation.query()
                                    .where('room_id', data.room_id)
                                    .where('start_at', data.start_at)
                                    .where('end_at', data.end_at)
                                    .first()

      if (exists) return response.status(400).json([{ message: 'Já existe uma reserva com esta sala neste horário' }])
    } else if (data.allocation_hour) {
      exists = await Reservation.query()
                                    .where('room_id', data.room_id)
                                    .where('allocation_hour', data.allocation_hour)
                                    .where('day', data.day)
                                    .first()

      if (exists) return response.status(400).json([{ message: 'Já existe uma alocação para esta sala neste horário' }])
    }

    const reservation = await Reservation.create(data)
    if (!reservation) return response.status(400).json([{ message: 'Erro ao fazer reserva' }])

    return response.status(201).json(reservation)
  }

  /**
   * Display a single reservation.
   * GET reservations/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    const reservation = await Reservation.query().where('id', params.id).first()
    if (!reservation) return response.status(404).json([{ message: 'Reserva não encontrada' }])

    return response.json(reservation)
  }

  /**
   * Update reservation details.
   * PUT or PATCH reservations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const reservation = await Reservation.query().where('id', params.id).first()
    if (!reservation) return response.status(404).json([{ message: 'Reserva não encontrada' }])

    const data = request.only(['discipline'])

    reservation.merge(data)
    await reservation.save()

    return response.json(reservation)
  }

  /**
   * Delete a reservation with id.
   * DELETE reservations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const reservation = await Reservation.query().where('id', params.id).first()
    if (!reservation) return response.status(404).json([{ message: 'Reserva não encontrada' }])

    await reservation.delete()

    return response.noContent()
  }
}

module.exports = ReservationController
