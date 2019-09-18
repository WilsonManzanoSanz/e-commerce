import React from 'react';
import ShopCard from '../shop-card/shop-card.component';

import './shop-collections.style.scss';

const ShopCollections = ({title, items}) => (
    <div className="shop-collections">
        <h1 className="title">{title.toUpperCase()}</h1>
        <div className="preview">
            {
                items.filter((item, idx) => idx < 4)
                    .map(({id, ...props} )=> (
                        <ShopCard key={id} {...props}></ShopCard>
                    ))
            }
        </div>
    </div>
);

export default ShopCollections;