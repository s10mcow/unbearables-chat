// @flow
import { takeLatest, call, select, take, put, fork } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import { buffers, eventChannel } from 'redux-saga';
import rsf from '../rsf';
import firebase from 'firebase';
import {
  CHAT_INIT,
  CHAT_SEND_MESSAGE,
  CHAT_LOGOUT,
  CHAT_LOAD_MORE_MESSAGES,
} from './chat.action';
import actions from './chat.action';
import userActions from '../user/user.action';
import { getUserData } from '../user/user.reducer';
import { reset } from 'redux-form';
import { push } from 'connected-react-router';
import { AppIsReadOnly } from '../app/app.reducer';
import { getMessages } from '../chat/chat.reducer';

//export const contentPath = 'live-chat/content/';
//export const memberPath = 'live-chat/members/';
export const contentPath = 'v2/live-chat/messages/';
export const memberPath = 'v2/live-chat/presence/';
let contentChannel;
let membersChannel;
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
    const disconnect = ref.onDisconnect();
    yield call([disconnect, disconnect.set], null);
    const now = {
      at: firebase.database.ServerValue.TIMESTAMP,
      name: user.displayName,
    };
    yield call([ref, ref.set], now);
    yield call(startChannels);
    yield put(push('/'));
  } catch (err) {
    console.error(err);
  }
}

function* startChannels() {
  yield fork(contentAdd);
  yield fork(memberAdd);
  yield fork(memberRemove);
  yield fork(memberChanged);
}

function* memberRemove() {
  const contentChannel = yield call(
    channel,
    memberPath,
    'child_removed',
    actions.chatMemberRemove
  );
  while (true) {
    const contentAction = yield take(contentChannel);
    yield put(contentAction);
  }
}

function* memberAdd() {
  membersChannel = yield call(
    channel,
    memberPath,
    'child_added',
    actions.chatMembersUpdate
  );
  while (true) {
    const contentAction = yield take(membersChannel);
    yield put(contentAction);
  }
}

function* memberChanged() {
  memberChannel = yield call(
    channel,
    memberPath,
    'child_changed',
    actions.chatMemberUpdate
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
    const isReadOnly = yield select(AppIsReadOnly);
    if (isReadOnly) {
      return;
    }
    const user = yield select(getUserData);
    const ref = rsf.app
      .database()
      .ref(contentPath)
      .push();
    const post = {
      at: firebase.database.ServerValue.TIMESTAMP,
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
    const user = yield select(getUserData);
    if (user.uid !== '') {
      const userPath = memberPath + user.uid;
      const ref = rsf.app.database().ref(userPath);
      yield call([ref, ref.set], null);
    }
    if (contentChannel) {
      yield call(contentChannel.close);
    }
    if (memberChannel) {
      yield call(memberChannel.close);
    }
    yield put(actions.chatReset());
  } catch (e) {
    console.error(e);
  }
}

function* chatLoadMoreMessages() {
  try {
    const messages = yield select(getMessages);
    const oldestMessage = messages[0].snapshot.key;

    const ref = rsf.app
      .database()
      .ref(contentPath)
      .orderByKey()
      .endAt(oldestMessage)
      .limitToLast(20);

    const snapshot = yield call([ref, ref.once], 'value');
    let newMessages = [];
    snapshot.forEach(function(childSnapshot) {
      newMessages = newMessages.concat([
        { snapshot: childSnapshot, value: childSnapshot.val() },
      ]);
    });

    yield put(actions.chatLoadMoreMessagesSuccess(newMessages));
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

export function* watchChatLoadMoreMessages(): Saga<void> {
  yield takeLatest(CHAT_LOAD_MORE_MESSAGES, chatLoadMoreMessages);
}

export default [
  watchChatInit,
  watchSendMessage,
  watchChatLogout,
  watchChatLoadMoreMessages,
];
