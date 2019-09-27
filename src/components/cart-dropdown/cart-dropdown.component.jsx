import React from 'react';

import Button from '../button/button.component';

import './cart-dropdown.style.scss';

const Cart = () => (
    <div className="cart-dropdown">
        <div className="cart-items">
            <Button>GO TO CHECKOUT</Button>
        </div>
    </div>
)

export default Cart;