import * as actions from './index.actions';
import axiosInstance from '../axiosApi';

export const getProvinceData = () => dispatch => {
  console.log('action called');
  try {
    const formdata = new FormData();
    formdata.append('id', '0');
    const response = axiosInstance
      .post(`/api/v1/adminlevel/province/`, formdata)
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: actions.GET_ALLPROVINCENAME_DATA,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const getDistrictData = () => dispatch => {
  try {
    const formdata = new FormData();
    formdata.append('id', '0');
    const response = axiosInstance({
      method: 'post',
      url: '/api/v1/adminlevel/district/',
      data: formdata,
      // headers: { 'Content-Type': 'multipart/form-data' },
    }).then(function(result) {
      // console.log(result, 'result');

      return dispatch({
        type: actions.GET_ALLDISTRICTNAME_DATA,
        payload: result.data,
      });
    });
  } catch (err) {
    console.error(err);
  }
};

export const getMunicipalityData = () => dispatch => {
  try {
    const formdata = new FormData();
    formdata.append('id', '0');
    const response = axiosInstance
      .post(`/api/v1/adminlevel/municipality/`, formdata)
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: actions.GET_ALLMUNICIPALITYNAME_DATA,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};

export const filterDistrictListFromProvince = provinceId => dispatch => {
  try {
    // console.log(provinceId, 'provinceId');
    const formdata = new FormData();
    if (provinceId.length > 0) {
      provinceId.map(data => {
        // console.log(data, 'data');
        if (data.value !== 'all') {
          return formdata.append('id', `${data.value}`);
        }
        return true;
      });
    } else {
      formdata.append('id', '0');
    }

    const response = axiosInstance
      .post(`/api/v1/adminlevel/district/`, formdata)
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: actions.FILTER_DISTRICTLIST_FROM_PROVINCE,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};

export const filterMunListFromDistrict = districtId => dispatch => {
  try {
    // console.log(districtId, 'districtId');
    const formdata = new FormData();
    if (districtId.length > 0) {
      districtId.map(data => {
        if (data.value !== 'all') {
          return formdata.append('id', `${data.value}`);
        }
        return true;
      });
    } else {
      formdata.append('id', '0');
    }
    // formdata.append('id', '0');
    const response = axiosInstance
      .post(`/api/v1/adminlevel/municipality/`, formdata)
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: actions.FILTER_MUNLIST_FROM_DISTRICT,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
