import React from 'react';
import { connect } from 'react-redux';
import ShopCard from '../../components/shop-card/shop-card.component';
import { selectCollection } from '../../redux/shop/shop.selector';

import './collection.style.scss';

const CollectionPage = ({ collection = {title: null, items: []} }) => {
    const { title, items } = collection;
    return (
    <div className="collection-page">
        <h2 className="title">{ title }</h2>
        <div className="items">
            {
                items.map(
                    item =>  <ShopCard key={item.id} item={item}/>
                )
            }
        </div>
    </div>);
};

const mapStateTopProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateTopProps)(CollectionPage);