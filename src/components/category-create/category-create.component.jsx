import React from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { connect } from 'react-redux';
import { fetchNewCategory } from '../../redux/product/product.action';
import { uploadFile } from '../../core/upload';

import './category-create.style.scss';

class CategoryCreate extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            category: '',
            validationMessage: '',
        };

        this.file = null;
    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name] : value });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { fetchNewCategory, onClose } = this.props;
        if(!this.file){
            this.setState({validationMessage: 'Upload a file'});
            return;
        }
        try {
            const response = await uploadFile(this.file);
            await fetchNewCategory({...this.state, ...{photoUrl: response.path}});
            this.setState({category: ''});
            onClose();
        } catch (error) {
            onClose();
        }
    }

    saveFile(){
        const inputFile = document.getElementById('category-image');
        inputFile.click();
    }
    
    onChangeHandler = (event) =>{
        this.file = event.target.files[0];
    }

    render(){
        const { validationMessage } = this.state;
        return (
            <div className="category-create">
                <h2 className="title">Create Category</h2>
                <span className="description">Add a new category for your product</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="category" type="text" label="Add your category" value={this.state.category} handleChange={this.handleChange} required/>
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
    fetchNewCategory: category =>  dispatch(fetchNewCategory(category))
});

export default connect(null, mapDispatchToProps)(CategoryCreate);