// @flow
import type { UserStateType, AppStoreType } from '../../types';
import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  type AnyUserActionType,
} from './user.action';

const initialState: UserStateType = {
  user: {
    uid: '',
    displayName: '',
    firstSeen: null,
    lastSeen: null,
    email: '',
  },
};

const userReducer = (
  state: UserStateType = initialState,
  action: AnyUserActionType
): UserStateType => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export const getUserData = (state: AppStoreType) =>
  state && state.user && state.user.user;
export const userIsLoggedIn = (state: AppStoreType) =>
  state && state.user && state.user.user && state.user.user.email;
export default userReducer;
