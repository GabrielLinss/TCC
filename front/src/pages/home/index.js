import React, { Component, Fragment } from 'react'
import Navbar from '../../components/navbar'
import Jumbotron from '../../components/jumbotron'
import Card from '../../components/card'
import api from '../../services/api'
import { isAuthenticated } from '../../services/auth'
import { connect } from 'react-redux';
import * as AllocationsActions from '../../store/actions/allocations';
import { bindActionCreators } from 'redux';

class Home extends Component {
  state = {
    reservations: []
  }

  loadReservations = async () => {
    const response = await api.get('/reservations?withDay=false')
    const response2 = await api.get('/reservations?withDay=true')

    this.props.loadAllocations(response2.data);

    this.setState({ reservations: response.data })
  }

  componentDidMount() {
    this.loadReservations()
  }

  render() {
    return (
      <Fragment>
        <Navbar />

        <div className="container">
          {isAuthenticated() ? '' :
            <div className="row">
              <div className="col-md-12 col-xs-12">
                <Jumbotron />
              </div>
            </div>
          }

          <div className="row">
            <div className="col">
              <h2>Reservas</h2>
              <div className="row">
                {this.state.reservations.length > 0 ? this.state.reservations.map(reservation => (
                  <div className="col-md-6 col-xs-12 col-sm-6" key={reservation.id}>
                    <Card link={`http://${window.location.host}/room/${reservation.room.id}`}
                      withoutButton={true} name={reservation.room.name} number={reservation.room.number}
                      capacity={reservation.room.capacity} blockName={reservation.room.block.name}
                      blockNumber={reservation.room.block.number}
                      available={reservation.room.available}
                      teacher={reservation.user.username}
                      discipline={reservation.discipline}
                      day={reservation.day}
                      startAt={reservation.start_at}
                      endAt={reservation.end_at} />
                  </div>
                )) :
                  <div className="col-md-12">
                    <h5>Nenhuma reserva.</h5>
                  </div>}
              </div>
            </div>

            <div className="col">
              <h2>Alocações</h2>
              <div className="row">
                {this.props.allocations.loading && <p>Carregando...</p>}
                {this.props.allocations.data.length > 0 ? this.props.allocations.data.map(allocation => (
                  <div className="col-md-6 col-xs-12 col-sm-6" key={allocation.id}>
                    <Card link={`http://${window.location.host}/room/${allocation.room.id}`}
                      withoutButton={true} name={allocation.room.name} number={allocation.room.number}
                      capacity={allocation.room.capacity} blockName={allocation.room.block.name}
                      blockNumber={allocation.room.block.number}
                      available={allocation.room.available}
                      teacher={allocation.teacher}
                      discipline={allocation.discipline}
                      day={allocation.day}
                      allocation_hour={allocation.allocation_hour}
                      startAt={allocation.start_at}
                      endAt={allocation.end_at} />
                  </div>
                )) :
                  <div className="col-md-12">
                    <h5>Nenhuma alocação.</h5>
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  allocations: state.allocations
});

const mapDispatchToProps = dispatch => bindActionCreators(AllocationsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
