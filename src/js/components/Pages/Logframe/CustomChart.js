import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import 'apexcharts';

// require 'apexcharts';
require('apexcharts');

export default class CustomChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    // const { activeLayer, statsData } = this.state;
    const { options, series, chartRef } = this.props;
    return (
      <div id="chart">
        <ReactApexChart
          ref={chartRef}
          options={options}
          series={series}
          type="line"
          height={500}
          // width={100}
        />
      </div>
    );
  }
}
