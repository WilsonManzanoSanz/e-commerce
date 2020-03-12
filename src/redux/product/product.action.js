import { BASE_URL } from '../../core/config';

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const FETCH_CATEGORYS_FAILURE = 'FETCH_CATEGORYS_FAILURE';
export const FETCH_CATEGORYS_SUCCESS = 'FETCH_CATEGORYS_SUCCESS';
export const FETCH_CATEGORYS_START = 'FETCH_CATEGORYS_FAILURE';

export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_START = 'FETCH_PRODUCT_FAILURE';

export const FETCH_PUT_REQUEST = 'FETCH_PUT_REQUEST_CATEGORY';
export const FETCH_PUT_FAILURE_CATEGORY = 'FETCH_PUT_FAILURE_CATEGORY';
export const FETCH_PUT_SUCCESS = 'FETCH_PUT_SUCCESS_CATEGORY';

export const addCategory = category => ({
    type: ADD_CATEGORY,
    payload: category
});

export const addProduct= product => ({
    type: ADD_PRODUCT,
    payload: product
});

export const fetchProductsStart = () => ({
    type: FETCH_PRODUCT_START,
});

export const fetchProductsSuccess = (products) => ({
    type: FETCH_PRODUCT_SUCCESS,
    payload: products
});

export const fetchProductsFailure = (errorMessage) => ({
    type: FETCH_PRODUCT_FAILURE,
    payload: errorMessage
});

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


export const fetchCategories = (params = {include: false}) => {
    return async dispatch => {
        fetchCategorysStart();
        const url = new URL(`${BASE_URL}/categories`);

        url.search = new URLSearchParams(params).toString();
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            if (json.success) {
                dispatch(fetchCategorysSuccess(json.data.items));
                return json;
            } else {
                throw (json.message);
            }
        } catch (error) {
            fetchProductsFailure(error);
            return error;
        }
    };
}


export const fetchProducts = () => {
    return async dispatch => {
        fetchProductsStart();
        try {
            const response = await fetch(`${BASE_URL}/products`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            if (json.success) {
                dispatch(fetchProductsSuccess(json.data.items));
                return json;
            } else {
                throw (json.message);
            }
        } catch (error) {
            console.error('Error:', error);
            fetchProductsFailure(error);
            return error;
        }
    };
}

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
                dispatch(addProduct(json.data));
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