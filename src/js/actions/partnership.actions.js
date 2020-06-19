/* eslint-disable consistent-return */
import axios from 'axios';
import {
  GET_PROJECT_LIST_DATA,
  GET_PARTNERSHIP_PARTNERS_LIST,
  GET_PARTNERSHIP_INVESTMENT_FOCUS,
  GET_MAP_DATA_BY_PROVINCE,
  GET_MAP_DATA_BY_DISTRICT,
  GET_MAP_DATA_BY_MUNICIPALITY,
  GET_FILTERED_MAP_DATA,
  GET_RADIAL_DATA,
  FILTER_PARTNERSHIP_PARTNERS_LIST_BY_PARTNER_TYPE,
} from './index.actions';
import axiosInstance from '../axiosApi';

// import { successToast, errorToast } from '../utils/toastHandler';
export const getPartnershipInvestmentFocus = () => dispatch => {
  try {
    axiosInstance
      .get('/api/v1/partnership/partnership-investment/')
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: GET_PARTNERSHIP_INVESTMENT_FOCUS,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const getPartnersList = () => dispatch => {
  try {
    axiosInstance
      .get('/api/v1/partner/partner/')
      .then(function(result) {
        console.log(result, 'result');

        return dispatch({
          type: GET_PARTNERSHIP_PARTNERS_LIST,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const filterPartnerListByPartnerType = partnerType => dispatch => {
  let type = '';
  if (partnerType.length > 0 && partnerType.length < 2) {
    type = partnerType
      .map(data => {
        return `type=${data}`;
      })
      .join('&');
  }
  try {
    axiosInstance
      .get(`/api/v1/partner/partner/?${type}`)
      .then(function(result) {
        console.log(result, 'result');

        return dispatch({
          type: FILTER_PARTNERSHIP_PARTNERS_LIST_BY_PARTNER_TYPE,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const getProjectListData = selectedInvestmentFocus => dispatch => {
  let data = selectedInvestmentFocus;
  if (
    selectedInvestmentFocus === undefined ||
    selectedInvestmentFocus === []
  ) {
    data = [];
  }
  try {
    axiosInstance
      .post('/api/v1/project/project/', { investment_primary: data })
      .then(function(result) {
        return dispatch({
          type: GET_PROJECT_LIST_DATA,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const getMapDataByProvince = selectedDataView => dispatch => {
  const data = selectedDataView;
  if (data === 'allocated_beneficiary') {
    // data = ['total_beneficiary', 'female_beneficiary'];

    try {
      const requestOne = axiosInstance.post(
        '/api/v1/partnership/partnership-filter/',
        {
          status: '',
          partner_id: [0],
          project_id: [0],
          province_id: [0],
          district_id: [],
          view: 'total_beneficiary',
          municipality_id: [],
        },
      );
      const requestTwo = axiosInstance.post(
        '/api/v1/partnership/partnership-filter/',
        {
          status: '',
          partner_id: [0],
          project_id: [0],
          province_id: [0],
          district_id: [],
          view: 'female_beneficiary',
          municipality_id: [],
        },
      );

      axios
        .all([requestOne, requestTwo])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            return dispatch({
              type: GET_MAP_DATA_BY_PROVINCE,
              payload: {
                totalBeneficiary: responseOne.data,
                femaleBeneficiary: responseTwo.data,
              },
            });
          }),
        )
        .catch(errors => {
          // react on errors.
        });
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      axiosInstance
        .post('/api/v1/partnership/partnership-filter/', {
          status: '',
          partner_id: [0],
          project_id: [0],
          province_id: [0],
          district_id: [],
          view: data,
          municipality_id: [],
        })
        .then(function(result) {
          return dispatch({
            type: GET_MAP_DATA_BY_PROVINCE,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  }
};
export const getMapDataByDistrict = selectedDataView => dispatch => {
  const data = selectedDataView;
  try {
    axiosInstance
      .post('/api/v1/partnership/partnership-filter/', {
        status: '',
        partner_id: [0],
        project_id: [0],
        province_id: [],
        district_id: [0],
        view: data,
        municipality_id: [],
      })
      .then(function(result) {
        return dispatch({
          type: GET_MAP_DATA_BY_DISTRICT,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const getMapDataByMunicipality = selectedDataView => dispatch => {
  const data = selectedDataView;
  try {
    axiosInstance
      .post('/api/v1/partnership/partnership-filter/', {
        status: '',
        partner_id: [0],
        project_id: [0],
        province_id: [],
        district_id: [],
        view: data,
        municipality_id: [0],
      })
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: GET_MAP_DATA_BY_MUNICIPALITY,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const getFilteredMapData = (
  selectedFederalType,
  selectedViewData,
) => dispatch => {
  // let data = selectedInvestmentFocus;
  // if (
  //   selectedInvestmentFocus === undefined ||
  //   selectedInvestmentFocus === []
  // ) {
  //   data = [];
  // }
  if (selectedFederalType && !selectedViewData) {
    return dispatch({
      type: GET_FILTERED_MAP_DATA,
      payload: { selectedFederalType },
    });
  }
  console.log(selectedFederalType, 'federalType');
  if (selectedFederalType === 'province') {
    try {
      axiosInstance
        .post('/api/v1/partnership/partnership-filter/', {
          status: '',
          partner_id: [0],
          project_id: [0],
          province_id: [0],
          district_id: [],
          view: selectedViewData,
          municipality_id: [],
        })
        .then(function(result) {
          // console.log(result, 'result');

          return dispatch({
            type: GET_FILTERED_MAP_DATA,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  } else if (selectedFederalType === 'district') {
    try {
      axiosInstance
        .post('/api/v1/partnership/partnership-filter/', {
          status: '',
          partner_id: [0],
          project_id: [0],
          province_id: [],
          district_id: [0],
          view: selectedViewData,
          municipality_id: [],
        })
        .then(function(result) {
          // console.log(result, 'result');

          return dispatch({
            type: GET_FILTERED_MAP_DATA,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      axiosInstance
        .post('/api/v1/partnership/partnership-filter/', {
          status: '',
          partner_id: [0],
          project_id: [0],
          province_id: [],
          district_id: [],
          view: selectedViewData,
          municipality_id: [0],
        })
        .then(function(result) {
          // console.log(result, 'result');

          return dispatch({
            type: GET_FILTERED_MAP_DATA,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  }
};
export const getRadialData = () => dispatch => {
  // let data = selectedInvestmentFocus;
  // if (
  //   selectedInvestmentFocus === undefined ||
  //   selectedInvestmentFocus === []
  // ) {
  //   data = [];
  // }
  try {
    axiosInstance
      .get('/api/v1/partnership/radial/')
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: GET_RADIAL_DATA,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
