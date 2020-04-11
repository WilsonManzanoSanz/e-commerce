import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectFetchPutUser } from '../../redux/user/user.selector';
import { updateUser,  setCurrentUser } from '../../redux/user/user.action';
import { Redirect } from 'react-router-dom';
import { uploadFile } from '../../core/upload';
import ShippingForm from '../../components/shipping-form/shipping-form.component';
// import  DateInput  from '../../components/date-picker/date-picker.component';

import './profile.style.scss';

class ProfilePage extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            id: 0,
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
        };
    }

    componentDidUpdate(prevState, prevProps){
        if(prevState.userResponse && prevState.userResponse.loading && !this.props.userResponse.loading){
            this.props.setCurrentUser(this.props.userResponse.payload);
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
    }

    renderRedirect = () => {
        if (!this.props.currentUser) {
          return <Redirect to='/login' />
        }
    }

    handleSubmit = async (formValues, file) => {
        const { updateUser } = this.props;
        if(formValues.newpassword !== formValues.confirmPassword){
            this.setState({validationMessage: 'Passwords do not match'})
            return;
        }
        try {
            let fileURL = {};
            if(file){
                fileURL = await uploadFile(file);
            }
            const newUser = this.deleteUnsedProperties({...formValues, ...{photoUrl: fileURL.path}});
            await updateUser(newUser);
            // this.setState({category: ''});
             // onClose();
        } catch (error) {
            // onClose();
            console.error(error);
        }
    }

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

    render(){
        const { currentUser } = this.props;
        return (
        <div className="profile-page">
            {this.renderRedirect()}
            <div className="profile-card">
                <div className="photo-container">
                    <img src={currentUser && currentUser.photoUrl ? (currentUser.photoUrl) : ('https://www.seekpng.com/png/detail/413-4139803_unknown-profile-profile-picture-unknown.png')} alt="profile pic"/>
                </div>
                {
                    this.state.id && <ShippingForm info={this.state} handleSubmit={this.handleSubmit} profile={true} key={this.state.id}/>
                }
            
            </div>
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