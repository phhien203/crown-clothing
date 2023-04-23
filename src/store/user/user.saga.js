import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  createAuthUserWithEmailAndPassword,
  createUserProfileDocument,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signUserOut,
} from "../../utils/firebase/firebase.utils";
import {
  checkUserSession,
  emailSignInStart,
  googleSignInStart,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutStart,
  signOutSuccess,
  signUpFailed,
  signUpStart,
  signUpSuccess,
} from "./user.slice";

export function* getSnapshotFromUserAuth(userAuth, additionalInfo) {
  try {
    const userSnapshot = yield call(
      createUserProfileDocument,
      userAuth,
      additionalInfo
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* isUserAuthenticated() {
  try {
    const authUser = yield call(getCurrentUser);

    if (!authUser) {
      return;
    }

    yield call(getSnapshotFromUserAuth, authUser);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* googleSignIn() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess({ user, additionalInfo: { displayName } }));
  } catch (err) {
    yield put(signUpFailed(err));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalInfo } }) {
  yield call(getSnapshotFromUserAuth, user, additionalInfo);
}

export function* signOut() {
  try {
    yield call(signUserOut);
    yield put(signOutSuccess());
  } catch (err) {
    yield put(signOutFailed(err));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(checkUserSession, isUserAuthenticated);
}

export function* onGoogleSignIn() {
  yield takeLatest(googleSignInStart, googleSignIn);
}

export function* onEmailSignIn() {
  yield takeLatest(emailSignInStart, signInWithEmail);
}

export function* onSignUp() {
  yield takeLatest(signUpStart, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(signUpSuccess, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest(signOutStart, signOut);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignIn),
    call(onEmailSignIn),
    call(onSignUp),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
