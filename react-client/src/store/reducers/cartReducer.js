import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, CLEAR_CART } from '../actions/types/cartActionTypes';

const initialState = {
  cartProducts: []
};


const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let item = action.payload;

      item.quantity = 1;

      return {
        ...state,
        cartProducts: state.cartProducts.concat(item)
      };
    
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartProducts: state.cartProducts.filter(product => product.productID !== action.payload)
      };
    
    case UPDATE_QUANTITY:
      const { quantity, productID } = action.payload;
      const productIndex = state.cartProducts.findIndex(cartProduct => cartProduct.productID === productID);
      
      let newQuantity = state.cartProducts[productIndex].quantity;

      if (newQuantity > 0) {
        newQuantity += quantity;
        
        if (newQuantity === 0) {
          newQuantity = 1;
        }
      }

      return {
        ...state,
        cartProducts: [
          ...state.cartProducts.slice(0, productIndex),
          {
            ...state.cartProducts[productIndex],
            quantity: newQuantity
          },
          ...state.cartProducts.slice(productIndex + 1)
        ]
      };
    
    case CLEAR_CART:
      return {
        ...state,
        cartProducts: []
      };
    
    default:
      return state;
  }
}

export default cartReducer;

