import { combineReducers } from 'redux';
import logFrameReducer from './logFrameReducer.reducer';
import authenticationReducer from './authenticationReducer.reducer';

export default combineReducers({
  logFrameReducer,
  authenticationReducer,
});
