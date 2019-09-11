'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Block extends Model {
    rooms () {
        return this.hasMany('App/Models/Room')
    }
}

module.exports = Block
