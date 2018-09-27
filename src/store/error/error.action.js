//@flow
import type { ExtractActionsType } from '../../types';
export const ERROR_LOGIN_FAILURE = 'ERROR_LOGIN_FAILURE';
export const ERROR_SIGNUP_FAILURE = 'ERROR_SIGNUP_FAILURE';
export const ERROR_RESET = 'ERROR_RESET';

const errorLoginFailure = (message: string) => ({
  type: ERROR_LOGIN_FAILURE,
  message,
});

const errorSignupFailure = (message: string) => ({
  type: ERROR_SIGNUP_FAILURE,
  message,
});

const resetErrors = () => ({
  type: ERROR_RESET,
});

const error = {
  resetErrors,
  errorLoginFailure,
  errorSignupFailure,
};

export default error;
export type AnyErrorActionType = ExtractActionsType<typeof error>;
