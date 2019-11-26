import React from 'react';
import ShopCard from '../shop-card/shop-card.component';
import { Link } from 'react-router-dom';

import './collection-item.style.scss';

const CollectionItem = ({category, products}) => (
    <div className="shop-collections">
        <Link to={`/shop/${category.toLowerCase()}`}><h1 className="title">{category.toUpperCase()}</h1></Link>
        <div className="preview">
            {
                products.filter((item, idx) => idx < 4)
                    .map(item => (
                        <ShopCard key={item.id} item={item}></ShopCard>
                    ))
            }
        </div>
    </div>
);

export default CollectionItem;