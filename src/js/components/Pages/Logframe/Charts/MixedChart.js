import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { func } from 'prop-types';
// import {
//   filterFinancialDataOfDistrictFromProvince,
//   filterFinancialDataOfMunicipalityFromDistrict,
// } from '../../../../../actions/partnership.actions';
// import convert from '../../../../utils/convertNumbers';
function convert(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? `${Math.abs(Number(labelValue)) / 1.0e9}B`
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? `${Math.abs(Number(labelValue)) / 1.0e6}M`
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? `${Math.abs(Number(labelValue)) / 1.0e3}K`
    : Math.abs(Number(labelValue));
}
class MixedChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {},
    };
  }

  componentDidMount() {
    this.plotChart();
    this.updateBarChart();

    const { activeModal } = this.props;
    if (activeModal) {
      // this.plotChart();
      this.updateBarChart();
    }
    // this.updateBarChart();
  }

  plotChart = () => {
    //
    const that = this;
    const { series, optionsState, activeModal } = this.props;
    // const series = [
    //   {
    //     name: 'Income',
    //     type: 'column',
    //     data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
    //   },
    //   {
    //     name: 'Cashflow',
    //     type: 'column',
    //     data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
    //   },
    //   {
    //     name: 'Revenue',
    //     type: 'line',
    //     data: [20, 29, 37, 36, 44, 45, 50, 58],
    //   },
    //   {
    //     name: 'Revenues',
    //     type: 'line',
    //     data: [20, 29, 37, 36, 44, 45, 50, 58],
    //   },
    // ];
    // {
    //   name: 'Income',
    //   type: 'column',
    //   data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
    // },
    // {
    //   name: 'Cashflow',
    //   type: 'column',
    //   data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
    // },
    // {
    //   name: 'Revenue',
    //   type: 'line',
    //   data: [20, 29, 37, 36, 44, 45, 50, 58],
    // },

    const optionsVar = {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [0, 1, 6, 6],
        curve: 'straight',
      },
      colors: ['#AC3238', '#2A7178'],
      fill: {
        opacity: [0.75, 0.75, 0, 0],
        // opacity: [0.65, 0.65, 0.15, 0.15],
        // opacity: [0.45, 0.75, 0.15, 0.2],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0,
          opacityTo: 0,
          stops: [0, 100, 100, 100],
        },
      },
      markers: {
        size: 5,
        offsetX: 0,
        offsetY: 0,
      },
      xaxis: {
        title: {
          text: 'Milestone/year',
          style: {
            fontFamily: 'Avenir Heavy',
            fontSize: '20px',
            color: '#f37b2e',
          },
        },
        labels: {
          style: {
            cssClass: 'x-axislabel',
          },
          show: true,
          // formatter(value, timestamp, index) {
          //   const splitFormat = value.split('(');
          //   console.log(splitFormat[0], splitFormat[1]);
          //   // return [splitFormat[0], splitFormat[1]];
          // },
          // minHeight: 200,
        },
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
        categories: optionsState.xaxis.categories,
        type: 'category',
        tickPlacement: 'between',
      },

      yaxis: {
        tickPlacement: 'between',
        // axisTicks: {
        //   show: true,
        // },
        crosshairs: {
          show: false,
        },
        min: 0,
        forceNiceScale: true,
        // axisBorder: {
        //   show: true,
        //   color: '#008FFB',
        // },
        labels: {
          show: true,
          align: 'right',
          minWidth: activeModal ? 200 : 100,
          maxWidth: activeModal ? 260 : 160,
          //   minWidth: 0,
          //   maxWidth: 160,
          style: {
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
          formatter: value => {
            // if (value <= 1) {
            //   return value.toFixed(1);
            // }
            // console.log(value, 'v');
            // const roundNumber = Math.round(value);
            // console.log(convert(roundNumber));
            //   console.log(convert(roundNumber));
            // console.log(activeLayer, 'activeLayer');
            // if (activeLayer === 'Output Indicator 1.4') {
            //   return value;
            // }

            return convert(value);
          },
        },
        title: {
          text: 'Income (thousand crores)',
          style: {
            color: 'rgb(243, 123, 46)',
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            cssClass: 'apexcharts-yaxis-title',
          },
        },
      },
      // {
      //   seriesName: 'Income',
      //   opposite: true,
      //   axisTicks: {
      //     show: true,
      //   },
      //   axisBorder: {
      //     show: true,
      //     color: '#00E396',
      //   },
      //   labels: {
      //     style: {
      //       colors: '#00E396',
      //     },
      //   },
      //   title: {
      //     text: 'Operating Cashflow (thousand crores)',
      //     style: {
      //       color: '#00E396',
      //     },
      //   },
      // },
      // {
      //   seriesName: 'Revenue',
      //   opposite: true,
      //   axisTicks: {
      //     show: true,
      //   },
      //   axisBorder: {
      //     show: true,
      //     color: '#FEB019',
      //   },
      //   labels: {
      //     style: {
      //       colors: '#FEB019',
      //     },
      //   },
      //   title: {
      //     text: 'Revenue (thousand crores)',
      //     style: {
      //       color: '#FEB019',
      //     },
      //   },
      //   tooltip: {
      //     enabled: true,
      //   },
      // },
      //   ],
      noData: {
        text: 'No Data Selected',
      },
      tooltip: {
        // intersect: false,
        // enabledOnSeries: [1, 2],
        // fixed: {
        //   enabled: true,
        //   //   position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
        //   offsetY: 30,
        //   offsetX: 60,
        // },
        shared: true,
        intersect: false,
        // followCursor: true,
        // onDatasetHover: {
        //   highlightDataSeries: false,
        // },
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
      legend: {
        show: false,
        horizontalAlign: 'left',
        offsetX: 40,
      },
    };
    this.setState({ options: optionsVar, series });
  };

  updateBarChart = () => {
    const that = this;
    const {
      series,
      optionsState,
      activeModal,
      //   partnershipReducer: { barDatas },
      cardView,
    } = this.props;
    console.log(optionsState, 'options');

    //
    //
    // const series = [
    //   {
    //     name: 'PRODUCT A',
    //     data: [44, 55, 41, 67, 22, 43],
    //   },
    //   {
    //     name: 'PRODUCT B',
    //     data: [13, 23, 20, 8, 13, 27],
    //   },
    //   {
    //     name: 'PRODUCT C',
    //     data: [11, 17, 15, 15, 21, 14],
    //   },
    //   {
    //     name: 'PRODUCT D',
    //     data: [21, 7, 25, 13, 22, 8],
    //   },
    // ];
    const optionsVar = {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
        toolbar: {
          show: false,
          // offsetX: 0,
          // offsetY: 0,
          tools: {
            // download: `<a href="#/" class="download-icon-image"><img src=${DownloadIcon} alt=""></a>`,
            download: `<i class="fa fa-download" aria-hidden="true"></i>`,
            // download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
            //   // reset: true | '<img src="/static/icons/reset.png" width="20">',
            //   // customIcons: []
          },
          // autoSelected: 'zoom',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [0, 1, 6, 6],
        curve: 'straight',
      },
      colors: ['#AC3238', '#2A7178'],
      fill: {
        opacity: [0.75, 0.75, 0, 0],
        // opacity: [0.65, 0.65, 0.15, 0.15],
        // opacity: [0.45, 0.75, 0.15, 0.2],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0,
          opacityTo: 0,
          stops: [0, 100, 100, 100],
        },
      },
      markers: {
        size: 5,
        offsetX: 0,
        offsetY: 0,
      },
      xaxis: {
        title: {
          text: 'Milestone/year',
          style: {
            fontFamily: 'Avenir Heavy',
            fontSize: '20px',
            color: '#f37b2e',
          },
        },
        labels: {
          style: {
            cssClass: 'x-axislabel',
          },
          show: true,
          // formatter(value, timestamp, index) {
          //   const splitFormat = value.split('(');
          //   console.log(splitFormat[0], splitFormat[1]);
          //   // return [splitFormat[0], splitFormat[1]];
          // },
          // minHeight: 200,
        },
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
        categories: optionsState.xaxis.categories,
        type: 'category',
        tickPlacement: 'between',
      },

      yaxis: {
        decimalsInFloat: 2,
        tickPlacement: 'between',
        // axisTicks: {
        //   show: true,
        // },
        crosshairs: {
          show: false,
        },
        min: 0,
        forceNiceScale: true,
        // axisBorder: {
        //   show: true,
        //   color: '#008FFB',
        // },
        labels: {
          show: true,
          align: 'right',
          minWidth: 100,
          maxWidth: 160,
          style: {
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
          formatter: optionsState.yaxis.labels.formatter,
        },
        title: optionsState.yaxis.title,
      },
      // {
      //   seriesName: 'Income',
      //   opposite: true,
      //   axisTicks: {
      //     show: true,
      //   },
      //   axisBorder: {
      //     show: true,
      //     color: '#00E396',
      //   },
      //   labels: {
      //     style: {
      //       colors: '#00E396',
      //     },
      //   },
      //   title: {
      //     text: 'Operating Cashflow (thousand crores)',
      //     style: {
      //       color: '#00E396',
      //     },
      //   },
      // },
      // {
      //   seriesName: 'Revenue',
      //   opposite: true,
      //   axisTicks: {
      //     show: true,
      //   },
      //   axisBorder: {
      //     show: true,
      //     color: '#FEB019',
      //   },
      //   labels: {
      //     style: {
      //       colors: '#FEB019',
      //     },
      //   },
      //   title: {
      //     text: 'Revenue (thousand crores)',
      //     style: {
      //       color: '#FEB019',
      //     },
      //   },
      //   tooltip: {
      //     enabled: true,
      //   },
      // },
      //   ],
      noData: {
        text: 'No Data Selected',
      },
      tooltip: {
        // intersect: false,
        enabledOnSeries: [0, 1],
        // fixed: {
        //   enabled: true,
        //   //   position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
        //   offsetY: 30,
        //   offsetX: 60,
        // },
        shared: true,
        intersect: false,
        // followCursor: true,
        // onDatasetHover: {
        //   highlightDataSeries: false,
        // },
        y:
          optionsState &&
          optionsState.tooltip &&
          optionsState.tooltip.y,
      },
      legend: {
        show: false,
        horizontalAlign: 'left',
        offsetX: 40,
      },
      //   legend: {
      //     horizontalAlign: 'left',
      //     offsetX: 40,
      //   },
    };
    //
    this.setState({ options: optionsVar, series });
  };

  componentDidUpdate(prevProps, prevState) {
    const { series, optionsState, activeDate } = this.props;
    if (prevProps.series !== series) {
      // alert('test');
      this.updateBarChart();
    }
    if (prevProps.optionsState !== optionsState) {
      // alert('test');
      this.updateBarChart();
    }
    if (prevProps.activeDate !== activeDate) {
      // alert('test');
      this.updateBarChart();
    }
  }

  render() {
    //
    const { options, series } = this.state;
    const { chartRef, activeModal, cardView, cardTitle } = this.props;
    return (
      <div id="stacked_chart">
        <h5 className="graph-title">{cardTitle}</h5>
        <ReactApexChart
          ref={chartRef}
          key={series}
          options={options}
          series={series}
          type="bar"
          height={
            cardView && !activeModal
              ? 350
              : activeModal && window.innerWidth < 1400
              ? 500 // modal on and arjun screen size
              : 690
          }
          // width={
          //   cardView && !activeModal
          //     ? null
          //     : activeModal && window.innerWidth < 1400
          //     ? 1250 // modal on and arjun screen size
          //     : 690
          // }
          // width={activeModal === true ? 1600 -+: '100%'}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});
export default connect(mapStateToProps, {
  //   filterFinancialDataOfDistrictFromProvince,
  //   filterFinancialDataOfMunicipalityFromDistrict,
})(MixedChart);
