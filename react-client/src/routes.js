// ccontains client and backend route definitions

export const clientRoutes = {
  LOGIN_ROUTE: "/login",
  LOGIN_SUCCESS_ROUTE: "/login/failed/:data",
  LOGIN_FAILURE_ROUTE: "/login/success/:data",
  SIGNUP_ROUTE: "/signup",
  ORDER_ROUTE: "/order",
  PRODUCTS_ROUTE: "/"
};


export const backendRoutes = {
  GOOGLE_OAUTH_LOGIN: "http://localhost:3001/api/v1/auth/google/login",
  TOKEN_VERIFY: "http://localhost:3001/api/v1/auth/verify",
  LOCAL_LOGIN: "http://localhost:3001/api/v1/auth/local/login",
  LOCAL_SIGNUP: "http://localhost:3001/api/v1/auth/local/signup",
  FETCH_PRODUCTS: "http://localhost:3001/api/v1/products",
  PRODUCT_FAVORITES: "http://localhost:3001/api/v1/products/favorite",
  UNFAVORITE_PRODUCT: "http://localhost:3001/api/v1/products/unfavorite",
  
};