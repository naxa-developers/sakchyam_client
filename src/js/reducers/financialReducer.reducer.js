/* eslint-disable no-restricted-syntax */
import {
  GET_FINANCIAL_DATA,
  GET_FINANCIAL_PROGRAM,
  GET_PARTNERS_LIST,
  FILTER_FINANCIAL_DATA_FOR_GRAPH,
  FILTER_PARTNERS_BY_TYPE,
} from '../actions/index.actions';

function colorPicker(i) {
  if (i % 20 === 0) return '#91664E';
  if (i % 20 === 1) return '#13A8BE';
  if (i % 20 === 2) return '#FF6D00';
  if (i % 20 === 3) return '#DE2693';
  if (i % 20 === 4) return '#B1B424';
  if (i % 20 === 5) return '#2196F3';
  if (i % 20 === 6) return '#4CE2A7';
  if (i % 20 === 7) return '#1967A0';
  if (i % 20 === 8) return '#00C853';
  if (i % 20 === 9) return '#651FFF';
  if (i % 20 === 10) return '#B71DE1';
  if (i % 20 === 11) return '#FFCD00';
  if (i % 20 === 12) return '#E11D3F';
  if (i % 20 === 13) return '#FF1500';
  if (i % 20 === 14) return '#C5E11D';
  if (i % 20 === 15) return '#CDACF2';
  if (i % 20 === 16) return 'AFDE0E';
  if (i % 20 === 17) return '#FF5576';
  if (i % 20 === 18) return '#BFEDF5';
  if (i % 20 === 19) return '#E0CBAB';
  if (i % 20 === 20) return '#FF5E00';
  return '#FFD400';
}

function getFilteredCodes(array, key, value) {
  return array.filter(function(e) {
    return e[key] === value;
  });
}
const initialState = {
  allTableData: [],
  partnersList: [],
  filteredPartnersList: [],
  financialData: [],
  financialProgram: [],
  filteredByProgram: [],
  filteredByProgramDefault: [],
  filteredByPartnerType: {},
  sankeyData: {},
  treeMapData: {},
  pieData: [],
};

// Function to filter TreeMap Data
const filterTreeMapData = data => {
  const arr = [];

  data.map(item => {
    const obj = arr.find(objt => objt.id === item.program_id);
    if (!obj) {
      arr.push({
        id: item.program_id,
        name: item.program_name,
        loc: item.value,
      });
    }
    if (obj) {
      const objIndex = arr.findIndex(i => i.id === item.program_id);
      arr[objIndex].loc += item.value;
    }
    return true;
  });
  return {
    name: 'program',
    children: arr,
  };
};

// Funtion to filter Sankey Data
const filterSankeyData = data => {
  const nodes = [];
  const links = [];
  data.map(item => {
    if (item.program_id !== item.partner_id) {
      const obj1 = nodes.find(obj => obj.id === item.program_name);
      const obj2 = nodes.find(obj => obj.id === item.partner_name);
      const obj3 = nodes.find(obj => obj.id === item.partner_type);
      if (!obj1) {
        nodes.push({
          id: item.program_name,
          color: 'hsl(41, 70%, 50%)',
        });
      }
      if (!obj2) {
        nodes.push({
          id: item.partner_name,
          color: 'hsl(40, 74%, 55%)',
        });
      }
      if (!obj3) {
        nodes.push({
          id: item.partner_type,
          color: 'hsl(40, 74%, 55%)',
        });
      }
      if (item.value !== 0) {
        const obj4 = links.find(
          obj => obj.target === item.partner_name,
        );
        if (!obj4) {
          links.push({
            source: item.partner_type,
            target: item.partner_name,
            value: item.value,
          });
        }
        links.push({
          source: item.partner_name,
          target: item.program_name,
          value: item.value,
        });
      }
    }
    return true;
  });

  const sankeyData = { nodes, links };
  return sankeyData;
};

