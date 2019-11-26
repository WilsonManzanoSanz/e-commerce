import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selector';
import { fetchCategories } from '../../redux/product/product.action';
import { selectCategories, } from '../../redux/product/product.selector';
import CollectionItem from '../collection-item/collection-item.component';

import './collections.style.scss';

class Collections extends React.Component {

    componentDidMount(){
        const { fetchCategories } = this.props;
        fetchCategories({include: true});
    }

    render(){
        const { categories } = this.props;
        return (
            <div className="collections-overview">
                {
                    categories.map(({ id, ...otherSectionProps }) => (
                        <CollectionItem key={id} {...otherSectionProps} />
                    ))
              }
            </div>
        );
    }
};

const mapStateToProps = createStructuredSelector({
    categories: selectCategories,
    collections: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
    fetchCategories: (params) => dispatch(fetchCategories(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Collections) ;