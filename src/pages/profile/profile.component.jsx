import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { uploadFile } from '../../core/upload';
import MenuItem from '@material-ui/core/MenuItem';
import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';
import { Select } from '@material-ui/core';
import  DateInput  from '../../components/date-picker/date-picker.component';

import './profile.style.scss';

class ProfilePage extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            displayName: '',
            phone: '',
            address: '',
            city: '',
            password:'',
            confirmPassword: '',
            validationMessage: '',
            age: 0,
        };
    }

    componentDidMount(){
        let defaultValues = Object.assign({}, this.props.currentUser);
        for (const property in defaultValues) {
            defaultValues[property] = defaultValues[property] ? defaultValues[property] : '';
        }
        this.setState(
            (prevState, props) => { 
                return { ...prevState, ...defaultValues}
            }
        );
    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name] : value });
    };

    handleSubmit = async event => {
        event.preventDefault();
        // const { fetchNewCategory, onClose } = this.props;
        if(!this.file){
            this.setState({validationMessage: 'Upload a file'});
            return;
        }
        try {
            const response = await uploadFile(this.file);
            // await fetchNewCategory({...this.state, ...{photoUrl: response.path}});
            this.setState({category: ''});
             // onClose();
        } catch (error) {
            // onClose();
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
        const {currentUser} = this.props;
        return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="photo-container">
                    <img src={currentUser.photoUrl ? (currentUser.photoUrl) : ('https://www.seekpng.com/png/detail/413-4139803_unknown-profile-profile-picture-unknown.png')} alt="profile picture"/>
                </div>
                <form className="form-profile" id="user-form" onSubmit={this.handleSubmit}>
                    <FormInput name="displayName" type="text" label="Your full name" value={this.state.displayName} handleChange={this.handleChange} required/>
                    <FormInput name="phone" type="text" label="Your cellphone number" value={this.state.phone} handleChange={this.handleChange}/>
                    <FormInput name="address" type="text" label="Your full address" value={this.state.address} handleChange={this.handleChange}/>
                    <FormInput name="city" type="text" label="Your full name" value={this.state.city} handleChange={this.handleChange}/>
                    <FormInput name="password" type="password" label="Set your new passwrod" value={this.state.password} handleChange={this.handleChange}/>
                    <FormInput name="passwordRepeated" type="password" label="Repeat your new password" value={this.state.confirmPassword} handleChange={this.handleChange}/>
                    <DateInput
                        selected={this.state.date}
                        onSelect={this.handleSelect} //when day is clicked
                        onChange={this.handleChange} //only when value has changed
                        />
                    <p className="error-message">{ this.validationMessage }</p>
                    <input type="file" name="file" accept="image/*" id="category-image" style={{display:'none'}} onChange={this.onChangeHandler}/>
                    <div className="buttons">
                        <Button classType="inverted" type="button" onClick={this.saveFile}>UPLOAD FILE</Button>
                        <Button type="submit">SUBMIT</Button>
                    </div>
                </form>
            </div>
        </div>);
    }
} 


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
})

export default connect(mapStateToProps, null)(ProfilePage);