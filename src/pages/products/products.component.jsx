import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProducts } from '../../redux/product/product.selector';
import { fetchGlobalProducts } from '../../redux/product/product.action';
import ShopCard from '../../components/shop-card/shop-card.component';
import FormInput from '../../components/form-input/form-input.component'

class Products extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            productSearch: props.query,
        }
        this.status = false;
    }
    
    componentDidMount(){
        this.searchProducts(this.state.productSearch);
    }

    componentDidUpdate(prevProps, prevState){   
        if(prevProps.query !== this.props.query){
            this.searchProducts(this.props.query);
            this.setState({productSearch: this.props.query});
        }
    }
    
    handleChange = async (e) => {
        const { value, name } = e.target;
        this.setState({ [name] : value });
        if(!this.status && value !== this.state[name]){
            this.status = true;
            setTimeout(async () => {
                this.status = false;
                this.searchProducts(value);
            }, 300);
          }
          setTimeout(async (value) => {
                if(value === this.state[name]){
                    this.searchProducts(value);
                }
            }, 300, value);
    };

    searchProducts =  async (value) => {
        const { fetchProducts } = this.props;
        try{
            const productsResponse = await fetchProducts({name: value});
            this.setState({products: productsResponse.data.items});
        } catch(error) {
            console.error(error);
        }
    }


    render(){
        const { products = [] } = this.props;
        return(<div>
            <div>
                <FormInput name="productSearch" type="text" label="Search a product" value={this.state.productSearch} handleChange={this.handleChange} required/>     
            </div>
            <div className="flex">
            {
                products.map(item => (
                        <ShopCard key={item.id} item={item} editModal={this.showProductModal}></ShopCard>
                ))
            }
            </div>
        </div>);
    }
};

const mapStateToProps = createStructuredSelector({
    products: selectProducts,
});

const mapDispatchToProps = dispatch => ({
    fetchProducts: params =>  dispatch(fetchGlobalProducts(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);