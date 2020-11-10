import {
  LOGIN_USER,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILED,
  USER_PERMISSIONS,
} from '../actions/index.actions';

// import copy from '../utils/cloneNestedObject';
/* eslint-disable camelcase */
/* eslint-disable  no-unused-vars */

/* eslint-disable no-param-reassign */

const initialState = {
  login: [],
  redirectToReferrer: false,
  permissions: null,
  isLoggedIn: false,
  //   logDataGraph: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      // console.log(action.payload);
      return {
        ...state,
        login: action.payload,
        isLoggedIn: true,
        // logDataGraph: action.payload,
      };
    case LOGIN_USER_REQUEST:
      // console.log(action.payload);
      return {
        ...state,
        // login: action.payload,
        isLoggedIn: false,
        // logDataGraph: action.payload,
      };
    case LOGIN_USER_FAILED:
      // console.log(action.payload);
      return {
        ...state,
        // login: action.payload,
        isLoggedIn: !state.isLoggedIn,
        // logDataGraph: action.payload,
      };
    case USER_PERMISSIONS:
      // console.log(action.payload);
      return {
        ...state,
        permissions: action.payload,
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
