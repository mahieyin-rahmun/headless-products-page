import { 
  FETCH_PRODUCTS_SUCCESS, 
  FETCH_PRODUCTS_FAIL, 
  CLEAR_ERRORS, 
  TOGGLE_VERIFYING_TOKEN,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  FETCH_FAVORITE_PRODUCTS_FAILED,
  FETCH_FAVORITE_PRODUCTS_SUCCESS, 
  ADD_TO_FAVORITES_FAILED,
  ADD_TO_FAVORITES_SUCCESS,
  REMOVE_FROM_FAVORITES_FAILED,
  REMOVE_FROM_FAVORITES_SUCCESS,
  TOGGLE_IS_WORKING,
  ORDER_FAILED, 
  ORDER_SUCCESS,
  FETCH_ORDERS_FAILED,
  FETCH_ORDERS_SUCCESS
} from './types/uiActionTypes';


export const toggleIsWorking = () => (dispatch) => {
  return dispatch({
    type: TOGGLE_IS_WORKING
  });
}

export const fetchProductsFailed = (errorMessage) => (dispatch) => {
  return dispatch({
    type: FETCH_PRODUCTS_FAIL,
    payload: errorMessage
  });
};


export const fetchProductsSucceeded = () => (dispatch) => {
  return dispatch({
    type: FETCH_PRODUCTS_SUCCESS
  });
};


export const fetchFavoriteProductsFailed = (errorMessage) => (dispatch) => {
  return dispatch({
    type: FETCH_FAVORITE_PRODUCTS_FAILED,
    payload: errorMessage
  });
}

export const fetchFavoriteProductsSucceeded = () => (dispatch) => {
  return dispatch({
    type: FETCH_FAVORITE_PRODUCTS_SUCCESS
  }); 
}


export const clearErrors = () => (dispatch) => {
  return dispatch({
    type: CLEAR_ERRORS
  });
};

export const toggleVerifyingToken = () => (dispatch) => {
  return dispatch({
    type: TOGGLE_VERIFYING_TOKEN
  });
}


export const loginError = (errorMessage) => (dispatch) => {
  return dispatch({
    type: LOGIN_ERROR,
    payload: errorMessage
  });
};


export const signupError = (errorMessage) => (dispatch) => {
  return dispatch({
    type: SIGNUP_ERROR,
    payload: errorMessage
  });
};


export const addToFavoriteProductsFailed = (errorMessage) => (dispatch) => {
  return dispatch({
    type: ADD_TO_FAVORITES_FAILED,
    payload: errorMessage
  })
};

export const addToFavoriteProductsSuccess = () => (dispatch) => {
  return dispatch({
    type: ADD_TO_FAVORITES_SUCCESS
  });
}
  
export const removeFromFavoriteProductsSuccess = () => (dispatch) => {
  return dispatch({
    type: REMOVE_FROM_FAVORITES_SUCCESS
  });
}

export const removeFromFavoriteProductsFailed = (errorMessage) => (dispatch) => {
  return dispatch({
    type: REMOVE_FROM_FAVORITES_FAILED,
    payload: errorMessage
  })
};

export const orderFailed = (errorMessage) => (dispatch) => {
  return dispatch({
    type: ORDER_FAILED,
    payload: errorMessage
  });
};

export const orderSuccess = () => (dispatch) => {
  return dispatch({
    type: ORDER_SUCCESS
  });
};


export const fetchOrdersFailed = (errorMessage) => (dispatch) => {
  return dispatch({
    type: FETCH_ORDERS_FAILED,
    payload: errorMessage
  });
}

export const fetchOrdersSuccess = () => (dispatch) => {
  return dispatch({
    type: FETCH_ORDERS_SUCCESS
  });
}
