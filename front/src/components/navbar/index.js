/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import brand from '../../assets/images/brand.png'

export default function navbar () {
    return (
        <div className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="/">
                <img src={brand} width="30" height="30" className="d-inline-block align-top" alt="brand"/>
                Allocate
            </a>
        </div>
    )
}
