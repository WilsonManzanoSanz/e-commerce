import React from 'react';

import './spinner.style.scss';

const Spinner = ({ isLoading, ...otherProps }) => {
    return (
        <div className="spinner-overlay">
            <div className="spinner-container"></div>
    </div>);
}

export default Spinner;