import React from 'react'
import convertMonth from '../../util/convertMonth'

export default function card (props) {
    const available = props.available === 1 ? 'bg-success' : 'bg-danger'

    let withoutButton

    if (!props.withoutButton) {
      withoutButton = false
    } else {
      withoutButton = props.withoutButton
    }

    const startAt = new Date(props.startAt)
    const endAt = new Date(props.endAt)
    const stHour = startAt.getHours()
    const stMinutes = startAt.getMinutes()
    const edHour = endAt.getHours()
    const edMinutes = endAt.getMinutes()
    const st = `${stHour}:${stMinutes}`
    const ed = `${edHour}:${edMinutes}`
    const day = startAt.getDate()
    const month = convertMonth(startAt.getMonth())

    return (
        <div className={`card text-white ${available}`} style={{width: '16rem', margin: '5px'}}>
            <div className="card-body">
                <h5 className="card-title">{ props.name } { props.number }</h5>
                <p className="card-text">{ props.blockName } { props.blockNumber }</p>
                <p className="card-text">
                    Capacidade: { props.capacity } Alunos<br/>
                    Status: { props.available === 1 ? 'Disponível' : 'Indisponível' }<br/>
                    { props.teacher ? `Professor(a): ${props.teacher}` : '' }<br/>
                    { props.teacher ? `Disciplina: ${props.discipline}` : '' }<br/>
                    { props.day ? `Dia: ${props.day}` : '' }<br/>
                    { props.allocation_hour ? `Horário: ${props.allocation_hour}` : '' }
                    { props.startAt && props.endAt ? `Dia: ${day}/${month}` : '' }<br/>
                    { props.startAt && props.endAt ? `Horário: ${st} - ${ed}` : '' }<br/>
                </p>

                { withoutButton === false ?
                <>
                {props.link !== '' ?
                <a href={ props.link } className="btn btn-primary card-link">{ props.buttonName }</a>
                : <button className="btn btn-danger card-link" onClick={props.cancel}>{ props.buttonName }</button>
                }
                </>
                : '' }

                { props.editLink ? <a href={ props.editLink } className="btn btn-light card-link">Editar</a> : '' }
                { props.aprove ? <button className="btn btn-primary card-link" onClick={props.aprove}>Aprovar</button> : '' }
                { props.allocate ? <a href={ props.allocateLink } className="btn btn-info card-link">Alocar</a> : '' }
            </div>
        </div>
    )
}
