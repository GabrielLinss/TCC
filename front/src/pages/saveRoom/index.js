import React, { Component, Fragment } from 'react'
import Navbar from '../../components/navbar'
import api from '../../services/api'

export default class SaveRoom extends Component {
    state = {
        name: '',
        number: 0,
        capacity: 0,
        available: true,
        block_id: 0,
        error: '',
        blocks: []
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
        this.loadBlocks()
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const { name, number, capacity, available, block_id } = this.state

        if (!name || !number || !capacity || !available || !block_id) {
          this.setState({ error: 'Preencha todos os campos!' })
        } else {
          try {
            const response = await api.post('rooms', { name, number, capacity, available, block_id })

            if (response.status === 201) this.props.history.push('/app')
          } catch (err) {
            this.setState({ error: err.response.data[0].message })
          }
        }
    }

    render() {
        return (
            <Fragment>
                <Navbar page="Cadastrar" />

                <br/>
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="container">
                            {this.state.error && <p>{this.state.error}</p>}
                            <div className="row justify-content-center">
                                <div className="col-md-6 col-xs-12">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="InputName">Nome da sala</label>
                                            <input type="text" onChange={e => this.setState({ name: e.target.value })} className="form-control" id="InputName" aria-describedby="nameHelp" placeholder="Defina o nome da sala. Ex: Sala ou Sala Multiuso"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="InputNumber">Número da sala</label>
                                            <input type="number" onChange={e => this.setState({ number: e.target.value })} className="form-control" id="InputNumber" placeholder="Defina o número da sala no bloco"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="InputCapacity">Capacidade</label>
                                            <input type="number" onChange={e => this.setState({ capacity: e.target.value })} className="form-control" id="InputCapacity" placeholder="Defina a capacidade de alunos que a sala suporta"/>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" onChange={e => this.setState({ available: true })} type="radio" name="exampleRadios" id="exampleRadios1" value={this.state.available} defaultChecked />
                                            <label className="form-check-label" htmlFor="exampleRadios1">
                                                Disponível
                                            </label>
                                        </div>
                                        <br/>
                                        <div className="form-check">
                                            <input className="form-check-input" onChange={e => this.setState({ available: false })} type="radio" name="exampleRadios" id="exampleRadios2" value={this.state.available} />
                                            <label className="form-check-label" htmlFor="exampleRadios2">
                                                Não Disponível
                                            </label>
                                        </div>

                                        <br/>
                                        <div className="form-group">
                                            <label htmlFor="InputBlockId">Bloco</label>
                                            <select className="form-control" id="InputBlockId" value={this.state.block_id} onChange={e => this.setState({ block_id: e.target.value })}>
                                                {
                                                    this.state.blocks.map(block => (
                                                        <option value={block.number} key={block.id}>{block.number}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <button type="submit" className="btn btn-primary">Salvar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
