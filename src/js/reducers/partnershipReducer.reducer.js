/* eslint-disable camelcase */
import {
  GET_PROJECT_LIST_DATA,
  GET_PARTNERSHIP_INVESTMENT_FOCUS,
  GET_BARDATA_BY_BENEF_BUDGET,
  GET_MAP_DATA_BY_PROVINCE,
  GET_MAP_DATA_BY_DISTRICT,
  GET_MAP_DATA_BY_MUNICIPALITY,
  GET_FILTERED_MAP_DATA,
  GET_RADIAL_DATA_REQUEST,
  GET_RADIAL_DATA_SUCCESS,
  GET_RADIAL_DATA_FAILED,
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
  // FILTER_MUNLIST_FROM_DISTRICT,
  FILTER_MAPDATA_OF_CIRCLE_MARKER_WITH_VIEW_DATABY,
  GET_LEVERAGE_DATA,
  GET_PARTNERSHIP_ALL_DATA,
  RESET_BAR_DATA,
  RESET_RADIAL_DATA,
  RESET_SANKEYCHART_DATA,
  RESET_LEVERAGE_DATA,
  FILTER_TIMELINE_DATA,
  FILTER_LEVERAGE_DATA,
  RESET_OVERVIEW_DATA,
  FILTER_LEVERAGE_DATA_FOR_BARCLICK,
  GET_BARDATA_BY_INVESTMENTFOCUS,
  FILTER_BARDATA_BY_INVESTMENTFOCUS,
  RESET_BAR_DATA_BY_INVESTMENT_FOCUS,
  FILTER_BENEFBUDGET_DATA_FOR_BARCLICK,
  FILTER_MAPDATA_CHOROPLETH,
  FILTER_BARDATA_BY_BENEF_BUDGET_WITH_PROVINCE_ONLY,
  GET_PARTNERSHIP_PARTNERSTYPE_LIST,
  GET_PARTNERSHIP_TIMELINE_DATA_API,
  FILTER_RADIAL_DATA,
  FILTER_MUNLIST_FROM_DISTRICT_SUCCESS,
  FILTER_MUNLIST_FROM_DISTRICT_REQUEST,
  FILTER_MUNLIST_FROM_DISTRICT_FAILED,
} from '../actions/index.actions';
import province from '../../data/province.json';
import district from '../../data/district.json';
import municipality from '../../data/municipality.json';
// import demoWorker from '../WebWorker/demo1-hello-world';
import WebWorker from '../WebWorker/webWorker';
import workerfile from '../WebWorker/worker';

function convertDateToTime(date) {
  return new Date(date).getTime();
}
const timelineIndex = 0;
function provinceCodeToName(code) {
  if (code === 1) return 'Province 1';
  if (code === 2) return 'Province 2';
  if (code === 3) return 'Bagmati Province';
  if (code === 4) return 'Gandaki Province';
  if (code === 5) return 'Province 5';
  if (code === 6) return 'Karnali Province';
  if (code === 7) return 'Sudurpaschim Province';
  return '';
}
function colorPicker(i) {
  if (i % 25 === 0) return '#91664E';
  if (i % 25 === 1) return '#5D6D7E';
  if (i % 25 === 2) return '#13A8BE'; // #FF6D00
  if (i % 25 === 3) return '#DE2693';
  if (i % 25 === 4) return '#B1B424';
  if (i % 25 === 5) return '#2196F3';
  if (i % 25 === 6) return '#12fff4db'; // #4CE2A7
  if (i % 25 === 7) return '#6f05d0';
  if (i % 25 === 8) return '#00C853';
  if (i % 25 === 9) return '#E11D3F'; // #651FFF
  if (i % 25 === 10) return '#FF6D00'; // #B71DE1
  if (i % 25 === 11) return '#16A085'; // #FFCD00
  if (i % 25 === 12) return '#1F8AE4'; // #E11D3F
  if (i % 25 === 13) return '#FF1500';
  if (i % 25 === 14) return '#C5E11D';
  if (i % 25 === 15) return '#CDACF2';
  if (i % 25 === 16) return '#AFDE0E';
  if (i % 25 === 17) return '#FF5576';
  if (i % 25 === 18) return '#BFEDF5';
  if (i % 25 === 19) return '#E0CBAB';
  if (i % 25 === 25) return '#FF5E00';
  if (i % 25 === 21) return '#AF7AC5';
  if (i % 25 === 22) return '#008080';
  if (i % 25 === 23) return '#C70039';
  if (i % 25 === 24) return '#16A085';
  if (i % 25 === 25) return '#5D6D7E';
  return '#FFD400';
}
function getRandomColor() {
  let color = '#';
  let i;
  for (i = 0; i < 6; i += 1) {
    color += Math.floor(Math.random() * 16).toString(16);
  }
  return color;
}

const getColor = (function() {
  const colors = {};
  return function(id) {
    // eslint-disable-next-line no-return-assign
    return (colors[id] = colors[id] || getRandomColor());
  };
})();

