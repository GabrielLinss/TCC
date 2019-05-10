import React, { Component } from 'react';

import {Jumbotron, Button, Container, Row, Col} from 'react-bootstrap';

import './App.scss';

import Navbar from './components/navbar';

class App extends Component {
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
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
