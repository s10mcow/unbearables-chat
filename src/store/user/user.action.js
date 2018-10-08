//@flow
import type { ExtractActionsType, UserObjectType } from '../../types';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE';
export const USER_UPDATE_INFO = 'USER_UPDATE_INFO';
export const USER_UPDATE_LAST_SEEN = 'USER_UPDATE_LAST_SEEN';
export const USER_LOGIN_STARTED = 'USER_LOGIN_STARTED';
export const USER_SIGNUP_STARTED = 'USER_SIGNUP_STARTED';
export const USER_UPDATE = 'USER_UPDATE';
export const USER_START_SYNC = 'USER_START_SYNC';
export const USER_RESET_PASSWORD = 'USER_RESET_PASSWORD';

const userLogin = (email: string, password: string) => ({
  type: USER_LOGIN,
  email,
  password,
});

const userLoginStarted = () => ({
  type: USER_LOGIN_STARTED,
});

const userSignupStarted = () => ({
  type: USER_SIGNUP_STARTED,
});

const userLoginSuccess = (user: UserObjectType) => ({
  type: USER_LOGIN_SUCCESS,
  user,
});

const userLoginFailure = (error: { message: string }) => ({
  type: USER_LOGIN_FAILURE,
  error,
});

const userSignup = (username: string, password: string, email: string) => ({
  type: USER_SIGNUP,
  username,
  password,
  email,
});

const userLogout = () => ({
  type: USER_LOGOUT,
});

const userLogoutSuccess = () => ({
  type: USER_LOGOUT_SUCCESS,
});

const userSignupFailure = (error: { message: string }) => ({
  type: USER_SIGNUP_FAILURE,
  error,
});

const userUpdateInfo = (username: string) => ({
  type: USER_UPDATE_INFO,
  username,
});

const userStartSync = () => ({
  type: USER_START_SYNC,
});

const userUpdate = (user: UserObjectType) => ({
  type: USER_UPDATE,
  user,
});

const userUpdateLastSeen = () => ({
  type: USER_UPDATE_LAST_SEEN,
});

const userResetPassword = (email: string) => ({
  type: USER_RESET_PASSWORD,
  email,
});

const user = {
  userLogin,
  userLoginSuccess,
  userLoginFailure,
  userSignup,
  userLogout,
  userLogoutSuccess,
  userSignupFailure,
  userUpdateInfo,
  userUpdateLastSeen,
  userLoginStarted,
  userSignupStarted,
  userUpdate,
  userStartSync,
  userResetPassword,
};

export default user;
export type AnyUserActionType = ExtractActionsType<typeof user>;
