import { ADD_ITEM, CLEAR_ITEM_FORM_CART, REMOVE_ITEM } from './cart.action';
import { addItemToCart, removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
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