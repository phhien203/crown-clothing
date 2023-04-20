import { all, call, put, takeLatest } from "redux-saga/effects";
import { USER_ACTION_TYPE } from "./user.types";
import {
  createUserProfileDocument,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import { signInFailed, signInSuccess } from "./user.action";

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

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignIn() {
  yield takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, googleSignIn);
}

export function* onEmailSignIn() {
  yield takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignIn),
    call(onEmailSignIn),
  ]);
}
