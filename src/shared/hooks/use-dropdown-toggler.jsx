import { useEffect, useState,} from 'react';

const useDropdownToggler = (dropdownContent, triggerElem) => {
    const [isOpen, toggleDropdown] = useState(false);
    const toggleDropdownEvent = () => {
      toggleDropdown(!isOpen);
    }

    useEffect(() => {
      
      function clickOutside(e) {
        if (dropdownContent.current && (!dropdownContent.current.contains(e.target) && !triggerElem.current.contains(e.target) )) {
          toggleDropdown(false);
          removeListeners();
        }
      };

      function removeListeners(){
        window.removeEventListener('click', clickOutside);
      }

      if(isOpen){
        window.addEventListener('click', clickOutside);
      }

      return () => {
        removeListeners();
      };
    }, [isOpen, dropdownContent, triggerElem])

    return { toggleDropdownEvent, isOpen};
}

export default useDropdownToggler;