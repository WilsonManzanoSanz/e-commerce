import React from 'react';
import Button from '../../components/button/button.component';
import Modal from '../../components/modal/modal.component';
import { connect } from 'react-redux';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { selectCategories, selectCategoriesIsFetching, selectProducts} from '../../redux/product/product.selector';
import { fetchCategories, fetchProducts } from '../../redux/product/product.action';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import CategoryCreate from '../../components/category-create/category-create.component';
import ProductCreate from '../../components/product-create/product-create.component';
import CategoryList from '../../components/category-list/category-list.component';
import ShopCard from '../../components/shop-card/shop-card.component';
import { Category } from '../../core/models/category';

import './admin.style.scss';
export class AdminPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categoryCreate: {
                edit: false,
                initialState: new Category(null, ''),
                showModal: false
            },
            productModal: false,
            category: '',
            categoryDropdown: false
        };
    }

    showCategory = (initialState = {}) => {
        this.setState(prevstate => {
            return {
                categoryCreate: {
                    showModal: !prevstate.categoryCreate.showModal,
                    initialState: initialState,
                    edit: !!initialState.id,
                }
            }
        });
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
                    <Dropdown className="category-dropdown" isOpen={this.state.categoryDropdown} toggle={this.toggle} style={{paddingRight: '20px'}}>
                        <DropdownToggle caret>
                            EDIT 
                        </DropdownToggle>
                        <DropdownMenu>
                            {
                                categories.map((value) => <DropdownItem onClick={() => this.showCategory(new Category(value.id, value.category))} key={value.id}>{value.category}</DropdownItem>)
                            }
                        </DropdownMenu>  
                    </Dropdown>
                    <span className="spacer"></span>
                    <Button className="primary-button admin-button" onClick={() => this.showCategory(new Category(null, ''))}>Create a Category</Button>
                    <Button className="primary-button admin-button" onClick={() => this.showProduct()}>Create a Product</Button>
                </div>
                <div>
                    <Modal onClose={() => this.showCategory(new Category(null, ''))} show={this.state.categoryCreate.showModal}>
                        <CategoryCreate onClose={() => this.showCategory(new Category(null, ''))}  edit={this.state.categoryCreate.edit} initialState={this.state.categoryCreate.initialState} key={this.state.categoryCreate.initialState.id}></CategoryCreate>
                    </Modal>
                    <Modal onClose={this.showProduct} show={this.state.productModal}>
                        <ProductCreate onClose={this.showProduct}></ProductCreate>
                    </Modal>
                </div>
                <div>
                    <CategoryList categories={this.props.categories}/>
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
