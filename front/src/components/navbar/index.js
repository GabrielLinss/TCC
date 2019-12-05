/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import brand from '../../assets/images/brand.png'
import { getUserName, getRefreshToken, getToken, isAuthenticated, getUserRole } from '../../services/auth'
import api from '../../services/api'

export default function navbar (props) {
    const username = getUserName()

    async function handleLogout () {
        const refresh_token = getRefreshToken()
        const token = getToken()
        const response = await api.post('logout', {}, { headers: { 'Authorization': `bearer ${token}`, 'x-refresh-token': refresh_token } })

        if (response.status === 200) {
            localStorage.clear()
            window.location.href = "/"
        }
    }

    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">
                <img src={brand} width="30" height="30" className="d-inline-block align-top" alt="brand"/>
                Allocate { props.page ? `> ${props.page}` : '' }
            </a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMenu">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarMenu">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">Início</a>
                </li>
                { isAuthenticated() ?
                <>
                <li className="nav-item">
                  <a className="nav-link" href="/app">Dashboard</a>
                </li>
                { getUserRole() === '5' ?
                <li className="nav-item">
                  <a className="nav-link" href="/saveRoom">Nova Sala</a>
                </li>
                : ''}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="navDrop">{username}</a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#" onClick={() => handleLogout()}>Sair</a>
                  </div>
                </li>
                </> : <></> }
              </ul>
            </div>
        </div>
    )
}
