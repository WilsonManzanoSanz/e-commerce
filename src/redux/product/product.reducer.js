import {ArrayInsert} from '../../shared/utils/utils';
import { 
    ADD_CATEGORY, 
    ADD_PRODUCT, 
    UPDATE_CATEGORY,
    FETCH_CATEGORYS_START, 
    FETCH_CATEGORYS_SUCCESS, 
    FETCH_CATEGORYS_FAILURE, 
    FETCH_PRODUCT_FAILURE, 
    FETCH_PRODUCT_SUCCESS, 
    FETCH_PRODUCT_START,
    UPDATE_PRODUCT, 
} from './product.action';

const INITIAL_STATE = {
    categories: [],
    products: [],
    isFetchingCategories: false,
    isFetchingProducts: false,
};


const productsReducer = (previousState = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_CATEGORY:
            return { ...previousState, categories: [...previousState.categories, action.payload] };
        case UPDATE_CATEGORY:
            const idx = previousState.categories.findIndex(el => el.id === action.payload.id);
            return { ...previousState, categories: ArrayInsert(previousState.categories, action.payload, idx) };
        case ADD_PRODUCT:
            return { ...previousState, products: [...previousState.products, action.payload] };
        case UPDATE_PRODUCT:
            const index = previousState.products.findIndex(el => el.id === action.payload.id);
            return { ...previousState, products: ArrayInsert(previousState.products, action.payload, index) };
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
        case FETCH_PRODUCT_START:
            return {
                ...previousState,
                isFetchingProducts: true
            };
        case FETCH_PRODUCT_SUCCESS:
            return {
                ...previousState,
                isFetchingProducts: false,
                products: action.payload
            };
        case FETCH_PRODUCT_FAILURE:
            return {
                ...previousState,
                isFetchingProducts: false,
                errorMessage: action.payload
            };    
        default:
            return previousState;
    }
}

export default productsReducer;