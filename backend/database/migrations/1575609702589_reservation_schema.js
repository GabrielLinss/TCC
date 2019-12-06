'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReservationSchema extends Schema {
  up () {
    this.table('reservations', (table) => {
      table.string('allocation_hour')
    })
  }

  down () {
    this.table('reservations', (table) => {
      table.dropColumn('allocation_hour')
    })
  }
}

module.exports = ReservationSchema
