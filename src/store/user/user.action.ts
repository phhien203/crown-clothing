import { AdditionalInfo, UserData } from "../../utils/firebase/firebase.utils";
import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPE } from "./user.types";

export type SetCurrentUser = ActionWithPayload<
  USER_ACTION_TYPE.SET_CURRENT_USER,
  UserData
>;

export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser => {
  return createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user);
});

export type CheckUserSession = Action<USER_ACTION_TYPE.CHECK_USER_SESSION>;

export const checkUserSession = withMatcher((): CheckUserSession => {
  return createAction(USER_ACTION_TYPE.CHECK_USER_SESSION);
});

export type GoogleSignInStart = Action<USER_ACTION_TYPE.GOOGLE_SIGN_IN_START>;

export const googleSignInStart = withMatcher((): GoogleSignInStart => {
  return createAction(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START);
});

export type EmailSignInStart = ActionWithPayload<
  USER_ACTION_TYPE.EMAIL_SIGN_IN_START,
  {
    email: string;
    password: string;
  }
>;

export const emailSignInStart = withMatcher(
  (email: string, password: string): EmailSignInStart => {
    return createAction(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, {
      email,
      password,
    });
  }
);

export type SignInSuccess = ActionWithPayload<
  USER_ACTION_TYPE.SIGN_IN_SUCCESS,
  UserData
>;

export const signInSuccess = withMatcher((user: UserData): SignInSuccess => {
  return createAction(USER_ACTION_TYPE.SIGN_IN_SUCCESS, user);
});

export type SignInError = ActionWithPayload<
  USER_ACTION_TYPE.SIGN_IN_FAILED,
  Error
>;

export const signInFailed = withMatcher((error: Error): SignInError => {
  return createAction(USER_ACTION_TYPE.SIGN_IN_FAILED, error);
});

export type SignUpStart = ActionWithPayload<
  USER_ACTION_TYPE.SIGN_UP_START,
  {
    email: string;
    password: string;
    displayName: string;
  }
>;

export const signUpStart = withMatcher(
  (email: string, password: string, displayName: string): SignUpStart => {
    return createAction(USER_ACTION_TYPE.SIGN_UP_START, {
      email,
      password,
      displayName,
    });
  }
);

export type SignUpSuccess = ActionWithPayload<
  USER_ACTION_TYPE.SIGN_UP_SUCCESS,
  {
    user: UserData;
    additionalDetails: AdditionalInfo;
  }
>;

export const signUpSuccess = withMatcher(
  (user: UserData, additionalDetails: AdditionalInfo): SignUpSuccess => {
    return createAction(USER_ACTION_TYPE.SIGN_UP_SUCCESS, {
      user,
      additionalDetails,
    });
  }
);

export type SignUpFailed = ActionWithPayload<
  USER_ACTION_TYPE.SIGN_UP_FAILED,
  Error
>;

export const signUpFailed = withMatcher((error: Error): SignUpFailed => {
  return createAction(USER_ACTION_TYPE.SIGN_UP_FAILED, error);
});

export type SignOutStart = Action<USER_ACTION_TYPE.SIGN_OUT_START>;

export const signOutStart = withMatcher((): SignOutStart => {
  return createAction(USER_ACTION_TYPE.SIGN_OUT_START);
});

export type SignOutSuccess = Action<USER_ACTION_TYPE.SIGN_OUT_SUCCESS>;

export const signOutSuccess = withMatcher((): SignOutSuccess => {
  return createAction(USER_ACTION_TYPE.SIGN_OUT_SUCCESS);
});

export type SignOutFailed = ActionWithPayload<
  USER_ACTION_TYPE.SIGN_OUT_FAILED,
  Error
>;

export const signOutFailed = withMatcher((err: Error): SignOutFailed => {
  return createAction(USER_ACTION_TYPE.SIGN_OUT_FAILED, err);
});
