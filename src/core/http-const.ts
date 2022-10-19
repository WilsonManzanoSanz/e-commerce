import { store } from "../redux/store";
import { setCurrentUser, setToken } from "../redux/user/user.action";

export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const UNAUTHORIZED = 'UNAUTHORIZED';

export const BASE_URL = "http://localhost:3001/api/v1";
export const commonHeaders = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${store.getState().user.token}`,
  };
};

export const globalHttpError = (error) => {
  console.error('httpError', error);
  if(error && error.errorCode === UNAUTHORIZED){
    store.dispatch(setToken(null));
    store.dispatch(setCurrentUser(null));
  }
  throw error;
  
}