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
    // if (prevProps.activeModal !== this.props.activeModal) {
    //   if (this.props.activeModal) {
    //     this.setState({ keyRandom: Math.random() });
    //   }
    // }
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
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.activeModal !== this.props.activeModal) {
  //     // eslint-disable-next-line
  //     this.setState({modal:this.props.activeModal});
  //   }
  // }

  render() {
    const { modal, keyRandom } = this.state;
    const {
      options,
      series,
      chartModalRef,
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
            ref={chartModalRef}
            options={options}
            series={series}
            type="line"
            height={window.innerWidth < 1400 ? 370 : 500}
            // width={700}
          />
        </div>
      </>
    );
  }
}
