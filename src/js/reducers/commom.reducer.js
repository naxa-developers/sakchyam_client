import * as actions from '../actions/index.actions';

const initialState = {
  allProvinceList: [],
  allDistrictList: [],
  allMunicipalityList: [],
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

const getMapDataByProvince = (state, action) => {
  return {
    ...state,
    filteredMapData: action.payload,
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

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALLPROVINCENAME_DATA:
      return getProvinceData(state, action);
    case actions.GET_ALLDISTRICTNAME_DATA:
      return getDistrictData(state, action);
    case actions.GET_ALLMUNICIPALITYNAME_DATA:
      return getMunicipalityData(state, action);

    default:
      return state;
  }
}
