import React from 'react';

import './shop-card.style.scss'

const ShopCard = ({id, name, price, imageUrl}) => (
    <div className="shop-card">
        <div className="image" style={{backgroundImage: `url(${imageUrl})`}}>
        </div>
        <div className="content-footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>
    </div>
);


export default ShopCard;