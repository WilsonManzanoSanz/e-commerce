import React from 'react';
import { Route } from 'react-router-dom';

import Collection from '../../components/collection/collection.component';
import CollectionPage from '../collection/collection.component';

const ShopPage = ({ match }) => {
    return (
    <div className="shop-page">
        <Route exact path={`${match.path}`} component={Collection}/>
        <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
    </div>
    );
};

export default ShopPage;