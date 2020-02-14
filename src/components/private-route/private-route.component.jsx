import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({Component, loggedIn, ...rest}) => {
    return(
        <Route {...rest}
            render={
                props => loggedIn ? (
                    <Component {...rest} {...props} />
                ): (
                <Redirect to={{pathname: '/login', state: {from: props.location}}} />
                )
            } 
        />
    );
};

export default PrivateRoute;