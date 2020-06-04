import {
  GET_FINANCIAL_DATA,
  GET_FINANCIAL_PROGRAM,
} from '../actions/index.actions';

const initialState = { financial_data: [], financial_program: [] };

const getFinancialData = (state, action) => {
  return {
    ...state,
    financial_data: action.payload,
  };
};

const getFinancialProgram = (state, action) => {
  return {
    ...state,
    financial_program: action.payload,
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FINANCIAL_DATA:
      return getFinancialData(state, action);
    case GET_FINANCIAL_PROGRAM:
      return getFinancialProgram(state, action);
    default:
      return state;
  }
}
