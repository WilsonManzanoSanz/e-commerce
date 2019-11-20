import React from 'react';
import './modal.style.scss';
import PropTypes from "prop-types";

class Modal extends React.Component {
    
    onClose = e => {
        if((e.target === document.querySelector(".modal.is-visible")) || ((e.target.id === "close-modal-button") && this.props.show )){
            e.stopPropagation();
            this.props.onClose && this.props.onClose(e);
        }
    };

    render() {
        return <div  className={this.props.show  ? 'modal is-visible': 'modal'} onClick={ e => this.onClose(e) }>
                <div className="modal-dialog">
                    <div className="flex modal-header">
                        <span className="spacer"></span>
                        <span className="close" id="close-modal-button" onClick={ e => this.onClose(e) }>&#10005;</span>
                    </div>
                    <div className="modal-body">
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