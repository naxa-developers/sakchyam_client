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
} from '../actions/index.actions';
import province from '../../data/province.json';
import district from '../../data/district.json';
import municipality from '../../data/municipality.json';

import WebWorker from '../WebWorker/webWorker';
import workerfile from '../WebWorker/worker';

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

function CaculateCount(date, finalData, api, fedType) {
  const startDate = date[0];
  const endDate = date[1];
  // console.log(date, 'date');
  // console.log(finalData, 'finalData');
  // console.log(api, 'api');
  const ProjectIdList = [];
  finalData.map((prov, i) => {
    // console.log(prov, 'prov 1st loop');

    api.map(data => {
      let idString = data.province_id;
      if (fedType === 'municipality') {
        idString = data.municipality_id;
      } else if (fedType === 'district') {
        idString = data.district_id;
      } else {
        idString = data.province_id;
      }
      const parsedDate = Date.parse(data.start_date);
      if (prov.id === idString) {
        if (
          !ProjectIdList.includes(data.project_id + data.province_id)
        ) {
          if (parsedDate >= startDate && parsedDate < endDate) {
            // console.log(data, 'data 3rd Loop');
            // console.log(data,'')
            // eslint-disable-next-line no-param-reassign
            finalData[i].count += 1;
          }
        }
        // console.log(startDate, ' local startDate');
        // console.log(data.start_date, 'api startDate');
        // console.log(endDate, 'endDate');
        // console.log(data.start_date, 'api startDate');
        // console.log(startDate >= data.start_date, '1st date');
        // console.log(endDate <= data.start_date, '2nd date');
      }
      if (!ProjectIdList.includes(data.project_id)) {
        ProjectIdList.push(data.project_id + data.province_id);
      }
      return true;
    });
    return true;
  });
  console.log(finalData, 'finalData');
}
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
  radialData: {},
  spiderChartData: [],
  sankeyChartData: {},
  filteredPartnerList: [],
  barDatas: [],
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
  // console.log(checkProvince, 'check');
  // console.log(datas, 'datas');
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
const filterBeneficiaryBarChartForInvestment = datas => {
  const checkProvince = datas.some(i =>
    i.name.includes('Provincesss'),
  );
  // console.log(checkProvince, 'check');
  // console.log(datas, 'datas');
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
const filterLeverageChart = datas => {
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

  // console.log(summedScfFund, 'scf');
  // console.log(summedLeverage, 'leverage');
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
    name: 'S-CF Fund',
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
    name: 'S-CF Fund',
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
  // console.log(filteredBenefValues, 'filteredBenefValues');
  // console.log(
  filteredBenefValues.series.push(filteredBudgetValues.series[0]);
  // console.log(filteredBenefValues, 'filteredBudgetValues');
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
  // })); // console.log(choroplethFormat, 'formated circleMarker ');
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

const getRadialData = (state, action) => {
  // console.log(action.payload);
  // eslint-disable-next-line array-callback-return
  action.payload.children.map((data, i) => {
    console.log(data, 'datx');
    // eslint-disable-next-line no-param-reassign
    data.color = colorPicker(i + 2);
  });
  if (state.defaultRadialData.name) {
    return {
      ...state,
      radialData: action.payload,
    };
  }
  return {
    ...state,
    radialData: action.payload,
    defaultRadialData: action.payload,
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
    barDatasByInvestment: filteredBenefValues,
    // filteredMapData: choroplethFormat,
  };
  // }
};
// const filterFinancialDataWithAllFiltersOfProvinceOnly = (state, action) => {
//   console.log(action.payload, 'actionPayload');
//   const {
//     selectedDataView,
//     allocatedBudget,
//     totalBeneficiary,
//     femaleBeneficiary,
//   } = action.payload;
//   const totalBudget = [...allocatedBudget];
//   const totalBenef = [...totalBeneficiary];
//   const femaleBenef = [...femaleBeneficiary];
//   // console.log(JSON.stringify(testValues));
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
//   // console.log(obj2, 'finalOBj');
//   const summedBudget = totalBudget.reduce((a, c) => {
//     // console.log(a, 'a');
//     // console.log(c, 'c');

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
//     // console.log(a, 'a');
//     // console.log(c, 'c');

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
//     // console.log(a, 'a');
//     // console.log(c, 'c');

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
//   // console.log(summedScfFund, 'test');
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
//   // console.log(result, 'rest');

//   // }
//   sortArrayByKey(summedBudget, 'code');
//   const filteredBudgetValues = filterBudgetBarChart(summedBudget);
//   // console.log(filteredBenefValues, 'filteredBenefValues');
//   // console.log(
//   filteredBenefValues.series.push(filteredBudgetValues.series[0]);
//   console.log(filteredBenefValues, 'filteredBudgetValues');
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
  console.log(filteredLeverage, 'bardatax');

  return {
    ...state,
    barDataByLeverage: filteredLeverage,
    defaultBarDataByLeverage: filteredLeverage,
  };
};
const filterLeverageData = (state, action) => {
  // console.log(action.payload, 'action');
  const filteredLeverage = filterLeverageChart(action.payload);
  return {
    ...state,
    barDataByLeverage: filteredLeverage,
  };
};
const filterLeverageDataOnClick = (state, action) => {
  // console.log(action.payload, 'action');
  const filteredLeverage = filterLeverageDataForBarClick(
    action.payload,
  );
  return {
    ...state,
    barDataByLeverage: filteredLeverage,
  };
};
const getPartnershipAllData = (state, action) => {
  console.log(action.payload, 'action');
  // const filteredLeverage = filterLeverageChart(action.payload);
  return {
    ...state,
    partnershipAllData: action.payload,
  };
};
const resetBarData = (state, action) => {
  // console.log(action.payload, 'action');
  // const filteredLeverage = filterLeverageChart(action.payload);
  return {
    ...state,
    barDatas: state.defaultBarDatas,
  };
};
const resetRadialData = (state, action) => {
  // console.log(action.payload, 'action');
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
  // console.log(action.payload, 'action');
  // const filteredLeverage = filterLeverageChart(action.payload);
  return {
    ...state,
    sankeyChartData: state.defaultSankeyChartData,
  };
};
const resetOverviewData = (state, action) => {
  // console.log(action.payload, 'action');
  // const filteredLeverage = filterLeverageChart(action.payload);
  return {
    ...state,
    overviewData: state.defaultOveviewData,
  };
};
const resetLeverageData = (state, action) => {
  // console.log(action.payload, 'action');
  // const filteredLeverage = filterLeverageChart(action.payload);
  return {
    ...state,
    barDataByLeverage: state.defaultBarDataByLeverage,
  };
};
const resetBarDataByInvestmentFocus = (state, action) => {
  // console.log(action.payload, 'action');
  // const filteredLeverage = filterLeverageChart(action.payload);
  return {
    ...state,
    barDatasByInvestment: state.defaultBarDatasByInvestment,
  };
};
const filterMapdataChoropleth = (state, action) => {
  // console.log(action.payload, 'action');
  // const filteredLeverage = filterLeverageChart(action.payload);
  return {
    ...state,
    filteredMapData: action.payload,
  };
};
const filterTimelineData = (state, action) => {
  const { min, max, fedtype } = action.payload;
  const { partnershipAllData } = state;
  // const that = this;
  const finalchoroplethData = [];
  // const finalData = [];
  if (fedtype === 'municipality') {
    municipality.map(mun => {
      finalchoroplethData.push({
        id: mun.munid,
        count: 0,
      });
      return true;
    });
  } else if (fedtype === 'district') {
    district.map(mun => {
      finalchoroplethData.push({
        id: mun.districtid,
        count: 0,
      });
      return true;
    });
  } else {
    province.map(mun => {
      finalchoroplethData.push({
        id: mun.FIRST_PROV,
        count: 0,
      });
      return true;
    });
  }
  // const workers = new WebWorker(workerfile);

  // workers.postMessage({
  //   minmax: [min, max],
  //   provincedata,
  //   partnershipAllData,
  // });

  // workers.addEventListener('message', event => {
  //   console.log('message addevenet');
  //   console.log(event, 'event');
  //   // dispatch({
  //   //   type: FILTER_PRIMARYGEOJSON,
  //   //   payload: event.data,
  //   // });
  // });
  // this.worker.postMessage(
  //   [min, max],
  //   provincedata,
  //   partnershipAllData,
  // );
  CaculateCount(
    [min, max],
    finalchoroplethData,
    partnershipAllData,
    fedtype,
  );
  // console.log(action.payload, 'action');
  // const filteredLeverage = filterLeverageChart(action.payload);
  return {
    ...state,
    filteredMapData: finalchoroplethData,
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
    case FILTER_BARDATA_BY_INVESTMENTFOCUS:
      return filterBarDataByInvestmentFocus(state, action);
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
    // case GET_MAP_DATA:
    //   return getMapData(state, action);
    default:
      return state;
  }
}
