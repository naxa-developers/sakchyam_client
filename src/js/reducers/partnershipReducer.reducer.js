import {
  GET_PROJECT_LIST_DATA,
  GET_PARTNERSHIP_INVESTMENT_FOCUS,
  GET_MAP_DATA_BY_PROVINCE,
  GET_MAP_DATA_BY_DISTRICT,
  GET_MAP_DATA_BY_MUNICIPALITY,
  GET_FILTERED_MAP_DATA,
  GET_RADIAL_DATA,
  GET_PARTNERSHIP_PARTNERS_LIST,
  FILTER_PARTNERSHIP_PARTNERS_LIST_BY_PARTNER_TYPE,
} from '../actions/index.actions';

const initialState = {
  isDataFetched: false,
  partnershipInvestmentFocus: [],
  partnersList: [],
  projectLists: [],
  mapDataByProvince: [],
  mapDataByDistrict: [],
  mapDataByMunicipality: [],
  radialData: [],
  filteredPartnerList: [],
};

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
const getMapDataByProvince = (state, action) => {
  const choroplethFormat = action.payload.map(data => {
    return {
      id: data.code,
      count: data.allocated_budget
        ? data.allocated_budget
        : data.allocated_beneficiary,
    };
  });
  return {
    ...state,
    mapDataByProvince: choroplethFormat,
    filteredMapData: choroplethFormat,
  };
};
const getMapDataByDistrict = (state, action) => {
  const choroplethFormat = action.payload.map(data => {
    return {
      id: data.code,
      count: data.allocated_budget
        ? data.allocated_budget
        : data.allocated_beneficiary,
    };
  });
  return {
    ...state,
    mapDataByDistrict: choroplethFormat,
  };
};
const getMapDataByMunicipality = (state, action) => {
  const choroplethFormat = action.payload.map(data => {
    return {
      id: data.code,
      count: data.allocated_budget
        ? data.allocated_budget
        : data.allocated_beneficiary,
    };
  });
  return {
    ...state,
    mapDataByMunicipality: choroplethFormat,
  };
};
const getFilteredMapDataChoropleth = (state, action) => {
  // if (action.payload.selectedFederalType) {
  //   if (action.payload.selectedFederalType === 'province') {
  //     return {
  //       ...state,
  //       filteredMapData: state.mapDataByProvince,
  //     };
  //   }
  //   if (action.payload.selectedFederalType === 'district') {
  //     return {
  //       ...state,
  //       filteredMapData: state.mapDataByDistrict,
  //     };
  //   }
  //   if (action.payload.selectedFederalType === 'municipality') {
  //     return {
  //       ...state,
  //       filteredMapData: state.mapDataByMunicipality,
  //     };
  //   }
  // }
  const choroplethFormat = action.payload.map(data => {
    return {
      id: data.code,
      count: data.allocated_budget
        ? data.allocated_budget
        : data.allocated_beneficiary,
    };
  });
  return {
    ...state,
    filteredMapData: choroplethFormat,
  };
};

const getRadialData = (state, action) => {
  return {
    ...state,
    radialData: action.payload,
  };
};

const filterPartnersListByPartner = (state, action) => {
  return {
    ...state,
    filteredPartnerList: action.payload,
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
    case GET_RADIAL_DATA:
      return getRadialData(state, action);

    default:
      return state;
  }
}
