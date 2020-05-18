import axios from 'axios';
import {
  GET_AUTOMATION_DATA_BY_PARTNER,
  GET_AUTOMATION_DATA_BY_PROVINCE,
  GET_AUTOMATION_DATA_BY_DISTRICT,
  GET_AUTOMATION_DATA_BY_MUNICIPALITY,
  FILTER_AUTOMATION_DATA_FOR_VECTORTILES,
  FILTER_DISTRICT_FROM_PROVINCE_COLOR,
  GET_DISTRICTDATA_BY_PROVINCE,
  GET_MUNICIPALITYDATA_BY_DISTRICT,
  GET_ALLPROVINCENAME_DATA,
  GET_ALLDISTRICTNAME_DATA,
  GET_ALLMUNICIPALITYNAME_DATA,
  FILTER_PARTNERS_SELECT,
  GET_SEARCHED_PARTNERS,
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

export const getProvinceData = () => dispatch => {
  try {
    const response = axiosInstance
      .get(`/api/v1/adminlevel/province/`)
      .then(function(result) {
        console.log(result, 'result');

        return dispatch({
          type: GET_ALLPROVINCENAME_DATA,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const getDistrictData = () => dispatch => {
  try {
    const response = axiosInstance
      .get(`/api/v1/adminlevel/district/`)
      .then(function(result) {
        console.log(result, 'result');

        return dispatch({
          type: GET_ALLDISTRICTNAME_DATA,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const getMunicipalityData = () => dispatch => {
  try {
    const response = axiosInstance
      .get(`/api/v1/adminlevel/municipality/`)
      .then(function(result) {
        console.log(result, 'result');

        return dispatch({
          type: GET_ALLMUNICIPALITYNAME_DATA,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const getDistrictDataFromProvince = provinceId => dispatch => {
  try {
    const response = axiosInstance
      .get(`/api/v1/adminlevel/district/?province_id=${provinceId}`)
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: GET_DISTRICTDATA_BY_PROVINCE,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const getMunicipalityDataFromDistrict = districtId => dispatch => {
  try {
    const response = axiosInstance
      .get(
        `/api/v1/adminlevel/municipality/?district_id=${districtId}`,
      )
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: GET_MUNICIPALITYDATA_BY_DISTRICT,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};

export const filterPartnerSelect = partners => dispatch => {
  if (partners.length === 0) {
    try {
      const response = axiosInstance
        .get(`/api/v1/automation/automation-all/`)
        .then(function(result) {
          // console.log(result, 'result');

          return dispatch({
            type: FILTER_PARTNERS_SELECT,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  } else {
    const query = partners
      .map(data => {
        return `partner=${data}`;
      })
      .join('&');
    console.log(query);
    try {
      const response = axiosInstance
        .get(
          `/api/v1/automation/automation-partner/?filter_type=partner&${query}`,
        )
        .then(function(result) {
          // console.log(result, 'result');

          return dispatch({
            type: FILTER_PARTNERS_SELECT,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  }
};

export const getSearchedPartners = keyword => dispatch => {
  return dispatch({
    type: GET_SEARCHED_PARTNERS,
    payload: keyword,
  });
};
