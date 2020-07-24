/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
/* eslint-disable camelcase */
import {
  GET_PRODUCT_PROCESS_DATA,
  GET_PRODUCT_PROCESS_LIST,
  FILTER_PRODUCT_NAME_LIST,
  FILTER_PARTNER_NAME_LIST,
  FILTER_RADAR_CHART_DATA,
  FILTER_BAR_CHART_DATA,
  FILTER_HEATMAP_CHART_DATA,
  FILTER_OVERVIEW_DATA_PP,
  FILTER_BUBBLE_CHART_DATA,
  RESET_ALL_CHART_PP,
} from '../actions/index.actions';

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

function convertLabelName(name) {
  const nameArr = name.split(' ');
  let firstElement;
  let rest;
  if (nameArr.length < 3) {
    // eslint-disable-next-line prefer-destructuring
    firstElement = nameArr[0];
    rest = name
      .split(' ')
      .slice(1)
      .join(' ');
  } else {
    firstElement = `${nameArr[0]} ${nameArr[1]}`;
    rest = name
      .split(' ')
      .slice(2)
      .join(' ');
  }

  const newName = [firstElement, rest];

  return newName;
}

function getSelectedOptions(state, options) {
  const {
    innovationAreaList,
    productCategoryList,
    productNameList,
    partnerTypeList,
    partnerNameList,
    marketFailureList,
  } = state;

  let {
    innovationArea,
    partnerName,
    productName,
    productCategory,
    partnerType,
    marketFailure,
  } = options;

  if (innovationArea.length === 0)
    innovationArea = innovationAreaList.map(item => item.name);
  if (partnerName.length === 0)
    partnerName = partnerNameList.map(item => item.name);
  if (productName.length === 0)
    productName = productNameList.map(item => item.name);
  if (productCategory.length === 0)
    productCategory = productCategoryList.map(item => item.name);
  if (partnerType.length === 0)
    partnerType = partnerTypeList.map(item => item.name);
  if (marketFailure.length === 0)
    marketFailure = marketFailureList.map(item => item.name);

  return {
    innovationArea,
    productCategory,
    productName,
    partnerType,
    partnerName,
    marketFailure,
  };
}

