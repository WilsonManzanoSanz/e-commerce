import React from 'react';
import Button from '../../components/button/button.component';
import Modal from '../../components/modal/modal.component';
import CategoryCreate from '../../components/category-create/category-create.component';

import './admin.style.scss';
export class AdminPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: false
        };
    }
    showModal = e => {
        this.setState(prevstate => ({
          show: !prevstate.show
        }));
    };

    componentDidMount(){
        
    }

    render(){
        return (
            <div className="admin-page">
            <hr></hr>
                <div className="flex">
                    <h1 className="title"> Admin page </h1>
                    <span className="spacer"></span>
                    <Button className="primary-button admin-button" onClick={() => this.showModal()}>Create a Category</Button>
                    <Button className="primary-button admin-button">Create a Product</Button>
                </div>
                <div>
                    <Modal onClose={this.showModal} show={this.state.show}>
                        <CategoryCreate></CategoryCreate>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default AdminPage;