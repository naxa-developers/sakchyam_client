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
  FILTER_MFS_MAP_PIE_DATA,
  FILTER_MFS_CHART_DATA_BY_DISTRICT_ID,
  FILTER_MFS_CHART_DATA_BY_ACHIEVEMENT,
  FILTER_MFS_CHART_DATA_BY_PARTNER,
  FILTER_MFS_CHART_DATA_BY_PARTNER_WITH_INNOVATION,
} from '../actions/index.actions';
import province from '../../data/province.json';
import district from '../../data/district.json';

function numberWithCommas(x) {
  if (x !== null) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return x;
}
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
  legendAchievement: [],
  mfsOverviewData: {},
  partnerList: [],
  mfsChoroplethData: [],
  mfsChartData: {},
  mfsChartDataByPartner: {},
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
  //
  const mfsData = [...action.payload];
  const achievementList = getUniqueValuesFromArray(
    mfsData,
    'achievement_type',
  );
  return {
    ...state,
    achievementList,
    legendAchievement: achievementList,
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
  let dataFilter = mfsData;
  if (selectedPartner.length > 0) {
    dataFilter = dataFilter.filter(data => {
      return selectedPartner.includes(data.partner_name);
    });
  }
  if (selectedInnovation.length > 0) {
    dataFilter = dataFilter.filter(data => {
      return selectedInnovation.includes(data.key_innovation);
    });
  }
  if (selectedAchievement.length > 0) {
    dataFilter = dataFilter.filter(data => {
      return selectedAchievement.includes(data.achievement_type);
    });
  }

  const filteredAchievedTotal = dataFilter.map(data => {
    return data.achieved_number;
  });
  const mfsInnovationLength = getUniqueValuesFromArray(
    dataFilter,
    'key_innovation',
  );
  const mfsPartnerLength = getUniqueValuesFromArray(
    dataFilter,
    'partner_id',
  );

  const totalAchievedNumber = [...filteredAchievedTotal].reduce(
    function(prev, cur) {
      return prev + cur;
    },
    0,
  );

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
    selectedDistrict,
    selectedProvince,
  } = action.payload;

  const mfsData = [...state.mfsListAllData];
  let filteredData = mfsData;
  if (selectedAchievement.length > 0) {
    filteredData = mfsData.filter(data => {
      return selectedAchievement.includes(data.achievement_type);
    });
  }
  if (selectedInnovation.length > 0) {
    filteredData = mfsData.filter(data => {
      return selectedInnovation.includes(data.key_innovation);
    });
  }
  if (selectedPartner.length > 0) {
    filteredData = mfsData.filter(data => {
      return selectedPartner.includes(data.partner_name);
    });
  }
  let filteredFederal = filteredData;

  if (selectedDistrict && selectedDistrict.lengh > 0) {
    //
    filteredFederal = filteredData.filter(
      elem =>
        selectedDistrict.find(
          ({ code }) => elem.district_code === code,
        ) && elem,
    );
  } else if (selectedProvince && selectedProvince.length > 0) {
    //
    filteredFederal = filteredData.filter(
      elem =>
        selectedProvince.find(
          ({ code }) => elem.province_code === code,
        ) && elem,
    );
  }
  // const filteredByInnovation = filteredByPartner.filter(data => {
  //   return selectedInnovation.includes(data.key_innovation);
  // });
  // const filteredChoroplethData = filteredByInnovation.filter(data => {
  //   return selectedAchievement.includes(data.achievement_type);
  // });
  //

  const anotherArray = [...filteredFederal];
  const federalKey =
    mapViewBy === 'province' ? 'province_code' : 'district_code';

  const byFederal = groupBy(anotherArray, it => it[federalKey]);
  const byAchievementType = groupBy(
    anotherArray,
    it => it.achievement_type,
  );
  //
  //
  const provinceData = province.map(data => {
    return { code: data.FIRST_PROV, name: data.prov_name, count: 0 };
  });

  //
  const output = Object.keys(byFederal).map((name, second) => {
    //
    //
    //
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
const filterMfsChartDataByAchievement = (state, action) => {
  const {
    mapViewBy,
    selectedPartner,
    selectedInnovation,
    selectedAchievement,
    selectedDistrict,
    selectedProvince,
    showBarof,
    showBarPartnerChartOf,
  } = action.payload;
  const mfsData = [...state.mfsListAllData];
  let filteredDatas = mfsData;
  if (selectedAchievement.length > 0) {
    filteredDatas = filteredDatas.filter(data => {
      return selectedAchievement.includes(data.achievement_type);
    });
  }
  if (selectedInnovation.length > 0) {
    filteredDatas = filteredDatas.filter(data => {
      return selectedInnovation.includes(data.key_innovation);
    });
  }
  if (selectedPartner.length > 0) {
    filteredDatas = filteredDatas.filter(data => {
      return selectedPartner.includes(data.partner_name);
    });
  }
  // const filteredFederal = filteredData;
  const data = filteredDatas;
  // const data = require('./mfs.json');
  const achievementType = [
    ...new Set(data.map(item => item.achievement_type)),
  ];
  const provinceData = province;
  const districtData = district;
  const allProvinces = provinceData.map(item => ({
    code: item.FIRST_PROV,
    name: item.prov_name,
  }));
  const allDistricts = districtData.map(item => ({
    code: item.districtid,
    name: item.name,
  }));

  const selectedProvinceCode =
    selectedProvince &&
    selectedProvince.length > 0 &&
    selectedProvince.map(prov => prov.code);
  const provinces =
    selectedProvinceCode && selectedProvinceCode.length > 0
      ? allProvinces.filter(singleprov =>
          selectedProvinceCode.includes(singleprov.code),
        )
      : allProvinces;
  const selectedDistrictCode =
    selectedDistrict &&
    selectedDistrict.length > 0 &&
    selectedDistrict.map(dist => dist.code);
  const districts =
    selectedDistrictCode && selectedDistrictCode.length > 0
      ? allDistricts.filter(singledist =>
          selectedDistrictCode.includes(singledist.code),
        )
      : allDistricts;
  function generateStackedBarData(datax) {
    function getCount(achievement, { code, type }) {
      const filteredData = datax.filter(item =>
        type === 'province'
          ? item.province_code === code &&
            item.achievement_type === achievement
          : item.district_code === code &&
            item.achievement_type === achievement,
      );
      const count = filteredData.reduce(
        (sum, item) => sum + item.achieved_number,
        0,
      );
      return count;
    }
    function getData(achievement, type) {
      const arr = [];
      if (type === 'province') {
        provinces.forEach(item => {
          arr.push(getCount(achievement, { code: item.code, type }));
        });
      } else {
        districts.forEach(item => {
          arr.push(getCount(achievement, { code: item.code, type }));
        });
      }
      return arr;
    }
    const provinceSeries = [];
    const districtSeries = [];
    const provinceLabel = provinces.map(item => item.name);
    const districtLabel = districts.map(item => item.name);
    // province series calculation
    achievementType.forEach(achievement => {
      provinceSeries.push({
        name: achievement,
        data: getData(achievement, 'province'),
      });
    });
    // district series calculation
    achievementType.forEach(achievement => {
      districtSeries.push({
        name: achievement,
        data: getData(achievement, 'district'),
      });
    });
    return {
      provinceSeries,
      districtSeries,
      provinceLabel,
      districtLabel,
    };
  }
  const seriesData = generateStackedBarData(data);

  //
  return {
    ...state,
    mfsChartData: {
      series:
        mapViewBy === 'province'
          ? seriesData.provinceSeries
          : seriesData.districtSeries,
      labels:
        mapViewBy === 'province'
          ? seriesData.provinceLabel
          : seriesData.districtLabel,
    },
  };
};
const filterMfsChartDataByPartner = (state, action) => {
  const {
    mapViewBy,
    selectedPartner,
    selectedInnovation,
    selectedAchievement,
    selectedDistrict,
    selectedProvince,
  } = action.payload;
  // console.log(selectedDistrict, 'selectedDistrict');
  // console.log(selectedProvince, 'selectedProvince');
  const mfsData = [...state.mfsListAllData];
  let filteredData = mfsData;
  if (selectedAchievement.length > 0) {
    filteredData = filteredData.filter(data => {
      return selectedAchievement.includes(data.achievement_type);
    });
  }
  if (selectedInnovation.length > 0) {
    filteredData = filteredData.filter(data => {
      return selectedInnovation.includes(data.key_innovation);
    });
  }
  if (selectedPartner.length > 0) {
    filteredData = filteredData.filter(data => {
      return selectedPartner.includes(data.partner_name);
    });
  }
  let filteredFederal = filteredData;
  // console.log(filteredFederal, 'before Federal Filter');

  if (selectedDistrict && selectedDistrict.length > 0) {
    //
    // console.log('test');
    filteredFederal = filteredData.filter(
      elem =>
        selectedDistrict.find(
          // eslint-disable-next-line camelcase
          ({ n_code }) => elem.district_code === n_code,
        ) && elem,
    );
  } else if (selectedProvince && selectedProvince.length > 0) {
    //
    filteredFederal = filteredData.filter(
      elem =>
        selectedProvince.find(
          ({ code }) => elem.province_code === code,
        ) && elem,
    );
  }
  // console.log(filteredFederal, 'after Federal Filter');
  const anotherArray = [...filteredFederal];
  function generateStackedBarData(data) {
    const achievementType = [
      ...new Set(data.map(item => item.achievement_type)),
    ];
    const partner = [...new Set(data.map(item => item.partner_name))];
    function getCount(achievement, partners) {
      const count = data
        .filter(
          item =>
            item.partner_name === partners &&
            item.achievement_type === achievement,
        )
        .map(item => item.achieved_number)
        .reduce((sum, item) => sum + item, 0);
      return count;
    }
    function getData(achievement) {
      const arr = [];
      partner.forEach(item => {
        arr.push(getCount(achievement, item));
      });
      return arr;
    }
    const series = [];
    achievementType.forEach(achievement => {
      series.push({
        name: achievement,
        data: getData(achievement),
      });
    });
    return { series, label: partner };
  }
  const finalData = generateStackedBarData(anotherArray);
  return {
    ...state,
    mfsChartDataByPartner: {
      series: finalData.series,
      labels: finalData.label,
    },
  };
};
const filterMfsChartDataByPartnerWithInnovation = (state, action) => {
  const {
    mapViewBy,
    selectedPartner,
    selectedInnovation,
    selectedAchievement,
    selectedDistrict,
    selectedProvince,
    clickedPartner,
  } = action.payload;
  const mfsData = [...state.mfsListAllData];
  let filteredData = mfsData;
  if (selectedAchievement.length > 0) {
    filteredData = filteredData.filter(data => {
      return selectedAchievement.includes(data.achievement_type);
    });
  }
  if (selectedInnovation.length > 0) {
    filteredData = filteredData.filter(data => {
      return selectedInnovation.includes(data.key_innovation);
    });
  }
  if (selectedPartner.length > 0) {
    filteredData = filteredData.filter(data => {
      return selectedPartner.includes(data.partner_name);
    });
  }
  if (clickedPartner) {
    filteredData = filteredData.filter(data => {
      return clickedPartner === data.partner_name;
    });
  }
  let filteredFederal = filteredData;

  if (selectedDistrict && selectedDistrict.lengh > 0) {
    //
    filteredFederal = filteredData.filter(
      elem =>
        selectedDistrict.find(
          ({ code }) => elem.district_code === code,
        ) && elem,
    );
  } else if (selectedProvince && selectedProvince.length > 0) {
    //
    filteredFederal = filteredData.filter(
      elem =>
        selectedProvince.find(
          ({ code }) => elem.province_code === code,
        ) && elem,
    );
  }
  const anotherArray = [...filteredFederal];
  function generateStackedBarData(data) {
    const achievementType = [
      ...new Set(data.map(item => item.achievement_type)),
    ];
    const innovation = [
      ...new Set(data.map(item => item.key_innovation)),
    ];
    function getCount(achievement, innovations) {
      const count = data
        .filter(
          item =>
            item.key_innovation === innovations &&
            item.achievement_type === achievement,
        )
        .map(item => item.achieved_number)
        .reduce((sum, item) => sum + item, 0);
      return count;
    }
    function getData(achievement) {
      const arr = [];
      innovation.forEach(item => {
        arr.push(getCount(achievement, item));
      });
      return arr;
    }
    const series = [];
    achievementType.forEach(achievement => {
      series.push({
        name: achievement,
        data: getData(achievement),
      });
    });
    return { series, label: innovation };
  }
  const finalData = generateStackedBarData(anotherArray);
  return {
    ...state,
    mfsChartDataByPartner: {
      series: finalData.series,
      labels: finalData.label,
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
  let filteredDatas = mfsData;
  if (selectedAchievement.length > 0) {
    filteredDatas = filteredDatas.filter(data => {
      return selectedAchievement.includes(data.achievement_type);
    });
  }
  if (selectedInnovation.length > 0) {
    filteredDatas = filteredDatas.filter(data => {
      return selectedInnovation.includes(data.key_innovation);
    });
  }
  if (selectedPartner.length > 0) {
    filteredDatas = filteredDatas.filter(data => {
      return selectedPartner.includes(data.partner_name);
    });
  }
  const anotherArray = [...filteredDatas];
  const federalKey =
    mapViewBy === 'province' ? 'province_code' : 'district_code';

  const federalData = [];

  const filteredFederalDistrict = filteredDatas.filter(data => {
    return districtList.includes(data.district_code);
  });
  const data = filteredFederalDistrict;
  const achievementType = [
    ...new Set(data.map(item => item.achievement_type)),
  ];
  const districtData = district;
  // const provinces = provinceData.map(item => ({
  //   code: item.FIRST_PROV,
  //   name: item.prov_name,
  // }));
  const districtx = districtData.map(item => ({
    code: item.districtid,
    name: item.name,
  }));
  const districts = districtx.filter(datas => {
    return districtList.includes(datas.code);
  });

  function generateStackedBarData(datax) {
    function getCount(achievement, { code, type }) {
      const filteredData = datax.filter(
        item =>
          item.district_code === code &&
          item.achievement_type === achievement,
      );
      const count = filteredData.reduce(
        (sum, item) => sum + item.achieved_number,
        0,
      );
      return count;
    }
    function getData(achievement, type) {
      const arr = [];

      districts.forEach(item => {
        arr.push(getCount(achievement, { code: item.code, type }));
      });

      return arr;
    }
    const districtSeries = [];
    const districtLabel = districts.map(item => item.name);

    // district series calculation
    achievementType.forEach(achievement => {
      districtSeries.push({
        name: achievement,
        data: getData(achievement, 'district'),
      });
    });
    return {
      districtSeries,
      districtLabel,
    };
  }
  const seriesData = generateStackedBarData(data);

  //
  return {
    ...state,
    mfsChartData: {
      series: seriesData.districtSeries,
      labels: seriesData.districtLabel,
    },
  };
};
const filterMfsMapPieData = (state, action) => {
  const {
    mapViewBy,
    selectedPartner,
    selectedInnovation,
    selectedAchievement,
    selectedProvince,
    selectedDistrict,
  } = action.payload;
  // console.log(selectedDistrict, 'selectedDist Reducer');
  //
  const mfsData = [...state.mfsListAllData];
  const federalKey =
    mapViewBy === 'province' ? 'province_code' : 'district_code';
  let dataFilter = mfsData;
  if (selectedPartner.length > 0) {
    dataFilter = dataFilter.filter(data => {
      return selectedPartner.includes(data.partner_name);
    });
  }
  if (selectedInnovation.length > 0) {
    dataFilter = dataFilter.filter(data => {
      return selectedInnovation.includes(data.key_innovation);
    });
  }
  if (selectedAchievement.length > 0) {
    dataFilter = dataFilter.filter(data => {
      return selectedAchievement.includes(data.achievement_type);
    });
  }
  let filteredFederal = dataFilter;

  if (selectedDistrict && selectedDistrict.length > 0) {
    // console.log(dataFilter, 'dataFilter Reducer');
    filteredFederal = dataFilter.filter(
      elem =>
        selectedDistrict.find(
          ({ code }) => elem.district_code === code,
        ) && elem,
    );
  } else if (selectedProvince && selectedProvince.length > 0) {
    //
    filteredFederal = dataFilter.filter(
      elem =>
        selectedProvince.find(
          ({ code }) => elem.province_code === code,
        ) && elem,
    );
  }
  //
  const datass = [...filteredFederal];
  // const data = require('./mfs.json');
  const provinceData = [...province];
  const districtData = [...district];

  const federal = [];
  // const districts = [];
  const federalArr = [];
  // const districtArr = [];
  if (mapViewBy === 'province') {
    provinceData.forEach(item => {
      federal.push({ code: item.FIRST_PROV, name: item.prov_name });
    });
    if (selectedProvince && selectedProvince.length > 0) {
      filteredFederal = dataFilter.filter(
        elem =>
          selectedProvince.find(({ code }) => elem.code === code) &&
          elem,
      );
    }
  } else if (mapViewBy === 'district') {
    districtData.forEach(item => {
      federal.push({ code: item.districtid, name: item.name });
    });
  }
  // federal = federal.filter(
  //   elem =>
  //     selectedProvince.find(({ code }) =>
  //       mapViewBy === 'province'
  //         ? elem.province_code
  //         : elem.district_code === code,
  //     ) && elem,
  // );
  function getCount(data, achievementType) {
    return data
      .filter(item => item.achievement_type === achievementType)
      .reduce((sum, i) => sum + i.achieved_number, 0);
  }

  function getPieData({ code, type }) {
    const arr = [];
    const filteredData =
      type === 'province'
        ? datass.filter(item => item.province_code === code)
        : datass.filter(item => item.district_code === code);

    filteredData.forEach(item => {
      const obj = arr.some(x => x.name === item.achievement_type);
      if (!obj) {
        arr.push({
          name: item.achievement_type,
          count: getCount(filteredData, item.achievement_type),
        });
      }
    });

    return arr;
  }

  function getAchievementType(data, partner) {
    const arr = [];
    const filteredData = data.filter(
      item => item.partner_name === partner,
    );

    filteredData.forEach(item => {
      const obj = arr.some(x => x.name === item.achievement_type);
      if (!obj) {
        arr.push({
          name: item.achievement_type,
          count: getCount(filteredData, item.achievement_type),
        });
      }
    });

    return arr;
  }

  function getPiePopupData({ code, type }) {
    const arr = [];
    const filteredData =
      type === 'province'
        ? datass.filter(item => item.province_code === code)
        : datass.filter(item => item.district_code === code);
    const partners = [
      ...new Set(filteredData.map(item => item.partner_name)),
    ];

    partners.forEach(item => {
      arr.push({
        partner_name: item,
        achievementType: getAchievementType(filteredData, item),
      });
    });

    return arr;
  }
  if (mapViewBy === 'province') {
    federal.forEach(item => {
      federalArr.push({
        code: item.code,
        name: item.name,
        pie: getPieData({ code: item.code, type: 'province' }),
        piePopup: getPiePopupData({
          code: item.code,
          type: 'province',
        }),
      });
    });
  } else if (mapViewBy === 'district') {
    federal.forEach(item => {
      federalArr.push({
        code: item.code,
        name: item.name,
        pie: getPieData({ code: item.code, type: 'district' }),
        piePopup: getPiePopupData({
          code: item.code,
          type: 'district',
        }),
      });
    });
  }

  //
  //
  return {
    ...state,
    mfsPieData: federalArr,
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
    case FILTER_MFS_CHART_DATA_BY_ACHIEVEMENT:
      return filterMfsChartDataByAchievement(state, action);
    case FILTER_MFS_CHART_DATA_BY_PARTNER:
      return filterMfsChartDataByPartner(state, action);
    case FILTER_MFS_CHART_DATA_BY_PARTNER_WITH_INNOVATION:
      return filterMfsChartDataByPartnerWithInnovation(state, action);
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
