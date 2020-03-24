import React from 'react';
import {connect} from 'react-redux';
import { ReactComponent as SearchIcon } from '../../assets/img/icons/search.svg';
import { ReactComponent as DeleteIcon } from '../../assets/img/icons/delete-icon.svg';
import { fetchProducts } from '../../redux/product/product.action';
import FormInput from '../form-input/form-input.component';

import './search-navbar.style.scss'

class SearchNavbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            productSearch: '',
            showInput: false,
            products: []
        }
        this.status = false;
        
    }

    handleChange = async (e) => {
        const { value, name } = e.target;
        const {fetchProducts} = this.props;
        this.setState({ [name] : value });
        if(!this.status && value !== this.state[name]){
            this.status = true;
            setTimeout(async () => {
                this.status = false;
                try{
                    const productsResponse = await fetchProducts({name: value});
                    this.setState({products: productsResponse.data.items});
                } catch(error) {
                    console.error(error);
                }
            }, 300);
          }
          setTimeout(async (value) => {
                if(value === this.state[name]){
                    try{
                        const productsResponse = await fetchProducts({name: value});
                        this.setState({products: productsResponse.data.items});
                    } catch(error) {
                        console.error(error);
                    }
                }
            }, 300, value);
    };

    toggleInput = () => {
        this.setState((prevState) => {
            return {
                showInput: !prevState.showInput
            }
        })
    }

    


    render(){
        const { showInput, products } = this.state;
        return (
        <div className="search-navbar">
            <SearchIcon className="search-navbar-icon" onClick={this.toggleInput} />
            {
                showInput && 
                <div className="search-navbar-input">
                    <div className="form-group container">
                        <input className={`${this.state.productSearch.value ? 'focused': ''} input`} name="productSearch" value={this.state.productSearch} onChange={this.handleChange}/> 
                        <DeleteIcon className="search-navbar-input-delete" onClick={() => this.setState({showInput: false})}/>
                        <div className="search-navbar-items">
                            {
                            products.map((item, idx) => <p className="search-navbar-item" key={idx}>{item.name}</p>)
                            }
                        </div>
                    </div>
                </div>
            }
        </div>);  
    }
};

const mapDispatchToProps = dispatch => ({
    fetchProducts: params =>  dispatch(fetchProducts(params)),
});

export default connect(null, mapDispatchToProps)(SearchNavbar);