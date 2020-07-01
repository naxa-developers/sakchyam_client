import {
  GET_PROJECT_LIST_DATA,
  GET_PARTNERSHIP_INVESTMENT_FOCUS,
  GET_BARDATA_BY_BENEF_BUDGET,
  GET_MAP_DATA_BY_PROVINCE,
  GET_MAP_DATA_BY_DISTRICT,
  GET_MAP_DATA_BY_MUNICIPALITY,
  GET_FILTERED_MAP_DATA,
  GET_RADIAL_DATA,
  GET_PARTNERSHIP_PARTNERS_LIST,
  FILTER_PARTNERSHIP_PARTNERS_LIST_BY_PARTNER_TYPE,
  FILTER_FINANCIALDATA_OF_DISTRICT_FROM_PROVINCE,
  FILTER_FINANCIALDATA_WITH_ALL_FILTERS,
  GET_ALLPROVINCENAME_DATA,
  GET_ALLDISTRICTNAME_DATA,
  GET_ALLMUNICIPALITYNAME_DATA,
  GET_SPIDERCHART_DATA,
  GET_SANKEY_CHART_DATA,
  FILTER_SANKEY_CHART_DATA,
  GET_OVERVIEW_DATA,
  FILTER_OVERVIEW_DATA,
  GET_MAP_DATA,
  FILTER_FINANCIALDATA_OF_MUNICIPALITY_FROM_DISTRICT,
  FILTER_DISTRICTLIST_FROM_PROVINCE,
  FILTER_MUNLIST_FROM_DISTRICT,
  FILTER_MAPDATA_OF_CIRCLE_MARKER_WITH_VIEW_DATABY,
  GET_LEVERAGE_DATA,
} from '../actions/index.actions';

const initialState = {
  isDataFetched: false,
  partnershipInvestmentFocus: [],
  partnersList: [],
  projectLists: [],
  mapDataByProvince: [],
  mapDataByDistrict: [],
  filteredMapData: [],
  mapDataForCircleMarker: [],
  mapDataByMunicipality: [],
  radialData: [],
  spiderChartData: [],
  sankeyChartData: {},
  filteredPartnerList: [],
  barDatas: [],
  allProvinceList: [],
  allDistrictList: [],
  allMunicipalityList: [],
  overviewData: [],
  barDataByLeverage: [],
};

// {
//   name: 'PRODUCT A',
//   data: [44, 55, 41, 67, 22, 43],
// },
// {
//   name: 'PRODUCT B',
//   data: [13, 23, 20, 8, 13, 27],
// },
// {
//   name: 'PRODUCT C',
//   data: [11, 17, 15, 15, 21, 14],
// },
// {
//   name: 'PRODUCT D',
//   data: [21, 7, 25, 13, 22, 8],
// },

