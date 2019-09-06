'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BlockSchema extends Schema {
  up () {
    this.create('blocks', (table) => {
      table.increments()
      table.string('name')
      table.integer('number')
      table.boolean('available').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('blocks')
  }
}

module.exports = BlockSchema
