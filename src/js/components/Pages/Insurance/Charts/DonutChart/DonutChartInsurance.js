import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class DonutChartInsurance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {},
    };
  }

  plotChart = () => {
    const series = [44, 55, 41, 17, 15];
    const options = {
      chart: {
        type: 'donut',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    this.setState({ series, options });
  };

  componentDidMount() {
    this.plotChart();
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          height={350}
        />
      </div>
    );
  }
}

export default DonutChartInsurance;
