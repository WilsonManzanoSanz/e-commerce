import React from 'react';
import { connect } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { selectCurrentUser} from '../../redux/user/user.selector';
// import { setCurrentUser } from '../../redux/user/user.action';
import { logOut } from '../../redux/user/user.action';
import { selectIsMobile } from '../../redux/ui/ui.selector';
import Button from '../ui/button/button.component';
import { createStructuredSelector } from 'reselect';

import './user-icon-dropdown.style.scss';

const UserNavDropdown = React.forwardRef(({currentUser, logOut, onClose}, ref) => {
    let history = useHistory();
    return (
        <div className="user-dropdown" ref={ref}>
        {
            currentUser ? (
                <div>
                    <span className="empty-message">Hi {currentUser.displayName}</span>
                    <Button classType="inverted" onClick={() => { onClose(); history.push('/profile'); }}>PROFILE</Button>
                     <Button  onClick={() => { onClose(); logOut() }}> LOG OUT </Button>
                </div>
            )  : (
            <div>
                <span className="empty-message">Welcome</span>
                <Button onClick={() => { onClose(); history.push('/login'); }}>SIGN IN</Button>
            </div>)
        }
        
        
    </div>
    );  
});

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    isMobile: selectIsMobile
})

const mapDispatchToProps = dispatch => ({
//    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    logOut: () => dispatch(logOut())
});

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(UserNavDropdown);