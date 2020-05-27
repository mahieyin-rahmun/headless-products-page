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
} from '../actions/types/uiActionTypes';

const initialState = {
  fetchProducts: {
    error: false,
    errorMessage: null
  },
  fetchFavoriteProducts: {
    error: false,
    errorMessage: null
  },
  fetchOrders: {
    error: false,
    errorMessage: null
  },
  addToFavorites: {
    error: false,
    errorMessage: null
  },
  removeFromFavorites: {
    error: false,
    errorMessage: null
  },
  login: {
    error: false,
    errorMessage: null
  },
  signup: {
    error: false,
    errorMessage: null
  },
  order: {
    success: false,
    error: false,
    errorMessage: null
  },
  isVerifyingToken: false,
  isWorking: false
};


const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_IS_WORKING:
      return {
        ...state,
        isWorking: !state.isWorking
      }
    
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        fetchProducts: {
          error: false,
          errorMessage: null
        }  
      }
    
    case FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        fetchProducts: {
          error: true,
          errorMessage: action.payload
        }        
      }
    
    case FETCH_FAVORITE_PRODUCTS_FAILED:
      return {
        ...state,
        fetchFavoriteProducts: {
          error: true,
          errorMessage: action.payload
        }
      };
    
    case FETCH_FAVORITE_PRODUCTS_SUCCESS:
      return {
        ...state,
        fetchFavoriteProducts: {
          error: false,
          errorMessage: null
        }
      };
    
    case ADD_TO_FAVORITES_FAILED:
      return {
        ...state,
        addToFavorites: {
          error: true,
          errorMessage: action.payload
        }
      }
    
    case ADD_TO_FAVORITES_SUCCESS:
      return {
        ...state,
        addToFavorites: {
          error: false,
          errorMessage: null
        }
      }
    
    case REMOVE_FROM_FAVORITES_FAILED:
      return {
        ...state,
        removeFromFavorites: {
          error: true,
          errorMessage: action.payload
        }
      }
      
    case REMOVE_FROM_FAVORITES_SUCCESS:
      return {
        ...state,
        removeFromFavorites: {
          error: false,
          errorMessage: null
        },
      }
        
    case CLEAR_ERRORS:
      return {
        ...state,
        fetchProducts: {
          error: false,
          errorMessage: null
        },
        addToFavorites: {
          error: false,
          errorMessage: null
        },
        fetchOrders: {
          error: false,
          errorMessage: null
        },
        removeFromFavorites: {
          error: false,
          errorMessage: null
        },
        login: {
          error: false,
          errorMessage: null
        },
        signup: {
          error: false,
          errorMessage: null
        },
        fetchFavoriteProducts: {
          error: false,
          errorMessage: null
        },
        order: {
          success: false,
          error: false,
          errorMessage: null
        }
      }
    
    case LOGIN_ERROR:
      return {
        ...state,
        login: {
          error: true,
          errorMessage: action.payload
        }
      };

    case SIGNUP_ERROR:
      return {
        ...state,
        signup: {
          error: true,
          errorMessage: action.payload
        }
      };
    
    case ORDER_SUCCESS:
      return {
        ...state,
        order: {
          success: true,
          error: false,
          errorMessage: null
        }
      };
    
    case ORDER_FAILED:
      return {
        ...state,
        order: {
          success: false,
          error: true,
          errorMessage: action.payload
        }
      };
    
    case FETCH_ORDERS_FAILED:
      return {
        ...state,
        fetchOrders: {
          error: true,
          errorMessage: action.payload
        }
      };
    
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        fetchOrders: {
          error: false,
          errorMessage: true
        }
      };

    case TOGGLE_VERIFYING_TOKEN:
      return {
        ...state,
        isVerifyingToken: !state.isVerifyingToken
      }
        
    default:
      return state;
  }
};

export default uiReducer;