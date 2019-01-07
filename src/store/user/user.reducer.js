// @flow
import type { UserStateType, AppStoreType } from '../../types';
import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOGIN_STARTED,
  USER_SIGNUP_STARTED,
  type AnyUserActionType,
  USER_UPDATE,
  USER_LOGIN_FAILURE,
  USER_SIGNUP_FAILURE,
} from './user.action';

const initialState: UserStateType = {
  user: {
    uid: '',
    displayName: '',
    firstSeen: null,
    lastSeen: null,
    email: '',
    photoURL: null,
  },
  isLoggingIn: false,
  isSigningUp: false,
};

const getUserUpdate = (user, state) =>
  Object.assign(state.user, { photoURL: user && user.photoURL });

const userReducer = (
  state: UserStateType = initialState,
  action: AnyUserActionType
): UserStateType => {
  switch (action.type) {
    case USER_LOGIN_STARTED:
      return {
        ...state,
        isLoggingIn: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggingIn: false,
        isSigningUp: false,
      };

    case USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isSigningUp: false,
      };

    case USER_SIGNUP_STARTED:
      return {
        ...state,
        isSigningUp: true,
      };

    case USER_SIGNUP_FAILURE:
      return {
        ...state,
        isSigningUp: false,
      };

    case USER_UPDATE:
      return {
        ...state,
        user: getUserUpdate(action.user, state),
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
export const isLoggingIn = (state: AppStoreType) =>
  state && state.user && state.user.isLoggingIn;
export const isSigningUp = (state: AppStoreType) =>
  state && state.user && state.user.isSigningUp;
