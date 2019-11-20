import { ADD_CATEGORY, FETCH_CATEGORYS_START, FETCH_CATEGORYS_SUCCESS, FETCH_CATEGORYS_FAILURE } from './product.action';

const INITIAL_STATE = {
    categories: [],
    products: [],
    isFetchingCategories: false,
};


const productsReducer = (previousState = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_CATEGORY:
            return { ...previousState, categories: [...previousState.categories, action.payload] };
        case FETCH_CATEGORYS_START:
            return {
                ...previousState,
                isFetchingCategories: true
            };
        case FETCH_CATEGORYS_SUCCESS:
            return {
                ...previousState,
                isFetchingCategories: false,
                categories: action.payload
            };
        case FETCH_CATEGORYS_FAILURE:
            return {
                ...previousState,
                isFetchingCategories: false,
                errorMessage: action.payload
            };
        default:
            return previousState;
    }
}

export default productsReducer;