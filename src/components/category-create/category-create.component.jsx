import React from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { connect } from 'react-redux';
import { fetchNewCategory } from '../../redux/product/product.action';

import './category-create.style.scss';

class CategoryCreate extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            category: '',
        };

    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name] : value });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { fetchNewCategory, onClose } = this.props;
        fetchNewCategory(this.state)
        .then(response => {
            this.setState({category: ''})
            onClose();
        })
        .catch(error => onClose());

    }
    
    render(){
        return (
            <div className="category-create">
                <h2 className="title">Create Category</h2>
                <span className="description">Add a new category for your product</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="category" type="text" label="Add your category" value={this.state.category} handleChange={this.handleChange} required/>
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