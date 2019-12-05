import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Navbar from '../../components/navbar'
import api from '../../services/api'
import { login } from '../../services/auth'

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const { email, password } = this.state

    if (!email || !password) {
      this.setState({ error: 'Preencha todos os campos!' })
    } else {
      try {
        const response = await api.post('login', { email, password })
        login(response.data.token, response.data.refreshToken, response.data.user.id, response.data.user.username, response.data.user.role_id)
        this.props.history.push('/app')
      } catch (err) {
        this.setState({ error: err.response.data[0].message })
      }
    }
  }

  render() {
    return (
      <Fragment>
        <Navbar page="Login" />
        <br/>
        <br/>
        <br/>
        <div className="container">
          {this.state.error && <p>{this.state.error}</p>}
          <div className="row justify-content-center">
            <div className="col-md-6 col-xs-12">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="InputEmail">Email</label>
                  <input type="email" onChange={e => this.setState({ email: e.target.value })} className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Digite o email"/>
                </div>
                <div className="form-group">
                  <label htmlFor="InputPassword">Senha</label>
                  <input type="password" onChange={e => this.setState({ password: e.target.value })} className="form-control" id="InputPassword" placeholder="Digite sua senha"/>
                </div>

                <button type="submit" className="btn btn-primary">Entrar</button>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Login)
