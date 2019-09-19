import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/img/logo.svg';

import './navbar.style.scss';

const Navbar = () => (
    <div className="header">
        <div className="wrapper container navbar">
            <Link className="logo-container" to="/">
                <Logo className="logo"/>
            </Link>
            <div className="options">
                <Link className="item" to="/shop">
                    SHOP
                </Link>
                <Link className="item" to="/contact">
                    CONTACT
                </Link>
            </div>
        </div>
    </div>
);

export default Navbar;