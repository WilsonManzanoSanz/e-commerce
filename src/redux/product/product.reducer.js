import { 
    ADD_CATEGORY, 
    ADD_PRODUCT, 
    FETCH_CATEGORYS_START, 
    FETCH_CATEGORYS_SUCCESS, 
    FETCH_CATEGORYS_FAILURE, 
    FETCH_PRODUCT_FAILURE, 
    FETCH_PRODUCT_SUCCESS, 
    FETCH_PRODUCT_START, 
    EDIT_CATEGORY,
    DELETE_CATEGORY,
    EDIT_PRODUCT,
    DELETE_PRODUCT
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
        case EDIT_CATEGORY:
            return { ...previousState, categories: previousState.categories.map(elem => 
                elem.id === action.payload.id ? 
                {...elem, ...action.payload} : 
                elem) };
        case DELETE_CATEGORY:
            return { ...previousState, categories: previousState.categories.filter(elem => elem.id !== action.payload.id )};
        case ADD_PRODUCT:
            return { ...previousState, products: [...previousState.products, action.payload] };
        case EDIT_PRODUCT:
            return { ...previousState, products: previousState.products.map(elem => 
                elem.id === action.payload.id ? 
                {...elem, ...action.payload} : 
                elem) };
        case DELETE_PRODUCT:
            return { ...previousState, products: previousState.products.filter(elem => elem.id !== action.payload.id )};       
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