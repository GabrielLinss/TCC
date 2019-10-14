import React, { Component, Fragment } from 'react'
import Navbar from '../../components/navbar'
import Jumbotron from '../../components/jumbotron'
import Card from '../../components/card'
import api from '../../services/api'

export default class Home extends Component {
  state = {
    rooms: [],
  }

  loadRooms = async () => {
    const response = await api.get('/rooms')

    this.setState({ rooms: response.data.data })
  }

  componentDidMount () {
    this.loadRooms()
  }

  render() {
    return (
      <Fragment>
        <Navbar />
        
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <Jumbotron />
            </div>
          </div>

          <div className="row">
            { this.state.rooms.map(room => (
              <div className="col-md-3 col-xs-12 col-sm-6" key={room.id}>
                <Card link={`http://${window.location.host}/room/${room.id}`} buttonName="Visualizar sala" name={room.name} number={room.number} capacity={room.capacity} blockName={room.block.name} blockNumber={room.block.number} available={room.available} />
              </div>
            )) }
          </div>
        </div>
      </Fragment>
    )
  }
}
