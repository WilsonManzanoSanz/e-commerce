import React from 'react';

import './button.style.scss';

const Button = ({ children, ...otherProps }) => (
    <button className="primary-button" {...otherProps}>
        { children }
    </button>
);

export default Button;