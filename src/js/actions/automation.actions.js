import axios from 'axios';
import {
  GET_AUTOMATION_DATA_BY_PARTNER,
  GET_AUTOMATION_DATA_BY_PROVINCE,
  GET_AUTOMATION_DATA_BY_DISTRICT,
  GET_AUTOMATION_DATA_BY_MUNICIPALITY,
  FILTER_AUTOMATION_DATA_FOR_VECTORTILES,
  FILTER_DISTRICT_FROM_PROVINCE_COLOR,
} from './index.actions';
import axiosInstance from '../axiosApi';
// import { successToast, errorToast } from '../utils/toastHandler';
export const getAllAutomationDataByPartner = () => dispatch => {
  try {
    const response = axiosInstance
      .get('/api/v1/automation/automation-all/')
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: GET_AUTOMATION_DATA_BY_PARTNER,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const getAutomationDataByProvince = () => dispatch => {
  try {
    const response = axiosInstance
      .get('/api/v1/adminlevel/province/')
      .then(function(result) {
        // console.log(result, 'result');

        return (
          dispatch({
            type: GET_AUTOMATION_DATA_BY_PROVINCE,
            payload: result.data,
          }),
          dispatch({
            type: FILTER_AUTOMATION_DATA_FOR_VECTORTILES,
            payload: '',
          })
        );
      });
  } catch (err) {
    console.error(err);
  }
};

export const getAutomationDataByDistrict = () => dispatch => {
  try {
    const response = axiosInstance
      .get('/api/v1/adminlevel/district/')
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: GET_AUTOMATION_DATA_BY_DISTRICT,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const getAutomationDataByMunicipality = () => dispatch => {
  // try {
  //   const response = axiosInstance
  //     .get('/api/v1/automation/automation-data-municipality/')
  //     .then(function(result) {
  //       // console.log(result, 'result');
  //       return dispatch({
  //         type: GET_AUTOMATION_DATA_BY_MUNICIPALITY,
  //         payload: result.data,
  //       });
  //     });
  // } catch (err) {
  //   console.error(err);
  // }
  const token = localStorage.getItem('userToken');
  axios
    .get(
      `${process.env.PUBLIC_URL}/api/v1/adminlevel/municipality/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(res => {
      dispatch({
        type: GET_AUTOMATION_DATA_BY_MUNICIPALITY,
        payload: res.data,
      });
    })
    .catch(() => {});
};
export const filterAutomationDataForVectorTiles = dataLevel => dispatch => {
  return dispatch({
    type: FILTER_AUTOMATION_DATA_FOR_VECTORTILES,
    payload: dataLevel,
  });
};
export const filterDistrictFromProvinceColor = dataCode => dispatch => {
  const token = localStorage.getItem('userToken');
  axios
    .get(
      `${process.env.PUBLIC_URL}/api/v1/automation/automation-data/?province_id=${dataCode}
      `,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(res => {
      console.log(res.data, 'datacolorfilter');
      dispatch({
        type: FILTER_DISTRICT_FROM_PROVINCE_COLOR,
        payload: res.data,
      });
    })
    .catch(() => {});
};

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
