import React from 'react';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selector';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';
import { useHistory } from "react-router-dom";

import './cart-dropdown.style.scss';
// import { toggleCartHidden } from '../../redux/cart/cart.action';

const CartDropdown = React.forwardRef(({ cartItems, onClose }, ref) => {
    let history = useHistory();
    return (
    <div className="cart-dropdown" ref={ref}>
        <div className="cart-items">
            {
                cartItems.length ? (
                    cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
                ) : (
                    <span className="empty-message">Your card is empty</span>
                )
            } 
        </div>
        <Button onClick={() => { onClose(); history.push('/checkout'); }}>GO TO CHECKOUT</Button>
    </div>
    );
});

const mapStateProps = (state) => ({
    cartItems: selectCartItems(state)
})

export default connect(mapStateProps, null, null, {forwardRef: true})(CartDropdown);