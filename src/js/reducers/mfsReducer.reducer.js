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
  FILTER_MFS_MAP_PIE_DATA,
  FILTER_MFS_CHART_DATA_BY_DISTRICT_ID,
} from '../actions/index.actions';
import province from '../../data/province.json';
import district from '../../data/district.json';

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
  defaultMfsOverviewData: {},
  defaultMfsChoroplethData: [],
  defaultMfsChartData: {},
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
    defaultMfsOverviewData: {
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
  let filteredData = [];
  if (selectedAchievement.length > 0) {
    filteredData = mfsData.filter(data => {
      return selectedAchievement.includes(data.achievement_type);
    });
  } else if (selectedInnovation.length > 0) {
    filteredData = mfsData.filter(data => {
      return selectedInnovation.includes(data.key_innovation);
    });
  } else if (selectedPartner.length > 0) {
    filteredData = mfsData.filter(data => {
      return selectedPartner.includes(data.partner_name);
    });
  } else {
    filteredData = mfsData;
  }
  // const filteredData = mfsData.filter(data => {
  //   return selectedAchievement.includes(data.achievement_type);
  // });
  const mfsAchievedData = getUniqueValuesFromArray(
    filteredData,
    'achieved_number',
  );
  const mfsInnovationLength = getUniqueValuesFromArray(
    filteredData,
    'key_innovation',
  );
  const mfsPartnerLength = getUniqueValuesFromArray(
    filteredData,
    'partner_id',
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
      innovationNo: mfsInnovationLength.length,
      partnerNo: mfsPartnerLength.length,
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
  let filteredData = [];
  if (selectedAchievement.length > 0) {
    filteredData = mfsData.filter(data => {
      return selectedAchievement.includes(data.achievement_type);
    });
  } else if (selectedInnovation.length > 0) {
    filteredData = mfsData.filter(data => {
      return selectedInnovation.includes(data.key_innovation);
    });
  } else if (selectedPartner.length > 0) {
    filteredData = mfsData.filter(data => {
      return selectedPartner.includes(data.partner_name);
    });
  } else {
    filteredData = mfsData;
  }
  // const filteredByInnovation = filteredByPartner.filter(data => {
  //   return selectedInnovation.includes(data.key_innovation);
  // });
  // const filteredChoroplethData = filteredByInnovation.filter(data => {
  //   return selectedAchievement.includes(data.achievement_type);
  // });
  // console.log(filteredByPartner, 'filteredByPartner');

  const anotherArray = [...filteredData];
  const federalKey =
    mapViewBy === 'province' ? 'province_code' : 'district_code';

  const byFederal = groupBy(anotherArray, it => it[federalKey]);
  const byAchievementType = groupBy(
    anotherArray,
    it => it.achievement_type,
  );
  // console.log(province, 'province');
  // console.log(district, 'district');
  const provinceData = province.map(data => {
    return { code: data.FIRST_PROV, name: data.prov_name, count: 0 };
  });
  console.log(provinceData, 'provinceData');
  // console.log(byName, 'byName');
  const output = Object.keys(byFederal).map((name, second) => {
    // console.log(byName[name][0], '1stname');
    // console.log(name, 'name');
    // console.log(second, 'second');
    // const byZone = groupBy(byName[name], it => it.Zone);
    const sum = byFederal[name].reduce(
      (acc, it) => acc + it.achieved_number,
      0,
    );
    return {
      code: name,
      // ZoneCount: Object.keys(byZone).length,
      count: sum,
    };
  });

  return {
    ...state,
    mfsChoroplethData: output,
  };
};
const filterMfsChartData = (state, action) => {
  const {
    mapViewBy,
    selectedPartner,
    selectedInnovation,
    selectedAchievement,
  } = action.payload;
  const mfsData = [...state.mfsListAllData];
  let filteredData = [];
  if (selectedAchievement.length > 0) {
    filteredData = mfsData.filter(data => {
      return selectedAchievement.includes(data.achievement_type);
    });
  } else if (selectedInnovation.length > 0) {
    filteredData = mfsData.filter(data => {
      return selectedInnovation.includes(data.key_innovation);
    });
  } else if (selectedPartner.length > 0) {
    filteredData = mfsData.filter(data => {
      return selectedPartner.includes(data.partner_name);
    });
  } else {
    filteredData = mfsData;
  }
  const anotherArray = [...filteredData];
  const federalKey =
    mapViewBy === 'province' ? 'province_code' : 'district_code';

  const byFederal = groupBy(anotherArray, it => it[federalKey]);
  const byAchievementType = groupBy(
    anotherArray,
    it => it.achievement_type,
  );
  // console.log(province, 'province');
  // console.log(district, 'district');
  let federalData = [];
  if (mapViewBy === 'province') {
    federalData = province.map(data => {
      return {
        code: data.FIRST_PROV,
        name: data.prov_name,
        count: 0,
      };
    });
  } else {
    federalData = district.map(data => {
      return {
        code: data.districtid,
        name: data.name,
        count: 0,
      };
    });
  }
  // console.log(federalData, 'federalData');
  const labels = federalData.map(data => {
    const name = data.name.toLowerCase();
    const nameCapitalized =
      name.charAt(0).toUpperCase() + name.slice(1);
    return nameCapitalized;
  });
  const output = Object.keys(byFederal).map((name, second) => {
    const sum = byFederal[name].reduce(
      (acc, it) => acc + it.achieved_number,
      0,
    );
    return {
      code: name,
      // ZoneCount: Object.keys(byZone).length,
      count: sum,
    };
  });

  const finalArray = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(byAchievementType)) {
    const groupByFed = groupBy(value, it => it[federalKey]);
    const final = Object.keys(groupByFed).map((name, second) => {
      // console.log(byName[name][0], '1stname');
      // console.log(name, 'name');
      // console.log(second, 'second');
      // const byZone = groupBy(byName[name], it => it.Zone);
      const sum = groupByFed[name].reduce(
        (acc, it) => acc + it.achieved_number,
        0,
      );
      return {
        code: name,
        // ZoneCount: Object.keys(byZone).length,
        count: sum,
      };
    });
    const test = federalData.map(data => {
      final.map(el => {
        // console.log(data, 'data');
        // console.log(el, 'el');
        if (data.code === +el.code) {
          // eslint-disable-next-line no-param-reassign
          data.count = el.count;
        }
      });
      return data;
    });
    const mappedCount = test.map(data => {
      return data.count;
    });
    finalArray.push({ name: key, data: mappedCount });
  }
  return {
    ...state,
    mfsChartData: {
      series: finalArray,
      labels,
    },
  };
};
const filterMfsChartDataByDistrict = (state, action) => {
  const {
    mapViewBy,
    districtList,
    selectedPartner,
    selectedInnovation,
    selectedAchievement,
  } = action.payload;
  const mfsData = [...state.mfsListAllData];
  let filteredData = [];
  if (selectedAchievement.length > 0) {
    filteredData = mfsData.filter(data => {
      return selectedAchievement.includes(data.achievement_type);
    });
  } else if (selectedInnovation.length > 0) {
    filteredData = mfsData.filter(data => {
      return selectedInnovation.includes(data.key_innovation);
    });
  } else if (selectedPartner.length > 0) {
    filteredData = mfsData.filter(data => {
      return selectedPartner.includes(data.partner_name);
    });
  } else {
    filteredData = mfsData;
  }
  const anotherArray = [...filteredData];
  const federalKey =
    mapViewBy === 'province' ? 'province_code' : 'district_code';

  const byFederal = groupBy(anotherArray, it => it[federalKey]);
  const byAchievementType = groupBy(
    anotherArray,
    it => it.achievement_type,
  );
  // console.log(province, 'province');
  // console.log(district, 'district');
  let federalData = [];
  if (mapViewBy === 'province') {
    federalData = province.map(data => {
      return {
        code: data.FIRST_PROV,
        name: data.prov_name,
        count: 0,
      };
    });
  } else {
    federalData = district.map(data => {
      return {
        code: data.districtid,
        name: data.name,
        count: 0,
      };
    });
  }
  console.log(federalData, 'federalData');
  const filteredFederalDistrict = federalData.filter(data => {
    return districtList.includes(data.code);
  });
  const labels = filteredFederalDistrict.map(data => {
    const name = data.name.toLowerCase();
    const nameCapitalized =
      name.charAt(0).toUpperCase() + name.slice(1);
    return nameCapitalized;
  });
  const output = Object.keys(byFederal).map((name, second) => {
    const sum = byFederal[name].reduce(
      (acc, it) => acc + it.achieved_number,
      0,
    );
    return {
      code: name,
      // ZoneCount: Object.keys(byZone).length,
      count: sum,
    };
  });

  const finalArray = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(byAchievementType)) {
    const groupByFed = groupBy(value, it => it[federalKey]);
    const final = Object.keys(groupByFed).map((name, second) => {
      // console.log(byName[name][0], '1stname');
      // console.log(name, 'name');
      // console.log(second, 'second');
      // const byZone = groupBy(byName[name], it => it.Zone);
      const sum = groupByFed[name].reduce(
        (acc, it) => acc + it.achieved_number,
        0,
      );
      return {
        code: name,
        // ZoneCount: Object.keys(byZone).length,
        count: sum,
      };
    });
    const test = filteredFederalDistrict.map(data => {
      final.map(el => {
        // console.log(data, 'data');
        // console.log(el, 'el');
        if (data.code === +el.code) {
          // eslint-disable-next-line no-param-reassign
          data.count = el.count;
        }
      });
      return data;
    });
    const mappedCount = test.map(data => {
      return data.count;
    });
    finalArray.push({ name: key, data: mappedCount });
  }
  console.log(finalArray, 'finalArray');
  return {
    ...state,
    mfsChartData: {
      series: finalArray,
      labels,
    },
  };
};
const filterMfsMapPieData = (state, action) => {
  const {
    mapViewBy,
    selectedPartner,
    selectedInnovation,
    selectedAchievement,
  } = action.payload;
  const mfsData = [...state.mfsListAllData];
  const filteredByPartner = mfsData.filter(data => {
    return selectedPartner.includes(data.partner_name);
  });
  console.log(filteredByPartner, 'filteredByPartner');
  const filteredByInnovation = filteredByPartner.filter(data => {
    return selectedInnovation.includes(data.key_innovation);
  });
  const filteredChoroplethData = filteredByInnovation.filter(data => {
    return selectedAchievement.includes(data.achievement_type);
  });

  const anotherArray = [...filteredChoroplethData];
  const federalKey =
    mapViewBy === 'province' ? 'province_code' : 'district_code';
  // console.log(anotherArray, 'anotherArray');
  const groupByFeds = groupBy(anotherArray, it => it[federalKey]);
  // console.log(groupByFeds, 'groupByFeds');
  const FinalOutput = [];

  let federalData = [];
  if (mapViewBy === 'province') {
    federalData = province.map(data => {
      return {
        code: data.FIRST_PROV,
        name: data.prov_name,
        count: 0,
      };
    });
  } else {
    federalData = district.map(data => {
      return {
        code: data.districtid,
        name: data.name,
        count: 0,
      };
    });
  }
  // eslint-disable-next-line
  for (const [key, value] of Object.entries(groupByFeds)) {
    const groupByFed = groupBy(value, it => it.achievement_type);
    // console.log(groupByFed, 'groupbyFed');
    const final = Object.keys(groupByFed).map((name, second) => {
      // console.log(byName[name][0], '1stname');
      // console.log(name, 'name');
      // console.log(second, 'second');
      // const byZone = groupBy(byName[name], it => it.Zone);
      const sum = groupByFed[name].reduce(
        (acc, it) => acc + it.achieved_number,
        0,
      );
      console.log(groupByFed[name][0][federalKey], '1st');
      return {
        fed_name: name,
        code: groupByFed[name][0][federalKey],
        // fed_code:
        // ZoneCount: Object.keys(byZone).length,
        count: sum,
      };
    });
    console.log(final, 'final');
    console.log(key, 'key');
    federalData.forEach(test => {
      if (test.code === +key) {
        FinalOutput.push({ ...test, pie: final });
      }
    });
    // console.log(groupByFed, 'groupByFed');
    // console.log(key, 'key');
  }
  console.log(FinalOutput, 'finalOutput');
  // const byFederal = groupBy(anotherArray, it => it[federalKey]);
  // const byAchievementType = groupBy(
  //   anotherArray,
  //   it => it.achievement_type,
  // );
  // // console.log(province, 'province');
  // // console.log(district, 'district');

  // console.log(federalData, 'federalData');
  // const labels = federalData.map(data => {
  //   const name = data.name.toLowerCase();
  //   const nameCapitalized =
  //     name.charAt(0).toUpperCase() + name.slice(1);
  //   return nameCapitalized;
  // });
  // const output = Object.keys(byFederal).map((name, second) => {
  //   const sum = byFederal[name].reduce(
  //     (acc, it) => acc + it.achieved_number,
  //     0,
  //   );
  //   return {
  //     code: name,
  //     // ZoneCount: Object.keys(byZone).length,
  //     count: sum,
  //   };
  // });

  // const finalArray = [];
  // // eslint-disable-next-line no-restricted-syntax
  // for (const [key, value] of Object.entries(byAchievementType)) {
  //   const groupByFed = groupBy(value, it => it[federalKey]);
  //   // console.log(groupByFed, 'groupbyFed');
  //   const final = Object.keys(groupByFed).map((name, second) => {
  //     // console.log(byName[name][0], '1stname');
  //     // console.log(name, 'name');
  //     // console.log(second, 'second');
  //     // const byZone = groupBy(byName[name], it => it.Zone);
  //     const sum = groupByFed[name].reduce(
  //       (acc, it) => acc + it.achieved_number,
  //       0,
  //     );
  //     return {
  //       code: name,
  //       // ZoneCount: Object.keys(byZone).length,
  //       count: sum,
  //     };
  //   });

  //   const mappedCount = test.map(data => {
  //     return data.count;
  //   });
  //   finalArray.push({ name: key, data: mappedCount });
  //   console.log(finalArray, 'finalArray');

  //   // id(pin):1
  //   // name(pin):"Province 1"
  //   // code(pin):1
  //   // count(pin):24
  //   // pie:{
  //   //   investment_primary(pin):"Automation of MFIs"
  //   //   partner_count(pin):3
  //   //   partner_list:{
  //   //   0(pin):"Laxmi Laghubitta Bittiya Sanstha Ltd."
  //   //   1(pin):"Nepal Microfinance Bankers' Association"
  //   //   2(pin):"Chhimek Laghubitta"
  //   //   }
  //   //   total_beneficiary(pin):0
  //   //   allocated_budget(pin):0
  //   // }
  // }
  return {
    ...state,
    mfsPieData: FinalOutput,
    // mfsMapPieData: finalData,
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
    case FILTER_MFS_CHART_DATA_BY_DISTRICT_ID:
      return filterMfsChartDataByDistrict(state, action);
    case FILTER_MFS_MAP_PIE_DATA:
      return filterMfsMapPieData(state, action);
    // case GET_PROJECT_LIST_DATA:
    //   return getProjectListData(state, action);

    // case GET_MAP_DATA:
    //   return getMapData(state, action);
    default:
      return state;
  }
}
