import React, { Component } from 'react'
import Navbar from '../../components/navbar'
import api from '../../services/api'
import { getUserId, getUserRole } from '../../services/auth'

export default class Reservation extends Component {
  state = {
    user_id: null,
    room_id: null,
    start_at_date: '',
    start_at_hour: '',
    end_at_date: '',
    end_at_hour: '',
    discipline: '',
    error: ''
  }

  loadRoom = async () => {
    const { id } = this.props.match.params

    const response = await api.get(`rooms/${id}`)

    this.setState({ room_id: response.data.id })
  }

  loadUser = async () => {
      let id = getUserId()
      id = parseInt(id)

      this.setState({ user_id: id })
  }

  componentDidMount () {
    this.loadRoom()
    this.loadUser()
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const { user_id, room_id, start_at_date, start_at_hour, end_at_date, end_at_hour, discipline } = this.state

    if (!user_id || !room_id || !start_at_date || !start_at_hour || !end_at_date || !end_at_hour || !discipline) {
      this.setState({ error: 'Preencha todos os campos!' })
    } else {
      try {
        const start_at = `${start_at_date} ${start_at_hour}:00`
        const end_at = `${end_at_date} ${end_at_hour}:00`

        let response

        if (getUserRole() === '5') {
          response = await api.post('reservations', { user_id, room_id, start_at, end_at, discipline })
        } else {
          response = await api.post('solicitations', { user_id, room_id, start_at, end_at, discipline })
        }

        if (response.status === 201) this.props.history.push('/app')
      } catch (err) {
        this.setState({ error: err.response.data[0].message })
      }
    }
  }

  render() {
    let navbarBreadCrumb = getUserRole() === '5' ? 'Reserva' : 'Solicitar Reserva'
    let buttonName = getUserRole() === '5' ? 'Reservar' : 'Solicitar'

    return (
      <>
        <Navbar page={navbarBreadCrumb} />

        <br/>
        <br/>
        <div className="container">
          <div className="row">
            <div className="container">
                {this.state.error && <p>{this.state.error}</p>}
                <div className="row justify-content-center">
                    <div className="col-md-6 col-xs-12">
                      <form onSubmit={this.handleSubmit}>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="InputStartAtDate">Data de início</label>
                            <input type="date" onChange={e => this.setState({ start_at_date: e.target.value })} className="form-control" id="InputStartAtDate" aria-describedby="startAtDateHelp" placeholder="Defina a data"/>
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="InputStartAtHour">Hora de início</label>
                            <input type="time" onChange={e => this.setState({ start_at_hour: e.target.value })} className="form-control" id="InputStartAtHour" aria-describedby="startAtHourHelp" placeholder="Defina o horário"/>
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="InputEndAtDate">Data de término</label>
                            <input type="date" onChange={e => this.setState({ end_at_date: e.target.value })} className="form-control" id="InputEndAtDate" aria-describedby="endAtDateHelp" placeholder="Defina a data"/>
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="InputEndAtHour">Hora de término</label>
                            <input type="time" onChange={e => this.setState({ end_at_hour: e.target.value })} className="form-control" id="InputEndAtHour" aria-describedby="endAtHourHelp" placeholder="Defina o horário"/>
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="InputDiscipline">Disciplina</label>
                          <input type="text" onChange={e => this.setState({ discipline: e.target.value })} className="form-control" id="InputDiscipline" placeholder="Defina a disciplina a ser ministrada ou evento"/>
                        </div>

                        <button type="submit" className="btn btn-primary">{buttonName}</button>
                      </form>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
