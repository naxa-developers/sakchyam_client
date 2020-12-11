/* eslint-disable no-restricted-syntax */
import {
  GET_FINANCIAL_DATA_SUCCESS,
  GET_FINANCIAL_DATA_REQUEST,
  GET_FINANCIAL_PROGRAM,
  GET_PARTNERS_LIST,
  FILTER_FINANCIAL_DATA_FOR_GRAPH,
  FILTER_PARTNERS_BY_TYPE,
  FILTER_TABLE_BY_PARTNER,
  GET_SEARCHED_DATA_ON_TABLE,
  FILTER_BAR_DATA_AFTER_CLICK,
} from '../actions/index.actions';

function getRandomColor() {
  let color = '#';
  let i;
  for (i = 0; i < 6; i += 1) {
    color += Math.floor(Math.random() * 16).toString(16);
  }
  return color;
}

const getColor = (function() {
  const colors = {};
  return function(id) {
    // eslint-disable-next-line no-return-assign
    return (colors[id] = colors[id] || getRandomColor());
  };
})();

function colorPicker3(i) {
  // COLORPICKER FOR PARTNER TYPE
  if (i === 'Microfinance/Cooperative') return '#008080';
  if (i === 'Commercial Banks and Mobile Network Operators')
    return '#8BB0EC';
  return '#17A589'; //  #AEB6BF #8BB0EC
}

function colorPicker2(i) {
  // COLORPICKER FOR PARTNER ID
  if (i === 3) return '#91664E';
  if (i === 4) return '#13A8BE';
  if (i === 7) return '#13A8BE'; // #FF6D00
  if (i === 9) return '#DE2693';
  if (i === 11) return '#B1B424';
  if (i === 12) return '#2196F3';
  if (i === 13) return '#900C3F'; // #4CE2A7
  if (i === 15) return '#1967A0';
  if (i === 16) return '#00C853';
  if (i === 17) return '#E11D3F'; // #651FFF
  if (i === 19) return '#FF6D00'; // #B71DE1
  if (i === 20) return '#7F8C8D'; // #FFCD00
  if (i === 21) return '#1F8AE4'; // #E11D3F
  if (i === 30) return '#FF1500';
  if (i === 32) return '#C5E11D';
  if (i === 34) return '#CDACF2';
  if (i === 37) return '#16A085';
  if (i === 38) return '#FF5576';
  if (i === 44) return '#BFEDF5';
  if (i === 45) return '#E0CBAB';
  if (i === 46) return '#8E44AD';
  // if (i === 21) return "#AF7AC5";
  // if (i === 22) return "#008080";
  // if (i === 23) return "#C70039";
  // if (i === 24) return "#16A085";
  // if (i === 25) return "#5D6D7E";
  // if (i === 26) return "#900C3F";
  // if (i === 27) return "#7F8C8D";
  // if (i === 28) return "#8E44AD";
  // if (i === 29) return "#AEB6BF";
  return '#FFD400';
}

function colorPicker(i) {
  if (i % 25 === 0) return '#91664E';
  if (i % 25 === 1) return '#13A8BE';
  if (i % 25 === 2) return '#13A8BE'; // #FF6D00
  if (i % 25 === 3) return '#DE2693';
  if (i % 25 === 4) return '#B1B424';
  if (i % 25 === 5) return '#2196F3';
  if (i % 25 === 6) return '#B1B424'; // #4CE2A7
  if (i % 25 === 7) return '#1967A0';
  if (i % 25 === 8) return '#00C853';
  if (i % 25 === 9) return '#E11D3F'; // #651FFF
  if (i % 25 === 10) return '#FF6D00'; // #B71DE1
  if (i % 25 === 11) return '#DE2693'; // #FFCD00
  if (i % 25 === 12) return '#1F8AE4'; // #E11D3F
  if (i % 25 === 13) return '#FF1500';
  if (i % 25 === 14) return '#C5E11D';
  if (i % 25 === 15) return '#CDACF2';
  if (i % 25 === 16) return 'AFDE0E';
  if (i % 25 === 17) return '#FF5576';
  if (i % 25 === 18) return '#BFEDF5';
  if (i % 25 === 19) return '#E0CBAB';
  if (i % 25 === 25) return '#FF5E00';
  if (i % 25 === 21) return '#AF7AC5';
  if (i % 25 === 22) return '#008080';
  if (i % 25 === 23) return '#C70039';
  if (i % 25 === 24) return '#16A085';
  if (i % 25 === 25) return '#5D6D7E';
  return '#FFD400';
}

