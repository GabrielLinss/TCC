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
    await Role.create({ type: 'Student' })
    await Role.create({ type: 'Teacher' })
    await Role.create({ type: 'Server' })
    await Role.create({ type: 'Adm' })
    await Role.create({ type: 'Adm_Master' })
  }
}

module.exports = RoleSeeder
