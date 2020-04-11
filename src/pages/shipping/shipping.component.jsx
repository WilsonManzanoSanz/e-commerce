import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import Button from '../../components/button/button.component';
import Modal from '../../components/modal/modal.component';
import { REDIRECT_URL } from '../../core/constant';

import './shipping.style.scss'
import ShippingForm from '../../components/shipping-form/shipping-form.component';

class ShippingPage extends React.Component{
    constructor(props){
        super(props);
        this.state  = { 
            shippingInfo: {
                id: 0,
            }
        };
    }

    goToLogin = () => {
        sessionStorage.setItem(REDIRECT_URL, '/shipping');
        this.props.history.push('/login');
    }

    handleSubmit = async (formValues) => {
        // const { updateUser } = this.props;
        try {
            const payload = this.deleteUnsedProperties(formValues);
            console.log(payload);
        } catch (error) {
            console.error(error);
        }
    }

    loadUserInfo = () => {
        this.setState({shippingInfo: this.props.currentUser});
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
        return(
        <div className="shipping-page">
            <div className="wrapper container">
            <div className="flex">
                <h3 className="title" style={{paddingBottom: '20px'}}>
                    Complete your shipping info
                </h3>
                <span className="spacer"></span>
                <Button classType="inverted" onClick={this.loadUserInfo}>Use same as Profile</Button>
            </div>
            <div className="card">
                <ShippingForm handleSubmit={this.handleSubmit} info={this.state.shippingInfo} key={this.state.shippingInfo.id}></ShippingForm>
            </div>
            <Modal show={!this.props.currentUser} onClose={() => console.log('noclose')} confirmDialog={true}>
                <h2 style={{textAlign: 'center', paddingTop: '10px'}} className="title">Ups! One more step</h2> 
                <p>Please ... login into your account and <br/> come back to continue with the order :)</p>
                <Button style={{margin:'auto'}} onClick={this.goToLogin}>Go To Shipping</Button>
            </Modal>
            </div>
        </div>);
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ShippingPage);
