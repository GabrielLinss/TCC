'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Room extends Model {
    block () {
        return this.belongsTo('App/Models/Block')
    }
}

module.exports = Room
