import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import  CartIcon  from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { selectCartHidden } from '../../redux/cart/cart.selector';
import { selectCurrentUser} from '../../redux/user/user.selector';
import { setCurrentUser } from '../../redux/user/user.action';
import { selectIsMobile } from '../../redux/ui/ui.selector';

import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import { ReactComponent as HamburguerMenu } from '../../assets/img/hamburguer.svg';

import './navbar.style.scss';

const Navbar = ({ currentUser, hidden, isMobile, setCurrentUser}) => {
    const [isOpen, setOpenStatus] = useState(false);
    return (
        <div className="header">
            <div className="wrapper container navbar">
                <Link className="logo-container" to="/">
                    <Logo className="logo"/>
                </Link>
                {
                    !(isMobile) ? (
                        <div className="options">
                            <Link className="item" to="/shop">
                                SHOP
                            </Link>
                            <Link className="item" to="/contact">
                                CONTACT
                            </Link>
                            {
                                currentUser ?
                                <div className="item pointer" onClick={() => setCurrentUser(null)}>SIGN OUT</div>
                                :
                                <Link className="item" to="/login">SIGN IN</Link>
                            }
                            <CartIcon />
                        </div>
                    ) : (
                        <div className="right-items-mobile">
                            <CartIcon/>
                            <HamburguerMenu className="hambuguer-menu item" onClick={() => setOpenStatus(!isOpen)}/>
                        </div>
                    )
                }
                {
                    isMobile ? (
                        <div className="dropdown-navbar wrapper" style={isOpen ? {transform: 'scaleY(1)'} : {transform: 'scaleY(0)'}}>
                            <div className="dropdown-navbar-list">
                                    <Link className="item" to="/shop">
                                        SHOP
                                    </Link>
                                    <Link className="item" to="/contact">
                                        CONTACT
                                    </Link>
                                    {
                                        currentUser ?
                                        <div className="item pointer" onClick={() => setCurrentUser(null)}>SIGN OUT</div>
                                        :
                                        <Link className="item" to="/login">SIGN IN</Link>
                                    }
                            </div>
                        </div>
                    ) : null
                }
            </div>
            {
                hidden ? null : <CartDropdown />
            }
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
    isMobile: selectIsMobile
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);