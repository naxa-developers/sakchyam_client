import {
  GET_AUTOMATION_DATA_BY_PARTNER,
  GET_AUTOMATION_DATA_BY_PROVINCE,
} from '../actions/index.actions';

const initialState = {
  automationDataByPartner: [],
  automationDataByProvince: [],
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
  return {
    ...state,
    automationDataByProvince: fullData,
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AUTOMATION_DATA_BY_PARTNER:
      return partnerForChoropleth(state, action);
    case GET_AUTOMATION_DATA_BY_PROVINCE:
      return partnerByProvinceForChoropleth(state, action);
    // case TOGGLE_NULL_SUBMISSIONS_ANSWER:
    //   return toggleNullSubmission(state);
    default:
      return state;
  }
}
