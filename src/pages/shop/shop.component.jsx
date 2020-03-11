import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Collections from '../../components/collections/collections.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/spinner-page/spinner-page.component';
// import { updateCollections } from '../../redux/shop/shop.action';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionsFetching } from '../../redux/shop/shop.selector';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.action';
// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

const CollectionOverviewWithSpinner = WithSpinner(Collections);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {

    componentDidMount(){
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
    }

    render () {
        const { match, isCollectionsFetching } = this.props;
        return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={isCollectionsFetching} { ...props } />} />
            <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={isCollectionsFetching} { ...props } />}/>
        </div>
        );
    };
};

/*
const mapDispatchToProps = dispatch => ({
    updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
})
*/

const mapStateToProps = createStructuredSelector({
    isCollectionsFetching: selectIsCollectionsFetching 
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);