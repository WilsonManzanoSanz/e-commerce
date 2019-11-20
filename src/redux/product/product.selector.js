import { createSelector } from 'reselect';

const selectProduct = state => state.product;

export const selectCategories = createSelector(
    [selectProduct],
    category => category.categories
);

export const selectCategoriesIsFetching = createSelector(
    [selectProduct],
    category => category.isFetchingCategories
);