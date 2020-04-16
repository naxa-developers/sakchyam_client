import {
  GET_INDICATORS_GRAPHDATA,
  GET_INDICATORS_CATEGORY,
  GET_INDICATORS_GRAPHDATA_INDIVIDUAL,
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
  isDataFetched: false,
  indicatorCategory: [],
  logDataGraph: [],
  series: [
    // {
    //   name: 'Planned As per AFP contract Budget',
    //   type: 'column',
    //   data: planned,
    // },
    // {
    //   name: 'Achieved',
    //   type: 'column',
    //   data: achieved,
    // },
    // {
    //   name: 'Planned As per AFP contract Budget',
    //   type: 'line',
    //   data: planned,
    // },
    // {
    //   name: 'Achieved',
    //   type: 'line',
    //   data: achieved,
    // },
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
const getSearchPrimaryGeojson = (state, action) => {
  const filteredData = state.primaryGeojson[0].features.filter(
    data => {
      const projectname = data.properties.name.toLowerCase();
      const keyword = action.payload.keyword.toLowerCase();
      return projectname.match(keyword);
    },
  );
  return {
    ...state,
    ...(filteredData.length > 0
      ? {
          clonePrimaryGeojson: {
            0: {
              ...state.primaryGeojson[0],
              features: filteredData,
            },
          },
        }
      : {
          clonePrimaryGeojson: {
            0: {
              ...state.primaryGeojson[0],
              features: [],
            },
          },
        }),
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
