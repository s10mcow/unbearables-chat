//@flow
import type { ExtractActionsType } from '../../types';
export const ERROR_LOGIN_FAILURE = 'ERROR_LOGIN_FAILURE';
export const ERROR_SIGNUP_FAILURE = 'ERROR_SIGNUP_FAILURE';
export const ERROR_RESET = 'ERROR_RESET';
export const ERROR_RESET_PASSWORD_FAILURE = 'ERROR_RESET_PASSWORD_FAILURE';

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

const errorResetPasswordFailure = (message: string) => ({
  type: ERROR_RESET_PASSWORD_FAILURE,
  message,
});

const error = {
  errorResetPasswordFailure,
  resetErrors,
  errorLoginFailure,
  errorSignupFailure,
};

export default error;
export type AnyErrorActionType = ExtractActionsType<typeof error>;
