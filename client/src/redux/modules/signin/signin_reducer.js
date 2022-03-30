import {
  SIGNIN_USER_REQUEST,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILURE,
  SIGNOUT_USER
} from "./signin_actions";

export var UsersReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNIN_USER_REQUEST:
      return {
        user: [],
        loading: true,
        error: null,
      };
    case SIGNIN_USER_SUCCESS:
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case SIGNIN_USER_FAILURE:
      return {
        user: [],
        loading: false,
        error: action.payload,
      };
    case SIGNOUT_USER:
      return {
        user: null,
      };
    default:
      return state;
  }
};
