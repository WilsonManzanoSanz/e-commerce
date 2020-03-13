import React from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { ReactComponent as ShoppingIcon } from '../../assets/img/icons/shop-icon.svg';
import { selectCartItemsCount } from '../../redux/cart/cart.selector';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { toggleCartHidden, closeCartHidden } from '../../redux/cart/cart.action';
import { closeUserDropdown } from '../../redux/user/user.action';
import { selectCartHidden } from '../../redux/cart/cart.selector';

import './cart-icon.style.scss';

const CartIcon = ({toggleCartHidden, itemCount, hiddenCart, closeUserDropdown}) => {
  // const [isOpen, toggleStatus] = useState(false);
  return(  
  <div className="cart-icon">
    <ShoppingIcon className="shopping-icon" onClick={() => {closeUserDropdown(); toggleCartHidden()}} />
    <span className="item-count">{itemCount}</span>
    {
      hiddenCart ? null : <CartDropdown onClose={closeCartHidden} />
    }
  </div>);
  };

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
  closeUserDropdown: () => dispatch(closeUserDropdown()),
  closeCartHidden: () => dispatch(closeCartHidden())
});

const mapStateToProps = createStructuredSelector({
  hiddenCart: selectCartHidden,
  itemCount: selectCartItemsCount,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

