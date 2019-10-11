import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { selectCartItems } from '../../redux/cart/cart.selector';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import './cart-dropdown.style.scss';
import { toggleCartHidden } from '../../redux/cart/cart.action';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ? (
                    cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
                ) : (
                    <span className="empty-message">Your card is empty</span>
                )
            } 
        </div>
        <Button onClick={() => { history.push('/checkout'); dispatch(toggleCartHidden()) }}>GO TO CHECKOUT</Button>
    </div>
);

const mapStateProps = (state) => ({
    cartItems: selectCartItems(state)
})

export default withRouter(connect(mapStateProps)(CartDropdown));