/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getShortNumbers } from '../../../../common/utilFunctions';

function getBarChartLabels(data, name) {
  return [...new Set(data.map(item => item[name]))];
}

function getCount(data, name) {
  return data.reduce((sum, item) => sum + item[name], 0);
}

class BarChartInsurance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      series: [],
      options: {},
      chartData1: {},
      chartData2: {},
      chartData3: {},
      barChartClickIndex: 0,
    };
  }

  generateBarChartData2 = i => {
    const clickedInnovation = this.state.chartData2.options.labels[i];
    const { insuranceData } = this.props;

    const data = insuranceData.filter(
      item => item.innovation === clickedInnovation,
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

    const series = [];
    series.push({
      name: 'Amount of Insurance',
      type: 'column',
      data: columnData,
    });
    series.push({
      name: 'Amount of Sum Insuranced',
      type: 'line',
      data: lineData,
    });
    this.setState(prevState => ({
      chartData3: {
        series,
        options: {
          ...prevState.options,
          labels,
        },
      },
      barChartClickIndex: 2,
    }));
  };

  generateBarChartData1 = i => {
    const clickedPartner = this.state.chartData1.options.labels[i];

    const { insuranceData } = this.props;

    const data = insuranceData.filter(
      item => item.partner_name === clickedPartner,
    );

    const labels = getBarChartLabels(data, 'innovation');

    const columnData = [];
    const lineData = [];

    labels.forEach(item => {
      const filteredData = data.filter(x => x.innovation === item);
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

    const series = [];
    series.push({
      name: 'Amount of Insurance',
      type: 'column',
      data: columnData,
    });
    series.push({
      name: 'Amount of Sum Insuranced',
      type: 'line',
      data: lineData,
    });

    this.setState(prevState => ({
      // options,
      chartData2: {
        series,
        options: {
          ...prevState.options,
          labels,
        },
      },
      barChartClickIndex: 1,
    }));
  };

  plotChart = () => {
    const that = this;

    const { barChartClickIndex } = that.state;

    const options = {
      colors: ['#E11D3F', '#FFCD00'],
      chart: {
        height: 350,
        type: 'line',
        toolbar: { show: false },
        events: {
          click(
            event,
            chartContext,
            { seriesIndex, dataPointIndex, config },
          ) {
            if (dataPointIndex >= 0) {
              if (that.state.barChartClickIndex === 0) {
                that.generateBarChartData1(dataPointIndex);
              } else if (that.state.barChartClickIndex === 1) {
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
      stroke: {
        width: [0, 4],
      },
      dataLabels: {
        enabled: false,
        enabledOnSeries: [1],
      },
      // labels: [],
      grid: { show: false },
      yaxis: [
        {
          title: {
            text: 'Amount of Insurance',
          },
          axisTicks: { show: true, color: '#E11D3F' },
          axisBorder: { show: true, color: '#E11D3F' },
          labels: {
            show: true,
            offsetX: 0,
            formatter: val => getShortNumbers(val),
          },
        },
        {
          opposite: true,
          title: {
            text: 'Amount of Sum Insuranced',
          },
          axisTicks: { show: true, color: '#FFCD00' },
          axisBorder: { show: true, color: '#FFCD00' },
          labels: {
            show: true,
            offsetX: -1,
            formatter: val => getShortNumbers(val),
          },
        },
      ],
    };

    this.setState({
      options,
    });
  };

  componentDidMount() {
    this.plotChart();
  }

  componentDidUpdate(prevProps, prevState) {
    const { insuranceData } = this.props;

    if (insuranceData !== prevProps.insuranceData) {
      this.setInsuranceData(insuranceData);
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

    const series = [];
    series.push({
      name: 'Amount of Insurance (NPR)',
      type: 'column',
      data: amountInsurance,
    });
    series.push({
      name: 'Amount of Sum Insuranced',
      type: 'line',
      data: sumInsuranced,
    });

    const options = {
      chart: {
        height: 450,
        type: 'line',
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
      xaxis: {
        type: 'string',
      },
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
    this.setState({
      series,
      options,
      data: array,
      chartData1: { series, options },
    });
  };

  handleBarChartBackBtn = () => {
    this.setState(prev => ({
      barChartClickIndex: prev.barChartClickIndex - 1,
    }));
  };

  render() {
    const {
      barChartClickIndex,
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
    } = this.props;

    return (
      <>
        <div
          className="card-header"
          // style={activeModal && { backgroundColor: '#fff' }}
        >
          {!activeModal && <h5>{barTitle}</h5>}
          {!isDownloading && (
            <div className="header-icons">
              {barChartClickIndex > 0 && (
                <button
                  id="chart-reset"
                  type="button"
                  onClick={this.handleBarChartBackBtn}
                  className="is-border common-button chart-reset"
                >
                  Back
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
          {barChartClickIndex === 0 ? (
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="line"
              height={400}
            />
          ) : barChartClickIndex === 1 ? (
            <ReactApexChart
              options={chartData2.options}
              series={chartData2.series}
              type="line"
              height={400}
            />
          ) : (
            <ReactApexChart
              options={chartData3.options}
              series={chartData3.series}
              type="line"
              height={400}
            />
          )}
        </div>
      </>
    );
  }
}

export default BarChartInsurance;
