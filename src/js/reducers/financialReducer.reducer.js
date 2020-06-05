import {
  GET_FINANCIAL_DATA,
  GET_FINANCIAL_PROGRAM,
  GET_PARTNERS_LIST,
} from '../actions/index.actions';

const initialState = {
  partnersList: [],
  financialData: [],
  financialProgram: [],
};

const getPartnersList = (state, action) => {
  return {
    ...state,
    partnersList: action.payload[0],
  };
};
const getFinancialData = (state, action) => {
  return {
    ...state,
    financialData: action.payload,
  };
};

const getFinancialProgram = (state, action) => {
  return {
    ...state,
    financialProgram: action.payload,
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PARTNERS_LIST:
      return getPartnersList(state, action);
    case GET_FINANCIAL_DATA:
      return getFinancialData(state, action);
    case GET_FINANCIAL_PROGRAM:
      return getFinancialProgram(state, action);
    default:
      return state;
  }
}
