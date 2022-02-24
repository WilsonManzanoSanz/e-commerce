import React from 'react';
import Button from '../ui/button/button.component';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.action';

import './shop-card.style.scss'

const ShopCard = ({ item, addItem }) => {
    const { name, price, photoUrl } = item;
    return (
        <div className="shop-card">
            <div className="image" style={{backgroundImage: `url(${photoUrl ? photoUrl: 'http://emea.dynabook.com/images/local/en_EU/default/unknown_product_page.jpg'})`}}>
            </div>
            <div className="content-footer">
                <span className="name">{name}</span>
                <span className="price">${price}</span>
            </div>∫
            <Button classType="inverted" onClick={() => addItem(item)}>Add to Cart</Button>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(ShopCard);