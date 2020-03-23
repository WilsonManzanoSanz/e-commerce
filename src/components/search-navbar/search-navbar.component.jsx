import React, {useState} from 'react';
import { ReactComponent as SearchIcon } from '../../assets/img/icons/search.svg';
import { ReactComponent as DeleteIcon } from '../../assets/img/icons/delete-icon.svg';
import FormInput from '../form-input/form-input.component';

import './search-navbar.style.scss'

const SearchNavbar = () => {
    const [productSearch, setProductSearch] = useState('');
    const [showInput, toggleInput] = useState(false);

    return (<div className="search-navbar">
        <SearchIcon className="search-navbar-icon" onClick={() => toggleInput(!showInput)} />
        {
            showInput && 
            <div className="search-navbar-input">
                <FormInput name="productSearch" type="text" label="Type what you're looking for..." value={productSearch} handleChange={(e) => setProductSearch(e.target.value)} required/>
                <DeleteIcon className="search-navbar-input-delete" onClick={() => toggleInput(false)}/>
            </div>
        }
    </div>);  
};

export default SearchNavbar;