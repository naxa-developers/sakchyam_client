/* eslint-disable array-callback-return */
import {
  GET_MFS_INNOVATIONLIST,
  GET_MFS_ACHIEVEMENTLIST,
  GET_MFS_PARTNERLIST,
  GET_MFS_LIST_SUCCESS,
  GET_MFS_LIST_REQUEST,
  FILTER_MFS_LIST_BY_PARTNERINSTITUTION,
  FILTER_MFS_CHOROPLETH_DATA,
} from '../actions/index.actions';

const getUniqueValuesFromArray = (array, key) => {
  const uniqueValueArray = [...new Set(array.map(item => item[key]))];
  return uniqueValueArray;
};
const initialState = {
  mfsListAllData: [],
  mfsListLoading: false,
  achievementList: [],
  partnerList: [],
  mfsChoroplethData: [],
};
const getMfsListSuccess = (state, action) => {
  return {
    ...state,
    mfsListAllData: action.payload,
    mfsListLoading: false,
  };
};
const getMfsListRequest = (state, action) => {
  return {
    ...state,
    mfsListLoading: true,
  };
};
const getMfsAchievementList = (state, action) => {
  //   console.log(action.payload, 'achievement');
  const mfsData = [...action.payload];
  const achievementList = getUniqueValuesFromArray(
    mfsData,
    'achievement_type',
  );
  return {
    ...state,
    achievementList,
  };
};
const getMfsInnovationList = (state, action) => {
  const mfsData = [...action.payload];
  const innovationList = getUniqueValuesFromArray(
    mfsData,
    'key_innovation',
  );
  return {
    ...state,
    innovationList,
  };
};
const getMfsPartnerList = (state, action) => {
  const mfsData = [...action.payload];
  const partnerList = [];
  mfsData.map(mf => {
    const index = partnerList.findIndex(
      x => x.partner_id === mf.partner_id,
    );
    if (index === -1) {
      partnerList.push(mf);
    }
  });

  return {
    ...state,
    partnerList,
  };
};
const filterMfsListByPartner = (state, action) => {
  const mfsData = [...state.mfsListAllData];
  const selectedPartner = action.payload;

  const filteredMfsData = mfsData.filter(data => {
    if (selectedPartner !== '') {
      return data.partner_name === selectedPartner;
    }
    return data;
  });

  const innovationList = getUniqueValuesFromArray(
    filteredMfsData,
    'key_innovation',
  );
  const achievementList = getUniqueValuesFromArray(
    filteredMfsData,
    'achievement_type',
  );
  return {
    ...state,
    innovationList,
    achievementList,
  };
};
const filterMfsChoroplethData = (state, action) => {
  const {
    selectedPartner,
    selectedInnovation,
    selectedAchievement,
  } = action.payload;
  const mfsData = [...state.mfsListAllData];
  const filteredChoroplethData = mfsData.filter(data => {
    return data.achievement_type === selectedAchievement;
  });
  // const filteredMfsData = mfsData.filter(data => {
  //   if (selectedPartner !== '') {
  //     return data.partner_name === selectedPartner;
  //   }
  //   return data;
  // });

  // const innovationList = getUniqueValuesFromArray(
  //   filteredMfsData,
  //   'key_innovation',
  // );
  // const achievementList = getUniqueValuesFromArray(
  //   filteredMfsData,
  //   'achievement_type',
  // );
  console.log(filteredChoroplethData);
  return {
    ...state,
    mfsChoroplethData: filteredChoroplethData,
  };
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MFS_LIST_REQUEST:
      return getMfsListRequest(state, action);
    case GET_MFS_LIST_SUCCESS:
      return getMfsListSuccess(state, action);
    case GET_MFS_INNOVATIONLIST:
      return getMfsInnovationList(state, action);
    case GET_MFS_ACHIEVEMENTLIST:
      return getMfsAchievementList(state, action);
    case GET_MFS_PARTNERLIST:
      return getMfsPartnerList(state, action);
    case FILTER_MFS_LIST_BY_PARTNERINSTITUTION:
      return filterMfsListByPartner(state, action);
    case FILTER_MFS_CHOROPLETH_DATA:
      return filterMfsChoroplethData(state, action);
    // case GET_PROJECT_LIST_DATA:
    //   return getProjectListData(state, action);

    // case GET_MAP_DATA:
    //   return getMapData(state, action);
    default:
      return state;
  }
}
