/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-useless-path-segments
import {
  GET_INSURANCE_DATA_REQUEST,
  GET_INSURANCE_DATA_SUCCESS,
} from './index.actions';
import { getInsuranceDAta } from '../api/insurnace';

const setInsuranceData = data => {
  return {
    type: GET_INSURANCE_DATA_SUCCESS,
    payload: { data },
  };
};

export const fetchInsuranceData = () => {
  return dispatch => {
    dispatch({ type: GET_INSURANCE_DATA_REQUEST });
    getInsuranceDAta()
      .then(res => {
        dispatch(setInsuranceData(res.data));
      })
      .catch(err => {});
  };
};
