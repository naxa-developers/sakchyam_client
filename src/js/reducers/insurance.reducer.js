// import * as actions from '../actions/index.actions';
import {
  GET_INSURANCE_DATA_REQUEST,
  GET_INSURANCE_DATA_SUCCESS,
} from '../actions/index.actions';

const initialState = {
  insuranceData: '',
  loading: false,
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case GET_INSURANCE_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_INSURANCE_DATA_SUCCESS:
      return {
        ...state,
        insuranceData: payload,
        loading: false,
      };
    default:
      return state;
  }
}
