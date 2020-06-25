import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectShippingInfo } from '../../redux/purchase/purchase.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';
import Button from '../../components/button/button.component';
import Modal from '../../components/modal/modal.component';
import { REDIRECT_URL } from '../../core/constant';
import { setShippingInfo } from '../../redux/purchase/purchase.action';

import './shipping.style.scss'
import ShippingForm from '../../components/shipping-form/shipping-form.component';

const  data={
    //Parametros compra (obligatorio)
    name: "Vestido Mujer Primavera",
    description: "Vestido Mujer Primavera",
    invoice: "1",
    currency: "cop",
    amount: "12000",
    tax_base: "0",
    tax: "0",
    country: "co",
    lang: "en",

    //Onpage="false" - Standard="true"
    external: "false",


    //Atributos opcionales
    extra1: "extra1",
    extra2: "extra2",
    extra3: "extra3",
    // confirmation: "http://secure2.payco.co/prueba_curl.php",
    response: "http://localhost:3000/confirmation",

    //Atributos cliente
    email_billing: 'wilson.manzanosanz@gmail.com',
    name_billing: "Andres Perez",
    address_billing: "Carrera 19 numero 14 91",
    type_doc_billing: "cc",
    mobilephone_billing: "3050000000",
    number_doc_billing: "100000000",

   //atributo deshabilitación metodo de pago
    // methodsDisable: ["TDC", "PSE","SP","CASH","DP"]
};

class ShippingPage extends React.Component{
    constructor(props){
        super(props);
        this.state  = { 
            shippingInfo: {
                id: 0,
                ...props.currentShipping
            }
        };
    }

    goToLogin = () => {
        sessionStorage.setItem(REDIRECT_URL, '/shipping');
        this.props.history.push('/login');
    }

    handleSubmit = async (formValues) => {
        this.props.setShippingInfo(formValues);
    }

    loadUserInfo = () => {
        this.setState({shippingInfo: this.props.currentUser});
        this.props.setShippingInfo(this.props.currentUser);
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

    goCheckout = () => {
        window.handler.open(data);
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
            <div>
                <Button classType="" onClick={this.goCheckout}>CHECKOUT</Button>
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
    currentShipping: selectShippingInfo
});

const mapDispatchToProps = dispatch => ({
    setShippingInfo: (user) => dispatch(setShippingInfo(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShippingPage);
