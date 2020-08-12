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
      name: 'Amount of insurance',
      type: 'column',
      data: columnData,
    });
    series.push({
      name: 'Amount of sum insuranced',
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
      name: 'Amount of insurance',
      type: 'column',
      data: columnData,
    });
    series.push({
      name: 'Amount of sum insuranced',
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

    const series = [
      {
        name: 'Website Blog',
        type: 'column',
        data: [],
      },
      {
        name: 'Social Media',
        type: 'line',
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
      },
    ];
    const options = {
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: false,
        },
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
      stroke: {
        width: [0, 4],
      },
      title: {
        text: 'Traffic Sources',
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      labels: [],
      xaxis: {
        type: 'datetime',
      },
      yaxis: [
        {
          title: {
            text: 'Website Blog',
          },
        },
        {
          opposite: true,
          title: {
            text: 'Social Media',
          },
        },
      ],
    };

    this.setState({
      options,
      series,
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
      name: 'Amount of insurance',
      type: 'column',
      data: amountInsurance,
    });
    series.push({
      name: 'Amount of sum insuranced',
      type: 'line',
      data: sumInsuranced,
    });

    const options = {
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [0, 4],
      },
      title: {
        text: 'Traffic Sources',
      },
      dataLabels: {
        enabled: false,
        enabledOnSeries: [1],
      },
      labels,
      xaxis: {
        type: 'string',
      },
      yaxis: [
        {
          title: {
            text: 'Amount of insurance',
          },
          labels: {
            show: true,
            offsetX: 0,
            formatter: val => getShortNumbers(val),
          },
        },
        {
          opposite: true,
          title: {
            text: 'Amount of sum insuranced',
          },
          labels: {
            show: true,
            offsetX: -1,
            formatter: val => getShortNumbers(val),
          },
        },
      ],
    };
    this.setState({
      series,
      options,
      data: array,
      chartData1: { series, options },
    });
  };

  render() {
    const {
      barChartClickIndex,
      chartData1,
      chartData2,
      chartData3,
    } = this.state;

    return (
      <div id="chart">
        {barChartClickIndex === 0 ? (
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={350}
          />
        ) : barChartClickIndex === 1 ? (
          <ReactApexChart
            options={chartData2.options}
            series={chartData2.series}
            type="line"
            height={350}
          />
        ) : (
          <ReactApexChart
            options={chartData3.options}
            series={chartData3.series}
            type="line"
            height={350}
          />
        )}
      </div>
    );
  }
}

export default BarChartInsurance;
