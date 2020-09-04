/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import DonutChart from './DonutChart';
// import 'apexcharts';

// require 'apexcharts';
require('apexcharts');

export default class CustomChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      keyRandom: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activeLine1 !== this.props.activeLine1) {
      if (this.props.activeModal) {
        this.setState({ keyRandom: Math.random() });
      }
    }
    if (prevProps.activeBar1 !== this.props.activeBar1) {
      if (this.props.activeModal) {
        this.setState({ keyRandom: Math.random() });
      }
    }
  }

  render() {
    const { modal, keyRandom } = this.state;
    const {
      options,
      series,
      chartRef,
      activeDateValues,
    } = this.props;
    // const { series, options } = this.state;
    return (
      <>
        <div id="logframe-chart">
          <ReactApexChart
            // modal={modal}
            key={series}
            // key={keyRandom}
            ref={chartRef}
            options={options}
            series={series}
            type="line"
            height={500}
            // width={700}
          />
        </div>
      </>
    );
  }
}
