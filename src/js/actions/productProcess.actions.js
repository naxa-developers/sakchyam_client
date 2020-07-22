import {
  GET_PRODUCT_PROCESS_DATA,
  GET_PRODUCT_PROCESS_LIST,
  GET_INITIAL_CHART_DATA,
  FILTER_PRODUCT_NAME_LIST,
  FILTER_PARTNER_NAME_LIST,
  FILTER_BUBBLE_CHART_DATA,
  FILTER_RADAR_CHART_DATA,
  FILTER_BAR_CHART_DATA,
  FILTER_HEATMAP_CHART_DATA,
  FILTER_OVERVIEW_DATA_PP,
  RESET_ALL_CHART_PP,
} from './index.actions';
import axiosInstance from '../axiosApi';

// eslint-disable-next-line import/prefer-default-export
export const getProductProcessList = () => dispatch => {
  try {
    const response = axiosInstance
      .get('/api/v1/product-process/process/')
      .then(function(result) {
        return dispatch({
          type: GET_PRODUCT_PROCESS_LIST,
          payload: result.data,
        });
      });
  } catch (err) {
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

export const filterBubbleChartData = (
  innovationArea,
  productCategory,
  partnerType,
  productName,
) => dispatch => {
  return dispatch({
    type: FILTER_BUBBLE_CHART_DATA,
    payload: {
      innovationArea,
      productCategory,
      partnerType,
      productName,
    },
  });
};

export const filterRadarChartData = (
  innovationArea,
  partnerType,
) => dispatch => {
  return dispatch({
    type: FILTER_RADAR_CHART_DATA,
    payload: { innovationArea, partnerType },
  });
};

export const filterBarChartData = (
  marketFailure,
  productName,
) => dispatch => {
  return dispatch({
    type: FILTER_BAR_CHART_DATA,
    payload: { marketFailure, productName },
  });
};

export const filterHeatmapChartData = (
  innovationArea,
  marketFailure,
) => dispatch => {
  return dispatch({
    type: FILTER_HEATMAP_CHART_DATA,
    payload: { innovationArea, marketFailure },
  });
};

export const filterOverviewDataPP = (
  innovationArea,
  partnerName,
  productName,
  productCategory,
  partnerType,
  marketFailure,
) => dispatch => {
  return dispatch({
    type: FILTER_OVERVIEW_DATA_PP,
    payload: {
      innovationArea,
      partnerName,
      productName,
      productCategory,
      partnerType,
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
