import React from 'react';
import {BASE_URL} from '../../core/config';
import { setCurrentUser, setToken } from '../../redux/user/user.action';
import {connect} from 'react-redux';

class GoogleLoginPage extends React.Component {

    async componentDidMount(){
        const { setCurrentUser, setToken } = this.props;
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
            this.props.history.push('/login');
          } else {
              alert(json.message);
              this.props.history.push('/login');
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

export default connect(null, mapDispatchToProps)(GoogleLoginPage);