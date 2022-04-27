import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import  CartIcon  from '../cart-icon/cart-icon.component';
import  UserIcon  from '../user-icon/user-icon.component';

import { selectCartHidden } from '../../redux/cart/cart.selector';
import { selectCurrentUser} from '../../redux/user/user.selector';
import { setCurrentUser } from '../../redux/user/user.action';
import { logOut } from '../../redux/user/user.action';
import { selectIsMobile } from '../../redux/ui/ui.selector';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import { ReactComponent as HamburguerMenu } from '../../assets/img/hamburguer.svg';
import SearchBoxNavbar from '../search-box-navbar/search-box.component';

import './navbar.style.scss';

const Navbar = ({ currentUser, isMobile, logOut}) => {
    const history = useHistory();
    const [isOpen, setOpenStatus] = useState(false);
    const [isAdminDropdown, toggleAdminDropdown] = useState(false);
    return (
        <div className="header">
            <div className="wrapper container navbar">
                <Link className="logo-container" to="/">
                    <Logo className="logo"/>
                </Link>
                {
                    !(isMobile) ? (
                        <div className="options">
                            <div className='item'>
                                <SearchBoxNavbar />
                            </div>
                            <Link className="item" to="/shop">
                                SHOP
                            </Link>
                            <Link className="item" to="/contact">
                                CONTACT
                            </Link>
                            {   currentUser && currentUser.role && currentUser.userType === 2 &&
                                <Dropdown  className="item item--dropdown" isOpen={isAdminDropdown} toggle={() => toggleAdminDropdown(!isAdminDropdown)} style={{paddingRight: '20px'}}>
                                    <DropdownToggle color={'button'}>
                                        EDIT 
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => history.push('/admin/products')} key={1}>Admin Products</DropdownItem>
                                        <DropdownItem onClick={() => history.push('/admin/categories')} key={2}>Admin Catagories</DropdownItem>
                                    </DropdownMenu>  
                                </Dropdown>
                            } 
                            <UserIcon />
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
                                    <Link className="item" onClick={() => setOpenStatus(!isOpen)} to="/shop">
                                        SHOP
                                    </Link>
                                    <Link className="item" onClick={() => setOpenStatus(!isOpen)} to="/contact">
                                        CONTACT
                                    </Link>
                                    {   currentUser && currentUser.role && currentUser.userType === 2 &&
                                        <Link className="item" onClick={() => setOpenStatus(!isOpen)} to="/admin">
                                            ADMIN
                                        </Link>
                                    }
                                    {
                                        currentUser ?
                                        <div className="item pointer" onClick={() => { logOut(); setOpenStatus(!isOpen) }}>SIGN OUT</div>
                                        :
                                        <Link className="item" to="/login" onClick={() => setOpenStatus(!isOpen)}>SIGN IN</Link>
                                    }
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
    isMobile: selectIsMobile
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    logOut: () => dispatch(logOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);