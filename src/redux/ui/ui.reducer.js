import { SET_SCREEN_SIZE, TOGGLE_CART_HIDDEN, CLOSE_CART_HIDDEN, CLOSE_USER_DROPDOWN, TOGGLE_USER_DROPDOWN } from './ui.action';

const INITIAL_STATE = {
    isMobile : window.matchMedia("(max-width: 768px)").matches,
    hiddenCart : true,
    userDropdownStatus: false,
};

const uiReducer = (previousState = INITIAL_STATE, action) => {
    switch(action.type){
        case TOGGLE_CART_HIDDEN:
            return {
                ...previousState, hiddenCart: !previousState.hiddenCart
            };
        case CLOSE_CART_HIDDEN:
            return {
                ...previousState, hiddenCart: true
            };
        case CLOSE_USER_DROPDOWN:
            return {
                ...previousState, userDropdownStatus: false
        };
        case TOGGLE_USER_DROPDOWN:
            return {
                ...previousState, userDropdownStatus: !previousState.userDropdownStatus
        };
        case SET_SCREEN_SIZE:
            return {...previousState, isMobile: action.payload }
        default: 
            return previousState;
    }
}

export default uiReducer;