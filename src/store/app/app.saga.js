// @flow
import { put, takeLatest, call } from 'redux-saga/effects';
import { APP_LOADERS } from '../../constants';
import actions, {
  APP_INIT,
  APP_RESEND_VERIFY,
  APP_RESET_VERIFICATION,
} from './app.action';
import chatActions from '../chat/chat.action';
import userActions from '../user/user.action';
import type { Saga } from 'redux-saga';
import { push } from 'connected-react-router';
import rsf from '../rsf';

function* appInitWorker(): Saga<void> {
  yield put(actions.addLoader(APP_LOADERS.appInit));
  //Do init stuff here
  const auth = rsf.app.auth();
  let isAccountVerified = false;

  if (auth.currentUser) {
    const { uid, displayName, email, emailVerified } = auth.currentUser;
    const user = {
      uid,
      displayName,
      firstSeen: null,
      lastSeen: null,
      email,
    };
    isAccountVerified = emailVerified;
    if (isAccountVerified) {
      yield put(userActions.userLoginSuccess(user));
      yield put(chatActions.initialize());
    }
  } else {
    yield put(push('/login'));
  }
  yield put(actions.setAppStatusInitialized(isAccountVerified));
  yield put(actions.removeLoader(APP_LOADERS.appInit));
}

function* appResend(): Saga<void> {
  yield call(rsf.auth.sendEmailVerification);
  yield put(actions.verifySent());
}

function* appResetVerification() {
  yield put(actions.appReadOnly());
}

export function* appInitListener(): Saga<void> {
  yield takeLatest(APP_INIT, appInitWorker);
}

export function* appResendVerifyListener(): Saga<void> {
  yield takeLatest(APP_RESEND_VERIFY, appResend);
}

export function* appResetVerificationListener(): Saga<void> {
  yield takeLatest(APP_RESET_VERIFICATION, appResetVerification);
}

export default [
  appInitListener,
  appResendVerifyListener,
  appResetVerificationListener,
];
