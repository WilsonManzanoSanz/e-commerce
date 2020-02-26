import React from 'react';
import Button from '../../components/button/button.component';
import Modal from '../../components/modal/modal.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCategories, selectCategoriesIsFetching, selectProducts} from '../../redux/product/product.selector';
import { fetchCategories, fetchProducts } from '../../redux/product/product.action';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import CategoryCreate from '../../components/category-create/category-create.component';
import ProductCreate from '../../components/product-create/product-create.component';
import CategoryList from '../../components/category-list/category-list.component';
import ShopCard from '../../components/shop-card/shop-card.component';

import './admin.style.scss';
export class AdminPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categoryModal: false,
            productModal: false,
            categoryDropdown: false
        };
    }

    showCategory = e => {
        this.setState(prevstate => ({
            categoryModal: !prevstate.categoryModal
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

    render(){
        const { categories, products = [] } = this.props;
        return (
            <div className="admin-page">
            <hr></hr>
                <div className="flex">
                    <h1 className="title"> Admin page </h1>
                    <Dropdown className="category-dropdown" isOpen={this.state.categoryDropdown} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Categories
                        </DropdownToggle>
                        <DropdownMenu>
                            {
                                categories.map((value) => <DropdownItem key={value.id}>{value.category}</DropdownItem>)
                            }
                        </DropdownMenu>  
                    </Dropdown>
                    <span className="spacer"></span>
                    <Button className="primary-button admin-button" onClick={() => this.showCategory()}>Create a Category</Button>
                    <Button className="primary-button admin-button" onClick={() => this.showProduct()}>Create a Product</Button>
                </div>
                <div>
                    <Modal onClose={this.showCategory} show={this.state.categoryModal}>
                        <CategoryCreate onClose={this.showCategory}></CategoryCreate>
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