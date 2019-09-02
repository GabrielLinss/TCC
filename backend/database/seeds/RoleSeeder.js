'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Role = use('App/Models/Role')

class RoleSeeder {
  async run () {
    await Role.create({ name: 'Student' })
    await Role.create({ name: 'Teacher' })
    await Role.create({ name: 'Server' })
    await Role.create({ name: 'Adm' })
    await Role.create({ name: 'Adm_Master' })
  }
}

module.exports = RoleSeeder
