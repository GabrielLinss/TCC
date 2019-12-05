import React, { Component, Fragment } from 'react'
import Navbar from '../../components/navbar'
import api from '../../services/api'
import Card from '../../components/card'
import { getUserId, getUserRole } from '../../services/auth'

export default class App extends Component {
  state = {
    rooms: [],
    reservations: [],
    solicitations: [],
    error: ''
  }

  loadRooms = async () => {
    const response = await api.get('rooms')

    this.setState({ rooms: response.data.data })
  }

  loadReservations = async () => {
    let response

    if (getUserRole() === '5') {
      response = await api.get(`reservations`)
    } else {
      let user_id = getUserId()
      user_id = parseInt(user_id)

      response = await api.get(`reservations?user_id=${user_id}`)
    }

    this.setState({ reservations: response.data })
  }

  loadSolicitations = async () => {
    let response

    if (getUserRole() === '5') {
      response = await api.get(`solicitations?approved=false`)
    } else {
      let user_id = getUserId()
      user_id = parseInt(user_id)

      response = await api.get(`solicitations?approved=false&user_id=${user_id}`)
    }

    this.setState({ solicitations: response.data })
  }

  componentDidMount () {
    this.loadRooms()
    this.loadReservations()
    this.loadSolicitations()
  }

  cancelReservation = async (reservationId) => {
    try {
      const response = await api.delete(`reservations/${reservationId}`)

      if (response.status === 204) this.loadReservations()
    } catch (err) {
      this.setState({ error: err.response.data[0].message })
    }
  }

  cancelSolicitation = async (solicitationId) => {
    try {
      const response = await api.delete(`solicitations/${solicitationId}`)

      if (response.status === 204) this.loadSolicitations()
    } catch (err) {
      this.setState({ error: err.response.data[0].message })
    }
  }

  aproveSolicitation = async (solicitationId) => {
    try {
      const response = await api.put(`solicitations/${solicitationId}`, { approved: true })
      const solicitation = response.data

      delete solicitation.id
      delete solicitation.approved
      delete solicitation.created_at
      delete solicitation.updated_at

      const response2 = await api.post('reservations', solicitation)

      if (response.status === 200 && response2.status === 201) {
        this.loadSolicitations()
        this.loadReservations()
      }
    } catch (err) {
      this.setState({ error: err.response.data[0].message })
    }
  }

  render() {
    return (
      <Fragment>
        <Navbar page="Dashboard" />
        <br/>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
                <h1>Solicitações de reserva</h1>
            </div>
          </div>

          <div className="row">
            { this.state.solicitations.length === 0 ?
            <div className="col-md-12">
                <h5>Nenhuma solicitação.</h5>
            </div>
            : this.state.solicitations.map(solicitation => (
                <div className="col-md-3 col-xs-12 col-sm-6" key={solicitation.id}>
                  { getUserRole() == '5' ?
                    <Card
                      link=""
                      cancel={() => this.cancelSolicitation(solicitation.id)}
                      aprove={() => this.aproveSolicitation(solicitation.id)}
                      buttonName="Cancelar"
                      name={solicitation.room.name}
                      number={solicitation.room.number}
                      capacity={solicitation.room.capacity}
                      blockName={solicitation.room.block.name}
                      blockNumber={solicitation.room.block.number}
                      available={solicitation.room.available}
                      teacher={solicitation.user.username}
                      discipline={solicitation.discipline}
                      startAt={solicitation.start_at}
                      endAt={solicitation.end_at}
                    />
                  :
                    <Card
                      link=""
                      cancel={() => this.cancelSolicitation(solicitation.id)}
                      buttonName="Cancelar"
                      name={solicitation.room.name}
                      number={solicitation.room.number}
                      capacity={solicitation.room.capacity}
                      blockName={solicitation.room.block.name}
                      blockNumber={solicitation.room.block.number}
                      available={solicitation.room.available}
                      teacher={solicitation.user.username}
                      discipline={solicitation.discipline}
                      startAt={solicitation.start_at}
                      endAt={solicitation.end_at}
                    />
                  }
                </div>
            )) }
          </div>

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
            : this.state.reservations.map(reservation => (
                <div className="col-md-3 col-xs-12 col-sm-6" key={reservation.id}>
                    <Card
                    link=""
                    cancel={() => this.cancelReservation(reservation.id)}
                    buttonName="Cancelar"
                    name={reservation.room.name}
                    number={reservation.room.number}
                    capacity={reservation.room.capacity}
                    blockName={reservation.room.block.name}
                    blockNumber={reservation.room.block.number}
                    available={reservation.room.available}
                    teacher={reservation.user.username}
                    discipline={reservation.discipline}
                    startAt={reservation.start_at}
                    endAt={reservation.end_at}
                    />
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
                <>
                { getUserRole() === '5' ?
                <div className="col-md-3 col-xs-12 col-sm-6" key={room.id}>
                    <Card editLink={`http://${window.location.host}/room/${room.id}`}
                    link={`http://${window.location.host}/reservation/${room.id}`}
                    buttonName="Reservar" name={room.name} number={room.number}
                    capacity={room.capacity} blockName={room.block.name}
                    blockNumber={room.block.number} available={room.available} />
                </div>
                :
                <div className="col-md-3 col-xs-12 col-sm-6" key={room.id}>
                    <Card link={`http://${window.location.host}/solicitation/${room.id}`}
                    buttonName="Solicitar Reserva" name={room.name} number={room.number}
                    capacity={room.capacity} blockName={room.block.name}
                    blockNumber={room.block.number} available={room.available} />
                </div> }
                </>
            )) }
          </div>
        </div>
      </Fragment>
    )
  }
}
