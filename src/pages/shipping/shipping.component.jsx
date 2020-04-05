import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import Button from '../../components/button/button.component';
import Modal from '../../components/modal/modal.component';
import { REDIRECT_URL } from '../../core/constant';

import './shipping.style.scss'

class ShippingPage extends React.Component{

    goToLogin = () => {
        sessionStorage.setItem(REDIRECT_URL, '/shipping');
        this.props.history.push('/login');
    }

    render(){
        return(<div>
            Shipping
            <Modal show={!this.props.currentUser} onClose={() => console.log('noclose')} confirmDialog={true}>
                <h2 style={{textAlign: 'center', paddingTop: '10px'}} className="title">Ups! One more step</h2> 
                <p>Please ... login into your account and <br/> come back to continue with the order :)</p>
                <Button style={{margin:'auto'}} onClick={this.goToLogin}>Go To Shipping</Button>
            </Modal>
        </div>);
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ShippingPage);
