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
  GET_AUTOMATION_BRANCHES_TABLE_DATA,
  GET_AUTOMATION_BRANCHES_TABLE_DATA_BY_FEDERAL,
  FILTER_PARTNERS_BY_FEDERAL_WITH_CLICKEDPARTNERS,
  PARTNER_SELECT_WITH_OUTREACH_GET_PARTNER_CHOROPLETHDATA,
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
    // console.log('e');
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
  try {
    const response = axiosInstance
      .get('api/v1/automation/automation-data/')
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
      `${process.env.PUBLIC_URL}/api/v1/automation/automation-data/?province_id=${dataCode}
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
    const response = axiosInstance
      .get(`/api/v1/adminlevel/province/`)
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
    const response = axiosInstance
      .get(`/api/v1/adminlevel/district/`)
      .then(function(result) {
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
    const response = axiosInstance
      .get(`/api/v1/adminlevel/municipality/`)
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
    const query = provinceId
      .map(data => {
        return `province_id=${data}`;
      })
      .join('&');
    const response = axiosInstance
      .get(`/api/v1/adminlevel/district/?${query}`)
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
    const query = districtId
      .map(data => {
        return `district_id=${data}`;
      })
      .join('&');
    const response = axiosInstance
      .get(`/api/v1/adminlevel/municipality/?${query}`)
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
  } else {
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
  }
};
export const getFilteredPartnersByFederalWithClickedPartners = (
  federalSelect,
  clickedPartner,
) => dispatch => {
  const partnerSelect = clickedPartner
    .map(data => {
      return `partner__partner__id=${data}`;
    })
    .join('&');
  const provinceSelect = federalSelect.province
    .map(data => {
      return `province_id=${data}`;
    })
    .join('&');
  const districtSelect = federalSelect.district
    .map(data => {
      return `district_id=${data}`;
    })
    .join('&');
  const municipalitySelect = federalSelect.municipality
    .map(data => {
      return `municipality_id=${data}`;
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
          `api/v1/automation/automation-data/?${municipalitySelect}&${partnerSelect}`,
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
          `api/v1/automation/automation-data/?${districtSelect}&${partnerSelect}`,
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
          `api/v1/automation/automation-data/?${provinceSelect}&${partnerSelect}`,
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
    const query = clickedPartner
      .map(data => {
        return `partner_id=${data}`;
      })
      .join('&');

    const response = axiosInstance
      .get(`api/v1/automation/automation-data/?${query}`)
      .then(function(result) {
        // console.log(result, 'result');
        return dispatch({
          type: GET_TABLE_DATA_BY_PARTNERS_SELECT,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const getBranchesTableData = () => dispatch => {
  try {
    const response = axiosInstance
      .get(`api/v1/automation/automation-data/`)
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
};
export const partnerSelectWithOutreach = selectedPartner => dispatch => {
  try {
    const query = selectedPartner
      .map(data => {
        return `partner__partner__id=${data}`;
      })
      .join('&');
    const response = axiosInstance
      .get(`api/v1/automation/automation-data/?${query}`)
      .then(function(result) {
        // console.log(result, 'result');
        return dispatch({
          type: PARTNER_SELECT_WITH_OUTREACH_GET_PARTNER_CHOROPLETHDATA,
          payload: { selectedPartner, result: result.data },
        });
      });
  } catch (err) {
    console.error(err);
  }
};
// export const getBranchesTableDataByMunicipality = clickedMunicipality => dispatch => {
//   try {
//     const query = clickedMunicipality
//       .map(data => {
//         return `municipality_id=${data}`;
//       })
//       .join('&');
//     const response = axiosInstance
//       .get(`api/v1/automation/automation-data/?${query}`)
//       .then(function(result) {
//         return dispatch({
//           type: GET_AUTOMATION_BRANCHES_TABLE_DATA_BY_MUNICIPALITY,
//           payload: result.data,
//         });
//       });
//   } catch (err) {
//     console.error(err);
//   }
// };

export const getBranchesTableDataByFed = federalSelect => dispatch => {
  const provinceSelect = federalSelect.province
    .map(data => {
      return `province_id=${data}`;
    })
    .join('&');
  const districtSelect = federalSelect.district
    .map(data => {
      return `district_id=${data}`;
    })
    .join('&');
  const municipalitySelect = federalSelect.municipality
    .map(data => {
      return `municipality_id=${data}`;
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
          `api/v1/automation/automation-data/?${municipalitySelect}`,
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
        .get(`api/v1/automation/automation-data/?${districtSelect}`)
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
        .get(`api/v1/automation/automation-data/?${provinceSelect}`)
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
