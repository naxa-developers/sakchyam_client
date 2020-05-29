import { marker } from 'leaflet';
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
  GET_AUTOMATION_BRANCHES_TABLE_DATA,
  GET_AUTOMATION_BRANCHES_TABLE_DATA_BY_FEDERAL,
  GET_AUTOMATION_BRANCHES_TABLE_DATA_BY_PARTNER,
  FILTER_PARTNERS_BY_FEDERAL_WITH_CLICKEDPARTNERS,
  PARTNER_SELECT_WITH_OUTREACH_GET_PARTNER_CHOROPLETHDATA,
  SELECT_AUTOMATION_DATA_BY_PROVINCE,
  SELECT_AUTOMATION_DATA_BY_DISTRICT,
  SELECT_AUTOMATION_DATA_BY_MUNICIPALITY,
  GET_TIMELINE_DATA,
  TIMELINE_FILTER,
} from '../actions/index.actions';

const initialState = {
  automationAllDataByPartner: [],
  automationDataByProvince: [],
  automationDataByDistrict: [],
  automationDataByMunicipality: [],
  automationChoroplethData: [],
  automationLeftSidePartnerData: [],
  automationRightSidePartnerData: [],
  automationTableData: [],
  allProvinceName: [],
  allDistrictName: [],
  allMunicipalityName: [],
  dataLoading: true,
  tableDataLoading: true,
  filteredMapBoundaryData: [],
  timeLineData: [],
};

