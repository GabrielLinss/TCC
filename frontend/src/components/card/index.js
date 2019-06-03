import React from 'react';
import { Card } from 'react-bootstrap';

export default function card(props) {
    return (
        <Card bg="success" text="white" style={{ width: '14rem', margin: '2px' }}>
            <Card.Body>
                <Card.Title>{ props.nome }</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{ props.bloco }</Card.Subtitle>
                <Card.Text>
                    Sala alocada previamente <br/>
                    Professor: {props.professor} <br/>
                    {props.horario}
                </Card.Text>
                <Card.Link href={props.link} style={{ color: 'white', textDecoration: 'underline' }}>Detalhes</Card.Link>
            </Card.Body>
        </Card>
    );
}