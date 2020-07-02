import { GET_PRODUCT_PROCESS_LIST } from '../actions/index.actions';

const initialState = {
  // leftsidebar options
  productProcessList: [],
  innovationAreaList: [],
  productCategoryList: [],
  productNameList: [],
  partnerTypeList: [],
  partnerInstitutionList: [],
  marketFailureList: [],
};

// const getDistinctObjectItems = name => {
//   const result = [];
//   for (const item of array) {
//     if (!map.has(item.id)) {
//       map.set(item.id, true); // set any value to Map
//       result.push({
//         id: item.id,
//         name: item.name,
//       });
//     }
//   }
//   return result;
// };

// GET LEFTSIDEBAR OPTIONS FROM A SINGLE API
const getProductProcessList = (state, action) => {
  const data = action.payload;

  // GET UNIQUE VALUES FROM API
  const innovationAreaList = [
    ...new Set(data.map(item => item.innovation_area)),
  ];
  const productCategoryList = [
    ...new Set(data.map(item => item.product_category)),
  ];
  const productNameList = [
    ...new Set(data.map(item => item.product_name)),
  ];
  const partnerTypeList = [
    ...new Set(data.map(item => item.partner_type)),
  ];
  const partnerInstitutionList = [
    ...new Set(data.map(item => item.partner_name)),
  ];
  const marketFailureList = [
    ...new Set(data.map(item => item.market_failure)),
  ];

  return {
    ...state,
    innovationAreaList,
    productCategoryList,
    productNameList,
    partnerTypeList,
    partnerInstitutionList,
    marketFailureList,
    // productProcessList: action.payload,
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_PROCESS_LIST:
      return getProductProcessList(state, action);
    default:
      return state;
  }
}
