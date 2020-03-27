import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchGlobalProducts } from '../../redux/product/product.action';
import WithSpinner from '../../components/spinner-page/spinner-page.component';
import ProductsPage from './products.component';
import {selectIsFetchingProducts} from '../../redux/product/product.selector';
const WithSpinnerProducts = WithSpinner(ProductsPage);

class Products extends React.Component{
    constructor(props){
        super(props);
        const params = new URLSearchParams(props.location.search);
        this.state = {
            products: [],
            query: params.get('search_query')
        }
        // this.query = '';
    }

    async componentDidMount(){
    }

    componentDidUpdate(prevProps, prevState){
        const params = new URLSearchParams(this.props.location.search);
        const query = params.get('search_query');
        if(query !== this.state.query){
            this.setState({'query': query});
        }
    }
    
    render(){
        const {isSearchFetching, ...props} = this.props;
        return(<div>
                {
                    this.state.query ? <WithSpinnerProducts isLoading={isSearchFetching} { ...props } query={this.state.query} />
                    : <Redirect to="/"></Redirect>
                }
            </div>);
    }
    
};

const mapStateToProps = (state) => {
    return {
        selectIsFetchingProducts: selectIsFetchingProducts(state)
    }
}


const mapDispatchToProps = dispatch => ({
    fetchProducts: params =>  dispatch(fetchGlobalProducts(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
