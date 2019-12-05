'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
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
