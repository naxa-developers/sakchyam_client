import * as actions from '../actions/index.actions';

const initialState = {
  insuranceData: '',
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case actions.GET_INSURANCE_DATA:
      return {
        ...state,
        insuranceData: payload,
      };
    default:
      return state;
  }
}
