/* eslint-disable array-callback-return */
import {
  GET_MFS_INNOVATIONLIST,
  GET_MFS_ACHIEVEMENTLIST,
  GET_MFS_PARTNERLIST,
  GET_MFS_LIST_SUCCESS,
  GET_MFS_LIST_REQUEST,
  FILTER_MFS_LIST_BY_PARTNERINSTITUTION,
  FILTER_MFS_CHOROPLETH_DATA,
  GET_MFS_OVERVIEW_DATA,
  FILTER_MFS_OVERVIEW_DATA,
  FILTER_MFS_LIST_BY_KEY_INNOVATION,
  FILTER_MFS_CHART_DATA,
} from '../actions/index.actions';

function groupBy(a, keyFunction) {
  const groups = {};
  a.forEach(function(el) {
    const key = keyFunction(el);
    if (key in groups === false) {
      groups[key] = [];
    }
    groups[key].push(el);
  });
  return groups;
}
const getUniqueValuesFromArray = (array, key) => {
  const uniqueValueArray = [...new Set(array.map(item => item[key]))];
  return uniqueValueArray;
};

const getDistinctJson = (mainData, distinctKey) => {
  const returnArray = [];
  mainData.map(mf => {
    const index = returnArray.findIndex(
      x => x[distinctKey] === mf[distinctKey],
    );
    if (index === -1) {
      returnArray.push(mf);
    }
  });
  return returnArray;
};
const filterDistinctJsonWithKey = (
  mainArray,
  distinctKey,
  distinctKeySum,
) => {
  const testArray = [];
  let finalArray = [];
  finalArray = [...mainArray].reduce((a, c) => {
    const filtered = a.filter(
      el => testArray && el[distinctKey] === c[distinctKey],
    );
    if (filtered.length > 0) {
      // eslint-disable-next-line no-param-reassign
      a[a.indexOf(filtered[0])][distinctKeySum] += +c[distinctKeySum];
    } else {
      a.push(c);
    }
    return a;
  }, []);
  return finalArray;
};
const initialState = {
  mfsListAllData: [],
  mfsListLoading: false,
  achievementList: [],
  mfsOverviewData: {},
  partnerList: [],
  mfsChoroplethData: [],
  mfsChartData: {},
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
const getMfsOverviewData = (state, action) => {
  const mfsData = [...action.payload];
  console.log(mfsData, 'mfsData');
  // const mfsAchievedData = getUniqueValuesFromArray(
  //   mfsData,
  //   'achieved_number',
  // );
  const mfsInnovationData = getUniqueValuesFromArray(
    mfsData,
    'key_innovation',
  );
  const noOfInnovation = mfsInnovationData.length;
  const mfsPartners = getUniqueValuesFromArray(mfsData, 'partner_id');
  const noOfPartners = mfsPartners.length;
  // const totalAchievedNumber = mfsAchievedData.reduce((a, b) => {
  //   return a + b;
  // });
  const totalAchievedNumber = mfsData.reduce(function(prev, cur) {
    return prev + cur.achieved_number;
  }, 0);
  return {
    ...state,
    mfsOverviewData: {
      totalCashpoint: totalAchievedNumber,
      innovationNo: noOfInnovation,
      partnerNo: noOfPartners,
    },
    // innovationList,
  };
};
const filterMfsOverviewData = (state, action) => {
  const {
    selectedPartner,
    selectedInnovation,
    selectedAchievement,
  } = action.payload;
  const mfsData = [...state.mfsListAllData];
  const filteredData = mfsData.filter(data => {
    return selectedAchievement.includes(data.achievement_type);
  });
  const mfsAchievedData = getUniqueValuesFromArray(
    filteredData,
    'achieved_number',
  );

  const totalAchievedNumber = [...mfsAchievedData].reduce(function(
    prev,
    cur,
  ) {
    return prev + cur;
  },
  0);

  return {
    ...state,
    mfsOverviewData: {
      totalCashpoint: totalAchievedNumber,
      innovationNo: selectedInnovation.length,
      partnerNo: selectedPartner.length,
    },
    // innovationList,
  };
};
const getMfsPartnerList = (state, action) => {
  const mfsData = [...action.payload];
  const partnerList = getDistinctJson(mfsData, 'partner_id');

  return {
    ...state,
    partnerList,
  };
};
const filterMfsListByPartner = (state, action) => {
  const mfsData = [...state.mfsListAllData];
  const selectedPartner = action.payload;

  // const filteredMfsData = mfsData.filter(data => {
  //   if (selectedPartner !== '') {
  //     return data.partner_name === selectedPartner;
  //   }
  //   return data;
  // });
  const filteredMfsData = mfsData.filter(data => {
    if (selectedPartner.length !== 0) {
      return selectedPartner.includes(data.partner_name);
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
const filterMfsListByInnovation = (state, action) => {
  const mfsData = [...state.mfsListAllData];
  const selectedInnovation = action.payload;

  const filteredMfsData = mfsData.filter(data => {
    if (selectedInnovation.length !== 0) {
      return selectedInnovation.includes(data.key_innovation);
    }
    return data;
  });
  const achievementList = getUniqueValuesFromArray(
    filteredMfsData,
    'achievement_type',
  );
  return {
    ...state,
    achievementList,
  };
};
const filterMfsChoroplethData = (state, action) => {
  const {
    mapViewBy,
    selectedPartner,
    selectedInnovation,
    selectedAchievement,
  } = action.payload;
  console.log(action, 'action');
  const mfsData = [...state.mfsListAllData];
  const filteredChoroplethData = mfsData.filter(data => {
    return selectedAchievement.includes(data.achievement_type);
  });

  console.log(filteredChoroplethData);

  const testArray = [];
  const anotherArray = [...filteredChoroplethData];
  const federalKey =
    mapViewBy === 'province' ? 'province_code' : 'district_code';

  const byName = groupBy(anotherArray, it => it[federalKey]);
  // console.log(byName, 'byName');
  const output = Object.keys(byName).map((name, second) => {
    // console.log(byName[name][0], '1stname');
    // console.log(name, 'name');
    // console.log(second, 'second');
    // const byZone = groupBy(byName[name], it => it.Zone);
    const sum = byName[name].reduce(
      (acc, it) => acc + it.achieved_number,
      0,
    );
    return {
      code: name,
      // ZoneCount: Object.keys(byZone).length,
      count: sum,
    };
  });
  // console.log(output, 'output');
  // console.log(output)
  // console.log(maps, 'mapTest');
  // console.log(anotherArray, 'anotherArray1');
  // console.log(federalKey, 'federalKey2');
  // console.log(
  //   federalFilterofChoropleth,
  //   'federalFilterOfChoropleth3',
  // );
  // const choroplethFormat = [];
  // federalFilterofChoropleth.forEach(data => {
  //   choroplethFormat.push({
  //     code: data[federalKey],
  //     count: data.achieved_number,
  //   });
  // });
  // console.log(federalFilterofChoropleth, 'federalCOde');
  return {
    ...state,
    mfsChoroplethData: output,
    mfsChartData: {
      series: [
        {
          name: 'Income',
          // type: 'column',
          data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
        },
      ],
      labels: [
        'Province1',
        'Province2',
        'Province3',
        'Province4',
        'Province5',
        'Province6',
        'Province7',
      ],
    },
  };
};
const filterMfsChartData = (state, action) => {
  const {
    mapViewBy,
    selectedPartner,
    selectedInnovation,
    selectedAchievement,
  } = action.payload;
  console.log(action, 'action');
  const mfsData = [...state.mfsListAllData];
  const filteredChoroplethData = mfsData.filter(data => {
    return selectedAchievement.includes(data.achievement_type);
  });

  console.log(filteredChoroplethData);

  const testArray = [];
  const anotherArray = [...filteredChoroplethData];
  const federalKey =
    mapViewBy === 'province' ? 'province_code' : 'district_code';
  const federalFilterofChoropleth = filterDistinctJsonWithKey(
    anotherArray,
    federalKey,
    'achieved_number',
  );
  console.log(anotherArray, 'anotherArray1');
  console.log(federalKey, 'federalKey2');
  console.log(
    federalFilterofChoropleth,
    'federalFilterOfChoropleth3',
  );
  // const choroplethFormat = [];
  // federalFilterofChoropleth.forEach(data => {
  //   choroplethFormat.push({
  //     code: data[federalKey],
  //     count: data.achieved_number,
  //   });
  // });
  console.log(federalFilterofChoropleth, 'federalCOde');
  return {
    ...state,
    // mfsChoroplethData: choroplethFormat,
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
    case GET_MFS_OVERVIEW_DATA:
      return getMfsOverviewData(state, action);
    case FILTER_MFS_OVERVIEW_DATA:
      return filterMfsOverviewData(state, action);
    case GET_MFS_PARTNERLIST:
      return getMfsPartnerList(state, action);
    case FILTER_MFS_LIST_BY_PARTNERINSTITUTION:
      return filterMfsListByPartner(state, action);
    case FILTER_MFS_LIST_BY_KEY_INNOVATION:
      return filterMfsListByInnovation(state, action);
    case FILTER_MFS_CHOROPLETH_DATA:
      return filterMfsChoroplethData(state, action);
    case FILTER_MFS_CHART_DATA:
      return filterMfsChartData(state, action);
    // case GET_PROJECT_LIST_DATA:
    //   return getProjectListData(state, action);

    // case GET_MAP_DATA:
    //   return getMapData(state, action);
    default:
      return state;
  }
}
