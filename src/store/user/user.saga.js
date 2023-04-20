import { all, call, put, takeLatest } from "redux-saga/effects";
import { USER_ACTION_TYPE } from "./user.types";
import {
  createUserProfileDocument,
  getCurrentUser,
} from "../../utils/firebase/firebase.utils";
import { signInFailed } from "./user.action";

export function* getSnapshotFromUserAuth(userAuth, additionalInfo) {
  try {
    const userSnapshot = yield call(
      createUserProfileDocument,
      userAuth,
      additionalInfo
    );
    console.log(userSnapshot);
    console.log(userSnapshot.data());
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

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSaga() {
  yield all([call(onCheckUserSession)]);
}
