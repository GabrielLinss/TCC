import React, { Component, Fragment } from 'react'
import Navbar from '../../components/navbar'
import api from '../../services/api'
import Card from '../../components/card'
import { getUserId } from '../../services/auth'

export default class App extends Component {
  state = {
    rooms: [],
    reservations: []
  }

  loadRooms = async () => {
    const response = await api.get('rooms')

    this.setState({ rooms: response.data.data })
  }

  loadReservations = async () => {
    let user_id = getUserId()
    user_id = parseInt(user_id)

    const response = await api.get(`reservations?user_id=${user_id}`)

    this.setState({ reservations: response.data })
  }

  componentDidMount () {
    this.loadRooms()
    this.loadReservations()
  }

  render() {
    return (
      <Fragment>
        <Navbar />
        <br/>
        
        <div className="container">
          <div className="row">
            <div className="col-md-12">
                <h1>Salas reservadas</h1>
            </div>
          </div>

          <div className="row">
            { this.state.reservations.length === 0 ? 
            <div className="col-md-12">
                <h5>Nenhuma reserva.</h5>
            </div>
            : this.state.reservations.map(room => (
                <div className="col-md-3 col-xs-12 col-sm-6" key={room.id}>
                    <Card link={`http://${window.location.host}/room/${room.id}`} buttonName="Cancelar" name={room.name} number={room.number} capacity={room.capacity} blockName={room.block.name} blockNumber={room.block.number} available={room.available} />
                </div>
            )) }
          </div>

          <div className="row">
            <div className="col-md-12">
                <h1>Salas disponíveis</h1>
            </div>
          </div>

          <div className="row">
            { this.state.rooms.map(room => (
                <div className="col-md-3 col-xs-12 col-sm-6" key={room.id}>
                    <Card link={`http://${window.location.host}/room/${room.id}`} buttonName="Reservar" name={room.name} number={room.number} capacity={room.capacity} blockName={room.block.name} blockNumber={room.block.number} available={room.available} />
                </div>
            )) }
          </div>
        </div>
      </Fragment>
    )
  }
}
