'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoomSchema extends Schema {
  up () {
    this.create('rooms', (table) => {
      table.increments()
      table.integer('block_id').unsigned().references('id').inTable('blocks').onDelete('SET NULL')
      table.string('name')
      table.integer('number')
      table.integer('capacity')
      table.boolean('available').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('rooms')
  }
}

module.exports = RoomSchema
