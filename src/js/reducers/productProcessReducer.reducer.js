/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
/* eslint-disable camelcase */
import { GET_PRODUCT_PROCESS_LIST } from '../actions/index.actions';

const initialState = {
  // LEFTSIDEBAR OPTIONS
  productProcessList: [],
  innovationAreaList: [],
  productCategoryList: [],
  productNameList: [],
  partnerTypeList: [],
  partnerNameList: [],
  marketFailureList: [],
};

const getOverviewData = data => {
  const innovationAreaCount = [
    ...new Set(data.map(item => item.innovation_area)),
  ].length;
  const partnerInstitutionCount = [
    ...new Set(data.map(item => item.partner_name)),
  ].length;
  const productCount = [
    ...new Set(data.map(item => item.product_name)),
  ].length;

  return {
    innovationAreaCount,
    partnerInstitutionCount,
    productCount,
  };
};

const generateBubbleChartData = data => {
  const arr1 = [];
  const arr2 = [];
  const arr3 = [];

  data.forEach(item => {
    const obj = arr1.some(i => i.name === item.innovation_area);
    if (!obj) {
      arr1.push({
        id: 'innovation_area',
        name: item.innovation_area,
        children: [
          {
            id: 'product_category',
            name: item.product_category,
            children: [],
          },
        ],
      });
    } else {
      const objIndex = arr1.findIndex(
        p => p.name === item.innovation_area,
      );
      const obj1 = arr1[objIndex].children.some(
        j => j.name === item.product_category,
      );
      if (!obj1) {
        arr1[objIndex].children.push({
          id: 'product_category',
          name: item.product_category,
          children: [],
        });
      }
    }
  });

  data.forEach(item => {
    const obj = arr2.some(i => i.name === item.product_category);
    if (!obj) {
      arr2.push({
        // id: 'product_category',
        name: item.product_category,
        children: [
          {
            // id: 'partner_type',
            name: item.partner_type,
          },
        ],
      });
    } else {
      const objIndex = arr2.findIndex(
        p => p.name === item.product_category,
      );
      const obj1 = arr2[objIndex].children.some(
        j => j.name === item.partner_type,
      );
      if (!obj1) {
        arr2[objIndex].children.push({
          // id: 'partner_type',
          name: item.partner_type,
        });
      }
    }
  });

  data.forEach(item => {
    const obj = arr3.some(i => i.name === item.partner_type);
    if (!obj) {
      arr3.push({
        // id: 'partner_type',
        name: item.partner_type,
        children: [
          {
            // id: 'partner_name',
            name: item.partner_name,
            value: 1,
          },
        ],
      });
    } else {
      const objIndex = arr3.findIndex(
        i => i.name === item.partner_type,
      );
      const obj1 = arr3[objIndex].children.some(
        j => j.name === item.partner_name,
      );
      // arr3[objIndex].children[0].value += 1;
      if (!obj1) {
        arr3[objIndex].children.push({
          // id: 'partner_name',
          name: item.partner_name,
          value: 1,
        });
      } else {
        const objIndex1 = arr3[objIndex].children.findIndex(
          k => k.name === item.partner_name,
        );
        arr3[objIndex].children[objIndex1].value += 1;
      }
    }
  });

  const arr = [...arr1];

  arr.forEach(x => {
    arr2.forEach(y => {
      arr3.forEach(z => {
        x.children.forEach(a => {
          y.children.forEach(b => {
            if (a.name === y.name && b.name === z.name) {
              a.children.push(z);
            }
          });
        });
      });
    });
  });

  return { name: 'bubble', color: '', children: arr };
};

const generateHeatMapData = data => {
  const arr = [];
  const name = [];
  const series = [];

  const innovation_area = [
    ...new Set(data.map(item => item.innovation_area)),
  ];
  const market_failure = [
    ...new Set(data.map(item => item.market_failure)),
  ];

  // data.forEach(item => {
  //   innovation_area.forEach(i => {
  //     if (i === item.innovation_area) {
  //       series.push({
  //         x: j,
  //       });
  //     }
  //   });
  // });

  market_failure.forEach(j => {
    arr.push({ x: j });
  });

  innovation_area.forEach(item => {
    series.push({ name: item, data: arr });
  });

  data.forEach(item => {
    series.forEach((i, index1) => {
      if (item.innovation_area === i.name) {
        i.data.forEach((j, index2) => {
          if (item.market_failure === j.x) {
            const obj = j.hasOwnProperty('y');
            if (!obj) {
              i.data[index2] = { ...j, y: 1 };
            } else {
              i.data[index2].y += 1;
            }
          }
        });
      }
    });
  });

  return series;
};

// GET LEFTSIDEBAR OPTIONS FROM A SINGLE API
const getProductProcessList = (state, action) => {
  const data = action.payload;

  const bubbleChartData = generateBubbleChartData(data);
  const heatMapData = generateHeatMapData(data);

  // GET UNIQUE VALUES FROM API
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
    return true;
  });

  const overviewData = getOverviewData(data);

  return {
    ...state,
    innovationAreaList,
    productCategoryList,
    productNameList,
    partnerTypeList,
    partnerNameList,
    marketFailureList,
    bubbleChartData,
    overviewData,
    heatMapData,
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
