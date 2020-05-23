import {LOGIN_SUCCESS, LOGIN_FAILED, SIGNUP_FAILED, LOGOUT} from "./types/authActionTypes";
import { toggleVerifyingToken, loginError, toggleIsWorking, clearErrors, signupError } from "./uiActions";
import axios from "axios";
import { backendRoutes } from "../../routes";

export const verifyLogin = () => (dispatch) => {
	dispatch(toggleVerifyingToken());

	const token = window.localStorage.getItem("userToken");

	if (!token) {
		dispatch({
      type: LOGIN_FAILED,
    });

    dispatch(loginError(null));
		return dispatch(toggleVerifyingToken());
	}

  axios.get(backendRoutes.TOKEN_VERIFY, 
    { 
      headers: {
        Authorization: "Bearer " + token
      } 
    }
  )
	.then(response => {    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: token
    });
    return dispatch(toggleVerifyingToken());
  })
	.catch(err => {
		if (err.response.status === 401) {
			dispatch({
				type: LOGIN_FAILED,
			});

			dispatch(loginError(null));
			return dispatch(toggleVerifyingToken());
		}

		dispatch(loginError("Unknown error when communicating with the server."));
		return dispatch(toggleVerifyingToken());
	});
};

export const loginLocal = (email, password) => (dispatch) => {
	dispatch(toggleIsWorking());
	
	axios.post(backendRoutes.LOCAL_LOGIN, { email, password })
		.then(response => {
			const { data } = response;
			const { token } = data;

			window.localStorage.setItem("userToken", token);

			dispatch({
				type: LOGIN_SUCCESS,
				payload: token
			});

			return dispatch(toggleIsWorking());
		})
		.catch(err => {
			const { messageType, messageBody } = err.response.data;

			if (messageType === "error") {
				dispatch(loginError(messageBody));

				dispatch({
					type: LOGIN_FAILED
				});

				return dispatch(toggleIsWorking());
			}

			dispatch(loginError("Unknown error when communicating with the server."));
			return dispatch(toggleIsWorking());
		});
};

export const loginOauthSuccess = (token) => (dispatch) => {
	window.localStorage.setItem("userToken", token);

	return dispatch({
		type: LOGIN_SUCCESS,
		payload: token
	});
};

export const logout = () => (dispatch) => {
	window.localStorage.removeItem("userToken");
	
	dispatch({
		type: LOGOUT
	});

	return dispatch(clearErrors());
};


export const signupLocal = (username, email, password) => (dispatch) => {
	dispatch(toggleIsWorking());

	axios.post(backendRoutes.LOCAL_SIGNUP, { username, email, password })
		.then(response => {
			const { data } = response;
			const { token } = data;

			window.localStorage.setItem("userToken", token);

			dispatch({
				type: LOGIN_SUCCESS,
				payload: token
			});

			return dispatch(toggleIsWorking());
		})
		.catch(err => {
			const { messageType, messageBody } = err.response.data;

			if (messageType === "error") {
				dispatch(signupError(messageBody));

				dispatch({
					type: SIGNUP_FAILED
				});

				return dispatch(toggleIsWorking());
			}

			dispatch(signupError("Unknown error when communicating with the server."));
			return dispatch(toggleIsWorking());
		})
}
