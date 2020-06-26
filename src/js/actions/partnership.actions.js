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
  FILTER_FINANCIALDATA_OF_DISTRICT_FROM_PROVINCE,
  FILTER_FINANCIALDATA_WITH_ALL_FILTERS,
  GET_DISTRICTDATA_BY_PROVINCE,
  GET_ALLPROVINCENAME_DATA,
  GET_ALLDISTRICTNAME_DATA,
  GET_ALLMUNICIPALITYNAME_DATA,
  GET_SPIDERCHART_DATA,
  GET_SANKEY_CHART_DATA,
  FILTER_SANKEY_CHART_DATA,
  GET_OVERVIEW_DATA,
  FILTER_OVERVIEW_DATA,
  GET_MAP_DATA,
  GET_BARDATA_BY_BENEF_BUDGET,
  FILTER_FINANCIALDATA_OF_MUNICIPALITY_FROM_DISTRICT,
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
        // console.log(result, 'result');

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
        // console.log(result, 'result');

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
export const getBarDataByBenefBudget = selectedDataView => dispatch => {
  const data = selectedDataView;
  // if (data === 'allocated_beneficiary') {
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
    const requestThree = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: '',
        partner_id: [0],
        project_id: [0],
        province_id: [0],
        district_id: [],
        view: 'allocated_budget',
        municipality_id: [],
      },
    );

    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];
          return dispatch({
            type: GET_BARDATA_BY_BENEF_BUDGET,
            payload: {
              selectedDataView,
              totalBeneficiary: responseOne.data,
              femaleBeneficiary: responseTwo.data,
              allocatedBudget: responseThree.data,
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
  // } else {
  //   try {
  //     axiosInstance
  //       .post('/api/v1/partnership/partnership-filter/', {
  //         status: '',
  //         partner_id: [0],
  //         project_id: [0],
  //         province_id: [0],
  //         district_id: [],
  //         view: data,
  //         municipality_id: [],
  //       })
  //       .then(function(result) {
  //         return dispatch({
  //           type: GET_MAP_DATA_BY_PROVINCE,
  //           payload: {
  //             selectedDataView,
  //             allocatedBudget: result.data,
  //           },
  //         });
  //       });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
};
// export const getMapDataByDistrict = selectedDataView => dispatch => {
//   const data = selectedDataView;
//   try {
//     axiosInstance
//       .get('/api/v1/partnership/partnership-filter/', {
//         status: '',
//         partner_id: [0],
//         project_id: [0],
//         province_id: [],
//         district_id: [0],
//         view: data,
//         municipality_id: [],
//       })
//       .then(function(result) {
//         return dispatch({
//           type: GET_MAP_DATA_BY_DISTRICT,
//           payload: result.data,
//         });
//       });
//   } catch (err) {
//     console.error(err);
//   }
// };
// export const getMapDataByMunicipality = selectedDataView => dispatch => {
//   const data = selectedDataView;
//   try {
//     axiosInstance
//       .post('/api/v1/partnership/partnership-filter/', {
//         status: '',
//         partner_id: [0],
//         project_id: [0],
//         province_id: [],
//         district_id: [],
//         view: data,
//         municipality_id: [0],
//       })
//       .then(function(result) {
//         // console.log(result, 'result');

//         return dispatch({
//           type: GET_MAP_DATA_BY_MUNICIPALITY,
//           payload: result.data,
//         });
//       });
//   } catch (err) {
//     console.error(err);
//   }
// };
export const getFilteredMapData = selectedFederalType => dispatch => {
  return dispatch({
    type: GET_FILTERED_MAP_DATA,
    payload: selectedFederalType,
  });
  // let data = selectedInvestmentFocus;
  // if (
  //   selectedInvestmentFocus === undefined ||
  //   selectedInvestmentFocus === []
  // ) {
  //   data = [];
  // }
  // if (selectedFederalType && !selectedViewData) {
  //   return dispatch({
  //     type: GET_FILTERED_MAP_DATA,
  //     payload: { selectedFederalType },
  //   });
  // }
  // // console.log(selectedFederalType, 'federalType');
  // if (selectedFederalType === 'province') {
  //   try {
  //     axiosInstance
  //       .post('/api/v1/partnership/partnership-filter/', {
  //         status: '',
  //         partner_id: [0],
  //         project_id: [0],
  //         province_id: [0],
  //         district_id: [],
  //         view: selectedViewData,
  //         municipality_id: [],
  //       })
  //       .then(function(result) {
  //         // console.log(result, 'result');

  //         return dispatch({
  //           type: GET_FILTERED_MAP_DATA,
  //           payload: result.data,
  //         });
  //       });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // } else if (selectedFederalType === 'district') {
  //   try {
  //     axiosInstance
  //       .post('/api/v1/partnership/partnership-filter/', {
  //         status: '',
  //         partner_id: [0],
  //         project_id: [0],
  //         province_id: [],
  //         district_id: [0],
  //         view: selectedViewData,
  //         municipality_id: [],
  //       })
  //       .then(function(result) {
  //         // console.log(result, 'result');

  //         return dispatch({
  //           type: GET_FILTERED_MAP_DATA,
  //           payload: result.data,
  //         });
  //       });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // } else {
  //   try {
  //     axiosInstance
  //       .post('/api/v1/partnership/partnership-filter/', {
  //         status: '',
  //         partner_id: [0],
  //         project_id: [0],
  //         province_id: [],
  //         district_id: [],
  //         view: selectedViewData,
  //         municipality_id: [0],
  //       })
  //       .then(function(result) {
  //         // console.log(result, 'result');

  //         return dispatch({
  //           type: GET_FILTERED_MAP_DATA,
  //           payload: result.data,
  //         });
  //       });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
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
      .get('/api/v1/partnership/radial/?view=allocated_beneficiary')
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
export const filterRadialData = (
  viewDataBy,
  selectedInvestmentFocus,
  selectedProjectId,
  selectedPartnerType,
  selectedPartnerId,
) => dispatch => {
  // console.log(selectedInvestmentFocus, 'selectedInvestmentFocus');
  // console.log(selectedProjectId, 'selectedProjectId');
  // console.log(selectedPartnerType, 'selectedPartnerType');
  // console.log(selectedPartnerId, 'selectedPartnerId');
  const investmentFilter =
    selectedInvestmentFocus.length > 0
      ? `investment_filter=${selectedInvestmentFocus}`
      : '';
  const projectIdFilter =
    selectedProjectId.length > 0
      ? `project_filter=${selectedProjectId}`
      : '';
  const partnerTypeFilter =
    selectedPartnerType.length > 0
      ? `partner_type_filter=${selectedPartnerType}`
      : '';
  const partnerIdFilter =
    selectedPartnerId.length > 0
      ? `partner_filter=${selectedPartnerId}`
      : '';
  const viewData = viewDataBy ? `view=${viewDataBy}` : '';
  // console.log(query, 'query');
  // let data = selectedInvestmentFocus;
  // if (
  //   selectedInvestmentFocus === undefined ||
  //   selectedInvestmentFocus === []
  // ) {
  //   data = [];
  // }
  if (selectedInvestmentFocus !== undefined || null) {
    const investmentFocus = `${selectedInvestmentFocus}`;
  }
  if (selectedProjectId !== undefined || null) {
    const projectId = selectedProjectId;
  }
  if (selectedPartnerType !== undefined || null) {
    const partnerType = selectedPartnerType;
  }
  if (selectedPartnerId !== undefined || null) {
    const partnerId = selectedPartnerId;
  }
  try {
    axiosInstance
      .get(
        `/api/v1/partnership/radial/?${investmentFilter}&${projectIdFilter}&${partnerTypeFilter}&${partnerIdFilter}&${viewData}`,
      )
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

export const filterFinancialDataOfDistrictFromProvince = (
  selectedDataView,
  provinceIndex,
  selectedPartnerId,
  selectedProjectId,
  selectedStatus,
) => dispatch => {
  // console.log(selectedStatus, 'status');
  // console.log(provinceIndex);
  const data = selectedDataView;
  let partnerId = [];
  let projectId = [];
  let statusSelected = '';
  if (selectedPartnerId.length === 0) {
    partnerId = [0];
  } else {
    partnerId = selectedPartnerId;
  }
  if (selectedProjectId.length === 0) {
    projectId = [0];
  } else {
    projectId = selectedProjectId;
  }
  if (selectedStatus === [] || selectedStatus.length > 1) {
    statusSelected = '';
  } else {
    // eslint-disable-next-line prefer-destructuring
    statusSelected = selectedStatus[0];
  }
  // if (data === 'allocated_beneficiary') {
  // data = ['total_beneficiary', 'female_beneficiary'];

  try {
    const requestOne = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        partner_id: partnerId,
        project_id: projectId,
        province_id: [],
        district_id: provinceIndex,
        view: 'total_beneficiary',
        municipality_id: [],
      },
    );
    const requestTwo = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        partner_id: partnerId,
        project_id: projectId,
        province_id: [],
        district_id: provinceIndex,
        view: 'female_beneficiary',
        municipality_id: [],
      },
    );
    const requestThree = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        partner_id: partnerId,
        project_id: projectId,
        province_id: [],
        district_id: provinceIndex,
        view: 'allocated_budget',
        municipality_id: [],
      },
    );

    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];
          return dispatch({
            type: FILTER_FINANCIALDATA_OF_DISTRICT_FROM_PROVINCE,
            payload: {
              selectedDataView,
              totalBeneficiary: responseOne.data,
              femaleBeneficiary: responseTwo.data,
              allocatedBudget: responseThree.data,
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
  // } else {

  // }
};
export const filterFinancialDataOfMunicipalityFromDistrict = (
  selectedDataView,
  districtIndex,
  selectedPartnerId,
  selectedProjectId,
  selectedStatus,
) => dispatch => {
  // console.log(selectedStatus, 'status');
  // console.log(provinceIndex);
  const data = selectedDataView;
  let partnerId = [];
  let projectId = [];
  let statusSelected = '';
  if (selectedPartnerId.length === 0) {
    partnerId = [0];
  } else {
    partnerId = selectedPartnerId;
  }
  if (selectedProjectId.length === 0) {
    projectId = [0];
  } else {
    projectId = selectedProjectId;
  }
  if (selectedStatus === [] || selectedStatus.length > 1) {
    statusSelected = '';
  } else {
    // eslint-disable-next-line prefer-destructuring
    statusSelected = selectedStatus[0];
  }
  // if (data === 'allocated_beneficiary') {
  // data = ['total_beneficiary', 'female_beneficiary'];

  try {
    const requestOne = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        partner_id: partnerId,
        project_id: projectId,
        province_id: [],
        district_id: [],
        view: 'total_beneficiary',
        municipality_id: districtIndex,
      },
    );
    const requestTwo = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        partner_id: partnerId,
        project_id: projectId,
        province_id: [],
        district_id: [],
        view: 'female_beneficiary',
        municipality_id: districtIndex,
      },
    );
    const requestThree = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        partner_id: partnerId,
        project_id: projectId,
        province_id: [],
        district_id: [],
        view: 'allocated_budget',
        municipality_id: districtIndex,
      },
    );

    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];
          return dispatch({
            type: FILTER_FINANCIALDATA_OF_DISTRICT_FROM_PROVINCE,
            payload: {
              selectedDataView,
              totalBeneficiary: responseOne.data,
              femaleBeneficiary: responseTwo.data,
              allocatedBudget: responseThree.data,
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
  // } else {

  // }
};
// export const filterFinancialDataOfMunicipalityFromDistrict = (
//   selectedDataView,
//   districtIndex,
//   selectedPartnerId,
//   selectedProjectId,
//   selectedStatus,
// ) => dispatch => {
//   // console.log(selectedStatus, 'status');
//   // console.log(provinceIndex);
//   const data = selectedDataView;
//   let partnerId = [];
//   let projectId = [];
//   let statusSelected = '';
//   if (selectedPartnerId.length === 0) {
//     partnerId = [0];
//   } else {
//     partnerId = selectedPartnerId;
//   }
//   if (selectedProjectId.length === 0) {
//     projectId = [0];
//   } else {
//     projectId = selectedProjectId;
//   }
//   if (selectedStatus === [] || selectedStatus.length > 1) {
//     statusSelected = '';
//   } else {
//     // eslint-disable-next-line prefer-destructuring
//     statusSelected = selectedStatus[0];
//   }
//   if (data === 'allocated_beneficiary') {
//     // data = ['total_beneficiary', 'female_beneficiary'];

//     try {
//       const requestOne = axiosInstance.post(
//         '/api/v1/partnership/partnership-filter/',
//         {
//           status: !statusSelected ? '' : statusSelected,
//           partner_id: partnerId,
//           project_id: projectId,
//           province_id: [],
//           district_id: [],
//           view: 'total_beneficiary',
//           municipality_id: districtIndex,
//         },
//       );
//       const requestTwo = axiosInstance.post(
//         '/api/v1/partnership/partnership-filter/',
//         {
//           status: !statusSelected ? '' : statusSelected,
//           partner_id: partnerId,
//           project_id: projectId,
//           province_id: [],
//           district_id: [],
//           view: 'female_beneficiary',
//           municipality_id: districtIndex,
//         },
//       );

//       axios
//         .all([requestOne, requestTwo])
//         .then(
//           axios.spread((...responses) => {
//             const responseOne = responses[0];
//             const responseTwo = responses[1];
//             return dispatch({
//               type: FILTER_FINANCIALDATA_OF_MUNICIPALITY_FROM_DISTRICT,
//               payload: {
//                 selectedDataView,
//                 totalBeneficiary: responseOne.data,
//                 femaleBeneficiary: responseTwo.data,
//               },
//             });
//           }),
//         )
//         .catch(errors => {
//           // react on errors.
//         });
//     } catch (err) {
//       console.error(err);
//     }
//   } else {
//     try {
//       axiosInstance
//         .post('/api/v1/partnership/partnership-filter/', {
//           view: selectedDataView,
//           partner_id: partnerId,
//           project_id: projectId,
//           status: !statusSelected ? '' : statusSelected,
//           province_id: [],
//           district_id: [],
//           municipality_id: districtIndex,
//         })
//         .then(function(result) {
//           return dispatch({
//             type: FILTER_FINANCIALDATA_OF_MUNICIPALITY_FROM_DISTRICT,
//             payload: {
//               selectedDataView,
//               allocatedBudget: result.data,
//             },
//           });
//         });
//     } catch (err) {
//       console.error(err);
//     }
//   }
// };
export const filterFinancialDataWithAllFilters = (
  selectedFederalTypes,
  selectedDataView,
  selectedPartnerId,
  selectedProjectId,
  selectedStatus,
) => dispatch => {
  // console.log(selectedFederalTypes, 'selectedFederalTypes');
  // console.log(selectedDataView, 'selectedDataView');
  // console.log(selectedPartnerId, 'selectedPartnerId');
  // console.log(selectedProjectId, 'selectedProjectId');
  console.log(selectedStatus, 'selectedStatus');
  // debugger;
  let partnerId = [];
  let projectId = [];
  let statusSelected = '';
  const data = selectedDataView;
  if (selectedPartnerId.length === 0) {
    partnerId = [0];
  } else {
    partnerId = selectedPartnerId;
  }
  if (selectedProjectId.length === 0) {
    projectId = [0];
  } else {
    projectId = selectedProjectId;
  }
  if (selectedStatus === [] || selectedStatus.length > 1) {
    statusSelected = '';
  } else {
    // eslint-disable-next-line prefer-destructuring
    statusSelected = selectedStatus[0];
  }
  // if (data === 'allocated_beneficiary') {
  // data = ['total_beneficiary', 'female_beneficiary'];

  try {
    const requestOne = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        view: 'total_beneficiary',
        partner_id: partnerId,
        project_id: projectId,
        province_id: [0],
        district_id: [],
        municipality_id: [],
      },
    );
    const requestTwo = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        view: 'female_beneficiary',
        partner_id: partnerId,
        project_id: projectId,
        province_id: [0],
        district_id: [],
        municipality_id: [],
      },
    );
    const requestThree = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        view: 'allocated_budget',
        partner_id: partnerId,
        project_id: projectId,
        province_id: [0],
        district_id: [],
        municipality_id: [],
      },
    );

    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];
          return dispatch({
            type: FILTER_FINANCIALDATA_WITH_ALL_FILTERS,
            payload: {
              selectedDataView,
              totalBeneficiary: responseOne.data,
              femaleBeneficiary: responseTwo.data,
              allocatedBudget: responseThree.data,
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
  // } else if (selectedDataView === 'allocated_budget') {
  //   try {
  //     axiosInstance
  //       .post('/api/v1/partnership/partnership-filter/', {
  //         view: selectedDataView,
  //         partner_id: partnerId,
  //         project_id: projectId,
  //         status: !statusSelected ? '' : statusSelected,
  //         province_id: [0],
  //         district_id: [],
  //         municipality_id: [],
  //       })
  //       .then(function(result) {
  //         return dispatch({
  //           type: GET_MAP_DATA_BY_PROVINCE,
  //           payload: {
  //             selectedDataView,
  //             allocatedBudget: result.data,
  //           },
  //         });
  //       });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
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
export const getSpiderChartData = () => dispatch => {
  // let data = selectedInvestmentFocus;
  // if (
  //   selectedInvestmentFocus === undefined ||
  //   selectedInvestmentFocus === []
  // ) {
  //   data = [];
  // }
  try {
    axiosInstance
      .get('/api/v1/partnership/radar/')
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: GET_SPIDERCHART_DATA,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const filterSpiderChartData = (
  selectedInvestmentFocus,
  selectedProjectId,
  selectedPartnerType,
  selectedPartnerId,
) => dispatch => {
  const investmentFilter =
    selectedInvestmentFocus.length > 0
      ? `investment_filter=${selectedInvestmentFocus}`
      : '';
  const projectIdFilter =
    selectedProjectId.length > 0
      ? `project_filter=${selectedProjectId}`
      : '';
  const partnerTypeFilter =
    selectedPartnerType.length > 0
      ? `partner_type_filter=${selectedPartnerType}`
      : '';
  const partnerIdFilter =
    selectedPartnerId.length > 0
      ? `partner_filter=${selectedPartnerId}`
      : '';
  // console.log(query, 'query');
  // let data = selectedInvestmentFocus;
  // if (
  //   selectedInvestmentFocus === undefined ||
  //   selectedInvestmentFocus === []
  // ) {
  //   data = [];
  // }
  // if (selectedInvestmentFocus !== undefined || null) {
  //   const investmentFocus = `${selectedInvestmentFocus}`;
  // }
  // if (selectedProjectId !== undefined || null) {
  //   const projectId = selectedProjectId;
  // }
  // if (selectedPartnerType !== undefined || null) {
  //   const partnerType = selectedPartnerType;
  // }
  // if (selectedPartnerId !== undefined || null) {
  //   const partnerId = selectedPartnerId;
  // }
  try {
    axiosInstance
      .get(
        `/api/v1/partnership/radar//?${investmentFilter}&${projectIdFilter}&${partnerTypeFilter}&${partnerIdFilter}`,
      )
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: GET_SPIDERCHART_DATA,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const getSankeyChartData = () => dispatch => {
  // let data = selectedInvestmentFocus;
  // if (
  //   selectedInvestmentFocus === undefined ||
  //   selectedInvestmentFocus === []
  // ) {
  //   data = [];
  // }
  try {
    axiosInstance
      .get('/api/v1/partnership/sankey/')
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: GET_SANKEY_CHART_DATA,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const filterSankeyChartData = (
  selectedInvestmentFocus,
  selectedProjectId,
  selectedPartnerType,
  selectedPartnerId,
) => dispatch => {
  const investmentFilter =
    selectedInvestmentFocus.length > 0
      ? `investment_filter=${selectedInvestmentFocus}`
      : '';
  const projectIdFilter =
    selectedProjectId.length > 0
      ? `project_filter=${selectedProjectId}`
      : '';
  const partnerTypeFilter =
    selectedPartnerType.length > 0
      ? `partner_type_filter=${selectedPartnerType}`
      : '';
  const partnerIdFilter =
    selectedPartnerId.length > 0
      ? `partner_filter=${selectedPartnerId}`
      : '';
  // console.log(investmentFocusSelection, 'investm');
  try {
    axiosInstance
      .get(
        `/api/v1/partnership/sankey/?${investmentFilter}&${projectIdFilter}&${partnerTypeFilter}&${partnerIdFilter}`,
      )
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: FILTER_SANKEY_CHART_DATA,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const getOverviewData = () => dispatch => {
  // console.log(investmentFocusSelection, 'investm');
  try {
    axiosInstance
      .get(`/api/v1/partnership/overview/`)
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: GET_OVERVIEW_DATA,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const filterOverviewData = (
  selectedInvestmentFocus,
  selectedProjectId,
  selectedPartnerType,
  selectedPartnerId,
) => dispatch => {
  const investmentFilter =
    selectedInvestmentFocus.length > 0
      ? `investment_filter=${selectedInvestmentFocus}`
      : '';
  const projectIdFilter =
    selectedProjectId.length > 0
      ? `project_filter=${selectedProjectId}`
      : '';
  const partnerTypeFilter =
    selectedPartnerType.length > 0
      ? `partner_type_filter=${selectedPartnerType}`
      : '';
  const partnerIdFilter =
    selectedPartnerId.length > 0
      ? `partner_filter=${selectedPartnerId}`
      : '';
  // console.log(investmentFocusSelection, 'investm');
  try {
    axiosInstance
      .get(
        `/api/v1/partnership/overview/?${investmentFilter}&${projectIdFilter}&${partnerTypeFilter}&${partnerIdFilter}`,
      )
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: FILTER_OVERVIEW_DATA,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const getMapDataByProvince = () => dispatch => {
  // console.log(investmentFocusSelection, 'investm');
  try {
    axiosInstance
      .get(`/api/v1/partnership/map-data/?province_id=0`)
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: GET_MAP_DATA_BY_PROVINCE,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const getMapDataByDistrict = () => dispatch => {
  // console.log(investmentFocusSelection, 'investm');
  try {
    axiosInstance
      .get(`/api/v1/partnership/map-data/?district_id=0`)
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: GET_MAP_DATA_BY_DISTRICT,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const getMapDataByMunicipality = () => dispatch => {
  // console.log(investmentFocusSelection, 'investm');
  try {
    axiosInstance
      .get(`/api/v1/partnership/map-data/?municipality_id=0`)
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
