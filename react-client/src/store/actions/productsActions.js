import axios from 'axios';

import {
  FETCH_PRODUCTS,
  FETCH_FAVORITE_PRODUCTS,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES
} from './types/productsActionTypes';

import {
  fetchProductsFailed,
  fetchProductsSucceeded,
  fetchFavoriteProductsFailed,
  fetchFavoriteProductsSucceeded,
  addToFavoriteProductsSuccess,
  addToFavoriteProductsFailed,
  removeFromFavoriteProductsSuccess,
  removeFromFavoriteProductsFailed,
  toggleIsWorking
} from './uiActions';

import { backendRoutes } from '../../routes';

export const fetchProducts = () => (dispatch, getState) => {
  const { auth } = getState();
  const { userToken } = auth;

  dispatch(toggleIsWorking());

  axios.get(backendRoutes.FETCH_PRODUCTS, 
    { 
      headers: {
        Authorization: "Bearer " + userToken
      } 
    })
    .then(response => {
      const { data } = response;
      const { messageType, messageBody } = data;

      switch (messageType) {
        case "error":
          dispatch(fetchProductsFailed(messageBody));
          return dispatch(toggleIsWorking());
        
        case "success":
          dispatch({
            type: FETCH_PRODUCTS,
            payload: messageBody
          });

          dispatch(fetchProductsSucceeded());
          return dispatch(toggleIsWorking());
        
        default:
          return dispatch(toggleIsWorking());
      }
    })
    .catch(err => {
      dispatch(fetchProductsFailed("Unknown error occured when communicating with the server"));
      return dispatch(toggleIsWorking());
    });
};


export const getFavoriteProducts = () => (dispatch, getState) => {
  const { auth } = getState();
  const { userToken } = auth;

  dispatch(toggleIsWorking());

  axios.get(backendRoutes.PRODUCT_FAVORITES,
    {
      headers: {
        Authorization: "Bearer " + userToken
      }
    })
    .then(response => {
      const { data } = response;
      const { messageType, messageBody } = data;

      switch (messageType) {
        case "error":
          dispatch(fetchFavoriteProductsFailed(messageBody));
          return dispatch(toggleIsWorking());

        case "success":
          dispatch({
            type: FETCH_FAVORITE_PRODUCTS,
            payload: messageBody.productIDs
          });

          dispatch(fetchFavoriteProductsSucceeded());
          return dispatch(toggleIsWorking());

        default:
          return dispatch(toggleIsWorking());
      }
    })
    .catch(err => {
      dispatch(fetchFavoriteProductsFailed("Unknown error occured when communicating with the server"));
      return dispatch(toggleIsWorking());
    });
};


export const addToFavorites = (productID) => (dispatch, getState) => {
  const { auth } = getState();
  const { userToken } = auth;

  dispatch(toggleIsWorking());

  axios.post(backendRoutes.PRODUCT_FAVORITES,
    {
      productID: productID
    },
    {
      headers: {
        Authorization: "Bearer " + userToken
      }
    })
    .then(response => {
      const { data } = response;
      const { messageType } = data;

      switch (messageType) {
        case "error":
          const { messageBody } = data;
          dispatch(addToFavoriteProductsFailed(messageBody));
          return dispatch(toggleIsWorking());

        case "success":
          dispatch({
            type: ADD_TO_FAVORITES,
            payload: productID
          });

          dispatch(addToFavoriteProductsSuccess());
          return dispatch(toggleIsWorking());

        default:
          return dispatch(toggleIsWorking());
      }
    })
    .catch(err => {
      dispatch(addToFavoriteProductsFailed("Unknown error occured when communicating with the server"));
      return dispatch(toggleIsWorking());
    });
};


export const removeFromFavorites = (productID) => (dispatch, getState) => {
  const { auth } = getState();
  const { userToken } = auth;

  dispatch(toggleIsWorking());

  axios.post(backendRoutes.UNFAVORITE_PRODUCT,
    {
      productID: productID
    },
    {
      headers: {
        Authorization: "Bearer " + userToken
      }
    })
    .then(response => {
      const { data } = response;
      const { messageType } = data;

      switch (messageType) {
        case "error":
          const { messageBody } = data;
          dispatch(removeFromFavoriteProductsFailed(messageBody));
          return dispatch(toggleIsWorking());

        case "success":
          dispatch({
            type: REMOVE_FROM_FAVORITES,
            payload: productID
          });

          dispatch(removeFromFavoriteProductsSuccess());
          return dispatch(toggleIsWorking());

        default:
          return dispatch(toggleIsWorking());
      }
    })
    .catch(err => {
      dispatch(removeFromFavoriteProductsFailed("Unknown error occured when communicating with the server"));
      return dispatch(toggleIsWorking());
    });
};