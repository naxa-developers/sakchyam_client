import { combineReducers } from 'redux';
import logFrameReducer from './logFrameReducer.reducer';
import authenticationReducer from './authenticationReducer.reducer';
import automationReducer from './automationReducer.reducer';
import financialReducer from './financialReducer.reducer';
import partnershipReducer from './partnershipReducer.reducer';
import productProcessReducer from './productProcessReducer.reducer';
import outreachReducer from './outreach.reducer';

export default combineReducers({
  authenticationReducer,
  logFrameReducer,
  automationReducer,
  financialReducer,
  partnershipReducer,
  productProcessReducer,
  outreachReducer,
});
