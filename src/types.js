//@flow
import type { AppLoader } from 'constants';

/******************************************
 * REDUX HELPER TYPES
 ******************************************/

type _ExtractActionType = <A>((...args: any) => A) => A;
export type ExtractActionType<Fn> = $Call<_ExtractActionType, Fn>;
export type ExtractActionsType<T> = $Values<$ObjMap<T, _ExtractActionType>>;
export type Exact<T> = T & $Exact<T>;

/******************************************
 * ERROR
 ******************************************/
export type ErrorStateType = {
  loginError: string,
  signupError: string,
};

/******************************************
 * User
 ******************************************/
export type UserObjectType = {
  uid: string,
  displayName: string,
  lastSeen: number | null,
  firstSeen: number | null,
  email: string,
};

export type UserStateType = {
  user: UserObjectType,
};


/******************************************
 * Chat
 ******************************************/
export type ChatObjectType = {
  at: Date,
  content: string,
  from: number,
  name: string,
};

export type ChatStateType = {
  content: Array<ChatObjectType>,
  members: Array<UserObjectType>,
};


/******************************************
 * APP
 ******************************************/
export type AppStateType = {
  appInitialized: boolean,
  loaders: AppLoader[],
};

export type AppStoreType = {
  app: AppStateType,
  chat: ChatStateType,
  error: ErrorStateType,
  user: UserStateType,
};


