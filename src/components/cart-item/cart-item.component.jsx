import React from 'react';

import './cart-item.style.scss';

const CartItem = ({ item: {photoUrl, price, name, quantity } }) => (
    <div className="cart-item">
        <img src={photoUrl} alt={`item ${name}`}/>
        <div className="item-details">
            <span className="name">{name}</span>
            <span className="price">{quantity} x ${price}</span>
        </div>
    </div>
)

export default CartItem;