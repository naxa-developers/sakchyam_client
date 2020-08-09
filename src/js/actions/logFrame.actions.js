import axios from 'axios';
import {
  LOADING_TRUE,
  GET_INDICATORS_GRAPHDATA,
  GET_INDICATORS_CATEGORY,
  GET_INDICATORS_GRAPHDATA_INDIVIDUAL,
  FILTER_INDICATOR_GRAPH_DATA,
  FILTER_INDICATOR_GRAPH_DATA_WITH_DATE,
  FILTER_OUTPUT_INDICATOR_WITH_PERCENT_OR_NUMBER,
  GET_PLANNED_ACHIEVED_DATA_FOR_1STPIECHARTS,
  GET_PLANNED_ACHIEVED_DATA_FOR_2NDPIECHARTS,
} from './index.actions';
import axiosInstance from '../axiosApi';

// import { successToast, errorToast } from '../utils/toastHandler';
export const getIndicatorsCategory = () => dispatch => {
  try {
    const response = axiosInstance
      .get('/api/v1/logframe/log-category')
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: GET_INDICATORS_CATEGORY,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
  // const token = localStorage.getItem('userToken');
  // axios
  //   .get(`${process.env.PUBLIC_URL}/api/v1/logframe/log-category`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then(res => {
  //     dispatch({
  //       type: GET_INDICATORS_CATEGORY,
  //       payload: res.data,
  //     });
  //   })
  //   .catch(() => {});
};
export const loadingTrue = () => dispatch =>
  dispatch({
    type: LOADING_TRUE,
  });

export const getIndicatorsGraphData = (
  activeLayer,
  activeDate,
) => dispatch => {
  // const token = localStorage.getItem('userToken');
  try {
    const response = axiosInstance
      .get('/api/v1/logframe/logFrame-data')
      .then(function(result) {
        // console.log(result, 'result');
        if (activeDate === false) {
          return (
            dispatch({
              type: GET_INDICATORS_GRAPHDATA,
              payload: result.data,
            }),
            dispatch({
              type: FILTER_INDICATOR_GRAPH_DATA,
              payload: activeLayer,
            }),
            dispatch({
              type: GET_PLANNED_ACHIEVED_DATA_FOR_1STPIECHARTS,
              payload: result.data,
            }),
            dispatch({
              type: GET_PLANNED_ACHIEVED_DATA_FOR_2NDPIECHARTS,
              payload: {
                totalData: result.data,
                selectedMilestone: 'Milestone Year 1',
              },
            })
          );
        }
        return (
          dispatch({
            type: GET_INDICATORS_GRAPHDATA,
            payload: result.data,
          }),
          dispatch({
            type: GET_PLANNED_ACHIEVED_DATA_FOR_2NDPIECHARTS,
            payload: result.data,
          }),
          dispatch({
            type: GET_PLANNED_ACHIEVED_DATA_FOR_1STPIECHARTS,
            payload: result.data,
          }),
          dispatch({
            type: FILTER_INDICATOR_GRAPH_DATA_WITH_DATE,
            payload: { activeLayer, activeDate },
          })
        );
      });
  } catch (err) {
    console.error(err);
  }
};

export const getIndicatorsGraphDataIndividual = (
  activeLayer,
  activeDate,
) => dispatch => {
  // const token = localStorage.getItem('userToken');
  try {
    const response = axiosInstance
      .get('/api/v1/logframe/logFrameSingle-data')
      .then(function(result) {
        // console.log(result, 'result individual');
        if (activeDate === false) {
          return (
            dispatch({
              type: GET_INDICATORS_GRAPHDATA_INDIVIDUAL,
              payload: result.data,
            }),
            dispatch({
              type: FILTER_INDICATOR_GRAPH_DATA,
              payload: activeLayer,
            }),
            dispatch({
              type: GET_PLANNED_ACHIEVED_DATA_FOR_1STPIECHARTS,
              payload: result.data,
            })
          );
        }
        return (
          dispatch({
            type: GET_INDICATORS_GRAPHDATA_INDIVIDUAL,
            payload: result.data,
          }),
          dispatch({
            type: FILTER_INDICATOR_GRAPH_DATA_WITH_DATE,
            payload: { activeLayer, activeDate },
          }),
          dispatch({
            type: GET_PLANNED_ACHIEVED_DATA_FOR_1STPIECHARTS,
            payload: result.data,
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
export const filterPlanned2ndPieChart = selectedMilestone => dispatch => {
  dispatch({
    type: GET_PLANNED_ACHIEVED_DATA_FOR_2NDPIECHARTS,
    payload: {
      selectedMilestone,
    },
  });
};
export const filterIndicatorGraphDataWithDate = (
  activeLayer,
  activeDate,
  activeDataType,
) => dispatch => {
  dispatch({
    type: FILTER_INDICATOR_GRAPH_DATA_WITH_DATE,
    payload: { activeLayer, activeDate, activeDataType },
  });
};
export const filterOuputIndicatorWithPercentOrNumber = (
  activeLayer,
  activeDate,
  dataTypePayload,
) => dispatch => {
  console.log(dataTypePayload, 'Dataatatata');
  dispatch({
    type: FILTER_OUTPUT_INDICATOR_WITH_PERCENT_OR_NUMBER,
    payload: { activeLayer, activeDate, dataTypePayload },
  });
};