const getPartnersList = (state, action) => {
  return {
    ...state,
    partnersList: action.payload,
    filteredPartnersList: action.payload,
  };
};
const getFinancialData = (state, action) => {
  const { partnerList, programList, allData } = action.payload;
  console.log(partnerList, 'partnerlist');
  console.log(programList, 'programlist');
  console.log(allData, 'allData');
  const financialData = allData;

  financialData.map((item, index) => {
    programList.map(p => {
      if (p.id === item.program_id) {
        financialData[index] = {
          ...item,
          program_name: p.name,
        };
      }
      return true;
    });
    return true;
  });
  financialData.map((item, index) => {
    partnerList.map(i => {
      if (i.partner_id === item.partner_id) {
        financialData[index] = {
          ...item,
          partner_name: i.partner_name,
        };
      }
      return true;
    });
    return true;
  });

  console.log(financialData, 'required');

  const sankeyData = filterSankeyData(financialData);
  const treeMapData = filterTreeMapData(financialData);

  // console.log(action.payload);
  allData.sort(function(a, b) {
    const nameA = a.partner_id; // ignore upper and lowercase
    const nameB = b.partner_id; // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  // console.log(action.payload, 'maindata');
  const label = allData.map(data => {
    console.log(data.partner_name, 'logggg');
    return data.partner_name;
  });
  const removedDuplicateLabel = [...new Set(label)];
  const multiLineLabel = [];

  removedDuplicateLabel.map(data => {
    return multiLineLabel.push(data.split(' '));
  });
  console.log(multiLineLabel, 'multiLine');
  const groupedObjForLabel = {};
  allData.forEach(function(c) {
    if (groupedObjForLabel[c.partner_id]) {
      groupedObjForLabel[c.partner_id].names.push(c);
    } else {
      groupedObjForLabel[c.partner_id] = {
        partner_name: c.partner_name,
        names: [c],
      };
    }
  });
  console.log(groupedObjForLabel, 'groupedLabel');
  const tableDatas = [];
  Object.entries(groupedObjForLabel).map(([key, data]) => {
    return tableDatas.push(data);
  });
  console.log(tableDatas, 'tableDatas');
  const result = [
    ...new Map(allData.map(x => [x.partner_id, x])).values(),
  ];

  // console.log(result);
  const a = [];
  result.map(data => {
    if (data.partner_type) {
      a.push(data);
    }
    return true;
  });
  // console.log(a, 'a');
  const groupedObj = {};
  const ObjByProgram = {};
  a.forEach(function(c, i) {
    if (ObjByProgram[c.partner_type]) {
      ObjByProgram[c.partner_type].data.push(c);
    } else {
      ObjByProgram[c.partner_type] = {
        programId: c.partner_type,
        data: [c],
      };
    }
  });
  console.log(ObjByProgram, 'ObjbyProgram');
  allData.forEach(function(c) {
    // console.log(c, 'c');
    if (groupedObj[c.program_id]) {
      groupedObj[c.program_id].data.push(c.value);
    } else {
      groupedObj[c.program_id] = {
        name: c.program_name,
        id: c.program_id,
        data: [c.value],
      };
    }
  });

  console.log(groupedObj, 'grouped');
  const allProgramData = [];
  for (const [key, value] of Object.entries(groupedObj)) {
    // console.log(value, 'value');
    // console.log(key, 'key');
    // allPartnersLabel.push(key);
    // value.names.map(data => {
    allProgramData.push(value);
    // return true;
  }
  console.log(allProgramData, 'all Data');
  const allProgramColor = [];
  for (const [key, value] of Object.entries(groupedObj)) {
    allProgramColor.push(colorPicker(value.id));
  }
  console.log(allProgramColor, 'allProgramColor');
  // const allProgramData = [];
  // const allPartnersLabel = [];
  // for (const [key, value] of Object.entries(groupedObj)) {
  //   // console.log(value, 'value');
  //   // console.log(key, 'key');
  //   // allPartnersLabel.push(key);
  //   value.names.map(data => {
  //     allProgramData.push(data.value);
  //     return true;
  //   });
  // }
  // console.log(allPartnersLabel, 'allPartnersLabel');
  // console.log(allProgramData, 'allProgramData');

  const commercial = [];
  const microfinancial = [];
  a.forEach(function(c) {
    if (c.partner_type === 'Microfinance Institutions') {
      microfinancial.push(c);
    } else if (
      c.partner_type === 'Commercial Bank and Other Partners'
    ) {
      commercial.push(c);
    }
  });
  console.log(commercial, 'commercial');
  console.log(microfinancial, 'microfinancial');

  const totalCommercialBenef = commercial.reduce(function(x, b) {
    return x + b.value;
  }, 0);
  const totalMicroBenef = microfinancial.reduce(function(x, b) {
    return x + b.value;
  }, 0);
  console.log(totalCommercialBenef, 'totalComm');
  console.log(totalMicroBenef, 'totalMicroBenef');
  // action.payload.forEach(function(c) {
  //   if (partnerIdObj[c.partner_type]) {
  //     // if (partnerIdObj[c.partner_type].names.length < 1) {
  //     partnerIdObj[c.partner_type].names.push(c);
  //     // }
  //   } else {
  //     partnerIdObj[c.partner_type] = {
  //       partnerId: c.partner_type,
  //       names: [c],
  //     };
  //   }
  // });
  // console.log(partnerIdObj, 'grouped');

  // // eslint-disable-next-line no-restricted-syntax
  // const allProgramData = [];
  // const allPartnersLabel = [];
  // for (const [key, value] of Object.entries(groupedObj)) {
  //   // console.log(value, 'value');
  //   // console.log(key, 'key');
  //   allPartnersLabel.push(key);
  //   value.names.map(data => {
  //     allProgramData.push(data.value);
  //     return true;
  //   });
  // }
  // console.log(allPartnersLabel, 'allPartnersLabel');
  // console.log(allProgramData, 'allProgramData');
  // );
  // console.log(allProgramData, 'series');
  return {
    ...state,
    sankeyData,
    treeMapData,
    financialData: allData,
    // extractedFinancialData: ObjByProgram,
    filteredByProgramDefault: {
      series: allProgramData,
      label: multiLineLabel,
      color: allProgramColor,
    },
    filteredByProgram: {
      series: allProgramData,
      label: multiLineLabel,
      color: allProgramColor,
    },
    pieData: {
      series: [totalCommercialBenef, totalMicroBenef],
      label: [
        'Commercial Bank and Other Partners',
        'Microfinance Institutions',
      ],
    },
    allTableData: tableDatas,
  };
};

const getFinancialProgram = (state, action) => {
  action.payload.sort(function(a, b) {
    const nameA = a.id; // ignore upper and lowercase
    const nameB = b.id; // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  return {
    ...state,
    financialProgram: action.payload,
  };
};

const filterFinancialDataForGraph = (state, action) => {
  const microfinance = 'Microfinance Institutions';
  const commercial = 'Commercial Bank and Other Partners';
  const { selectedPartners, selectedProgram } = action.payload;

  const data = state.financialData;
  let filteredLabel = [];
  let filteredSeries = [];
  const filteredMicroFinance = [];
  const filteredCommercial = [];
  let allProgramColor = [];

  let newSankeyData = data;
  let newTreeMapData;

  if (selectedPartners.length < 1 && selectedProgram.length < 1) {
    filteredLabel = state.filteredByProgramDefault.label;
    filteredSeries = state.filteredByProgramDefault.series;
    allProgramColor = state.filteredByProgramDefault.color;
    data.map(filtData => {
      if (filtData.partner_type === microfinance) {
        filteredMicroFinance.push(filtData);
      } else if (filtData.partner_type === commercial) {
        filteredCommercial.push(filtData);
      }
      return true;
    });
    // filteredSeries.map(item => {
    //   allProgramColor.push(colorPicker(item.programId));
    //   return true;
    // });
    newSankeyData = filterSankeyData(data);
    newTreeMapData = filterTreeMapData(data);
  } else if (
    // Partner is selected and Program is not selected
    selectedPartners.length > 0 &&
    selectedProgram.length < 1
  ) {
    // const filteredCodes = getFilteredCodes(
    //   data,
    //   'partner_type',
    //   microfinance,
    // );

    // console.log(filteredCodes, 'filterCodes');
    const filteredData = data.filter(i =>
      selectedPartners.includes(i.partner_id),
    );
    filteredData.map(filtData => {
      // console.log(filtData, 'filtData');
      if (!filteredLabel.includes(filtData.partner_name)) {
        filteredLabel.push(filtData.partner_name);
      }
      filteredSeries.push({
        name: filtData.program_name,
        programId: filtData.program_id,
        data: [filtData.value],
      });
      return true;
    });
    filteredData.map(filtData => {
      if (filtData.partner_type === microfinance) {
        filteredMicroFinance.push(filtData);
      } else if (filtData.partner_type === commercial) {
        filteredCommercial.push(filtData);
      }
      return true;
    });
    filteredSeries.map(item => {
      allProgramColor.push(colorPicker(item.programId));
      return true;
    });
    console.log(filteredMicroFinance, 'filteredMicroFinanceData');
    console.log(filteredCommercial, 'filteredCommercial');
    // const filtered = filteredData.map(datax => {
    //   return datax.single_count;
    // });
    // const result = Array.from(new Set(filtered));
    // console.log(result, 'result ');
    newSankeyData = filterSankeyData(filteredData);
    newTreeMapData = filterTreeMapData(filteredData);
  } else if (
    selectedPartners.length < 1 &&
    selectedProgram.length > 0
  ) {
    const filteredData = data.filter(i =>
      selectedProgram.includes(i.program_id),
    );
    filteredData.map(filtData => {
      if (!filteredLabel.includes(filtData.partner_name)) {
        filteredLabel.push(filtData.partner_name);
      }
      filteredSeries.push({
        programId: filtData.program_id,
        name: filtData.program_name,
        data: [filtData.value],
      });
      return true;
    });
    filteredSeries.map(item => {
      allProgramColor.push(colorPicker(item.programId));
      return true;
    });

    console.log(allProgramColor, 'allProgramColor');
    newSankeyData = filterSankeyData(filteredData);
    newTreeMapData = filterTreeMapData(filteredData);
  } else if (
    selectedPartners.length > 0 &&
    selectedProgram.length > 0
  ) {
    const filteredData = data.filter(i =>
      selectedPartners.includes(i.partner_id),
    );
    const anotherFilter = filteredData.filter(j =>
      selectedProgram.includes(j.program_id),
    );
    anotherFilter.map(filtData => {
      // console.log(filtered)
      if (!filteredLabel.includes(filtData.partner_name)) {
        filteredLabel.push(filtData.partner_name);
      }
      filteredSeries.push({
        programId: filtData.program_id,
        name: filtData.program_name,
        data: [filtData.value],
      });
      return true;
    });
    filteredSeries.map(item => {
      allProgramColor.push(colorPicker(item.programId));
      return true;
    });
    const filteredDataSankey = data.filter(
      i =>
        selectedProgram.includes(i.program_id) &&
        selectedPartners.includes(i.partner_id),
    );
    newSankeyData = filterSankeyData(filteredDataSankey);
    newTreeMapData = filterTreeMapData(filteredDataSankey);
  }

  // const { selectedPartners, selectedProgram } = action.payload;
  // console.log(selectedProgram, 'selectedProgram');
  // const data = state.financialData;
  // let filteredLabel = [];
  // let filteredSeries = [];
  // // const a= action.payload.
  // if (selectedPartners.length < 1 && selectedProgram.length < 1) {
  //   filteredLabel = state.filteredByProgramDefault.label;
  //   filteredSeries = state.filteredByProgramDefault.series;
  // } else if (
  //   selectedPartners.length > 0 &&
  //   selectedProgram.length < 1
  // ) {
  //   const filteredData = data.filter(i =>
  //     selectedPartners.includes(i.partner_id),
  //   );

  //   filteredData.map(filtData => {
  //     // console.log(filtered)
  //     if (!filteredLabel.includes(filtData.partner_id)) {
  //       filteredLabel.push(filtData.partner_id);
  //     }
  //     filteredSeries.push({
  //       name: filtData.program_id,
  //       data: [filtData.value],
  //     });
  //     return true;
  //   });
  // } else if (
  //   selectedPartners.length < 1 &&
  //   selectedProgram.length > 0
  // ) {
  //   const filteredData = data.filter(i =>
  //     selectedProgram.includes(i.program_id),
  //   );
  //   console.log(filteredData, 'filteredData');
  //   filteredData.map(filtData => {
  //     // console.log(filtered)
  //     if (!filteredLabel.includes(filtData.partner_id)) {
  //       filteredLabel.push(filtData.partner_id);
  //     }
  //     filteredSeries.push({
  //       name: filtData.program_id,
  //       data: [filtData.value],
  //     });
  //     return true;
  //   });
  // } else if (
  //   selectedPartners.length > 0 &&
  //   selectedProgram.length > 0
  // ) {
  //   const filteredData = data.filter(i =>
  //     selectedPartners.includes(i.partner_id),
  //   );
  //   console.log(filteredData, 'filteredData');
  //   const anotherFilter = filteredData.filter(j =>
  //     selectedProgram.includes(j.program_id),
  //   );
  //   console.log(anotherFilter, 'anotherFilter');
  //   anotherFilter.map(filtData => {
  //     // console.log(filtered)
  //     if (!filteredLabel.includes(filtData.partner_id)) {
  //       filteredLabel.push(filtData.partner_id);
  //     }
  //     filteredSeries.push({
  //       name: filtData.program_id,
  //       data: [filtData.value],
  //     });
  //     return true;
  //   });
  // }
  // return {
  //   ...state,
  //   filteredByProgram: {
  //     series: filteredSeries,
  //     label: filteredLabel,
  //   },
  // financialProgram: action.payload,
  // };

  // console.log('newTreeMapData', newTreeMapData);
  const totalCommercialBenef = filteredCommercial.reduce(function(
    x,
    b,
  ) {
    return x + b.value;
  },
  0);
  const totalMicroBenef = filteredMicroFinance.reduce(function(x, b) {
    return x + b.value;
  }, 0);
  return {
    ...state,
    filteredByProgram: {
      series: filteredSeries,
      label: filteredLabel,
      color: allProgramColor,
    },
    pieData: {
      series: [totalCommercialBenef, totalMicroBenef],
      label: [
        'Commercial Bank and Other Partners',
        'Microfinance Institutions',
      ],
    },
    sankeyData: newSankeyData,
    treeMapData: newTreeMapData,
    // financialProgram: action.payload,
  };
};
const filterPartnersByType = (state, action) => {
  const allPartnersData = state.partnersList;
  console.log(action.payload, 'payload');
  console.log(allPartnersData, 'state');
  let filteredCodes = [];

  if (action.payload.length > 1) {
    filteredCodes = allPartnersData;
  } else {
    filteredCodes = getFilteredCodes(
      allPartnersData,
      'partner_type',
      action.payload[0],
    );
  }
  if (action.payload < 1) {
    filteredCodes = allPartnersData;
  }
  // console.log(filteredCodes, 'filteredTypesss');
  return {
    ...state,
    filteredPartnersList: filteredCodes,
    // partnersList: action.payload,
  };
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PARTNERS_LIST:
      return getPartnersList(state, action);
    case GET_FINANCIAL_DATA:
      return getFinancialData(state, action);
    case GET_FINANCIAL_PROGRAM:
      return getFinancialProgram(state, action);
    case FILTER_FINANCIAL_DATA_FOR_GRAPH:
      return filterFinancialDataForGraph(state, action);
    case FILTER_PARTNERS_BY_TYPE:
      return filterPartnersByType(state, action);
    default:
      return state;
  }
}
