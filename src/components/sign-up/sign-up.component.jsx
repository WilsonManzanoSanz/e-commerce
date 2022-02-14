import React from 'react';
import {connect} from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { signUpWithPassword } from '../../redux/user/user.action';

import './sign-up.style.scss';

class SignUp extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            displayName: '',
            confirmPassword: '',
            errorMessage: '',
            loading: false,
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { password, confirmPassword } = this.state;
        const { signUpWithPassword } = this.props;
        if( password !== confirmPassword){
            this.setState({errorMessage: 'Password does not match'});
            return;
        } else {
            this.setState({errorMessage: ''});
        }
        try {
            this.setState({loading: true})
            const res = await signUpWithPassword(this.state);
            if(!res.success){
                console.log('triggered', res);
                throw(res.message);
            }
            // this.setState({ email: '', password: '' });
        } catch (error) {
            console.log('triggered', error);
            this.setState({errorMessage:error});
        } finally {
            this.setState({loading: false});
        }
    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name] : value });
    };

    render(){
        const { displayName, email, password, confirmPassword, errorMessage } = this.state;
        return (
        <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span className="description">Sign up with your email and password</span>
            <form className="sign-up-form" onSubmit={this.handleSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={this.handleChange}
                    label="Display Name"
                    required>
                </FormInput>
                <FormInput
                    type="text"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    label="Email"
                    required>
                </FormInput>
                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    label="Password"
                    required>
                </FormInput>
                <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={this.handleChange}
                    label="Confirm password"
                    required>
                </FormInput>
                <p className="error-message">{errorMessage}</p>
                <Button type="submit">SIGN UP</Button>
            </form>
        </div>)
    }

}

const mapDispatchToProps = dispatch => ({
    signUpWithPassword: (email, password) => dispatch(signUpWithPassword(email, password))
})

export default connect(null, mapDispatchToProps)(SignUp);