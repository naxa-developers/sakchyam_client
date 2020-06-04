import axios from 'axios';
import {
  GET_FINANCIAL_DATA,
  GET_FINANCIAL_PROGRAM,
} from './index.actions';
import axiosInstance from '../axiosApi';

export const getFinancialData = () => dispatch => {
  try {
    const response = axiosInstance
      .get('/api/v1/financial/all-data/')
      .then(function(result) {
        return dispatch({
          type: GET_FINANCIAL_DATA,
          payload: result.data,
        });
      });
  } catch (err) {
    console.log(err);
  }
};

export const getFinancialProgram = () => dispatch => {
  try {
    const response = axiosInstance
      .get('/api/v1/financial/program/')
      .then(function(result) {
        console.log('res', result);

        return dispatch({
          type: GET_FINANCIAL_PROGRAM,
          payload: result.data,
        });
      });
  } catch (err) {
    console.log(err);
  }
};
