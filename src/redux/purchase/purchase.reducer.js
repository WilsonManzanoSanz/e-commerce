import {
    SET_SHIPPING_INFO,
} from './purchase.action';

const INITIAL_STATE = {
    purchase: {
        id: 0,
        displayName: '',
        phone: '',
        address: '',
        city: 0,
        department: '',
        idCard: 0
    },
    shippingInfo: {
        id: 0,
        displayName: '',
        phone: '',
        address: '',
        city: 0,
        department: '',
        idCard: 0
    },
    fetchPurchase: {
        isLoading: false,
        payload: {},
        errorMessage: ''
    },
};

const purchaseReducer = (previousState = INITIAL_STATE, action) => {
    switch (action.type) {
      case SET_SHIPPING_INFO: 
      return { ...previousState, ...{ shippingInfo: action.payload } };
      default:
        return previousState;
    }
  };
  
export default purchaseReducer;