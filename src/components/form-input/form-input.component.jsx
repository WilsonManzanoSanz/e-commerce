import React from 'react';

import './form-input.style.scss';

const FormInput = ({ handleChange, label, ...otherComponents }) => (
    <div className="form-group">
        <input className="input" onChange={handleChange} {...otherComponents} />
        {
            label &&
            (<label className={`${otherComponents.value.length ? 'shrink' : ''} label`}>
                {label}
            </label>)
        }
    </div>
);

export default FormInput;