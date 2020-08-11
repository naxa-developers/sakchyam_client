/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getShortNumbers } from '../../../../common/utilFunctions';

class BarChartInsurance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Website Blog',
          type: 'column',
          data: [
            4400000,
            5050000,
            4140000,
            6710000,
            2270000,
            4130000,
            2010000,
            3520000,
            7520000,
            3200000,
            2570000,
            1600000,
          ],
        },
        {
          name: 'Social Media',
          type: 'line',
          data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
        },
      ],
      options: {
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
          enabled: true,
          enabledOnSeries: [1],
        },
        labels: [
          '01 Jan 2001',
          '02 Jan 2001',
          '03 Jan 2001',
          '04 Jan 2001',
          '05 Jan 2001',
          '06 Jan 2001',
          '07 Jan 2001',
          '08 Jan 2001',
          '09 Jan 2001',
          '10 Jan 2001',
          '11 Jan 2001',
          '12 Jan 2001',
        ],
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
      },
      data: '',
    };
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
    console.log('series and options', series, options);
    this.setState({ series, options, data: array });
  };

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
      </div>
    );
  }
}

export default BarChartInsurance;
