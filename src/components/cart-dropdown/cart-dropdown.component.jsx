import React from 'react';
import { connect } from 'react-redux';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import './cart-dropdown.style.scss';

const CartDropdown = ({cartItems}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
            } 
        </div>
        <Button>GO TO CHECKOUT</Button>
    </div>
);

const mapStateProps = ({ cart: { cartItems } }) => ({
    cartItems
})

export default connect(mapStateProps)(CartDropdown);