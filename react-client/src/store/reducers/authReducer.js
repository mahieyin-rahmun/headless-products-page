import {LOGIN_SUCCESS, LOGIN_FAILED, SIGNUP_FAILED, LOGOUT} from "../actions/types/authActionTypes";

const initialState = {
	isUserAuthenticated: false,
	userToken: null
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				isUserAuthenticated: true,
				userToken: action.payload
			};

		case LOGIN_FAILED:
			return {
				...state,
				isUserAuthenticated: false,
				userToken: null
			};

		case SIGNUP_FAILED:
			return {
				...state,
				isUserAuthenticated: false,
				userToken: null
			};

		case LOGOUT:
			return {
				...state,
				isUserAuthenticated: false,
				userToken: null
			}

		default:
			return state;
	}
};


export default authReducer;