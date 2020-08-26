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
  FILTER_DISTRICTLIST_FROM_PROVINCE,
  FILTER_MUNLIST_FROM_DISTRICT,
  FILTER_MAPDATA_OF_CIRCLE_MARKER_WITH_VIEW_DATABY,
  GET_LEVERAGE_DATA,
  GET_PARTNERSHIP_ALL_DATA,
  FILTER_MAPDATA_OF_CHOROPLETH_WITH_FEDERAL,
  RESET_BAR_DATA,
  RESET_RADIAL_DATA,
  RESET_SANKEYCHART_DATA,
  RESET_LEVERAGE_DATA,
  FILTER_TIMELINE_DATA,
  FILTER_LEVERAGE_DATA,
  RESET_OVERVIEW_DATA,
  FILTER_LEVERAGE_DATA_FOR_BARCLICK,
  FILTER_BENEFBUDGET_DATA_FOR_BARCLICK,
  GET_BARDATA_BY_INVESTMENTFOCUS,
  FILTER_BARDATA_BY_INVESTMENTFOCUS,
  RESET_BAR_DATA_BY_INVESTMENT_FOCUS,
  FILTER_MAPDATA_CHOROPLETH,
  FILTER_BARDATA_BY_BENEF_BUDGET_WITH_PROVINCE_ONLY,
  GET_PARTNERSHIP_PARTNERSTYPE_LIST,
  GET_PARTNERSHIP_TIMELINE_DATA_API,
  FILTER_RADIAL_DATA,
} from './index.actions';
import axiosInstance from '../axiosApi';
import { districtLists } from '../components/common/adminList';

