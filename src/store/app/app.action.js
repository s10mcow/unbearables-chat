// @flow
import type { ExtractActionsType } from '../../types';
import type { AppLoader } from '../../constants';

export const APP_INIT: 'APP_INIT' = 'APP_INIT';
export const APP_READ_ONLY: 'APP_READ_ONLY' = 'APP_READ_ONLY';
export const APP_SET_INITIALIZED: 'APP_SET_INITIALIZED' = 'APP_SET_INITIALIZED';
export const APP_ADD_LOADER: 'APP_ADD_LOADER' = 'APP_ADD_LOADER';
export const APP_REMOVE_LOADER: 'APP_REMOVE_LOADER' = 'APP_REMOVE_LOADER';
export const APP_REFRESH_VERIFY: 'APP_REFRESH_VERIFY' = 'APP_REFRESH_VERIFY';
export const APP_RESEND_VERIFY: 'APP_RESEND_VERIFY' = 'APP_RESEND_VERIFY';
export const APP_VERIFY_SENT: 'APP_VERIFY_SENT' = 'APP_VERIFY_SENT';
export const APP_RESET: 'APP_RESET' = 'APP_RESET';
export const APP_RESET_VERIFICATION: 'APP_RESET_VERIFICATION' =
  'APP_RESET_VERIFICATION';

const actions = {
  addLoader(key: AppLoader) {
    return {
      type: APP_ADD_LOADER,
      key,
    };
  },
  removeLoader(key: AppLoader) {
    return {
      type: APP_REMOVE_LOADER,
      key,
    };
  },
  appInit() {
    return {
      type: APP_INIT,
    };
  },
  appReset() {
    return {
      type: APP_RESET,
    };
  },
  appReadOnly() {
    return {
      type: APP_READ_ONLY,
    };
  },
  setAppStatusInitialized(isAccountVerified: boolean) {
    return {
      type: APP_SET_INITIALIZED,
      isAccountVerified,
    };
  },
  resendVerify() {
    return {
      type: APP_RESEND_VERIFY,
    };
  },
  refresh() {
    return {
      type: APP_REFRESH_VERIFY,
    };
  },
  verifySent() {
    return {
      type: APP_VERIFY_SENT,
    };
  },
  resetVerification() {
    return {
      type: APP_RESET_VERIFICATION,
    };
  },
};

export type AnyAppActionType = ExtractActionsType<typeof actions>;
export default actions;
