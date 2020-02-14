import React, {useState} from 'react';
import { connect } from 'react-redux';
import { ReactComponent as ShoppingIcon } from '../../assets/img/shop-icon.svg';
import { selectCartItemsCount } from '../../redux/cart/cart.selector';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
// import { toggleCartHidden } from '../../redux/cart/cart.action';
import { selectCartHidden } from '../../redux/cart/cart.selector';

import './cart-icon.style.scss';

const CartIcon = ({toggleCartHidden, itemCount, hidden}) => {
  const [isOpen, toggleStatus] = useState(false);
  return(  
  <div className="cart-icon" onClick={() => toggleStatus(!isOpen)}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
    {
      !isOpen ? null : <CartDropdown />
    }
  </div>);
  };

const mapDispatchToProps = dispatch => ({
  // toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = (state) => ({
  itemCount: selectCartItemsCount(state),
  hidden: selectCartHidden,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

