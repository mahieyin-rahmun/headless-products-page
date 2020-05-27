import {
  FETCH_PRODUCTS,
  FETCH_FAVORITE_PRODUCTS,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  PLACE_ORDER,
  FETCH_ORDERS
} from '../actions/types/productsActionTypes';

const initialState = {
  productsList: null,
  favoritesList: null,
  ordersList: null,
  latestOrder: null
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        productsList: action.payload
      };
    
    case FETCH_FAVORITE_PRODUCTS:
      return {
        ...state,
        favoritesList: action.payload
      }
    
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favoritesList: [
          ...state.favoritesList,
          action.payload
        ]
      };
    
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favoritesList: state.favoritesList.filter(productID => productID !== action.payload)
      };
    
    case PLACE_ORDER:
      return {
        ...state,
        latestOrder: action.payload
      }
    
    case FETCH_ORDERS:
      return {
        ...state,
        ordersList: action.payload
      }
  
    default:
      return state;
  }
};

export default productsReducer;