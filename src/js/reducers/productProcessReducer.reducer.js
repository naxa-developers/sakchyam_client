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

const generateBarChartData = data => {
  const marketFailure = [
    ...new Set(data.map(item => item.market_failure)),
  ];
  const product = [...new Set(data.map(item => item.product_name))];

  const arr = [];
  for (let i = 0; i < marketFailure.length; i += 1) arr.push(0);

  data.forEach(item => {
    product.forEach(x => {
      if (item.product_name === x) {
        const index = marketFailure.findIndex(
          i => i === item.market_failure,
        );
        arr[index] += 1;
      }
    });
  });

  return {
    series: [{ data: arr }],
    categories: marketFailure,
  };
};

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

  data.forEach(item => {
    series.forEach(x => {
      if (item.partner_type === x.name) {
        const index = innovationArea.findIndex(
          i => i === item.innovation_area,
        );
        x.data[index] += 1;
      }
    });
  });

  const categories = innovationArea;

  return { series, categories };
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
        id: 'product_category',
        name: item.product_category,
        children: [
          {
            id: 'partner_type',
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
          id: 'partner_type',
          name: item.partner_type,
        });
      }
    }
  });

  data.forEach(item => {
    const obj = arr3.some(i => i.name === item.partner_type);
    if (!obj) {
      arr3.push({
        id: 'partner_type',
        name: item.partner_type,
        children: [
          {
            id: 'partner_name',
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
          id: 'partner_name',
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

  return {
    name: 'Product/Process Innovations',
    id: 'bubble',
    color: '',
    children: arr,
  };
};

const generateHeatMapData = dataa => {
  // const arr = [];
  // const name = [];
  // const series = [];

  // const innovation_area = [
  //   ...new Set(data.map(item => item.innovation_area)),
  // ];
  // const market_failure = [
  //   ...new Set(data.map(item => item.market_failure)),
  // ];

  // // data.forEach(item => {
  // //   innovation_area.forEach(i => {
  // //     if (i === item.innovation_area) {
  // //       series.push({
  // //         x: j,
  // //       });
  // //     }
  // //   });
  // // });

  // market_failure.forEach(j => {
  //   arr.push({ x: j });
  // });

  // innovation_area.forEach(item => {
  //   series.push({ name: item, data: arr });
  // });

  // data.forEach(item => {
  //   series.forEach((i, index1) => {
  //     if (item.innovation_area === i.name) {
  //       i.data.forEach((j, index2) => {
  //         if (item.market_failure === j.x) {
  //           const obj = j.hasOwnProperty('y');
  //           if (!obj) {
  //             i.data[index2] = { ...j, y: 1 };
  //           } else {
  //             i.data[index2].y += 1;
  //           }
  //         }
  //       });
  //     }
  //   });
  // });

  const productProcessData = dataa;

  const arraySelected = [];
  const dataVal = [];
  const marketFailure = [
    ...new Set(productProcessData.map(item => item.market_failure)),
  ];
  marketFailure.forEach(j => {
    dataVal.push({ x: j, y: 0 });
  });

  productProcessData.map(data => {
    const obj = arraySelected.find(
      objt => objt.name === data.innovation_area,
    );
    if (!obj) {
      arraySelected.push({
        name: data.innovation_area,
        data: [{ x: data.market_failure, y: 1 }],
      });
    }
    if (obj) {
      const objIndex = arraySelected.findIndex(
        i => i.name === data.innovation_area,
      );
      for (let i = 0; i < arraySelected.length; i += 1) {
        if (arraySelected[i].name === arraySelected[objIndex].name) {
          // arraySelected[objIndex].data.push({ x: data.market_failure, y: 1 });
          const anoIndex = arraySelected[i].data.find(
            arrData => arrData.x === data.market_failure,
          );
          if (!anoIndex) {
            arraySelected[i].data.push({
              x: data.market_failure,
              y: 1,
            });
          }
          if (anoIndex) {
            const indexVal = arraySelected[i].data.findIndex(
              k => k.x === data.market_failure,
            );
            arraySelected[i].data[indexVal].y += 1;
          }
        }
      }
    }
    return true;
  });

  for (let j = 0; j < arraySelected.length; j += 1) {
    for (let i = 0; i < dataVal.length; i += 1) {
      const anoIndex = arraySelected[j].data.find(
        val => val.x === dataVal[i].x,
      );
      if (!anoIndex) {
        arraySelected[j].data.push(dataVal[i]);
      }
    }
  }
  function compare(a, b) {
    const stringA = a.x;
    const stringB = b.x;
    if (stringA > stringB) return 1;
    if (stringA < stringB) return -1;
    return 0;
  }

  for (let i = 0; i < arraySelected.length; i += 1) {
    arraySelected[i].data.sort(compare);
  }

  const finalArray = arraySelected.map(item => {
    // return { ...item, name: item.name.split(' ') };
    return { ...item, name: convertLabelName(item.name) };
  });

  // return series;
  // return arraySelected;
  return finalArray;
};

const filterOverviewData = (state, action) => {
  const { innovationArea, partnerName, productName } = action.payload;

  const innovationAreaCount = innovationArea.length;
  const partnerInstitutionCount = partnerName.length;
  const productCount = productName.length;

  return {
    ...state,
    overviewData: {
      innovationAreaCount,
      partnerInstitutionCount,
      productCount,
    },
  };
};

const filterBubbleChartData = (state, action) => {
  const { allData } = state;
  const {
    innovationArea,
    productCategory,
    partnerType,
    partnerName,
  } = action.payload;

  let filteredData;
  const innovationLen = innovationArea.length;
  const productLen = productCategory.length;
  const partnerTypeLen = partnerType.length;
  const partnerLen = partnerName.length;

  if (
    innovationLen === 0 &&
    productLen === 0 &&
    partnerTypeLen === 0 &&
    partnerLen === 0
  ) {
    filteredData = allData;
  } else if (
    innovationLen > 0 &&
    productLen === 0 &&
    partnerTypeLen === 0 &&
    partnerLen === 0
  ) {
    filteredData = allData.filter(item =>
      innovationArea.includes(item.innovation_area),
    );
  } else if (
    innovationLen === 0 &&
    productLen > 0 &&
    partnerTypeLen === 0 &&
    partnerLen === 0
  ) {
    filteredData = allData.filter(item =>
      productCategory.includes(item.product_category),
    );
  } else if (
    innovationLen === 0 &&
    productLen === 0 &&
    partnerTypeLen > 0 &&
    partnerLen === 0
  ) {
    filteredData = allData.filter(item =>
      partnerType.includes(item.partner_type),
    );
  } else if (
    innovationLen === 0 &&
    productLen === 0 &&
    partnerTypeLen === 0 &&
    partnerLen > 0
  ) {
    filteredData = allData.filter(item =>
      partnerName.includes(item.partner_name),
    );
  } else if (
    innovationLen > 0 &&
    productLen > 0 &&
    partnerTypeLen === 0 &&
    partnerLen === 0
  ) {
    filteredData = allData.filter(
      item =>
        innovationArea.includes(item.innovation_area) &&
        productCategory.includes(item.product_category),
    );
  } else if (
    innovationLen > 0 &&
    productLen === 0 &&
    partnerTypeLen > 0 &&
    partnerLen === 0
  ) {
    filteredData = allData.filter(
      item =>
        innovationArea.includes(item.innovation_area) &&
        partnerType.includes(item.partner_type),
    );
  } else if (
    innovationLen > 0 &&
    productLen === 0 &&
    partnerTypeLen === 0 &&
    partnerLen > 0
  ) {
    filteredData = allData.filter(
      item =>
        innovationArea.includes(item.innovation_area) &&
        partnerName.includes(item.partner_name),
    );
  } else if (
    innovationLen === 0 &&
    productLen > 0 &&
    partnerTypeLen > 0 &&
    partnerLen === 0
  ) {
    filteredData = allData.filter(
      item =>
        productCategory.includes(item.product_category) &&
        partnerType.includes(item.partner_type),
    );
  } else if (
    innovationLen === 0 &&
    productLen === 0 &&
    partnerTypeLen > 0 &&
    partnerLen > 0
  ) {
    filteredData = allData.filter(
      item =>
        partnerType.includes(item.partner_type) &&
        partnerName.includes(item.partner_name),
    );
  } else if (
    innovationLen > 0 &&
    productLen > 0 &&
    partnerTypeLen > 0 &&
    partnerLen === 0
  ) {
    filteredData = allData.filter(
      item =>
        innovationArea.includes(item.innovation_area) &&
        productCategory.includes(item.product_category) &&
        partnerType.includes(item.partner_type),
    );
  } else if (
    innovationLen === 0 &&
    productLen > 0 &&
    partnerTypeLen > 0 &&
    partnerLen > 0
  ) {
    filteredData = allData.filter(
      item =>
        productCategory.includes(item.product_category) &&
        partnerType.includes(item.partner_type) &&
        partnerName.includes(item.partner_name),
    );
  } else if (
    innovationLen > 0 &&
    productLen === 0 &&
    partnerTypeLen > 0 &&
    partnerLen > 0
  ) {
    filteredData = allData.filter(
      item =>
        innovationArea.includes(item.innovation_area) &&
        partnerType.includes(item.partner_type) &&
        partnerName.includes(item.partner_name),
    );
  } else if (
    innovationLen > 0 &&
    productLen > 0 &&
    partnerTypeLen === 0 &&
    partnerLen > 0
  ) {
    filteredData = allData.filter(
      item =>
        innovationArea.includes(item.innovation_area) &&
        productCategory.includes(item.product_category) &&
        partnerName.includes(item.partner_name),
    );
  } else {
    filteredData = allData.filter(
      item =>
        innovationArea.includes(item.innovation_area) &&
        productCategory.includes(item.product_category) &&
        partnerType.includes(item.partner_type) &&
        partnerName.includes(item.partner_name),
    );
  }

  const filteredBubbleChartData = generateBubbleChartData(
    filteredData,
  );

  return { ...state, bubbleChartData: filteredBubbleChartData };
};

const filterRadarChartData = (state, action) => {
  const { allData } = state;
  const { innovationArea, partnerType } = action.payload;

  let filteredData;

  // BOTH NOT SELECTED MEANING ALL SELECTED
  if (innovationArea.length === 0 && partnerType.length === 0) {
    filteredData = allData;
  }
  // INNOVATION AREA ONLY SELECTED
  else if (innovationArea.length > 0 && partnerType.length === 0) {
    filteredData = allData.filter(item =>
      innovationArea.includes(item.innovation_area),
    );
  }
  // PARTNER TYPE ONLY SELECTED
  else if (innovationArea.length === 0 && partnerType.length > 0) {
    filteredData = allData.filter(item =>
      partnerType.includes(item.partner_type),
    );
  }
  // BOTH SELECTED
  else {
    filteredData = allData.filter(
      item =>
        innovationArea.includes(item.innovation_area) &&
        partnerType.includes(item.partner_type),
    );
  }

  const filteredRadarChartData = generateRadarChartData(filteredData);

  return {
    ...state,
    radarChartData: filteredRadarChartData,
  };
};

const filterBarChartData = (state, action) => {
  const { allData } = state;
  const { marketFailure, productName } = action.payload;

  let filteredData;

  // BOTH NOT SELECTED MEANING ALL SELECTED
  if (marketFailure.length === 0 && productName.length === 0) {
    filteredData = allData;
  }
  // INNOVATION AREA ONLY SELECTED
  else if (marketFailure.length > 0 && productName.length === 0) {
    filteredData = allData.filter(item =>
      marketFailure.includes(item.market_failure),
    );
  }
  // PARTNER TYPE ONLY SELECTED
  else if (marketFailure.length === 0 && productName.length > 0) {
    filteredData = allData.filter(item =>
      productName.includes(item.product_name),
    );
  }
  // BOTH SELECTED
  else {
    filteredData = allData.filter(
      item =>
        marketFailure.includes(item.market_failure) &&
        productName.includes(item.product_name),
    );
  }

  const filteredBarChartData = generateBarChartData(filteredData);

  return {
    ...state,
    barChartData: filteredBarChartData,
  };
};

const filterHeatmapChartData = (state, action) => {
  const { allData } = state;
  const { innovationArea, marketFailure } = action.payload;

  let filteredData;

  // BOTH NOT SELECTED MEANING ALL SELECTED
  if (innovationArea.length === 0 && marketFailure.length === 0) {
    filteredData = allData;
  }
  // INNOVATION AREA ONLY SELECTED
  else if (innovationArea.length > 0 && marketFailure.length === 0) {
    filteredData = allData.filter(item =>
      innovationArea.includes(item.innovation_area),
    );
  }
  // PARTNER TYPE ONLY SELECTED
  else if (innovationArea.length === 0 && marketFailure.length > 0) {
    filteredData = allData.filter(item =>
      marketFailure.includes(item.market_failure),
    );
  }
  // BOTH SELECTED
  else {
    filteredData = allData.filter(
      item =>
        innovationArea.includes(item.innovation_area) &&
        marketFailure.includes(item.market_failure),
    );
  }

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
