import { BASE_URL } from '../../core/config';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    payload: user
});

export const signInWithPassword = (email, password) => {
    return async dispatch => {
        try {
              const response = await fetch(`${BASE_URL}/login`, {
              method: 'POST', 
              body: JSON.stringify({email, password}), // data can be `string` or {object}!
              headers: {
                'Content-Type': 'application/json'
              }
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