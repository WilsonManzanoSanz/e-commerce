import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// import {closeCartHidden} from '../../redux/cart/cart.action';
import {toggleUserDropdown, closeUserDropdown} from '../../redux/ui/ui.action';
import {selectCartHidden} from '../../redux/ui/ui.selector';
import {selectDropdownStatus} from '../../redux/ui/ui.selector';
import UserNavDropdown from '../user-icon-dropdown/user-icon-dropdown.component'
import { ReactComponent as Icon } from '../../assets/img/icons/user-icon.svg';

import './user-icon.style.scss';

class UserIcon extends React.Component{

    addWindowListener = () => {
        document.body.addEventListener('click', this.outsiteClickDropdown);
      }
    
      toggle = () => {
        this.props.toggleUserDropdown();
        this.addWindowListener();
        
      }
    
      outsiteClickDropdown = (e) => {
        const element = document.querySelector('#user-icon');
        if (element && !element.contains(e.target)) {
          this.props.closeUserDropdown();
          document.body.removeEventListener('click', this.outsiteClickDropdown);
        }
      }

    render(){
        const {dropdownStatus, closeUserDropdown} = this.props;
        return(
            <div className="user-icon" id="user-icon">
                <Icon onClick={this.toggle} />
                {
                    !dropdownStatus ? null : <UserNavDropdown onClose={closeUserDropdown} />
                }
        </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    hiddenCart: selectCartHidden,
    dropdownStatus: selectDropdownStatus,
})

const mapDispatchToProps = dispatch => ({
    toggleUserDropdown: () => dispatch(toggleUserDropdown()),
    closeUserDropdown: () => dispatch(closeUserDropdown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserIcon);