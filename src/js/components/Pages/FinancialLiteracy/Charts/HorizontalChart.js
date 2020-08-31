/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { connect } from 'react-redux';
// color: #c21c2e;
// color: #f36c00;
// color: #40a8be;
// color: #de2693;

// function convertLabelName(name) {
//   const nameArr = name.split(' ');
//   let firstElement;
//   let rest;
//   if (nameArr.length < 3) {
//     // eslint-disable-next-line prefer-destructuring
//     firstElement = nameArr[0];
//     rest = name
//       .split(' ')
//       .slice(1)
//       .join(' ');
//   } else {
//     firstElement = `${nameArr[0]} ${nameArr[1]}`;
//     rest = name
//       .split(' ')
//       .slice(2)
//       .join(' ');
//   }

//   const newName = [firstElement, rest];

//   return newName;
// }

// function colorPicker(i) {
//   if (i % 25 === 0) return '#91664E';
//   if (i % 25 === 1) return '#13A8BE';
//   if (i % 25 === 2) return '#13A8BE'; // #FF6D00
//   if (i % 25 === 3) return '#DE2693';
//   if (i % 25 === 4) return '#B1B424';
//   if (i % 25 === 5) return '#2196F3';
//   if (i % 25 === 6) return '#B1B424'; // #4CE2A7
//   if (i % 25 === 7) return '#1967A0';
//   if (i % 25 === 8) return '#00C853';
//   if (i % 25 === 9) return '#E11D3F'; // #651FFF
//   if (i % 25 === 10) return '#FF6D00'; // #B71DE1
//   if (i % 25 === 11) return '#DE2693'; // #FFCD00
//   if (i % 25 === 12) return '#1F8AE4'; // #E11D3F
//   if (i % 25 === 13) return '#FF1500';
//   if (i % 25 === 14) return '#C5E11D';
//   if (i % 25 === 15) return '#CDACF2';
//   if (i % 25 === 16) return 'AFDE0E';
//   if (i % 25 === 17) return '#FF5576';
//   if (i % 25 === 18) return '#BFEDF5';
//   if (i % 25 === 19) return '#E0CBAB';
//   if (i % 25 === 25) return '#FF5E00';
//   if (i % 25 === 21) return '#AF7AC5';
//   if (i % 25 === 22) return '#008080';
//   if (i % 25 === 23) return '#C70039';
//   if (i % 25 === 24) return '#16A085';
//   if (i % 25 === 25) return '#5D6D7E';
//   return '#FFD400';
// }

function numberWithCommas(x) {
  if (x !== null) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return x;
}

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
class HorizontalChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {},
      // height: 300,
      partnerChart: {},
      programChart: {},
      isBarChartClicked: false,
      // isToggled: false,
      // clickedPartnerName: '',
    };
  }

  // generateBarChartData = i => {
  //   // eslint-disable-next-line react/no-access-state-in-setstate
  //   const clickedPartner = this.state.options.xaxis.categories[i];
  //   // .join(' ');
  //   const {
  //     financialReducer: { filteredByProgramDefault, financialData },
  //     selectedProgram,
  //   } = this.props;

  //   this.setState({ clickedPartnerName: clickedPartner });

  //   let filteredData = [];

  //   const exception = [
  //     'Kisan Microfinance',
  //     'Kisan Cooperative',
  //     'Mahila Samudayik',
  //     'Mahila Sahayatra',
  //   ];

  //   if (selectedProgram.length === 0) {
  //     filteredData = financialData.filter(item => {
  //       if (
  //         Array.isArray(clickedPartner) &&
  //         exception.includes(clickedPartner.join(' '))
  //       ) {
  //         return (
  //           item.partner_name
  //             .split(' ')
  //             .slice(0, 2)
  //             .join(' ') === clickedPartner.join(' ')
  //         );
  //       }
  //       return (
  //         item.partner_name.substr(
  //           0,
  //           item.partner_name.indexOf(' '),
  //         ) === clickedPartner
  //       );
  //     });
  //   } else {
  //     filteredData = financialData.filter(item => {
  //       if (selectedProgram.includes(item.program_id)) {
  //         if (
  //           Array.isArray(clickedPartner) &&
  //           exception.includes(clickedPartner.join(' '))
  //         ) {
  //           return (
  //             item.partner_name
  //               .split(' ')
  //               .slice(0, 2)
  //               .join(' ') === clickedPartner.join(' ')
  //           );
  //         }
  //         return (
  //           item.partner_name.substr(
  //             0,
  //             item.partner_name.indexOf(' '),
  //           ) === clickedPartner
  //         );
  //       }
  //       return false;
  //     });
  //   }

  //   filteredData.sort((a, b) => b.value - a.value);

  //   if (clickedPartner === 'Chhimek') {
  //     const arr1 = [];
  //     filteredData.forEach(item => {
  //       if (item.program_name === 'Other Initiatives')
  //         arr1.push({
  //           ...item,
  //           program_name: 'Dedicated Financial Literacy Sessions',
  //         });
  //       else arr1.push(item);
  //     });
  //     filteredData = arr1;
  //   }

  //   const arr = [];
  //   const categories = [];
  //   const allProgramColor = [];
  //   filteredData.map(item => {
  //     arr.push(item.value);
  //     categories.push(convertLabelName(item.program_name));
  //     allProgramColor.push(colorPicker(item.program_id));
  //     return true;
  //   });

  //   this.setState(prevState => ({
  //     // height: 200,
  //     chartData2: {
  //       series: [{ data: arr }],

  //       options: {
  //         ...prevState.options,
  //         plotOptions: {
  //           ...prevState.options.plotOptions,
  //           bar: {
  //             ...prevState.options.plotOptions.bar,
  //             distributed: true,
  //             // barHeight: '1%',
  //             columnWidth: '15%',
  //           },
  //         },
  //         colors: allProgramColor,
  //         xaxis: {
  //           ...prevState.options.xaxis,
  //           categories,
  //           labels: {
  //             ...prevState.options.xaxis.labels,
  //             // formatter(value, timestamp, index) {
  //             //   console.log(
  //             //     timestamp.w &&
  //             //       timestamp.w.config.xaxis.categories.includes(
  //             //         'Other Initiatives',
  //             //       ),
  //             //     'timestamp',
  //             //   );
  //             //   // console.log(index, 'index');
  //             //   return value === 'Other Initiatives' &&
  //             //     timestamp.w &&
  //             //     timestamp.w.config.xaxis.categories
  //             //     ? 'hello'
  //             //     : value;
  //             // },
  //           },
  //         },
  //         title: {
  //           text: prevState.clickedPartnerName,
  //           floating: true,
  //           offsetY: 0,
  //           align: 'center',
  //           style: {
  //             color: '#444',
  //             fontFamily: 'Avenir Book',
  //             // fontSize: '17px',
  //           },
  //         },
  //       },
  //     },
  //     isBarChartClicked: !prevState.isBarChartClicked,
  //   }));
  // };

  plotChart = () => {
    const series = [
      {
        name: 'a',
        data: [44, 55, 41, 64, 22, 43, 21],
      },
      {
        data: [53, 32, 33, 52, 13, 44, 32],
      },
      {
        data: [44, 55, 41, 64, 22, 43, 21],
      },
      {
        data: [53, 32, 33, 52, 13, 44, 32],
      },
      {
        data: [53, 32, 33, 52, 13, 44, 32],
      },
      {
        data: [53, 32, 33, 52, 13, 44, 32],
      },
    ];
    const options = {
      grid: { show: false },
      chart: {
        type: 'bar',
        // height: 2000,
        toolbar: {
          show: false,
        },
        events: {
          click: function(
            event,
            chartContext,
            { seriesIndex, dataPointIndex, config },
          ) {
            if (
              !this.props.isBarChartClicked &&
              !this.props.isToggled
            ) {
              if (dataPointIndex >= 0)
                this.props.generateBarChartData(
                  dataPointIndex,
                  this.state.options,
                );
            }
          }.bind(this),
        },
      },
      plotOptions: {
        bar: {
          // barHeight: '100%',
          // columnWidth: '100%',
          distributed: false,
          horizontal: false,
          dataLabels: {
            position: 'top',
          },
          startingShape: 'flat',
          endingShape: 'rounded',
        },
      },
      legend: { show: this.props.activeModal ? true : false },
      colors: ['#c21c2e', '#f36c00', '#40a8be', '#de2693'],
      dataLabels: {
        enabled: false,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },
      xaxis: {
        floating: false,
        position: 'bottom',
        show: true,
        offsetX: 0,
        type: 'category',
        categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
        labels: {
          offsetY: 0,
          style: {
            fontSize: '10px',
          },
          // formatter(value, timestamp, index) {
          //   return value === 'Other Initiatives' ? 'hello' : value;
          // },
        },
      },
      yaxis: {
        // tooltip: {
        //   enabled: true,
        // },
        title: {
          text: 'No. of Beneficiaries',
          offsetX: 5,
          offsetY: 0,
          style: {
            // color: undefined,
            fontSize: '14px',
            fontFamily: 'Avenir Book, sans-serif',
            fontWeight: 500,
            cssClass: 'apexcharts-yaxis-title',
          },
        },
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
        show: true,
        labels: {
          // hideOverlappingLabels: false,
          show: true,
          offsetX: 0,
          // style: {
          //   fontSize: '8px',
          //   fontFamily: 'Helvetica, Arial, sans-serif',
          //   fontWeight: 400,
          //   cssClass: 'apexcharts-xaxis-label',
          // },
          // show: false,
          // formatter: val => numberWithCommas(val),
          formatter: val => convert(val),
        },
      },
      tooltip: {
        marker: {
          show: false,
        },
        // x: { formatter: val => numberWithCommas(`${val} hello`) },
        y: { formatter: val => numberWithCommas(`${val}`) },
      },
    };
    this.setState({ options, series });
  };

  componentDidMount() {
    this.plotChart();
    const {
      activeModal,
      financialReducer: {
        filteredByProgramDefault,
        filteredByProgram,
      },
      checkedPartnerItems,
    } = this.props;

    let columnWidth = '100%';
    if (activeModal) {
      columnWidth = '40%';
    } else {
      columnWidth = '60%';
    }

    let partnerWidth = '100%';
    if (activeModal) {
      partnerWidth = '80%';
    } else {
      partnerWidth = '100%';
    }

    if (activeModal) {
      this.plotChart();
      if (
        filteredByProgram.series[0].data.length > 2
        // filteredByProgram.series.length > 10
      ) {
        this.setState(preState => ({
          // height: 200,
          series: filteredByProgram.series,
          options: {
            ...preState.options,
            plotOptions: {
              ...preState.options.plotOptions,
              bar: {
                ...preState.options.plotOptions.bar,
                barHeight: '80%',
                columnWidth: '100%',
              },
            },
            colors: filteredByProgram.color,
            xaxis: {
              ...preState.options.xaxis,
              categories: filteredByProgram.label,
            },
          },
        }));
      } else {
        this.setState(preState => ({
          // height: 800,
          series: filteredByProgram.series,
          options: {
            ...preState.options,
            plotOptions: {
              ...preState.options.plotOptions,
              bar: {
                ...preState.options.plotOptions.bar,
                barHeight: '20%',
                columnWidth: '100%',
              },
            },
            colors: filteredByProgram.color,
            xaxis: {
              ...preState.options.xaxis,
              categories: filteredByProgram.label,
              // labels: {
              //   ...preState.options.xaxis.labels,
              //   formatter(value, timestamp, index) {
              //
              //     return value === 'Other Initiatives'
              //       ? 'hello'
              //       : value;
              //   },
              // },
            },
          },
        }));
      }
      this.setState(preState => ({
        // isToggled: false,
        isBarChartClicked: false,
        programChart: {
          series: filteredByProgramDefault.series,
          label: filteredByProgramDefault.label,
          color: filteredByProgramDefault.color,
          options: {
            ...preState.options,
            plotOptions: {
              ...preState.options.plotOptions,
              bar: {
                ...preState.options.plotOptions.bar,
                // distributed: true,
                // columnWidth:
                //   this.props.checkedPartnerItems &&
                //   this.props.checkedPartnerItems.length === 0
                //     ? '60%'
                //     : '15%',
                columnWidth,
              },
              xaxis: {
                ...preState.options.xaxis,
                categories: filteredByProgramDefault.label,
              },
            },
            colors: filteredByProgramDefault.color,
            legend: { show: this.props.activeModal ? true : false },
          },
        },
      }));
      this.setState(preState => ({
        partnerChart: {
          series: filteredByProgram.series,
          label: filteredByProgram.label,
          colors: filteredByProgram.color,
          options: {
            ...preState.options,
            // chart: {
            //   id: 'basic-bar',
            //   stacked: true,
            // },
            // tooltip: {
            //   shared: true,
            //   followCursor: true,
            //   inverseOrder: true,
            // },
            plotOptions: {
              ...preState.options.plotOptions,
              bar: {
                ...preState.options.plotOptions.bar,
                columnWidth: partnerWidth,
                // this.props.checkedPartnerItems &&
                // this.props.checkedPartnerItems.length === 0
                //   ? '100%'
                //   : // '60%'
                //     '50%',
                // startingShape: 'flat',
                // endingShape: 'flat',
              },
              xaxis: {
                ...preState.options.xaxis,
                categories: filteredByProgram.label,
                // labels: {
                //   ...preState.options.xaxis.labels,
                //   formatter(value, timestamp, index) {
                //
                //     return value === 'Other Initiatives'
                //       ? 'hello'
                //       : value;
                //   },
                // },
              },
            },
          },
        },
      }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      filteredByProgramDefault,
      filteredByProgram,
    } = this.props.financialReducer;
    if (
      prevProps.financialReducer.filteredByProgram !==
      this.props.financialReducer.filteredByProgram
    ) {
      this.setState(preState => ({
        // height: 400,
        series: filteredByProgram.series,
        options: {
          ...preState.options,
          plotOptions: {
            ...preState.options.plotOptions,
            bar: {
              ...preState.options.plotOptions.bar,
              barHeight: '20%',
              columnWidth:
                this.props.checkedPartnerItems &&
                this.props.checkedPartnerItems.length === 0
                  ? '100%'
                  : '50%',
            },
          },
          colors: filteredByProgram.color,
          xaxis: {
            ...preState.options.xaxis,
            categories: filteredByProgram.label,
            //   labels: {
            //     ...preState.options.xaxis.labels,
            //     formatter(value, timestamp, index) {
            //
            //       return value === 'Other Initiatives'
            //         ? 'hello'
            //         : value;
            //     },
            //   },
          },
        },
      }));
      // }
      this.setState(preState => ({
        partnerChart: {
          series: filteredByProgram.series,
          label: filteredByProgram.label,
          colors: filteredByProgram.color,
          options: {
            ...preState.options,
            // chart: {
            //   id: 'basic-bar',
            //   stacked: true,
            // },
            // tooltip: {
            //   shared: true,
            //   followCursor: true,
            //   inverseOrder: true,
            // },
            plotOptions: {
              ...preState.options.plotOptions,
              bar: {
                ...preState.options.plotOptions.bar,
                columnWidth:
                  this.props.checkedPartnerItems &&
                  this.props.checkedPartnerItems.length === 0
                    ? '100%'
                    : // '60%'
                      '50%',
                // startingShape: 'flat',
                // endingShape: 'flat',
              },
            },
            legend: { show: true, fontSize: '10px' },
            // xaxis: {
            //   ...preState.options.xaxis,
            //   labels: {
            //     ...preState.options.xaxis.labels,
            //     formatter(value, timestamp, index) {
            //
            //       return value === 'Chhimek' ? 'hello' : value;
            //     },
            //   },
            // },
            tooltip: {
              // shared: true,
              followCursor: true,
              inverseOrder: true,
              x: {
                show: true,
                format: 'dd MMM',
                //   formatter(
                //     value,
                //     { series, seriesIndex, dataPointIndex, w },
                //   ) {
                //     return `${value} 1`;
                //   },
              },
              y: {
                // title: {
                //   formatter: (seriesName, i, j) => {
                //
                //
                //     return `hello ${seriesName}`;
                //   },
                // },
              },
            },
          },
        },
      }));
    }
    if (
      prevProps.financialReducer.filteredByProgramDefault !==
      this.props.financialReducer.filteredByProgramDefault
    ) {
      this.setState(preState => ({
        // isToggled: false,
        isBarChartClicked: false,
        programChart: {
          series: filteredByProgramDefault.series,
          label: filteredByProgramDefault.label,
          color: filteredByProgramDefault.color,
          options: {
            ...preState.options,
            plotOptions: {
              ...preState.options.plotOptions,
              bar: {
                ...preState.options.plotOptions.bar,
                // distributed: true,
                columnWidth:
                  this.props.checkedPartnerItems &&
                  this.props.checkedPartnerItems.length === 0
                    ? '50%'
                    : '15%',
              },
            },
            colors: filteredByProgramDefault.color,
            title: {
              // ...preState.programChart.options.title,
              text: '',
            },
            //   xaxis: {
            //     ...preState.options.xaxis,
            //     labels: {
            //       ...preState.options.xaxis.labels,
            //       formatter(value, timestamp, index) {
            //
            //         return value === 'Other Initiatives'
            //           ? 'hello'
            //           : value;
            //       },
            //     },
            //   },
          },
        },
      }));
    }
  }

  handleBarChartBackBtn = () => {
    this.props.handleBarChartReset();
    this.setState(prevState => ({
      // isBarChartClicked: !prevState.isBarChartClicked,
      // clickedPartnerName: '',
      programChart: {
        // series: [newSeries],
        ...prevState.programChart,

        options: {
          ...prevState.programChart.options,
          // plotOptions: {
          //   ...prevState.options.plotOptions,
          // },
          // // colors: prevState.chartData2.options.colors.allProgramColor,
          // xaxis: {
          // ...prevState.options.xaxis,
          // categories: multiLineLabel2,
          // },
          title: {
            ...prevState.programChart.options.title,
            text: '',
          },
        },
      },
    }));
  };

  // handleBarChartToggle = () => {
  //   this.setState(prevState => ({
  //     isToggled: !prevState.isToggled,
  //   }));
  // };

  render() {
    const {
      // height,
      series,
    } = this.state;
    const {
      DownloadIcon,
      ExpandIcon,
      downloadPng,
      handleModal,
      handleSelectedModal,
      activeModal,
      isToggled,
      isDownloading,
      isBarChartClicked,
      chartData2,
    } = this.props;
    const {
      financialReducer: { filteredByProgram },
    } = this.props;
    const { showRightSidebar } = this.props;

    const height = activeModal ? 500 : 400;

    const title = !isToggled
      ? 'Financial Literacy Beneficiaries by Partners'
      : 'Initiative-wise beneficiary breakdown';

    return (
      <>
        <div
          className="card-header"
          style={activeModal && { backgroundColor: '#fff' }}
        >
          {!activeModal && <h5>{title}</h5>}
          {!isDownloading && (
            <div className="header-icons">
              {!isBarChartClicked && (
                <div className="card-switcher">
                  <small>Single Count</small>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isToggled}
                      onChange={this.props.handleBarChartToggle}
                    />
                    <span className="slider" />
                  </label>
                  <small>Initiative Wise</small>
                </div>
              )}
              {/* {!isBarChartClicked && (
              <button
                type="button"
                onClick={this.handleBarChartToggle}
              >
                Toggle
              </button>
            )} */}
              {isBarChartClicked && (
                <button
                  id="chart-reset"
                  type="button"
                  onClick={this.handleBarChartBackBtn}
                  className="is-border common-button chart-reset"
                >
                  Reset
                </button>
              )}
              {!activeModal && (
                <>
                  <span
                    onClick={() => {
                      downloadPng('chart-horizontal', `${title}`);
                    }}
                    onKeyDown={() => {
                      downloadPng('chart-horizontal', `${title}`);
                    }}
                    className=""
                    role="tab"
                    tabIndex="0"
                  >
                    <img src={DownloadIcon} alt="open" />
                  </span>
                  <span
                    role="tab"
                    tabIndex="0"
                    onClick={() => {
                      handleModal();
                      handleSelectedModal('bar', `${title}`);
                    }}
                    onKeyDown={() => {
                      handleModal();
                      handleSelectedModal('bar', `${title}`);
                    }}
                  >
                    <img src={ExpandIcon} alt="open" />
                  </span>
                </>
              )}
            </div>
          )}
        </div>
        <div className="card-body">
          <div
            className="horizontal-chart"
            id="horizontal-chart"
            // style={{
            //   height: activeModal ? '512px' : '412px',
            //   // width: '1400px',
            // }}
          >
            {/* <label>Bar Area</label> */}
            {/* <div id="horizontal-chart"> */}
            {!isToggled &&
            !isBarChartClicked &&
            this.state.programChart.series ? (
              <ReactApexChart
                options={this.state.programChart.options}
                series={this.state.programChart.series}
                type="bar"
                height={
                  !activeModal
                    ? 400
                    : activeModal && window.innerWidth < 1400
                    ? 400
                    : 700
                }
                width={
                  activeModal && window.innerWidth < 1600
                    ? 1200
                    : activeModal && window.innerWidth > 1600
                    ? 1800
                    : showRightSidebar && window.innerWidth < 1600
                    ? 830
                    : showRightSidebar && window.innerWidth > 1600
                    ? 1130
                    : !showRightSidebar && window.innerWidth < 1600
                    ? 1050
                    : 1500
                }
              />
            ) : isToggled &&
              !isBarChartClicked &&
              this.state.partnerChart.series ? (
              <ReactApexChart
                options={this.state.partnerChart.options}
                series={this.state.partnerChart.series}
                type="bar"
                height={
                  !activeModal
                    ? 400
                    : activeModal && window.innerWidth < 1400
                    ? 400
                    : 700
                }
                width={
                  activeModal && window.innerWidth < 1600
                    ? 1200
                    : activeModal && window.innerWidth > 1600
                    ? 1800
                    : showRightSidebar && window.innerWidth < 1600
                    ? 830
                    : showRightSidebar && window.innerWidth > 1600
                    ? 1130
                    : !showRightSidebar && window.innerWidth < 1600
                    ? 1050
                    : 1500
                }
              />
            ) : (
              Object.entries(chartData2).length !== 0 && (
                <ReactApexChart
                  options={chartData2.options}
                  series={chartData2.series}
                  type="bar"
                  height={
                    !activeModal
                      ? 400
                      : activeModal && window.innerWidth < 1400
                      ? 400
                      : 700
                  }
                  width={
                    activeModal && window.innerWidth < 1600
                      ? 1200
                      : activeModal && window.innerWidth > 1600
                      ? 1800
                      : showRightSidebar && window.innerWidth < 1600
                      ? 830
                      : showRightSidebar && window.innerWidth > 1600
                      ? 1130
                      : !showRightSidebar && window.innerWidth < 1600
                      ? 1050
                      : 1500
                  }
                />
              )
            )}
          </div>
          {/* </div> */}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ financialReducer }) => ({
  financialReducer,
});
export default connect(mapStateToProps, {})(HorizontalChart);
