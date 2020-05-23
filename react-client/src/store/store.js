import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import productsReducer from './reducers/productsReducer';
import uiReducer from './reducers/uiReducer';
import cartReducer from './reducers/cartReducer';
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  ui: uiReducer,
  cart: cartReducer,
  auth: authReducer
});

const initialState = {};

let middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
);

export default store;
