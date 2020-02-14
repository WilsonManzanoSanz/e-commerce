import React from 'react';
import {BASE_URL} from '../../core/config';
import { setCurrentUser } from '../../redux/user/user.action';
import {connect} from 'react-redux';

class GoogleLoginPage extends React.Component {

    async componentDidMount(){
        const { setCurrentUser } = this.props;
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
            setCurrentUser(json.data.data);
            window.location.href = '/';
          } else {
              alert(json.message);
              window.location.href = '/';
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
    setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(GoogleLoginPage);