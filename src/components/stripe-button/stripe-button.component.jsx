import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_dP2e4KOx8JmNNzFddeDuG05700jFFBUCUA';
    const url = 'http://localhost:5000/payment'
    const onToken = async token => {
        try {
            const response = await fetch(url, {
              method: 'POST', // or 'PUT'
              body: JSON.stringify({
                amount: priceForStripe,
                token
              }), 
              headers: {
                'Content-Type': 'application/json',
              }
            });
            const json = await response.json();
            console.log('Success:', JSON.stringify(json));
            alert('SUCCESFUL');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <StripeCheckout
            label="Pay Now"
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://sendeyo.com/up/d/f3eb2117da"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}>
        </StripeCheckout>
    );
}

export default StripeCheckoutButton;