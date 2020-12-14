import { active } from 'd3';
import {
  GET_INDICATORS_GRAPHDATA,
  GET_INDICATORS_CATEGORY,
  GET_INDICATORS_GRAPHDATA_INDIVIDUAL,
  FILTER_INDICATOR_GRAPH_DATA,
  FILTER_INDICATOR_GRAPH_DATA_WITH_DATE,
  LOADING_TRUE,
  FILTER_OUTPUT_INDICATOR_WITH_PERCENT_OR_NUMBER,
  GET_PLANNED_ACHIEVED_DATA_FOR_1STPIECHARTS,
  GET_PLANNED_ACHIEVED_DATA_FOR_2NDPIECHARTS,
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
// function convert(x) {
//   // eslint-disable-next-line no-restricted-globals
//   if (isNaN(x)) return x;

//   if (x < 9999) {
//     return x;
//   }

//   if (x < 1000000) {
//     return `${Math.round(x / 1000)}K`;
//   }
//   if (x < 10000000) {
//     return `${Math.round(x / 1000000)}M`;
//   }

//   if (x < 1000000000) {
//     return `${Math.round(x / 1000000)}M`;
//   }

//   if (x < 1000000000000) {
//     return `${Math.round(x / 1000000000)}B`;
//   }

//   return '1T+';
// }
// function convert(labelValue) {
//   // Nine Zeroes for Billions
//   return Math.abs(Number(labelValue)) >= 1.0e9
//     ? `${Math.abs(Number(labelValue)) / 1.0e9}B`
//     : // Six Zeroes for Millions
//     Math.abs(Number(labelValue)) >= 1.0e6
//     ? `${Math.abs(Number(labelValue)) / 1.0e6}M`
//     : // Three Zeroes for Thousands
//     Math.abs(Number(labelValue)) >= 1.0e3
//     ? `${Math.abs(Number(labelValue)) / 1.0e3}K`
//     : Math.abs(Number(labelValue));
// }
function convert(num) {
  if (num > 999 && num < 1000000) {
    return `${num / 1000000}M`; // convert to K for number from > 1000 < 1 million
  }
  if (num >= 1000000) {
    return `${num / 1000000}M`; // convert to M for number from > 1 million
  }
  if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
  return num;
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
  planned1stPieData: {},
  subCategoryTitle2_3a: '',
  subCategoryTitle2_3b: '',
  // subTitle2_3b: '',
  series: [
    {
      name: 'Achievement',
      type: 'column',
      data: [],
    },
    {
      name: 'Target',
      type: 'column',
      data: [],
    },
    {
      name: 'Achievement',
      type: 'line',
      data: [],
    },
    {
      // name: 'Planned',
      name: 'Target',
      type: 'line',
      data: [],
    },
  ],
  series2_3a: [],
  series2_3b: [],

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
        // 'Jan',
        // 'Feb',
        // 'Mar',
        // 'Apr',
        // 'May',
        // 'Jun',
        // 'Jul',
        // 'Aug',
        // 'Sep',
      ],
      type: 'category',
    },
    grid: {
      show: false,
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
        align: 'left',
        minWidth: 100,
        maxWidth: 160,
        style: {
          colors: [],
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-yaxis-label',
        },
        // offsetX: -50,
        // offsetY: -5,
        // rotate: 0,
        formatter: value => {
          // if (value === 0) {
          //   return value;
          // }
          // if (value === 1) {
          //   return value;
          // }
          // if (value <= 1) {
          //   return value.toFixed(1);
          // }

          // //
          // // const roundNumber = Math.round(value);
          // //
          // //
          // if (value % 1 !== 0) {
          //   return convert(Math.round(value * 10) / 10);
          // }
          return convert(value);
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
          //
          if (typeof y !== 'undefined') {
            return `${y.toFixed(2)} £`;
          }
          return y;
        },
      },
    },
  },
};
const filterIndicatorGraphData = (state, action) => {
  const activeLayer = action.payload;
  //
  //
  // const a = 'Output Indicator 2.5';
  //
  const filtered = state.logDataGraph.filter(result => {
    //   if (result.category === 'IMPACT') {
    //
    return result.sub_category.name === action.payload;
    //   }
  });
  // this.setState({ filteredDynamicData: filtered });
  //
  // const { dataType } = filtered[0];
  const dataType = filtered[0].data_type;
  const dataUnit = filtered[0].unit;

  let unit = '';
  let type = '';
  //
  //
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
    //
    return el.year.name;
  });
  const category = filtered.map(el => {
    //
    return el.year.name;
  });
  console.log(category, 'category');
  const totalDateList = filtered.map(el => {
    //
    return el.year;
  });
  const totalRangeDate = totalDateList.map(data => {
    return data.range;
  });
  const totalRangeDateName = totalDateList.map(data => {
    return data.name;
  });

  //
  //
  //
  const series = [
    {
      name: 'Target',
      type: 'column',
      data: planned,
    },
    {
      name: 'Achievement ',
      type: 'column',
      data: achieved,
    },
    {
      name: 'Target ',
      type: 'area',
      data: planned,
    },
    {
      name: 'Achievement',
      type: 'area',
      data: achieved,
    },
  ];
  //
  // const { getDateRange } = this.props;
  // getDateRange(totalDateList);

  return {
    ...state,
    totalRangeDate,
    totalRangeDateName,
    series,
    filteredDynamicData: filtered,
    dateRange: totalDateList,
    defaultdateRange: totalDateList,
    options: {
      ...state.options,
      grid: {
        show: false,
      },
      filteredDynamicData: filtered,
      labels: label,
      xaxis: {
        ...state.options.xaxis,
        categories: category,
        axisBorder: {
          show: true,
        },
      },
      yaxis: {
        ...state.options.yaxis,
        axisBorder: {
          show: true,
        },
        title: {
          text: `${dataType}  ${
            dataUnit !== null && dataUnit !== undefined
              ? `(${dataUnit})`
              : ''
          }`,
          style: {
            color: '#f37b2e',
            fontFamily: 'Avenir Heavy',
            fontSize: '15px',
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter(y, x) {
            let Output41 = '';
            if (
              activeLayer === 'Output Indicator 4.1' &&
              x.seriesIndex === 0 &&
              y === 1
            ) {
              Output41 = 'Approved';
            } else if (
              activeLayer === 'Output Indicator 4.1' &&
              x.seriesIndex === 1 &&
              y === 1
            ) {
              // alert('4.1');
              Output41 = 'Submitted To DFID';
            } else if (
              activeLayer === 'Output Indicator 4.2' &&
              x.seriesIndex === 0 &&
              y === 1
            ) {
              // alert('4.2');
              Output41 = 'Established And Operational';
            }
            // const percentForOI2 =
            //   activeLayer === 'Outcome Indicator 2'
            //     ? x.seriesIndex === 0
            //       ? plannedPercent[x.dataPointIndex].toFixed(0) !==
            //         '0'
            //         ? `(${plannedPercent[x.dataPointIndex].toFixed(
            //             2,
            //           )}%)`
            //         : ''
            //       : achievedPercent[x.dataPointIndex].toFixed(0) !==
            //         '0'
            //       ? `(${achievedPercent[x.dataPointIndex].toFixed(
            //           2,
            //         )}%)`
            //       : ''
            //     : '';
            //
            if (typeof y !== 'undefined') {
              // return `${unit} ${y.toFixed(0)}${type}`;
              return `${unit} ${
                Output41 !== '' ? '' : y.toLocaleString()
              }${type} ${Output41}`;
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
  const { activeLayer, activeDate, activeDataType } = action.payload;
  // console.log(activeLayer, 'activeLayer');
  // console.log(activeDate, 'activeDate');
  // console.log(activeDataType, 'activeDataType');
  //
  //
  const activeDateClone = activeDate;
  let activeDates = [];
  if (activeLayer === 'Output Indicator 1.5') {
    // activeDate = activeDate.map(data => {
    //   if (data === '2020') {
    //     return data;
    //   }
    // });
    activeDates = activeDateClone.filter(
      date => date === '2020' || date === '2019' || date === '2018',
    );
  } else if (activeLayer === 'Output Indicator 1.4') {
    // activeDate = activeDate.map(data => {
    //   if (data === '2020') {
    //     return data;
    //   }
    // });
    activeDates = activeDateClone.filter(date => date < '2019');
    //
  } else {
    activeDates = activeDate;
  }

  const filtered = [];
  console.log(state.logDataGraph, 'logdatagraph');
  // eslint-disable-next-line array-callback-return
  activeDates.map(date => {
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
  let plannedPercent = [];
  let achievedPercent = [];

  //
  if (dataType !== undefined && dataType !== null) {
    if (dataType === 'Percent') {
      type = '%';
    } else if (dataUnit === 'GBP' || dataUnit === 'pound') {
      unit = '£';
    } else if (dataUnit === 'NPR') {
      unit = 'Rs';
    } else if (dataType.includes('Percent')) {
      type = '%';
      // } else if (dataType !== null && dataType.includes('Percent')) {
      //   type = '%';
    } else {
      type = '';
    }
  }

  function getPercentageChange(
    prevNumber,
    currentNumber,
    activeDataTypeParam,
  ) {
    if (activeDataTypeParam === 'Cumulative') {
      const decreaseValue = currentNumber - prevNumber;

      return (decreaseValue / prevNumber) * 100;
    }
    const decreaseValue = currentNumber - prevNumber;

    return (decreaseValue / prevNumber) * 100;
  }

  const planned = filtered.map(el => {
    return `${el.planned_afp}`;
  });
  const achieved = filtered.map(el => {
    return `${el.achieved}`;
  });
  plannedPercent = planned.map((x, y) => {
    //
    //
    //
    //
    const oldValue =
      planned[y - 1] === undefined ? 0 : planned[y - 1];
    return getPercentageChange(oldValue, x) === Infinity
      ? 0
      : getPercentageChange(oldValue, x, activeDataType);
    // return planned[y - 1];
  });
  achievedPercent = planned.map((x, y) => {
    //
    //
    //
    //
    const oldValue =
      achieved[y - 1] === undefined ? 0 : achieved[y - 1];
    return getPercentageChange(oldValue, x) === Infinity
      ? 0
      : getPercentageChange(oldValue, x, activeDataType);
    // return planned[y - 1];
  });
  // const plannedPercent = planned.reduce((x, y, z) => {
  //   //
  //   //
  //   //
  //   return parseInt(x, 10) + parseInt(y, 10);
  // });

  //

  const label = filtered.map(el => {
    //
    return el.year.name;
  });
  const category = filtered.map(el => {
    //
    return [el.year.range];
  });
  console.log(category, 'category');
  const returnedFormat = (x, y) => {
    let Output41 = '';
    if (
      activeLayer === 'Output Indicator 4.1' &&
      x.seriesIndex === 0 &&
      y === 1
    ) {
      Output41 = 'Approved';
    } else if (
      activeLayer === 'Output Indicator 4.1' &&
      x.seriesIndex === 1 &&
      y === 1
    ) {
      // alert('4.1');
      Output41 = 'Submitted To DFID';
    } else if (
      activeLayer === 'Output Indicator 4.2' &&
      x.seriesIndex === 0 &&
      y === 1
    ) {
      // alert('4.2');
      Output41 = 'Established And Operational';
    } else if (
      activeLayer === 'Output Indicator 4.2' &&
      x.seriesIndex === 0 &&
      y === 0
    ) {
      // alert('4.2');
      Output41 = 'Established And Operational';
    }
    const percentForOI2 =
      activeLayer === 'Outcome Indicator 2'
        ? x.seriesIndex === 0
          ? plannedPercent[x.dataPointIndex].toFixed(0) !== '0'
            ? `(${plannedPercent[x.dataPointIndex].toFixed(2)}%)`
            : ''
          : achievedPercent[x.dataPointIndex].toFixed(0) !== '0'
          ? `(${achievedPercent[x.dataPointIndex].toFixed(2)}%)`
          : ''
        : '';
    //
    if (typeof y !== 'undefined') {
      // return `${unit} ${y.toFixed(0)}${type}`;
      return `${unit} ${
        Output41 !== '' ? '' : y.toLocaleString()
      }${type} ${`${percentForOI2}`}${Output41} ${
        activeLayer === 'Output Indicator 1.4' ? '%' : ''
      }`;
    }
    return y;
  };

  let series2_3a = [];
  let series2_3b = [];
  // let title2_3a;
  let subTitle2_3a = '';
  // let title2_3b;
  let subTitle2_3b = '';
  if (activeLayer === 'Output Indicator 2.3') {
    const filtered2_3a = [];
    const filtered2_3b = [];
    // console.log(state.logDataGraph, 'logdatagraph');
    // eslint-disable-next-line array-callback-return
    activeDates.forEach(date => {
      // eslint-disable-next-line array-callback-return
      state.logDataGraph.forEach(data => {
        if (
          data.year.range === date &&
          data.sub_category.name === 'Output Indicator 2.3a'
        ) {
          filtered2_3a.push(data);
          if (subTitle2_3a === '') {
            subTitle2_3a = data.sub_category.title;
          }
        }
        if (
          data.year.range === date &&
          data.sub_category.name === 'Output Indicator 2.3b'
        ) {
          filtered2_3b.push(data);

          if (subTitle2_3b === '') {
            subTitle2_3b = data.sub_category.title;
          }
        }
      });
    });
    const planned2_3a = filtered2_3a.map(el => {
      return `${el.planned_afp}`;
    });
    const planned2_3b = filtered2_3b.map(el => {
      return `${el.planned_afp}`;
    });
    const achieved2_3a = filtered2_3a.map(el => {
      return `${el.achieved}`;
    });
    const achieved2_3b = filtered2_3b.map(el => {
      return `${el.achieved}`;
    });
    series2_3a = [
      {
        name: 'Target',
        type: 'column',
        data: planned2_3a,
      },
      {
        name: 'Achievement ',
        type: 'column',
        data: achieved2_3a,
      },
      {
        name: 'Target ',
        type: 'area',
        data: planned2_3a,
      },
      {
        name: 'Achievement',
        type: 'area',
        data: achieved2_3a,
      },
    ];
    series2_3b = [
      {
        name: 'Target',
        type: 'column',
        data: planned2_3b,
      },
      {
        name: 'Achievement ',
        type: 'column',
        data: achieved2_3b,
      },
      {
        name: 'Target ',
        type: 'area',
        data: planned2_3b,
      },
      {
        name: 'Achievement',
        type: 'area',
        data: achieved2_3b,
      },
    ];
  }
  //
  //
  //
  const series = [
    {
      name: 'Target',
      type: 'column',
      data: planned,
    },
    {
      name: 'Achievement ',
      type: 'column',
      data: achieved,
    },
    {
      name: 'Target ',
      type: 'area',
      data: planned,
    },
    {
      name: 'Achievement',
      type: 'area',
      data: achieved,
    },
  ];

  //
  // const { getDateRange } = this.props;
  // getDateRange(totalDateList);

  return {
    ...state,
    filteredDynamicData: filtered,
    series,
    series2_3a,
    series2_3b,
    // title2_3a,
    subCategoryTitle2_3a: subTitle2_3a ? subTitle2_3a : '',
    // title2_3b,
    subCategoryTitle2_3b: subTitle2_3b ? subTitle2_3b : '',
    dateRange:
      activeLayer === 'Output Indicator 1.4'
        ? state.dateRange
        : state.defaultdateRange,
    options: {
      ...state.options,
      count: Math.random(),
      grid: {
        show: false,
      },
      labels: label,
      xaxis: {
        ...state.options.xaxis,
        categories: category,
        axisBorder: {
          show: true,
        },
      },
      yaxis: {
        ...state.options.yaxis,
        axisBorder: {
          show: true,
        },
        labels: {
          show: true,
          align: 'left',
          minWidth: 100,
          maxWidth: 300,
          style: {
            colors: [],
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
          },
          // offsetX: -50,
          // offsetY: -5,
          // rotate: 0,
          formatter: value => {
            if (value === 0) {
              return value;
            }
            if (value === 1) {
              return value;
            }
            if (value <= 1) {
              return value.toFixed(2);
            }

            //
            // const roundNumber = Math.round(value);
            //
            //
            if (value % 1 !== 0) {
              return convert(value.toFixed(2));
            }
            if (activeLayer === 'Output Indicator 1.4') {
              return value;
            }
            return convert(value);
          },
        },
        crosshairs: {
          show: false,
        },
        title: {
          text: `${
            dataType !== null && dataType !== undefined
              ? dataType
              : ``
          }  ${
            dataUnit !== null && dataUnit !== undefined
              ? `(${dataUnit})`
              : ''
          }`,
          style: {
            color: '#f37b2e',
            fontFamily: 'Avenir Heavy',
            fontSize: '15px',
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter(y, x) {
            // const activeL = activeLayer;

            // alert(activeL);
            const finalFormatter = returnedFormat(x, y);
            return finalFormatter;
          },
        },
      },
    },
  };
};
const filterOutputIndicatorForPercentOrNumber = (state, action) => {
  // const dataTypePayload = action.payload;
  const { activeLayer, activeDate, dataTypePayload } = action.payload;

  const activeDateClone = activeDate;
  let activeDates = [];
  if (dataTypePayload === 'percent') {
    // activeDate = activeDate.map(data => {
    //   if (data === '2020') {
    //     return data;
    //   }
    // });
    activeDates = activeDateClone.filter(date => date < '2019');
  } else if (dataTypePayload === 'number') {
    activeDates = activeDateClone.filter(date => date >= '2019');
  } else {
    activeDates = activeDate;
  }
  const filtered = [];
  // eslint-disable-next-line array-callback-return
  activeDates.map(date => {
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

  //
  if (dataType === 'Percent') {
    type = '%';
  } else if (dataUnit === 'GBP' || dataUnit === 'pound') {
    unit = '£';
  } else if (dataUnit === 'NPR') {
    unit = 'Rs';
  } else if (
    dataType !== undefined ||
    (dataType !== null && dataType.includes('Percent'))
  ) {
    type = '%';
  }
  const planned = filtered.map(el => {
    return `${el.planned_afp}`;
  });
  //
  const achieved = filtered.map(el => {
    return `${el.achieved}`;
  });
  const label = filtered.map(el => {
    //
    return el.year.name;
  });
  const category = filtered.map(el => {
    //
    return [el.year.range];
  });
  //
  //
  //
  const series = [
    {
      name: 'Target',
      type: 'column',
      data: planned,
    },
    {
      name: 'Achievement ',
      type: 'column',
      data: achieved,
    },
    {
      name: 'Target ',
      type: 'area',
      data: planned,
    },
    {
      name: 'Achievement',
      type: 'area',
      data: achieved,
    },
  ];
  //
  // const { getDateRange } = this.props;
  // getDateRange(totalDateList);
  const { defaultdateRange } = state;
  const filterRange = defaultdateRange.filter(date => {
    if (dataTypePayload === 'percent') {
      return date.range < '2019';
    }
    if (dataTypePayload === 'number') {
      return date.range >= '2019';
    }
    return date;
  });
  return {
    ...state,
    filteredDynamicData: filtered,
    series,
    dateRange: filterRange,
    options: {
      ...state.options,
      grid: {
        show: false,
      },
      labels: label,
      xaxis: {
        ...state.options.xaxis,
        categories: category,
        axisBorder: {
          show: true,
        },
      },
      yaxis: {
        ...state.options.yaxis,
        axisBorder: {
          show: true,
        },
        labels: {
          show: true,
          align: 'left',
          minWidth: 160,
          maxWidth: 300,
          style: {
            colors: [],
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
          },
          // offsetX: -50,
          // offsetY: -5,
          // rotate: 0,
          formatter: value => {
            if (value === 0) {
              return value;
            }
            if (value === 1) {
              return value;
            }
            if (value <= 1) {
              return value.toFixed(1);
            }

            //
            // const roundNumber = Math.round(value);
            //
            //
            if (value % 1 !== 0) {
              return convert(Math.round(value * 10) / 10);
            }
            if (
              activeLayer === 'Output Indicator 1.4' &&
              dataTypePayload === 'percent'
            ) {
              return value;
            }
            return convert(value);
          },
        },
        min: 0,
        forceNiceScale: true,

        // max: 10,
        title: {
          text: `${
            dataType !== null && dataType !== undefined
              ? dataType
              : ``
          }  ${
            dataUnit !== null && dataUnit !== undefined
              ? `(${dataUnit})`
              : ''
          }`,
          style: {
            color: '#f37b2e',
            fontFamily: 'Avenir Heavy',
            fontSize: '15px',
          },
        },
        crosshairs: {
          show: false,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter(y) {
            //
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
const getPlannedAchievedDataFor1stPieCharts = (state, action) => {
  const { activeYear } = action.payload;
  const totalData = state.logDataGraph;
  const filteredDataByCategory = totalData.filter(data => {
    return data.sub_category.name === 'Outcome Indicator 4';
  });
  //
  const filteredData = filteredDataByCategory.filter(data => {
    //
    if (activeYear.length > 0) {
      return activeYear.includes(data.year.range);
    }
    return data;
  });
  const labelForPiechart = filteredData.map(filtered => {
    return filtered.year.name;
  });
  //
  const plannedData = filteredData.map(filtered => {
    //
    const splitted = filtered.planned_afp.toString().includes(',')
      ? filtered.planned_afp.split(',')
      : filtered.planned_afp;
    return filtered.planned_afp.toString().includes(',')
      ? +splitted[0]
      : +splitted;
  });
  // const totalPlannedSum = plannedData.reduce((a, b) => {
  //   return +a + +b;
  // });
  const achievedData = filteredData.map(filtered => {
    const splitted = filtered.achieved.toString().includes(',')
      ? filtered.achieved.split(',')
      : filtered.achieved;
    return filtered.achieved.toString().includes(',')
      ? +splitted[0]
      : +splitted;
  });
  // const totalAchievedSum = achievedData.reduce((a, b) => {
  //   return +a + +b;
  // });
  // const plannedPercents = plannedData.map(data => {
  //   const calculatedPercent = (data / totalPlannedSum) * 100;
  //   return calculatedPercent;
  // });
  // const achievedPercents = achievedData.map(data => {
  //   const calculatedPercent = (data / totalAchievedSum) * 100;
  //   return calculatedPercent;
  // });
  //
  //
  //
  //

  // //
  //

  return {
    ...state,
    planned1stPieData: {
      series: plannedData,
      label: labelForPiechart,
    },
    achieved1stPieData: {
      series: achievedData,
      label: labelForPiechart,
    },
  };
};
const getPlannedAchievedDataFor2ndPieCharts = (state, action) => {
  const { selectedMilestone } = action.payload;

  const totalData = [...state.logDataGraph];
  const filteredData = totalData.filter(data => {
    return data.sub_category.name === 'Outcome Indicator 4';
  });
  const milestoneWiseFilter = filteredData.filter(data => {
    return data.year.name === selectedMilestone;
  });

  const plannedData = milestoneWiseFilter.map(filtered => {
    const splitted = filtered.planned_afp.split(',');
    return +splitted[1];
  });
  plannedData.push(100 - +plannedData[0]);

  const achievedData = milestoneWiseFilter.map(filtered => {
    const splitted = filtered.achieved.split(',');
    return +splitted[1];
  });
  achievedData.push(100 - +achievedData[0]);

  return {
    ...state,
    planned2ndPieData: {
      series: plannedData,
      label: ['Female %', 'Male %'],
    },
    achieved2ndPieData: {
      series: achievedData,
      label: ['Female %', 'Male %'],
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
    case FILTER_OUTPUT_INDICATOR_WITH_PERCENT_OR_NUMBER:
      return filterOutputIndicatorForPercentOrNumber(state, action);
    case GET_PLANNED_ACHIEVED_DATA_FOR_1STPIECHARTS:
      return getPlannedAchievedDataFor1stPieCharts(state, action);
    case GET_PLANNED_ACHIEVED_DATA_FOR_2NDPIECHARTS:
      return getPlannedAchievedDataFor2ndPieCharts(state, action);

    // case TOGGLE_NULL_SUBMISSIONS_ANSWER:
    //   return toggleNullSubmission(state);

    default:
      return state;
  }
}
