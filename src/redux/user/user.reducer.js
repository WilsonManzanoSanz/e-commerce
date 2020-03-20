import { SET_CURRENT_USER, SET_TOKEN, FETCH_PUT_REQUEST, FETCH_PUT_FAILURE, FETCH_PUT_SUCCESS } from './user.action';

const INITIAL_STATE = {
    currentUser : null,
    token: null,
    putUser: {
        loading: false,
        payload: [],
        error: null
    }
};

const userReducer = (previousState = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_TOKEN:
            return {...previousState, token: action.payload }
        case SET_CURRENT_USER:
            return {...previousState, currentUser: action.payload }
        case FETCH_PUT_REQUEST:
            return {...previousState, putUser: { loading: true } }
        case FETCH_PUT_SUCCESS:
            return {...previousState, putUser: { loading: false, payload: action.payload } }
        case FETCH_PUT_FAILURE:
            return {...previousState, putUser: { loading: false, error: action.payload } }
        default: 
            return previousState;
    }
}

export default userReducer;