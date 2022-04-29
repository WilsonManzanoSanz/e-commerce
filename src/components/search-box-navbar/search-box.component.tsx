import React, {useState, useCallback, useRef} from 'react';
import { useQuery } from 'react-query';
import { searchProduct } from '../../core/fetchsQueries/product';
import { SEARCH_PRODUCTS } from '../../core/http-const';
import useDropdownToggler from '../../shared/hooks/use-dropdown-toggler';
import { debounce } from '../../shared/utils/utils';
import FormInput from '../ui/form-input/form-input.component';

import styles from './search-box.module.scss';

export default function SearchBoxNavbar(props) {
    const [searchText, setSearchText] = useState('');
    const [searchDropdown, toggleSearchDropdown] = useState(false);
    const trigger = useRef(null);
    const dropdownContent = useRef(null);
    const { isLoading, isError, data, error } =  useQuery([SEARCH_PRODUCTS, searchText], () => searchProduct({name: searchText,})) as any;

    const {isOpen, openDropdown} = useDropdownToggler(dropdownContent, trigger); 

    const delayedOnChange = useCallback(debounce(e => handleSearch(e), 500), []);
    
    const handleSearch =  debounce((value) => {
        setSearchText(value);
        if(!searchDropdown){
            toggleSearchDropdown(true); 
        }
    }, 500);


    const items = data ? data.items : [];
    return (<div className={styles.searchBox}>
        <FormInput onClick={() => openDropdown('hi')} handleChange={(e) => delayedOnChange(e.target.value)} label={''} hidePlaceholder={true} ref={trigger}></FormInput>
        <div className={styles.searchList} ref={dropdownContent}>
            {
                isOpen && searchDropdown && searchText && items.map( el => (
                     <div className={styles.searchListItem} key={el.id}>{el.name}</div>
                    )
                )
            }
        </div>
    </div>)
}