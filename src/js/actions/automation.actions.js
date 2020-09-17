import axios from 'axios';
import {
  GET_AUTOMATION_DATA_BY_PARTNER,
  GET_AUTOMATION_DATA_BY_MUNICIPALITY,
  AUTOMATION_MUNICIPALITY_LEGEND,
  AUTOMATION_PROVINCE_LEGEND,
  AUTOMATION_DISTRICT_LEGEND,
  FILTER_PARTNERS_SELECT,
  GET_SEARCHED_PARTNERS,
  FILTER_PARTNERS_BY_FEDERAL,
  SELECT_AUTOMATION_DATA_BY_PROVINCE,
  GET_AUTOMATION_BRANCHES_TABLE_DATA_BY_PARTNER,
  GET_AUTOMATION_BRANCHES_TABLE_DATA,
  GET_AUTOMATION_BRANCHES_TABLE_DATA_BY_FEDERAL,
  FILTER_PARTNERS_BY_FEDERAL_WITH_CLICKEDPARTNERS,
  PARTNER_SELECT_WITH_OUTREACH_GET_PARTNER_CHOROPLETHDATA,
  SELECT_AUTOMATION_DATA_BY_DISTRICT,
  SELECT_AUTOMATION_DATA_BY_MUNICIPALITY,
  GET_TIMELINE_DATA,
  TIMELINE_FILTER,
  FILTER_AUTOMATION_BY_PROVINCE,
  GET_AUTOMATION_DATA_FOR_TIMELINE,
} from './index.actions';
import axiosInstance from '../axiosApi';
// import { successToast, errorToast } from '../utils/toastHandler';
export const getAllAutomationDataByPartner = () => dispatch => {
  try {
    const response = axiosInstance
      .get('/api/v1/automation/automation-all/')
      .then(function(result) {
        return dispatch({
          type: GET_AUTOMATION_DATA_BY_PARTNER,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};

export const getAllDataForTimeline = () => dispatch => {
  try {
    const response = axiosInstance
      .get('/api/v1/automation/automation-all/')
      .then(function(result) {
        return dispatch({
          type: GET_AUTOMATION_DATA_FOR_TIMELINE,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};

export const getAutomationDataByMunicipality = () => dispatch => {
  try {
    const response = axiosInstance
      .get('api/v1/automation/map-data/?partner=0&municipality_id=0')
      .then(function(result) {
        return dispatch({
          type: GET_AUTOMATION_DATA_BY_MUNICIPALITY,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};

export const getSearchedPartners = keyword => dispatch => {
  return dispatch({
    type: GET_SEARCHED_PARTNERS,
    payload: keyword,
  });
};

export const filterPartnerSelect = partners => dispatch => {
  if (partners.length === 0) {
    try {
      const response = axiosInstance
        .get(`/api/v1/automation/automation-all/`)
        .then(function(result) {
          return dispatch({
            type: FILTER_PARTNERS_SELECT,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  } else {
    const queryNew = `partner=${partners}`;
    try {
      const response = axiosInstance
        .get(
          `/api/v1/automation/automation-partner/?filter_type=partner&${queryNew}`,
        )
        .then(function(result) {
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

export const getFilteredPartnersByFederal = federalSelect => dispatch => {
  const provinceSelect = `province=${federalSelect.province}`;
  const districtSelect = `district=${federalSelect.district}`;
  const municipalitySelect = `municipality=${federalSelect.municipality}`;
  // const provinceSelect = federalSelect.province
  //   .map(data => {
  //     return `province=${data}`;
  //   })
  //   .join('&');

  // const districtSelect = federalSelect.district
  //   .map(data => {
  //     return `district=${data}`;
  //   })
  //   .join('&');

  // const municipalitySelect = federalSelect.municipality
  //   .map(data => {
  //     return `municipality=${data}`;
  //   })
  //   .join('&');

  if (federalSelect.municipality.length > 0) {
    try {
      const response = axiosInstance
        .get(
          `api/v1/automation/automation-partner/?filter_type=fed&${municipalitySelect}`,
        )
        .then(function(result) {
          return dispatch({
            type: FILTER_PARTNERS_BY_FEDERAL,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  } else if (federalSelect.district.length > 0) {
    try {
      const response = axiosInstance
        .get(
          `api/v1/automation/automation-partner/?filter_type=fed&${districtSelect}`,
        )
        .then(function(result) {
          return dispatch({
            type: FILTER_PARTNERS_BY_FEDERAL,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  } else if (federalSelect.province.length > 0) {
    try {
      const response = axiosInstance
        .get(
          `api/v1/automation/automation-partner/?filter_type=fed&${provinceSelect}`,
        )
        .then(function(result) {
          return dispatch({
            type: FILTER_PARTNERS_BY_FEDERAL,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      const response = axiosInstance
        .get(
          `api/v1/automation/automation-partner/?filter_type=fed&province=1&province=2&province=3&province=4&province=5&province=6&province=7`,
          // `api/v1/automation/automation-partner/?filter_type=fed&province=0,`,
        )
        .then(function(result) {
          return dispatch({
            type: FILTER_PARTNERS_BY_FEDERAL,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  }
};
// added w in this function

export const getFilteredPartnersByFederalWithClickedPartnersw = (
  federalSelect,
  clickedPartner,
) => dispatch => {
  let partnerSelect = 'partner=0';
  if (clickedPartner.length > 0) {
    // partnerSelect = clickedPartner
    //   .map(data => {
    //     return `partner=${data}`;
    //   })
    //   .join('&');
    partnerSelect = `partner=${clickedPartner}`;
  }
  // const provinceSelect = federalSelect.province
  //   .map(data => {
  //     return `province=${data}`;
  //   })
  //   .join('&');
  // const districtSelect = federalSelect.district
  //   .map(data => {
  //     return `district=${data}`;
  //   })
  //   .join('&');
  // const municipalitySelect = federalSelect.municipality
  //   .map(data => {
  //     return `municipality=${data}`;
  //   })
  //   .join('&');

  const provinceSelect = `province=${federalSelect.province}`;
  const districtSelect = `district=${federalSelect.district}`;
  const municipalitySelect = `municipality=${federalSelect.municipality}`;
  if (federalSelect.municipality.length > 0) {
    try {
      const response = axiosInstance
        .get(
          // `api/v1/automation/automation-data/?province_id=2&partner__partner__id=12`,
          `/api/v1/automation/automation-partner/?filter_type=partner&${partnerSelect}&${municipalitySelect}`,
        )
        .then(function(result) {
          return dispatch({
            type: FILTER_PARTNERS_BY_FEDERAL_WITH_CLICKEDPARTNERS,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  } else if (federalSelect.district.length > 0) {
    try {
      const response = axiosInstance
        .get(
          `/api/v1/automation/automation-partner/?filter_type=partner&${partnerSelect}&${districtSelect}`,
        )
        .then(function(result) {
          return dispatch({
            type: FILTER_PARTNERS_BY_FEDERAL_WITH_CLICKEDPARTNERS,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      const response = axiosInstance
        .get(
          `/api/v1/automation/automation-partner/?filter_type=partner&${partnerSelect}&${provinceSelect}`,
        )
        .then(function(result) {
          return dispatch({
            type: FILTER_PARTNERS_BY_FEDERAL_WITH_CLICKEDPARTNERS,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  }
};

export const getTableDataByPartnerSelect = clickedPartner => dispatch => {
  try {
    let query = '';
    if (clickedPartner.length > 0) {
      query = `partner=${clickedPartner}`;
    } else {
      query = '';
    }

    const response = axiosInstance
      .get(`api/v1/automation/table-data/?${query}`)
      .then(function(result) {
        return dispatch({
          type: GET_AUTOMATION_BRANCHES_TABLE_DATA_BY_PARTNER,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};

export const getBranchesTableData = statelevel => dispatch => {
  if (statelevel === 'province') {
    try {
      const response = axiosInstance
        .get(`api/v1/automation/table-data/`)
        .then(function(result) {
          return dispatch({
            type: GET_AUTOMATION_BRANCHES_TABLE_DATA,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  } else if (statelevel === 'district') {
    try {
      const response = axiosInstance
        .get(`api/v1/automation/table-data/`)
        .then(function(result) {
          return dispatch({
            type: GET_AUTOMATION_BRANCHES_TABLE_DATA,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      const response = axiosInstance
        .get(`api/v1/automation/table-data/`)
        .then(function(result) {
          return dispatch({
            type: GET_AUTOMATION_BRANCHES_TABLE_DATA,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  }
};
export const partnerSelectWithOutreach = (
  selectedPartner,
  selectedState,
) => dispatch => {
  let query = 'partner=0';
  if (selectedPartner.length > 0) {
    query = `partner=${selectedPartner}`;
  } else {
    query = 'partner=0';
  }
  if (selectedState === 'province') {
    try {
      const response = axiosInstance
        .get(`api/v1/automation/map-data/?${query}&province_id=0`)
        .then(function(result) {
          return dispatch({
            type: PARTNER_SELECT_WITH_OUTREACH_GET_PARTNER_CHOROPLETHDATA,
            payload: {
              selectedFed: 'province',
              selectedPartner,
              result: result.data,
            },
          });
        });
    } catch (err) {
      console.error(err);
    }
  } else if (selectedState === 'district') {
    try {
      const response = axiosInstance
        .get(`api/v1/automation/map-data/?${query}&district_id=0`)
        .then(function(result) {
          return dispatch({
            type: PARTNER_SELECT_WITH_OUTREACH_GET_PARTNER_CHOROPLETHDATA,
            payload: {
              selectedFed: 'district',
              selectedPartner,
              result: result.data,
            },
          });
        });
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      const response = axiosInstance
        .get(`api/v1/automation/map-data/?${query}&municipality_id=0`)
        .then(function(result) {
          return dispatch({
            type: PARTNER_SELECT_WITH_OUTREACH_GET_PARTNER_CHOROPLETHDATA,
            payload: {
              selectedFed: 'municipality',
              selectedPartner,
              result: result.data,
            },
          });
        });
    } catch (err) {
      console.error(err);
    }
  }
};

export const getBranchesTableDataByFed = (
  federalSelect,
  partnerSelect,
) => dispatch => {
  let partners = '';
  let provinceSelect = 'province_id=0';
  let districtSelect = 'district_id=0';
  let municipalitySelect = 'municipality_id=0';
  if (partnerSelect.length > 0) {
    partners = `partner=${partnerSelect}`;
  }
  if (federalSelect.province.length > 0) {
    provinceSelect = `province_id=${federalSelect.province}`;
    // })
    // .join('&');
  }
  if (federalSelect.district.length > 0) {
    districtSelect = `district_id=${federalSelect.district}`;
  }
  if (federalSelect.municipality.length > 0) {
    municipalitySelect = `municipality_id=${federalSelect.municipality}`;
  }
  if (federalSelect.municipality.length > 0) {
    try {
      const response = axiosInstance
        .get(
          `api/v1/automation/table-data/?${partners}&${municipalitySelect}`,
        )
        .then(function(result) {
          return dispatch({
            type: GET_AUTOMATION_BRANCHES_TABLE_DATA_BY_FEDERAL,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  } else if (federalSelect.district.length > 0) {
    try {
      const response = axiosInstance
        .get(
          `api/v1/automation/table-data/?${partners}&${districtSelect}`,
        )
        .then(function(result) {
          return dispatch({
            type: GET_AUTOMATION_BRANCHES_TABLE_DATA_BY_FEDERAL,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  } else if (federalSelect.province.length > 0) {
    try {
      const response = axiosInstance
        .get(
          `api/v1/automation/table-data/?${partners}&${provinceSelect}`,
        )
        .then(function(result) {
          return dispatch({
            type: GET_AUTOMATION_BRANCHES_TABLE_DATA_BY_FEDERAL,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      const response = axiosInstance
        .get(
          `api/v1/automation/table-data/?${partners}&province_id=0`,
        )
        .then(function(result) {
          return dispatch({
            type: GET_AUTOMATION_BRANCHES_TABLE_DATA_BY_FEDERAL,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  }
};

export const selectChoroplethDataOfProvince = () => dispatch => {
  return dispatch({
    type: SELECT_AUTOMATION_DATA_BY_PROVINCE,
  });
};

export const selectChoroplethDataOfMunicipality = () => dispatch => {
  return dispatch({
    type: SELECT_AUTOMATION_DATA_BY_MUNICIPALITY,
  });
};
export const getTimelineData = () => dispatch => {
  try {
    const response = axiosInstance
      .get(`api/v1/automation/timeline/`)
      .then(function(result) {
        return dispatch({
          type: GET_TIMELINE_DATA,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const filterTimeline = (min, max) => dispatch => {
  return dispatch({
    type: TIMELINE_FILTER,
    payload: { min, max },
  });
};

export const setLegendValues = () => dispatch => {
  try {
    axiosInstance
      .get(`api/v1/automation/map-data/?partner=0&province_id=0`)
      .then(function(result) {
        return dispatch({
          type: AUTOMATION_PROVINCE_LEGEND,
          payload: {
            result: result.data,
          },
        });
      });
  } catch (err) {
    console.error(err);
  }

  try {
    axiosInstance
      .get(`api/v1/automation/map-data/?partner=0&district_id=0`)
      .then(function(result) {
        return dispatch({
          type: AUTOMATION_DISTRICT_LEGEND,
          payload: {
            result: result.data,
          },
        });
      });
  } catch (err) {
    console.error(err);
  }

  try {
    axiosInstance
      .get(`api/v1/automation/map-data/?partner=0&municipality_id=0`)
      .then(function(result) {
        return dispatch({
          type: AUTOMATION_MUNICIPALITY_LEGEND,
          payload: {
            result: result.data,
          },
        });
      });
  } catch (err) {
    console.error(err);
  }
};