function getFilteredCodes(array, key, value) {
  return array.filter(function(e) {
    return e[key] === value;
  });
}
const initialState = {
  allTableData: [],
  filteredTableData: [],
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
  loading: false,
  filteredData: [],
};

// FUNCTION TO FILTER TREEMAP DATA
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

  // CALCULATE PERCENTAGE
  let total = 0;

  arr.map(item => {
    total += item.loc;
    return true;
  });

  arr.map((item, index) => {
    arr[index].percent = `${((item.loc / total) * 100).toFixed(1)}%`;
    return true;
  });

  return {
    name: 'program',
    children: arr,
  };
};

// FUNTION TO FILTER SANKEY DATA
const filterSankeyData = data => {
  const nodes = [];
  const links = [];

  // data.sort((a, b) => a.program_id - b.program_id);

  data.map(item => {
    if (item.program_id !== item.partner_id && item.value !== 0) {
      const obj1 = nodes.find(obj => obj.id === item.program_name);
      const obj2 = nodes.find(obj => obj.id === item.partner_name);
      const obj3 = nodes.find(obj => obj.id === item.partner_type);
      if (!obj1) {
        nodes.push({
          id: item.program_name,
          color: colorPicker(item.program_id),
        });
      }
      if (!obj2) {
        nodes.push({
          id: item.partner_name,
          color: getColor(item.partner_id),
        });
      }
      if (!obj3) {
        nodes.push({
          id: item.partner_type,
          color: colorPicker3(item.partner_type),
          // color: '#008080',
        });
      }
      const obj4 = links.find(
        obj => obj.target === item.partner_name,
      );
      if (!obj4) {
        links.push({
          source: item.partner_type,
          target: item.partner_name,
          value: item.single_count,
        });
      }
      links.push({
        source: item.partner_name,
        target: item.program_name,
        value: item.value,
      });
    }
    return true;
  });

  // CALCULATE NODE VALUES
  const sources = [];

  links.map(item => {
    const obj = sources.find(o => o.source === item.source);
    if (!obj) {
      sources.push({
        source: item.source,
        value: item.value,
      });
    }
    if (obj) {
      const objIndex = sources.findIndex(
        i => i.source === item.source,
      );
      sources[objIndex].value += item.value;
    }
    return true;
  });

  nodes.map((item, index) => {
    sources.map(i => {
      if (i.source === item.id) {
        nodes[index].value = i.value;
      }
      return true;
    });
    return true;
  });

  const sankeyData = { nodes, links };
  return sankeyData;
};

// FUNCTION TO FILTER PIE CHART DATA
const filterPieChartData = (data, type) => {
  let microFinance = 0;
  let commercial = 0;

  // if (type === 'single_count') {
  microFinance = data
    .filter(item => item.partner_type === 'Microfinance/Cooperative')
    .reduce((total, i) => total + i.single_count, 0);

  commercial = data
    .filter(
      item =>
        item.partner_type ===
        'Commercial Banks and Mobile Network Operators',
    )
    .reduce((total, i) => total + i.single_count, 0);
  // } else {
  // microFinance = data
  //   .filter(
  //     item => item.partner_type === 'Microfinance Institutions',
  //   )
  //   .reduce((total, i) => total + i.value, 0);

  // commercial = data
  //   .filter(
  //     item =>
  //       item.partner_type === 'Commercial Bank and Other Partners',
  //   )
  //   .reduce((total, i) => total + i.value, 0);
  // }

  return { microFinance, commercial };
};

