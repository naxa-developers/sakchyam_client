/* eslint-disable no-restricted-syntax */
import {
  GET_FINANCIAL_DATA,
  GET_FINANCIAL_PROGRAM,
  GET_PARTNERS_LIST,
} from '../actions/index.actions';

const initialState = {
  partnersList: [],
  financialData: [],
  financialProgram: [],
  filteredByProgram: [],
};

const getPartnersList = (state, action) => {
  return {
    ...state,
    partnersList: action.payload,
  };
};
const getFinancialData = (state, action) => {
  // console.log(action.payload);
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
  // const groupedObj = {};
  // action.payload.forEach(function(c) {
  //   if (groupedObj[c.program_id]) {
  //     groupedObj[c.program_id].names.push(c.);
  //   } else {
  //     groupedObj[c.program_id] = {
  //       programId: c.program_id,
  //       names: [c],
  //     };
  //   }
  // });
  // console.log(groupedObj, 'grouped');
  const groupedObj = {};
  action.payload.forEach(function(c) {
    if (groupedObj[c.program_id]) {
      groupedObj[c.program_id].data.push(c.single_count);
    } else {
      groupedObj[c.program_id] = {
        programId: c.program_id,
        data: [c.single_count],
      };
    }
  });

  // console.log(groupedObj, 'grouped');
  const allProgramData = [];
  for (const [key, value] of Object.entries(groupedObj)) {
    // console.log(value, 'value');
    // console.log(key, 'key');
    // allPartnersLabel.push(key);
    // value.names.map(data => {
    allProgramData.push(value);
    // return true;
  }
  // console.log(allProgramData, 'all Data');

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

  // const groupedObj = {};
  // action.payload.forEach(function(c) {
  //   if (groupedObj[c.partner_id]) {
  //     groupedObj[c.partner_id].names.push(c);
  //   } else {
  //     groupedObj[c.partner_id] = {
  //       partnerId: c.partner_id,
  //       names: [c],
  //     };
  //   }
  // });
  // console.log(groupedObj, 'grouped');

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
  return {
    ...state,
    financialData: action.payload,
    filteredByProgram: allProgramData,
  };
};

const getFinancialProgram = (state, action) => {
  return {
    ...state,
    financialProgram: action.payload,
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
    default:
      return state;
  }
}
