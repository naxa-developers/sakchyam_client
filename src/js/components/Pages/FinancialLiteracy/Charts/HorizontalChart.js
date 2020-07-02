/* eslint-disable react/jsx-indent */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { connect } from 'react-redux';
// color: #c21c2e;
// color: #f36c00;
// color: #40a8be;
// color: #de2693;

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

function numberWithCommas(x) {
  if (x !== null) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return x;
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
      chartData2: {},
      isBarChartClicked: false,
      isToggled: false,
      clickedPartnerName: '',
    };
  }

  generateBarChartData = i => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const clickedPartner = this.state.options.xaxis.categories[i];
    // .join(' ');
    const {
      financialReducer: { filteredByProgramDefault, financialData },
      selectedProgram,
    } = this.props;

    this.setState({ clickedPartnerName: clickedPartner });

    let filteredData = [];

    const exception = [
      'Kisan Microfinance',
      'Kisan Cooperative',
      'Mahila Samudayik',
      'Mahila Sahayatra',
    ];

    if (selectedProgram.length === 0) {
      filteredData = financialData.filter(item => {
        if (
          Array.isArray(clickedPartner) &&
          exception.includes(clickedPartner.join(' '))
        ) {
          return (
            item.partner_name
              .split(' ')
              .slice(0, 2)
              .join(' ') === clickedPartner.join(' ')
          );
        }
        return (
          item.partner_name.substr(
            0,
            item.partner_name.indexOf(' '),
          ) === clickedPartner
        );
      });
    } else {
      filteredData = financialData.filter(item => {
        if (selectedProgram.includes(item.program_id)) {
          if (
            Array.isArray(clickedPartner) &&
            exception.includes(clickedPartner.join(' '))
          ) {
            return (
              item.partner_name
                .split(' ')
                .slice(0, 2)
                .join(' ') === clickedPartner.join(' ')
            );
          }
          return (
            item.partner_name.substr(
              0,
              item.partner_name.indexOf(' '),
            ) === clickedPartner
          );
        }
        return false;
      });
    }

    filteredData.sort((a, b) => b.value - a.value);

    const arr = [];
    const categories = [];
    const allProgramColor = [];
    filteredData.map(item => {
      arr.push(item.value);
      categories.push(item.program_name);
      allProgramColor.push(colorPicker(item.program_id));
      return true;
    });

    this.setState(prevState => ({
      // height: 200,
      chartData2: {
        series: [{ data: arr }],

        options: {
          ...prevState.options,
          plotOptions: {
            ...prevState.options.plotOptions,
            bar: {
              ...prevState.options.plotOptions.bar,
              distributed: true,
              // barHeight: '1%',
              columnWidth: '15%',
            },
          },
          colors: allProgramColor,
          xaxis: {
            ...prevState.options.xaxis,
            categories,
          },
          title: {
            text: prevState.clickedPartnerName,
            floating: true,
            offsetY: 0,
            align: 'center',
            style: {
              color: '#444',
              fontFamily: 'Avenir Book',
              // fontSize: '17px',
            },
          },
        },
      },
      isBarChartClicked: !prevState.isBarChartClicked,
    }));
  };

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
              !this.state.isBarChartClicked &&
              !this.state.isToggled
            ) {
              if (dataPointIndex >= 0)
                this.generateBarChartData(dataPointIndex);
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
        // labels: {
        //   show: true,
        //   style: {
        //     fontSize: '2px',
        //   },
        // },
        type: 'category',
        categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
        labels: {
          offsetY: 0,
          style: {
            fontSize: '10px',
          },
        },
      },
      yaxis: {
        // tooltip: {
        //   enabled: true,
        // },
        offsetY: 0,
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
        },
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
      columnWidth = '60%';
    } else {
      columnWidth = '60%';
    }

    let partnerWidth = '100%';
    if (activeModal) {
      partnerWidth = '90%';
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
            },
          },
        }));
      }
      this.setState(preState => ({
        isToggled: false,
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
      // if (
      //   filteredByProgram.series[0].data.length > 2
      //   // filteredByProgram.series.length > 10
      // ) {
      //   this.setState(preState => ({
      //     height: 400,
      //     series: filteredByProgram.series,
      //     options: {
      //       ...preState.options,
      //       plotOptions: {
      //         ...preState.options.plotOptions,
      //         bar: {
      //           ...preState.options.plotOptions.bar,
      //           barHeight: '80%',
      //           columnWidth:
      //             this.props.checkedPartnerItems &&
      //             this.props.checkedPartnerItems.length < 2
      //               ? '100%'
      //               : '15%',
      //         },
      //       },
      //       colors: filteredByProgram.color,
      //       xaxis: {
      //         ...preState.options.xaxis,
      //         categories: filteredByProgram.label,
      //       },
      //     },
      //   }));
      // } else {
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
                    ? '60%'
                    : '15%',
              },
            },
            colors: filteredByProgramDefault.color,
            title: {
              // ...preState.programChart.options.title,
              text: '',
            },
          },
        },
      }));
    }
  }

  handleBarChartBackBtn = () => {
    this.setState(prevState => ({
      isBarChartClicked: !prevState.isBarChartClicked,
      clickedPartnerName: '',
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

  handleBarChartToggle = () => {
    this.setState(prevState => ({
      isToggled: !prevState.isToggled,
    }));
  };

  render() {
    const {
      // height,
      isToggled,
      isBarChartClicked,
      chartData2,
      series,
    } = this.state;
    const {
      DownloadIcon,
      ExpandIcon,
      downloadPng,
      handleModal,
      handleSelectedModal,
      activeModal,
    } = this.props;
    const {
      financialReducer: { filteredByProgram },
    } = this.props;
    const { showRightSidebar } = this.props;

    const height = activeModal ? 500 : 400;
    return (
      <>
        <div
          className="card-header"
          style={activeModal && { backgroundColor: '#fff' }}
        >
          {!activeModal && (
            <h5>Beneficiary Reached Per Program by Partners</h5>
          )}
          <div className="header-icons">
            {!isBarChartClicked && (
              <div className="card-switcher">
                <small>Single Count</small>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isToggled}
                    onChange={this.handleBarChartToggle}
                  />
                  <span className="slider" />
                </label>
                <small>Program Wise</small>
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
                className="is-border common-button"
              >
                Reset
              </button>
            )}
            {!activeModal && (
              <>
                <span
                  onClick={() => {
                    downloadPng(
                      'horizontal-chart',
                      'Beneficiary Reached Per Program by Partners',
                    );
                  }}
                  onKeyDown={() => {
                    downloadPng(
                      'horizontal-chart',
                      'Beneficiary Reached Per Program by Partners',
                    );
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
                    handleSelectedModal(
                      'bar',
                      'Beneficiary Reached Per Program by Partners',
                    );
                  }}
                  onKeyDown={() => {
                    handleModal();
                    handleSelectedModal('bar');
                  }}
                >
                  <img src={ExpandIcon} alt="open" />
                </span>
              </>
            )}
          </div>
        </div>
        <div className="card-body">
          <div
            className="horizontal-chart"
            id="horizontal-chart"
            style={{
              height: activeModal ? '512px' : '412px',
              // width: '1400px',
            }}
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
                height={height}
                width={
                  activeModal && window.innerWidth < 1600
                    ? 1400
                    : activeModal && window.innerWidth > 1600
                    ? 1750
                    : showRightSidebar && window.innerWidth < 1600
                    ? 780
                    : showRightSidebar && window.innerWidth > 1600
                    ? 1100
                    : !showRightSidebar && window.innerWidth < 1600
                    ? 1100
                    : 1400
                }
              />
            ) : isToggled &&
              !isBarChartClicked &&
              this.state.partnerChart.series ? (
              <ReactApexChart
                options={this.state.partnerChart.options}
                series={this.state.partnerChart.series}
                type="bar"
                height={height}
                width={
                  activeModal && window.innerWidth < 1600
                    ? 1400
                    : activeModal && window.innerWidth > 1600
                    ? 1750
                    : showRightSidebar && window.innerWidth < 1600
                    ? 780
                    : showRightSidebar && window.innerWidth > 1600
                    ? 1100
                    : !showRightSidebar && window.innerWidth < 1600
                    ? 1100
                    : 1400
                }
              />
            ) : (
              Object.entries(chartData2).length !== 0 && (
                <ReactApexChart
                  options={chartData2.options}
                  series={chartData2.series}
                  type="bar"
                  height={height}
                  width={
                    activeModal && window.innerWidth < 1600
                      ? 1400
                      : activeModal && window.innerWidth > 1600
                      ? 1750
                      : showRightSidebar && window.innerWidth < 1600
                      ? 780
                      : showRightSidebar && window.innerWidth > 1600
                      ? 1100
                      : !showRightSidebar && window.innerWidth < 1600
                      ? 1100
                      : 1400
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
