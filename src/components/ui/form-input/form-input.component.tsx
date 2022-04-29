import React from 'react';

import './form-input.style.scss';

const FormInput = React.forwardRef<HTMLDivElement, any>((props, ref) => {
    const { handleChange, label, ...otherComponents } = props;
    return(
        <div className="form-group" ref={ref}>
            {
                ! otherComponents.astextarea ? 
                (<input className={`${otherComponents.value ? 'focused': ''} input`} onChange={handleChange} {...otherComponents} />) : 
                (<textarea className="input" onChange={handleChange} {...otherComponents}></textarea>)
            }
            {
                label &&
                (<label className={`${otherComponents.value && otherComponents.value.length ? 'shrink' : ''} label`}>
                    {label}
                </label>)
            }
        </div>
    );
});

export default FormInput;