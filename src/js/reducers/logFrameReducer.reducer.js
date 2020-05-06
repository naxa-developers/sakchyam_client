import {
  GET_INDICATORS_GRAPHDATA,
  GET_INDICATORS_CATEGORY,
  GET_INDICATORS_GRAPHDATA_INDIVIDUAL,
  FILTER_INDICATOR_GRAPH_DATA,
  FILTER_INDICATOR_GRAPH_DATA_WITH_DATE,
  LOADING_TRUE,
} from '../actions/index.actions';
import DownloadIcon from '../../img/save_alt.svg';

// import copy from '../utils/cloneNestedObject';
/* eslint-disable camelcase */
/* eslint-disable  no-unused-vars */

/* eslint-disable no-param-reassign */
// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
// }
// function numberWithCommas(_number, _sep) {
//   _number =
//     typeof _number !== 'undefined' && _number > 0 ? _number : '';
//   _number = _number
//     .replace(
//       new RegExp(
//         `^(\\d{${
//           _number.length % 3 ? _number.length % 3 : 0
//         }})(\\d{3})`,
//         'g',
//       ),
//       '$1 $2',
//     )
//     .replace(/(\d{3})+?/gi, '$1 ')
//     .trim();
//   if (typeof _sep !== 'undefined' && _sep != ' ') {
//     _number = _number.replace(/\s/g, _sep);
//   }
//   return _number;
// }
/* eslint-disable no-param-reassign */
function convert(x) {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(x)) return x;

  if (x < 9999) {
    return x;
  }

  if (x < 1000000) {
    return `${Math.round(x / 1000)}K`;
  }
  if (x < 10000000) {
    return `${Math.round(x / 1000000)}M`;
  }

  if (x < 1000000000) {
    return `${Math.round(x / 1000000)}M`;
  }

  if (x < 1000000000000) {
    return `${Math.round(x / 1000000000)}B`;
  }

  return '1T+';
}
const initialState = {
  dateRange: [],
  activeBar1: true,
  activeBar2: true,
  activeLine1: true,
  activeLine2: true,
  totalRangeDate: null,
  totalRangeDateName: null,
  filteredDynamicData: [],
  isDataFetched: false,
  indicatorCategory: [],
  logDataGraph: [],
  series: [
    {
      name: 'Achieved',
      type: 'column',
      data: [],
    },
    {
      name: 'Planned As per AFP contract Budget',
      type: 'column',
      data: [],
    },
    {
      name: 'Achieved',
      type: 'line',
      data: [],
    },
    {
      // name: 'Planned',
      name: 'Planned As per AFP contract Budget',
      type: 'line',
      data: [],
    },
  ],
  options: {
    filteredDynamicData: null,
    labels: [
      '01/01/2003',
      '02/01/2003',
      '03/01/2003',
      '04/01/2003',
      '05/01/2003',
      '06/01/2003',
      '07/01/2003',
      '08/01/2003',
      '09/01/2003',
      '10/01/2003',
      '11/01/2003',
      '12/01/2003',
      '01/01/2004',
      '02/01/2004',
    ],
    xaxis: {
      tickAmount: 10,
      crosshairs: {
        show: true,
        position: 'back',
        stroke: {
          color: '#ffffff',
          width: 0,
          dashArray: 0,
        },
      },
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
      type: 'category',
    },
    yaxis: {
      // floating: true
      decimalsInFloat: 2,
      tickPlacement: 'between',
      // y: 8200,
      // y: 1000,
      crosshairs: {
        show: true,
        position: 'back',
        stroke: {
          color: '#b6b6b6',
          width: 1,
          dashArray: 0,
        },
      },
      title: {
        text: 'Points',

        style: {
          color: undefined,
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
          cssClass: 'apexcharts-yaxis-title',
        },
      },
      // floating: true,
      // align: 'center',
      // minWidth: '200',
      // maxWidth: '200',
      labels: {
        show: true,
        align: 'right',
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [],
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-yaxis-label',
        },
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        formatter: value => {
          if (value <= 1) {
            return value.toFixed(1);
          }
          // console.log(value, 'v');
          const roundNumber = Math.round(value);
          // console.log(convert(roundNumber));
          //   console.log(convert(roundNumber));
          return convert(roundNumber);
        },
      },
      min: 0,
      forceNiceScale: true,

      // max: 10,
    },

    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter(y) {
          // console.log(y, 'y');
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} £`;
          }
          return y;
        },
      },
    },
  },
};
const filterIndicatorGraphData = (state, action) => {
  // console.log('gilterindicatorgraphdata ');
  // console.log(action);
  // const a = 'Output Indicator 2.5';
  // console.log(state.logDataGraph, 'red logdata');
  const filtered = state.logDataGraph.filter(result => {
    //   if (result.category === 'IMPACT') {
    //   console.log(a);
    return result.sub_category.name === action.payload;
    //   }
  });
  // this.setState({ filteredDynamicData: filtered });
  // console.log(filtered, 'filtered');
  // const { dataType } = filtered[0];
  const dataType = filtered[0].data_type;
  const dataUnit = filtered[0].unit;

  let unit = '';
  let type = '';
  console.log(dataUnit, 'dataUnit');
  if (dataType === 'percentage') {
    type = '%';
  } else if (dataUnit === 'pound') {
    unit = '£';
  } else if (dataUnit === 'nrs') {
    unit = 'Rs';
  } else if (dataUnit === 'percentage') {
    unit = 'Rs';
  }
  const planned = filtered.map(el => {
    return `${el.planned_afp}`;
  });
  const achieved = filtered.map(el => {
    return `${el.achieved}`;
  });
  const label = filtered.map(el => {
    //   console.log(el, 'elLabel');
    return el.year.name;
  });
  const category = filtered.map(el => {
    //   console.log(el, 'elLabel');
    return el.year.name;
  });
  const totalDateList = filtered.map(el => {
    // console.log(el, 'elLabel');
    return el.year;
  });
  const totalRangeDate = totalDateList.map(data => {
    return data.range;
  });
  const totalRangeDateName = totalDateList.map(data => {
    return data.name;
  });
  console.log(totalRangeDate, 'rrrr');
  // console.log(category, 'cat');
  // console.log(label, 'label');
  // console.log(achieved, 'achieved');
  const series = [
    {
      name: 'Planned As per AFP contract Budget',
      type: 'column',
      data: planned,
    },
    {
      name: 'Achieved ',
      type: 'column',
      data: achieved,
    },
    {
      name: 'Planned As per AFP contract Budget ',
      type: 'area',
      data: planned,
    },
    {
      name: 'Achieved',
      type: 'area',
      data: achieved,
    },
  ];
  // console.log(series, 'se');
  // const { getDateRange } = this.props;
  // getDateRange(totalDateList);

  return {
    ...state,
    totalRangeDate,
    totalRangeDateName,
    series,
    filteredDynamicData: filtered,
    dateRange: totalDateList,
    options: {
      ...state.options,
      filteredDynamicData: filtered,
      labels: label,
      xaxis: { ...state.options.xaxis, categories: category },
      yaxis: {
        ...state.options.yaxis,
        title: {
          text: `${dataType}  ${
            dataUnit !== null ? `(${dataUnit})` : ''
          }`,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter(y) {
            // console.log(y, 'y');
            if (typeof y !== 'undefined') {
              // return `${unit} ${y.toFixed(0)}${type}`;
              return `${unit} ${y.toLocaleString()}${type}`;
            }
            return y;
          },
        },
      },
    },
  };
};

// filterDataWithDate = () => {
//   // eslint-disable-next-line react/destructuring-assignment
//   const { activeDate, activeLayer } = this.props;
//   const {
//     logFrameReducer: { logDataGraph },
//   } = this.props;
//   // const { statsData } = this.state;
//   const filtered = [];
//   // eslint-disable-next-line array-callback-return
//   activeDate.map(date => {
//     // eslint-disable-next-line array-callback-return
//     logDataGraph.map(data => {
//       if (
//         data.year.range === date &&
//         data.sub_category.name === activeLayer
//       ) {
//         filtered.push(data);
//       }
//     });
//   });

//   // const filtered = statsData.filter(result => {
//   //   return result.year.range === JSON.stringify(d);
//   // });
//   const planned = filtered.map(el => {
//     return el.planned_afp;
//   });
//   const achieved = filtered.map(el => {
//     return el.achieved;
//   });
//   const label = filtered.map(el => {
//     return el.year.name;
//   });
//   // const category = 'Test Year';
//   const category = filtered.map(el => {
//     return el.year.name;
//   });

//   const series = [
//     {
//       name: 'Planned As per AFP contract Budget Bar',
//       type: 'column',
//       data: planned,
//     },
//     {
//       name: 'Achieved ',
//       type: 'column',
//       data: achieved,
//     },
//     {
//       name: 'Planned As per AFP contract Budget ',
//       type: 'line',
//       data: planned,
//     },
//     {
//       name: 'Achieved Line',
//       type: 'line',
//       data: achieved,
//     },
//   ];
//   this.setState(prevState => ({
//     series,
//     options: {
//       ...prevState.options,
//       labels: label,
//       xaxis: { ...prevState.options.xaxis, categories: category },
//     },
//   }));
// };
const filterIndicatorGraphDataWithDate = (state, action) => {
  const { activeLayer, activeDate } = action.payload;
  const filtered = [];
  // eslint-disable-next-line array-callback-return
  activeDate.map(date => {
    // eslint-disable-next-line array-callback-return
    state.logDataGraph.map(data => {
      if (
        data.year.range === date &&
        data.sub_category.name === activeLayer
      ) {
        filtered.push(data);
      }
    });
  });

  // const { dataType } = filtered[0];
  const dataType = filtered && filtered[0] && filtered[0].data_type;
  const dataUnit = filtered && filtered[0] && filtered[0].unit;

  let unit = '';
  let type = '';
  console.log(dataUnit, 'dataUnit');
  if (dataType === 'percentage') {
    type = '%';
  } else if (dataUnit === 'pound') {
    unit = '£';
  } else if (dataUnit === 'nrs') {
    unit = 'Rs';
  } else if (dataUnit === 'percentage') {
    unit = 'Rs';
  }
  const planned = filtered.map(el => {
    return `${el.planned_afp}`;
  });
  console.log(planned, 'comma planned');
  const achieved = filtered.map(el => {
    return `${el.achieved}`;
  });
  const label = filtered.map(el => {
    //   console.log(el, 'elLabel');
    return el.year.name;
  });
  const category = filtered.map(el => {
    //   console.log(el, 'elLabel');
    return el.year.name;
  });
  // console.log(category, 'cat');
  // console.log(label, 'label');
  // console.log(achieved, 'achieved');
  const series = [
    {
      name: 'Planned As per AFP contract Budget',
      type: 'column',
      data: planned,
    },
    {
      name: 'Achieved ',
      type: 'column',
      data: achieved,
    },
    {
      name: 'Planned As per AFP contract Budget ',
      type: 'area',
      data: planned,
    },
    {
      name: 'Achieved',
      type: 'area',
      data: achieved,
    },
  ];
  // console.log(series, 'se');
  // const { getDateRange } = this.props;
  // getDateRange(totalDateList);

  return {
    ...state,
    filteredDynamicData: filtered,
    series,
    // dateRange: totalDateList,
    options: {
      ...state.options,
      labels: label,
      xaxis: { ...state.options.xaxis, categories: category },
      yaxis: {
        ...state.options.yaxis,
        title: {
          text: `${dataType}  ${
            dataUnit !== null ? `(${dataUnit})` : ''
          }`,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter(y) {
            // console.log(y.toLocaleString(), 'y');
            if (typeof y !== 'undefined') {
              // return `${unit} ${y.toFixed(0)}${type}`;
              return `${unit} ${y.toLocaleString()}${type}`;
            }
            return y;
          },
        },
      },
    },
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_TRUE:
      return {
        ...state,
        isDataFetched: false,
      };
    case GET_INDICATORS_GRAPHDATA:
      return {
        ...state,
        isDataFetched: true,
        logDataGraph: action.payload,
      };
    case FILTER_INDICATOR_GRAPH_DATA:
      if (action.payload !== '') {
        return filterIndicatorGraphData(state, action);
      }
      return { ...state };
    case FILTER_INDICATOR_GRAPH_DATA_WITH_DATE:
      if (action.payload.activeDate !== '') {
        return filterIndicatorGraphDataWithDate(state, action);
      }
      return { ...state };
    case GET_INDICATORS_GRAPHDATA_INDIVIDUAL:
      return {
        ...state,
        isDataFetched: true,
        logDataGraph: action.payload,
      };
    case GET_INDICATORS_CATEGORY:
      return {
        ...state,
        indicatorCategory: action.payload,
      };

    // case TOGGLE_NULL_SUBMISSIONS_ANSWER:
    //   return toggleNullSubmission(state);

    default:
      return state;
  }
}
