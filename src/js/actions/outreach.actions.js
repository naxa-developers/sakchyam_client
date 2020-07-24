/* eslint-disable import/prefer-default-export */
import axiosI from '../axiosApi';
// eslint-disable-next-line import/no-useless-path-segments
import * as actions from '../actions/index.actions';

function getSecondaryData(token) {
  return axiosI({
    method: 'get',
    url: `/api/v1/process-product/secondary-data/`,
  });
}
const setSecondaryData = data => {
  return {
    type: actions.GET_OUTREACH_SECONDARY_DATA,
    payload: { data },
  };
};

export const fetchOutreachSecondaryData = () => {
  return dispatch => {
    getSecondaryData()
      .then(res => {
        dispatch(setSecondaryData(res.data));
      })
      .catch(err => {});
  };
};
