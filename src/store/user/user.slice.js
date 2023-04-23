import { createAction, createSlice } from "@reduxjs/toolkit";

const USER_INITIAL_STATE = {
  currentUser: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: USER_INITIAL_STATE,
  reducers: {
    signInSuccess(state, action) {
      state.currentUser = action.payload;
    },
    signOutSuccess(state) {
      state.currentUser = null;
    },
    signInFailed(state, action) {
      state.error = action.payload;
    },
    signUpFailed(state, action) {
      state.error = action.payload;
    },
    signOutFailed(state, action) {
      state.error = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;

export const {
  signInSuccess,
  signInFailed,
  signOutSuccess,
  signOutFailed,
  signUpFailed,
} = userSlice.actions;

export const checkUserSession = createAction("user/CHECK_USER_SESSION");
export const googleSignInStart = createAction("user/GOOGLE_SIGN-IN_START");
export const emailSignInStart = createAction("user/EMAIL_SIGN_IN_START");
export const signUpStart = createAction("user/SIGN_UP_START");
export const signOutStart = createAction("user/SIGN_OUT_START");
export const signUpSuccess = createAction("user/SIGN_UP_SUCCESS");
