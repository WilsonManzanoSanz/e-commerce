export const SET_SCREEN_SIZE = 'SET_SCREEN_SIZE';
export const TOGGLE_USER_DROPDOWN = 'TOGGLE_USER_DROPDOWN';
export const CLOSE_USER_DROPDOWN = 'CLOSE_USER_DROPDOWN';
export const TOGGLE_CART_HIDDEN = 'TOGGLE_CART_HIDDEN';
export const CLOSE_CART_HIDDEN = 'CLOSE_CART_HIDDEN';

export const updateScreenSize = (isMobile) => ({
    type: SET_SCREEN_SIZE,
    payload: isMobile
});

export const toggleCartHidden = () => ({
    type: TOGGLE_CART_HIDDEN,
});

export const closeCartHidden = () => ({
    type: CLOSE_CART_HIDDEN,
});

export const toggleUserDropdown = () => ({
    type: TOGGLE_USER_DROPDOWN,
});

export const closeUserDropdown = () => ({
    type: CLOSE_USER_DROPDOWN,
});