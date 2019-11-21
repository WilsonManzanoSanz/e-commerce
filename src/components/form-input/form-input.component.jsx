import React from 'react';

import './form-input.style.scss';

const FormInput = ({ handleChange, label, ...otherComponents }) => (
    <div className="form-group">
        {
            !otherComponents.astextarea ? (<input className="input" onChange={handleChange} {...otherComponents} />) : 
            (<textarea className="input" onChange={handleChange} {...otherComponents} ></textarea>)
        }
        {
            label &&
            (<label className={`${otherComponents.value && otherComponents.value.length ? 'shrink' : ''} label`}>
                {label}
            </label>)
        }
    </div>
);

export default FormInput;