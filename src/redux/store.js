import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';

const middlewares = [thunk, logger];
const store = createStore(rootReducer, applyMiddleware(...middlewares));
console.log(store.getState());
const persistor = persistStore(store);

export  { store, persistor };