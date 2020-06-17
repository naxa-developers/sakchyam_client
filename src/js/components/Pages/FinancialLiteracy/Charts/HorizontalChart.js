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
      height: 200,
      partnerChart: {},
      programChart: {},
      chartData2: {},
      isBarChartClicked: false,
      isToggled: false,
    };
  }

  generateBarChartData = i => {
    const clickedPartner = this.state.options.xaxis.categories[
      i
    ].join(' ');
    const {
      financialReducer: { filteredByProgramDefault, financialData },
      selectedProgram,
    } = this.props;

    let filteredData = [];

    if (selectedProgram.length === 0) {
      filteredData = financialData.filter(
        item => item.partner_name === clickedPartner,
      );
    } else {
      filteredData = financialData.filter(
        item =>
          selectedProgram.includes(item.program_id) &&
          item.partner_name === clickedPartner,
      );
    }

    const multiLineLabel = [];
    const groupedObj = {};
    const allProgramColor = [];
    const allProgramData = [];

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

    // console.log(filteredData, 'fda');

    const label = filteredData.map(program => {
      return program.program_name;
    });
    // console.log(label, 'lanbel');
    const removedDuplicateLabel = [...new Set(label)];

    // console.log(removedDuplicateLabel, 'rlabel');

    removedDuplicateLabel.map(labelData => {
      return multiLineLabel.push(labelData.split(' '));
    });

    // console.log(multiLineLabel, 'multi');

    const result = [
      ...new Map(filteredData.map(x => [x.partner_id, x])).values(),
    ];

    // console.log(result, 'result');

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
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(groupedObj)) {
      // allPartnersLabel.push(key);
      // value.names.map(data => {
      allProgramData.push(value);
      // return true;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(groupedObj)) {
      allProgramColor.push(colorPicker(value.id));
    }

    allProgramData.sort((a, b) => b.data[0] - a.data[0]);

    // console.log(allProgramData[0].data[0], 'series');
    // console.log(multiLineLabel, 'label');
    // console.log(allProgramColor, 'color');

    this.setState(prevState => ({
      // height: 200,
      chartData2: {
        series: allProgramData,

        options: {
          colors: allProgramColor,
          xaxis: {
            categories: multiLineLabel,
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
            if (!this.state.isBarChartClicked) {
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
      legend: { show: false },
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
          offsetX: 10,
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
    const { filteredByProgram } = this.props.financialReducer;

    // console.log(filteredByProgram, 'filteredByProgram');
    if (this.props.activeModal) {
      if (
        filteredByProgram.series[0].data.length > 2
        // filteredByProgram.series.length > 10
      ) {
        this.setState(preState => ({
          height: 200,
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
          height: 800,
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
    }

    // new ApexCharts(
    //     document.querySelector('#horizontal-chart'),
    //     options,
    //   );
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
      if (
        filteredByProgram.series[0].data.length > 2
        // filteredByProgram.series.length > 10
      ) {
        this.setState(preState => ({
          height: 400,
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
          height: 400,
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
      this.setState({
        partnerChart: {
          series: filteredByProgram.series,
          label: filteredByProgram.label,
          color: filteredByProgram.color,
        },
      });
    }
    if (
      prevProps.financialReducer.filteredByProgramDefault !==
      this.props.financialReducer.filteredByProgramDefault
    ) {
      this.setState({
        programChart: {
          series: filteredByProgramDefault.series,
          label: filteredByProgramDefault.label,
          color: filteredByProgramDefault.color,
        },
      });
    }
  }

  handleBarChartBackBtn = () => {
    this.setState(prevState => ({
      isBarChartClicked: !prevState.isBarChartClicked,
    }));
  };

  handleBarChartToggle = () => {
    this.setState(prevState => ({
      isToggled: !prevState.isToggled,
    }));
  };

  render() {
    const {
      height,
      isToggled,
      isBarChartClicked,
      chartData2,
    } = this.state;
    const {
      DownloadIcon,
      ExpandIcon,
      downloadPng,
      handleModal,
      handleSelectedModal,
    } = this.props;
    const {
      financialReducer: { filteredByProgram },
    } = this.props;

    return (
      <>
        <div className="card-header">
          <h5>Beneficiary Reached Per Program by Partners</h5>
          <div className="header-icons">
            {!isBarChartClicked && (
              <button
                type="button"
                onClick={this.handleBarChartToggle}
              >
                Toggle
              </button>
            )}
            {isBarChartClicked && (
              <button
                type="button"
                onClick={this.handleBarChartBackBtn}
              >
                Back
              </button>
            )}

            <span
              onClick={() => {
                downloadPng('horizontal-chart');
              }}
              onKeyDown={() => {
                downloadPng('horizontal-chart');
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
                handleSelectedModal('bar');
              }}
              onKeyDown={() => {
                handleModal();
                handleSelectedModal('bar');
              }}
            >
              <img src={ExpandIcon} alt="open" />
            </span>
          </div>
        </div>
        <div className="card-body">
          <div
            className="horizontal-chart"
            style={{
              height: '400px',
            }}
          >
            <div id="horizontal-chart">
              {!isToggled &&
              !isBarChartClicked &&
              filteredByProgram.series &&
              filteredByProgram.series[0] ? (
                <ReactApexChart
                  options={this.state.options}
                  series={this.state.series}
                  type="bar"
                  height={height}
                />
              ) : isToggled && !isBarChartClicked ? (
                <ReactApexChart
                  options={this.state.options}
                  series={this.state.programChart.series}
                  type="bar"
                  height={height}
                />
              ) : (
                Object.entries(chartData2).length !== 0 && (
                  <ReactApexChart
                    options={chartData2.options}
                    series={chartData2.series}
                    type="bar"
                    height={height}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ financialReducer }) => ({
  financialReducer,
});
export default connect(mapStateToProps, {})(HorizontalChart);