const partnerForChoropleth = (state, action) => {
  // console.log(action.payload, 'payload');
  // const allData = [];
  const leftsideData = action.payload[0].partner_data;
  leftsideData.sort(function(a, b) {
    const nameA = a.partner_name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.partner_name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  // console.log(leftsideData);
  // const choroplethData = action.payload.map(data => {
  //   allData.push({ id: data.id, count: data.num_tablet_deployed });
  //   return true;
  // });
  let partnerData = action.payload[0].partner_data.map(data => {
    return data.tablets_deployed;
  });
  const partnerName = action.payload[0].partner_data.map(data => {
    return data.partner_name;
  });
  if (action.payload[0].partner_data.length < 1) {
    partnerData = [0];
  }
  return {
    ...state,
    automationAllDataByPartner: action.payload,
    automationLeftSidePartnerData: leftsideData,
    automationRightSidePartnerData: {
      0: {
        ...action.payload[0],
        tabletsGraphData: partnerData,
        tabletsGraphLabel: partnerName,
      },
    },
  };
};
// const partnerForChoropleth = (state, action) => {
//   const allData = [];
//   const choroplethData = action.payload.map(data => {
//     allData.push({ id: data.id, count: data.num_tablet_deployed });
//     return true;
//   });
//   return {
//     ...state,
//     automationAllDataByPartner: allData,
//   };
// };
const partnerByProvinceForChoropleth = (state, action) => {
  // console.log(action.payload, 'payload');
  const fullData = [];
  const choroplethProvinceData = action.payload.map(data => {
    // console.log(data, '12st');
    fullData.push({ id: data.code, count: data.tablets_deployed });
    return true;
  });
  // console.log(fullData, 'without Sort');
  fullData.sort(function(a, b) {
    return a.id - b.id;
  });
  // console.log(fullData, 'sortedFull');
  return {
    ...state,
    automationDataByProvince: fullData,
    dataLoading: false,
  };
};
const partnerByDistrictForChoropleth = (state, action) => {
  // console.log('partnerDistrict GET');
  //   console.log(action.payload, 'payload');
  const fullData = [];
  const choroplethProvinceData = action.payload.map(data => {
    fullData.push({ id: data.code, count: data.tablets_deployed });
    return true;
  });
  // console.log(fullData, 'without Sort');
  fullData.sort(function(a, b) {
    return a.id - b.id;
  });
  // console.log(fullData, 'sortedFull');
  return {
    ...state,
    automationDataByDistrict: fullData,
    dataLoading: false,
  };
};
const partnerByMunicipalityForChoropleth = (state, action) => {
  // console.log(action.payload, 'payload');
  // console.log('GET Municipalit');
  const fullData = [];
  const choroplethProvinceData = action.payload.map(data => {
    fullData.push({
      id: data.code,
      count: data.tablets_deployed,
    });
    return true;
  });
  // console.log(fullData, 'without Sort');
  fullData.sort(function(a, b) {
    return a.id - b.id;
  });
  // console.log(fullData, 'sortedFull');
  return {
    ...state,
    automationDataByMunicipality: fullData,
    automationChoroplethData: fullData,
    dataLoading: false,
  };
};
const filterAutomationDataForVectorTile = (state, action) => {
  const stateLevel = action.payload;
  const {
    automationDataByProvince,
    automationDataByDistrict,
    automationDataByMunicipality,
  } = state;

  if (stateLevel === 'province') {
    // console.log('province reducer');
    return {
      ...state,
      automationChoroplethData: automationDataByProvince,
      dataLoading: false,
    };
  }
  if (stateLevel === 'district') {
    // console.log('district reducer');
    return {
      ...state,
      automationChoroplethData: automationDataByDistrict,
      dataLoading: false,
    };
  }
  if (stateLevel === 'municipality') {
    // console.log('municiplaity reducer');
    return {
      ...state,
      automationChoroplethData: automationDataByMunicipality,
      dataLoading: false,
    };
  }
  // console.log('province  reducer');
  return {
    ...state,
    automationChoroplethData: automationDataByMunicipality,
    dataLoading: false,
  };
};
const filterDistrictFromProvinceColor = (state, action) => {
  // console.log(action.payload, 'payload');
  // console.log('Color Reducer Filter');
  const fullData = [];
  const choroplethProvinceData = action.payload.map(data => {
    fullData.push({
      id: data.code,
      count: data.tablets_deployed,
    });
    return true;
  });
  // console.log(fullData, 'without Sort');
  fullData.sort(function(a, b) {
    return a.id - b.id;
  });
  // console.log(fullData, 'sortedFull');
  return {
    ...state,
    automationChoroplethData: fullData,
    dataLoading: false,
  };
};

const filterPartnerSelect = (state, action) => {
  // console.log(action.payload, 'filterPartnerSelect');
  const { automationRightSidePartnerData } = state;
  action.payload[0].partner_data.sort(function(a, b) {
    const nameA = a.partner_name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.partner_name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  let partnerData = action.payload[0].partner_data.map(data => {
    return data.tablets_deployed;
  });
  const partnerName = action.payload[0].partner_data.map(data => {
    return data.partner_name;
  });
  // console.log(
  //   {
  //     automationRightSidePartnerData: [action.payload[0]],
  //   },
  //   'a',
  // );
  // console.log(
  //   {
  //     automationRightSidePartnerData: {
  //       0: {
  //         ...action.payload[0],
  //         tabletsGraphData: a,
  //       },
  //     },
  //   },
  //   'b',
  // );
  if (action.payload[0].partner_data.length < 1) {
    partnerData = [0];
  }
  return {
    ...state,
    automationRightSidePartnerData: {
      0: {
        ...action.payload[0],
        tabletsGraphData: partnerData,
        tabletsGraphLabel: partnerName,
      },
    },
  };
};

const getProvinceData = (state, action) => {
  return {
    ...state,
    allProvinceName: action.payload,
  };
};
const getDistrictData = (state, action) => {
  return {
    ...state,
    allDistrictName: action.payload,
  };
};
const getMunicipalityData = (state, action) => {
  return {
    ...state,
    allMunicipalityName: action.payload,
  };
};

const districtDataFromProvince = (state, action) => {
  return {
    ...state,
    allDistrictName: action.payload,
  };
};
const municipalityDataFromDistrict = (state, action) => {
  return {
    ...state,
    allMunicipalityName: action.payload,
  };
};

const searchPartnersWithKeyword = (state, action) => {
  const filteredLeftSideData = state.automationAllDataByPartner[0].partner_data.filter(
    data => {
      return data.partner_name
        .toUpperCase()
        .includes(action.payload.toUpperCase());
    },
  );
  return {
    ...state,
    automationLeftSidePartnerData: filteredLeftSideData,
  };
};
const filterPartnerByFederal = (state, action) => {
  const leftsideData = action.payload[0].partner_data;
  // const choroplethData = action.payload.map(data => {
  //   allData.push({ id: data.id, count: data.num_tablet_deployed });
  //   return true;
  // });
  leftsideData.sort(function(a, b) {
    const nameA = a.partner_name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.partner_name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  let partnerData = action.payload[0].partner_data.map(data => {
    return data.tablets_deployed;
  });
  const partnerName = action.payload[0].partner_data.map(data => {
    return data.partner_name;
  });
  if (action.payload[0].partner_data.length < 1) {
    partnerData = [0];
  }
  return {
    ...state,
    automationAllDataByPartner: action.payload,
    automationLeftSidePartnerData: leftsideData,
    automationRightSidePartnerData: {
      0: {
        ...action.payload[0],
        tabletsGraphData: partnerData,
        tabletsGraphLabel: partnerName,
      },
    },
  };
};
const getAutomationDataForTable = (state, action) => {
  return {
    ...state,
    automationTableData: action.payload,
    // tableDataLoading: false,
  };
};
const getAutomationDataForTableByFederal = (state, action) => {
  return {
    ...state,
    automationTableData: action.payload,
    // tableDataLoading: false,
  };
};
const getAutomationDataForTableByPartner = (state, action) => {
  return {
    ...state,
    automationTableData: action.payload,
    // tableDataLoading: false,
  };
};
const filterPartnerByFederalwithClickedPartners = (state, action) => {
  const a = action.payload.map(data => {
    return { id: data.code, count: data.tablets_deployed };
  });
  // console.log(a, 'a');
  return {
    ...state,
    filteredMapBoundaryData: action.payload,
    automationChoroplethData: a,
    // automationTableData: action.payload,
    // tableDataLoading: false,
  };
};
const partnerSelectWithOutreachGetPartnerChoropleth = (
  state,
  action,
) => {
  const a = action.payload.result.map(data => {
    return { id: data.code, count: data.tablets_deployed };
  });
  const allData = [];
  // eslint-disable-next-line array-callback-return
  // const c = action.payload.selectedPartner.map(partner => {
  //   state.automationLeftSidePartnerData.filter(data => {
  //     console.log(data.partner_id, 'id');
  //     console.log(partner, 'partner');
  //     return data.id === partner ? allData.push(data) : null;
  //   });
  // });
  const c = state.automationLeftSidePartnerData.filter(
    // eslint-disable-next-line camelcase
    ({ partner_id }) =>
      action.payload.selectedPartner.includes(partner_id),
  );
  return {
    ...state,
    automationChoroplethData: a,
    // automationLeftSidePartnerData: c,
    // automationTableData: action.payload,
    // tableDataLoading: false,
  };
};
const selectProvinceForChoropleth = (state, action) => {
  return {
    ...state,
    automationChoroplethData: state.automationDataByProvince,
  };
};
const selectDistrictForChoropleth = (state, action) => {
  return {
    ...state,
    automationChoroplethData: state.automationDataByDistrict,
  };
};
const selectMunicipalityForChoropleth = (state, action) => {
  return {
    ...state,
    automationChoroplethData: state.automationDataByMunicipality,
  };
};
const getTimelineData = (state, action) => {
  return {
    ...state,
    timeLineData: action.payload,
  };
};
const timeLineFilter = (state, action) => {
  const minRange = action.payload.min;
  const maxRange = action.payload.max;
  // console.log(minRange, 'minRange');
  // console.log(maxRange, 'maxRange');
  const markerData = state.automationAllDataByPartner;
  // console.log(markerData, 'MarkerData');
  const filteredDataByYear =
    markerData &&
    markerData[0] &&
    markerData[0].partner_data.filter(data => {
      const dataDate = new Date(`${data.date}`).getTime();
      return dataDate >= minRange && dataDate <= maxRange;
    });
  // console.log(a, 'a');
  return {
    ...state,
    automationLeftSidePartnerData: filteredDataByYear,
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AUTOMATION_DATA_BY_PARTNER:
      return partnerForChoropleth(state, action);
    case GET_AUTOMATION_DATA_BY_PROVINCE:
      return partnerByProvinceForChoropleth(state, action);
    case GET_AUTOMATION_DATA_BY_DISTRICT:
      return partnerByDistrictForChoropleth(state, action);
    case GET_AUTOMATION_DATA_BY_MUNICIPALITY:
      return partnerByMunicipalityForChoropleth(state, action);

    case SELECT_AUTOMATION_DATA_BY_PROVINCE:
      return selectProvinceForChoropleth(state, action);
    case SELECT_AUTOMATION_DATA_BY_DISTRICT:
      return selectDistrictForChoropleth(state, action);
    case SELECT_AUTOMATION_DATA_BY_MUNICIPALITY:
      return selectMunicipalityForChoropleth(state, action);

    case FILTER_AUTOMATION_DATA_FOR_VECTORTILES:
      return filterAutomationDataForVectorTile(state, action);
    case FILTER_DISTRICT_FROM_PROVINCE_COLOR:
      return filterDistrictFromProvinceColor(state, action);

    case GET_SEARCHED_PARTNERS:
      return searchPartnersWithKeyword(state, action);

    case FILTER_PARTNERS_SELECT:
      return filterPartnerSelect(state, action);
    case FILTER_PARTNERS_BY_FEDERAL:
      return filterPartnerByFederal(state, action);
    case FILTER_PARTNERS_BY_FEDERAL_WITH_CLICKEDPARTNERS:
      return filterPartnerByFederalwithClickedPartners(state, action);

    case GET_ALLPROVINCENAME_DATA:
      return getProvinceData(state, action);
    case GET_ALLDISTRICTNAME_DATA:
      return getDistrictData(state, action);
    case GET_ALLMUNICIPALITYNAME_DATA:
      return getMunicipalityData(state, action);

    case GET_DISTRICTDATA_BY_PROVINCE:
      return districtDataFromProvince(state, action);
    case GET_MUNICIPALITYDATA_BY_DISTRICT:
      return municipalityDataFromDistrict(state, action);

    case GET_AUTOMATION_BRANCHES_TABLE_DATA:
      return getAutomationDataForTable(state, action);
    case GET_AUTOMATION_BRANCHES_TABLE_DATA_BY_FEDERAL:
      return getAutomationDataForTableByFederal(state, action);
    case GET_AUTOMATION_BRANCHES_TABLE_DATA_BY_PARTNER:
      return getAutomationDataForTableByPartner(state, action);
    case PARTNER_SELECT_WITH_OUTREACH_GET_PARTNER_CHOROPLETHDATA:
      return partnerSelectWithOutreachGetPartnerChoropleth(
        state,
        action,
      );
    case GET_TIMELINE_DATA:
      return getTimelineData(state, action);
    case TIMELINE_FILTER:
      return timeLineFilter(state, action);
    // case TOGGLE_NULL_SUBMISSIONS_ANSWER:
    //   return toggleNullSubmission(state);
    default:
      return state;
  }
}
