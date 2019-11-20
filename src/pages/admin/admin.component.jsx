import React from 'react';
import Button from '../../components/button/button.component';
import Modal from '../../components/modal/modal.component';
import CategoryCreate from '../../components/category-create/category-create.component';
import CategoryList from '../../components/category-list/category-list.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCategories, selectCategoriesIsFetching } from '../../redux/product/product.selector';
import { fetchCategories } from '../../redux/product/product.action';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './admin.style.scss';
export class AdminPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            categoryDropdown: false
        };
    }
    showModal = e => {
        this.setState(prevstate => ({
          show: !prevstate.show
        }));
    };

    toggle = () => {
        this.setState(prevState => ({categoryDropdown: !prevState.categoryDropdown}))
    };

    componentDidMount(){
        const { fetchCategories } = this.props;
        fetchCategories();
    }

    render(){
        const {categories} = this.props;
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
                    <Button className="primary-button admin-button" onClick={() => this.showModal()}>Create a Category</Button>
                    <Button className="primary-button admin-button">Create a Product</Button>
                </div>
                <div>
                    <Modal onClose={this.showModal} show={this.state.show}>
                        <CategoryCreate onClose={this.showModal}></CategoryCreate>
                    </Modal>
                </div>
                <div>
                    <CategoryList categories={this.props.categories}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    categories: selectCategories,
    isFetching: selectCategoriesIsFetching
});

const mapDispatchToProps = dispatch => ({
    fetchCategories: category =>  dispatch(fetchCategories(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
