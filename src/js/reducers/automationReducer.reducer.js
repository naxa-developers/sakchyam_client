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
} from '../actions/index.actions';

const initialState = {
  automationAllDataByPartner: [],
  automationDataByProvince: [],
  automationDataByDistrict: [],
  automationDataByMunicipality: [],
  automationChoroplethData: [],
  automationLeftSidePartnerData: [],
  automationRightSidePartnerData: [],
  allProvinceName: [],
  allDistrictName: [],
  allMunicipalityName: [],
  dataLoading: true,
};

const partnerForChoropleth = (state, action) => {
  console.log(action.payload, 'payload');
  // const allData = [];
  const leftsideData = action.payload[0].partner_data;
  // const choroplethData = action.payload.map(data => {
  //   allData.push({ id: data.id, count: data.num_tablet_deployed });
  //   return true;
  // });
  return {
    ...state,
    automationAllDataByPartner: action.payload,
    automationLeftSidePartnerData: leftsideData,
    automationRightSidePartnerData: action.payload,
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
  console.log(action.payload, 'payload');
  const fullData = [];
  const choroplethProvinceData = action.payload.map(data => {
    fullData.push({ id: data.code, count: data.num_tablet_deployed });
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
    fullData.push({ id: data.code, count: data.num_tablet_deployed });
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
    fullData.push({ id: data.code, count: data.num_tablet_deployed });
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
    fullData.push({ id: data.code, count: data.num_tablet_deployed });
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
  return {
    ...state,
    automationRightSidePartnerData: action.payload,
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
    case FILTER_AUTOMATION_DATA_FOR_VECTORTILES:
      return filterAutomationDataForVectorTile(state, action);
    case FILTER_DISTRICT_FROM_PROVINCE_COLOR:
      return filterDistrictFromProvinceColor(state, action);

    case GET_SEARCHED_PARTNERS:
      return searchPartnersWithKeyword(state, action);

    case FILTER_PARTNERS_SELECT:
      return filterPartnerSelect(state, action);

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
    // case TOGGLE_NULL_SUBMISSIONS_ANSWER:
    //   return toggleNullSubmission(state);
    default:
      return state;
  }
}
