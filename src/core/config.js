import { store } from '../redux/store';

export const commonHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.getState().user.token}`
    };
};

export const BASE_URL = 'http://localhost:3001/api/v1';