import { store } from '../redux/store';

export const commonHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.getState().user.token}`
    };
};

export const addParams = (oldUrl, params) => {
    const url = new URL(oldUrl);
    url.search = new URLSearchParams(params).toString();
    return url;
}

export const BASE_URL = 'http://localhost:3001/api/v1';