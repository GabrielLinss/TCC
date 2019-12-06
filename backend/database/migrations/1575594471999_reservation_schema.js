'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReservationSchema extends Schema {
  up () {
    this.table('reservations', (table) => {
      table.string('teacher')
    })
  }

  down () {
    this.table('reservations', (table) => {
      table.dropColumn('teacher')
    })
  }
}

module.exports = ReservationSchema
