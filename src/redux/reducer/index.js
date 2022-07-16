import { combineReducers } from 'redux';
import http from './httpReducer';

export const rootReducer = combineReducers({
  http,
});
