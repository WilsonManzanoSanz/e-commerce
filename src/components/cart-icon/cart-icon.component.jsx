import React, {useRef} from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { ReactComponent as ShoppingIcon } from '../../assets/img/shop-icon.svg';
import { selectCartItemsCount } from '../../redux/cart/cart.selector';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { toggleCartHidden, closeCartHidden } from '../../redux/cart/cart.action';
import { selectCartHidden } from '../../redux/cart/cart.selector';
import useDropdownToggler from '../../shared/hooks/use-dropdown-toggler';

import './cart-icon.style.scss';

const CartIcon = ({ itemCount,}) => {
  const dropdownContent = useRef(null);
  const trigger = useRef(null);
  const {isOpen, toggleDropdownEvent} = useDropdownToggler(dropdownContent, trigger);

  return(<div className="cart-icon">
    <div  className="cart-icon__trigger" ref={trigger} onClick={toggleDropdownEvent}>
      <ShoppingIcon className="shopping-icon"  />
      <span className="item-count">{itemCount}</span>
    </div>
    {
      isOpen ? <CartDropdown onClose={closeCartHidden} ref={dropdownContent} /> : null
    }
  </div>);

}

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
  closeCartHidden: () => dispatch(closeCartHidden())
});

const mapStateToProps = createStructuredSelector({
  hiddenCart: selectCartHidden,
  itemCount: selectCartItemsCount,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

