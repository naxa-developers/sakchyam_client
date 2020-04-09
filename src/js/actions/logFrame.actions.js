import axios from 'axios';
import {
  GET_INDICATORS_GRAPHDATA,
  GET_INDICATORS_CATEGORY,
} from './index.actions';
// import { successToast, errorToast } from '../utils/toastHandler';

export const getIndicatorsGraphData = () => dispatch => {
  axios
    .get('https://sakchyam.naxa.com.np/api/v1/logframe/logFrame-data')
    .then(res => {
      dispatch({
        type: GET_INDICATORS_GRAPHDATA,
        payload: res.data,
      });
    })
    .catch(() => {});
};
export const getIndicatorsCategory = () => dispatch => {
  axios
    .get(
      'https://sakchyam.naxa.com.np/api/v1/logframe/log-category',
      {
        // headers: { 'Content-Type': 'multipart/form-data' },
      },
    )
    .then(res => {
      dispatch({
        type: GET_INDICATORS_CATEGORY,
        payload: res.data,
      });
    })
    .catch(() => {});
};
