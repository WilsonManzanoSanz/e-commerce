import React from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { fetchNewProduct, fetchPutProduct } from '../../redux/product/product.action';
import { selectCategories, } from '../../redux/product/product.selector';
import { createStructuredSelector } from 'reselect';
import { uploadFile } from '../../core/upload';
// import { Product } from '../../core/models/product';

import './product-create.style.scss';

class ProductCreate extends React.Component{
    constructor(props) {
        super(props);

        this.state = { ...props.initialState,
            validationMessage: '',
            fileName: props.initialState.photoUrl,
        };
        this.file = null;
    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name] : value });
    };

    handleSubmit = async event => {
        event.preventDefault(); 
        const { edit } = this.props;
        if(!this.state.categoryId){
            this.setState({validationMessage: 'Choose a category'});
            return;
        }
        if(!this.file && !edit){
            this.setState({validationMessage: 'Upload a file'});
            return;
        }
        const { onClose } = this.props;
        try {
            if(edit){
                await this.putNewProduct();
            } else {
                await this.postNewProduct();
            }
            this.setState({
                name: '',
                description: '',
                price: '',
                categoryId: '',
                validationMessage: ''
            });
            onClose();
        } catch (error) {
            console.error(error);
            onClose();
        }
    }

    postNewProduct = async () => {
        const {fetchNewProduct} = this.props;
        const response = await uploadFile(this.file);
        await fetchNewProduct({...this.state, ...{photoUrl: response.path}});
    }

    putNewProduct = async () => {
        const {fetchPutProduct} = this.props;
        let response = null;
        if(this.file){
            response = await uploadFile(this.file);
        }
        const putProduct = this.file ? {...this.state, ...{photoUrl: response.path}} : this.state;
        return await fetchPutProduct(putProduct);
    }

    saveFile(){
        const inputFile = document.getElementById('product-image');
        inputFile.click();
    }

    onChangeHandler = (event) =>{
        this.file = event.target.files[0];
        this.setState({fileName: event.target.files[0].name});
    }
    
    render(){
        const { categories , edit } = this.props;
        const { validationMessage, fileName } = this.state;
        const title = edit ? 'Edit' : 'Create';
        return (
            <div className="product-create">
                <h2 className="title">{title} Product</h2>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="name" type="text" label="Add your product name" value={this.state.name} handleChange={this.handleChange} required/>
                    <FormInput name="description" astextarea="true" type="text" label="Add your product description" value={this.state.description} handleChange={this.handleChange} required/>
                    <FormInput name="price" type="number" min="1" label="How much is it cost?" value={this.state.price} handleChange={this.handleChange} required/>
                    <FormControl>
                    <InputLabel id="label-select-category">Category</InputLabel>
                        <Select
                            labelId="label-select-category"
                            id="select-category"
                            value={`${this.state.categoryId}`}
                            onChange={this.handleChange}
                            name="categoryId"
                            >
                            {   
                                categories.map((value, idx) => <MenuItem key={idx} value={value.id}>{value.category}</MenuItem>)
                                
                            }
                        </Select>
                    </FormControl>
                    <FormControl>
                    <InputLabel id="label-select-disable">Disable</InputLabel>
                        <Select
                            labelId="label-select-disable"
                            id="select-disable"
                            value={`${this.state.disable}`}
                            onChange={this.handleChange}
                            name="disable"
                            >
                            <MenuItem key={0} value={0}>False</MenuItem>
                            <MenuItem key={1} value={1}>True</MenuItem>
                        </Select>
                    </FormControl>
                    {
                        fileName && <p className="filename">Filename {fileName ? fileName.replace('https://e-commerce-react-files.s3.amazonaws.com/', '') : ''} </p>
                    }
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
    fetchNewProduct: product =>  dispatch(fetchNewProduct(product)),
    fetchPutProduct: product =>  dispatch(fetchPutProduct(product))
});

const mapStateToProps = createStructuredSelector({
    categories: selectCategories,
});

ProductCreate.propTypes = {
    edit: PropTypes.bool,
    // initialState: PropTypes.instanceOf(Product)
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductCreate);