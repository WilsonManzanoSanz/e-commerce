import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCategories, selectCategoriesIsFetching} from '../../redux/product/product.selector';
import { fetchCategories, fetchProducts } from '../../redux/product/product.action';
import Button from '../../components/button/button.component';
import { Category } from '../../core/models/category';
import Modal from '../../components/modal/modal.component';
import CategoryCreate from '../../components/category-create/category-create.component';

import { ReactComponent as EditIcon } from '../../assets/img/icons/edit-icon.svg';
import { ReactComponent as DeleteIcon } from '../../assets/img/icons/delete-icon.svg';

import './edit-category-panel.style.scss';

class EditCategoryPanel extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            categoryCreate: {
                edit: false,
                initialState: new Category(null, ''),
                showModal: false
            },
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

    componentDidMount(){
        const { fetchCategories } = this.props;
        fetchCategories();
    }

    render(){
        const { categories } = this.props;
        return (<div>
            <div>
            <React.Fragment>
                <div className="edit-category">
                    {
                        categories.map((value) => 
                        <div className="edit-category-item" key={value.id}>
                                <span className="edit-category-item-name">{value.category}</span>
                                <span className="spacer"></span>
                                <EditIcon className="edit-category-item-icon" onClick={() => this.showCategory(new Category(value.id, value.category))}></EditIcon>
                                <DeleteIcon className="edit-category-item-icon" onClose={this.showConfirmDialog}></DeleteIcon>
                        </div>
                        )
                    }
                </div>
            </React.Fragment>
            </div>
            <div className="flex">
                <Button className="primary-button admin-button" onClick={() => this.showCategory(new Category(null, ''))}>Create a Category</Button>
            </div>
            <Modal onClose={() => this.showCategory(new Category(null, ''))} onResult={this.onResultCategoryModal} show={this.state.categoryCreate.showModal}>
                <CategoryCreate onClose={() => this.showCategory(new Category(null, ''))}  edit={this.state.categoryCreate.edit} initialState={this.state.categoryCreate.initialState} key={this.state.categoryCreate.initialState.id}></CategoryCreate>
            </Modal>
        </div>);
    }
}

const mapStateToProps = createStructuredSelector({
    categories: selectCategories,
    isFetching: selectCategoriesIsFetching
});

const mapDispatchToProps = dispatch => ({
    fetchCategories: category =>  dispatch(fetchCategories(category)),
    fetchProducts: params =>  dispatch(fetchProducts(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryPanel);