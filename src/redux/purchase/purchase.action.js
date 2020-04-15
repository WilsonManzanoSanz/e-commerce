// import { BASE_URL, commonHeaders, addParams } from '../../core/config';

export const SET_SHIPPING_INFO = 'ADD_SHIPPING_INFO';
export const UPDATE_SHIPPING_INFO = 'UPDATE_SHIPPING_INFO';

export const setShippingInfo = shipping => ({
    type: SET_SHIPPING_INFO,
    payload: shipping
});