const filterBeneficiaryBarChart = datas => {
  const barLabels = datas.map(label => {
    return label.name.replace('Province', '');
  });
  const maleBeneficiary = datas.map(data => {
    return data.total_beneficiary;
  });
  const femaleBeneficiary = datas.map(data => {
    return data.female_beneficiary;
  });
  const finaleMaleBeneficiary = {
    name: 'Male Beneficiary',
    type: 'column',
    data: maleBeneficiary,
  };
  const finaleFemaleBeneficiary = {
    name: 'Female Beneficiary',
    type: 'column',
    data: femaleBeneficiary,
  };
  return {
    labels: barLabels,
    series: [finaleMaleBeneficiary, finaleFemaleBeneficiary],
  };
};
const filterBudgetBarChart = datas => {
  const barLabels = datas.map(label => {
    return label.name.replace('Province', '');
  });
  const totalBeneficiary = datas.map(data => {
    return Math.round(data.allocated_budget);
  });
  const finaleTotalBudget = {
    name: 'Total Budget',
    type: 'line',
    data: totalBeneficiary,
  };
  return {
    labels: barLabels,
    series: [finaleTotalBudget],
  };
};
const filterLeverageChart = datas => {
  console.log(datas, 'datas');
  // const ages = datas.projectList.reduce(
  //   // eslint-disable-next-line
  //   (a, { investment_primary, leverage }) => (
  //     // eslint-disable-next-line no-param-reassign
  //     (a[investment_primary] =
  //       // eslint-disable-next-line no-sequences
  //       (a[investment_primary] || 0) + +leverage),
  //     a
  //   ),
  //   {},
  // );
  // console.log(ages);
  const summedScfFund = datas.projectList.reduce((a, c) => {
    const filtered = a.filter(
      el => el.investment_primary === c.investment_primary,
    );
    if (filtered.length > 0) {
      // eslint-disable-next-line no-param-reassign
      a[a.indexOf(filtered[0])].scf_funds += +c.scf_funds;
    } else {
      a.push(c);
    }
    return a;
  }, []);
  const summedLeverage = datas.projectList.reduce((a, c) => {
    const filtered = a.filter(
      el => el.investment_primary === c.investment_primary,
    );
    if (filtered.length > 0) {
      // eslint-disable-next-line no-param-reassign
      a[a.indexOf(filtered[0])].leverage += +c.leverage;
    } else {
      a.push(c);
    }
    return a;
  }, []);

  console.log(summedScfFund, 'scf');
  console.log(summedLeverage, 'leverage');
  const summedTotal = summedLeverage;

  const barLabelsScfFund = summedLeverage.map(label => {
    return label.investment_primary;
  });
  const totalScfFund = summedLeverage.map(data => {
    return Math.round(data.scf_funds);
  });
  // const barLabelsLeverage = summedLeverage.map(label => {
  //   return label.investment_primary;
  // });
  const totalLeverage = summedLeverage.map(data => {
    return Math.round(data.leverage);
  });
  const finaleTotalScfFund = {
    name: 'Total ScfFund',
    type: 'column',
    data: totalScfFund,
  };
  const finaleTotalLeverage = {
    name: 'Total Leverage',
    type: 'column',
    data: totalLeverage,
  };
  return {
    scf: {
      labels: barLabelsScfFund,
      series: [finaleTotalScfFund],
    },
    leverage: {
      labels: barLabelsScfFund,
      series: [finaleTotalLeverage],
    },
  };
};

