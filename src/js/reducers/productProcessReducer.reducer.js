import { GET_PRODUCT_PROCESS_LIST } from '../actions/index.actions';

const initialState = {
  // leftsidebar options
  productProcessList: [],
  innovationAreaList: [],
  productCategoryList: [],
  productNameList: [],
  partnerTypeList: [],
  partnerNameList: [],
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
  // const innovationAreaList = [
  //   ...new Set(data.map(item => item.innovation_area)),
  // ];
  // const productCategoryList = [
  //   ...new Set(data.map(item => item.product_category)),
  // ];
  // const productNameList = [
  //   ...new Set(data.map(item => item.product_name)),
  // ];
  // const partnerTypeList = [
  //   ...new Set(data.map(item => item.partner_type)),
  // ];
  // const partnerNameList = [
  //   ...new Set(data.map(item => item.partner_name)),
  // ];
  // const marketFailureList = [
  //   ...new Set(data.map(item => item.market_failure)),
  // ];

  const innovationAreaList = [];
  const productCategoryList = [];
  const productNameList = [];
  const partnerTypeList = [];
  const partnerNameList = [];
  const marketFailureList = [];

  data.map(item => {
    const obj1 = innovationAreaList.some(
      i => i.name === item.innovation_area,
    );
    const obj2 = productCategoryList.some(
      j => j.name === item.product_category,
    );
    const obj3 = productNameList.some(
      k => k.name === item.product_name,
    );
    const obj4 = partnerTypeList.some(
      l => l.name === item.partner_type,
    );
    const obj5 = partnerNameList.some(
      m => m.name === item.partner_name,
    );
    const obj6 = marketFailureList.some(
      n => n.name === item.market_failure,
    );

    if (!obj1)
      innovationAreaList.push({
        id: item.id,
        name: item.innovation_area,
      });
    if (!obj2)
      productCategoryList.push({
        id: item.id,
        name: item.product_category,
      });
    if (!obj3)
      productNameList.push({ id: item.id, name: item.product_name });
    if (!obj4)
      partnerTypeList.push({ id: item.id, name: item.partner_type });
    if (!obj5)
      partnerNameList.push({
        id: item.id,
        name: item.partner_name,
      });
    if (!obj6)
      marketFailureList.push({
        id: item.id,
        name: item.market_failure,
      });
  });

  console.log(productNameList, 'innovation area');

  return {
    ...state,
    innovationAreaList,
    productCategoryList,
    productNameList,
    partnerTypeList,
    partnerNameList,
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
