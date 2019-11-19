import React from 'react';
import './modal.style.scss';
import PropTypes from "prop-types";

class Modal extends React.Component {
    constructor(props){
        super(props);
    }
    
    onClose = e => {
        console.log(this.props.onClose);
        this.props.onClose && this.props.onClose(e);
    };

    render() {
        return <div  className={this.props.show  ? 'modal is-visible': 'modal'}>
                <div className="modal-dialog">
                    <div className="flex modal-header">
                        <span className="spacer"></span>
                        <span className="close" onClick={ e => this.onClose(e) }>&#10005;</span>
                    </div>
                    <div class="modal-body">
                        {this.props.children}
                    </div>
                </div>
            </div>;
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};

export default Modal;