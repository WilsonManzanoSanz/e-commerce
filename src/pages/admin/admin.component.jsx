import React from 'react';
import Button from '../../components/ui/button/button.component';
import Modal from '../../components/ui/modal/modal.component';
import { connect } from 'react-redux';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { selectCategories, selectCategoriesIsFetching, selectProducts} from '../../redux/product/product.selector';
import { fetchCategories, fetchProducts } from '../../redux/product/product.action';
import CategoryCreate from '../../components/category-create/category-create.component';
import ProductCreate from '../../components/product-create/product-create.component';
import ShopCard from '../../components/shop-card/shop-card.component';
import { CategoryModel } from '../../core/models/category';

import './admin.style.scss';
export class AdminPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categoryCreate: {
                edit: false,
                initialState: new CategoryModel(null, '')
            },
            productModal: false,
            category: '',
            categoryDropdown: false
        };
    }

    showCategory = (initialState = {}) => {
        this.setState(prevstate => ({
            categoryCreate: {
                edit: !prevstate.categoryCreate.edit,
                initialState: initialState
            }
        }));
    };

    showProduct = e => {
        this.setState(prevstate => ({
            productModal: !prevstate.productModal
        }));
    };

    toggle = () => {
        this.setState(prevState => ({categoryDropdown: !prevState.categoryDropdown}))
    };

    componentDidMount(){
        const { fetchCategories, fetchProducts } = this.props;
        fetchCategories();
        fetchProducts();
    }

    handleChangeCategories = (e) => {
        const { value, name } = e.target;
        this.setState({ [name] : value });
    }

    render(){
        const { categories, products = [] } = this.props;
        return (
            <div className="admin-page">
            <hr></hr>
                <div className="flex">
                    <h1 className="title"> Admin page </h1>
                    <FormControl style={{width: '200px', marginLeft: '20px'}}>
                        <InputLabel id="label-select-categories">Filter By Categories</InputLabel>
                        <Select
                            labelId="label-select-categories"
                            id="select-categories"
                            value={`${this.state.category}`}
                            onChange={this.handleChangeCategories}
                            name="category"
                            >
                            {   
                                categories.map((value, idx) => <MenuItem key={idx} value={value.id}>{value.category}</MenuItem>)
                                
                            }
                        </Select>
                    </FormControl>
                    <span className="spacer"></span>
                    <Button className="primary-button admin-button" onClick={() => this.showCategory(new CategoryModel(null, ''))}>Create a Category</Button>
                    <Button className="primary-button admin-button" onClick={() => this.showProduct()}>Create a Product</Button>
                </div>
                <div>
                    <Modal onClose={() => this.showCategory(new CategoryModel(null, ''))} show={this.state.categoryCreate.edit}>
                        <CategoryCreate onClose={this.showCategory} edit={this.state.categoryCreate.id} initialState={this.state.categoryCreate.initialState}></CategoryCreate>
                    </Modal>
                    <Modal onClose={this.showProduct} show={this.state.productModal}>
                        <ProductCreate onClose={this.showProduct}></ProductCreate>
                    </Modal>
                </div>
            <hr></hr>
            <div className="flex">
            {
                products.map(item => (
                        <ShopCard key={item.id} item={item}></ShopCard>
                ))
            }
            </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    categories: selectCategories,
    products: selectProducts,
    isFetching: selectCategoriesIsFetching
});

const mapDispatchToProps = dispatch => ({
    fetchCategories: category =>  dispatch(fetchCategories(category)),
    fetchProducts: params =>  dispatch(fetchProducts(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
