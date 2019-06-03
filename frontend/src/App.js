import React, { Component } from 'react';

import {Jumbotron, Button, Container, Row, Col} from 'react-bootstrap';

import './App.scss';

import Navbar from './components/navbar';
import Card from './components/card';

class App extends Component {
  state = {
    salas: [
      { nome: 'Sala 1', bloco: 'Bloco 1', link: 'localhost:3000', professor: 'fulano de tal', horario: '04/06/2019 08:00 - 10:00' },
      { nome: 'Sala 2', bloco: 'Bloco 3', link: 'localhost:3000', professor: 'sicrano de tal', horario: '04/06/2019 10:00 - 12:00' },
      { nome: 'Sala 3', bloco: 'Bloco 2', link: 'localhost:3000', professor: 'beltrano de tal', horario: '04/06/2019 13:30 - 15:30' },
      { nome: 'Sala 4', bloco: 'Bloco 4', link: 'localhost:3000', professor: 'fulano de tal', horario: '04/06/2019 15:30 - 17:30' },
      { nome: 'Sala 2', bloco: 'Bloco 1', link: 'localhost:3000', professor: 'fulano de tal', horario: '04/06/2019 18:00 - 20:00' },
    ]
  }

  render() {
    return (
      <div>
        <Navbar/>
        
        <Jumbotron>
          <h1>Olá, seja bem vindo(a) ao sistema</h1>
          <p>Aqui você tem acesso aos serviços de alocação de salas do campus</p>
          <p>
            <Button variant="primary">Acessar</Button>
          </p>
        </Jumbotron>
        
        <Container>
          <Row>
            { this.state.salas.map(sala => (
              <Card nome={sala.nome} bloco={sala.bloco} link={sala.link} professor={sala.professor} horario={sala.horario} />
            )) }
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
