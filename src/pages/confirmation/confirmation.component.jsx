import React from 'react';

import './confirmation.style.scss';
const BASE_URL = "https://api.secure.payco.co/validation/v1/reference/";

class ConfirmationPage extends React.Component{
    componentDidMount(){
        const params = new URLSearchParams(this.props.location.search);
        const epaycoTransferId = params.get('ref_payco');
        console.log(epaycoTransferId);
        this.getConfirmationInfo(epaycoTransferId);
    }

    getConfirmationInfo = (epaycoTransferId) => {
        fetch(`${BASE_URL}${epaycoTransferId}`)
        .then(response => response.json())
        .then(response => console.log('response', response))
        .catch(error => console.error(error));
    }

    render(){
        return(
            <div>
            <h4>Confirmation jiji</h4>
            </div>
        );
    } 

}

export default ConfirmationPage;