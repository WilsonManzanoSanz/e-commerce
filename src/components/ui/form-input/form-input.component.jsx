import React from 'react';

import './form-input.style.scss';

const FormInput = ({ handleChange, label, ...otherComponents }) => {
    const {  hidePlaceholder, ...otherProps } = otherComponents;
    return(
        <div className="form-group">
            {
                ! otherProps.astextarea ? 
                (<input className={`${otherProps.value ? 'focused': ''} input`} onChange={handleChange} {...otherProps} />) : 
                (<textarea className="input" onChange={handleChange} {...otherProps}></textarea>)
            }
            {
                label &&
                (<label className={`${otherProps.value && otherProps.value.length ? 'shrink' : ''} label`}>
                    {label}
                </label>)
            }
        </div>
    );
}

export default FormInput;