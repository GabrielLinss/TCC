'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAccessHistorySchema extends Schema {
  up () {
    this.create('user_access_histories', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_access_histories')
  }
}

module.exports = UserAccessHistorySchema
