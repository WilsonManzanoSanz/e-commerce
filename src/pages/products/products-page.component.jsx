import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchProducts } from '../../redux/product/product.action';
import WithSpinner from '../../components/spinner-page/spinner-page.component';
import ProductsPage from './products.component';
import {selectIsFetchingProducts} from '../../redux/product/product.selector';

class Products extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            products: []
        }
        this.query = '';
    }

    componentDidUpdate(){

    }

    async componentDidMount(){
        try{
            const productsResponse = await fetchProducts({name: this.query});

        } catch(error) {
            console.error(error);
        }
    }

    render(){
        const {isSearchFetching, ...props} = this.props;
        const otherProps = {...props, ...this.state.products};
        const params = new URLSearchParams(this.props.location.search);
        this.query = params.get('search_query'); // bar
        const WithSpinnerProducts = WithSpinner(ProductsPage);
        return(<div>
                {
                    this.query ? <WithSpinnerProducts isLoading={isSearchFetching} { ...otherProps } />
                    : <Redirect to="/"></Redirect>
                }
            </div>);
    }
    
};

const mapStateToProps = (state) => {
    return {
        selectIsFetchingProducts: selectIsFetchingProducts(state.products)
    }
}


const mapDispatchToProps = dispatch => ({
    fetchProducts: params =>  dispatch(fetchProducts(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
