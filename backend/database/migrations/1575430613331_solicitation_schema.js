'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SolicitationSchema extends Schema {
  up () {
    this.table('solicitations', (table) => {
      table.string('discipline')
    })
  }

  down () {
    this.table('solicitations', (table) => {
      table.dropColumn('discipline')
    })
  }
}

module.exports = SolicitationSchema
