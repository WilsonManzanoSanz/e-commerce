import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import  CartIcon  from '../cart-icon/cart-icon.component';

import { ReactComponent as Logo } from '../../assets/img/logo.svg';

import './navbar.style.scss';

const Navbar = ({ currentUser }) => (
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
                {
                    currentUser ?
                    <div className="item pointer" onClick={() => auth.signOut()}>SIGN OUT</div>
                    :
                    <Link className="item" to="/login">SIGN IN</Link>
                }
                <CartIcon />
            </div>
        </div>
    </div>
);

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Navbar);