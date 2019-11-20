import React from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

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
        alert('event');
    }
    
    render(){
        return (
            <div className="category-create">
                <h2 className="title">Create Category</h2>
                <span class="description">Add a new category for your product</span>

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

export default CategoryCreate;