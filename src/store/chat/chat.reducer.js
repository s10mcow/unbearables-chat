// @flow
import type { ChatStateType } from '../../types';
import {
  CHAT_MEMBERS_UPDATE,
  CHAT_MEMBER_UPDATE,
  CHAT_CONTENT_UPDATE,
  CHAT_MEMBER_REMOVE,
  CHAT_RESET,
  CHAT_LOAD_MORE_MESSAGES_SUCCESS,
  type AnyChatActionType,
} from './chat.action';

const initialState: ChatStateType = {
  content: [],
  members: [],
};

const findUpdateMember = (members, data) =>
  members.map(member => {
    if (data.value.name === member.value.name) {
      member = Object.assign({}, data);
    }
    return member;
  });

const organizeMembers = (members: Array<any>) =>
  members.sort((a, b) => {
    if (a.value.name > b.value.name) return 1;
    if (a.value.name < b.value.name) return -1;
    return 0;
  });
// .filter(m => {
//   const timeWindow = 20 * 60 * 1000;
//   return Date.now() - m.value.lastSeen <= timeWindow;
// });

const removeMember = (member: any, members: Array<any>) =>
  members.filter(m => m.value.name !== member.value.name);

const chatReducer = (
  state: ChatStateType = initialState,
  action: AnyChatActionType
): ChatStateType => {
  switch (action.type) {
    case CHAT_CONTENT_UPDATE:
      return {
        ...state,
        content: state.content.concat([action.content]),
      };
    case CHAT_MEMBERS_UPDATE:
      return {
        ...state,
        members: organizeMembers(state.members.concat([action.members])),
      };

    case CHAT_MEMBER_UPDATE:
      return {
        ...state,
        members: findUpdateMember(state.members, action.member),
      };

    case CHAT_MEMBER_REMOVE:
      return {
        ...state,
        members: removeMember(action.member, state.members),
      };

    case CHAT_RESET:
      return {
        ...initialState,
      };

    case CHAT_LOAD_MORE_MESSAGES_SUCCESS:
      return {
        ...state,
        content: action.messages.concat(state.content),
      };

    default:
      return state;
  }
};

export default chatReducer;

export const getMessages = state => state.chat && state.chat.content;
