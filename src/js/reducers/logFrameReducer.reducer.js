import {
  GET_INDICATORS_GRAPHDATA,
  GET_INDICATORS_CATEGORY,
} from '../actions/index.actions';

// import copy from '../utils/cloneNestedObject';
/* eslint-disable camelcase */
/* eslint-disable  no-unused-vars */

/* eslint-disable no-param-reassign */

const initialState = {
  indicatorCategory: [],
  logDataGraph: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INDICATORS_GRAPHDATA:
      return {
        ...state,
        logDataGraph: action.payload,
      };
    case GET_INDICATORS_CATEGORY:
      return {
        ...state,
        indicatorCategory: action.payload,
      };

    // case TOGGLE_NULL_SUBMISSIONS_ANSWER:
    //   return toggleNullSubmission(state);

    default:
      return state;
  }
}
