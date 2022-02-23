import React from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { connect } from 'react-redux';
import { fetchNewProduct } from '../../redux/product/product.action';
import { selectCategories, } from '../../redux/product/product.selector';
import { FormGroup, Label, Input } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { uploadFile } from '../../core/upload';

import './product-create.style.scss';

class ProductCreate extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            price: '',
            validationMessage: '',
            categoryId: null
        };
        this.file = null;

    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name] : value });
    };

    handleSubmit = async event => {
        event.preventDefault(); 
        if(!this.state.categoryId){
            this.setState({validationMessage: 'Choose a category'});
            return;
        }
        if(!this.file){
            this.setState({validationMessage: 'Upload a file'});
            return;
        }
        const { fetchNewProduct, onClose } = this.props;
        try {
            const response = await uploadFile(this.file);
            await fetchNewProduct({...this.state, ...{photoUrl: response.path}});
            this.setState = ({
                name: '',
                description: '',
                price: '',
                categoryId: '',
                validationMessage: ''
            });
            onClose();
        } catch (error) {
            alert('Something wrong happens');
            console.error(error);
            onClose();
        }
    }

    changeValue = (e) => {
        this.setState({categoryId: e.target.value});
    }

    saveFile(){
        const inputFile = document.getElementById('product-image');
        inputFile.click();
    }

    onChangeHandler = (event) =>{
        this.file = event.target.files[0];
    }
    
    render(){
        const { categories } = this.props;
        const { validationMessage } = this.state;
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
                        <Input type="select" name="categoryId" id="categories" defaultValue={''} onChange={this.changeValue} required>
                        <option value={''}>Select one</option>
                        {
                            categories.map(value => (<option key={value.id} value={value.id}>{value.category}</option>))
                        }
                        
                        </Input>
                    </FormGroup>
                    <Button classType="inverted" type="button" onClick={this.saveFile}>UPLOAD FILE</Button>
                    <p className="error-message">{ validationMessage }</p>
                    <input type="file" accept="image/*" name="file" id="product-image" style={{display:'none'}} onChange={this.onChangeHandler}/>
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