// @flow
import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import app from './app/app.reducer';
import user from './user/user.reducer';
import chat from './chat/chat.reducer';
import error from './error/error.reducer';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  toastr,
  app,
  user,
  chat,
  form,
  error,
});

export default rootReducer;
