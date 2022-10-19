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
            product: {},
            productModal: false,
            category: '',
            modalKey: 0,
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

    showProduct = (product) => {
        console.log(product)
        this.setState(prevState => ({
            productModal: true,
            product,
            modalKey: prevState.modalKey + 1,
        }));
    };

    closeProduct = () => {
        this.setState(prevstate => ({
            productModal: false,
        }));
    };

    toggle = () => {
        this.setState(prevState => ({categoryDropdown: !prevState.categoryDropdown}))
    };

    componentDidMount(){
        const { fetchCategories, fetchProducts } = this.props;
        fetchCategories();
        fetchProducts({include: true});
    }

    handleChangeCategories = (e) => {
        const { value, name } = e.target;
        this.setState({ [name] : value });
    }

    selectProduct = (item) => {
        this.showProduct(item);
    }

    render(){
        const { categories, products = [] } = this.props;
        console.log('rendered parent')
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
                    <Button className="primary-button admin-button" onClick={() => this.showProduct({id: null})}>Create a Product</Button>
                </div>
                <div>
                    <Modal onClose={() => this.showCategory(new CategoryModel(null, ''))} show={this.state.categoryCreate.edit}>
                        <CategoryCreate onClose={this.showCategory} edit={this.state.categoryCreate.id} initialState={this.state.categoryCreate.initialState}></CategoryCreate>
                    </Modal>
                    <Modal onClose={this.closeProduct} show={this.state.productModal}>
                        <ProductCreate key={this.state.modalKey} onClose={this.closeProduct} edit={this.state.product.id} product={this.state.product}></ProductCreate>
                    </Modal>
                </div> 
            <hr></hr>
            <div className="flex" style={{flexWrap: 'wrap'}}>
            {
                products.map(item => (
                    <ShopCard key={item.id} item={item} editMode={true} editItem={(item) => this.selectProduct(item)}></ShopCard>
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
