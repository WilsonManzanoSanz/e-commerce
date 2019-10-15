import React from 'react';
import ShopCard from '../shop-card/shop-card.component';

import './collection-item.style.scss';

const CollectionItem = ({title, items}) => (
    <div className="shop-collections">
        <h1 className="title">{title.toUpperCase()}</h1>
        <div className="preview">
            {
                items.filter((item, idx) => idx < 4)
                    .map(item => (
                        <ShopCard key={item.id} item={item}></ShopCard>
                    ))
            }
        </div>
    </div>
);

export default CollectionItem;