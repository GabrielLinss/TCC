'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Block = use('App/Models/Block')

/**
 * Resourceful controller for interacting with blocks
 */
class BlockController {
  /**
   * Show a list of all blocks.
   * GET blocks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request }) {
    const { page, limit } = request.get()
    const query = Block.query()
    query.with('rooms')

    return await query.paginate(page || 1, limit || 5)
  }

  /**
   * Create/save a new block.
   * POST blocks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.post()
    const block = await Block.create(data)
    if (!block) return response.status(400).json([{ message: 'Erro ao cadastrar bloco' }])

    return response.json(block)
  }

  /**
   * Display a single block.
   * GET blocks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    const block = await Block.query().where('id', params.id).with('rooms').first()
    if (!block) return response.status(404).json([{ message: 'Bloco não encontrado' }])

    return response.json(block)
  }

  /**
   * Update block details.
   * PUT or PATCH blocks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const block = await Block.findBy('id', params.id)
    if (!block) return response.status(404).json([{ message: 'Bloco não encontrado' }])

    const data = request.only(['name', 'available'])
    await block.merge(data)
    await block.save()

    return response.json(block)
  }

  /**
   * Delete a block with id.
   * DELETE blocks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const block = await Block.findBy('id', params.id)
    if (!block) return response.status(404).json([{ message: 'Bloco não encontrado' }])

    await block.delete()

    return response.noContent()
  }
}

module.exports = BlockController
