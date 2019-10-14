'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReservationSchema extends Schema {
  up () {
    this.create('reservations', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade')
      table.integer('room_id').unsigned().references('id').inTable('rooms').onDelete('SET NULL')
      table.datetime('start_at')
      table.datetime('end_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('reservations')
  }
}

module.exports = ReservationSchema
