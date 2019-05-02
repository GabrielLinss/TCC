import React, { Component } from 'react';

import {Jumbotron, Button} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Olá, bem vindo</h1>
          <p>Aqui você tem acesso aos serviços da receita federal</p>
          <p>
            <Button variant="primary">Acessar</Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
