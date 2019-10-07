import { SET_CURRENT_USER } from './user.action';

const INITIAL_STATE = {
    currentUser : null,
};

const userReducer = (previousState = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_CURRENT_USER:
            return {...previousState, currentUser: action.payload }
        default: 
            return previousState;
    }
}

export default userReducer;