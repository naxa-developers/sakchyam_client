import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
// import 'apexcharts';

// require 'apexcharts';
require('apexcharts');

export default class CustomChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //   const firstLegend = document.getElementsByClassName(
  //     'apexcharts-legend-series',
  //   )[0];
  //   // firstLegend.addEventListener('click', function() {
  //   //   alert('clicked First Legend');
  //   // });
  //   // const firstLegend = document.getElementsByClassName(
  //   //   'apexcharts-legend-series',
  //   // )[0];
  //   // const secondLegend = document.getElementsByClassName(
  //   //   'apexcharts-legend-series',
  //   // )[3];
  //   firstLegend.addEventListener('click', async event => {
  //     console.log('clicked firstlegend');
  //   });
  // }

  render() {
    // const { activeLayer, statsData } = this.state;
    const {
      options,
      series,
      chartRef,
      activeDateValues,
    } = this.props;
    return (
      <div id="chart">
        {/* {activeDateValues.length === 0 ? (
          <label>
            {activeDateValues.length === 0
              ? 'No Data Selected'
              : `${activeDateValues}`}
          </label>
        ) : ( */}
        <ReactApexChart
          ref={chartRef}
          options={options}
          series={series}
          type="line"
          height={500}
          // width={600}
        />
        {/* )} */}
      </div>
    );
  }
}
