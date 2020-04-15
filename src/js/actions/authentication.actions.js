import axios from 'axios';
import { LOGIN_USER } from './index.actions';
import axiosInstance from '../axiosApi';

// import { successToast, errorToast } from '../utils/toastHandler';

// eslint-disable-next-line consistent-return
export const loginUser = data => dispatch => {
  console.log(data);
  console.log(axiosInstance, 'axiosinstas');
  try {
    const response = axiosInstance
      .post('/api/v1/token/login/', data)
      .then(function(result) {
        console.log(result, 'result');
        axiosInstance.defaults.headers.Authorization = `Bearer ${result.data.access}`;
        localStorage.setItem('userToken', result.data.access);
        localStorage.setItem('refreshToken', result.data.refresh);
        return dispatch({
          type: LOGIN_USER,
          payload: result.data,
        });
      })
      .catch(() => {
        alert('login error');
      });
    // console.log(Promise.resolve(response), 'res');
    // response.then(function(result) {
    //   console.log(result, 'result');
    // });
    // console.log(
    //   response.then(result => result.data[['PromiseValue']], 'sd'),
    //   're',
    // );

    // return dispatch({
    //   type: LOGIN_USER,
    //   payload: response.data,
    // });
  } catch (err) {
    console.error(err);
  }
  // axios
  //   .post(`${process.env.PUBLIC_URL}/api/v1/token/login/`, data, {
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //   .then(res => {
  //     console.log(res.data);
  //     localStorage.setItem('userToken', res.data.access);
  //     localStorage.setItem('refreshToken', res.data.refresh);
  //     dispatch({
  //       type: LOGIN_USER,
  //       payload: res.data,
  //     });
  //   })
  //   .catch(() => {});
};
export const getIndicatorsCategory = () => dispatch => {
  axios
    .get(`${process.env.PUBLIC_URL}/api/v1/logframe/log-category`, {
      // headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(res => {
      dispatch({
        // type: GET_INDICATORS_CATEGORY,
        payload: res.data,
      });
    })
    .catch(() => {});
};
