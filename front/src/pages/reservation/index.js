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
    day: 'Segunda Feira',
    allocation_hour: '08:00-10:00',
    teacher: '',
    users: [],
    user: 1,
    error: ''
  }

  loadRoom = async () => {
    const { allocateId, id } = this.props.match.params

    let response

    if (id) response = await api.get(`rooms/${id}`)
    if (allocateId) response = await api.get(`rooms/${allocateId}`)

    this.setState({ room_id: response.data.id })
  }

  loadUser = async () => {
      let id = getUserId()
      id = parseInt(id)

      this.setState({ user_id: id })
  }

  loadUsers = async () => {
    const response = await api.get('users?role_id=2')
    console.log(response.data)
    this.setState({ users: response.data })
  }

  componentDidMount () {
    if (getUserRole() === '5') this.loadUsers()

    this.loadRoom()
    this.loadUser()
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const { user_id, room_id, start_at_date, start_at_hour, end_at_date, end_at_hour, discipline, day, teacher, allocation_hour, user } = this.state

    if (!user_id || !room_id || !discipline) {
      this.setState({ error: 'Preencha todos os campos!' })
    } else {
      try {
        const start_at = `${start_at_date} ${start_at_hour}:00`
        const end_at = `${end_at_date} ${end_at_hour}:00`

        let response

        if (getUserRole() === '5' && this.props.match.params.allocateId) {
          response = await api.post('reservations', { user_id: user, room_id, discipline, day, teacher, allocation_hour })
        } else if (getUserRole() === '5') {
          response = await api.post('reservations', { user_id: user, room_id, start_at, end_at, discipline })
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

    if (this.props.match.params.allocateId) {
      navbarBreadCrumb = 'Alocação'
      buttonName = 'Alocar'
    }

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
                        { getUserRole() === '5' ?
                        <>
                        <div className="form-group">
                          <label htmlFor="InputTeacher">Nome do(a) professor(a) <small>Preencha este campo caso o professor não possua cadastro.</small></label>
                          <input type="text" onChange={e => this.setState({ teacher: e.target.value })} className="form-control" id="InputTeacher" placeholder="Defina o professor que irá ministrar"/>
                        </div>
                        <div className="form-group">
                          <label htmlFor="InputUserId">Usuário</label>
                            <select className="form-control" id="InputUserId" value={this.state.user} onChange={e => this.setState({ user: e.target.value })}>
                              {
                                this.state.users.map(user => (
                                  <option value={user.id} key={user.id}>{user.username}</option>
                                ))
                              }
                            </select>
                        </div>
                        </>
                        : '' }

                        { this.props.match.params.id ?
                        <>
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
                        </>
                        : ''}

                        <div className="form-group">
                          <label htmlFor="InputDiscipline">{ this.props.match.params.id ? 'Disciplina/Atividade/Evento' : 'Disciplina' }</label>
                          <input type="text" onChange={e => this.setState({ discipline: e.target.value })} className="form-control" id="InputDiscipline" placeholder="Defina a disciplina a ser ministrada ou evento"/>
                        </div>
                        { this.props.match.params.allocateId ?
                        <>
                        <div className="form-group">
                          <label htmlFor="InputDay">Dia da semana</label>
                          <select className="form-control" id="InputDay" onChange={e => this.setState({ day: e.target.value })}>
                            <option value="Segunda Feira">Segunda Feira</option>
                            <option value="Terça Feira">Terça Feira</option>
                            <option value="Quarta Feira">Quarta Feira</option>
                            <option value="Quinta Feira">Quinta Feira</option>
                            <option value="Sexta Feira">Sexta Feira</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="InputHour">Horário</label>
                          <select className="form-control" id="InputHour" onChange={e => this.setState({ allocation_hour: e.target.value })}>
                            <option value="08:00-10:00">08:00-10:00</option>
                            <option value="10:00-12:00">10:00-12:00</option>
                            <option value="13:30-15:30">13:30-15:30</option>
                            <option value="15:30-17:30">15:30-17:30</option>
                            <option value="18:00-20:00">18:00-20:00</option>
                            <option value="20:00-22:00">20:00-22:00</option>
                          </select>
                        </div>
                        </>
                        : '' }

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
