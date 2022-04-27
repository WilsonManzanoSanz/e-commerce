import { store } from "../redux/store";

export const BASE_URL = "http://localhost:3001/api/v1";
export const commonHeaders = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${store.getState().user.token}`,
  };
};

export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';