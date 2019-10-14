'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoomSchema extends Schema {
  up () {
    this.table('rooms', (table) => {
      table.integer('block_id').unsigned().references('id').inTable('blocks').onDelete('SET NULL')
    })
  }

  down () {
    this.table('rooms', (table) => {
      // reverse alternations
    })
  }
}

module.exports = RoomSchema
