import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollections } from '../../redux/shop/shop.selector';
import CollectionItem from '../collection-item/collection-item.component';

import './collection.style.scss';

const Collection = ({ collections }) => {
    console.log(collections);
    return (
    <div className="collections-overview">
        {
            collections.map(({ id, ...otherSectionProps }) => (
                <CollectionItem key={id} {...otherSectionProps} />
            ))
      }
    </div>
    );
};

const mapStateToProps = createStructuredSelector({
    collections: selectCollections
});

export default connect(mapStateToProps)(Collection);