const getOptionsList = (data, name) => {
  const arr = [];
  data.forEach(item => {
    const obj = arr.some(i => i.name === item[`${name}`]);
    if (!obj)
      arr.push({
        id: item.id,
        name: item[`${name}`],
      });
  });
  return arr;
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

const generateTimelineData = data => {
  // remove data with null date values
  const filteredData = [];
  data.forEach(item => {
    if (item.date !== null)
      filteredData.push({
        date: item.date,
        name: item.product_name,
      });
  });

  const allYears = [];
  filteredData.filter(item => {
    const year = item.date.substring(0, 4);
    if (!allYears.includes(year)) allYears.push(year);
    return true;
  });

  const a = Math.min(...allYears);
  const b = Math.max(...allYears);
  const years = [];

  let initial = a;
  for (let i = 0; i <= b - a; i += 1) {
    years.push(initial);
    initial += 1;
  }

  years.sort((c, d) => d - c);

  const arr = [];

  years.map((item, index) => {
    arr.push({
      id: index + 1,
      year: item,
      program: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    });
    return true;
  });

  filteredData.map(item => {
    const date = new Date(item.date);
    const year = item.date.substring(0, 4);
    const month = date.getMonth();

    arr.map(i => {
      if (i.year.toString() === year) {
        // eslint-disable-next-line no-param-reassign
        i.program[month] = { ...item };
      }
      return true;
    });
    return true;
  });

  return arr;
};

// const generateBarChartData = data => {
//   const innovationArea = [
//     ...new Set(data.map(item => item.innovation_area)),
//   ];
//   const product = [...new Set(data.map(item => item.product_name))];

//   const arr = [];
//   for (let i = 0; i < innovationArea.length; i += 1) arr.push(0);

//   data.forEach(item => {
//     product.forEach(x => {
//       if (item.product_name === x) {
//         const index = innovationArea.findIndex(
//           i => i === item.innovation_area,
//         );
//         arr[index] += 1;
//       }
//     });
//   });

//   return {
//     series: [{ data: arr, name: 'No. of products' }],
//     categories: innovationArea,
//   };
// };

const generateBarChartData = data => {
  const innovationArea = [
    ...new Set(data.map(item => item.innovation_area)),
  ];
  // const product = [...new Set(data.map(item => item.product_name))];

  const arr = [];

  // innovationArea.forEach(() => arr.push(0));

  function getCount(innovation_area) {
    const arr = data
      .filter(item => item.innovation_area === innovation_area)
      .map(item => item.product_name);
    const count = [...new Set(arr)].length;
    return count;
  }

  innovationArea.forEach((i, index) => {
    arr[index] = getCount(i);
  });

  return {
    series: [{ data: arr, name: 'No. of products' }],
    categories: innovationArea,
  };
};

// const generateRadarChartData = data => {
//   const innovationArea = [
//     ...new Set(data.map(item => item.innovation_area)),
//   ];
//   const partnerType = [
//     ...new Set(data.map(item => item.partner_type)),
//   ];

//   const series = [];

//   partnerType.forEach(item => {
//     series.push({
//       name: item,
//       data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     });
//   });

//   data.forEach(item => {
//     series.forEach(x => {
//       if (item.partner_type === x.name) {
//         const index = innovationArea.findIndex(
//           i => i === item.innovation_area,
//         );
//         x.data[index] += 1;
//       }
//     });
//   });

//   const categories = innovationArea;

//   return { series, categories };
// };

const generateRadarChartData = data => {
  const innovationArea = [
    ...new Set(data.map(item => item.innovation_area)),
  ];
  const partnerType = [
    ...new Set(data.map(item => item.partner_type)),
  ];

  const series = [];

  partnerType.forEach(item => {
    series.push({
      name: item,
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    });
  });

  function getCount(partner_type, innovation_area) {
    const arr = data
      .filter(
        item =>
          item.partner_type === partner_type &&
          item.innovation_area === innovation_area,
      )
      .map(item => item.partner_name);
    const count = [...new Set(arr)].length;
    return count;
  }

  series.forEach(i => {
    innovationArea.forEach((j, index) => {
      i.data[index] = getCount(i.name, j);
    });
  });

  const categories = innovationArea;

  return { series, categories };
};

// const generateRadarChartData = data => {
//   const innovationArea = [
//     ...new Set(data.map(item => item.innovation_area)),
//   ];
//   const partnerType = [
//     ...new Set(data.map(item => item.partner_type)),
//   ];

//   const arr = [];
//   data.forEach(item => {
//     const obj = arr.some(
//       x => x.innovation_area === item.innovation_area,
//     );
//     if (!obj) {
//       arr.push({
//         innovation_area: item.innovation_area,
//         partner_type: item.partner_type,
//         partner_name: [item.partner_name],
//       });
//     } else {
//       const innoIndex = arr.findIndex(
//         i => i.innovation_area === item.innovation_area,
//       );
//       if (!arr[innoIndex].partner_name.includes(item.partner_name))
//         arr[innoIndex].partner_name.push(item.partner_name);
//     }
//   });

//   const series = [];

//   partnerType.forEach(item => {
//     series.push({
//       name: item,
//       data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     });
//   });

//   arr.forEach(item => {
//     series.forEach(i => {
//       if (item.partner_type === i.name) {
//         // const index = arr.findIndex(x => x.name === i.partner_type);
//         const innoIndex = innovationArea.findIndex(
//           i => i === item.innovation_area,
//         );
//         i.data[innoIndex] = item.partner_name.length;
//       }
//     });
//   });

//   const categories = innovationArea;

//   return { series, categories };
// };

const generateBubbleChartData = data => {
  function groupBy(array, key) {
    return array.reduce((r, a) => {
      r[a[key]] = [...(r[a[key]] || []), a];
      return r;
    }, {});
  }
  const group1 = groupBy(data, 'innovation_area');
  const groupingByInnovationArea = Object.keys(group1).map(item => ({
    id: 'innovation_area',
    name: item,
    children: group1[item],
  }));
  groupingByInnovationArea.forEach(innovation => {
    const group2 = groupBy(innovation.children, 'product_category');
    innovation.children = Object.keys(group2).map(item => ({
      id: 'product_category',
      name: item,
      children: group2[item],
    }));
  });
  groupingByInnovationArea.forEach(innovation => {
    innovation.children.forEach(item => {
      const group3 = groupBy(item.children, 'partner_type');
      item.children = Object.keys(group3).map(item => ({
        id: 'partner_type',
        name: item,
        children: group3[item],
      }));
    });
  });
  groupingByInnovationArea.forEach(innovation => {
    innovation.children.forEach(item => {
      item.children.forEach(i => {
        const group4 = groupBy(i.children, 'product_name');
        i.children = Object.keys(group4).map(item => ({
          id: 'partner_name',
          name: item,
          /* children: group[item], */
          value: 1,
        }));
      });
    });
  });
  return {
    name: 'Product/Process Innovations',
    id: 'bubble',
    children: groupingByInnovationArea,
  };
};

// const generateBubbleChartData = data => {
//   function groupBy(array, key) {
//     return array.reduce((r, a) => {
//       r[a[key]] = [...(r[a[key]] || []), a];
//       return r;
//     }, {});
//   }

//   function getChildren(obj, type) {
//     if (type === 'partner_name') {
//       return Object.keys(obj).map(item => ({
//         id: type,
//         name: item,
//         value: 1,
//       }));
//     } else {
//       return Object.keys(obj).map(item => ({
//         id: type,
//         name: item,
//         children: obj[item],
//         // grouped_by: type,
//         // value: item,
//         // children: obj[item],
//       }));
//     }
//   }

//   function createHierarchy(data, keys) {
//     let hierarchy = data.map(datum => ({ ...datum }));
//     let counter = 0;
//     function groupChildren(array, key) {
//       counter++;
//       array.forEach(item => {
//         if (item.children) {
//           if (keys[counter] === key) {
//             item.children = groupChildren(item.children, key);
//           } else {
//             groupChildren(item.children, key);
//           }
//         }
//       });
//       counter--;
//       const group = groupBy(array, key);
//       return getChildren(group, key);
//     }
//     keys.forEach((key, i) => {
//       if (i == 0) {
//         const group = groupBy(data, key);
//         hierarchy = getChildren(group, key);
//       } else {
//         groupChildren(hierarchy, key);
//       }
//     });
//     return hierarchy;
//   }

//   const keys = [
//     'innovation_area',
//     'product_category',
//     'partner_type',
//     'partner_name',
//   ];

//   const group = createHierarchy(data, keys);

//   return {
//     name: 'Product/Process Innovations',
//     id: 'bubble',
//     children: group,
//   };
// };

const generateHeatMapData = data => {
  const series = [];

  const innovationArea = [
    ...new Set(data.map(item => item.innovation_area)),
  ];
  const marketFailure = [
    ...new Set(data.map(item => item.market_failure)),
  ];

  function getCount(innovation_area, market_failure) {
    const arr = data
      .filter(
        item =>
          item.innovation_area === innovation_area &&
          item.market_failure === market_failure,
      )
      .map(item => item.product_name);
    const count = [...new Set(arr)].length;
    return count;
  }

  function getData(innovation_area) {
    const arr = [];
    marketFailure.forEach(i => {
      arr.push({ x: i, y: getCount(innovation_area, i) });
    });
    return arr;
  }

  innovationArea.forEach(item => {
    series.push({
      name: convertLabelName(item),
      data: getData(item),
    });
  });

  return series;
};

// const generateHeatMapData1 = dataa => {
//   // const arr = [];
//   // const name = [];
//   // const series = [];

//   // const innovation_area = [
//   //   ...new Set(data.map(item => item.innovation_area)),
//   // ];
//   // const market_failure = [
//   //   ...new Set(data.map(item => item.market_failure)),
//   // ];

//   // // data.forEach(item => {
//   // //   innovation_area.forEach(i => {
//   // //     if (i === item.innovation_area) {
//   // //       series.push({
//   // //         x: j,
//   // //       });
//   // //     }
//   // //   });
//   // // });

//   // market_failure.forEach(j => {
//   //   arr.push({ x: j });
//   // });

//   // innovation_area.forEach(item => {
//   //   series.push({ name: item, data: arr });
//   // });

//   // data.forEach(item => {
//   //   series.forEach((i, index1) => {
//   //     if (item.innovation_area === i.name) {
//   //       i.data.forEach((j, index2) => {
//   //         if (item.market_failure === j.x) {
//   //           const obj = j.hasOwnProperty('y');
//   //           if (!obj) {
//   //             i.data[index2] = { ...j, y: 1 };
//   //           } else {
//   //             i.data[index2].y += 1;
//   //           }
//   //         }
//   //       });
//   //     }
//   //   });
//   // });

//   const productProcessData = dataa;

//   const arraySelected = [];
//   const dataVal = [];
//   const marketFailure = [
//     ...new Set(productProcessData.map(item => item.market_failure)),
//   ];
//   marketFailure.forEach(j => {
//     dataVal.push({ x: j, y: 0 });
//   });

//   productProcessData.map(data => {
//     const obj = arraySelected.find(
//       objt => objt.name === data.innovation_area,
//     );
//     if (!obj) {
//       arraySelected.push({
//         name: data.innovation_area,
//         data: [{ x: data.market_failure, y: 1 }],
//       });
//     }
//     if (obj) {
//       const objIndex = arraySelected.findIndex(
//         i => i.name === data.innovation_area,
//       );
//       for (let i = 0; i < arraySelected.length; i += 1) {
//         if (arraySelected[i].name === arraySelected[objIndex].name) {
//           // arraySelected[objIndex].data.push({ x: data.market_failure, y: 1 });
//           const anoIndex = arraySelected[i].data.find(
//             arrData => arrData.x === data.market_failure,
//           );
//           if (!anoIndex) {
//             arraySelected[i].data.push({
//               x: data.market_failure,
//               y: 1,
//             });
//           }
//           if (anoIndex) {
//             const indexVal = arraySelected[i].data.findIndex(
//               k => k.x === data.market_failure,
//             );
//             arraySelected[i].data[indexVal].y += 1;
//           }
//         }
//       }
//     }
//     return true;
//   });

//   for (let j = 0; j < arraySelected.length; j += 1) {
//     for (let i = 0; i < dataVal.length; i += 1) {
//       const anoIndex = arraySelected[j].data.find(
//         val => val.x === dataVal[i].x,
//       );
//       if (!anoIndex) {
//         arraySelected[j].data.push(dataVal[i]);
//       }
//     }
//   }
//   function compare(a, b) {
//     const stringA = a.x;
//     const stringB = b.x;
//     if (stringA > stringB) return 1;
//     if (stringA < stringB) return -1;
//     return 0;
//   }

//   for (let i = 0; i < arraySelected.length; i += 1) {
//     arraySelected[i].data.sort(compare);
//   }

//   const finalArray = arraySelected.map(item => {
//     // return { ...item, name: item.name.split(' ') };
//     return { ...item, name: convertLabelName(item.name) };
//   });

//   // return series;
//   // return arraySelected;
//   return finalArray;
// };

const filterOverviewData = (state, action) => {
  const { allData } = state;
  const {
    innovationArea,
    partnerName,
    productName,
    productCategory,
    partnerType,
    marketFailure,
  } = action.payload;

  const options = {
    innovationArea,
    partnerName,
    productName,
    productCategory,
    partnerType,
    marketFailure,
  };

  const selectedItems = getSelectedOptions(state, options);

  const filteredData = allData.filter(
    item =>
      selectedItems.innovationArea.includes(item.innovation_area) &&
      selectedItems.partnerName.includes(item.partner_name) &&
      selectedItems.productName.includes(item.product_name) &&
      selectedItems.productCategory.includes(item.product_category) &&
      selectedItems.partnerType.includes(item.partner_type) &&
      selectedItems.marketFailure.includes(item.market_failure),
  );

  const overviewData = getOverviewData(filteredData);

  let newOverviewData = { ...overviewData };
  if (innovationArea.length > 0)
    newOverviewData = {
      ...newOverviewData,
      innovationAreaCount: innovationArea.length,
    };
  if (partnerName.length > 0)
    newOverviewData = {
      ...newOverviewData,
      partnerInstitutionCount: partnerName.length,
    };
  if (productName.length > 0)
    newOverviewData = {
      ...newOverviewData,
      productCount: productName.length,
    };

  return {
    ...state,
    overviewData: newOverviewData,
  };
};

const filterBubbleChartData = (state, action) => {
  const { allData } = state;
  const {
    innovationArea,
    partnerName,
    productName,
    productCategory,
    partnerType,
    marketFailure,
  } = action.payload;

  const options = {
    innovationArea,
    partnerName,
    productName,
    productCategory,
    partnerType,
    marketFailure,
  };

  const selectedItems = getSelectedOptions(state, options);

  const filteredData = allData.filter(
    item =>
      selectedItems.innovationArea.includes(item.innovation_area) &&
      selectedItems.partnerName.includes(item.partner_name) &&
      selectedItems.productName.includes(item.product_name) &&
      selectedItems.productCategory.includes(item.product_category) &&
      selectedItems.partnerType.includes(item.partner_type) &&
      selectedItems.marketFailure.includes(item.market_failure),
  );

  const filteredBubbleChartData = generateBubbleChartData(
    filteredData,
  );

  return { ...state, bubbleChartData: filteredBubbleChartData };
};

const filterRadarChartData = (state, action) => {
  const { allData } = state;
  const {
    innovationArea,
    partnerName,
    productName,
    productCategory,
    partnerType,
    marketFailure,
  } = action.payload;

  const options = {
    innovationArea,
    partnerName,
    productName,
    productCategory,
    partnerType,
    marketFailure,
  };

  const selectedItems = getSelectedOptions(state, options);

  const filteredData = allData.filter(
    item =>
      selectedItems.innovationArea.includes(item.innovation_area) &&
      selectedItems.partnerName.includes(item.partner_name) &&
      selectedItems.productName.includes(item.product_name) &&
      selectedItems.productCategory.includes(item.product_category) &&
      selectedItems.partnerType.includes(item.partner_type) &&
      selectedItems.marketFailure.includes(item.market_failure),
  );
  const filteredRadarChartData = generateRadarChartData(filteredData);

  return {
    ...state,
    radarChartData: filteredRadarChartData,
  };
};

const filterBarChartData = (state, action) => {
  const { allData } = state;
  const {
    innovationArea,
    partnerName,
    productName,
    productCategory,
    partnerType,
    marketFailure,
  } = action.payload;

  const options = {
    innovationArea,
    partnerName,
    productName,
    productCategory,
    partnerType,
    marketFailure,
  };

  const selectedItems = getSelectedOptions(state, options);

  const filteredData = allData.filter(
    item =>
      selectedItems.innovationArea.includes(item.innovation_area) &&
      selectedItems.partnerName.includes(item.partner_name) &&
      selectedItems.productName.includes(item.product_name) &&
      selectedItems.productCategory.includes(item.product_category) &&
      selectedItems.partnerType.includes(item.partner_type) &&
      selectedItems.marketFailure.includes(item.market_failure),
  );

  const filteredBarChartData = generateBarChartData(filteredData);

  return {
    ...state,
    barChartData: filteredBarChartData,
  };
};

const filterHeatmapChartData = (state, action) => {
  const { allData } = state;
  const {
    innovationArea,
    partnerName,
    productName,
    productCategory,
    partnerType,
    marketFailure,
  } = action.payload;

  const options = {
    innovationArea,
    partnerName,
    productName,
    productCategory,
    partnerType,
    marketFailure,
  };

  const selectedItems = getSelectedOptions(state, options);

  const filteredData = allData.filter(
    item =>
      selectedItems.innovationArea.includes(item.innovation_area) &&
      selectedItems.partnerName.includes(item.partner_name) &&
      selectedItems.productName.includes(item.product_name) &&
      selectedItems.productCategory.includes(item.product_category) &&
      selectedItems.partnerType.includes(item.partner_type) &&
      selectedItems.marketFailure.includes(item.market_failure),
  );

  const filteredHeatmapChartData = generateHeatMapData(filteredData);

  return {
    ...state,
    heatMapData: filteredHeatmapChartData,
  };
};

// LEFTSIDEBAR PRODUCT NAME OPTION FILTER
const filterProductNameList = (state, action) => {
  const productCategory = action.payload;
  const data = state.allData;

  const filteredData = data.filter(item =>
    productCategory.includes(item.product_category),
  );

  const isEmpty = productCategory.length === 0 ? true : false;

  const productNameList = !isEmpty
    ? getOptionsList(filteredData, 'product_name')
    : getOptionsList(data, 'product_name');
  return {
    ...state,
    productNameList,
  };
};

// LEFTSIDEBAR PARTNER INSTITUTION OPTION FILTER
const filterPartnerNameList = (state, action) => {
  const partnerType = action.payload;
  const data = state.allData;

  const filteredData = data.filter(item =>
    partnerType.includes(item.partner_type),
  );

  const isEmpty = partnerType.length === 0 ? true : false;

  const partnerNameList = !isEmpty
    ? getOptionsList(filteredData, 'partner_name')
    : getOptionsList(data, 'partner_name');

  return {
    ...state,
    partnerNameList,
  };
};

// RESET BUTTON ON LEFTSIDEBAR
const resetAllChartPP = (state, action) => {
  const {
    defaultBubbleData,
    defaultHeatmapData,
    defaultRadarData,
    defaultBarData,
    defaultOverviewData,
  } = state;

  const bubbleChartData = defaultBubbleData;
  const heatMapData = defaultHeatmapData;
  const radarChartData = defaultRadarData;
  const barChartData = defaultBarData;

  const overviewData = defaultOverviewData;

  return {
    ...state,
    bubbleChartData,
    heatMapData,
    radarChartData,
    barChartData,
    overviewData,
  };
};

const getProductProcessData = (state, action) => {
  const allData = action.payload;

  return {
    ...state,
    allData,
  };
};

// GET LEFTSIDEBAR OPTIONS FROM A SINGLE API
const getProductProcessList = (state, action) => {
  const data = action.payload;

  const bubbleChartData = generateBubbleChartData(data);
  const heatMapData = generateHeatMapData(data);
  const radarChartData = generateRadarChartData(data);
  const barChartData = generateBarChartData(data);

  // GET LEFTSIDEBAR OPTIONS LIST FROM ALL DATA
  const innovationAreaList = getOptionsList(data, 'innovation_area');
  const productCategoryList = getOptionsList(
    data,
    'product_category',
  );
  const productNameList = getOptionsList(data, 'product_name');
  const partnerTypeList = getOptionsList(data, 'partner_type');
  const partnerNameList = getOptionsList(data, 'partner_name');
  const marketFailureList = getOptionsList(data, 'market_failure');

  // GET RIGHT SIDEBAR OVERVIEW DATA
  const overviewData = getOverviewData(data);

  const timelineData = generateTimelineData(data);

  // DEFAULT DATA FOR RESET BUTTON
  const defaultBubbleData = bubbleChartData;
  const defaultHeatmapData = heatMapData;
  const defaultRadarData = radarChartData;
  const defaultBarData = barChartData;
  const defaultOverviewData = overviewData;

  return {
    ...state,
    allData: data,
    innovationAreaList,
    productCategoryList,
    productNameList,
    partnerTypeList,
    partnerNameList,
    marketFailureList,
    bubbleChartData,
    overviewData,
    timelineData,
    heatMapData,
    radarChartData,
    barChartData,
    defaultBubbleData,
    defaultHeatmapData,
    defaultRadarData,
    defaultBarData,
    defaultOverviewData,
    // productProcessList: action.payload,
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_PROCESS_DATA:
      return getProductProcessData(state, action);
    case GET_PRODUCT_PROCESS_LIST:
      return getProductProcessList(state, action);
    case FILTER_PRODUCT_NAME_LIST:
      return filterProductNameList(state, action);
    case FILTER_PARTNER_NAME_LIST:
      return filterPartnerNameList(state, action);
    case FILTER_BUBBLE_CHART_DATA:
      return filterBubbleChartData(state, action);
    case FILTER_RADAR_CHART_DATA:
      return filterRadarChartData(state, action);
    case FILTER_BAR_CHART_DATA:
      return filterBarChartData(state, action);
    case FILTER_HEATMAP_CHART_DATA:
      return filterHeatmapChartData(state, action);
    case FILTER_OVERVIEW_DATA_PP:
      return filterOverviewData(state, action);
    case RESET_ALL_CHART_PP:
      return resetAllChartPP(state, action);

    default:
      return state;
  }
}
