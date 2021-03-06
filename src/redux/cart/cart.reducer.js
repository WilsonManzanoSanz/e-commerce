import { TOGGLE_CART_HIDDEN, ADD_ITEM, CLEAR_ITEM_FORM_CART, REMOVE_ITEM, CLOSE_CART_HIDDEN } from './cart.action';
import { addItemToCart, removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
    hiddenCart : true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case TOGGLE_CART_HIDDEN:
            return {
                ...state, hiddenCart: !state.hiddenCart
            };
        case CLOSE_CART_HIDDEN:
            return {
                ...state, hiddenCart: true
            };
        case ADD_ITEM:
            return {
                ...state, 
                cartItems: addItemToCart(state.cartItems, action.payload)
            }
        case CLEAR_ITEM_FORM_CART:
            return {
                ...state, 
                cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
            }
        case REMOVE_ITEM:
            return {
                ...state, 
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }
        default:
            return state;
    }
}

export default cartReducer;