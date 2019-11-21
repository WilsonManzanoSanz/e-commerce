import { BASE_URL } from '../../core/config';

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const FETCH_CATEGORYS_FAILURE = 'FETCH_CATEGORYS_FAILURE';
export const FETCH_CATEGORYS_SUCCESS = 'FETCH_CATEGORYS_SUCCESS';
export const FETCH_CATEGORYS_START = 'FETCH_CATEGORYS_FAILURE';

export const addCategory = category => ({
    type: ADD_CATEGORY,
    payload: category
});

export const fetchNewCategory = (category) => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/categories`, {
                method: 'POST',
                body: JSON.stringify(category), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            if (json.success) {
                dispatch(addCategory(json.data));
                return json;
            } else {
                throw (json.message);
            }
        } catch (error) {
            console.error('Error:', error);
            return error;
        }
    };
};


export const fetchNewProduct = (product) => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/products`, {
                method: 'POST',
                body: JSON.stringify(product), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            if (json.success) {
                dispatch(addCategory(json.data));
                return json;
            } else {
                throw (json.message);
            }
        } catch (error) {
            console.error('Error:', error);
            return error;
        }
    };
}

export const fetchCategorysStart = () => ({
    type: FETCH_CATEGORYS_START,
});

export const fetchCategorysSuccess = (categories) => ({
    type: FETCH_CATEGORYS_SUCCESS,
    payload: categories
});

export const fetchCategorysFailure = (errorMessage) => ({
    type: FETCH_CATEGORYS_FAILURE,
    payload: errorMessage
});

export const fetchCategories = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            if (json.success) {
                dispatch(fetchCategorysSuccess(json.items));
                return json;
            } else {
                throw (json.message);
            }
        } catch (error) {
            console.error('Error:', error);
            return error;
        }
    };
}