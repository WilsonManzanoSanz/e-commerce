import React from 'react';
import Button from '../../components/button/button.component';
import Modal from '../../components/modal/modal.component';
import { connect } from 'react-redux';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { selectCategories, selectCategoriesIsFetching, selectProducts} from '../../redux/product/product.selector';
import { fetchCategories, fetchProducts } from '../../redux/product/product.action';
import { Dropdown, DropdownToggle, } from 'reactstrap';
import EditCategoryPanel from '../../components/edit-category-panel/edit-category-panel.component';
import ProductCreate from '../../components/product-create/product-create.component';
// import CategoryList from '../../components/category-list/category-list.component';
import ShopCard from '../../components/shop-card/shop-card.component';
 import { Product } from '../../core/models/product';

import './admin.style.scss';
export class AdminPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            productModal: false,
            category: '',
            categoryEditList: false,
            categoriesLoaded: false,
            productCreate: {
                edit: false,
                initialState: new Product(0, '', '', 0, 0, '', 0),
                showModal: false
            },
        };
        this.addAll = false;
    }

    toggle = () => {
        this.setState(prevState => ({categoryEditList: !prevState.categoryEditList}))
    };

    async componentDidMount(){
        const { fetchCategories, fetchProducts } = this.props;
        fetchProducts();
        await fetchCategories();
    }

    componentDidUpdate(prevState, prevProps){
        if(prevState.categories.length !== this.props.categories.length){
            this.addAll = true;
            this.setState({categoriesLoaded: true});
        }
    }

    handleChangeCategories = (e) => {
        const { value, name } = e.target;
        this.setState({ [name] : value });
        if(value){
            this.props.fetchProducts({filterBy: 'categoryId', value: value})
        }
        else {
            this.props.fetchProducts();
        }
    }

    showProductModal = (initialState = new Product(0, '', '', 0, 0, '', 0)) => {
        this.setState(prevstate => {
            return {
                productCreate: {
                    showModal: !prevstate.productCreate.showModal,
                    initialState: initialState,
                    edit: !!initialState.id,
                }
            }
        });
    };

    render(){
        const { categories, products = [] } = this.props;
        const selectCategories = [...categories];
        if(this.addAll && (selectCategories[0] && selectCategories[0].value !== 'all')){
            selectCategories.unshift({value: 'all', category: 'All', id: 0});
            this.addAll = false;
        }
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
                            name="category">
                            {   
                                selectCategories.map((value, idx) => <MenuItem key={idx} value={value.id}>{value.category}</MenuItem>)
                                
                            }
                        </Select>
                    </FormControl>
                    <Dropdown className="category-dropdown" toggle={this.toggle} style={{paddingRight: '20px'}}>
                        <DropdownToggle caret>
                            EDIT 
                        </DropdownToggle>
                    </Dropdown>
                    <span className="spacer"></span>
                    <Button className="primary-button admin-button" onClick={() => this.showProductModal()}>Create a Product</Button>
                </div>
                {
                    this.state.categoryEditList && <EditCategoryPanel />
                    
                }
                <div>
                    <Modal onClose={() => this.showProductModal()} show={this.state.productCreate.showModal}>
                        <ProductCreate onClose={() => this.showProductModal()}  edit={this.state.productCreate.edit} 
                        initialState={this.state.productCreate.initialState} key={this.state.productCreate.initialState.id} />
                    </Modal>
                </div>
                <hr></hr>
                <div className="flex">
                {
                    products.map(item => (
                            <ShopCard key={item.id} item={item} editModal={this.showProductModal}></ShopCard>
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
