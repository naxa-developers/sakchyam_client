import { combineReducers } from 'redux';
import logFrameReducer from './logFrameReducer.reducer';
import authenticationReducer from './authenticationReducer.reducer';
import automationReducer from './automationReducer.reducer';
import financialReducer from './financialReducer.reducer';
import partnershipReducer from './partnershipReducer.reducer';
import productProcessReducer from './productProcessReducer.reducer';
import outreachReducer from './outreach.reducer';
import mfsReducer from './mfsReducer.reducer';
import commonReducer from './commom.reducer';
import insuranceReducer from './insurance.reducer';
import paymentSystemsReducer from './paymentSystems.reducer';

export default combineReducers({
  authenticationReducer,
  logFrameReducer,
  automationReducer,
  financialReducer,
  partnershipReducer,
  productProcessReducer,
  outreachReducer,
  mfsReducer,
  commonReducer,
  insuranceReducer,
  paymentSystemsReducer,
});
