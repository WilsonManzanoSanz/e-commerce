import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selector';
import CollectionItem from '../collection-item/collection-item.component';

import './collections.style.scss';

const Collections = ({ collections }) => {
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
    collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(Collections);