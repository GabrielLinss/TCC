'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReservationSchema extends Schema {
  up () {
    this.table('reservations', (table) => {
      table.string('day')
    })
  }

  down () {
    this.table('reservations', (table) => {
      table.dropColumn('day')
    })
  }
}

module.exports = ReservationSchema
