'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Block = use('App/Models/Block')

class BlockSeeder {
  async run () {
    await Block.create({ name: 'Bloco', number: 1 })
    await Block.create({ name: 'Bloco', number: 2 })
    await Block.create({ name: 'Bloco', number: 3 })
    await Block.create({ name: 'Bloco', number: 4 })
  }
}

module.exports = BlockSeeder
