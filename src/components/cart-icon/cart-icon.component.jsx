import React from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { ReactComponent as ShoppingIcon } from '../../assets/img/icons/shop-icon.svg';
import { selectCartItemsCount } from '../../redux/cart/cart.selector';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { toggleCartHidden, closeCartHidden } from '../../redux/ui/ui.action';
import { selectCartHidden } from '../../redux/ui/ui.selector';

import './cart-icon.style.scss';

class CartIcon extends React.Component{

  addWindowListener = () => {
    document.body.addEventListener('click', this.outsiteClickDropdown);
  }

  toggle = () => {
    this.props.toggleCartHidden();
    this.addWindowListener();
  }

  outsiteClickDropdown = (e) => {
    const element = document.querySelector('#cart-icon');
    if (element && !element.contains(e.target)) {
      this.props.closeCartHidden();
      document.body.removeEventListener('click', this.outsiteClickDropdown);
    }
  }

  render(){
    const { itemCount, hiddenCart} = this.props;
    return(  
      <div className="cart-icon" onClick={this.toggle} id="cart-icon">
        <ShoppingIcon className="shopping-icon" />
        <span className="item-count">{itemCount}</span>
        {
          hiddenCart ? null : <CartDropdown onClose={closeCartHidden} />
        }
      </div>);
  }
};

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
  closeCartHidden: () => dispatch(closeCartHidden())
});

const mapStateToProps = createStructuredSelector({
  hiddenCart: selectCartHidden,
  itemCount: selectCartItemsCount,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

