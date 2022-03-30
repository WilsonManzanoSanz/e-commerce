import React from 'react';
import { connect } from 'react-redux';
import ShopCard from '../../components/shop-card/shop-card.component';
import { fetchCategories } from '../../redux/product/product.action';
import { selectCategory } from '../../redux/product/product.selector';

import './collection.style.scss';

class CollectionPage extends React.Component {
    componentDidMount(){
        const { fetchCategories } = this.props;
        fetchCategories({include: true});
    }


    render(){
        let {category = {category: '', products: []}} = this.props;
        return (
            <div className="collection-page">
                <h2 className="title">{ category.category }</h2>
                <div className="items">
                    {
                        category.products.map(
                            item =>  <ShopCard key={item.id} item={item}/>
                        )
                    }
                </div>
            </div>);
    }
};

const mapDispatchToProps = dispatch => ({
    fetchCategories: (params) => dispatch(fetchCategories(params))
  });

const mapStateTopProps = (state, ownProps) => ({
    category: selectCategory(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateTopProps, mapDispatchToProps)(CollectionPage);