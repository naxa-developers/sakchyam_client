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

  render() {
    // const { activeLayer, statsData } = this.state;
    const { options, series } = this.props;
    return (
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
    );
  }
}
