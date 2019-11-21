import React from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { connect } from 'react-redux';
import { fetchNewProduct } from '../../redux/product/product.action';
import { selectCategories, } from '../../redux/product/product.selector';
import { FormGroup, Label, Input } from 'reactstrap';
import { createStructuredSelector } from 'reselect';

import './product-create.style.scss';

class ProductCreate extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            price: '',
            dropDownValue: null
        };

    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name] : value });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { fetchNewProduct, onClose } = this.props;
        console.log(this.state);
        fetchNewProduct(this.state)
        .then(response => {
            this.state = {
                name: '',
                description: '',
                price: '',
                dropDownValue: null
            };
            onClose();
        })
        .catch(error => onClose());
    }

    changeValue(e) {
        this.setState({dropDownValue: e.currentTarget.textContent})
    }
    
    render(){
        const { categories } = this.props;
        return (
            <div className="product-create">
                <h2 className="title">Create Product</h2>
                <span className="description">Add a new product</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="name" type="text" label="Add your product name" value={this.state.name} handleChange={this.handleChange} required/>
                    <FormInput name="description" astextarea="true" type="text" label="Add your product description" value={this.state.description} handleChange={this.handleChange} required/>
                    <FormInput name="price" type="number" label="How much is it cost?" value={this.state.price} handleChange={this.handleChange} required/>
                    <FormGroup>
                        <Label for="categories">Category</Label>
                        <Input type="select" name="categoryId" id="categories" required>
                        <option value={null}  onClick={this.changeValue} selected disabled>Select one</option>
                        {
                            categories.map(value => (<option key={value.id} value={value.id}>{value.category}</option>))
                        }
                        
                        </Input>
                    </FormGroup>
                    <div className="buttons">
                        <Button type="submit">SUBMIT</Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchNewProduct: product =>  dispatch(fetchNewProduct(product))
});

const mapStateToProps = createStructuredSelector({
    categories: selectCategories,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreate);