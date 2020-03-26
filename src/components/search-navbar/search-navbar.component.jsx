import React from 'react';
import {connect} from 'react-redux';
import { ReactComponent as SearchIcon } from '../../assets/img/icons/search.svg';
import { ReactComponent as DeleteIcon } from '../../assets/img/icons/delete-icon.svg';
import { fetchProducts } from '../../redux/product/product.action';
import { Link } from 'react-router-dom';

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

    closeSearch = () => {
        this.setState({showInput: false})
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
                        <input className={`${this.state.productSearch.value ? 'focused': ''} input`} autoComplete="off" name="productSearch" value={this.state.productSearch} placeholder="What're you looking for...?" onChange={this.handleChange}/> 
                        <DeleteIcon className="search-navbar-input-delete" onClick={this.closeSearch}/>
                        <div className="search-navbar-items">
                            {
                            products.map((item, idx) => <Link to={`/product/${item.id}?name=${item.name}`} onClick={this.closeSearch} key={idx}><p className="search-navbar-item">{item.name}</p></Link>)
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