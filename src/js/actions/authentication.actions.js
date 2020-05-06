import axios from 'axios';
import { LOGIN_USER, USER_PERMISSIONS } from './index.actions';
import axiosInstance from '../axiosApi';

// import { successToast, errorToast } from '../utils/toastHandler';

// eslint-disable-next-line consistent-return
export const loginUser = data => dispatch => {
  try {
    const response = axiosInstance
      .post('/api/v1/token/login/', data)
      .then(function(result) {
        const expireTime = new Date();
        expireTime.setHours(expireTime.getHours() + 1);
        const today = new Date();
        localStorage.setItem('loginTime', today);
        localStorage.setItem('expirationTime', expireTime);
        axiosInstance.defaults.headers.Authorization = `Bearer ${result.data.access}`;
        localStorage.setItem('userToken', result.data.access);
        localStorage.setItem('refreshToken', result.data.refresh);
        axios
          .get(
            `${process.env.PUBLIC_URL}/api/v1/token/user-permission/`,
            {
              headers: {
                Authorization: `Bearer ${result.data.access}`,
              },
            },
          )
          .then(res => {
            localStorage.setItem(
              'userPermission',
              JSON.stringify(res.data),
            );
            dispatch({
              type: USER_PERMISSIONS,
              payload: res.data,
            });
          })
          .catch(() => {});
        return dispatch({
          type: LOGIN_USER,
          payload: result.data,
        });
      })
      .catch(() => {
        alert('login error');
      });
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
export const getUserPermissions = () => dispatch => {
  try {
    const response = axiosInstance
      .get('/api/v1/token/user-permission/')
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: USER_PERMISSIONS,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
  // const token = localStorage.getItem('userToken');
  // axios
  //   .get(`${process.env.PUBLIC_URL}/api/v1/token/user-permission/`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then(res => {
  //     localStorage.setItem(
  //       'userPermission',
  //       JSON.stringify(res.data),
  //     );
  //     dispatch({
  //       type: USER_PERMISSIONS,
  //       payload: res.data,
  //     });
  //   })
  //   .catch(() => {});
};
