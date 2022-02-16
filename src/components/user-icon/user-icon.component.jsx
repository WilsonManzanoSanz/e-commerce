import React, {useRef} from 'react';
import {closeUserDropdown} from '../../redux/user/user.action';
import UserNavDropdown from '../user-icon-dropdown/user-icon-dropdown.component'
import { ReactComponent as Icon } from '../../assets/img/user-icon.svg';
import useDropdownToggler from '../../shared/hooks/use-dropdown-toggler';

import './user-icon.style.scss';

const UserIcon = () => {
    const dropdownContent = useRef(null);
    const trigger = useRef(null);
    const {isOpen, toggleDropdownEvent} = useDropdownToggler(dropdownContent, trigger);

    return(
        <div className="user-icon">
            <Icon ref={trigger} onClick={() => {toggleDropdownEvent()}} />
            {
                isOpen ? <UserNavDropdown onClose={closeUserDropdown} ref={dropdownContent} /> : null
            }
        </div>
    );
};

export default UserIcon;