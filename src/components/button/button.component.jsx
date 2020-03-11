import React from 'react';

import './button.style.scss';

const Button = ({ children, classType = '', ...otherProps }) => (
    <button className={`primary-button ${classType} `} {...otherProps}>
        { children }
    </button>
);

export default Button;