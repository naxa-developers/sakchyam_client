/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import SwitchComponent from '../../MiddleChartSection/SwitchComponent';
import { getShortNumbers } from '../../../../common/utilFunctions';
// import convert from '../../../../utils/convertNumbers';

function convert(num) {
  if (num > 999 && num < 1000000) {
    return `${num / 1000000}M`; // convert to K for number from > 1000 < 1 million
  }
  if (num > 1000000) {
    return `${num / 1000000}M`; // convert to M for number from > 1 million
  }
  if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
  return num;
}

function getBarChartLabels(data, name) {
  return [...new Set(data.map(item => item[name]))];
}

function getCount(data, name) {
  return data.reduce((sum, item) => sum + item[name], 0);
}

const colors = {
  red: '#E11D3F',
  yellow: '#FFCD00',
};
class BarChartInsurance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      series1: [],
      series2: [],
      options: {},
      chartData1: {},
      chartData2: { series1: [], series2: [], options: {} },
      chartData3: {},
      isBarChartClicked: false,
    };
  }

  generateBarChartData2 = i => {
    const clickedInnovation = this.state.options.labels[i];
    const { insuranceData } = this.props;

    const data = insuranceData.filter(
      item => item.partner_name === clickedInnovation,
    );
    const labels = getBarChartLabels(data, 'product');
    const columnData = [];
    const lineData = [];
    labels.forEach(item => {
      const filteredData = data.filter(x => x.product === item);
      const amountOfInsurance = getCount(
        filteredData,
        'amount_of_insurance',
      );
      const amountOfSumInsuranced = getCount(
        filteredData,
        'amount_of_sum_insuranced',
      );
      columnData.push(amountOfInsurance);
      lineData.push(amountOfSumInsuranced);
    });

    const series1 = [];
    const series2 = [];

    series1.push({
      name: 'Amount of Insurance',
      data: columnData,
    });
    series2.push({
      name: 'Amount of Sum Insuranced',
      data: lineData,
    });

    this.setState(prevState => ({
      chartData2: {
        series1,
        series2,
        options: {
          ...prevState.options,
          labels,
        },
      },
      isBarChartClicked: true,
    }));
  };

  // generateBarChartData1 = i => {
  //   const clickedPartner = this.state.chartData1.options.labels[i];

  //   const { insuranceData } = this.props;

  //   const data = insuranceData.filter(
  //     item => item.partner_name === clickedPartner,
  //   );

  //   const labels = getBarChartLabels(data, 'innovation');

  //   const columnData = [];
  //   const lineData = [];

  //   labels.forEach(item => {
  //     const filteredData = data.filter(x => x.innovation === item);
  //     const amountOfInsurance = getCount(
  //       filteredData,
  //       'amount_of_insurance',
  //     );
  //     const amountOfSumInsuranced = getCount(
  //       filteredData,
  //       'amount_of_sum_insuranced',
  //     );
  //     columnData.push(amountOfInsurance);
  //     lineData.push(amountOfSumInsuranced);
  //   });

  //   const series = [];
  //   series.push({
  //     name: 'Amount of Insurance',
  //     type: 'column',
  //     data: columnData,
  //   });
  //   series.push({
  //     name: 'Amount of Sum Insuranced',
  //     type: 'line',
  //     data: lineData,
  //   });

  //   this.setState(prevState => ({
  //     // options,
  //     chartData2: {
  //       series,
  //       options: {
  //         ...prevState.options,
  //         labels,
  //       },
  //     },
  //     barChartClickIndex: 1,
  //   }));
  // };

  plotChart = () => {
    const that = this;

    const { barChartClickIndex } = that.state;

    const options = {
      colors: [colors.red],
      chart: {
        height: 350,
        type: 'bar',
        toolbar: { show: false },
        events: {
          click(
            event,
            chartContext,
            { seriesIndex, dataPointIndex, config },
          ) {
            if (dataPointIndex >= 0) {
              //   if (that.state.barChartClickIndex === 0) {
              //     that.generateBarChartData1(dataPointIndex);
              //   } else if (that.state.barChartClickIndex === 1) {
              //     that.generateBarChartData2(dataPointIndex);
              //   }
              // }
              // if (that.state.isBarChartClicked) {
              //   that.generateBarChartData1(dataPointIndex);
              // }
              if (!that.state.isBarChartClicked) {
                that.generateBarChartData2(dataPointIndex);
              }
            }
          },
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '15%',
          // startingShape: 'flat',
          // endingShape: 'rounded',
        },
      },
      // stroke: {
      //   width: [0, 4],
      //   show: true,
      //   curve: 'smooth',
      //   lineCap: 'butt',
      //   colors: undefined,
      //   // width: 1,
      //   dashArray: 0,
      // },
      dataLabels: {
        enabled: false,
        // enabledOnSeries: [1],
      },
      // labels: [],
      grid: { show: false },
      xaxis: {
        categories: [],
        labels: {
          trim: true,
          hideOverlappingLabels: false,
        },
      },
      yaxis: {
        title: {
          text:
            // formatter: val => 'hello',
            that.props.selectedTabBar === 'insurance-premium'
              ? 'Amount of Insurance (NPR)'
              : 'Amount of Sum Insuranced',
        },
        axisTicks: { show: true },
        axisBorder: { show: true },
        labels: {
          show: true,
          offsetX: 0,
          minWidth: 65,
          maxWidth: 300,
          // formatter: val => getShortNumbers(val),
          formatter: val => convert(val),
          // style: {
          //   colors: [colors.red],
          //   fontSize: '9px',
          //   fontFamily: 'Helvetica, Arial, sans-serif',
          //   fontWeight: 400,
          //   cssClass: 'apexcharts-yaxis-label',
          // },
        },
      },
      // {
      //   opposite: true,
      //   title: {
      //     text: 'Amount of Sum Insuranced',
      //   },
      //   axisTicks: { show: true, color: colors.yellow },
      //   axisBorder: { show: true, color: colors.yellow },
      //   labels: {
      //     // style: { colors: colors.yellow },
      //     show: true,
      //     offsetX: 0,
      //     // formatter: val => getShortNumbers(val),
      //     formatter: val => convert(val),
      //   },
      markers: {
        size: 7,
        strokeWidth: 0,
        // colors: colors.yellow,
      },
      legend: {
        markers: {
          width: 12,
          height: 12,
          radius: 0,
          offsetX: 0,
          offsetY: 0,
        },
      },
      // tooltip: {
      //   onDatasetHover: {
      //     highlightDataSeries: true,
      //   },
      // },
    };

    this.setState({
      options,
    });
  };

  componentDidMount() {
    this.plotChart();

    const { activeModal, insuranceData } = this.props;
    if (activeModal) this.setInsuranceData(insuranceData);
  }

  componentDidUpdate(prevProps, prevState) {
    const { insuranceData, selectedTabBar } = this.props;

    if (insuranceData !== prevProps.insuranceData) {
      this.setInsuranceData(insuranceData);
    }
    if (selectedTabBar !== prevProps.selectedTabBar) {
      // this.plotChart();
      // this.setInsuranceData(insuranceData);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(prev => ({
        options: {
          ...prev.options,
          yaxis: {
            ...prev.options.yaxis,
            title: {
              ...prev.options.yaxis.title,
              text:
                selectedTabBar === 'insurance-premium'
                  ? 'Amount of Insurance (NPR)'
                  : 'Amount of Sum Insuranced',
            },
          },
        },
      }));
    }
  }

  setInsuranceData = array => {
    const partnerList = array.map(item => item.partner_name);
    const uniquePartners = Array.from(new Set(partnerList));
    const Array1 = [];
    const Array2 = [];

    uniquePartners.forEach(partner => {
      let sum = 0;
      array.forEach(element => {
        if (partner === element.partner_name) {
          sum += Math.round(element.amount_of_insurance);
        }
      });
      Array1.push({ partner, sum });
    });

    uniquePartners.forEach(partner => {
      let sum = 0;
      array.forEach(element => {
        if (partner === element.partner_name) {
          sum += Math.round(element.amount_of_sum_insuranced);
        }
      });
      Array2.push({ partner, sum });
    });

    const labels = Array1.map(partner => partner.partner);
    const amountInsurance = Array1.map(partner => partner.sum);
    const sumInsuranced = Array2.map(partner => partner.sum);

    const series1 = [];
    const series2 = [];

    series1.push({
      name: 'Amount of Insurance (NPR)',
      data: amountInsurance,
    });
    series2.push({
      name: 'Amount of Sum Insuranced',
      data: sumInsuranced,
    });

    const options = {
      // colors: [colors.red],
      chart: {
        height: 450,
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [0, 4],
      },
      title: {
        text: undefined,
      },
      dataLabels: {
        enabled: false,
        enabledOnSeries: [1],
      },
      labels,
      // xaxis: {
      //   type: 'string',
      // },
      // yaxis: [
      //   {
      //     title: {
      //       text: 'Amount of Insurance',
      //     },
      //     labels: {
      //       show: true,
      //       offsetX: 0,
      //       formatter: val => getShortNumbers(val),
      //     },
      //   },
      //   {
      //     opposite: true,
      //     title: {
      //       text: 'Amount of Sum Insuranced',
      //     },
      //     labels: {
      //       show: true,
      //       offsetX: -1,
      //       formatter: val => getShortNumbers(val),
      //     },
      //   },
      // ],
    };
    this.setState(prev => ({
      series1,
      series2,
      options: { ...prev.options, labels },
      data: array,
      chartData1: { series1, options: { ...prev.options } },
      chartData2: { options },
      barChartClickIndex: 0,
    }));
  };

  handleBarChartBackBtn = () => {
    this.setState(prev => ({
      isBarChartClicked: !prev.isBarChartClicked,
    }));
  };

  render() {
    const {
      barChartClickIndex,
      isBarChartClicked,
      chartData1,
      chartData2,
      chartData3,
    } = this.state;

    const {
      DownloadIcon,
      ExpandIcon,
      downloadPng,
      handleModal,
      handleSelectedModal,
      activeModal,
      barTitle,
      isDownloading,
      isBarChartToggled,
      selectedTabBar,
    } = this.props;

    return (
      <>
        <div
          className="card-header"
          // style={activeModal && { backgroundColor: '#fff' }}
          style={{ backgroundColor: activeModal ? '#fff' : '' }}
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
          <SwitchComponent
            selectedTab={selectedTabBar}
            setSelectedTab={this.props.setSelectedTabBar}
          />
          {!isBarChartClicked ? (
            <ReactApexChart
              options={this.state.options}
              series={
                // !isBarChartToggled
                selectedTabBar === 'insurance-premium'
                  ? this.state.series1
                  : this.state.series2
              }
              type="bar"
              height={!activeModal ? 400 : 550}
            />
          ) : (
            <ReactApexChart
              options={chartData2.options}
              series={
                selectedTabBar === 'insurance-premium'
                  ? chartData2.series1
                  : chartData2.series2
              }
              type="bar"
              height={!activeModal ? 400 : 550}
            />
          )}
        </div>
      </>
    );
  }
}

export default BarChartInsurance;