// FUNCTION TO FILTER PARTNERWISE CHART DATA
const filterPartnerWiseChartData = (data, type) => {
  const arr = [];
  data.map(item => {
    const obj = arr.some(x => item.partner_id === x.partner_id);
    if (!obj) {
      // arr.push(item);
      arr.push({
        partner_id: item.partner_id,
        partner_name: item.partner_name,
        value: item.value,
        single_count: item.single_count,
      });
    }
    if (obj) {
      const objIndex = arr.findIndex(
        i => i.partner_id === item.partner_id,
      );
      // arr[objIndex].value += item.value;
    }
    return true;
  });

  // const barData =
  //   type === 'single_count'
  //     ? arr.map(item => item.single_count)
  //     : arr.map(item => item.value);
  const barData = arr.map(item => item.single_count);
  const categories = arr.map(item => item.partner_name);

  return {
    series: [{ data: barData, name: 'No. of Beneficiaries' }],
    categories,
  };
};

// FUNCTION TO FILTER PROGRAMWISE CHART DATA
const filterProgramWiseChartData = (data, type) => {
  const arr = [];
  const categories = [];

  data.map(item => {
    const obj1 = arr.some(obj => item.program_id === obj.program_id);
    const obj2 = categories.some(i => item.partner_name === i);
    if (!obj1) {
      arr.push({
        program_id: item.program_id,
        name: item.program_name,
        data: [item.value],
      });
    }
    if (obj1) {
      const objIndex = arr.findIndex(
        i => i.program_id === item.program_id,
      );
      arr[objIndex].data.push(item.value);
    }
    if (!obj2) {
      categories.push(item.partner_name);
    }
    return true;
  });

  const exception = [
    'Kisan Microfinance',
    'Kisan Cooperative',
    'Mahila Samudayik Laghubitta',
    'Mahila Sahayatra Laghubitta',
  ];

  const multiLineLabel = [];

  categories.map(label => {
    if (exception.includes(label)) {
      multiLineLabel.push(label.split(' ').slice(0, 2));
    } else {
      multiLineLabel.push(label.substr(0, label.indexOf(' ')));
    }
    return true;
  });

  // const categories = arr.map(item => item.name);

  const programWiseColor = arr.map(item =>
    colorPicker(item.program_id),
  );

  const newArr = [];

  // ORDER: Tab PGT Other Initiative Centre Meeting IVR Street Drama

  arr.map(item => {
    if (item.name === 'Tab') newArr[0] = item;
    if (item.name === 'PGT') newArr[1] = item;
    if (item.name === 'Other Initiatives') newArr[2] = item;
    if (item.name === 'Centre Meeting') newArr[3] = item;
    if (item.name === 'IVR') newArr[4] = item;
    if (item.name === 'Street Drama') newArr[5] = item;
    return true;
  });

  // const categoriesNew = newArr.map(item => item.name);
  const programWiseColorNew = newArr.map(item =>
    colorPicker(item.program_id),
  );

  const series = type === 'program' ? arr : newArr;
  const colors =
    type === 'program' ? programWiseColor : programWiseColorNew;

  return {
    series,
    categories: multiLineLabel,
    colors,
  };
};

// FUNCTION TO HANDLE BAR CLICK
const getBarDataAfterClick = (state, action) => {
  const clickIndex = action.payload;
};

