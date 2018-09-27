// @flow
import { takeLatest, call, select, take, put, fork } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import { buffers, eventChannel } from 'redux-saga';
import rsf from '../rsf';
import { CHAT_INIT, CHAT_SEND_MESSAGE, CHAT_LOGOUT } from './chat.action';
import actions from './chat.action';
import userActions from '../user/user.action';
import { getUserData } from '../user/user.reducer';
import { reset } from 'redux-form';
import { push } from 'connected-react-router';

export const contentPath = 'live-chat/content/';
export const memberPath = 'live-chat/members/';
let contentChannel;
let memberChannel;

function channel(pathOrRef, event, action, limit) {
  let ref = rsf.app.database().ref(pathOrRef);
  ref = limit ? ref.limitToLast(limit) : ref;

  return eventChannel(emit => {
    const callback = ref.on(event, dataSnapshot => {
      emit(
        action({
          snapshot: dataSnapshot,
          value: dataSnapshot.val(),
        })
      );
    });
    return () => ref.off(event, callback);
  }, buffers.expanding());
}

function* chatInit(): Saga<void> {
  try {
    const user = yield select(getUserData);
    const userPath = `${memberPath}${user.uid}`;
    const ref = rsf.app.database().ref(userPath);
    const snapshot = yield call([ref, ref.once], 'value');
    const rosterUpdate = {
      lastSeen: Date.now(),
    };
    if (snapshot.val() == null) {
      rosterUpdate.name = user.displayName;
      rosterUpdate.firstSeen = rosterUpdate.lastSeen;
    }
    yield call([ref, ref.update], rosterUpdate);
    yield call(startChannels);
    yield put(push('/chat'));
  } catch (error) {
    console.error(error);
  }
}

function* startChannels() {
  yield fork(contentAdd);
  yield fork(memberAdd);
}

// function* memberRemove() {
//   const contentChannel = yield call(
//     channel,
//     memberPath,
//     'child_removed',
//     actions.chatMemeberRemove
//   );
//   while (true) {
//     const contentAction = yield take(contentChannel);
//     yield put(contentAction);
//   }
// }

function* memberAdd() {
  memberChannel = yield call(
    channel,
    memberPath,
    'child_added',
    actions.chatMemeberUpdate
  );
  while (true) {
    const contentAction = yield take(memberChannel);
    yield put(contentAction);
  }
}

// function* contentModified() {
//   const contentChannel = yield call(
//     channel,
//     contentPath,
//     'child_changed',
//     actions.chatContentModified
//   );
//   while (true) {
//     const contentAction = yield take(contentChannel);
//     yield put(contentAction);
//   }
// }

// function* contentRemove() {
//   const contentChannel = yield call(
//     channel,
//     contentPath,
//     'child_removed',
//     actions.chatContentRemove
//   );
//   while (true) {
//     const contentAction = yield take(contentChannel);
//     yield put(contentAction);
//   }
// }

function* contentAdd() {
  const contentChannel = yield call(
    channel,
    contentPath,
    'child_added',
    actions.chatContentUpdate,
    50
  );
  while (true) {
    const contentAction = yield take(contentChannel);
    yield put(contentAction);
  }
}

function* chatSendMessage(action) {
  try {
    const user = yield select(getUserData);
    const ref = rsf.app
      .database()
      .ref(contentPath)
      .push();
    const post = {
      at: Date.now(),
      content: action.message,
      from: user.uid,
      name: user.displayName,
    };
    yield put(reset('chatInputForm'));
    yield call([ref, ref.set], post);
    yield put(userActions.userUpdateLastSeen());
  } catch (e) {
    console.error(e);
  }
}

function* chatLogout() {
  try {
    yield call(contentChannel.close);
    yield call(memberChannel.close);
    yield put(actions.chatReset());
  } catch (e) {
    console.error(e);
  }
}

export function* watchChatLogout(): Saga<void> {
  yield takeLatest(CHAT_LOGOUT, chatLogout);
}

export function* watchSendMessage(): Saga<void> {
  yield takeLatest(CHAT_SEND_MESSAGE, chatSendMessage);
}

export function* watchChatInit(): Saga<void> {
  yield takeLatest(CHAT_INIT, chatInit);
}

export default [watchChatInit, watchSendMessage, watchChatLogout];
