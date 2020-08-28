import { GET_PAYMENT_SYSTEMS_DATA } from './index.actions';
import axiosInstance from '../axiosApi';

const getPaymentSystemsData = () => dispatch => {
  try {
    const response = axiosInstance
      .get('/api/v1/paymentapi')
      .then(function(res) {
        return dispatch({
          type: GET_PAYMENT_SYSTEMS_DATA,
          payload: res.data,
        });
      });
  } catch (err) {
    console.log(err);
  }
};

export default getPaymentSystemsData;
