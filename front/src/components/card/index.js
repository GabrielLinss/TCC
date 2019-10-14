import React from 'react'

export default function card (props) {
    const available = props.available === 1 ? 'bg-success' : 'bg-danger'

    return (
        <div className={`card text-white ${available}`} style={{width: '16rem', margin: '5px'}}>
            <div className="card-body">
                <h5 className="card-title">{ props.name } { props.number }</h5>
                <p className="card-text">{ props.blockName } { props.blockNumber }</p>
                <p className="card-text">
                    Capacidade: { props.capacity } Alunos<br/>
                    Status: { props.available === 1 ? 'Disponível' : 'Indisponível' }
                </p>
                <a href={ props.link } className="btn btn-primary">{ props.buttonName }</a>
            </div>
        </div>
    )
}
