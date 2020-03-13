import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {closeCartHidden} from '../../redux/cart/cart.action';
import {toggleUserDropdown, closeUserDropdown} from '../../redux/user/user.action';
import {selectCartHidden} from '../../redux/cart/cart.selector';
import {selectDropdownStatus} from '../../redux/user/user.selector';
import UserNavDropdown from '../user-icon-dropdown/user-icon-dropdown.component'
import { ReactComponent as Icon } from '../../assets/img/icons/user-icon.svg';

import './user-icon.style.scss';

const UserIcon = ({dropdownStatus, toggleUserDropdown, closeCartHidden, closeUserDropdown}) => {
    // const [isOpen, toggleStatus] = useState(false);
    return(
        <div className="user-icon">
            <Icon onClick={(e) => {  closeCartHidden(); toggleUserDropdown()}} />
            {
                !dropdownStatus ? null : <UserNavDropdown onClose={closeUserDropdown} />
            }
        </div>
    );
};
const mapStateToProps = createStructuredSelector({
    hiddenCart: selectCartHidden,
    dropdownStatus: selectDropdownStatus,
})

const mapDispatchToProps = dispatch => ({
    closeCartHidden: () => dispatch(closeCartHidden()),
    toggleUserDropdown: () => dispatch(toggleUserDropdown()),
    closeUserDropdown: () => dispatch(closeUserDropdown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserIcon);