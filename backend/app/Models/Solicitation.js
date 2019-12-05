'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const moment = require('moment')

class Solicitation extends Model {
  room () {
		return this.belongsTo('App/Models/Room')
	}

	user () {
		return this.belongsTo('App/Models/User')
  }

  getStartAt(date) {
    if(!date)
      return date

    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  }

  getEndAt(date) {
    if(!date)
      return date

    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  }
}

module.exports = Solicitation
