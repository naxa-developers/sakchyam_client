import {
  GET_INDICATORS_GRAPHDATA,
  GET_INDICATORS_CATEGORY,
  GET_INDICATORS_GRAPHDATA_INDIVIDUAL,
  FILTER_INDICATOR_GRAPH_DATA,
  FILTER_INDICATOR_GRAPH_DATA_WITH_DATE,
} from '../actions/index.actions';

// import copy from '../utils/cloneNestedObject';
/* eslint-disable camelcase */
/* eslint-disable  no-unused-vars */

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
    return `${(x / 1000000).toFixed(2)}M`;
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
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 320,
          },
        },
      },
    ],
    legend: {
      position: 'top',
      horizontalAlign: 'left',
    },
    stroke: {
      width: [0, 1, 1],
      curve: 'straight',
    },
    plotOptions: {
      bar: {
        columnWidth: '20%',
      },
    },
    colors: ['#b41833', '#287078'],
    fill: {
      opacity: [0.85, 1, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: 'vertical',
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
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
    markers: {
      size: 5,
      offsetX: 0,
      offsetY: 0,
    },
    xaxis: {
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
      floating: false,
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
          const roundNumber = Math.round(value);
          //   console.log(roundNumber);
          //   console.log(convert(roundNumber));
          return convert(roundNumber);
        },
      },
      min: 0,
    },
    title: {
      text: undefined,
      rotate: -90,
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 600,
        cssClass: 'apexcharts-yaxis-title',
      },
    },
    toolbar: {
      show: true,
      // offsetX: 0,
      // offsetY: 0,
      // tools: {
      //   download: true,
      //   selection: true,
      //   zoom: true,
      //   zoomin: true,
      //   zoomout: true,
      //   pan: true,
      //   // reset: true | '<img src="/static/icons/reset.png" width="20">',
      //   // customIcons: []
      // },
      // autoSelected: 'zoom',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter(y) {
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

  const planned = filtered.map(el => {
    return el.planned_afp;
  });
  const achieved = filtered.map(el => {
    return el.achieved;
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
  // console.log(category, 'cat');
  // console.log(label, 'label');
  // console.log(achieved, 'achieved');
  const series = [
    {
      name: 'Planned As per AFP contract Budget Bar',
      type: 'column',
      data: planned,
    },
    {
      name: 'Achieved Bar',
      type: 'column',
      data: achieved,
    },
    {
      name: 'Planned As per AFP contract Budget Line',
      type: 'line',
      data: planned,
    },
    {
      name: 'Achieved Line',
      type: 'line',
      data: achieved,
    },
  ];
  // console.log(series, 'se');
  // const { getDateRange } = this.props;
  // getDateRange(totalDateList);

  return {
    ...state,
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
//       name: 'Achieved Bar',
//       type: 'column',
//       data: achieved,
//     },
//     {
//       name: 'Planned As per AFP contract Budget Line',
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

  const planned = filtered.map(el => {
    return el.planned_afp;
  });
  const achieved = filtered.map(el => {
    return el.achieved;
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
      name: 'Planned As per AFP contract Budget Bar',
      type: 'column',
      data: planned,
    },
    {
      name: 'Achieved Bar',
      type: 'column',
      data: achieved,
    },
    {
      name: 'Planned As per AFP contract Budget Line',
      type: 'line',
      data: planned,
    },
    {
      name: 'Achieved Line',
      type: 'line',
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
    },
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
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
