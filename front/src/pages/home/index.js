import React, { Component, Fragment } from 'react'
import Navbar from '../../components/navbar'
import Jumbotron from '../../components/jumbotron'
import Card from '../../components/card'
import api from '../../services/api'
import { isAuthenticated } from '../../services/auth'

export default class Home extends Component {
  state = {
    reservations: [],
  }

  loadReservations = async () => {
    const response = await api.get('/reservations')

    this.setState({ reservations: response.data })
  }

  componentDidMount () {
    this.loadReservations()
  }

  render() {
    return (
      <Fragment>
        <Navbar />

        <div className="container">
          { isAuthenticated() ? '' :
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <Jumbotron />
            </div>
          </div>
          }

          <div className="row">
            { this.state.reservations.length > 0 ? this.state.reservations.map(reservation => (
              <div className="col-md-3 col-xs-12 col-sm-6" key={reservation.id}>
                <Card link={`http://${window.location.host}/room/${reservation.room.id}`}
                withoutButton={true} name={reservation.room.name} number={reservation.room.number}
                capacity={reservation.room.capacity} blockName={reservation.room.block.name}
                blockNumber={reservation.room.block.number}
                available={reservation.room.available}
                teacher={reservation.user.username}
                discipline={reservation.discipline}
                startAt={reservation.start_at}
                endAt={reservation.end_at}/>
              </div>
            )) :
              <div className="col-md-12">
                <h5>Nenhuma alocação ou reserva.</h5>
              </div> }
          </div>
        </div>
      </Fragment>
    )
  }
}
