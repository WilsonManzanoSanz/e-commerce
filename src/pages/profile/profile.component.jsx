import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectFetchPutUser } from '../../redux/user/user.selector';
import { uploadFile } from '../../core/upload';
import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import Spinner from '../../components/spinner/spinner.component';
import { updateUser,  setCurrentUser } from '../../redux/user/user.action';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import  DateInput  from '../../components/date-picker/date-picker.component';

import './profile.style.scss';

class ProfilePage extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            displayName: '',
            phone: '',
            address: '',
            city: 0,
            department: '',
            newpassword:'',
            confirmPassword: '',
            validationMessage: '',
            idCard: 0,
            age: 0,
            departments: [],
            cities: [],
            loadingCities: false,
            imageUploading: false
        };
    }

    componentDidUpdate(prevState, prevProps){
        if(prevState.userResponse && prevState.userResponse.loading && !this.props.userResponse.loading){
            this.props.history.push('/');
        }
    }

    componentDidMount(){
        let defaultValues = Object.assign({}, this.props.currentUser);
        /* eslint-disable */
        for (const property in defaultValues) {
            defaultValues[property] = defaultValues[property] ? defaultValues[property] : '';
            
        }
        /* eslint-enable */  
        this.setState(
            (prevState, props) => { 
                return { ...prevState, ...defaultValues}
            }
        );
        this.getDeparments();
    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name] : value });
    };

    handleChangeDeparment = (e) => {
        const { value, name } = e.target;
        this.setState({ [name] : value });
        this.getCities(value);
    };

    deleteUnsedProperties(object){
        let defaultValues = Object.assign({}, object);
        /* eslint-disable */
        for (const property in defaultValues) {
            if(!defaultValues[property]){
                delete defaultValues[property];
            }
        }
        /* eslint-enable */
        return defaultValues;
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { updateUser } = this.props;
        if(this.state.newpassword !== this.state.confirmPassword){
            this.setState({validationMessage: 'Passwords do not match'})
            return;
        }
        try {
            this.setState({imageUploading: true});
            let fileURL = {};
            if(this.file){
                fileURL = await uploadFile(this.file);
            }
            this.setState({imageUploading: false});
            const newUser = this.deleteUnsedProperties({...this.state, ...{photoUrl: fileURL.path}});
            await updateUser(newUser);
            // this.setState({category: ''});
             // onClose();
        } catch (error) {
            // onClose();
            console.error(error);
        } finally { 
            this.setState({imageUploading: false});
            toast.error("Something went wrong");
        }
    }

    getDeparments = async () => {
        try{
            let response = await fetch('https://www.datos.gov.co/resource/xdk5-pm3f.json?$group=departamento&$select=departamento,MAX(c_digo_dane_del_departamento)&$order=departamento')
            const json = await response.json();
            this.setState({
                departments: json
            })
            if(this.state.department){
                this.getCities(this.state.department);
            }
            return json;
        } catch(error){
            console.error(error);
        }
    }

    getCities = async (departmentId) => {
        try{
            this.setState({loadingState: true});
            let response = await fetch(`https://www.datos.gov.co/resource/xdk5-pm3f.json?$where=c_digo_dane_del_departamento=${departmentId}&$select=municipio, c_digo_dane_del_municipio&$order=municipio`)
            const json = await response.json();
            this.setState({
                cities: json
            });
            this.setState({loadingState: false});
            return json;
        } catch(error){
            console.error(error);
            this.setState({loadingState: false});
        }
    }

    saveFile(){
        const inputFile = document.getElementById('category-image');
        inputFile.click();
    }
    
    onChangeHandler = (event) =>{
        this.file = event.target.files[0];
    }

    renderRedirect = () => {
        if (!this.props.currentUser) {
          return <Redirect to='/login' />
        }
    }

    render(){
        const { currentUser } = this.props;
        const { userResponse } = this.props;
        const { departments, cities } = this.state;
        return (
        <div className="profile-page">
            {this.renderRedirect()}
            <div className="profile-card">
                <div className="photo-container">
                    <img src={currentUser && currentUser.photoUrl ? (currentUser.photoUrl) : ('https://www.seekpng.com/png/detail/413-4139803_unknown-profile-profile-picture-unknown.png')} alt="profile pic"/>
                </div>
                <form className="form-profile" id="user-form" onSubmit={this.handleSubmit}>
                    <FormInput name="displayName" type="text" label="Your full name" value={this.state.displayName} handleChange={this.handleChange} required/>
                    <FormInput name="phone" type="text" label="Your cellphone number" value={this.state.phone} handleChange={this.handleChange}/>
                    <FormInput name="address" type="text" label="Your full address" value={this.state.address} handleChange={this.handleChange}/>
                    <FormInput name="idCard" type="text" label="Your ID Card" value={this.state.idCard} handleChange={this.handleChange}/>
                     <FormControl>
                        <InputLabel id="label-select-department">Department</InputLabel>
                        <Select
                            labelId="label-select-department"
                            id="select-department"
                            value={`${this.state.department}`}
                            onChange={this.handleChangeDeparment}
                            name="department"
                            >
                            {   
                                departments.map((value, idx) => <MenuItem key={idx} value={value.MAX_c_digo_dane_del_departamento}>{value.departamento}</MenuItem>)
                                
                            }
                        </Select>
                    </FormControl>
                    
                    <FormControl>
                        <InputLabel id="label-select-city">City</InputLabel>
                        <Select
                            labelId="label-select-city"
                            id="select-city"
                            value={`${this.state.city}`}
                            onChange={this.handleChange}
                            name="city"
                            >
                            {   
                                cities.map((value, idx) => <MenuItem key={idx} value={value.c_digo_dane_del_municipio}>{value.municipio}</MenuItem>) 
                            }
                        </Select>
                    </FormControl>
                    
                    <FormInput name="newpassword" type="password" label="Set your new passwrod" value={this.state.newpassword} handleChange={this.handleChange}/>
                    <FormInput name="confirmPassword" type="password" label="Repeat your new password" value={this.state.confirmPassword} handleChange={this.handleChange}/>
                    {
                        /*
                        <DateInput
                            selected={this.state.date}
                            onSelect={this.handleSelect} //when day is clicked
                            onChange={this.handleChange} //only when value has changed
                        />
                        */
                    }
                    <p className="error-message">{ this.validationMessage }</p>
                    { this.state.imageUploading ? (<Spinner/>) :  <input type="file" name="file" accept="image/*" id="category-image" style={{display:'none'}} onChange={this.onChangeHandler}/> }
                    <div className="buttons">
                        { userResponse.loading ? (
                            <Spinner/>
                            ) : (
                                <React.Fragment>
                                    <Button classType="inverted" type="button" onClick={this.saveFile}>UPLOAD FILE</Button>
                                        <Button type="submit">SUBMIT</Button>
                                </React.Fragment>
                            ) 
                        }
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>);
    }
} 


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    userResponse: selectFetchPutUser
});

const mapDispatchToProps = dispatch => ({
    updateUser: (user) => dispatch(updateUser(user)),
    setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);