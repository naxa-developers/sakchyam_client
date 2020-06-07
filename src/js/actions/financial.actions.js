import axios from 'axios';
import {
  GET_FINANCIAL_DATA,
  GET_FINANCIAL_PROGRAM,
  GET_PARTNERS_LIST,
  FILTER_FINANCIAL_DATA_FOR_GRAPH,
  FILTER_PARTNERS_BY_TYPE,
} from './index.actions';
import axiosInstance from '../axiosApi';

export const getPartnersList = () => dispatch => {
  try {
    const response = axiosInstance
      .get('/api/v1/financial/partner/')
      .then(function(result) {
        return dispatch({
          type: GET_PARTNERS_LIST,
          payload: result.data,
        });
      });
  } catch (err) {
    console.log(err);
  }
};
export const getFinancialData = () => dispatch => {
  try {
    const response = axiosInstance
      .get('/api/v1/financial/all-data/')
      .then(function(result) {
        const partnerIds = result.data.map(data => {
          return data.partner_id;
        });
        const removedDuplicate = [...new Set(partnerIds)];
        // console.log(removedDuplicate);
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
        return dispatch({
          type: GET_FINANCIAL_PROGRAM,
          payload: result.data,
        });
      });
  } catch (err) {
    console.log(err);
  }
};

export const filterFinancialDataForGraph = (
  selectedPartners,
  selectedProgram,
) => dispatch => {
  console.log(selectedPartners, 'selectedPartners');
  console.log(selectedProgram, 'selectedProgram');
  return dispatch({
    type: FILTER_FINANCIAL_DATA_FOR_GRAPH,
    payload: { selectedPartners, selectedProgram },
  });
};
export const filterPartnersByType = selectedPartnerType => dispatch => {
  return dispatch({
    type: FILTER_PARTNERS_BY_TYPE,
    payload: selectedPartnerType,
  });
};
