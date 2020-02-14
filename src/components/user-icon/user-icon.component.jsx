import React, { useState } from 'react';
import UserNavDropdown from '../user-icon-dropdown/user-icon-dropdown.component'
import { ReactComponent as Icon } from '../../assets/img/user-icon.svg';

import './user-icon.style.scss';

const UserIcon = () => {
    const [isOpen, toggleStatus] = useState(false);
    return(
        <div className="user-icon" onClick={(e) => { e.stopPropagation(); toggleStatus(!isOpen)}}>
            <Icon />
            {
                !isOpen ? null : <UserNavDropdown />
            }
        </div>
    );
};

export default UserIcon;