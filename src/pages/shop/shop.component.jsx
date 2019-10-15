import React from 'react';
import { Route } from 'react-router-dom';

import Collections from '../../components/collections/collections.component';
import CollectionPage from '../collection/collection.component';

const ShopPage = ({ match }) => {
    return (
    <div className="shop-page">
        <Route exact path={`${match.path}`} component={Collections}/>
        <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
    </div>
    );
};

export default ShopPage;