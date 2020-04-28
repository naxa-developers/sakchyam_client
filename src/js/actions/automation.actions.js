import {
  GET_AUTOMATION_DATA_BY_PARTNER,
  GET_AUTOMATION_DATA_BY_PROVINCE,
} from './index.actions';
import axiosInstance from '../axiosApi';

// import { successToast, errorToast } from '../utils/toastHandler';
export const getAutomationDataByPartner = () => dispatch => {
  try {
    const response = axiosInstance
      .get('/api/v1/automation/automation-data-partner/')
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: GET_AUTOMATION_DATA_BY_PARTNER,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const getAutomationDataByProvince = () => dispatch => {
  try {
    const response = axiosInstance
      .get('/api/v1/automation/automation-data-province/')
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: GET_AUTOMATION_DATA_BY_PROVINCE,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
  // const token = localStorage.getItem('userToken');
  // axios
  //   .get(`${process.env.PUBLIC_URL}/api/v1/logframe/log-category`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then(res => {
  //     dispatch({
  //       type: GET_INDICATORS_CATEGORY,
  //       payload: res.data,
  //     });
  //   })
  //   .catch(() => {});
};
