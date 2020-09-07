import * as actions from '../actions/index.actions';

const initialState = {
  secondarData: '',
  provinceData: '',
  districtData: '',
  municipalityData: '',
  primaryData: '',
  dataReceived: true,
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case 'GET_OUTREACH_BY_PRIMARY_DATA':
      return {
        ...state,
        primaryData: payload,
        dataReceived: false,
      };
    case 'GET_OUTREACH_SECONDARY_DATA':
      return {
        ...state,
        secondarData: payload,
      };
    case 'GET_OUTREACH_BY_PROVINCE':
      return {
        ...state,
        provinceData: payload,
      };
    case 'GET_OUTREACH_BY_DISTRICT':
      return {
        ...state,
        districtData: payload,
      };
    case 'GET_OUTREACH_BY_MUNICIPALITY':
      return {
        ...state,
        municipalityData: payload,
      };

    default:
      return state;
  }
}
