import React from 'react';
import {BASE_URL} from '../../core/http-const';
import { setCurrentUser, setToken } from '../../redux/user/user.action';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class GoogleLoginPage extends React.Component {

    async componentDidMount(){
        const { setCurrentUser, setToken, history } = this.props;
        try {
            const response = await fetch(`${BASE_URL}/token`, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': this.props.match.params.token,
            },
          });
          const json = await response.json();
          if(json.success){
            // remove id & token from route params after saving to local storage
            window.history.replaceState(null, null, `${window.location.origin}/user/redirect`);
            setToken(json.data.data.token);
            setCurrentUser(json.data.data);
            history.push('/');
          } else {
              alert(json.message);
              history.push('/');
              throw(json.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
    }
    render(){
        return (<div>...</div>);
    }
};

const mapDispatchToProps = dispatch => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    setToken:(token) => dispatch(setToken(token))
});

export default withRouter(connect(null, mapDispatchToProps)(GoogleLoginPage));