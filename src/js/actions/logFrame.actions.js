import axios from 'axios';
import {
  GET_INDICATORS_GRAPHDATA,
  GET_INDICATORS_CATEGORY,
  GET_INDICATORS_GRAPHDATA_INDIVIDUAL,
  FILTER_INDICATOR_GRAPH_DATA,
  FILTER_INDICATOR_GRAPH_DATA_WITH_DATE,
} from './index.actions';
import axiosInstance from '../axiosApi';

// import { successToast, errorToast } from '../utils/toastHandler';
export const getIndicatorsCategory = () => dispatch => {
  const token = localStorage.getItem('userToken');
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

export const getIndicatorsGraphData = activeLayer => dispatch => {
  // const token = localStorage.getItem('userToken');
  try {
    const response = axiosInstance
      .get('/api/v1/logframe/logFrame-data')
      .then(function(result) {
        // console.log(result, 'result');

        return (
          dispatch({
            type: GET_INDICATORS_GRAPHDATA,
            payload: result.data,
          }),
          dispatch({
            type: FILTER_INDICATOR_GRAPH_DATA,
            payload: activeLayer,
          })
        );
      });
  } catch (err) {
    console.error(err);
  }
};

export const getIndicatorsGraphDataIndividual = activeLayer => dispatch => {
  // const token = localStorage.getItem('userToken');
  try {
    const response = axiosInstance
      .get('/api/v1/logframe/logFrameSingle-data')
      .then(function(result) {
        // console.log(result, 'result individual');

        return (
          dispatch({
            type: GET_INDICATORS_GRAPHDATA_INDIVIDUAL,
            payload: result.data,
          }),
          dispatch({
            type: FILTER_INDICATOR_GRAPH_DATA,
            payload: activeLayer,
          })
        );
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
export const filterIndicatorGraphData = activeLayer => dispatch => {
  dispatch({
    type: FILTER_INDICATOR_GRAPH_DATA,
    payload: activeLayer,
  });
};
export const filterIndicatorGraphDataWithDate = (
  activeLayer,
  activeDate,
) => dispatch => {
  dispatch({
    type: FILTER_INDICATOR_GRAPH_DATA_WITH_DATE,
    payload: { activeLayer, activeDate },
  });
};
