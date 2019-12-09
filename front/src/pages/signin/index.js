import React, { Component, Fragment } from 'react'
import Navbar from '../../components/navbar'
import api from '../../services/api'

export default class SaveRoom extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        role_id: 0,
        error: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const { username, email, password, role_id } = this.state

        if (!username || !email || !password || !role_id) {
          this.setState({ error: 'Preencha todos os campos!' })
        } else {
          try {
            const response = await api.post('users', { username, email, password, role_id })

            if (response.status === 201) this.props.history.push('/app')
          } catch (err) {
            this.setState({ error: err.response.data[0].message })
          }
        }
    }

    render() {
        return (
            <Fragment>
                <Navbar page="Cadastrar Usuário" />

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
                                            <label htmlFor="InputUsername">Nome do usuário</label>
                                            <input type="text" onChange={e => this.setState({ username: e.target.value })} className="form-control" id="InputUsername" aria-describedby="usernameHelp" placeholder="Defina o nome do usuário"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="InputEmail">Email do usuário</label>
                                            <input type="email" onChange={e => this.setState({ email: e.target.value })} className="form-control" id="InputEmail" placeholder="Defina o email do usuário"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="InputPassword">Senha</label>
                                            <input type="password" onChange={e => this.setState({ password: e.target.value })} className="form-control" id="InputPassword" placeholder="Defina a senha"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="InputRole">Tipo de usuário</label>
                                            <select className="form-control" id="InputRole" onChange={e => this.setState({ role_id: e.target.value })}>
                                              <option value={1}>Aluno</option>
                                              <option value={2}>Professor</option>
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
