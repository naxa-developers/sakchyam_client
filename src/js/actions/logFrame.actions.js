import axios from 'axios';
import {
  GET_INDICATORS_GRAPHDATA,
  GET_INDICATORS_CATEGORY,
  GET_INDICATORS_GRAPHDATA_INDIVIDUAL,
} from './index.actions';
import axiosInstance from '../axiosApi';

// import { successToast, errorToast } from '../utils/toastHandler';
export const getIndicatorsGraphData = () => dispatch => {
  const token = localStorage.getItem('userToken');
  console.log(token);
  try {
    const response = axiosInstance
      .get('/api/v1/logframe/logFrame-data')
      .then(function(result) {
        console.log(result, 'result');

        return dispatch({
          type: GET_INDICATORS_GRAPHDATA,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
  // axios
  //   .get(`${process.env.PUBLIC_URL}/api/v1/logframe/logFrame-data`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })

  //   .then(res => {
  //     dispatch({
  //       type: GET_INDICATORS_GRAPHDATA,
  //       payload: res.data,
  //     });
  //   })
  //   .catch(() => {});
};
export const getIndicatorsCategory = () => dispatch => {
  const token = localStorage.getItem('userToken');
  console.log(token);
  axios
    .get(`${process.env.PUBLIC_URL}/api/v1/logframe/log-category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      dispatch({
        type: GET_INDICATORS_CATEGORY,
        payload: res.data,
      });
    })
    .catch(() => {});
};

export const getIndicatorsGraphDataIndividual = () => dispatch => {
  const token = localStorage.getItem('userToken');
  console.log(token);
  try {
    const response = axiosInstance
      .get('/api/v1/logframe/logFrameSingle-data')
      .then(function(result) {
        console.log(result, 'result individual');

        return dispatch({
          type: GET_INDICATORS_GRAPHDATA_INDIVIDUAL,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
  // axios
  //   .get(`${process.env.PUBLIC_URL}/api/v1/logframe/logFrame-data`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })

  //   .then(res => {
  //     dispatch({
  //       type: GET_INDICATORS_GRAPHDATA,
  //       payload: res.data,
  //     });
  //   })
  //   .catch(() => {});
};
