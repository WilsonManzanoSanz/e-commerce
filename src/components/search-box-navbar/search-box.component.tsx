import React, {useState, useCallback} from 'react';
import { useQuery } from 'react-query';
import { searchProduct } from '../../core/fetchsQueries/product';
import { SEARCH_PRODUCTS } from '../../core/http-const';
import { debounce } from '../../shared/utils/utils';
import FormInput from '../ui/form-input/form-input.component';

import styles from './search-box.module.scss';

export default function SearchBoxNavbar(props) {
    const [searchText, setSearchText] = useState('');
    const [searchDropdown, toggleSearchDropdown] = useState(false);
    const { isLoading, isError, data, error } =  useQuery([SEARCH_PRODUCTS, searchText], () => searchProduct({name: searchText,})) as any;

    const delayedOnChange = useCallback(debounce(e => handleSearch(e), 500), []);
    
    const handleSearch =  debounce((value) => {
        setSearchText(value);
        if(!searchDropdown){
            toggleSearchDropdown(true); 
        }
    }, 500);


    const items = data ? data.items : [];
    return (<div className={styles.searchBox}>
        <FormInput handleChange={(e) => delayedOnChange(e.target.value)} label={''} hidePlaceholder={true} ></FormInput>
        <ul>
            {
                searchDropdown && searchText && items.map( el => (
                     <li key={el.id}>{el.name}</li>
                    )
                )
            }
        </ul>
    </div>)
}