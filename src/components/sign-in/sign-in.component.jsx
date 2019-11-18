import React from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { connect } from 'react-redux';
import { signInWithPassword } from '../../redux/user/user.action';
import { setCurrentUser } from '../../redux/user/user.action';
// import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.style.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errorMessage:''
        };

    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name] : value });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;
        const { signInWithPassword } = this.props;
        try {
            const res = await signInWithPassword(email, password);
            if(!res.success){
                console.log('triggered', res);
                throw(res.message);
            }
            // this.setState({ email: '', password: '' });
        } catch (error) {
            console.log('triggered', error);
            this.setState({errorMessage:error});
        }
    }

    render(){
        const {errorMessage} = this.state;
        return (
            <div className="sign-in">
                <h2 className="title">I already have an account</h2>
                <span class="description">Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" type="email" label="email" value={this.state.email} handleChange={this.handleChange} required/>
                    <FormInput name="password" type="password" label="password" value={this.state.password} handleChange={this.handleChange} required/>
                    <p className="error-message">{errorMessage}</p>
                    <div className="buttons">
                        <Button type="submit">SIGN IN</Button>
                        <Button type="button" classType="secondary-button" onClick={() => window.location.href = 'http://localhost:3001/api/v1/auth/google'}>
                            {''}
                            Sign in with Google {''}
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    signInWithPassword: (email, password) => dispatch(signInWithPassword(email, password)),
    setCurrentUser: (user) => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(SignIn);
