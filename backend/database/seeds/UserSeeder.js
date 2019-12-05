'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    await User.create({ username: 'Admin', email: 'admin@admin.com', password: 'admin!@#123...', role_id: 5 })
  }
}

module.exports = UserSeeder
