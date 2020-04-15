import { LOGIN_USER } from '../actions/index.actions';

// import copy from '../utils/cloneNestedObject';
/* eslint-disable camelcase */
/* eslint-disable  no-unused-vars */

/* eslint-disable no-param-reassign */

const initialState = {
  login: [],
  redirectToReferrer: false,
  //   logDataGraph: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      console.log(action.payload);
      return {
        ...state,
        redirectToReferrer: true,
        // logDataGraph: action.payload,
      };
    // case GET_INDICATORS_CATEGORY:
    //   return {
    //     ...state,
    //     indicatorCategory: action.payload,
    //   };

    // case TOGGLE_NULL_SUBMISSIONS_ANSWER:
    //   return toggleNullSubmission(state);

    default:
      return state;
  }
}
