import { createSelector } from 'reselect';

const selectProduct = state => state.product;

export const selectCategories = createSelector(
    [selectProduct],
    category => category.categories
);

export const selectProducts = createSelector(
    [selectProduct],
    product => product.products
);

export const selectIsFetchingProducts = createSelector(
    [selectProduct],
    product => product.isFetchingProducts
);

export const selectCategoriesIsFetching = createSelector(
    [selectProduct],
    category => category.isFetchingCategories
);

export const selectCategory = collectionUrlParam =>
  createSelector(
    [selectCategories],
    categories => {
        return categories ?  categories.find(item => item.category.toLowerCase() === collectionUrlParam) : null
    }
);