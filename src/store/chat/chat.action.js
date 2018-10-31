//@flow
import type { ExtractActionsType, ChatObjectType } from '../../types';
export const CHAT_INIT = 'CHAT_INIT';
export const CHAT_CONTENT_UPDATE = 'CHAT_CONTENT_UPDATE';
export const CHAT_MEMBER_UPDATE = 'CHAT_MEMBER_UPDATE';
export const CHAT_MEMBER_REMOVE = 'CHAT_MEMBER_REMOVE';
export const CHAT_SEND_MESSAGE = 'CHAT_SEND_MESSAGE';
export const CHAT_CONTENT_REMOVE = 'CHAT_CONTENT_REMOVE';
export const CHAT_CONTENT_MODIFIED = 'CHAT_CONTENT_MODIFIED';
export const CHAT_LOGOUT = 'CHAT_LOGOUT';
export const CHAT_RESET = 'CHAT_RESET';

const initialize = () => ({
  type: CHAT_INIT,
});

// const chatContentModified = (message:  => ({
//   type: CHAT_CONTENT_MODIFIED,
//   message,
// });

// const chatContentRemove = message => ({
//   type: CHAT_CONTENT_REMOVE,
//   message,
// });

const chatContentUpdate = (content: Array<any>) => ({
  type: CHAT_CONTENT_UPDATE,
  content,
});

const chatMemberUpdate = (members: Array<any>) => ({
  type: CHAT_MEMBER_UPDATE,
  members,
});

const chatMemberRemove = member => ({
  type: CHAT_MEMBER_REMOVE,
  member,
});

const chatSendMessage = (message: ChatObjectType) => ({
  type: CHAT_SEND_MESSAGE,
  message,
});

const chatLogout = () => ({
  type: CHAT_LOGOUT,
});

const chatReset = () => ({
  type: CHAT_RESET,
});

const chat = {
  initialize,
  chatMemberUpdate,
  chatMemberRemove,
  chatContentUpdate,
  chatLogout,
  chatSendMessage,
  chatReset,
};

export default chat;
export type AnyChatActionType = ExtractActionsType<typeof chat>;
