import * as actions from '../actions/index.actions';

const initialState = {
  secondarData: '',
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case actions.GET_OUTREACH_SECONDARY_DATA:
      return {
        ...state,
        secondarData: payload,
      };

    default:
      return state;
  }
}
