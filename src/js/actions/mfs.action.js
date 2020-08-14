import axiosInstance from '../axiosApi';
import {
  GET_MFS_LIST_REQUEST,
  GET_MFS_LIST_SUCCESS,
  GET_MFS_LIST_FAILURE,
  GET_MFS_INNOVATIONLIST,
  GET_MFS_ACHIEVEMENTLIST,
  GET_MFS_PARTNERLIST,
  FILTER_MFS_LIST_BY_PARTNERINSTITUTION,
  FILTER_MFS_CHOROPLETH_DATA,
  GET_MFS_OVERVIEW_DATA,
  FILTER_MFS_OVERVIEW_DATA,
  FILTER_MFS_LIST_BY_KEY_INNOVATION,
  FILTER_MFS_CHART_DATA_BY_PARTNER,
  FILTER_MFS_CHART_DATA_BY_ACHIEVEMENT,
  FILTER_MFS_MAP_PIE_DATA,
  FILTER_MFS_CHART_DATA_BY_DISTRICT_ID,
} from './index.actions';

// import { successToast, errorToast } from '../utils/toastHandler';
export const getMfsAllData = () => dispatch => {
  dispatch({ type: GET_MFS_LIST_REQUEST });
  try {
    axiosInstance.get('/api/v1/mfs/mfs-data/').then(function(result) {
      // console.log(result, 'result');

      return (
        dispatch({
          type: GET_MFS_LIST_SUCCESS,
          payload: result.data,
        }),
        dispatch({
          type: GET_MFS_INNOVATIONLIST,
          payload: result.data,
        }),
        dispatch({
          type: GET_MFS_ACHIEVEMENTLIST,
          payload: result.data,
        }),
        dispatch({
          type: GET_MFS_PARTNERLIST,
          payload: result.data,
        }),
        dispatch({
          type: GET_MFS_OVERVIEW_DATA,
          payload: result.data,
        }),
        dispatch({
          type: FILTER_MFS_CHOROPLETH_DATA,
          payload: {
            mapViewBy: 'province',
            selectedPartner: [],
            selectedInnovation: [],
            selectedAchievement: [],
          },
        }),
        dispatch({
          type: FILTER_MFS_CHART_DATA_BY_ACHIEVEMENT,
          payload: {
            mapViewBy: 'province',
            selectedPartner: [],
            selectedInnovation: [],
            selectedAchievement: [],
          },
        }),
        dispatch({
          type: FILTER_MFS_CHART_DATA_BY_PARTNER,
          payload: {
            mapViewBy: 'province',
            selectedPartner: [],
            selectedInnovation: [],
            selectedAchievement: [],
          },
        }),
        dispatch({
          type: FILTER_MFS_OVERVIEW_DATA,
          payload: {
            mapViewBy: 'province',
            selectedPartner: [],
            selectedInnovation: [],
            selectedAchievement: [],
          },
        }),
        dispatch({
          type: FILTER_MFS_MAP_PIE_DATA,
          payload: {
            mapViewBy: 'province',
            selectedPartner: [],
            selectedInnovation: [],
            selectedAchievement: [],
          },
        })
      );
    });
  } catch (err) {
    dispatch({
      type: GET_MFS_LIST_FAILURE,
      payload: err,
    });
    console.error(err);
  }
};

export const filterByPartnerInstitution = selectedPartnerInst => dispatch => {
  dispatch({
    type: FILTER_MFS_LIST_BY_PARTNERINSTITUTION,
    payload: selectedPartnerInst,
  });
};
export const filterByKeyInnovation = selectedKeyInnovation => dispatch => {
  dispatch({
    type: FILTER_MFS_LIST_BY_KEY_INNOVATION,
    payload: selectedKeyInnovation,
  });
};
export const filterMfsChoroplethData = (
  mapViewBy,
  selectedPartner,
  selectedInnovation,
  selectedAchievement,
) => dispatch => {
  dispatch({
    type: FILTER_MFS_CHOROPLETH_DATA,
    payload: {
      mapViewBy,
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
    },
  });
};
export const filterOverViewData = (
  mapViewBy,
  selectedPartner,
  selectedInnovation,
  selectedAchievement,
) => dispatch => {
  dispatch({
    type: FILTER_MFS_OVERVIEW_DATA,
    payload: {
      mapViewBy,
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
    },
  });
};
export const filterMfsChartData = (
  mapViewBy,
  selectedPartner,
  selectedInnovation,
  selectedAchievement,
) => dispatch => {
  dispatch({
    type: FILTER_MFS_CHART_DATA_BY_ACHIEVEMENT,
    payload: {
      mapViewBy,
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
    },
  });
};
export const filterMfsChartDataByDistrict = (
  mapViewBy,
  districtList,
  selectedPartner,
  selectedInnovation,
  selectedAchievement,
) => dispatch => {
  dispatch({
    type: FILTER_MFS_CHART_DATA_BY_DISTRICT_ID,
    payload: {
      mapViewBy,
      districtList,
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
    },
  });
};
export const filterMfsMapPieData = (
  mapViewBy,
  selectedPartner,
  selectedInnovation,
  selectedAchievement,
) => dispatch => {
  dispatch({
    type: FILTER_MFS_MAP_PIE_DATA,
    payload: {
      mapViewBy,
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
    },
  });
};
export const filterMfsMapChartDataByPartner = (
  mapViewBy,
  selectedPartner,
  selectedInnovation,
  selectedAchievement,
) => dispatch => {
  dispatch({
    type: FILTER_MFS_CHART_DATA_BY_PARTNER,
    payload: {
      mapViewBy,
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
    },
  });
};
