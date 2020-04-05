import React from 'react';
import { connect } from 'react-redux';
import Button from '../../components/button/button.component';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selector';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import './checkout.style.scss';

const CheckoutPage = ({cartItems, total}) => (
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block product">
                <span>Product</span>
            </div>
            <div className="header-block name">
                <span>Description</span>
            </div>
            <div className="header-block quantity">
                <span>Quantity</span>
            </div>
            <div className="header-block price">
                <span>Price</span>
            </div>
            <div className="header-block remove">
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem => 
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)
        }
        <div className="total">
            <span>TOTAL: ${total}</span>
            <Link className="no-decoration" to="/shipping">
                <Button>Go To Shipping</Button>
            </Link>
        </div>
        <div className="test-warning">
            *Please use the following test credit card for payment* 
            <br/>
            4242424242424242
        </div>
        <StripeCheckoutButton price={total}/>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);