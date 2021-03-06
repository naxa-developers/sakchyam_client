import {
  GET_PRODUCT_PROCESS_DATA,
  GET_PRODUCT_PROCESS_LIST_REQUEST,
  GET_PRODUCT_PROCESS_LIST_SUCCESS,
  GET_PRODUCT_PROCESS_LIST_FAILURE,
  GET_INITIAL_CHART_DATA,
  FILTER_PRODUCT_NAME_LIST,
  FILTER_PARTNER_NAME_LIST,
  FILTER_ALL_CHART_PP,
  RESET_ALL_CHART_PP,
  FILTER_BAR_POPUP,
} from './index.actions';
import axiosInstance from '../axiosApi';

// eslint-disable-next-line import/prefer-default-export
export const getProductProcessList = () => dispatch => {
  dispatch({ type: GET_PRODUCT_PROCESS_LIST_REQUEST });
  try {
    const response = axiosInstance
      .get('/api/v1/product-process/process/')
      .then(function(result) {
        return dispatch({
          type: GET_PRODUCT_PROCESS_LIST_SUCCESS,
          payload: result.data,
        });
      });
  } catch (err) {
    dispatch({
      type: GET_PRODUCT_PROCESS_LIST_FAILURE,
      payload: err,
    });
    console.log(err);
  }
};

export const getProductProcessData = () => dispatch => {
  try {
    const response = axiosInstance
      .get('/api/v1/product-process/process/')
      .then(function(result) {
        return dispatch({
          type: GET_PRODUCT_PROCESS_DATA,
          payload: result.data,
        });
      });
  } catch (err) {
    console.log(err);
  }
};

export const getInitialChartData = () => dispatch => {
  return dispatch({
    type: GET_INITIAL_CHART_DATA,
    // payload: GET_INITIAL_CHART_DATA,
  });
};

export const filterProductNameList = productCategory => dispatch => {
  return dispatch({
    type: FILTER_PRODUCT_NAME_LIST,
    payload: productCategory,
  });
};

export const filterPartnerNameList = partnerType => dispatch => {
  return dispatch({
    type: FILTER_PARTNER_NAME_LIST,
    payload: partnerType,
  });
};

export const filterAllChartPP = (
  innovationArea,
  productCategory,
  productName,
  partnerType,
  partnerName,
  marketFailure,
) => dispatch => {
  return dispatch({
    type: FILTER_ALL_CHART_PP,
    payload: {
      innovationArea,
      productCategory,
      productName,
      partnerType,
      partnerName,
      marketFailure,
    },
  });
};

export const resetAllChartPP = () => dispatch => {
  return dispatch({
    type: RESET_ALL_CHART_PP,
    payload: {},
  });
};
export const filterBarPopup = (
  firstClicked,
  secondHover,
) => dispatch => {
  return dispatch({
    type: FILTER_BAR_POPUP,
    payload: { firstClicked, secondHover },
  });
};
