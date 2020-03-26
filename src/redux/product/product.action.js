import { BASE_URL, commonHeaders, addParams } from '../../core/config';

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const FETCH_CATEGORYS_FAILURE = 'FETCH_CATEGORYS_FAILURE';
export const FETCH_CATEGORYS_SUCCESS = 'FETCH_CATEGORYS_SUCCESS';
export const FETCH_CATEGORYS_START = 'FETCH_CATEGORYS_FAILURE';

export const FETCH_GLOBAL_PRODUCT_FAILURE = 'FETCH_GLOBAL_PRODUCT_FAILURE';
export const FETCH_GLOBAL_PRODUCT_SUCCESS = 'FETCH_GLOBAL_PRODUCT_SUCCESS';
export const FETCH_GLOBAL_PRODUCT_START = 'FETCH_GLOBAL_PRODUCT_FAILURE';

export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_START = 'FETCH_PRODUCT_FAILURE';


export const addCategory = category => ({
    type: ADD_CATEGORY,
    payload: category
});

export const updateCategory = product => ({
    type: EDIT_CATEGORY,
    payload: product
});

export const deleteCategory = category => ({
    type: DELETE_CATEGORY,
    payload: category
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

export const addProduct = product => ({
    type: ADD_PRODUCT,
    payload: product
});

export const updateProduct = product => ({
    type: EDIT_PRODUCT,
    payload: product
});

export const deleteProduct = product => ({
    type: DELETE_PRODUCT,
    payload: product
});

export const fetchGlobalProductsStart = () => ({
    type: FETCH_GLOBAL_PRODUCT_START,
});

export const fetchGlobalProductsSuccess = (products) => ({
    type: FETCH_GLOBAL_PRODUCT_SUCCESS,
    payload: products
});

export const fetchGlobalProductsFailure = (errorMessage) => ({
    type: FETCH_GLOBAL_PRODUCT_FAILURE,
    payload: errorMessage
});

export const fetchProductsStart = () => ({
    type: FETCH_PRODUCT_START,
});

export const fetchProductsSuccess = (products) => ({
    type: FETCH_PRODUCT_SUCCESS,
    payload: products
});

export const fetchProductsFailure = (errorMessage) => ({
    type: FETCH_GLOBAL_PRODUCT_FAILURE,
    payload: errorMessage
});


export const fetchCategories = (params = { include: false }) => {
    return async dispatch => {
        fetchCategorysStart();
        try {
            const response = await fetch(addParams(`${BASE_URL}/categories`, params), {
                method: 'GET',
                headers: commonHeaders()
            });
            const json = await response.json();
            if (json.success) {
                dispatch(fetchCategorysSuccess(json.data.items));
                return json;
            } else {
                throw (json.message);
            }
        } catch (error) {
            fetchGlobalProductsFailure(error);
            return error;
        }
    };
}


export const fetchGlobalProducts = (params) => {
    return async dispatch => {
        fetchGlobalProductsStart();
        try {
            const response = await fetch(addParams(`${BASE_URL}/products`, params), {
                method: 'GET',
                headers: commonHeaders()
            });
            const json = await response.json();
            if (json.success) {
                dispatch(fetchGlobalProductsSuccess(json.data.items));
                return json;
            } else {
                throw (json.message);
            }
        } catch (error) {
            console.error('Error:', error);
            fetchGlobalProductsFailure(error);
            return error;
        }
    };
}

export const fetchProducts = (params) => {
    return async dispatch => {
        fetchProductsStart();
        try {
            const response = await fetch(addParams(`${BASE_URL}/products`, params), {
                method: 'GET',
                headers: commonHeaders()
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
                headers: commonHeaders()
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

export const fetchPutCategory = (category) => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/categories/${category.id}`, {
                method: 'PUT',
                body: JSON.stringify(category), // data can be `string` or {object}!
                headers: commonHeaders()
            });
            const json = await response.json();
            if (json.success) {
                dispatch(updateCategory(json.data));
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

export const fetchDeleteCategory = (category) => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/categories/${category.id}`, {
                method: 'DELETE',
                headers: commonHeaders()
            });
            const json = await response.json();
            if (json.success) {
                dispatch(deleteCategory(json.data));
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
                headers: commonHeaders()
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

export const fetchPutProduct = (product) => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/products/${product.id}`, {
                method: 'PUT',
                body: JSON.stringify(product), // data can be `string` or {object}!
                headers: commonHeaders()
            });
            const json = await response.json();
            if (json.success) {
                if(json.data.disable){
                    dispatch(deleteProduct(json.data));
                } else {
                    dispatch(updateProduct(json.data));
                }
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