// import { successToast, errorToast } from '../utils/toastHandler';
export const getPartnershipAllData = () => dispatch => {
  try {
    axiosInstance
      .get('/api/v1/partnership/partnership-all/')
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: GET_PARTNERSHIP_ALL_DATA,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
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

        return dispatch(
          {
            type: GET_PARTNERSHIP_PARTNERS_LIST,
            payload: result.data,
          },
          // {
          //   type: GET_PARTNERSHIP_PARTNERSTYPE_LIST,
          //   payload: result.data,
          // },
        );
      });
  } catch (err) {
    console.error(err);
  }
};
export const getPartnerTypeList = () => dispatch => {
  try {
    axiosInstance
      .get('/api/v1/partner/partner/')
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: GET_PARTNERSHIP_PARTNERSTYPE_LIST,
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
        return dispatch(
          {
            type: GET_PROJECT_LIST_DATA,
            payload: result.data,
          },
          {
            type: GET_LEVERAGE_DATA,
            payload: result.data,
          },
        );
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
        partner_type: [],
        project_id: [0],
        province_id: [0],
        district_id: [],
        view: 'total_beneficiary',
        municipality_id: [],
        investment: [],
        investment_filter: [],
        investment_project: [],
        investment_province: [],
        investment_district: [],
        investment_municipality: [],
      },
    );
    const requestTwo = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: '',
        partner_id: [0],
        partner_type: [],
        project_id: [0],
        province_id: [0],
        district_id: [],
        view: 'female_beneficiary',
        municipality_id: [],
        investment: [],
        investment_filter: [],
        investment_project: [],
        investment_province: [],
        investment_district: [],
        investment_municipality: [],
      },
    );
    const requestThree = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: '',
        partner_id: [0],
        partner_type: [],
        project_id: [0],
        province_id: [0],
        district_id: [],
        view: 'allocated_budget',
        municipality_id: [],
        investment: [],
        investment_filter: [],
        investment_project: [],
        investment_province: [],
        investment_district: [],
        investment_municipality: [],
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
export const getBarDataByInvestmentFocus = selectedDataView => dispatch => {
  const data = selectedDataView;
  // if (data === 'allocated_beneficiary') {
  // data = ['total_beneficiary', 'female_beneficiary'];

  try {
    const requestOne = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: '',
        partner_id: [0],
        partner_type: [],
        project_id: [0],
        province_id: [],
        district_id: [],
        view: 'total_beneficiary',
        municipality_id: [],
        investment: [
          'Automation of MFIs',
          'Channel Innovations',
          'Digital Financial Services',
          'Downscaling and Value Chain Financing By Banks',
          'Increased uptake of microinsurance',
          'Outreach Expansion',
          'Product Innovations',
          'Remittance Based Products',
          'SME Financing',
        ],
        investment_filter: [],
        investment_project: [],
        investment_province: [],
        investment_district: [],
        investment_municipality: [],
      },
    );
    // const requestTwo = axiosInstance.post(
    //   '/api/v1/partnership/partnership-filter/',
    //   {
    //     status: '',
    //     partner_id: [0],
    //     project_id: [0],
    //     province_id: [0],
    //     district_id: [],
    //     view: 'female_beneficiary',
    //     municipality_id: [],
    //     investment: [
    //       'Automation of MFIs',
    //       'Channel Innovations',
    //       'Digital Financial Services',
    //       'Downscaling and Value Chain Financing By Banks',
    //       'Increased uptake of microinsurance',
    //       'Outreach Expansion',
    //       'Product Innovations',
    //       'Remittance Based Products',
    //       'SME Financing',
    //     ],
    //   },
    // );
    const requestThree = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: '',
        partner_id: [0],
        partner_type: [],
        project_id: [0],
        province_id: [],
        district_id: [],
        view: 'allocated_budget',
        municipality_id: [],
        investment: [
          'Automation of MFIs',
          'Channel Innovations',
          'Digital Financial Services',
          'Downscaling and Value Chain Financing By Banks',
          'Increased uptake of microinsurance',
          'Outreach Expansion',
          'Product Innovations',
          'Remittance Based Products',
          'SME Financing',
        ],
        investment_filter: [],
        investment_project: [],
        investment_province: [],
        investment_district: [],
        investment_municipality: [],
      },
    );

    axios
      .all([requestOne, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseThree = responses[1];
          return dispatch({
            type: GET_BARDATA_BY_INVESTMENTFOCUS,
            payload: {
              selectedDataView,
              totalBeneficiary: responseOne.data,
              // femaleBeneficiary: responseTwo.d0ata,
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
export const getRadialData = viewDataBy => dispatch => {
  // let data = selectedInvestmentFocus;
  // if (
  //   selectedInvestmentFocus === undefined ||
  //   selectedInvestmentFocus === []
  // ) {
  //   data = [];
  // }
  try {
    axiosInstance
      .get(`/api/v1/partnership/radial/?view=${viewDataBy}`)
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
  selectedProjectStatus,
  selectedFederalList,
) => dispatch => {
  // console.log(selectedInvestmentFocus, 'selectedInvestmentFocus');
  // console.log(selectedProjectId, 'selectedProjectId');
  // console.log(selectedPartnerType, 'selectedPartnerType');
  // console.log(viewDataBy, 'viewDataBy');
  // console.log(selectedInvestmentFocus, 'selectedInvestmentFocus');
  // console.log(selectedProjectId, 'selectedProjectId');
  // console.log(selectedPartnerType, 'selectedPartnerType');
  // console.log(selectedPartnerId, 'selectedPartnerId');
  // console.log(selectedFederalList, 'selectedFederalList');
  // console.log(selectedProjectStatus, 'selectedFederalList');
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
  const projectStatusFilter =
    selectedProjectStatus.length > 0
      ? `status=${selectedProjectStatus}`
      : [];
  const partnerIdFilter =
    selectedPartnerId.length > 0
      ? `partner_filter=${selectedPartnerId}`
      : '';
  const viewData = viewDataBy
    ? `view=${
        viewDataBy === 'Leverage'
          ? 'allocated_beneficiary'
          : viewDataBy
      }`
    : '';
  const federalFilter =
    selectedFederalList &&
    selectedFederalList.selectedMunicipality &&
    selectedFederalList.selectedMunicipality.length > 0
      ? `municipality_id=${selectedFederalList.selectedMunicipality.map(
          mun => {
            return mun.code;
          },
        )}`
      : selectedFederalList &&
        selectedFederalList.selectedDistrict &&
        selectedFederalList.selectedDistrict.length > 0
      ? `district_id=${selectedFederalList.selectedDistrict.map(
          dist => {
            return dist.code;
          },
        )}`
      : selectedFederalList &&
        selectedFederalList.selectedProvince &&
        selectedFederalList.selectedProvince.length > 0
      ? `province_id=${selectedFederalList.selectedProvince.map(
          prov => {
            return prov.code;
          },
        )}`
      : '';
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
        `/api/v1/partnership/radial/?${investmentFilter}&${projectStatusFilter}&${projectIdFilter}&${partnerTypeFilter}&${partnerIdFilter}&${viewData}&${federalFilter}`,
      )
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: FILTER_RADIAL_DATA,
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
  investmentFocusSelection,
  selectedPartnerType,
  selectedPartnerId,
  selectedProjectId,
  selectedStatus,
) => dispatch => {
  // console.log(selectedStatus, 'status');
  // console.log(provinceIndex);
  const data = selectedDataView;
  let partnerId = [];
  let investmentSelection = [];
  let partnerType = [];
  let projectId = [];
  let statusSelected = '';
  if (investmentFocusSelection.length === 0) {
    investmentSelection = [];
  } else {
    investmentSelection = investmentFocusSelection;
  }
  if (selectedPartnerId.length === 0) {
    partnerId = [0];
  } else {
    partnerId = selectedPartnerId;
  }
  if (selectedPartnerType.length === 0) {
    partnerType = [];
  } else {
    partnerType = selectedPartnerType;
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
        partner_type: partnerType,
        project_id: projectId,
        province_id: [],
        district_id: provinceIndex,
        view: 'total_beneficiary',
        municipality_id: [],
        investment: [],
        investment_filter: investmentSelection,
        investment_project: [],
        investment_province: [],
        investment_district: [],
        investment_municipality: [],
      },
    );
    const requestTwo = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        partner_id: partnerId,
        partner_type: partnerType,
        project_id: projectId,
        province_id: [],
        district_id: provinceIndex,
        view: 'female_beneficiary',
        municipality_id: [],
        investment: [],
        investment_filter: investmentSelection,
        investment_project: [],
        investment_province: [],
        investment_district: [],
        investment_municipality: [],
      },
    );
    const requestThree = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        partner_id: partnerId,
        partner_type: partnerType,
        project_id: projectId,
        province_id: [],
        district_id: provinceIndex,
        view: 'allocated_budget',
        municipality_id: [],
        investment: [],
        investment_filter: investmentSelection,
        investment_project: [],
        investment_province: [],
        investment_district: [],
        investment_municipality: [],
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
  selectedPartnerType,
  selectedPartnerId,
  selectedProjectId,
  selectedStatus,
) => dispatch => {
  // console.log(selectedStatus, 'status');
  // console.log(provinceIndex);
  const data = selectedDataView;
  let partnerId = [];
  let partnerType = [];
  let projectId = [];
  let statusSelected = '';
  if (selectedPartnerId.length === 0) {
    partnerId = [0];
  } else {
    partnerId = selectedPartnerId;
  }
  if (selectedPartnerType.length === 0) {
    partnerType = [];
  } else {
    partnerType = selectedPartnerType;
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
        partner_type: partnerType,
        project_id: projectId,
        province_id: [],
        district_id: [],
        view: 'total_beneficiary',
        municipality_id: districtIndex,
        investment: [],
        investment_filter: [],
        investment_project: [],
        investment_province: [],
        investment_district: [],
        investment_municipality: [],
      },
    );
    const requestTwo = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        partner_id: partnerId,
        project_id: projectId,
        partner_type: partnerType,
        province_id: [],
        district_id: [],
        view: 'female_beneficiary',
        municipality_id: districtIndex,
        investment: [],
        investment_filter: [],
        investment_project: [],
        investment_province: [],
        investment_district: [],
        investment_municipality: [],
      },
    );
    const requestThree = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        partner_id: partnerId,
        partner_type: partnerType,
        project_id: projectId,
        province_id: [],
        district_id: [],
        view: 'allocated_budget',
        municipality_id: districtIndex,
        investment: [],
        investment_filter: [],
        investment_project: [],
        investment_province: [],
        investment_district: [],
        investment_municipality: [],
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
  investmentFocusSelection,
  selectedDataView,
  selectedPartnerType,
  selectedPartnerId,
  selectedProjectId,
  selectedStatus,
) => dispatch => {
  // console.log(selectedFederalTypes, 'selectedFederalTypes');
  // console.log(selectedDataView, 'selectedDataView');
  // console.log(selectedPartnerId, 'selectedPartnerId');
  // console.log(selectedProjectId, 'selectedProjectId');
  // console.log(selectedPartnerType, 'selectedPartner');
  // debugger;
  let partnerId = [];
  let partnerType = [];
  let projectId = [];
  let selectedInvestment = [];
  let statusSelected = '';
  const data = selectedDataView;
  if (selectedPartnerId.length === 0) {
    partnerId = [0];
  } else {
    partnerId = selectedPartnerId;
  }
  if (selectedPartnerType.length === 0) {
    partnerType = [];
  } else {
    partnerType = selectedPartnerType;
  }
  if (selectedProjectId.length === 0) {
    projectId = [0];
  } else {
    projectId = selectedProjectId;
  }
  if (investmentFocusSelection.length === 0) {
    selectedInvestment = [];
  } else {
    selectedInvestment = investmentFocusSelection;
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
        partner_type: partnerType,
        project_id: projectId,
        province_id: [0],
        district_id: [],
        municipality_id: [],
        investment: [],
        investment_filter: selectedInvestment,
        investment_project: [],
        investment_province: [],
        investment_district: [],
        investment_municipality: [],
      },
    );
    const requestTwo = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        view: 'female_beneficiary',
        partner_id: partnerId,
        partner_type: partnerType,
        project_id: projectId,
        province_id: [0],
        district_id: [],
        municipality_id: [],
        investment: [],
        investment_filter: selectedInvestment,
        investment_project: [],
        investment_province: [],
        investment_district: [],
        investment_municipality: [],
      },
    );
    const requestThree = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        view: 'allocated_budget',
        partner_id: partnerId,
        partner_type: partnerType,
        project_id: projectId,
        province_id: [0],
        district_id: [],
        municipality_id: [],
        investment: [],
        investment_filter: selectedInvestment,
        investment_project: [],
        investment_province: [],
        investment_district: [],
        investment_municipality: [],
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
export const filterBarDataByInvestment = (
  selectedFederalTypes,
  selectedDataView,
  selectedPartnerType,
  selectedPartnerId,
  selectedProjectId,
  selectedStatus,
  selectedInvestment,
  selectedFederalList,
) => dispatch => {
  console.log(selectedFederalTypes, 'selectedFederalTypes');
  // console.log(selectedDataView, 'selectedDataView');
  // console.log(selectedPartnerId, 'selectedPartnerId');
  // console.log(selectedProjectId, 'selectedProjectId');
  // console.log(selectedStatus, 'selectedStatus');
  // debugger;
  let partnerId = [];
  let partnerType = [];
  let projectId = [];
  let investmentFocus = [];
  let statusSelected = '';
  const data = selectedDataView;
  if (selectedPartnerId.length === 0) {
    partnerId = [0];
  } else {
    partnerId = selectedPartnerId;
  }
  if (selectedPartnerType.length === 0) {
    partnerType = [];
  } else {
    partnerType = selectedPartnerType;
  }
  if (selectedProjectId.length === 0) {
    projectId = [0];
  } else {
    projectId = selectedProjectId;
  }
  if (selectedInvestment.length === 0) {
    investmentFocus = [
      'Automation of MFIs',
      'Channel Innovations',
      'Digital Financial Services',
      'Downscaling and Value Chain Financing By Banks',
      'Increased uptake of microinsurance',
      'Outreach Expansion',
      'Product Innovations',
      'Remittance Based Products',
      'SME Financing',
    ];
  } else {
    investmentFocus = selectedInvestment;
  }
  if (selectedStatus === [] || selectedStatus.length > 1) {
    statusSelected = '';
  } else {
    // eslint-disable-next-line prefer-destructuring
    statusSelected = selectedStatus[0];
  }
  const munList =
    selectedFederalList &&
    selectedFederalList.selectedMunicipality &&
    selectedFederalList.selectedMunicipality.length > 0
      ? selectedFederalList.selectedMunicipality.map(mun => {
          return mun.code;
        })
      : [];
  const distList =
    selectedFederalList &&
    selectedFederalList.selectedDistrict &&
    selectedFederalList.selectedDistrict.length > 0
      ? selectedFederalList.selectedDistrict.map(dist => {
          return dist.code;
        })
      : [];
  const provList =
    selectedFederalList &&
    selectedFederalList.selectedProvince &&
    selectedFederalList.selectedProvince.length > 0
      ? selectedFederalList.selectedProvince.map(prov => {
          return prov.code;
        })
      : [];
  // if(munList)
  // console.log(federalFilter, 'federalFilter');
  // if (data === 'allocated_beneficiary') {
  // data = ['total_beneficiary', 'female_beneficiary'];

  try {
    const requestOne = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        view: 'total_beneficiary',
        partner_id: partnerId,
        partner_type: partnerType,
        project_id: projectId,
        province_id: [],
        district_id: [],
        municipality_id: [],
        investment: investmentFocus,
        investment_filter: [],
        investment_project: [],
        investment_province: provList,
        investment_district: distList,
        investment_municipality: munList,
      },
    );
    const requestThree = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        view: 'allocated_budget',
        partner_id: partnerId,
        partner_type: partnerType,
        project_id: projectId,
        province_id: [],
        district_id: [],
        municipality_id: [],
        investment: investmentFocus,
        investment_filter: [],
        investment_project: [],
        investment_province: provList,
        investment_district: distList,
        investment_municipality: munList,
      },
    );
    axios
      .all([requestOne, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseThree = responses[1];
          return dispatch({
            type: FILTER_BARDATA_BY_INVESTMENTFOCUS,
            payload: {
              selectedDataView,
              totalBeneficiary: responseOne.data,
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
        `/api/v1/partnership/radar/?${investmentFilter}&${projectIdFilter}&${partnerTypeFilter}&${partnerIdFilter}`,
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
export const getSankeyChartData = selectedView => dispatch => {
  const selected =
    selectedView === 'allocated_budget'
      ? 'allocated_budget'
      : 'total_beneficiary';
  // let data = selectedInvestmentFocus;
  // if (
  //   selectedInvestmentFocus === undefined ||
  //   selectedInvestmentFocus === []
  // ) {
  //   data = [];
  // }
  try {
    axiosInstance
      .get(`/api/v1/partnership/sankey/?view=${selected}`)
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
  selectedViewDataBy,
  selectedInvestmentFocus,
  selectedProjectId,
  selectedPartnerType,
  selectedPartnerId,
  selectedProjectStatus,
  selectedFederalList,
) => dispatch => {
  const selected =
    selectedViewDataBy === 'allocated_budget'
      ? 'allocated_budget'
      : 'total_beneficiary';
  console.log(selectedProjectStatus, 'projectStatus');
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
  const projectStatusFilter =
    selectedProjectStatus.length > 0 &&
    selectedProjectStatus.length < 2
      ? `status=${selectedProjectStatus}`
      : '';
  const federalFilter =
    selectedFederalList &&
    selectedFederalList.selectedMunicipality &&
    selectedFederalList.selectedMunicipality.length > 0
      ? `municipality_id=${selectedFederalList.selectedMunicipality.map(
          mun => {
            return mun.code;
          },
        )}`
      : selectedFederalList &&
        selectedFederalList.selectedDistrict &&
        selectedFederalList.selectedDistrict.length > 0
      ? `district_id=${selectedFederalList.selectedDistrict.map(
          dist => {
            return dist.code;
          },
        )}`
      : selectedFederalList &&
        selectedFederalList.selectedProvince &&
        selectedFederalList.selectedProvince.length > 0
      ? `province_id=${selectedFederalList.selectedProvince.map(
          prov => {
            return prov.code;
          },
        )}`
      : '';
  // console.log(investmentFocusSelection, 'investm');
  try {
    axiosInstance
      .get(
        `/api/v1/partnership/sankey/?view=${selected}&${investmentFilter}&${projectIdFilter}&${projectStatusFilter}&${partnerTypeFilter}&${partnerIdFilter}&${federalFilter}`,
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
  selectedFederalList,
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
  const federalFilter =
    selectedFederalList &&
    selectedFederalList.selectedMunicipality &&
    selectedFederalList.selectedMunicipality.length > 0
      ? `municipality_id=${selectedFederalList.selectedMunicipality.map(
          mun => {
            return mun.code;
          },
        )}`
      : selectedFederalList &&
        selectedFederalList.selectedDistrict &&
        selectedFederalList.selectedDistrict.length > 0
      ? `district_id=${selectedFederalList.selectedDistrict.map(
          dist => {
            return dist.code;
          },
        )}`
      : selectedFederalList &&
        selectedFederalList.selectedProvince &&
        selectedFederalList.selectedProvince.length > 0
      ? `province_id=${selectedFederalList.selectedProvince.map(
          prov => {
            return prov.code;
          },
        )}`
      : '';
  // console.log(investmentFocusSelection, 'investm');
  console.log(
    `/api/v1/partnership/overview/?${investmentFilter}&${projectIdFilter}&${partnerTypeFilter}&${partnerIdFilter}&${federalFilter}`,
    'JSON',
  );
  try {
    axiosInstance
      .get(
        `/api/v1/partnership/overview/?${investmentFilter}&${projectIdFilter}&${partnerTypeFilter}&${partnerIdFilter}&${federalFilter}`,
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
export const filterMapChoropleth = (
  selectedInvestmentFocus,
  selectedProjectId,
  selectedProjectStatus,
  selectedPartnerType,
  selectedPartnerId,
  selectedFederalList,
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
  const projectStatusFilter =
    selectedProjectStatus.length > 0
      ? `status=${selectedProjectStatus}`
      : '';
  const partnerIdFilter =
    selectedPartnerId.length > 0
      ? `partner_filter=${selectedPartnerId}`
      : '';
  const federalFilter =
    selectedFederalList &&
    selectedFederalList.selectedMunicipality &&
    selectedFederalList.selectedMunicipality.length > 0
      ? `municipality_id=${selectedFederalList.selectedMunicipality.map(
          mun => {
            return mun.code;
          },
        )}`
      : selectedFederalList &&
        selectedFederalList.selectedDistrict &&
        selectedFederalList.selectedDistrict.length > 0
      ? `district_id=${selectedFederalList.selectedDistrict.map(
          dist => {
            return dist.code;
          },
        )}`
      : selectedFederalList &&
        selectedFederalList.selectedProvince &&
        selectedFederalList.selectedProvince.length > 0
      ? `province_id=${selectedFederalList.selectedProvince.map(
          prov => {
            return prov.code;
          },
        )}`
      : 'province_id=0';
  // console.log(investmentFocusSelection, 'investm');
  try {
    axiosInstance
      .get(
        `/api/v1/partnership/map-data/?${investmentFilter}&${projectStatusFilter}&${projectIdFilter}&${partnerTypeFilter}&${partnerIdFilter}&${federalFilter}`,
      )
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: FILTER_MAPDATA_CHOROPLETH,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const filterMapDataOfChoroplethByFederal = (
  selectedFederalType,
  selectedFederalList,
) => dispatch => {
  const federalFilter =
    selectedFederalList &&
    selectedFederalList.selectedMunicipality &&
    selectedFederalList.selectedMunicipality.length > 0
      ? `municipality_id=${selectedFederalList.selectedMunicipality.map(
          mun => {
            return mun.code;
          },
        )}`
      : selectedFederalList &&
        selectedFederalList.selectedDistrict &&
        selectedFederalList.selectedDistrict.length > 0
      ? `district_id=${selectedFederalList.selectedDistrict.map(
          dist => {
            return dist.code;
          },
        )}`
      : selectedFederalList &&
        selectedFederalList.selectedProvince &&
        selectedFederalList.selectedProvince.length > 0
      ? `province_id=${selectedFederalList.selectedProvince.map(
          prov => {
            return prov.code;
          },
        )}`
      : '';
  // console.log(investmentFocusSelection, 'investm');
  if (selectedFederalType === 'municipality') {
    try {
      axiosInstance
        .get(
          `/api/v1/partnership/map-data/?municipality_id=${federalFilter}`,
        )
        .then(function(result) {
          // console.log(result, 'result');

          return dispatch({
            type: FILTER_MAPDATA_OF_CHOROPLETH_WITH_FEDERAL,
            payload: result.data,
          });
        });
    } catch (err) {
      console.error(err);
    }
  } else if (selectedFederalType === 'district') {
    try {
      axiosInstance
        .get(
          `/api/v1/partnership/map-data/?district_id=${federalFilter}`,
        )
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
  } else {
    try {
      axiosInstance
        .get(
          `/api/v1/partnership/map-data/?province_id=${federalFilter}`,
        )
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
  }
};
export const getMapDataByProvince = selectedView => dispatch => {
  // console.log(investmentFocusSelection, 'investm');
  const selected = selectedView ? selectedView : 'investment';

  try {
    axiosInstance
      .get(
        `/api/v1/partnership/map-data/?province_id=0&pie=${selected}`,
      )
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
export const getMapDataByDistrict = selectedView => dispatch => {
  const selected = selectedView ? selectedView : 'investment';

  // console.log(investmentFocusSelection, 'investm');
  try {
    axiosInstance
      .get(
        `/api/v1/partnership/map-data/?district_id=0&pie=${selected}`,
      )
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
export const getMapDataByMunicipality = selectedView => dispatch => {
  // console.log(investmentFocusSelection, 'investm');
  const selected = selectedView ? selectedView : 'investment';

  try {
    axiosInstance
      .get(
        `/api/v1/partnership/map-data/?municipality_id=0&pie=${selected}`,
      )
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
export const filterDistrictListFromProvince = provinceId => dispatch => {
  try {
    console.log(provinceId, 'provinceId');
    const formdata = new FormData();
    if (provinceId.length > 0) {
      provinceId.map(data => {
        console.log(data, 'data');
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
      .post(`/api/v1/adminlevel/district/`, formdata)
      .then(function(result) {
        // console.log(result, 'result');

        return dispatch({
          type: FILTER_DISTRICTLIST_FROM_PROVINCE,
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
          type: FILTER_MUNLIST_FROM_DISTRICT,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
export const filterFinancialDataWithAllFiltersAndFederal = (
  selectedFederalTypes,
  investmentFocusSelection,
  selectedDataView,
  selectedPartnerType,
  selectedPartnerId,
  selectedProjectId,
  selectedStatus,
) => dispatch => {
  // debugger;
  const municipality = [];
  const district = [];
  let province = [];
  let partnerId = [];
  let partnerType = [];
  let projectId = [];
  let selectedInvestment = [];
  let statusSelected = '';
  const data = selectedDataView;
  if (selectedPartnerId.length === 0) {
    partnerId = [0];
  } else {
    partnerId = selectedPartnerId;
  }
  if (selectedPartnerType.length === 0) {
    partnerType = [];
  } else {
    partnerType = selectedPartnerType;
  }
  if (selectedProjectId.length === 0) {
    projectId = [0];
  } else {
    projectId = selectedProjectId;
  }
  if (investmentFocusSelection.length === 0) {
    selectedInvestment = [];
  } else {
    selectedInvestment = investmentFocusSelection;
  }
  if (
    selectedStatus === [] ||
    (selectedStatus && selectedStatus.length > 1)
  ) {
    statusSelected = '';
  } else {
    // eslint-disable-next-line prefer-destructuring
    statusSelected = selectedStatus && selectedStatus[0];
  }
  if (
    selectedFederalTypes.selectedMunicipality &&
    selectedFederalTypes.selectedMunicipality.length > 0
  ) {
    selectedFederalTypes.selectedMunicipality.forEach(mun => {
      if (mun.value !== 'all') {
        return municipality.push(mun.value);
      }
    });
  } else if (
    selectedFederalTypes.selectedDistrict &&
    selectedFederalTypes.selectedDistrict.length > 0
  ) {
    selectedFederalTypes.selectedDistrict.forEach(dist => {
      if (dist.value !== 'all') {
        return district.push(dist.value);
      }
    });
  } else if (
    selectedFederalTypes.selectedProvince &&
    selectedFederalTypes.selectedProvince.length > 0
  ) {
    selectedFederalTypes.selectedProvince.forEach(prov => {
      if (prov.value !== 'all') {
        return province.push(prov.value);
      }
    });
  } else {
    province = [0];
  }
  // if (data === 'allocated_beneficiary') {
  // data = ['total_beneficiary', 'female_beneficiary'];
  console.log('applu');

  try {
    const requestOne = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        view: 'total_beneficiary',
        partner_id: partnerId,
        partner_type: partnerType,
        project_id: projectId,
        province_id: province,
        district_id: district,
        municipality_id: municipality,
        investment: [],
        investment_filter: selectedInvestment,
        investment_project: [],
        investment_province: [],
        investment_district: [],
        investment_municipality: [],
      },
    );
    const requestTwo = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        view: 'female_beneficiary',
        partner_id: partnerId,
        partner_type: partnerType,
        project_id: projectId,
        province_id: province,
        district_id: district,
        municipality_id: municipality,
        investment: [],
        investment_filter: selectedInvestment,
        investment_project: [],
        investment_province: [],
        investment_district: [],
        investment_municipality: [],
      },
    );
    const requestThree = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: !statusSelected ? '' : statusSelected,
        view: 'allocated_budget',
        partner_id: partnerId,
        partner_type: partnerType,
        project_id: projectId,
        province_id: province,
        district_id: district,
        municipality_id: municipality,
        investment: [],
        investment_filter: selectedInvestment,
        investment_project: [],
        investment_province: [],
        investment_district: [],
        investment_municipality: [],
      },
    );

    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];
          console.log('test');
          return (
            dispatch({
              type: FILTER_FINANCIALDATA_WITH_ALL_FILTERS,
              payload: {
                selectedDataView,
                totalBeneficiary: responseOne.data,
                femaleBeneficiary: responseTwo.data,
                allocatedBudget: responseThree.data,
              },
            }),
            dispatch({
              type: FILTER_BARDATA_BY_BENEF_BUDGET_WITH_PROVINCE_ONLY,
              payload: {
                selectedDataView,
                totalBeneficiary: responseOne.data,
                femaleBeneficiary: responseTwo.data,
                allocatedBudget: responseThree.data,
              },
            })
          );
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
export const filterMapDataOfCircleMarkerWithViewDataBy = (
  selectedViewDataBy,
  selectedFederalType,
  selectedFederalList,
) => dispatch => {
  // console.log(selectedFederalTypes, 'selectedFederalTypes');
  // console.log(selectedDataView, 'selectedDataView');
  // console.log(selectedPartnerId, 'selectedPartnerId');
  // console.log(selectedProjectId, 'selectedProjectId');
  console.log(selectedViewDataBy, 'selectedStatus');
  console.log(selectedFederalList, 'selectedFederalList');
  const federalFilter =
    selectedFederalList &&
    selectedFederalList.selectedMunicipality &&
    selectedFederalList.selectedMunicipality.length > 0
      ? `municipality_id=${selectedFederalList.selectedMunicipality.map(
          mun => {
            return mun.code;
          },
        )}`
      : selectedFederalList &&
        selectedFederalList.selectedDistrict &&
        selectedFederalList.selectedDistrict.length > 0
      ? `district_id=${selectedFederalList.selectedDistrict.map(
          dist => {
            return dist.code;
          },
        )}`
      : selectedFederalList &&
        selectedFederalList.selectedProvince &&
        selectedFederalList.selectedProvince.length > 0
      ? `province_id=${selectedFederalList.selectedProvince.map(
          prov => {
            return prov.code;
          },
        )}`
      : selectedFederalType === 'province'
      ? 'province_id=0'
      : selectedFederalType === 'district'
      ? 'district_id=0'
      : selectedFederalType === 'municipality'
      ? 'municipality_id=0'
      : 'province_id=0';
  // const selectedView= selecte
  // const federalParam =
  //   selectedFederalType === 'province'
  //     ? 'province_id=1'
  //     : selectedFederalType === 'district'
  //     ? 'district_id=0'
  //     : selectedFederalType === 'municipality'
  //     ? 'municipality_id=0'
  //     : 'province_id=0';
  try {
    axiosInstance
      .get(
        `/api/v1/partnership/map-data/?${federalFilter}&pie=${selectedViewDataBy}`,
      )
      .then(function(result) {
        return dispatch({
          type: FILTER_MAPDATA_OF_CIRCLE_MARKER_WITH_VIEW_DATABY,
          payload: result.data,
        });
      });
  } catch (err) {
    console.error(err);
  }
};
// export const filterMapDataOfCircleMarkerWithViewDataBy = (
//   selectedViewDataBy,
//   selectedFederalType,
// ) => dispatch => {
//   // console.log(selectedFederalTypes, 'selectedFederalTypes');
//   // console.log(selectedDataView, 'selectedDataView');
//   // console.log(selectedPartnerId, 'selectedPartnerId');
//   // console.log(selectedProjectId, 'selectedProjectId');
//   console.log(selectedViewDataBy, 'selectedStatus');
//   const province = selectedFederalType === 'province' ? [0] : [];
//   const district = selectedFederalType === 'district' ? [0] : [];
//   const municipality =
//     selectedFederalType === 'municipality' ? [0] : [];
//   try {
//     axiosInstance
//       .post('/api/v1/partnership/partnership-filter/', {
//         status: '',
//         partner_id: [0],
//         project_id: [0],
//         province_id: province,
//         district_id: district,
//         view: selectedViewDataBy,
//         municipality_id: municipality,
//         investment: [],
//         investment_filter: [],
//         investment_project: [],
//       })
//       .then(function(result) {
//         console.log(result.data, 'filteredData');
//         return dispatch({
//           type: FILTER_MAPDATA_OF_CIRCLE_MARKER_WITH_VIEW_DATABY,
//           payload: result.data,
//         });
//       });
//   } catch (err) {
//     console.error(err);
//   }
// };
export const getLeverageData = () => dispatch => {
  try {
    const requestOne = axiosInstance.get(
      '/api/v1/partnership/partnership-investment/',
    );
    const requestTwo = axiosInstance.post(
      '/api/v1/project/project/',
      { investment_primary: [] },
    );

    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          return dispatch({
            type: GET_LEVERAGE_DATA,
            payload: {
              investmentFocusList: responseOne.data,
              projectList: responseTwo.data,
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
};
export const filterLeverageData = (
  selectedInvestment,
  projectSelection,
) => dispatch => {
  try {
    // const requestOne = axiosInstance.get(
    //   '/api/v1/partnership/partnership-investment/',
    // );
    const requestTwo = axiosInstance.post(
      '/api/v1/project/project/',
      { investment_primary: selectedInvestment },
    );

    axios
      .all([requestTwo])
      .then(
        axios.spread((...responses) => {
          // const responseOne = responses[0];
          const responseTwo = responses[0];
          return dispatch({
            type: FILTER_LEVERAGE_DATA,
            payload: {
              // investmentFocusList: responseOne.data,
              projectList: responseTwo.data,
              projectSelection,
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
};
export const resetBarDatas = () => dispatch => {
  return dispatch({
    type: RESET_BAR_DATA,
  });
};
export const resetRadialData = () => dispatch => {
  return dispatch({
    type: RESET_RADIAL_DATA,
  });
};
export const resetSankeyChartData = () => dispatch => {
  return dispatch({
    type: RESET_SANKEYCHART_DATA,
  });
};
export const resetOverviewData = () => dispatch => {
  return dispatch({
    type: RESET_OVERVIEW_DATA,
  });
};
export const resetLeverageData = () => dispatch => {
  return dispatch({
    type: RESET_LEVERAGE_DATA,
  });
};
export const resetBarDataByInvestmentFocus = () => dispatch => {
  return dispatch({
    type: RESET_BAR_DATA_BY_INVESTMENT_FOCUS,
  });
};
export const filterTimelineData = (min, max, fedtype) => dispatch => {
  return dispatch({
    type: FILTER_TIMELINE_DATA,
    payload: { min, max, fedtype },
  });
};
export const filterLeverageDataForBarClick = data => dispatch => {
  return dispatch({
    type: FILTER_LEVERAGE_DATA_FOR_BARCLICK,
    payload: data,
  });
};
export const filterBenefBudgetDataForBarClick = (
  clicked,
  projectSelection,
) => dispatch => {
  const selectedProject =
    projectSelection.length > 0 ? projectSelection : [0];
  // const data = selectedDataView;
  // if (data === 'allocated_beneficiary') {
  // data = ['total_beneficiary', 'female_beneficiary'];

  try {
    const requestOne = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: '',
        partner_id: [0],
        partner_type: [],
        project_id: selectedProject,
        province_id: [],
        district_id: [],
        view: 'total_beneficiary',
        municipality_id: [],
        investment_project: [clicked],
        investment_filter: [],
        investment: [],
        investment_province: [],
        investment_district: [],
        investment_municipality: [],
      },
    );
    // const requestTwo = axiosInstance.post(
    //   '/api/v1/partnership/partnership-filter/',
    //   {
    //     status: '',
    //     partner_id: [0],
    //     project_id: [0],
    //     province_id: [0],
    //     district_id: [],
    //     view: 'female_beneficiary',
    //     municipality_id: [],
    //     investment: [
    //       'Automation of MFIs',
    //       'Channel Innovations',
    //       'Digital Financial Services',
    //       'Downscaling and Value Chain Financing By Banks',
    //       'Increased uptake of microinsurance',
    //       'Outreach Expansion',
    //       'Product Innovations',
    //       'Remittance Based Products',
    //       'SME Financing',
    //     ],
    //   },
    // );
    const requestThree = axiosInstance.post(
      '/api/v1/partnership/partnership-filter/',
      {
        status: '',
        partner_id: [0],
        partner_type: [],
        project_id: selectedProject,
        province_id: [],
        district_id: [],
        view: 'allocated_budget',
        municipality_id: [],
        investment_project: [clicked],
        investment_filter: [],
        investment: [],
        investment_province: [],
        investment_district: [],
        investment_municipality: [],
      },
    );

    axios
      .all([requestOne, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseThree = responses[1];
          return dispatch({
            type: FILTER_BENEFBUDGET_DATA_FOR_BARCLICK,
            payload: {
              // selectedDataView,
              totalBeneficiary: responseOne.data,
              // femaleBeneficiary: responseTwo.d0ata,
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
};
export const getTimelineData = () => dispatch => {
  try {
    const requestOne = axiosInstance.get(
      '/api/v1/partnership/timeline/?province_id=0',
    );
    const requestTwo = axiosInstance.get(
      '/api/v1/partnership/timeline/?district_id=0',
    );
    const requestThree = axiosInstance.get(
      '/api/v1/partnership/timeline/?municipality_id=0',
    );

    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const provinceTimelineData = responses[0].data;
          const districtTimelineData = responses[1].data;
          const municipalityTimelineData = responses[2].data;
          return dispatch({
            type: GET_PARTNERSHIP_TIMELINE_DATA_API,
            payload: {
              provinceTimelineData,
              districtTimelineData,
              municipalityTimelineData,
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
};
