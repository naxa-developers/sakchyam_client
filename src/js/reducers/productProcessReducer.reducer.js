/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
/* eslint-disable camelcase */
import {
  GET_PRODUCT_PROCESS_DATA,
  GET_PRODUCT_PROCESS_LIST,
  FILTER_PRODUCT_NAME_LIST,
  FILTER_PARTNER_NAME_LIST,
  FILTER_ALL_CHART_PP,
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

  console.log('data for timeline', data);
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

const generateHeatMapData = dataa => {
  const series = [];

  const data = [];

  dataa.forEach(item => {
    const word = item.market_failure
      .split(' ')
      .splice(2)
      .join(' ');
    const pascal = word.charAt(0).toUpperCase() + word.slice(1);
    data.push({
      ...item,
      market_failure: pascal,
    });
  });

  const innovationArea = [
    ...new Set(data.map(item => item.innovation_area)),
  ];
  const marketFailure = [
    ...new Set(data.map(item => item.market_failure)),
  ];

  // marketFailure.forEach(item => {
  //   const word = item
  //     .split(' ')
  //     .splice(2)
  //     .join(' ');
  //   const pascal = word.charAt(0).toUpperCase() + word.slice(1);
  //   marketFailure.push(pascal);
  // });

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

const filterAllChartPP = (state, action) => {
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

  const bubbleChartData = generateBubbleChartData(filteredData);
  const heatMapData = generateHeatMapData(filteredData);
  const radarChartData = generateRadarChartData(filteredData);
  const barChartData = generateBarChartData(filteredData);

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
    bubbleChartData,
    heatMapData,
    radarChartData,
    barChartData,
    overviewData: newOverviewData,
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
    case FILTER_ALL_CHART_PP:
      return filterAllChartPP(state, action);
    case RESET_ALL_CHART_PP:
      return resetAllChartPP(state, action);

    default:
      return state;
  }
}
