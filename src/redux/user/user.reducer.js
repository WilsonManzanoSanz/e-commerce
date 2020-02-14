import { SET_CURRENT_USER, TOGGLE_USER_DROPDOWN, CLOSE_USER_DROPDOWN } from './user.action';

const INITIAL_STATE = {
    currentUser : null,
    userDropdownStatus: false
};

const userReducer = (previousState = INITIAL_STATE, action) => {
    switch(action.type){
        case CLOSE_USER_DROPDOWN:
            return {
                ...previousState, userDropdownStatus: false
        };
        case TOGGLE_USER_DROPDOWN:
            return {
                ...previousState, userDropdownStatus: !previousState.userDropdownStatus
        };
        case SET_CURRENT_USER:
            return {...previousState, currentUser: action.payload }
        default: 
            return previousState;
    }
}

export default userReducer;