import React from 'react';
import { connect } from 'react-redux';
import ShopCard from '../../components/shop-card/shop-card.component';
import { fetchCategories, fetchGlobalProducts } from '../../redux/product/product.action';
import { selectCategory, selectProducts, selectIsFetchingProducts } from '../../redux/product/product.selector';

import './collection.style.scss';

class CollectionPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            category: {}
        };
    }

    async componentDidMount(){
        const { fetchCategories, fetchProducts } = this.props;
        const id = this.props.match.params.collectionId;
        const categoryResponse = await fetchCategories({filterBy: 'category', value: id});
        if(categoryResponse.data.items){
            fetchProducts({filterBy: 'categoryId', value: categoryResponse.data.items[0].id});
        }
        this.setState({category: categoryResponse});
        // fetchProducts({filterBy: 'category', thi});
    }

    componentDidUpdate(prevState, prevProps){
        if(prevState.selectIsFetchingProducts && prevState.selectIsFetchingProducts && !this.props.selectIsFetchingProducts){
            console.log('finished');
        }
    }


    render(){
        let {category = {category: ''}, products =  []} = this.props;
        return (
            <div className="collection-page">
                <h2 className="title">{ category.category }</h2>
                <div className="items">
                    {
                        products && products.map(
                            item =>  <ShopCard key={item.id} item={item}/>
                        )
                    }
                </div>
            </div>);
    }
};

const mapDispatchToProps = dispatch => ({
    fetchCategories: (params) => dispatch(fetchCategories(params)),
    fetchProducts: (params) => dispatch(fetchGlobalProducts(params))
  });

const mapStateTopProps = (state, ownProps) => ({
    category: selectCategory(ownProps.match.params.collectionId)(state),
    products: selectProducts(state),
    isFetchingProducts: selectIsFetchingProducts(state)
})

export default connect(mapStateTopProps, mapDispatchToProps)(CollectionPage);