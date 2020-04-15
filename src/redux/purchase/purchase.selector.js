import { createSelector } from 'reselect';

const selectPurchase = state => state.purchase;

export const selectShippingInfo = createSelector(
    [selectPurchase],
    purchase => purchase.shippingInfo
);