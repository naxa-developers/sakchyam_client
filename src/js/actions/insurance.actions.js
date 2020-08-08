/* eslint-disable import/prefer-default-export */
import axiosI from '../axiosApi';
// eslint-disable-next-line import/no-useless-path-segments
import * as actions from '../actions/index.actions';
import { getInsuranceDAta } from '../api/insurnace';

const setInsuranceData = data => {
  return {
    type: actions.GET_INSURANCE_DATA,
    payload: { data },
  };
};

export const fetchInsuranceData = () => {
  return dispatch => {
    getInsuranceDAta()
      .then(res => {
        dispatch(setInsuranceData(res.data));
      })
      .catch(err => {});
  };
};
