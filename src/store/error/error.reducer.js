// @flow
import type { ErrorStateType, AppStoreType } from '../../types';
import {
  ERROR_LOGIN_FAILURE,
  ERROR_SIGNUP_FAILURE,
  ERROR_RESET,
  type AnyErrorActionType,
} from './error.action';

const initialState: ErrorStateType = {
  loginError: '',
  signupError: '',
};

const errorReducer = (
  state: ErrorStateType = initialState,
  action: AnyErrorActionType
): ErrorStateType => {
  switch (action.type) {
    case ERROR_LOGIN_FAILURE:
      return {
        ...initialState,
        loginError: action.message,
      };
    case ERROR_SIGNUP_FAILURE:
      return {
        ...initialState,
        signupError: action.message,
      };
    case ERROR_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default errorReducer;

export const getError = (state: AppStoreType) => state && state.error;
