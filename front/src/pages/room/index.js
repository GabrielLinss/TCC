import React, { Component, Fragment } from 'react'
import Navbar from '../../components/navbar'
import api from '../../services/api'
import './style.css'

export default class Room extends Component {
  state = {
    blocks: [],
    room: {},
    error: '',
    id: 0,
    name: '',
    number: 0,
    capacity: 0,
    available: true,
    block_id: 0
  }

  loadRoom = async () => {
    const { id } = this.props.match.params

    const response = await api.get(`rooms/${id}`)
    const room = response.data

    this.setState({ room: room, id: room.id, name: room.name, number: room.number, capacity: room.capacity, available: room.available, block_id: room.block_id })
  }

  loadBlocks = async () => {
    try {
        const response = await api.get('blocks')

        if (response.status === 200) this.setState({ blocks: response.data })
      } catch (err) {
        this.setState({ error: err.response.data[0].message })
      }
  }

  componentDidMount () {
    this.loadRoom()
    this.loadBlocks()
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const { id, name, number, capacity, available, block_id } = this.state

    try {
      const response = await api.put(`rooms/${id}`, { name, number, capacity, available, block_id })

      if (response.status === 200) this.props.history.push('/app')
    } catch (err) {
      this.setState({ error: err.response.data[0].message })
    }
  }

  handleChangeName = (e) => {
    this.setState({ name: e.target.value })
  }
  handleChangeNumber = (e) => {
    this.setState({ number: e.target.value })
  }
  handleChangeCapacity = (e) => {
    this.setState({ capacity: e.target.value })
  }
  handleChangeAvailable = (e) => {
    this.setState({ available: true })
  }
  handleChangeAvailable2 = (e) => {
    this.setState({ available: false })
  }
  handleChangeBlock = (e) => {
    this.setState({ block_id: e.target.value })
  }

  render() {
    const available = this.state.room.available === 1 ? '' : 'bg-danger'

    return (
      <Fragment>
        <Navbar page="Editar Detalhes da Sala" />

        <div className="container">
          <div className={`row showRoomDivRow ${available}`}>
            <div className="col-md-12">
              <h5>Número: {this.state.room.number}</h5>
              <p>
                Bloco: {this.state.room.block_id}<br />
                Status: {this.state.room.available === 1 ? 'Disponível' : 'Indisponível'}
              </p>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="container">
                {this.state.error && <p>{this.state.error}</p>}
                <div className="row justify-content-center">
                  <div className="col-md-6 col-xs-12">
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="InputName">Nome da sala</label>
                        <input type="text" value={this.state.name} onChange={this.handleChangeName} className="form-control" id="InputName" aria-describedby="nameHelp" placeholder="Defina o nome da sala. Ex: Sala ou Sala Multiuso" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="InputNumber">Número da sala</label>
                        <input type="number" value={this.state.number} onChange={this.handleChangeNumber} className="form-control" id="InputNumber" placeholder="Defina o número da sala no bloco" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="InputCapacity">Capacidade</label>
                        <input type="number" value={this.state.capacity} onChange={this.handleChangeCapacity} className="form-control" id="InputCapacity" placeholder="Defina a capacidade de alunos que a sala suporta" />
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" defaultChecked={this.state.available === 1} onChange={this.handleChangeAvailable} type="radio" name="exampleRadios" id="exampleRadios1" />
                        <label className="form-check-label" htmlFor="exampleRadios1">
                          Disponível
                        </label>
                      </div>
                      <br />
                      <div className="form-check">
                        <input className="form-check-input" defaultChecked={this.state.available === 0} onChange={this.handleChangeAvailable2} type="radio" name="exampleRadios" id="exampleRadios2" />
                        <label className="form-check-label" htmlFor="exampleRadios2">
                          Não Disponível
                        </label>
                      </div>

                      <br />
                      <div className="form-group">
                        <label htmlFor="InputBlockId">Bloco</label>
                        <select value={this.state.block_id} className="form-control" id="InputBlockId" onChange={this.handleChangeBlock}>
                          {
                            this.state.blocks.map(block => (
                              <option value={block.id} key={block.id}>{ block.number }</option>
                            ))
                          }
                        </select>
                      </div>

                      <button type="submit" className="btn btn-primary">Salvar Alterações</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
