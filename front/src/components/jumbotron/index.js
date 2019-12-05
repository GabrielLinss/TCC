import React from 'react'

export default function jumbotron () {
  return (
    <div className="jumbotron jumbotron-fluid">
        <div className="container">
            <h1 className="display-4">Olá, bem vindo!</h1>
            <p className="lead">Aqui você tem disponível todas as alocações de salas do campus. E a possibilidade de fazer reservas também.</p>
            <a href={`http://${window.location.host}/login`} className="btn btn-primary">Acessar</a>
        </div>
    </div>
  )
}
