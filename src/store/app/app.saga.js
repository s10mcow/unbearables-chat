// @flow
import { put, takeLatest, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { APP_LOADERS } from '../../constants';
import actions, { APP_INIT } from './app.action';
import chatActions from '../chat/chat.action';
import userActions from '../user/user.action';
import type { Saga } from 'redux-saga';
import { push } from 'connected-react-router';
import rsf from '../rsf';

function* appInitWorker(): Saga<void> {
  yield put(actions.addLoader(APP_LOADERS.appInit));
  //Do init stuff here
  const auth = rsf.app.auth();
  yield call(delay, 1000);
  if (auth.currentUser) {
    const { uid, displayName, email } = auth.currentUser;
    const user = {
      uid,
      displayName,
      firstSeen: null,
      lastSeen: null,
      email,
    };
    yield put(userActions.userLoginSuccess(user));
    yield put(chatActions.initialize());
  } else {
    yield put(push('/login'));
  }
  yield put(actions.removeLoader(APP_LOADERS.appInit));
  yield put(actions.setAppStatusInitialized());
}

export function* appInitListener(): Saga<void> {
  yield takeLatest(APP_INIT, appInitWorker);
}

export default [appInitListener];