// FUNCTION TO FILTER BAR CHART
const filterBarChartData = data => {
  const filteredData = [];

  const exception = [
    'Kisan Microfinance',
    'Kisan Cooperative',
    'Mahila Samudayik Laghubitta',
    'Mahila Sahayatra Laghubitta',
  ];
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
  const financialData = allData;

  const partnerTypeList = [
    ...new Set(allData.map(item => item.partner_type)),
  ];

  financialData.map((item, index) => {
    programList.map(p => {
      if (p.id === item.program_id) {
        financialData[index] = {
          ...item,
          program_code: p.code,
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

  const sankeyData = filterSankeyData(financialData);
  const treeMapData = filterTreeMapData(financialData);

  allData.sort(function(a, b) {
    const nameA = a.single_count; // ignore upper and lowercase
    const nameB = b.single_count; // ignore upper and lowercase
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  const label = allData.map(data => {
    return data.partner_name;
  });
  const removedDuplicateLabel = [...new Set(label)];
  const multiLineLabel = [];

  const exception = [
    'Kisan Microfinance',
    'Kisan Cooperative',
    'Mahila Samudayik Laghubitta',
    'Mahila Sahayatra Laghubitta',
  ];

  removedDuplicateLabel.map(data => {
    if (exception.includes(data)) {
      multiLineLabel.push(data.split(' ').slice(0, 2));
    } else {
      multiLineLabel.push(data.substr(0, data.indexOf(' ')));
    }
    return true;
  });
  const groupedObjForLabel = {};
  allData.forEach(function(c) {
    console.log(c, 'c Table Data Item');
    if (groupedObjForLabel[c.partner_id]) {
      groupedObjForLabel[c.partner_id].names.push(c);
    } else {
      groupedObjForLabel[c.partner_id] = {
        partner_id: c.partner_id,
        partner_name: c.partner_name,
        partner_type: c.partner_type,
        names: [c],
      };
    }
  });
  const tableDatas = [];
  Object.entries(groupedObjForLabel).map(([key, data]) => {
    return tableDatas.push(data);
  });
  const result = [
    ...new Map(allData.map(x => [x.partner_id, x])).values(),
  ];

  const a = [];
  result.map(data => {
    if (data.partner_type) {
      a.push(data);
    }
    return true;
  });
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
  allData.forEach(function(c) {
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
  const singleCountPartner = {};
  // allData.forEach(function(c) {
  //   if (singleCountPartner[c.partner_id]) {
  //     if (
  //       !singleCountPartner[c.partner_id].names.includes(
  //         c.single_count,
  //       )
  //     ) {
  //       singleCountPartner[c.partner_id].names.push(c.single_count);
  //     }
  //   } else {
  //     singleCountPartner[c.partner_id] = {
  //       partner_id: c.partner_id,
  //       partner_name: c.partner_name,
  //       names: [c.single_count],
  //     };
  //   }
  // });
  // allData.forEach(function(c) {
  //   if (singleCountPartner[c.program_id]) {
  //     singleCountPartner[c.program_id].data.push(c.single_count);
  //   } else {
  //     singleCountPartner[c.program_id] = {
  //       name: c.program_name,
  //       id: c.program_id,
  //       data: [c.single_count],
  //     };
  //   }
  // });

  // console.log(singleCountData, 'singleCountData');
  // let allSingleCountData = [];
  // for (const [key, value] of Object.entries(singleCountPartner)) {
  //   // allPartnersLabel.push(key);
  //   // value.names.map(data => {
  //   allSingleCountData.push(value);
  //   // return true;
  // }
  const totalSingleCount = a.map(single => {
    return single.single_count;
  });

  const allSingleCountData = [
    {
      data: totalSingleCount,
      id: 1,
      name: 'No. of Beneficiaries',
    },
  ];

  const allProgramData = [];
  for (const [key, value] of Object.entries(groupedObj)) {
    // allPartnersLabel.push(key);
    // value.names.map(data => {
    allProgramData.push(value);
    // return true;
  }

  const allProgramColor = [];
  for (const [key, value] of Object.entries(groupedObj)) {
    allProgramColor.push(colorPicker(value.id));
  }

  const allPartnerColor = a.map(item => getColor(item.partner_id));

  // const allProgramData = [];
  // const allPartnersLabel = [];
  // for (const [key, value] of Object.entries(groupedObj)) {
  //   // allPartnersLabel.push(key);
  //   value.names.map(data => {
  //     allProgramData.push(data.value);
  //     return true;
  //   });
  // }

  const commercial = [];
  const microfinancial = [];
  a.forEach(function(c) {
    if (c.partner_type === 'Microfinance/Cooperative') {
      microfinancial.push(c);
    } else if (
      c.partner_type ===
      'Commercial Banks and Mobile Network Operators'
    ) {
      commercial.push(c);
    }
  });

  const totalCommercialBenef = commercial.reduce(function(x, b) {
    return x + b.single_count;
  }, 0);
  const totalMicroBenef = microfinancial.reduce(function(x, b) {
    return x + b.single_count;
  }, 0);

  const newArr = [];

  // ORDER: Tab PGT Other Initiative Centre Meeting IVR Street Drama

  allProgramData.map(item => {
    if (item.name === 'Tab') newArr[0] = item;
    if (item.name === 'PGT') newArr[1] = item;
    if (item.name === 'Other Initiatives') newArr[2] = item;
    if (item.name === 'Centre Meeting') newArr[3] = item;
    if (item.name === 'IVR') newArr[4] = item;
    if (item.name === 'Street Drama') newArr[5] = item;
    return true;
  });

  const colr = newArr.map(item => colorPicker(item.id));

  return {
    ...state,
    loading: false,
    sankeyData,
    treeMapData,
    partnerTypeList,
    financialData: allData,
    // extractedFinancialData: ObjByProgram,
    filteredByProgramDefault: {
      series: allSingleCountData, // allSingleCountData,
      label: multiLineLabel,
      // color: allPartnerColor,
      // color: ['#16A085'],
      color: ['#007078'],
    },
    filteredByProgram: {
      // series: allProgramData, // allSingleCountData,
      series: newArr, // allSingleCountData,
      label: multiLineLabel,
      // color: allProgramColor,
      color: colr,
    },
    pieData: {
      series: [totalCommercialBenef, totalMicroBenef],
      label: [
        'Commercial Banks and Mobile Network Operators',
        'Microfinance/Cooperative',
      ],
    },
    allTableData: tableDatas,
    filteredTableData: tableDatas,
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
  const microfinance = 'Microfinance/Cooperative';
  const commercial = 'Commercial Banks and Mobile Network Operators';

  const {
    selectedPartners,
    selectedProgram,
    partnerType,
  } = action.payload;

  const allData = state.financialData;

  const data = state.financialData;
  let filteredLabel = [];
  let filteredSeries = [];
  const filteredMicroFinance = [];
  const filteredCommercial = [];
  let allProgramColor = [];
  let allProgramData = [];
  const groupedObj = {};
  let multiLineLabel = [];

  const donutData = [];
  let newSankeyData = data;
  let newTreeMapData;
  let newPieData;
  let newProgramWiseData;
  let newPartnerWiseData;

  let filterdFinalData = [];
  if (selectedPartners.length < 1 && selectedProgram.length < 1) {
    filteredLabel = state.filteredByProgramDefault.label;
    filteredSeries = state.filteredByProgramDefault.series;
    allProgramColor = state.filteredByProgramDefault.color;

    const result = [
      ...new Map(data.map(x => [x.partner_id, x])).values(),
    ];

    const a = [];
    result.map(filteredPartnerType => {
      if (filteredPartnerType.partner_type) {
        a.push(filteredPartnerType);
      }
      return true;
    });

    a.forEach(function(c) {
      if (c.partner_type === 'Microfinance/Cooperative') {
        filteredMicroFinance.push(c);
      } else if (
        c.partner_type ===
        'Commercial Banks and Mobile Network Operators'
      ) {
        filteredCommercial.push(c);
      }
    });
    // data.map(filtData => {
    //   if (filtData.partner_type === microfinance) {
    //     filteredMicroFinance.push(filtData);
    //   } else if (filtData.partner_type === commercial) {
    //     filteredCommercial.push(filtData);
    //   }
    //   return true;
    // });
    // filteredSeries.map(item => {
    //   allProgramColor.push(colorPicker(item.programId));
    //   return true;
    // });

    let newData = [];
    if (partnerType.length === 0 || partnerType.length === 2) {
      newData = data;
    } else {
      newData = data.filter(item =>
        partnerType.includes(item.partner_type),
      );
    }

    // ALL SELECTED CASE
    newData.map(item => {
      const obj = donutData.some(
        i => i.partner_id === item.partner_id,
      );
      if (!obj) {
        donutData.push(item);
      }
      return true;
    });

    multiLineLabel = filteredLabel;
    allProgramData = filteredSeries;
    newSankeyData = filterSankeyData(newData);
    newTreeMapData = filterTreeMapData(newData);
    newPieData = filterPieChartData(donutData, 'single_count');
    newProgramWiseData = filterProgramWiseChartData(newData);
    newPartnerWiseData = filterPartnerWiseChartData(
      newData,
      'single_count',
    );
    filterdFinalData = newData;
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

    const filteredData = data.filter(i =>
      selectedPartners.includes(i.partner_id),
    );

    // HORIZONTAL BAR FILTER START

    filteredData.sort(function(a, b) {
      const nameA = a.single_count; // ignore upper and lowercase
      const nameB = b.single_count; // ignore upper and lowercase
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    const label = filteredData.map(partner => {
      return partner.partner_name;
    });
    const removedDuplicateLabel = [...new Set(label)];

    removedDuplicateLabel.map(labelData => {
      return multiLineLabel.push(labelData.split(' '));
    });
    const result = [
      ...new Map(filteredData.map(x => [x.partner_id, x])).values(),
    ];

    filteredData.forEach(function(c) {
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

    // const allProgramData = [];
    for (const [key, value] of Object.entries(groupedObj)) {
      // allPartnersLabel.push(key);
      // value.names.map(data => {
      allProgramData.push(value);
      // return true;
    }
    for (const [key, value] of Object.entries(groupedObj)) {
      allProgramColor.push(colorPicker(value.id));
    }
    // HORIZONTAL BAR FILTER END

    filteredData.map(filtData => {
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
    const a = [];
    result.map(filteredPartnerType => {
      if (filteredPartnerType.partner_type) {
        a.push(filteredPartnerType);
      }
      return true;
    });

    a.forEach(function(c) {
      if (c.partner_type === 'Microfinance/Cooperative') {
        filteredMicroFinance.push(c);
      } else if (
        c.partner_type ===
        'Commercial Banks and Mobile Network Operators'
      ) {
        filteredCommercial.push(c);
      }
    });
    filteredSeries.map(item => {
      allProgramColor.push(colorPicker(item.programId));
      return true;
    });
    // const filtered = filteredData.map(datax => {
    //   return datax.single_count;
    // });
    // const result = Array.from(new Set(filtered));

    // PARTNERS ONLY SELECTED
    data.map(item => {
      if (selectedPartners.includes(item.partner_id)) {
        const obj = donutData.some(
          i => i.partner_id === item.partner_id,
        );
        if (!obj) {
          donutData.push(item);
        }
      }
      return true;
    });

    newSankeyData = filterSankeyData(filteredData);
    newTreeMapData = filterTreeMapData(filteredData);
    newPieData = filterPieChartData(donutData, 'single_count');
    newProgramWiseData = filterProgramWiseChartData(filteredData);
    newPartnerWiseData = filterPartnerWiseChartData(
      filteredData,
      'single_count',
    );
    filterdFinalData = filteredData;
  } else if (
    // Program is selected and Partner is not selected
    selectedPartners.length < 1 &&
    selectedProgram.length > 0
  ) {
    const filteredData = data.filter(i =>
      selectedProgram.includes(i.program_id),
    );
    // HORIZONTAL BAR FILTER START
    const label = filteredData.map(partner => {
      return partner.partner_name;
    });
    const removedDuplicateLabel = [...new Set(label)];

    removedDuplicateLabel.map(labelData => {
      return multiLineLabel.push(labelData.split(' '));
    });
    filteredData.sort(function(a, b) {
      const nameA = a.single_count; // ignore upper and lowercase
      const nameB = b.single_count; // ignore upper and lowercase
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });

    const result = [
      ...new Map(filteredData.map(x => [x.partner_id, x])).values(),
    ];

    filteredData.forEach(function(c) {
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

    // const allProgramData = [];
    for (const [key, value] of Object.entries(groupedObj)) {
      // allPartnersLabel.push(key);
      // value.names.map(data => {
      allProgramData.push(value);
      // return true;
    }
    // HORIZONTAL BAR FILTER END

    const a = [];
    result.map(filteredPartnerType => {
      if (filteredPartnerType.partner_type) {
        a.push(filteredPartnerType);
      }
      return true;
    });

    a.forEach(function(c) {
      if (c.partner_type === 'Microfinance/Cooperative') {
        filteredMicroFinance.push(c);
      } else if (
        c.partner_type ===
        'Commercial Banks and Mobile Network Operators'
      ) {
        filteredCommercial.push(c);
      }
    });
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

    let newData = [];
    let newFilteredData = [];
    if (partnerType.length === 0 || partnerType.length === 2) {
      newData = data;
      newFilteredData = filteredData;
    } else {
      newData = data.filter(item =>
        partnerType.includes(item.partner_type),
      );
      newFilteredData = filteredData.filter(item =>
        partnerType.includes(item.partner_type),
      );
    }

    // PROGRAM ONLY SELECTED
    newData.map(item => {
      // if (selectedProgram.includes(item.program_id)) {
      const obj = donutData.some(
        i => i.partner_id === item.partner_id,
      );
      if (!obj) {
        donutData.push(item);
      }
      // }
      return true;
    });

    newSankeyData = filterSankeyData(newFilteredData);
    newTreeMapData = filterTreeMapData(newFilteredData);
    newPieData = filterPieChartData(donutData, 'value');
    newProgramWiseData = filterProgramWiseChartData(
      newFilteredData,
      'program',
    );
    newPartnerWiseData = filterPartnerWiseChartData(
      newFilteredData,
      'value',
    );
    filterdFinalData = newFilteredData;
  } else if (
    // both Partners and Programs selected
    selectedPartners.length > 0 &&
    selectedProgram.length > 0
  ) {
    const filteredData = data.filter(i =>
      selectedPartners.includes(i.partner_id),
    );
    const anotherFilter = filteredData.filter(j =>
      selectedProgram.includes(j.program_id),
    );
    // HORIZONTAL BAR FILTER START
    const label = anotherFilter.map(partner => {
      return partner.partner_name;
    });
    const removedDuplicateLabel = [...new Set(label)];

    removedDuplicateLabel.map(labelData => {
      return multiLineLabel.push(labelData.split(' '));
    });
    anotherFilter.sort(function(a, b) {
      const nameA = a.single_count; // ignore upper and lowercase
      const nameB = b.single_count; // ignore upper and lowercase
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });

    const result = [
      ...new Map(anotherFilter.map(x => [x.partner_id, x])).values(),
    ];

    anotherFilter.forEach(function(c) {
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

    // const allProgramData = [];
    for (const [key, value] of Object.entries(groupedObj)) {
      // allPartnersLabel.push(key);
      // value.names.map(data => {
      allProgramData.push(value);
      // return true;
    }
    // HORIZONTAL BAR FILTER END

    const a = [];
    result.map(filteredPartnerType => {
      if (filteredPartnerType.partner_type) {
        a.push(filteredPartnerType);
      }
      return true;
    });

    a.forEach(function(c) {
      if (c.partner_type === 'Microfinance/Cooperative') {
        filteredMicroFinance.push(c);
      } else if (
        c.partner_type ===
        'Commercial Banks and Mobile Network Operators'
      ) {
        filteredCommercial.push(c);
      }
    });
    anotherFilter.map(filtData => {
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

    // BOTH SELECTED
    data.map(item => {
      if (
        selectedPartners.includes(item.partner_id)
        // && selectedProgram.includes(item.program_id)
      ) {
        const obj = donutData.some(
          i => i.partner_id === item.partner_id,
        );
        if (!obj) {
          donutData.push(item);
        }
      }
      return true;
    });

    newSankeyData = filterSankeyData(filteredDataSankey);
    newTreeMapData = filterTreeMapData(filteredDataSankey);

    newPieData = filterPieChartData(donutData, 'value');

    newProgramWiseData = filterProgramWiseChartData(
      filteredDataSankey,
      'program',
    );
    newPartnerWiseData = filterPartnerWiseChartData(
      filteredDataSankey,
      'value',
    );
    filterdFinalData = filteredDataSankey;
  }

  // const { selectedPartners, selectedProgram } = action.payload;
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
  //   filteredData.map(filtData => {
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
  //   const anotherFilter = filteredData.filter(j =>
  //     selectedProgram.includes(j.program_id),
  //   );
  //   anotherFilter.map(filtData => {
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

  const totalCommercialBenef = filteredCommercial.reduce(function(
    x,
    b,
  ) {
    return x + b.single_count;
  },
  0);
  const totalMicroBenef = filteredMicroFinance.reduce(function(x, b) {
    return x + b.single_count;
  }, 0);
  console.log(filterdFinalData, 'filteredData', '/c');
  return {
    ...state,
    filteredByProgramDefault: {
      series: newPartnerWiseData.series,
      label: newPartnerWiseData.categories,
      // color: newPartnerWiseData.colors,
      color: ['#007078'],
      // color: ['#2b544f'],

      // #900C3F #7F8C8D #8E44AD #AEB6BF
    },
    filteredByProgram: {
      series: newProgramWiseData.series,
      label: newProgramWiseData.categories,
      color: newProgramWiseData.colors,
    },
    // pieData: {
    //   series: [newPieData.commercial, newPieData.microFinance],
    //   label: [
    //     'Commercial Bank and Other Partners',
    //     'Microfinance Institutions',
    //   ],
    // },
    sankeyData: newSankeyData,
    treeMapData: newTreeMapData,
    filteredData: filterdFinalData,
    // financialProgram: action.payload,
  };
};
const filterPartnersByType = (state, action) => {
  const allPartnersData = state.partnersList;
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
  return {
    ...state,
    filteredPartnersList: filteredCodes,
    // partnersList: action.payload,
  };
};
const filterTableDataByPartner = (state, action) => {
  const { selectedPartners, selectedPartnerType } = action.payload;
  const { allTableData } = state;
  console.log(allTableData, 'allTableData');
  let tableData = allTableData;
  if (selectedPartners.length > 0) {
    tableData = tableData.filter(data => {
      return selectedPartners.includes(data.partner_id);
    });
  }
  if (selectedPartnerType.length > 0) {
    tableData = tableData.filter(data => {
      return selectedPartnerType.includes(data.partner_type);
    });
  }
  // console.log(filteredTableDataByPartnersByPartnerId, 'test');
  if (
    selectedPartners.length === 0 &&
    selectedPartnerType.length === 0
  ) {
    tableData = allTableData;
  }
  return {
    ...state,
    filteredTableData: tableData,
  };
};
const searchedDataOnTable = (state, action) => {
  const keyword = action.payload;
  const { allTableData } = state;
  const filteredKeywordData = allTableData.filter(data => {
    return data.partner_name
      .toUpperCase()
      .includes(action.payload.toUpperCase());
  });
  return {
    ...state,
    filteredTableData: filteredKeywordData,
  };
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PARTNERS_LIST:
      return getPartnersList(state, action);
    case GET_FINANCIAL_DATA_REQUEST:
      return { ...state, loading: true };
    case GET_FINANCIAL_DATA_SUCCESS:
      return getFinancialData(state, action);
    case GET_FINANCIAL_PROGRAM:
      return getFinancialProgram(state, action);
    case FILTER_FINANCIAL_DATA_FOR_GRAPH:
      return filterFinancialDataForGraph(state, action);
    case FILTER_PARTNERS_BY_TYPE:
      return filterPartnersByType(state, action);
    case FILTER_TABLE_BY_PARTNER:
      return filterTableDataByPartner(state, action);
    case GET_SEARCHED_DATA_ON_TABLE:
      return searchedDataOnTable(state, action);
    case FILTER_BAR_DATA_AFTER_CLICK:
      return getBarDataAfterClick(state, action);
    default:
      return state;
  }
}
