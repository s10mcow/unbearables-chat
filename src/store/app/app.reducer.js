// @flow
import type { AppStateType, AppStoreType } from '../../types';
import {
  APP_SET_INITIALIZED,
  APP_ADD_LOADER,
  APP_REMOVE_LOADER,
  APP_VERIFY_SENT,
  APP_RESET,
  APP_READ_ONLY,
  type AnyAppActionType,
} from './app.action';

const initialState: AppStateType = {
  loaders: [],
  appInitialized: false,
  isAccountVerified: false,
  verifySent: false,
  isReadOnly: false,
};

const appReducer = (
  state: AppStateType = initialState,
  action: AnyAppActionType
): AppStateType => {
  switch (action.type) {
    case APP_ADD_LOADER:
      return Object.assign({}, state, {
        loaders: [...state.loaders, action.key],
      });
    case APP_REMOVE_LOADER:
      const key = action.key;
      return Object.assign({}, state, {
        loaders: state.loaders.filter(loader => loader !== key),
      });
    case APP_SET_INITIALIZED:
      return Object.assign({}, state, {
        appInitialized: true,
        isAccountVerified: action.isAccountVerified,
      });
    case APP_VERIFY_SENT:
      return {
        ...state,
        verifySent: true,
      };
    case APP_READ_ONLY:
      return {
        ...state,
        isReadOnly: true,
      };
    case APP_RESET:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default appReducer;

export function appIsInitialized(state: AppStoreType): boolean {
  return state.app && state.app.appInitialized;
}

export function appGetAccountVerified(state: AppStoreType): boolean {
  return state.app && state.app.isAccountVerified;
}

export function appGetVerifySent(state: AppStoreType): boolean {
  return state.app && state.app.verifySent;
}

export const AppIsReadOnly = (state: AppStoreType) =>
  state && state.user && state.app.isReadOnly;
