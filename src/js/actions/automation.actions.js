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
  FILTER_PARTNERS_BY_FEDERAL,
  GET_TABLE_DATA_BY_PARTNERS_SELECT,
  GET_AUTOMATION_BRANCHES_TABLE_DATA_BY_PARTNER,
  GET_AUTOMATION_BRANCHES_TABLE_DATA,
  GET_AUTOMATION_BRANCHES_TABLE_DATA_BY_FEDERAL,
  FILTER_PARTNERS_BY_FEDERAL_WITH_CLICKEDPARTNERS,
  PARTNER_SELECT_WITH_OUTREACH_GET_PARTNER_CHOROPLETHDATA,
  SELECT_AUTOMATION_DATA_BY_PROVINCE,
  SELECT_AUTOMATION_DATA_BY_DISTRICT,
  SELECT_AUTOMATION_DATA_BY_MUNICIPALITY,
  GET_TIMELINE_DATA,
  TIMELINE_FILTER,
  FILTER_AUTOMATION_BY_PROVINCE,
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
      .get('api/v1/automation/map-data/?partner=0&province_id=0')
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
    // console.log('e');
  }
};

export const getAutomationDataByDistrict = () => dispatch => {
  try {
    const response = axiosInstance
      .get('api/v1/automation/map-data/?partner=0&district_id=0')
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
  try {
    const response = axiosInstance
      .get('api/v1/automation/map-data/?partner=0&municipality_id=0')
      .then(function(result) {
        // console.log(result, 'result');
        return dispatch({
          type: GET_AUTOMATION_DATA_BY_MUNICIPALITY,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
  // const token = localStorage.getItem('userToken');
  // axios
  //   .get(
  //     `${process.env.PUBLIC_URL}/api/v1/adminlevel/municipality/`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     },
  //   )
  //   .then(res => {
  //     dispatch({
  //       type: GET_AUTOMATION_DATA_BY_MUNICIPALITY,
  //       payload: res.data,
  //     });
  //   })
  //   .catch(() => {});
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
      `${process.env.PUBLIC_URL}/api/v1/automation/map-data/?partner=0&municipality_id=${dataCode}
      `,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(res => {
      // console.log(res.data, 'datacolorfilter');
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
    const formdata = new FormData();
    formdata.append('id', '0');
    const response = axiosInstance
      .post(`/api/v1/adminlevel/province/`, formdata)
      .then(function(result) {
        // console.log(result, 'result');

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
    const formdata = new FormData();
    formdata.append('id', '0');
    const response = axiosInstance
      .post(`/api/v1/adminlevel/municipality/`, formdata)
      .then(function(result) {
        // console.log(result, 'result');

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
    const formdata = new FormData();
    provinceId.map(data => {
      return formdata.append('id', `${data}`);
    });
    formdata.append('id', '0');
    const response = axiosInstance
      .post(`/api/v1/adminlevel/district/`, formdata)
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
    const formdata = new FormData();
    districtId.map(data => {
      return formdata.append('id', `${data}`);
    });
    const response = axiosInstance
      .post(`/api/v1/adminlevel/municipality/`, formdata)
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
    // console.log(query);
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

export const getFilteredPartnersByFederal = federalSelect => dispatch => {
  const provinceSelect = federalSelect.province
    .map(data => {
      return `province=${data}`;
    })
    .join('&');
  const districtSelect = federalSelect.district
    .map(data => {
      return `district=${data}`;
    })
    .join('&');
  const municipalitySelect = federalSelect.municipality
    .map(data => {
      return `municipality=${data}`;
    })
    .join('&');
  // console.log(federalSelect, 'fedSelect');
  // console.log(provinceSelect, 'prov');
  // console.log(districtSelect, 'dist');
  // console.log(municipalitySelect, 'munic');
  if (federalSelect.municipality.length > 0) {
    try {
      const response = axiosInstance
        .get(
          `api/v1/automation/automation-partner/?filter_type=fed&${municipalitySelect}`,
        )
        .then(function(result) {
          // console.log(result, 'result');

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
          // console.log(result, 'result');

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
          // console.log(result, 'result');

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
          // console.log(result, 'result');

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
export const getFilteredPartnersByFederalWithClickedPartners = (
  federalSelect,
  clickedPartner,
) => dispatch => {
  let partnerSelect = 'partner=0';
  if (clickedPartner.length > 0) {
    partnerSelect = clickedPartner
      .map(data => {
        return `partner=${data}`;
      })
      .join('&');
  }
  const provinceSelect = federalSelect.province
    .map(data => {
      return `province=${data}`;
    })
    .join('&');
  const districtSelect = federalSelect.district
    .map(data => {
      return `district=${data}`;
    })
    .join('&');
  const municipalitySelect = federalSelect.municipality
    .map(data => {
      return `municipality=${data}`;
    })
    .join('&');
  // console.log(federalSelect, 'fedSelect');
  // console.log(provinceSelect, 'prov');
  // console.log(districtSelect, 'dist');
  // console.log(municipalitySelect, 'munic');
  if (federalSelect.municipality.length > 0) {
    try {
      const response = axiosInstance
        .get(
          // `api/v1/automation/automation-data/?province_id=2&partner__partner__id=12`,
          `/api/v1/automation/automation-partner/?filter_type=partner&${partnerSelect}&${municipalitySelect}`,
        )
        .then(function(result) {
          // console.log(result, 'result');

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
          // console.log(result, 'result');

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
          // console.log(result, 'result');

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
        // console.log(result, 'result');
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
          // console.log(result, 'result');
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
          // console.log(result, 'result');
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
          // console.log(result, 'result');
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
  console.log('seleced Partner in parent Select', selectedPartner);
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
          // console.log(result, 'result');
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
          // console.log(result, 'result');
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
          // console.log(result, 'result');
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
  // console.log(federalSelect, 'fedselect');
  console.log(partnerSelect, 'partnersekle');
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
  // console.log(federalSelect, 'fedSelect');
  // console.log(provinceSelect, 'prov');
  // console.log(districtSelect, 'dist');
  // console.log(municipalitySelect, 'munic');
  if (federalSelect.municipality.length > 0) {
    try {
      const response = axiosInstance
        .get(
          `api/v1/automation/table-data/?${partners}&${municipalitySelect}`,
        )
        .then(function(result) {
          // console.log(result, 'result');

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
          // console.log(result, 'result');

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
          // console.log(result, 'result');

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
          // console.log(result, 'result');

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
export const selectChoroplethDataOfDistrict = () => dispatch => {
  return dispatch({
    type: SELECT_AUTOMATION_DATA_BY_DISTRICT,
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
        // console.log(result, 'result');
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

export const filterAutomationByState = () => dispatch => {
  try {
    const response = axiosInstance
      .get(
        `api/v1/automation/table-data/?partner=32,16&province_id=1`,
      )
      .then(function(result) {
        // console.log(result, 'result');
        return dispatch({
          type: FILTER_AUTOMATION_BY_PROVINCE,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
