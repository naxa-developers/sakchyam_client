import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.PUBLIC_URL}`,
  // timeout: 150000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    if (
      localStorage.getItem('refreshToken') &&
      error.response.status === 401
      // error.response.statusText === 'Unauthorized'
    ) {
      const refreshToken = localStorage.getItem('refreshToken');
      // localStorage.removeItem('refreshToken');
      // localStorage.removeItem('userToken');
      // localStorage.removeItem('userPermission');
      if (
        error.response.data.detail === 'Token is invalid or expired'
      ) {
        window.location.href = '/login';
      }
      return axiosInstance
        .post('/api/v1/token/refresh/', { refresh: refreshToken })
        .then(response => {
          localStorage.setItem('userToken', response.data.access);
          // localStorage.setItem('refreshToken', response.data.refresh);

          axiosInstance.defaults.headers.Authorization = `Bearer ${response.data.access}`;
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

          return axiosInstance(originalRequest);
        })
        .catch(err => {
          console.log(err);
          console.log('err 401');
        });
    }

    if (
      !localStorage.getItem('refreshToken') &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      // send login page
      window.location.href = '/login';
    }

    // window.location.href = '/login';
    // specific error handling done elsewhere
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ ...error });
  },
);

export default axiosInstance;
