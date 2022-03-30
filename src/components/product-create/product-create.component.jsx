import React from 'react';

import FormInput from '../ui/form-input/form-input.component';
import Button from '../ui/button/button.component';
import { connect } from 'react-redux';
import { fetchNewProduct, fetchUpdateProduct } from '../../redux/product/product.action';
import { selectCategories, } from '../../redux/product/product.selector';
import { FormGroup, Label, Input } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { uploadFile } from '../../core/upload';

import styles from './product-create.module.scss';

class ProductCreate extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            product: {
                name: props.product.name || '',
                id: props.product.id || '',
                photoUrl: props.product.photoUrl || '',
                description: props.product.description || '',
                price: props.product.price || '',
                categoryId: props.product.id || '',
                photos:[]
            },
            validationMessage: '',
            thumbnails: props.product.photos || []
        };
        this.file = null;
        this.formHTML = null;
    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState((prevState) => {
           return { product: {...prevState.product, [name] : value} }
        });
    };

    componentDidMount(){
        this.formHTML = document.getElementById('form-product');
    }

    handleSubmit = async event => {
        event.preventDefault(); 
        if(!this.state.product.categoryId){
            this.setState({validationMessage: 'Choose a category'});
            return;
        }
        if(!this.file && !this.state.product.photoUrl){
            this.setState({validationMessage: 'Upload a file'});
            return;
        }
        const { fetchNewProduct, onClose, fetchUpdateProduct } = this.props;
        try {
            let photoUrl = this.state.product.photoUrl;
            if(this.file){
                const response = await uploadFile(this.file);
                photoUrl = response.path;
            }
            let newProduct = {...this.state.product, photoUrl};
            if(this.state.thumbnails.length){
                debugger;
                const promises = [];
                this.state.thumbnails.forEach(thumbnail => {
                    promises.push(uploadFile(thumbnail.file));
                });
                const promisesResponse = await Promise.all(promises);  
                newProduct = {...newProduct, photos: promisesResponse.map(el => ({photoUrl: el.path}))}
            }
            this.state.product.id ? await fetchUpdateProduct(newProduct) : await fetchNewProduct(newProduct);
            this.setState({
                product: {
                    id: '',
                    name: '',
                    description: '',
                    price: '',
                    categoryId: '',
                    validationMessage: '',
                    photos:[]
                }
            });
            onClose();
        } catch (error) {
            alert('Something wrong happens');
            console.error(error);
            onClose();
        }
    }

    changeValue = (e) => {
        e.persist();
        this.setState((prevState) => {
            return { product: {...prevState.product, categoryId: e.target.value}} }
        );
    }

    addThumbnail = () => {
        const inputFile = document.getElementById('product-images');
        inputFile.click();
    }

    selectedThumbnail = (e) => {
        const file = e.target.files[0];
        this.setState((prevState) => ({thumbnails: [...prevState.thumbnails, {file, previewPhoto: URL.createObjectURL(file)} ] }));
    }

    saveFile(){
        const inputFile = document.getElementById('product-image');
        inputFile.click();
    }

    onChangeHandler = (event) =>{
        this.file = event.target.files[0];
        this.setState({previewPhoto: URL.createObjectURL(this.file)})
    }
    
    render(){
        const { categories } = this.props;
        const { validationMessage } = this.state;
        const photoUrl = this.state.previewPhoto || this.state.product.photoUrl; 
        return (
            <div className={styles.productCreate}>
                <h2 className={styles.title}>Create Product</h2>
                <span className={styles.description}>Add a new product</span>

                <form onSubmit={this.handleSubmit} id="form-product">
                    <FormInput name="name" type="text" label="Add your product name" value={this.state.product.name} handleChange={this.handleChange} required/>
                    <FormInput name="description" astextarea="true" type="text" label="Add your product description" value={this.state.product.description} handleChange={this.handleChange} required/>
                    <FormInput name="price" type="number" label="How much is it cost?" value={this.state.product.price} handleChange={this.handleChange} required/>
                    <FormGroup>
                        <Label for="categories">Category</Label>
                        <Input type="select" name="categoryId" id="categories" defaultValue={this.state.product.categoryId} onChange={this.changeValue} required>
                        <option value={''}>Select one</option>
                        {
                            categories.map(value => (<option key={value.id} value={value.id}>{value.category}</option>))
                        }
                        
                        </Input>
                    </FormGroup>
                    {
                        photoUrl && <img className={styles.previewPhoto} src={photoUrl} alt="product" />
                    }
                    <div className={styles.multiplePhotos}>
                        {
                            (!this.state.photos || !this.state.photos.length) && photoUrl && (
                                <Button classType="" style={{width: '50px'}} type="button" onClick={this.addThumbnail}>+</Button>
                            )
                        }
                         <input type="file" accept="image/*" name="file" id="product-images" style={{display:'none'}} onChange={this.selectedThumbnail}/>
                        {
                            this.state.thumbnails && this.state.thumbnails.map((thumbnail, idx) => 
                            (<div className={styles.thumbnail} key={idx}>
                                <img src={thumbnail.photoUrl ? thumbnail.photoUrl : thumbnail.previewPhoto} alt="thumbnail"></img>
                            </div>))
                        }
                    </div>
                    <p className="error-message">{ validationMessage }</p>
                    <input type="file" accept="image/*" name="file" id="product-image" style={{display:'none'}} onChange={this.onChangeHandler}/>
                    <div className={styles.buttons}>
                        <Button classType="inverted" type="button" onClick={this.saveFile}>UPLOAD MAIN FILE</Button>
                        <Button type="submit">SUBMIT</Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchNewProduct: product =>  dispatch(fetchNewProduct(product)),
    fetchUpdateProduct: product =>  dispatch(fetchUpdateProduct(product))
});

const mapStateToProps = createStructuredSelector({
    categories: selectCategories,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreate);