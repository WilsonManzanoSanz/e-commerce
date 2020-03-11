import { SET_SCREEN_SIZE } from './ui.action';

const INITIAL_STATE = {
    isMobile : window.matchMedia("(max-width: 768px)").matches,
};

const uiReducer = (previousState = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_SCREEN_SIZE:
            return {...previousState, isMobile: action.payload }
        default: 
            return previousState;
    }
}

export default uiReducer;