const initialState = {
  isDataFetched: false,
  partnershipInvestmentFocus: [],
  legendList: [],
  partnersList: [],
  partnerTypeList: [],
  projectLists: [],
  mapDataByProvince: [],
  mapDataByDistrict: [],
  filteredMapData: [],
  mapDataForCircleMarker: [],
  mapDataByMunicipality: [],
  radialData: {},
  spiderChartData: [],
  sankeyChartData: {},
  filteredPartnerList: [],
  barDatas: [],
  barDatasOfProvinceOnly: [],
  barDatasByInvestment: [],
  defaultBarDatasByInvestment: [],
  allProvinceList: [],
  allDistrictList: [],
  allMunicipalityList: [],
  overviewData: [],
  barDataByLeverage: [],
  // default Datas
  defaultBarDatas: [],
  defaultRadialData: {},
  defaultSankeyChartData: {},
  defaultBarDataByLeverage: [],
  timelineData: [],
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

function generateSankeyChartData(data) {
  const nodes = [];
  const links = [];

  data.nodes.forEach((item, index) => {
    nodes.push({
      id: index + 1,
      name: item.id,
    });
  });

  function getID(name) {
    let id;
    nodes.forEach(item => {
      if (item.name === name) id = item.id;
    });
    return id;
  }

  data.links.forEach(item => {
    links.push({
      source: getID(item.source),
      target: getID(item.target),
      value: item.value,
    });
  });

  return { nodes, links };
}

const filterBeneficiaryBarChart = datas => {
  const checkProvince = datas.some(i => i.name.includes('Province'));
  //
  //
  const barLabels = checkProvince
    ? datas.map(label => {
        return label.name;
        // return label.code;
      })
    : datas.map(label => {
        // return label.name.replace('Province', '');
        return label.name;
      });
  const maleBeneficiary = datas.map(data => {
    return data.total_beneficiary - data.female_beneficiary;
  });
  const femaleBeneficiary = datas.map(data => {
    return data.female_beneficiary;
  });
  const finaleMaleBeneficiary = {
    name: 'Male Beneficiaries',
    type: 'column',
    data: maleBeneficiary,
  };
  const finaleFemaleBeneficiary = {
    name: 'Female Beneficiaries',
    type: 'column',
    data: femaleBeneficiary,
  };
  return {
    labels: barLabels,
    series: [finaleMaleBeneficiary, finaleFemaleBeneficiary],
  };
};
const filterBeneficiaryBarChartForProvinceOnly = datas => {
  // const checkProvince = datas.some(i => i.name.includes('Province'));
  //
  //
  const checkProvince = datas.some(i => i.province_code);
  const barLabels = datas.map(label => {
    return checkProvince
      ? provinceCodeToName(label.province_code)
      : provinceCodeToName(label.code);
    // return label.code;
  });
  const maleBeneficiary = datas.map(data => {
    return data.total_beneficiary - data.female_beneficiary;
  });
  const femaleBeneficiary = datas.map(data => {
    return data.female_beneficiary;
  });
  const finaleMaleBeneficiary = {
    name: 'Male Beneficiaries',
    type: 'column',
    data: maleBeneficiary,
  };
  const finaleFemaleBeneficiary = {
    name: 'Female Beneficiaries',
    type: 'column',
    data: femaleBeneficiary,
  };
  return {
    labels: barLabels,
    series: [finaleMaleBeneficiary, finaleFemaleBeneficiary],
  };
};
const filterBeneficiaryBarChartForInvestment = datas => {
  const checkProvince = datas.some(i =>
    i.name.includes('Provincesss'),
  );
  //
  //
  const barLabels = checkProvince
    ? datas.map(label => {
        return label.code;
        // return label.code;
      })
    : datas.map(label => {
        return label.name;
        // return label.name.replace('Province', '');
      });
  const maleBeneficiary = datas.map(data => {
    return data.total_beneficiary - data.female;
  });
  const femaleBeneficiary = datas.map(data => {
    return data.female;
  });
  const finaleMaleBeneficiary = {
    name: 'Male Beneficiaries',
    type: 'column',
    data: maleBeneficiary,
  };
  const finaleFemaleBeneficiary = {
    name: 'Female Beneficiaries',
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
    // return label.name.replace('Province', '');
    return label.code;
  });
  const totalBeneficiary = datas.map(data => {
    return Math.round(data.allocated_budget);
  });
  const finaleTotalBudget = {
    name: 'Budget Allocated',
    type: 'line',
    data: totalBeneficiary,
  };
  return {
    labels: barLabels,
    series: [finaleTotalBudget],
  };
};
const filterBudgetBarChartProvinceOnly = datas => {
  const checkProvince = datas.some(i => i.province_code);
  const barLabels = datas.map(label => {
    // return label.name.replace('Province', '');
    return checkProvince
      ? provinceCodeToName(label.province_code)
      : provinceCodeToName(label.code);
  });
  const totalBeneficiary = datas.map(data => {
    return Math.round(data.allocated_budget);
  });
  const finaleTotalBudget = {
    name: 'Budget Allocated',
    type: 'line',
    data: totalBeneficiary,
  };
  return {
    labels: barLabels,
    series: [finaleTotalBudget],
  };
};
const filterLeverageChart = datas => {
  //
  //
  let filteredProjectList = datas.projectList;
  if (datas.projectSelection && datas.projectSelection.length > 0) {
    // eslint-disable-next-line array-callback-return
    filteredProjectList = datas.projectList.filter(function(item) {
      return datas.projectSelection.indexOf(item.id) !== -1;
    });
    //
  }
  const summedScfFund = filteredProjectList.reduce((a, c) => {
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
  const summedLeverage = filteredProjectList.reduce((a, c) => {
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

  //
  //
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
    name: 'S-CF Funds',
    type: 'column',
    data: totalScfFund,
  };
  const finaleTotalLeverage = {
    name: 'Leverage',
    type: 'line',
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

const filterLeverageDataForBarClick = datas => {
  const summedLeverage = datas;
  const summedTotal = summedLeverage;

  const barLabelsScfFund = summedLeverage.map(label => {
    return label.name;
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
    name: 'S-CF Funds',
    type: 'column',
    data: totalScfFund,
  };
  const finaleTotalLeverage = {
    name: 'Leverage',
    type: 'line',
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
    //
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
  const legendInvestmentFocusList = action.payload.map(
    data => data.investment_primary,
  );
  return {
    ...state,
    partnershipInvestmentFocus: action.payload,
    legendList: legendInvestmentFocusList,
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
  //

  // }
  sortArrayByKey(allocatedBudget, 'code');
  const filteredBudgetValues = filterBudgetBarChart(allocatedBudget);
  //
  // console.log(
  filteredBenefValues.series.push(filteredBudgetValues.series[0]);
  //
  // );
  const circleMarkerData = totalBeneficiary.map(item => {
    return {
      ...item,
      allocated_beneficiary: Math.round(item.total_beneficiary),
    };
  });
  return {
    ...state,
    // mapDataByProvince: finalBeneficiaryArray,
    barDatas: filteredBenefValues,
    defaultBarDatas: filteredBenefValues,
    barDatasOfProvinceOnly: filteredBenefValues,
    mapDataForCircleMarker: circleMarkerData,

    // filteredMapData: choroplethFormat,
  };
};
const getBarDataByInvestmentFocus = (state, action) => {
  const { selectedDataView, allocatedBudget } = action.payload;
  // if (selectedDataView === 'allocated_beneficiary') {
  const { totalBeneficiary } = action.payload;
  const finalBeneficiaryArray = totalBeneficiary;
  // const femalebeneficiary = femaleBeneficiary;
  // debugger;
  // const mergedBeneficiaryArray = totalbeneficiary.map((item, i) => ({
  //   ...item,
  //   ...femalebeneficiary[i],
  // }));
  // const finalBeneficiaryArray = mergedBeneficiaryArray.map(function(
  //   el,
  // ) {
  //   const o = { ...el };
  //   o.male_beneficiary = el.total_beneficiary - el.female_beneficiary;
  //   return o;
  // });
  sortArrayByKey(finalBeneficiaryArray, 'code');
  const filteredBenefValues = filterBeneficiaryBarChartForInvestment(
    finalBeneficiaryArray,
  );
  //

  // }
  sortArrayByKey(allocatedBudget, 'code');
  const filteredBudgetValues = filterBudgetBarChart(allocatedBudget);
  //
  // console.log(
  filteredBenefValues.series.push(filteredBudgetValues.series[0]);
  //
  // );
  return {
    ...state,
    // mapDataByProvince: finalBeneficiaryArray,
    barDatasByInvestment: filteredBenefValues,
    defaultBarDatasByInvestment: filteredBenefValues,
    // filteredMapData: choroplethFormat,
  };
};
const filterBenefBudgetDataonClick = (state, action) => {
  const { selectedDataView, allocatedBudget } = action.payload;
  // if (selectedDataView === 'allocated_beneficiary') {
  const { totalBeneficiary } = action.payload;
  const finalBeneficiaryArray = totalBeneficiary;
  // const femalebeneficiary = femaleBeneficiary;
  // debugger;
  // const mergedBeneficiaryArray = totalbeneficiary.map((item, i) => ({
  //   ...item,
  //   ...femalebeneficiary[i],
  // }));
  // const finalBeneficiaryArray = mergedBeneficiaryArray.map(function(
  //   el,
  // ) {
  //   const o = { ...el };
  //   o.male_beneficiary = el.total_beneficiary - el.female_beneficiary;
  //   return o;
  // });
  sortArrayByKey(finalBeneficiaryArray, 'code');
  const filteredBenefValues = filterBeneficiaryBarChartForInvestment(
    finalBeneficiaryArray,
  );
  //

  // }
  sortArrayByKey(allocatedBudget, 'code');
  const filteredBudgetValues = filterBudgetBarChart(allocatedBudget);
  //
  // console.log(
  filteredBenefValues.series.push(filteredBudgetValues.series[0]);
  //
  // );
  return {
    ...state,
    // mapDataByProvince: finalBeneficiaryArray,
    barDatasByInvestment: filteredBenefValues,
    // defaultBarDatasByInvestment: filteredBenefValues,
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
  // const federalType = action.payload;
  // const choroplethFormat = action.payload.map(data => {
  //   return {
  //     ...data,
  //     id: data.code,
  //     count: data.blb
  //       ? data.blb
  //       : data.branch
  //       ? data.branch
  //       : data.tablet
  //       ? data.tablet
  //       : 0,
  //   };
  // });
  // const roundedFormat = choroplethFormat.map(item => ({
  //   ...item,
  //   allocated_beneficiary: Math.round(item.allocated_beneficiary),
  //   allocated_budget: Math.round(item.allocated_budget),
  // })); //
  return {
    ...state,
    mapDataForCircleMarker: action.payload,
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

const getRadialDataRequest = (state, action) => {
  return {
    ...state,
    isDataFetched: false,
  };
};
const getRadialData = (state, action) => {
  //
  // eslint-disable-next-line array-callback-return
  action.payload.children.map((data, i) => {
    //
    // eslint-disable-next-line no-param-reassign
    data.color = colorPicker(i + 2);
  });
  // if (state.defaultRadialData.name) {
  //   return {
  //     ...state,
  //     radialData: action.payload,
  //   };
  // }
  return {
    ...state,
    radialData: action.payload,
    defaultRadialData: action.payload,
    isDataFetched: true,
  };
};
const getRadialDataFailed = (state, action) => {
  return {
    ...state,
  };
};
const filterRadialData = (state, action) => {
  //
  // eslint-disable-next-line array-callback-return
  action.payload.children.map((data, i) => {
    //
    // eslint-disable-next-line no-param-reassign
    data.color = colorPicker(i + 2);
  });
  // if (state.defaultRadialData.name) {
  //   return {
  //     ...state,
  //     radialData: action.payload,
  //   };
  // }
  return {
    ...state,
    radialData: action.payload,
    // defaultRadialData: action.payload,
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
    filteredPartnerList:
      action.payload.length > 0 ? action.payload : state.partnersList,
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
  //
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
  //

  // }
  sortArrayByKey(allocatedBudget, 'code');
  const filteredBudgetValues = filterBudgetBarChart(allocatedBudget);
  //
  // console.log(
  filteredBenefValues.series.push(filteredBudgetValues.series[0]);
  //
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
  //
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
  //

  // }
  sortArrayByKey(allocatedBudget, 'code');
  const filteredBudgetValues = filterBudgetBarChart(allocatedBudget);
  //
  // console.log(
  filteredBenefValues.series.push(filteredBudgetValues.series[0]);
  //
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
//     //
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
  //

  // }
  sortArrayByKey(allocatedBudget, 'code');
  const filteredBudgetValues = filterBudgetBarChart(allocatedBudget);
  //
  // console.log(
  filteredBenefValues.series.push(filteredBudgetValues.series[0]);
  //
  // );
  return {
    ...state,
    // mapDataByProvince: finalBeneficiaryArray,
    barDatas: filteredBenefValues,
    // filteredMapData: choroplethFormat,
  };
  // }
};
const filterbarDataOfBenefBudgetWithProvinceOnly = (
  state,
  action,
) => {
  //
  const {
    totalBeneficiary,
    femaleBeneficiary,
    allocatedBudget,
  } = action.payload;
  const totalbeneficiary = totalBeneficiary;
  const femalebeneficiary = femaleBeneficiary;
  const checkProvince = totalbeneficiary.some(i => i.province_code);
  //
  const totalBenefProvince = totalbeneficiary.reduce((a, c) => {
    const filtered = a.filter(el =>
      checkProvince
        ? el.province_code === c.province_code
        : el.code === c.code,
    );
    if (filtered.length > 0) {
      // eslint-disable-next-line no-param-reassign
      a[
        a.indexOf(filtered[0])
      ].total_beneficiary += +c.total_beneficiary;
    } else {
      a.push(c);
    }
    return a;
  }, []);
  //
  const femaleBenefProvince = femalebeneficiary.reduce((a, c) => {
    const filtered = a.filter(el =>
      checkProvince
        ? el.province_code === c.province_code
        : el.code === c.code,
    );
    if (filtered.length > 0) {
      // eslint-disable-next-line no-param-reassign
      a[
        a.indexOf(filtered[0])
      ].female_beneficiary += +c.female_beneficiary;
    } else {
      a.push(c);
    }
    return a;
  }, []);
  const allocatedBudgetProvince = allocatedBudget.reduce((a, c) => {
    const filtered = a.filter(el =>
      checkProvince
        ? el.province_code === c.province_code
        : el.code === c.code,
    );
    if (filtered.length > 0) {
      // eslint-disable-next-line no-param-reassign
      a[
        a.indexOf(filtered[0])
      ].allocated_budget += +c.allocated_budget;
    } else {
      a.push(c);
    }
    return a;
  }, []);
  // debugger;
  const mergedBeneficiaryArray = totalBenefProvince.map(
    (item, i) => ({
      ...item,
      ...femaleBenefProvince[i],
    }),
  );
  //
  const finalBeneficiaryArray = mergedBeneficiaryArray.map(function(
    el,
  ) {
    const o = { ...el };
    o.male_beneficiary = el.total_beneficiary - el.female_beneficiary;
    return o;
  });
  //
  sortArrayByKey(finalBeneficiaryArray, 'code');
  const filteredBenefValues = filterBeneficiaryBarChartForProvinceOnly(
    finalBeneficiaryArray,
  );
  //

  // }
  sortArrayByKey(allocatedBudgetProvince, 'code');
  const filteredBudgetValues = filterBudgetBarChartProvinceOnly(
    allocatedBudgetProvince,
  );
  //
  // console.log(
  filteredBenefValues.series.push(filteredBudgetValues.series[0]);
  //
  // );
  return {
    ...state,
    barDatasOfProvinceOnly: filteredBenefValues,
    // mapDataByProvince: finalBeneficiaryArray,
    // barDatas: filteredBenefValues,
    // filteredMapData: choroplethFormat,
  };
  // }
};
const filterBarDataByInvestmentFocus = (state, action) => {
  const { selectedDataView, allocatedBudget } = action.payload;
  // if (selectedDataView === 'allocated_beneficiary') {
  const { totalBeneficiary } = action.payload;
  const finalBeneficiaryArray = totalBeneficiary;
  // const femalebeneficiary = femaleBeneficiary;
  // debugger;
  // const mergedBeneficiaryArray = totalbeneficiary.map((item, i) => ({
  //   ...item,
  //   ...femalebeneficiary[i],
  // }));
  // const finalBeneficiaryArray = mergedBeneficiaryArray.map(function(
  //   el,
  // ) {
  //   const o = { ...el };
  //   o.male_beneficiary = el.total_beneficiary - el.female_beneficiary;
  //   return o;
  // });
  sortArrayByKey(finalBeneficiaryArray, 'code');
  const filteredBenefValues = filterBeneficiaryBarChartForInvestment(
    finalBeneficiaryArray,
  );
  //

  // }
  sortArrayByKey(allocatedBudget, 'code');
  const filteredBudgetValues = filterBudgetBarChart(allocatedBudget);
  //
  // console.log(
  filteredBenefValues.series.push(filteredBudgetValues.series[0]);
  //
  // );
  return {
    ...state,
    // mapDataByProvince: finalBeneficiaryArray,
    barDatasByInvestment: filteredBenefValues,
    // filteredMapData: choroplethFormat,
  };
  // }
};
// const filterFinancialDataWithAllFiltersOfProvinceOnly = (state, action) => {
//
//   const {
//     selectedDataView,
//     allocatedBudget,
//     totalBeneficiary,
//     femaleBeneficiary,
//   } = action.payload;
//   const totalBudget = [...allocatedBudget];
//   const totalBenef = [...totalBeneficiary];
//   const femaleBenef = [...femaleBeneficiary];
//   //
//   // const holder = {};

//   // testValues.forEach(function(d) {
//   //   // eslint-disable-next-line
//   //   if (holder.hasOwnProperty(d.province_code)) {
//   //     // eslint-disable-next-line
//   //     holder[d.province_code] = holder[d.province_code] + d.allocated_budget;
//   //   } else {
//   //     holder[d.province_code] = d.allocated_budget;
//   //   }
//   // });

//   // const obj2 = [];

//   // // eslint-disable-next-line
//   // for (const prop in holder) {
//   //   obj2.push({ name: prop, value: holder[prop] });
//   // }
//   //
//   const summedBudget = totalBudget.reduce((a, c) => {
//     //
//     //

//     const filtered = a.filter(
//       el => el.province_code === c.province_code,
//     );
//     if (filtered.length > 0) {
//       // eslint-disable-next-line no-param-reassign
//       a[
//         a.indexOf(filtered[0])
//       ].allocated_budget += +c.allocated_budget;
//     } else {
//       a.push(c);
//     }
//     return a;
//   }, []);
//   const summedTotalBenef = totalBenef.reduce((a, c) => {
//     //
//     //

//     const filtered = a.filter(
//       el => el.province_code === c.province_code,
//     );
//     if (filtered.length > 0) {
//       // eslint-disable-next-line no-param-reassign
//       a[
//         a.indexOf(filtered[0])
//       ].allocated_budget += +c.allocated_budget;
//     } else {
//       a.push(c);
//     }
//     return a;
//   }, []);
//   const summedFemaleBenef = femaleBenef.reduce((a, c) => {
//     //
//     //

//     const filtered = a.filter(
//       el => el.province_code === c.province_code,
//     );
//     if (filtered.length > 0) {
//       // eslint-disable-next-line no-param-reassign
//       a[
//         a.indexOf(filtered[0])
//       ].allocated_budget += +c.allocated_budget;
//     } else {
//       a.push(c);
//     }
//     return a;
//   }, []);
//   //
//   // if (selectedDataView === 'allocated_beneficiary') {

//   // debugger;
//   const mergedBeneficiaryArray = summedTotalBenef.map((item, i) => ({
//     ...item,
//     ...summedFemaleBenef[i],
//   }));
//   const finalBeneficiaryArray = mergedBeneficiaryArray.map(function(
//     el,
//   ) {
//     const o = { ...el };
//     o.male_beneficiary = el.total_beneficiary - el.female_beneficiary;
//     return o;
//   });
//   // summedScfFund;
//   sortArrayByKey(finalBeneficiaryArray, 'code');
//   const filteredBenefValues = filterBeneficiaryBarChart(
//     finalBeneficiaryArray,
//   );
//   //

//   // }
//   sortArrayByKey(summedBudget, 'code');
//   const filteredBudgetValues = filterBudgetBarChart(summedBudget);
//   //
//   // console.log(
//   filteredBenefValues.series.push(filteredBudgetValues.series[0]);
//
//   // );
//   return {
//     ...state,
//     // mapDataByProvince: finalBeneficiaryArray,
//     barDatas: filteredBenefValues,

//     // filteredMapData: choroplethFormat,
//   };
// };
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
  //
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
  action.payload.sort(GetSortOrder('name'));

  const districtList = [];
  districtList.push({ label: 'All District', code: 0, value: 'all' });
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
  municipalityList.push({
    label: 'All Municipality',
    code: 0,
    value: 'all',
  });
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
    defaultMunicipalityList: municipalityList,
    // isDataFetched: true,
  };
};

const getSankeyChartData = (state, action) => {
  const data = action.payload;
  const sankeyChartData = generateSankeyChartData(data);

  return {
    ...state,
    sankeyChartData,
    defaultSankeyChartData: sankeyChartData,
  };
};
const filterSankeyChartData = (state, action) => {
  const data = action.payload;
  const sankeyChartData = generateSankeyChartData(data);

  return {
    ...state,
    sankeyChartData,
  };
};
const getOverviewData = (state, action) => {
  return {
    ...state,
    overviewData: action.payload,
    defaultOveviewData: action.payload,
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
    // mapDataForCircleMarker: action.payload,
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
  action.payload.sort(GetSortOrder('name'));
  const districtList = [];
  districtList.push({ label: 'All District', code: 0, value: 'all' });
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
const filterMunListFromDistrictRequest = (state, action) => {
  return {
    ...state,
    isDataFetched: false,
  };
};
const filterMunListFromDistrict = (state, action) => {
  const { defaultMunicipalityList } = state;
  const { payload } = action;
  const municipalityList = [];
  // console.log(defaultMunicipalityList, 'defmuN');
  // console.log(payload, 'payload');
  const districtCodes = payload.map(dist => dist.code);
  let result = defaultMunicipalityList.filter(mun =>
    districtCodes.includes(mun.district_code),
  );
  if (result.length < 1) {
    result = defaultMunicipalityList;
  } else {
    result.unshift({
      label: 'All Municipality',
      code: 0,
      value: 'all',
    });
  }
  // const test = defaultMunicipalityList.filter(
  //   mun => mun.district_code === 27,
  // );
  // console.log(test, 'testMun');
  // console.log(result, 'result');
  // console.log(result, 'result');
  // const x = defaultMunicipalityList.filter(
  //   mun => (mun.code = action),
  // );

  // action.payload.map(data => {
  //   return municipalityList.push({
  //     ...data,
  //     label: data.name,
  //     value: data.code,
  //   });
  // });
  return {
    ...state,
    allMunicipalityList: result,
    isDataFetched: true,
  };
};
const filterMunListFromDistrictFailed = (state, action) => {
  return {
    ...state,
  };
};
const getLeverageData = (state, action) => {
  //
  const filteredLeverage = filterLeverageChart(action.payload);
  //

  return {
    ...state,
    barDataByLeverage: filteredLeverage,
    defaultBarDataByLeverage: filteredLeverage,
  };
};
const filterLeverageData = (state, action) => {
  //
  const filteredLeverage = filterLeverageChart(action.payload);
  return {
    ...state,
    barDataByLeverage: filteredLeverage,
  };
};
const filterLeverageDataOnClick = (state, action) => {
  //
  const filteredLeverage = filterLeverageDataForBarClick(
    action.payload,
  );
  return {
    ...state,
    barDataByLeverage: filteredLeverage,
  };
};
const getPartnershipAllData = (state, action) => {
  const allData = action.payload.map(
    ({
      project_id,
      start_date,
      province_id,
      district_id,
      municipality_id,
    }) => ({
      project_id,
      province_id,
      district_id,
      municipality_id,
      date: convertDateToTime(start_date),
    }),
  );
  //
  // const filteredLeverage = filterLeverageChart(action.payload);
  return {
    ...state,
    partnershipAllData: allData,
  };
};
const resetBarData = (state, action) => {
  //
  // const filteredLeverage = filterLeverageChart(action.payload);
  return {
    ...state,
    barDatas: state.defaultBarDatas,
    barDatasOfProvinceOnly: state.defaultBarDatas,
  };
};
const resetRadialData = (state, action) => {
  //
  // const filteredLeverage = filterLeverageChart(action.payload);
  return {
    ...state,
    radialData: {
      ...state.defaultRadialData,
      changes: Math.random(),
    },
  };
};
const resetSankeyChartData = (state, action) => {
  //
  // const filteredLeverage = filterLeverageChart(action.payload);
  return {
    ...state,
    sankeyChartData: state.defaultSankeyChartData,
  };
};
const resetOverviewData = (state, action) => {
  //
  // const filteredLeverage = filterLeverageChart(action.payload);
  return {
    ...state,
    overviewData: state.defaultOveviewData,
  };
};
const resetLeverageData = (state, action) => {
  //
  // const filteredLeverage = filterLeverageChart(action.payload);
  return {
    ...state,
    barDataByLeverage: state.defaultBarDataByLeverage,
  };
};
const resetBarDataByInvestmentFocus = (state, action) => {
  //
  // const filteredLeverage = filterLeverageChart(action.payload);
  return {
    ...state,
    barDatasByInvestment: state.defaultBarDatasByInvestment,
  };
};
const filterMapdataChoropleth = (state, action) => {
  //
  // const filteredLeverage = filterLeverageChart(action.payload);
  return {
    ...state,
    filteredMapData: action.payload,
  };
};
const filterTimelineData = (state, action) => {
  const { min, max, fedtype } = action.payload;
  //
  //
  //
  //
  //
  const allData = state.partnershipAllData;

  // const min = convertDateToTime('2015-01-01');
  // const max = convertDateToTime('2015-02-01');
  const timelineData = allData.filter(
    item => item.date > min && item.date < max,
  );
  // console.log(timelineData, 'timelineData');
  function getPartnerCount({ id, type }) {
    const filteredData = timelineData
      .filter(item => item[type] === id)
      .map(item => item.project_id);

    const count = [...new Set(filteredData)].length;

    return count;
  }
  let fedData = [];
  if (fedtype === 'municipality') {
    const municipalityData = municipality.map(item => ({
      id: item.munid,
      name: item.lu_name,
    }));
    fedData = municipalityData.map(({ id, name }) => ({
      id,
      name,
      count: getPartnerCount({ id, type: 'municipality_id' }),
    }));
  } else if (fedtype === 'district') {
    const districts = district.map(item => ({
      id: item.districtid,
      name: item.name,
    }));
    fedData = districts.map(({ id, name }) => ({
      id,
      name,
      count: getPartnerCount({ id, type: 'district_id' }),
    }));
  } else {
    const provinces = province.map(item => ({
      id: item.FIRST_PROV,
      name: item.prov_name,
    }));
    fedData = provinces.map(({ id, name }) => ({
      id,
      name,
      count: getPartnerCount({ id, type: 'province_id' }),
    }));
    // console.log(fedData, 'fedData');
  }
  // console.log(fedData, 'filteredTimelineData');
  return {
    ...state,
    filteredMapData: fedData,
  };
};
// const filterTimelineData = (state, action) => {
//   const { min, max, fedtype } = action.payload;
//   const { partnershipAllData } = state;
//   // const that = this;
//   const finalchoroplethData = [];
//   // const finalData = [];
//   if (fedtype === 'municipality') {
//     municipality.map(mun => {
//       finalchoroplethData.push({
//         id: mun.munid,
//         count: 0,
//       });
//       return true;
//     });
//   } else if (fedtype === 'district') {
//     district.map(mun => {
//       finalchoroplethData.push({
//         id: mun.districtid,
//         count: 0,
//       });
//       return true;
//     });
//   } else {
//     province.map(mun => {
//       finalchoroplethData.push({
//         id: mun.FIRST_PROV,
//         count: 0,
//       });
//       return true;
//     });
//   }

//   // const worker = new Worker(demoWorker);

//   // // Receive messages from postMessage() calls in the Worker
//   // worker.onmessage = evt => {
//   //
//   // };

//   // // Pass data to the WebWorker
//   // worker.postMessage({ data: '123456789' });
//   // const workers = new WebWorker(workerfile);

//   // workers.postMessage({
//   //   minmax: [min, max],
//   //   provincedata,
//   //   partnershipAllData,
//   // });

//   // workers.addEventListener('message', event => {
//   //
//   //
//   //   // dispatch({
//   //   //   type: FILTER_PRIMARYGEOJSON,
//   //   //   payload: event.data,
//   //   // });
//   // });
//   // this.worker.postMessage(
//   //   [min, max],
//   //   provincedata,
//   //   partnershipAllData,
//   // );
//   CaculateCount(
//     [min, max],
//     finalchoroplethData,
//     partnershipAllData,
//     fedtype,
//   );
//   //
//   // const filteredLeverage = filterLeverageChart(action.payload);
//   return {
//     ...state,
//     filteredMapData: finalchoroplethData,
//   };
// };
const getPartnersTypeList = (state, action) => {
  const partnersData = action.payload;
  //
  const partnersType = partnersData.map(data => {
    return data.partnership !== 'nan' && data.partnership;
  });
  //
  const unique = [...new Set(partnersType)];
  //

  return {
    ...state,
    partnerTypeList: unique,
  };
};
const getPartnershipTimelineData = (state, action) => {
  const {
    provinceTimelineData,
    districtTimelineData,
    municipalityTimelineData,
  } = action.payload;
  return {
    ...state,
    timelineData: {
      provinceTimelineData,
      districtTimelineData,
      municipalityTimelineData,
    },
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
    case GET_PARTNERSHIP_PARTNERSTYPE_LIST:
      return getPartnersTypeList(state, action);
    case GET_BARDATA_BY_BENEF_BUDGET:
      return getBarDataByBenefBudget(state, action);
    case GET_BARDATA_BY_INVESTMENTFOCUS:
      return getBarDataByInvestmentFocus(state, action);
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
    case FILTER_BARDATA_BY_BENEF_BUDGET_WITH_PROVINCE_ONLY:
      return filterbarDataOfBenefBudgetWithProvinceOnly(
        state,
        action,
      );
    case FILTER_BARDATA_BY_INVESTMENTFOCUS:
      return filterBarDataByInvestmentFocus(state, action);
    case GET_RADIAL_DATA_REQUEST:
      return getRadialDataRequest(state, action);
    case GET_RADIAL_DATA_SUCCESS:
      return getRadialData(state, action);
    case GET_RADIAL_DATA_FAILED:
      return getRadialDataFailed(state, action);
    case FILTER_RADIAL_DATA:
      return filterRadialData(state, action);
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
    case FILTER_MUNLIST_FROM_DISTRICT_REQUEST:
      return filterMunListFromDistrictRequest(state, action);
    case FILTER_MUNLIST_FROM_DISTRICT_SUCCESS:
      return filterMunListFromDistrict(state, action);
    case FILTER_MUNLIST_FROM_DISTRICT_FAILED:
      return filterMunListFromDistrictFailed(state, action);
    case GET_OVERVIEW_DATA:
      return getOverviewData(state, action);
    case FILTER_OVERVIEW_DATA:
      return filterOverviewData(state, action);
    case FILTER_MAPDATA_OF_CIRCLE_MARKER_WITH_VIEW_DATABY:
      return filterMapDataOfCircleMarkerWithViewDataBy(state, action);
    case GET_LEVERAGE_DATA:
      return getLeverageData(state, action);
    case FILTER_LEVERAGE_DATA:
      return filterLeverageData(state, action);
    case GET_PARTNERSHIP_ALL_DATA:
      return getPartnershipAllData(state, action);
    case RESET_BAR_DATA:
      return resetBarData(state, action);
    case RESET_RADIAL_DATA:
      return resetRadialData(state, action);
    case RESET_BAR_DATA_BY_INVESTMENT_FOCUS:
      return resetBarDataByInvestmentFocus(state, action);
    case RESET_SANKEYCHART_DATA:
      return resetSankeyChartData(state, action);
    case RESET_OVERVIEW_DATA:
      return resetOverviewData(state, action);
    case RESET_LEVERAGE_DATA:
      return resetLeverageData(state, action);
    case FILTER_TIMELINE_DATA:
      return filterTimelineData(state, action);
    case FILTER_LEVERAGE_DATA_FOR_BARCLICK:
      return filterLeverageDataOnClick(state, action);
    case FILTER_BENEFBUDGET_DATA_FOR_BARCLICK:
      return filterBenefBudgetDataonClick(state, action);
    case FILTER_MAPDATA_CHOROPLETH:
      return filterMapdataChoropleth(state, action);
    case GET_PARTNERSHIP_TIMELINE_DATA_API:
      return getPartnershipTimelineData(state, action);
    // case GET_MAP_DATA:
    //   return getMapData(state, action);
    default:
      return state;
  }
}
