import React from 'react';
import { Navbar } from 'react-bootstrap';
import brand from '../../assets/images/brand.png';

export default function navbar() {
    return (
        <Navbar bg="light" variant="light" fixed="top">
            <Navbar.Brand href="#home">
                <img src={brand}
                    width="30" height="30"
                    className="d-inline-block align-top"
                    alt="" />
                {' Alloc'}
            </Navbar.Brand>
        </Navbar>
    );
}
