import React from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchNewCategory, fetchPutCategory } from '../../redux/product/product.action';
import { uploadFile } from '../../core/upload';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { Category } from '../../core/models/category';

import './category-create.style.scss';

class CategoryCreate extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            category: props.initialState.category,
            validationMessage: '',
            id: props.initialState.id,
            fileName: props.initialState.photoUrl,
        };
        console.log(props);
        this.file = null;
    }
    
    /*
    static getDerivedStateFromProps(props, state){
        console.log('props', props);
        console.log('state', state);
        debugger;
        return ({
            category: props.initialState.category
        })
    }
    */

    componentDidMount(){
        /*
        if(this.props.initialState.id){
            this.setState({category: this.props.initialState.id})
        }*/
    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name] : value });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { onClose, edit } = this.props;
        if(!this.file && !edit){
            this.setState({validationMessage: 'Upload a file'});
            return;
        }
        try {
            if(edit){
                await this.updateCategory();
                this.state({fileName: ''});
            } else {
                await this.addNewCategory();
                this.state({fileName: ''});
            }
            this.setState({category: ''});
            onClose();
        } catch (error) {
            onClose();
        }
    }

    addNewCategory = async () => {
        const {fetchNewCategory} = this.props;
        const response = await uploadFile(this.file);
        return await fetchNewCategory({...this.state, ...{photoUrl: response.path}});
    }

    updateCategory = async () => {
        const {fetchPutCategory} = this.props;
        let response = null;
        if(this.file){
            response = await uploadFile(this.file);
        }
        const putCategory = this.file ? {...this.state, ...{photoUrl: response.path}} : this.state;
        return await fetchPutCategory(putCategory);
    }

    saveFile(){
        const inputFile = document.getElementById('category-image');
        inputFile.click();
    }
    
    onChangeHandler = (event) =>{
        this.file = event.target.files[0];
        this.setState({fileName: event.target.files[0].name});
    }

    render(){
        const { validationMessage, fileName } = this.state;
        const { edit } = this.props;
        const title = edit ? 'Edit' : 'Create';
        return (
            <div className="category-create">
                <h2 className="title">{`${title} Category`}</h2>
                <span className="description">{`${title} a new category for your product`}</span>
                <form onSubmit={this.handleSubmit}>
                    {   
                        this.initialState && <input style={{display: 'none'}} name="id" value={this.initialState.id}/>
                    }
                    <FormInput name="category" type="text" label="Add your category" value={this.state.category} handleChange={this.handleChange} required/>
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
                    <input type="file" name="file" accept="image/*" id="category-image" style={{display:'none'}} onChange={this.onChangeHandler}/>
                    <div className="buttons">
                        <Button type="submit">SUBMIT</Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchNewCategory: category =>  dispatch(fetchNewCategory(category)),
    fetchPutCategory: category => dispatch(fetchPutCategory(category))
});

CategoryCreate.propTypes = {
    edit: PropTypes.bool,
    initialState: PropTypes.instanceOf(Category)
  };

export default connect(null, mapDispatchToProps)(CategoryCreate);