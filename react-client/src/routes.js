// ccontains client and backend route definitions

export const clientRoutes = {
  LOGIN_ROUTE: "/login",
  LOGIN_SUCCESS_ROUTE: "/login/failed/:data",
  LOGIN_FAILURE_ROUTE: "/login/success/:data",
  SIGNUP_ROUTE: "/signup",
  ORDER_ROUTE: "/order",
  ORDERS_ROUTE: "/orders",
  PRODUCTS_ROUTE: "/"
};


export const backendRoutes = {
  GOOGLE_OAUTH_LOGIN: "/api/v1/auth/google/login",
  TOKEN_VERIFY: "/api/v1/auth/verify",
  LOCAL_LOGIN: "/api/v1/auth/local/login",
  LOCAL_SIGNUP: "/api/v1/auth/local/signup",
  FETCH_PRODUCTS: "/api/v1/products",
  PRODUCT_FAVORITES: "/api/v1/products/favorite",
  UNFAVORITE_PRODUCT: "/api/v1/products/unfavorite",
  PLACE_ORDER: "/api/v1/products/confirmorder",
  FETCH_ORDERS: "/api/v1/products/orders"
};