function sortArrayByKey(arrayData, sortKey) {
  arrayData.sort(function(a, b) {
    // console.log(sortKey, 'sortKey');
    const nameA = a[sortKey]; // ignore upper and lowercase
    const nameB = b[sortKey]; // ignore upper and lowercase
    // debugger;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
}
const getPartnershipInvestmentFocus = (state, action) => {
  return {
    ...state,
    partnershipInvestmentFocus: action.payload,
  };
};
const getPartnersList = (state, action) => {
  return {
    ...state,
    partnersList: action.payload,
    filteredPartnerList: action.payload,
  };
};
const getProjectListData = (state, action) => {
  return {
    ...state,
    projectLists: action.payload,
  };
};
const getBarDataByBenefBudget = (state, action) => {
  const { selectedDataView, allocatedBudget } = action.payload;
  // if (selectedDataView === 'allocated_beneficiary') {
  const { totalBeneficiary, femaleBeneficiary } = action.payload;
  const totalbeneficiary = totalBeneficiary;
  const femalebeneficiary = femaleBeneficiary;
  // debugger;
  const mergedBeneficiaryArray = totalbeneficiary.map((item, i) => ({
    ...item,
    ...femalebeneficiary[i],
  }));
  const finalBeneficiaryArray = mergedBeneficiaryArray.map(function(
    el,
  ) {
    const o = { ...el };
    o.male_beneficiary = el.total_beneficiary - el.female_beneficiary;
    return o;
  });
  sortArrayByKey(finalBeneficiaryArray, 'code');
  const filteredBenefValues = filterBeneficiaryBarChart(
    finalBeneficiaryArray,
  );
  // console.log(result, 'rest');

  // }
  sortArrayByKey(allocatedBudget, 'code');
  const filteredBudgetValues = filterBudgetBarChart(allocatedBudget);
  console.log(filteredBenefValues, 'filteredBenefValues');
  // console.log(
  filteredBenefValues.series.push(filteredBudgetValues.series[0]);
  console.log(filteredBenefValues, 'filteredBudgetValues');
  // );
  return {
    ...state,
    // mapDataByProvince: finalBeneficiaryArray,
    barDatas: filteredBenefValues,
    // filteredMapData: choroplethFormat,
  };
};
// const getMapDataByDistrict = (state, action) => {
//   const choroplethFormat = action.payload.map(data => {
//     return {
//       id: data.code,
//       count: data.branch ? data.branch : data.allocated_beneficiary,
//     };
//   });
//   return {
//     ...state,
//     mapDataByDistrict: choroplethFormat,
//   };
// };
// const getMapDataByMunicipality = (state, action) => {
//   const choroplethFormat = action.payload.map(data => {
//     return {
//       id: data.code,
//       count: data.branch ? data.branch : data.allocated_beneficiary,
//     };
//   });
//   return {
//     ...state,
//     mapDataByMunicipality: choroplethFormat,
//     // isDataFetched: true,
//   };
// };
const getFilteredMapDataChoropleth = (state, action) => {
  const federalType = action.payload;
  // if (action.payload.selectedFederalType) {
  if (federalType === 'province') {
    return {
      ...state,
      filteredMapData: state.mapDataByProvince,
    };
  }
  if (federalType === 'district') {
    return {
      ...state,
      filteredMapData: state.mapDataByDistrict,
    };
  }
  if (federalType === 'municipality') {
    return {
      ...state,
      filteredMapData: state.mapDataByMunicipality,
    };
  }
  return {
    ...state,
  };
};
const filterMapDataOfCircleMarkerWithViewDataBy = (state, action) => {
  const federalType = action.payload;
  const choroplethFormat = action.payload.map(data => {
    return {
      ...data,
      id: data.code,
      count: data.blb
        ? data.blb
        : data.branch
        ? data.branch
        : data.tablet
        ? data.tablet
        : 0,
    };
  });
  console.log(choroplethFormat, 'formated circleMarker ');
  return {
    ...state,
    mapDataForCircleMarker: choroplethFormat,
  };
};

// const choroplethFormat = action.payload.map(data => {
//   return {
//     id: data.code,
//     count: data.allocated_budget
//       ? data.allocated_budget
//       : data.allocated_beneficiary,
//   };
// });

const getRadialData = (state, action) => {
  return {
    ...state,
    radialData: action.payload,
  };
};
const getSpiderChartData = (state, action) => {
  return {
    ...state,
    spiderChartData: action.payload,
  };
};

const filterPartnersListByPartner = (state, action) => {
  return {
    ...state,
    filteredPartnerList: action.payload,
  };
};
const filterFinancialDataOfDistrictFromProvince = (state, action) => {
  const { selectedDataView } = action.payload;
  // if (selectedDataView === 'allocated_beneficiary') {
  const {
    totalBeneficiary,
    femaleBeneficiary,
    allocatedBudget,
  } = action.payload;
  const totalbeneficiary = totalBeneficiary;
  const femalebeneficiary = femaleBeneficiary;
  // debugger;
  const mergedBeneficiaryArray = totalbeneficiary.map((item, i) => ({
    ...item,
    ...femalebeneficiary[i],
  }));
  const finalBeneficiaryArray = mergedBeneficiaryArray.map(function(
    el,
  ) {
    const o = { ...el };
    o.male_beneficiary = el.total_beneficiary - el.female_beneficiary;
    return o;
  });
  // sortArrayByKey(finalBeneficiaryArray, 'code');
  // const filteredBarValues = filterBeneficiaryBarChart(
  //   finalBeneficiaryArray,
  // );
  // console.log(result, 'rest');
  //   return {
  //     ...state,
  //     mapDataByProvince: finalBeneficiaryArray,
  //     barDatas: filteredBarValues,
  //     // filteredMapData: choroplethFormat,
  //   };
  // // }
  sortArrayByKey(finalBeneficiaryArray, 'code');
  const filteredBenefValues = filterBeneficiaryBarChart(
    finalBeneficiaryArray,
  );
  // console.log(result, 'rest');

  // }
  sortArrayByKey(allocatedBudget, 'code');
  const filteredBudgetValues = filterBudgetBarChart(allocatedBudget);
  // console.log(filteredBenefValues, 'filteredBenefValues');
  // console.log(
  filteredBenefValues.series.push(filteredBudgetValues.series[0]);
  // console.log(filteredBenefValues, 'filteredBudgetValues');
  // );
  return {
    ...state,
    // mapDataByProvince: finalBeneficiaryArray,
    barDatas: filteredBenefValues,
    // filteredMapData: choroplethFormat,
  };
};
const filterFinancialDataOfMunicipalityFromDistrict = (
  state,
  action,
) => {
  const { selectedDataView } = action.payload;
  // if (selectedDataView === 'allocated_beneficiary') {
  const {
    totalBeneficiary,
    femaleBeneficiary,
    allocatedBudget,
  } = action.payload;
  const totalbeneficiary = totalBeneficiary;
  const femalebeneficiary = femaleBeneficiary;
  // debugger;
  const mergedBeneficiaryArray = totalbeneficiary.map((item, i) => ({
    ...item,
    ...femalebeneficiary[i],
  }));
  const finalBeneficiaryArray = mergedBeneficiaryArray.map(function(
    el,
  ) {
    const o = { ...el };
    o.male_beneficiary = el.total_beneficiary - el.female_beneficiary;
    return o;
  });
  // sortArrayByKey(finalBeneficiaryArray, 'code');
  // const filteredBarValues = filterBeneficiaryBarChart(
  //   finalBeneficiaryArray,
  // );
  // console.log(result, 'rest');
  //   return {
  //     ...state,
  //     mapDataByProvince: finalBeneficiaryArray,
  //     barDatas: filteredBarValues,
  //     // filteredMapData: choroplethFormat,
  //   };
  // // }
  sortArrayByKey(finalBeneficiaryArray, 'code');
  const filteredBenefValues = filterBeneficiaryBarChart(
    finalBeneficiaryArray,
  );
  // console.log(result, 'rest');

  // }
  sortArrayByKey(allocatedBudget, 'code');
  const filteredBudgetValues = filterBudgetBarChart(allocatedBudget);
  // console.log(filteredBenefValues, 'filteredBenefValues');
  // console.log(
  filteredBenefValues.series.push(filteredBudgetValues.series[0]);
  // console.log(filteredBenefValues, 'filteredBudgetValues');
  // );
  return {
    ...state,
    // mapDataByProvince: finalBeneficiaryArray,
    barDatas: filteredBenefValues,
    // filteredMapData: choroplethFormat,
  };
};
// const filterFinancialDataOfMunicipalityFromDistrict = (
//   state,
//   action,
// ) => {
//   const { selectedDataView, allocatedBudget } = action.payload;
//   if (selectedDataView === 'allocated_beneficiary') {
//     const { totalBeneficiary, femaleBeneficiary } = action.payload;
//     const totalbeneficiary = totalBeneficiary;
//     const femalebeneficiary = femaleBeneficiary;
//     // debugger;
//     const mergedBeneficiaryArray = totalbeneficiary.map(
//       (item, i) => ({
//         ...item,
//         ...femalebeneficiary[i],
//       }),
//     );
//     const finalBeneficiaryArray = mergedBeneficiaryArray.map(function(
//       el,
//     ) {
//       const o = { ...el };
//       o.male_beneficiary =
//         el.total_beneficiary - el.female_beneficiary;
//       return o;
//     });
//     sortArrayByKey(finalBeneficiaryArray, 'code');
//     const filteredBarValues = filterBeneficiaryBarChart(
//       finalBeneficiaryArray,
//     );
//     // console.log(result, 'rest');
//     return {
//       ...state,
//       // mapDataByProvince: finalBeneficiaryArray,
//       barDatas: filteredBarValues,
//       // filteredMapData: choroplethFormat,
//     };
//   }
//   const filteredBarValues = filterBudgetBarChart(allocatedBudget);
//   return {
//     ...state,
//     barDatas: filteredBarValues,
//   };
// };
const filterFinancialDataWithAllFilters = (state, action) => {
  const { selectedDataView, allocatedBudget } = action.payload;
  // if (selectedDataView === 'allocated_beneficiary') {
  const { totalBeneficiary, femaleBeneficiary } = action.payload;
  const totalbeneficiary = totalBeneficiary;
  const femalebeneficiary = femaleBeneficiary;
  // debugger;
  const mergedBeneficiaryArray = totalbeneficiary.map((item, i) => ({
    ...item,
    ...femalebeneficiary[i],
  }));
  const finalBeneficiaryArray = mergedBeneficiaryArray.map(function(
    el,
  ) {
    const o = { ...el };
    o.male_beneficiary = el.total_beneficiary - el.female_beneficiary;
    return o;
  });
  sortArrayByKey(finalBeneficiaryArray, 'code');
  const filteredBenefValues = filterBeneficiaryBarChart(
    finalBeneficiaryArray,
  );
  // console.log(result, 'rest');

  // }
  sortArrayByKey(allocatedBudget, 'code');
  const filteredBudgetValues = filterBudgetBarChart(allocatedBudget);
  // console.log(filteredBenefValues, 'filteredBenefValues');
  // console.log(
  filteredBenefValues.series.push(filteredBudgetValues.series[0]);
  // console.log(filteredBenefValues, 'filteredBudgetValues');
  // );
  return {
    ...state,
    // mapDataByProvince: finalBeneficiaryArray,
    barDatas: filteredBenefValues,
    // filteredMapData: choroplethFormat,
  };
  // }
};
const getProvinceData = (state, action) => {
  function GetSortOrder(prop) {
    return function(a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      }
      if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }
  // console.log(action.payload);
  action.payload.sort(GetSortOrder('code'));
  const provinceList = [];
  provinceList.push({ label: 'All Province', value: 'all' });
  action.payload.map(data => {
    return provinceList.push({
      ...data,
      label: data.name,
      value: data.id,
    });
  });
  return {
    ...state,
    allProvinceList: provinceList,
  };
};
const getDistrictData = (state, action) => {
  const districtList = [];
  districtList.push({ label: 'All District', value: 'all' });
  action.payload.map(data => {
    return districtList.push({
      ...data,
      label: data.name,
      value: data.n_code,
    });
  });
  return {
    ...state,
    allDistrictList: districtList,
  };
};
const getMunicipalityData = (state, action) => {
  const municipalityList = [];
  municipalityList.push({ label: 'All Municipality', value: 'all' });
  action.payload.map(data => {
    return municipalityList.push({
      ...data,
      label: data.name,
      value: data.code,
    });
  });
  return {
    ...state,
    allMunicipalityList: municipalityList,
    isDataFetched: true,
  };
};
const getSankeyChartData = (state, action) => {
  return {
    ...state,
    sankeyChartData: action.payload,
  };
};
const filterSankeyChartData = (state, action) => {
  return {
    ...state,
    sankeyChartData: action.payload,
  };
};
const getOverviewData = (state, action) => {
  return {
    ...state,
    overviewData: action.payload,
  };
};
const filterOverviewData = (state, action) => {
  return {
    ...state,
    overviewData: action.payload,
  };
};
const getMapDataByProvince = (state, action) => {
  return {
    ...state,
    filteredMapData: action.payload,
    mapDataForCircleMarker: action.payload,
    mapDataByProvince: action.payload,
  };
};
const getMapDataByDistrict = (state, action) => {
  return {
    ...state,
    mapDataByDistrict: action.payload,
  };
};
const getMapDataByMunicipality = (state, action) => {
  return {
    ...state,
    mapDataByMunicipality: action.payload,
  };
};
const filterDistrictFromProvince = (state, action) => {
  const districtList = [];
  districtList.push({ label: 'All District', value: 'all' });
  action.payload.map(data => {
    return districtList.push({
      ...data,
      label: data.name,
      value: data.n_code,
    });
  });
  return {
    ...state,
    allDistrictList: districtList,
  };
};
const filterMunListFromDistrict = (state, action) => {
  const municipalityList = [];
  municipalityList.push({ label: 'All Municipality', value: 'all' });
  action.payload.map(data => {
    return municipalityList.push({
      ...data,
      label: data.name,
      value: data.code,
    });
  });
  return {
    ...state,
    allMunicipalityList: municipalityList,
    isDataFetched: true,
  };
};
const getLeverageData = (state, action) => {
  // console.log(action.payload, 'action');
  const filteredLeverage = filterLeverageChart(action.payload);
  return {
    ...state,
    barDataByLeverage: filteredLeverage,
  };
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PARTNERSHIP_INVESTMENT_FOCUS:
      return getPartnershipInvestmentFocus(state, action);
    case GET_PROJECT_LIST_DATA:
      return getProjectListData(state, action);
    case GET_PARTNERSHIP_PARTNERS_LIST:
      return getPartnersList(state, action);
    case GET_BARDATA_BY_BENEF_BUDGET:
      return getBarDataByBenefBudget(state, action);
    case GET_MAP_DATA_BY_PROVINCE:
      return getMapDataByProvince(state, action);
    case GET_MAP_DATA_BY_DISTRICT:
      return getMapDataByDistrict(state, action);
    case GET_MAP_DATA_BY_MUNICIPALITY:
      return getMapDataByMunicipality(state, action);
    case GET_FILTERED_MAP_DATA:
      return getFilteredMapDataChoropleth(state, action);
    case FILTER_PARTNERSHIP_PARTNERS_LIST_BY_PARTNER_TYPE:
      return filterPartnersListByPartner(state, action);
    case FILTER_FINANCIALDATA_OF_DISTRICT_FROM_PROVINCE:
      return filterFinancialDataOfDistrictFromProvince(state, action);
    case FILTER_FINANCIALDATA_OF_MUNICIPALITY_FROM_DISTRICT:
      return filterFinancialDataOfMunicipalityFromDistrict(
        state,
        action,
      );
    case FILTER_FINANCIALDATA_WITH_ALL_FILTERS:
      return filterFinancialDataWithAllFilters(state, action);
    case GET_RADIAL_DATA:
      return getRadialData(state, action);
    case GET_SPIDERCHART_DATA:
      return getSpiderChartData(state, action);
    case GET_SANKEY_CHART_DATA:
      return getSankeyChartData(state, action);
    case FILTER_SANKEY_CHART_DATA:
      return filterSankeyChartData(state, action);
    case GET_ALLPROVINCENAME_DATA:
      return getProvinceData(state, action);
    case GET_ALLDISTRICTNAME_DATA:
      return getDistrictData(state, action);
    case GET_ALLMUNICIPALITYNAME_DATA:
      return getMunicipalityData(state, action);
    case FILTER_DISTRICTLIST_FROM_PROVINCE:
      return filterDistrictFromProvince(state, action);
    case FILTER_MUNLIST_FROM_DISTRICT:
      return filterMunListFromDistrict(state, action);
    case GET_OVERVIEW_DATA:
      return getOverviewData(state, action);
    case FILTER_OVERVIEW_DATA:
      return filterOverviewData(state, action);
    case FILTER_MAPDATA_OF_CIRCLE_MARKER_WITH_VIEW_DATABY:
      return filterMapDataOfCircleMarkerWithViewDataBy(state, action);
    case GET_LEVERAGE_DATA:
      return getLeverageData(state, action);
    // case GET_MAP_DATA:
    //   return getMapData(state, action);
    default:
      return state;
  }
}
