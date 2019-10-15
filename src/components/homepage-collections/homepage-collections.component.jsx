import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollections } from '../../redux/shop/shop.selector';
import ShopCollections from '../shop-collections/shop-collections.component';

import './homepage-collections.style.scss';

const HomepageCollections = ({ collections }) => {
    console.log(collections);
    return (
    <div className="collections-overview">
        {
            collections.map(({ id, ...otherSectionProps }) => (
                <ShopCollections key={id} {...otherSectionProps} />
            ))
      }
    </div>
    );
};

const mapStateToProps = createStructuredSelector({
    collections: selectCollections
});

export default connect(mapStateToProps)(HomepageCollections);