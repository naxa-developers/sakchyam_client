import {
  GET_AUTOMATION_DATA_BY_PARTNER,
  GET_AUTOMATION_DATA_BY_PROVINCE,
  GET_AUTOMATION_DATA_BY_DISTRICT,
  GET_AUTOMATION_DATA_BY_MUNICIPALITY,
  FILTER_AUTOMATION_DATA_FOR_VECTORTILES,
  FILTER_DISTRICT_FROM_PROVINCE_COLOR,
} from '../actions/index.actions';

const initialState = {
  automationDataByPartner: [],
  automationDataByProvince: [],
  automationDataByDistrict: [],
  automationDataByMunicipality: [],
  automationChoroplethData: [],
  dataLoading: true,
};

const partnerForChoropleth = (state, action) => {
  const allData = [];
  const choroplethData = action.payload.map(data => {
    allData.push({ id: data.id, count: data.num_tablet_deployed });
    return true;
  });
  return {
    ...state,
    automationDataByPartner: allData,
  };
};
const partnerByProvinceForChoropleth = (state, action) => {
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
    automationDataByProvince: fullData,
    dataLoading: false,
  };
};
const partnerByDistrictForChoropleth = (state, action) => {
  console.log('partnerDistrict GET');
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
  console.log('GET Municipalit');
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

  if (stateLevel === 'district') {
    console.log('district reducer');
    return {
      ...state,
      automationChoroplethData: automationDataByDistrict,
      dataLoading: false,
    };
  }
  if (stateLevel === 'municipality') {
    console.log('municiplaity reducer');
    return {
      ...state,
      automationChoroplethData: automationDataByMunicipality,
      dataLoading: false,
    };
  }
  console.log('province  reducer');
  return {
    ...state,
    automationChoroplethData: automationDataByProvince,
    dataLoading: false,
  };
};
const filterDistrictFromProvinceColor = (state, action) => {
  // console.log(action.payload, 'payload');
  console.log('Color Reducer Filter');
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
    // case TOGGLE_NULL_SUBMISSIONS_ANSWER:
    //   return toggleNullSubmission(state);
    default:
      return state;
  }
}
