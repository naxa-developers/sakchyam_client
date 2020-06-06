/* eslint-disable no-restricted-syntax */
import {
  GET_FINANCIAL_DATA,
  GET_FINANCIAL_PROGRAM,
  GET_PARTNERS_LIST,
  FILTER_FINANCIAL_DATA_FOR_GRAPH,
} from '../actions/index.actions';

const initialState = {
  partnersList: [],
  financialData: [],
  financialProgram: [],
  filteredByProgram: [],
  filteredByProgramDefault: [],
  sankeyData: {},
};

const getPartnersList = (state, action) => {
  return {
    ...state,
    partnersList: action.payload,
  };
};
const getFinancialData = (state, action) => {
  const financialData = action.payload;

  const nodes = [];
  const links = [];
  financialData.map(item => {
    const obj1 = nodes.find(obj => obj.id === item.program_id);
    const obj2 = nodes.find(obj => obj.id === item.partner_id);
    if (!obj1) {
      nodes.push({
        id: item.program_id,
        color: 'hsl(41, 70%, 50%)',
      });
    }
    if (!obj2) {
      nodes.push({
        id: item.partner_id,
        color: 'hsl(40, 74%, 55%)',
      });
    }
    if (item.program_id !== item.partner_id && item.value !== 0) {
      links.push({
        source: item.partner_id,
        target: item.program_id,
        value: item.value,
      });
    }
    return true;
  });

  const sankeyData = { nodes, links };

  action.payload.sort(function(a, b) {
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
  const label = action.payload.map(data => {
    return data.partner_id;
  });
  const removedDuplicateLabel = [...new Set(label)];

  const result = [
    ...new Map(action.payload.map(x => [x.partner_id, x])).values(),
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
  result.forEach(function(c, i) {
    if (ObjByProgram[c.partner_type]) {
      ObjByProgram[c.partner_type].data.push(c);
    } else {
      ObjByProgram[c.partner_type] = {
        programId: c.partner_type,
        data: [c],
      };
    }
  });
  // console.log(ObjByProgram, 'ObjbyProgram');
  action.payload.forEach(function(c) {
    if (groupedObj[c.program_id]) {
      groupedObj[c.program_id].data.push(c.value);
    } else {
      groupedObj[c.program_id] = {
        name: c.program_id,
        data: [c.value],
      };
    }
  });

  // console.log(groupedObj, 'grouped');
  const allProgramData = [];
  for (const [key, value] of Object.entries(groupedObj)) {
    allProgramData.push(value);
  }
  const partnerIdObj = {};
  let v = 0;
  action.payload.forEach(function(c) {
    v += 1;
    if (partnerIdObj[c.partner_type.split(' ').join('_')]) {
      // if (
      //   partnerIdObj[c.partner_type.split(' ').join('_')].names
      //     .length < 1
      // ) {
      partnerIdObj[c.partner_type.split(' ').join('_')].names.push(c);
      // }
    } else {
      partnerIdObj[c.partner_type.split(' ').join('_')] = {
        partnerId: c.partner_type.split(' ').join('_'),
        names: [c],
      };
    }
  });

  return {
    ...state,
    sankeyData,
    financialData: action.payload,
    // extractedFinancialData: ObjByProgram,
    filteredByProgramDefault: {
      series: allProgramData,
      label: removedDuplicateLabel,
    },
    filteredByProgram: {
      series: allProgramData,
      label: removedDuplicateLabel,
    },
  };
};

const getFinancialProgram = (state, action) => {
  return {
    ...state,
    financialProgram: action.payload,
  };
};
const filterFinancialDataForGraph = (state, action) => {
  const { selectedPartners, selectedProgram } = action.payload;
  console.log(selectedProgram, 'selectedProgram');
  const data = state.financialData;
  let filteredLabel = [];
  let filteredSeries = [];
  // const a= action.payload.
  if (selectedPartners.length < 1 && selectedProgram.length < 1) {
    filteredLabel = state.filteredByProgramDefault.label;
    filteredSeries = state.filteredByProgramDefault.series;
  } else if (
    selectedPartners.length > 0 &&
    selectedProgram.length < 1
  ) {
    const filteredData = data.filter(i =>
      selectedPartners.includes(i.partner_id),
    );

    filteredData.map(filtData => {
      // console.log(filtered)
      if (!filteredLabel.includes(filtData.partner_id)) {
        filteredLabel.push(filtData.partner_id);
      }
      filteredSeries.push({
        name: filtData.program_id,
        data: [filtData.value],
      });
      return true;
    });
  } else if (
    selectedPartners.length < 1 &&
    selectedProgram.length > 0
  ) {
    const filteredData = data.filter(i =>
      selectedProgram.includes(i.program_id),
    );
    console.log(filteredData, 'filteredData');
    filteredData.map(filtData => {
      // console.log(filtered)
      if (!filteredLabel.includes(filtData.partner_id)) {
        filteredLabel.push(filtData.partner_id);
      }
      filteredSeries.push({
        name: filtData.program_id,
        data: [filtData.value],
      });
      return true;
    });
  } else if (
    selectedPartners.length > 0 &&
    selectedProgram.length > 0
  ) {
    const filteredData = data.filter(i =>
      selectedPartners.includes(i.partner_id),
    );
    console.log(filteredData, 'filteredData');
    const anotherFilter = filteredData.filter(j =>
      selectedProgram.includes(j.program_id),
    );
    console.log(anotherFilter, 'anotherFilter');
    anotherFilter.map(filtData => {
      // console.log(filtered)
      if (!filteredLabel.includes(filtData.partner_id)) {
        filteredLabel.push(filtData.partner_id);
      }
      filteredSeries.push({
        name: filtData.program_id,
        data: [filtData.value],
      });
      return true;
    });
  }
  return {
    ...state,
    filteredByProgram: {
      series: filteredSeries,
      label: filteredLabel,
    },
    // financialProgram: action.payload,
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
    default:
      return state;
  }
}
