/* eslint-disable camelcase */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { getProductProcessList } from '../../../../../actions/productProcess.actions';

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
    };
  }

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
            if (
              !this.state.isBarChartClicked &&
              dataPointIndex >= 0
            ) {
              this.generateBarChartData(dataPointIndex);
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
          formatter(value) {
            return value;
          },
        },
      },
      grid: {
        show: false,
      },
      tooltip: {
        marker: {
          show: false,
        },
      },

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
    }));
  };

  render() {
    const {
      options,
      series,
      isBarChartClicked,
      chartData2,
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
              // height={!activeModal ? 450 : 685}
              width={width}
              // width={
              //   showRightSidebar && window.innerWidth < 1600
              //     ? 780
              //     : showRightSidebar && window.innerWidth > 1600
              //     ? 1100
              //     : !showRightSidebar && window.innerWidth < 1600
              //     ? 1100
              //     : 1400
              // }
              height={height}
              // width={width}
            />
          ) : (
            <ReactApexChart
              options={chartData2.options}
              series={chartData2.series}
              type="bar"
              width={width}
              height={height}
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
})(BarChart);
