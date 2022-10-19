import { BASE_URL, commonHeaders, globalHttpError } from "../../core/http-const";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_TOKEN = "SET_TOKEN";
export const TOGGLE_USER_DROPDOWN = "TOGGLE_USER_DROPDOWN";
export const CLOSE_USER_DROPDOWN = "CLOSE_USER_DROPDOWN";
export const FETCH_PUT_REQUEST = "FETCH_PUT_REQUEST";
export const FETCH_PUT_FAILURE = "FETCH_PUT_FAILURE";
export const FETCH_PUT_SUCCESS = "FETCH_PUT_SUCCESS";

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

export const toggleUserDropdown = () => ({
  type: TOGGLE_USER_DROPDOWN,
});

export const closeUserDropdown = () => ({
  type: CLOSE_USER_DROPDOWN,
});

export const fetchPutUserStart = () => ({
  type: FETCH_PUT_REQUEST,
});

export const fetchPutUserSuccess = (user) => ({
  type: FETCH_PUT_SUCCESS,
  payload: user,
});

export const fetchPutUserStartFailure = (errorMessage) => ({
  type: FETCH_PUT_FAILURE,
  payload: errorMessage,
});

export const signInWithPassword = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }), // data can be `string` or {object}!
        headers: commonHeaders(),
      });
      const json = await response.json();
      if (json.success) {
        dispatch(setToken(json.data.token));
        dispatch(setCurrentUser(json.data));
        return json;
      } else {
        throw json;
      }
    } catch (error) {
      globalHttpError(error);
      return error;
    }
  };
};

export const signUpWithPassword = (user) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        body: JSON.stringify(user), // data can be `string` or {object}!
        headers: commonHeaders(),
      });
      const json = await response.json();
      if (json.success) {
        dispatch(setToken(json.data.token));
        dispatch(setCurrentUser(json.data));
        return json;
      } else {
        throw json;
      }
    } catch (error) {
      globalHttpError(error);
      return error;
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        headers: commonHeaders(),
      });
      const json = await response.json();
      if (json.success) {
        dispatch(setToken(null));
        dispatch(setCurrentUser(null));
        return json;
      } else {
        throw json;
      }
    } catch (error) {
      dispatch(setCurrentUser(null));
      globalHttpError(error);
      return error;
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      dispatch(fetchPutUserStart());
      const response = await fetch(`${BASE_URL}/users/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(user), // data can be `string` or {object}!
        headers: commonHeaders(),
      });
      const json = await response.json();
      if (json.success) {
        dispatch(fetchPutUserSuccess(json.data));
        return json;
      } else {
        dispatch(fetchPutUserStartFailure());
        throw json;
      }
    } catch (error) {
      globalHttpError(error);
      return error;
    }
  };
};

export const getUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "GET",
        headers: commonHeaders(),
      });
      const json = await response.json();
      if (json.success) {
        dispatch(setCurrentUser(json.data));
        return json;
      } else {
        throw json;
      }
    } catch (error) {
      debugger;
      globalHttpError(error);
      return error;
    }
  };
};
