import {
  GET_AUTOMATION_DATA_BY_PARTNER,
  GET_AUTOMATION_DATA_BY_PROVINCE,
  GET_AUTOMATION_DATA_BY_DISTRICT,
  GET_AUTOMATION_DATA_BY_MUNICIPALITY,
  FILTER_AUTOMATION_DATA_FOR_VECTORTILES,
  FILTER_DISTRICT_FROM_PROVINCE_COLOR,
  GET_DISTRICTDATA_BY_PROVINCE,
  GET_MUNICIPALITYDATA_BY_DISTRICT,
  GET_ALLPROVINCENAME_DATA,
  GET_ALLDISTRICTNAME_DATA,
  GET_ALLMUNICIPALITYNAME_DATA,
  FILTER_PARTNERS_SELECT,
  GET_SEARCHED_PARTNERS,
  FILTER_PARTNERS_BY_FEDERAL,
  GET_AUTOMATION_BRANCHES_TABLE_DATA,
  GET_AUTOMATION_BRANCHES_TABLE_DATA_BY_FEDERAL,
  GET_AUTOMATION_BRANCHES_TABLE_DATA_BY_PARTNER,
  FILTER_PARTNERS_BY_FEDERAL_WITH_CLICKEDPARTNERS,
  PARTNER_SELECT_WITH_OUTREACH_GET_PARTNER_CHOROPLETHDATA,
  SELECT_AUTOMATION_DATA_BY_PROVINCE,
  SELECT_AUTOMATION_DATA_BY_DISTRICT,
  SELECT_AUTOMATION_DATA_BY_MUNICIPALITY,
  GET_TIMELINE_DATA,
  TIMELINE_FILTER,
  GET_AUTOMATION_DATA_FOR_TIMELINE,
  AUTOMATION_MUNICIPALITY_LEGEND,
  AUTOMATION_PROVINCE_LEGEND,
  AUTOMATION_DISTRICT_LEGEND,
  FILTER_PARTNERS_BY_FEDERAL_CLICKED_EXCEPTION,
} from '../actions/index.actions';
import province from '../../data/province.json';
import district from '../../data/district.json';
import municipality from '../../data/municipality.json';

const initialState = {
  automationAllDataByPartner: [],
  automationDataByProvince: [],
  automationDataByDistrict: [],
  automationDataByMunicipality: [],
  automationChoroplethData: [],
  automationLeftSidePartnerData: [],
  automationRightSidePartnerData: [],
  automationTableData: [],
  allProvinceName: [],
  allDistrictName: [],
  allMunicipalityName: [],
  dataLoading: true,
  tableDataLoading: true,
  filteredMapBoundaryData: [],
  timeLineData: [],
  popupData: [],
  timelineFilteredData: [],
  newTimelineData: [],
  provinceLegendData: '',
  districtLegendData: '',
  municipalityLegendData: '',
};

