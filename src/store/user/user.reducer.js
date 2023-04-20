import { USER_ACTION_TYPE } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  error: null,
};

export function userReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPE.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    case USER_ACTION_TYPE.SIGN_IN_FAILED:
    case USER_ACTION_TYPE.SIGN_UP_FAILED:
    case USER_ACTION_TYPE.SIGN_OUT_FAILED:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
