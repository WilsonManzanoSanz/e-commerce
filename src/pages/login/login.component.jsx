import React from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import './login.style.scss';

const LoginPage = () => (
    <div className="login-page">
        <SignIn />
        <SignUp />
    </div>
);

export default LoginPage;