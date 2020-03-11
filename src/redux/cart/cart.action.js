export const TOGGLE_CART_HIDDEN = 'TOGGLE_CART_HIDDEN';
export const CLOSE_CART_HIDDEN = 'CLOSE_CART_HIDDEN';
export const ADD_ITEM = 'ADD_ITEM';
export const CLEAR_ITEM_FORM_CART = 'CLEAR_ITEM_FORM_CART';
export const REMOVE_ITEM = 'REMOVE_ITEM';

export const toggleCartHidden = () => ({
    type: TOGGLE_CART_HIDDEN,
});

export const closeCartHidden = () => ({
    type: CLOSE_CART_HIDDEN,
});

export const addItem = item => ({
    type: ADD_ITEM,
    payload: item
});

export const clearItemFromCart = item => ({
    type: CLEAR_ITEM_FORM_CART,
    payload: item
}); 

export const removeItem = item => ({
    type: REMOVE_ITEM,
    payload: item
}); 