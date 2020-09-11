/* eslint-disable camelcase */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import {
  getProductProcessList,
  filterBarPopup,
} from '../../../../../actions/productProcess.actions';

function convertLabelName(name) {
  const nameArr = name.split(' ');
  let firstElement;
  let rest;
  if (nameArr.length < 3) {
    // eslint-disable-next-line prefer-destructuring
    firstElement = nameArr[0];
    rest = name
      .split(' ')
      .slice(1)
      .join(' ');
  } else {
    firstElement = `${nameArr[0]} ${nameArr[1]}`;
    rest = name
      .split(' ')
      .slice(2)
      .join(' ');
  }
  const newName = [firstElement, rest];
  return newName;
}

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {},
      isBarChartClicked: false,
      chartData2: {},
      firstClickedState: '',
      secondClickedState: '',
    };
  }

  setFirstClickedState = clicked => {
    this.setState({
      firstClickedState: clicked,
    });
  };

  setSecondClickedState = clicked => {
    this.setState({
      secondClickedState: clicked,
    });
  };

  generateBarChartData = id => {
    const clickedInnovation = this.state.options.xaxis.categories[id];
    const {
      productProcessReducer: { allData, filteredData },
    } = this.props;

    const data = filteredData.length === 0 ? allData : filteredData;

    const partnerType = [
      ...new Set(data.map(item => item.partner_type)),
    ];
    const arr = [];

    function getCount(partner_type) {
      const arr1 = data
        .filter(
          item =>
            item.partner_type === partner_type &&
            item.innovation_area === clickedInnovation,
        )
        .map(item => item.product_name);
      const count = [...new Set(arr1)].length;
      return count;
    }

    partnerType.forEach((i, index) => {
      arr[index] = getCount(i);
    });

    const categories = partnerType.map(item =>
      convertLabelName(item),
    );

    this.setState(prevState => ({
      chartData2: {
        series: [{ data: arr }],

        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            // categories: partnerType,
            categories,
          },
        },
      },
      isBarChartClicked: !prevState.isBarChartClicked,
    }));
  };

  plotChart = () => {
    const that = this;
    const options = {
      colors: ['#E11D3F'],
      chart: {
        toolbar: { show: false },
        type: 'bar',
        events: {
          click: function(
            event,
            chartContext,
            { seriesIndex, dataPointIndex, config },
          ) {
            // console.log(seriesIndex, 'seriesIndex');
            // console.log(dataPointIndex, 'dataPointIndex');
            // console.log(config, 'config');
            if (
              !this.state.isBarChartClicked &&
              dataPointIndex >= 0
            ) {
              const selectedData =
                config.xaxis.categories[dataPointIndex];
              this.generateBarChartData(dataPointIndex);
              this.setFirstClickedState(selectedData);
            }
          }.bind(this),
        },
      },
      plotOptions: {
        bar: {
          // horizontal: false,
          columnWidth: '40%',
          startingShape: 'flat',
          endingShape: 'rounded',
        },
      },
      legend: {
        show: true,
        position: 'bottom',
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
        labels: {
          trim: true,
          hideOverlappingLabels: false,
        },
      },
      yaxis: {
        title: {
          text: 'No. of Products',
          rotate: 90,
          offsetX: 0,
          offsetY: 0,
          style: {
            // color: undefined,
            fontSize: '12px',
            fontFamily: 'Avenir Book, sans-serif',
            fontWeight: 500,
            cssClass: 'apexcharts-yaxis-title',
          },
        },
        axisBorder: {
          // show: !this.props.activeModal ? true : false,
          show: true,
        },
        axisTicks: {
          // show: !this.props.activeModal ? true : false,
          show: true,
        },
        labels: {
          minWidth: 45,
          maxWidth: 300,
          formatter(value) {
            if (value < 2 && value !== 0) {
              return value.toFixed(1);
            }
            if (value === 0.0) {
              return 0;
            }
            return value;
          },
        },
      },
      grid: {
        show: false,
      },
      // tooltip: {
      //   marker: {
      //     show: false,
      //   },
      //   y: {
      //     formatter: undefined,
      //     title: {
      //       formatter: seriesName => `s${seriesName}`,
      //     },
      //   },
      // },
      tooltip: {
        marker: {
          show: false,
        },
        custom({ series, seriesIndex, dataPointIndex, w }) {
          const { firstClickedState } = that.state;
          const {
            hoveredPopupData,
          } = that.props.productProcessReducer;
          const hoveredText =
            w.config.xaxis.categories[dataPointIndex];
          console.log(hoveredText, 'hoveredText');
          const filteredText = `${
            hoveredText[1] && hoveredText[1] !== ''
              ? `${hoveredText[0]} ${hoveredText[1]}`
              : hoveredText[0]
          }`;
          that.props.filterBarPopup(firstClickedState, filteredText);
          const partnerList = hoveredPopupData
            .map(data => {
              return `<li><b>${data.partner_name}</b><span>${data.count}</span></li>`;
            })
            .join('');
          return ` <div
          class="apexcharts-tooltip-title"
          style="font-family: Helvetica, Arial, sans-serif; font-size: 12px"
        >
          ${hoveredText}
        </div>
        <div
          class="apexcharts-tooltip-series-group apexcharts-active product-bartooltip"
          style="display: block"
        >
          <span
            class="apexcharts-tooltip-marker"
            style="background-color: rgb(225, 29, 63)"
          ></span>
          
              <h5 class="apexcharts-tooltip-text-label">${
                w.config.yaxis[0].title.text
              }:<span class="apexcharts-tooltip-text-value">${
            series[seriesIndex][dataPointIndex]
          }</span> </h5
              >
              ${
                partnerList.length > 0
                  ? `<h5
                    className="apexcharts-tooltip-text-label"
                    style="justify-content: center"
                  >
                    Partner List
                  </h5>`
                  : ''
              }
              <ul>
                ${partnerList}
              </ul>
          
          </div>`;
        },
      },
      //   <div class="partner-list-apexchart">
      //   <ul>
      //     <li>Test</li>
      //     <li>Test2</li>
      //   </ul>
      // </div>
      // tooltip: {
      //   fixed: {
      //     enabled: true,
      //     position: 'topRight',
      //     offsetX: 0,
      //     offsetY: 0,
      //   },
      // },
    };

    this.setState({ options });
  };

  updateChartData = () => {
    const {
      productProcessReducer: { barChartData },
    } = this.props;

    this.setState(preState => ({
      series: barChartData.series,
      options: {
        ...preState.options,
        xaxis: {
          ...preState.options.xaxis,
          categories: barChartData.categories,
        },
      },
      isBarChartClicked: false,
    }));
  };

  componentDidMount() {
    this.plotChart();

    const { activeModal } = this.props;
    if (activeModal) this.updateChartData();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.productProcessReducer.barChartData !==
      prevProps.productProcessReducer.barChartData
    ) {
      this.updateChartData();
    }
  }

  handleBarChartBackBtn = () => {
    this.setState(prevState => ({
      isBarChartClicked: !prevState.isBarChartClicked,
      firstClickedState: '',
    }));
  };

  render() {
    const {
      options,
      series,
      isBarChartClicked,
      chartData2,
      firstClickedState,
      secondClickedState,
    } = this.state;

    const {
      showRightSidebar,
      activeModal,
      barTitle,
      isDownloading,
      DownloadIcon,
      ExpandIcon,
      downloadPng,
      handleModal,
      handleSelectedModal,
    } = this.props;

    let height = 425;
    let width = 425;

    if (activeModal) {
      if (window.innerWidth > 1600) {
        height = 900;
        // width = 1500;
      } else if (window.innerWidth < 1600) {
        height = 570;
        // width = 1000;
        // } else if (window.innerWidth < 1600) {
        //   height = 570;
        //   width = 1000;
      }
    } else {
      // height = 425;
      height = 434;
      // width = 450;
    }

    if (!activeModal) {
      if (showRightSidebar && window.innerWidth < 1600) width = 780;
      else if (showRightSidebar && window.innerWidth > 1600)
        width = 1100;
      else if (!showRightSidebar && window.innerWidth < 1600)
        width = 1100;
      else width = 1400;
    } else {
      width = 1400;
    }

    return (
      <>
        <div
          className="card-header"
          style={activeModal && { backgroundColor: '#fff' }}
        >
          {!activeModal && <h5>{barTitle}</h5>}
          {!isDownloading && (
            <div className="header-icons">
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
                    className=""
                    onClick={() => {
                      downloadPng('bar-chart', `${barTitle}`);
                    }}
                    onKeyDown={() => {
                      downloadPng('bar-chart', `${barTitle}`);
                    }}
                    role="tab"
                    tabIndex="0"
                  >
                    <img src={DownloadIcon} alt="open" />
                  </span>
                  <span
                    className=""
                    role="tab"
                    tabIndex="0"
                    onClick={() => {
                      handleModal();
                      handleSelectedModal('bar', `${barTitle}`);
                    }}
                    onKeyDown={() => {
                      handleModal();
                      handleSelectedModal('bar', `${barTitle}`);
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
          {/* <div id="chart"> */}
          {!isBarChartClicked ? (
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={
                !activeModal && window.innerHeight < 1400
                  ? 420
                  : !activeModal && window.innerHeight > 1600
                  ? 700
                  : activeModal && window.innerWidth < 1400
                  ? 420
                  : 700
              }
              // width={
              //   activeModal && window.innerWidth < 1600
              //     ? 1200
              //     : activeModal && window.innerWidth > 1600
              //     ? 1700
              //     : showRightSidebar && window.innerWidth < 1600
              //     ? 820
              //     : showRightSidebar && window.innerWidth > 1600
              //     ? 1130
              //     : !showRightSidebar && window.innerWidth < 1600
              //     ? 1050
              //     : 1500
              // }
              width={
                activeModal && window.innerWidth < 1600
                  ? 1200
                  : activeModal && window.innerWidth > 1600
                  ? 1800
                  : showRightSidebar && window.innerWidth < 1600
                  ? 750
                  : showRightSidebar && window.innerWidth > 1600
                  ? 1100
                  : !showRightSidebar && window.innerWidth < 1600
                  ? 950
                  : 1400
              }
            />
          ) : (
            <ReactApexChart
              options={chartData2.options}
              series={chartData2.series}
              type="bar"
              height={
                !activeModal && window.innerHeight < 1400
                  ? 420
                  : !activeModal && window.innerHeight > 1600
                  ? 700
                  : activeModal && window.innerWidth < 1400
                  ? 420
                  : 700
              }
              // width={
              //   activeModal && window.innerWidth < 1600
              //     ? 1200
              //     : activeModal && window.innerWidth > 1600
              //     ? 1800
              //     : showRightSidebar && window.innerWidth < 1600
              //     ? 820
              //     : showRightSidebar && window.innerWidth > 1600
              //     ? 1200
              //     : !showRightSidebar && window.innerWidth < 1600
              //     ? 1050
              //     : 1500
              // }

              width={
                activeModal && window.innerWidth < 1600
                  ? 1200
                  : activeModal && window.innerWidth > 1600
                  ? 1800
                  : showRightSidebar && window.innerWidth < 1600
                  ? 750
                  : showRightSidebar && window.innerWidth > 1600
                  ? 1100
                  : !showRightSidebar && window.innerWidth < 1600
                  ? 950
                  : 1400
              }
            />
          )}
          {/* </div> */}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ productProcessReducer }) => ({
  productProcessReducer,
});

export default connect(mapStateToProps, {
  getProductProcessList,
  filterBarPopup,
})(BarChart);
