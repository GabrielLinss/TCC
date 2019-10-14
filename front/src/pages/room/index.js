import React, { Component, Fragment } from 'react'
import Navbar from '../../components/navbar'
import api from '../../services/api'
import { getUserName } from '../../services/auth'

export default class Room extends Component {
  state = {
    room: {},
    username: ''
  }

  loadRoom = async () => {
    const { id } = this.props.match.params

    const response = await api.get(`rooms/${id}`)

    this.setState({ room: response.data })
  }

  loadUsername = async () => {
      const username = getUserName()
      this.setState({ username: username })
  }

  componentDidMount () {
    this.loadRoom()
    this.loadUsername()
  }

  render() {
    return (
      <Fragment>
        <Navbar />
        
        <div className="container">
          <div className="row">
            <div className="col-md-12">
                <h1>Sala</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
                <h5>{ this.state.room.number }</h5>
                <p>
                    Bloco: { this.state.room.block_id }<br/>
                    Status: { this.state.room.available === 1 ? 'Disponível' : 'Indisponível' }
                </p>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