function getPartnerColor(i) {
  if (i % 12 === 0) return '#e69109';
  if (i % 12 === 1) return '#63a4ff';
  if (i % 12 === 2) return '#8629ff';
  if (i % 12 === 3) return '#e553ed';
  if (i % 12 === 4) return '#f2575f';
  if (i % 12 === 5) return '#915e0d';
  if (i % 12 === 6) return '#a1970d';
  if (i % 12 === 7) return '#4f7d14';
  if (i % 12 === 8) return '#07aba1';
  if (i % 12 === 9) return '#1d4c8f';
  if (i % 12 === 10) return '#491991';
  if (i % 12 === 11) return '#610766';
  if (i % 12 === 12) return '#6e0208';
  if (i % 12 === 13) return '#f07818';
  return 'green';
}
const partnerForChoropleth = (state, action) => {
  //
  // const allData = [];
  const leftsideData = action.payload[0].partner_data;
  leftsideData.sort(function(a, b) {
    const nameA = a.partner_name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.partner_name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  let partnerData = action.payload[0].partner_data.map(data => {
    return data.tablets_deployed;
  });
  const partnerName = action.payload[0].partner_data.map(data => {
    return data.partner_name;
  });
  const partnerColor = action.payload[0].partner_data.map(data => {
    return getPartnerColor(data.id);
  });
  if (action.payload[0].partner_data.length < 1) {
    partnerData = [0];
  }
  return {
    ...state,
    automationAllDataByPartner: action.payload,
    automationLeftSidePartnerData: leftsideData,
    automationRightSidePartnerData: {
      0: {
        ...action.payload[0],
        tabletsGraphData: partnerData,
        tabletsGraphLabel: partnerName,
        tabletsGraphColor: partnerColor,
      },
    },
  };
};

const setTimelineData = (state, action) => {
  return { ...state, newTimelineData: action.payload };
};

const timeLineFilter = (state, action) => {
  const minRange = action.payload.min;
  const maxRange = action.payload.max;
  const markerData = state.newTimelineData;

  const filteredDataByYear =
    markerData &&
    markerData[0] &&
    markerData[0].partner_data.filter(data => {
      const dataDate = new Date(`${data.full_data}`).getTime();
      return dataDate >= minRange && dataDate <= maxRange;
    });

  return {
    ...state,
    automationLeftSidePartnerData: filteredDataByYear,
    timelineFilteredData: filteredDataByYear,
  };
};

const partnerByProvinceForChoropleth = (state, action) => {
  //
  const fullData = [];
  const choroplethProvinceData = action.payload.map(data => {
    //
    fullData.push({
      id: data.code,
      count:
        data.tablets_deployed === null ? 0 : data.tablets_deployed,
    });
    return true;
  });
  //
  fullData.sort(function(a, b) {
    return a.id - b.id;
  });
  //
  return {
    ...state,
    automationDataByProvince: fullData,
    dataLoading: false,
  };
};
const partnerByDistrictForChoropleth = (state, action) => {
  //
  //
  const fullData = [];
  const choroplethProvinceData = action.payload.map(data => {
    fullData.push({
      id: data.code,
      count:
        data.tablets_deployed === null ? 0 : data.tablets_deployed,
    });
    return true;
  });
  //
  fullData.sort(function(a, b) {
    return a.id - b.id;
  });
  //
  return {
    ...state,
    automationDataByDistrict: fullData,
    dataLoading: false,
  };
};
const partnerByMunicipalityForChoropleth = (state, action) => {
  const fullData = [];
  const choroplethProvinceData = action.payload.map(data => {
    fullData.push({
      id: data.code,
      count:
        data.tablets_deployed === null ? 0 : data.tablets_deployed,
    });
    return true;
  });
  fullData.sort(function(a, b) {
    return a.id - b.id;
  });
  return {
    ...state,
    automationDataByMunicipality: fullData,
    automationChoroplethData: fullData,
    dataLoading: false,
  };
};
const filterAutomationDataForVectorTile = (state, action) => {
  const stateLevel = action.payload;
  const {
    automationDataByProvince,
    automationDataByDistrict,
    automationDataByMunicipality,
  } = state;

  if (stateLevel === 'province') {
    //
    return {
      ...state,
      automationChoroplethData: automationDataByProvince,
      dataLoading: false,
    };
  }
  if (stateLevel === 'district') {
    //
    return {
      ...state,
      automationChoroplethData: automationDataByDistrict,
      dataLoading: false,
    };
  }
  if (stateLevel === 'municipality') {
    //
    return {
      ...state,
      automationChoroplethData: automationDataByMunicipality,
      dataLoading: false,
    };
  }
  //
  return {
    ...state,
    automationChoroplethData: automationDataByMunicipality,
    dataLoading: false,
  };
};
const filterDistrictFromProvinceColor = (state, action) => {
  //
  //
  const fullData = [];
  const choroplethProvinceData = action.payload.map(data => {
    fullData.push({
      id: data.code,
      count:
        data.tablets_deployed === null ? 0 : data.tablets_deployed,
    });
    return true;
  });
  //
  fullData.sort(function(a, b) {
    return a.id - b.id;
  });
  //
  return {
    ...state,
    automationChoroplethData: fullData,
    dataLoading: false,
  };
};

const filterPartnerSelect = (state, action) => {
  //
  const { automationRightSidePartnerData } = state;
  action.payload[0].partner_data.sort(function(a, b) {
    const nameA = a.partner_name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.partner_name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  let partnerData = action.payload[0].partner_data.map(data => {
    return data.tablets_deployed;
  });
  const partnerName = action.payload[0].partner_data.map(data => {
    return data.partner_name;
  });
  const partnerColor = action.payload[0].partner_data.map(data => {
    return getPartnerColor(data.id);
  });
  // console.log(
  //   {
  //     automationRightSidePartnerData: [action.payload[0]],
  //   },
  //   'a',
  // );
  // console.log(
  //   {
  //     automationRightSidePartnerData: {
  //       0: {
  //         ...action.payload[0],
  //         tabletsGraphData: a,
  //       },
  //     },
  //   },
  //   'b',
  // );
  if (action.payload[0].partner_data.length < 1) {
    partnerData = [0];
  }
  return {
    ...state,
    automationRightSidePartnerData: {
      0: {
        ...action.payload[0],
        tabletsGraphData: partnerData,
        tabletsGraphLabel: partnerName,
        tabletsGraphColor: partnerColor,
      },
    },
  };
};

const getProvinceData = (state, action) => {
  function GetSortOrder(prop) {
    return function(a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      }
      if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }
  //
  action.payload.sort(GetSortOrder('code'));
  return {
    ...state,
    allProvinceName: action.payload,
  };
};
const getDistrictData = (state, action) => {
  return {
    ...state,
    allDistrictName: action.payload,
  };
};
const getMunicipalityData = (state, action) => {
  return {
    ...state,
    allMunicipalityName: action.payload,
  };
};

const districtDataFromProvince = (state, action) => {
  return {
    ...state,
    allDistrictName: action.payload,
  };
};
const municipalityDataFromDistrict = (state, action) => {
  return {
    ...state,
    allMunicipalityName: action.payload,
  };
};

const searchPartnersWithKeyword = (state, action) => {
  const filteredLeftSideData = state.automationAllDataByPartner[0].partner_data.filter(
    data => {
      return data.partner_name
        .toUpperCase()
        .includes(action.payload.toUpperCase());
    },
  );
  return {
    ...state,
    automationLeftSidePartnerData: filteredLeftSideData,
  };
};
const filterPartnerByFederal = (state, action) => {
  const leftsideData = action.payload[0].partner_data;
  // const choroplethData = action.payload.map(data => {
  //   allData.push({ id: data.id, count: data.num_tablet_deployed });
  //   return true;
  // });
  leftsideData.sort(function(a, b) {
    const nameA = a.partner_name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.partner_name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  let partnerData = action.payload[0].partner_data.map(data => {
    return data.tablets_deployed;
  });
  const partnerName = action.payload[0].partner_data.map(data => {
    return data.partner_name;
  });
  const partnerColor = action.payload[0].partner_data.map(data => {
    return getPartnerColor(data.id);
  });
  if (action.payload[0].partner_data.length < 1) {
    partnerData = [0];
  }
  return {
    ...state,
    automationAllDataByPartner: action.payload,
    automationLeftSidePartnerData: leftsideData,
    automationRightSidePartnerData: {
      0: {
        ...action.payload[0],
        tabletsGraphData: partnerData,
        tabletsGraphLabel: partnerName,
        tabletsGraphColor: partnerColor,
      },
    },
  };
};
const filterPartnerByFederalClickedException = (state, action) => {
  const leftsideData = action.payload[0].partner_data;
  // const choroplethData = action.payload.map(data => {
  //   allData.push({ id: data.id, count: data.num_tablet_deployed });
  //   return true;
  // });
  leftsideData.sort(function(a, b) {
    const nameA = a.partner_name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.partner_name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  let partnerData = action.payload[0].partner_data.map(data => {
    return data.tablets_deployed;
  });
  const partnerName = action.payload[0].partner_data.map(data => {
    return data.partner_name;
  });
  const partnerColor = action.payload[0].partner_data.map(data => {
    return getPartnerColor(data.id);
  });
  if (action.payload[0].partner_data.length < 1) {
    partnerData = [0];
  }
  return {
    ...state,
    // automationAllDataByPartner: action.payload,
    automationLeftSidePartnerData: leftsideData,
    // automationRightSidePartnerData: {
    //   0: {
    //     ...action.payload[0],
    //     tabletsGraphData: partnerData,
    //     tabletsGraphLabel: partnerName,
    //     tabletsGraphColor: partnerColor,
    //   },
    // },
  };
};
const getAutomationDataForTable = (state, action) => {
  return {
    ...state,
    automationTableData: action.payload,
    tableDataLoading: false,
  };
};
const getAutomationDataForTableByFederal = (state, action) => {
  return {
    ...state,
    automationTableData: action.payload,
    // tableDataLoading: false,
  };
};
const getAutomationDataForTableByPartner = (state, action) => {
  return {
    ...state,
    automationTableData: action.payload,
    // tableDataLoading: false,
  };
};
const filterPartnerByFederalwithClickedPartners = (state, action) => {
  const leftsideData = action.payload[0].partner_data;
  // const choroplethData = action.payload.map(data => {
  //   allData.push({ id: data.id, count: data.num_tablet_deployed });
  //   return true;
  // });
  leftsideData.sort(function(a, b) {
    const nameA = a.partner_name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.partner_name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  let partnerData = action.payload[0].partner_data.map(data => {
    return data.tablets_deployed;
  });
  const partnerName = action.payload[0].partner_data.map(data => {
    return data.partner_name;
  });
  const partnerColor = action.payload[0].partner_data.map(data => {
    return getPartnerColor(data.id);
  });
  if (action.payload[0].partner_data.length < 1) {
    partnerData = [0];
  }
  return {
    ...state,
    automationAllDataByPartner: action.payload,
    // automationLeftSidePartnerData: leftsideData,
    automationRightSidePartnerData: {
      0: {
        ...action.payload[0],
        tabletsGraphData: partnerData,
        tabletsGraphLabel: partnerName,
        tabletsGraphColor: partnerColor,
      },
    },
  };
};

const partnerSelectWithOutreachGetPartnerChoropleth = (
  state,
  action,
) => {
  const { selectedFed } = action.payload;
  let newMainData = null;
  if (selectedFed === 'municipality') {
    newMainData = [...municipality]; // you get a clone of data
    newMainData.forEach((item, index) => {
      action.payload.result.forEach(p => {
        if (p.code === item.munid) {
          newMainData[index] = {
            ...item,
            ...p,
            id: item.munid,
            count: p.tablets_deployed,
          };
        }
      });
      // eslint-disable-next-line no-param-reassign
      item.id = item.munid;
      // eslint-disable-next-line no-param-reassign
      item.count = 0;
    });
  } else if (selectedFed === 'district') {
    newMainData = [...district]; // you get a clone of data
    newMainData.forEach((item, index) => {
      action.payload.result.forEach(p => {
        if (p.code === item.districtid) {
          newMainData[index] = {
            ...item,
            ...p,
            id: item.districtid,
            count: p.tablets_deployed,
          };
        }
      });
      // eslint-disable-next-line no-param-reassign
      item.id = item.districtid;
      // eslint-disable-next-line no-param-reassign
      item.count = 0;
    });
  } else {
    newMainData = [...province]; // you get a clone of data
    newMainData.forEach((item, index) => {
      action.payload.result.forEach(p => {
        if (p.code === item.FIRST_PROV) {
          newMainData[index] = {
            ...item,
            ...p,
            id: item.FIRST_PROV,
            count: p.tablets_deployed,
          };
        }
      });
      // eslint-disable-next-line no-param-reassign
      item.id = item.FIRST_PROV;
      // eslint-disable-next-line no-param-reassign
      item.count = 0;
    });
  }
  return {
    ...state,
    automationChoroplethData: newMainData,
  };
};
const selectProvinceForChoropleth = (state, action) => {
  return {
    ...state,
    automationChoroplethData: state.automationDataByProvince,
  };
};
const selectDistrictForChoropleth = (state, action) => {
  return {
    ...state,
    automationChoroplethData: state.automationDataByDistrict,
  };
};
const selectMunicipalityForChoropleth = (state, action) => {
  return {
    ...state,
    automationChoroplethData: state.automationDataByMunicipality,
  };
};
const getTimelineData = (state, action) => {
  return {
    ...state,
    timeLineData: action.payload,
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AUTOMATION_DATA_BY_PARTNER:
      return partnerForChoropleth(state, action);
    case GET_AUTOMATION_DATA_BY_PROVINCE:
      return partnerByProvinceForChoropleth(state, action);
    case GET_AUTOMATION_DATA_BY_DISTRICT:
      return partnerByDistrictForChoropleth(state, action);
    case GET_AUTOMATION_DATA_BY_MUNICIPALITY:
      return partnerByMunicipalityForChoropleth(state, action);

    case SELECT_AUTOMATION_DATA_BY_PROVINCE:
      return selectProvinceForChoropleth(state, action);
    case SELECT_AUTOMATION_DATA_BY_DISTRICT:
      return selectDistrictForChoropleth(state, action);
    case SELECT_AUTOMATION_DATA_BY_MUNICIPALITY:
      return selectMunicipalityForChoropleth(state, action);

    case FILTER_AUTOMATION_DATA_FOR_VECTORTILES:
      return filterAutomationDataForVectorTile(state, action);
    case FILTER_DISTRICT_FROM_PROVINCE_COLOR:
      return filterDistrictFromProvinceColor(state, action);

    case GET_SEARCHED_PARTNERS:
      return searchPartnersWithKeyword(state, action);

    case FILTER_PARTNERS_SELECT:
      return filterPartnerSelect(state, action);
    case FILTER_PARTNERS_BY_FEDERAL:
      return filterPartnerByFederal(state, action);
    case FILTER_PARTNERS_BY_FEDERAL_CLICKED_EXCEPTION:
      return filterPartnerByFederalClickedException(state, action);
    case FILTER_PARTNERS_BY_FEDERAL_WITH_CLICKEDPARTNERS:
      return filterPartnerByFederalwithClickedPartners(state, action);

    case GET_ALLPROVINCENAME_DATA:
      return getProvinceData(state, action);
    case GET_ALLDISTRICTNAME_DATA:
      return getDistrictData(state, action);
    case GET_ALLMUNICIPALITYNAME_DATA:
      return getMunicipalityData(state, action);

    case GET_DISTRICTDATA_BY_PROVINCE:
      return districtDataFromProvince(state, action);
    case GET_MUNICIPALITYDATA_BY_DISTRICT:
      return municipalityDataFromDistrict(state, action);

    case GET_AUTOMATION_BRANCHES_TABLE_DATA:
      return getAutomationDataForTable(state, action);
    case GET_AUTOMATION_BRANCHES_TABLE_DATA_BY_FEDERAL:
      return getAutomationDataForTableByFederal(state, action);
    case GET_AUTOMATION_BRANCHES_TABLE_DATA_BY_PARTNER:
      return getAutomationDataForTableByPartner(state, action);
    case PARTNER_SELECT_WITH_OUTREACH_GET_PARTNER_CHOROPLETHDATA:
      return partnerSelectWithOutreachGetPartnerChoropleth(
        state,
        action,
      );
    case GET_TIMELINE_DATA:
      return getTimelineData(state, action);
    case TIMELINE_FILTER:
      return timeLineFilter(state, action);
    case GET_AUTOMATION_DATA_FOR_TIMELINE:
      return setTimelineData(state, action);
    case AUTOMATION_MUNICIPALITY_LEGEND:
      return {
        ...state,
        municipalityLegendData: action.payload,
      };
    case AUTOMATION_DISTRICT_LEGEND:
      return {
        ...state,
        districtLegendData: action.payload,
      };
    case AUTOMATION_PROVINCE_LEGEND:
      return {
        ...state,
        provinceLegendData: action.payload,
      };
    default:
      return state;
  }
}
