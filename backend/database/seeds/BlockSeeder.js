'use strict'

/*
|--------------------------------------------------------------------------
| BlockSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
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
