import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from './types/cartActionTypes';


export const addToCart = (productID) => (dispatch, getState) => {
  const { products } = getState();
  const { productsList } = products;

  const productInfo = productsList.filter(product => product.productID === productID)[0];
  
  return dispatch({
    type: ADD_TO_CART,
    payload: productInfo
  });
}

export const removeFromCart = (productID) => (dispatch) => {
  return dispatch({
    type: REMOVE_FROM_CART,
    payload: productID
  });
};


export const updateQuantity = (quantity, productID) => (dispatch) => {
  return dispatch({
    type: UPDATE_QUANTITY,
    payload: {
      quantity,
      productID
    }
  });
}