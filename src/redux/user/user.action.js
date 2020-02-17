import { BASE_URL } from '../../core/config';
import {store} from '../store';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_TOKEN = 'SET_TOKEN';
export const TOGGLE_USER_DROPDOWN = 'TOGGLE_USER_DROPDOWN';
export const CLOSE_USER_DROPDOWN = 'CLOSE_USER_DROPDOWN';

export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    payload: user
});

export const setToken = token => ({
    type: SET_TOKEN,
    payload: token
});

export const toggleUserDropdown = () => ({
    type: TOGGLE_USER_DROPDOWN,
});

export const closeUserDropdown = () => ({
    type: CLOSE_USER_DROPDOWN,
});


const commonHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.getState().user.token}`
    };
};

export const signInWithPassword = (email, password) => {
    return async dispatch => {
        try {
              const response = await fetch(`${BASE_URL}/login`, {
              method: 'POST', 
              body: JSON.stringify({email, password}), // data can be `string` or {object}!
              headers: commonHeaders()
            });
            const json = await response.json();
            console.log(json);
            if(json.success){
                dispatch(setToken(json.data.token))
                dispatch(setCurrentUser(json.data));
                return json;
            } else {
                throw(json.message);
            }
          } catch (error) {
            console.error('Error:', error);
            return error;
        }
    }; 
}


export const signUpWithPassword = (user) => {
    return async dispatch => {
        try {
              const response = await fetch(`${BASE_URL}/register`, {
              method: 'POST', 
              body: JSON.stringify(user), // data can be `string` or {object}!
              headers: commonHeaders()
            });
            const json = await response.json();
            console.log(json);
            if(json.success){
                dispatch(setToken(json.data.token))
                dispatch(setCurrentUser(json.data));
                return json;
            } else {
                throw(json.message);
            }
          } catch (error) {
            console.error('Error:', error);
            return error;
        }
    }; 
}

export const logOut = () => {
    return async dispatch => {
        try {
              const response = await fetch(`${BASE_URL}/logout`, {
              method: 'POST', 
              headers: commonHeaders()
            });
            const json = await response.json();
            if(json.success){
                dispatch(setToken(null))
                dispatch(setCurrentUser(null));
                return json;
            } else {
                throw(json.message);
            }
          } catch (error) {
            dispatch(setCurrentUser(null));
            console.error('Error:', error);
            return error;
        }
    }; 
}

export const updateUser = (user) => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/users/${user.id}`, {
            method: 'PUT', 
            body: JSON.stringify(user), // data can be `string` or {object}!
            headers: commonHeaders()
            });
            const json = await response.json();
            if(json.success){
                dispatch(setCurrentUser(json.data));
                return json;
            } else {
                throw(json.message);
            }
        } catch (error) {
            console.error('Error:', error);
            return error;
        }
    }
};


export const getUser = (id) => {
    return async dispatch => {
        try {
              const response = await fetch(`${BASE_URL}/users/${id}`, {
              method: 'GET', 
              headers: commonHeaders()
            });
            const json = await response.json();
            if(json.success){
                dispatch(setCurrentUser(json.data));
                return json;
            } else {
                throw(json.message);
            }
          } catch (error) {
            console.error('Error:', error);
            return error;
        }
    }; 
}