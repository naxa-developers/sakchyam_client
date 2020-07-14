import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
// import 'apexcharts';

// require 'apexcharts';
require('apexcharts');

export default class ModalChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
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
    const { modal } = this.state;
    const {
      options,
      series,
      chartRef,
      activeDateValues,
    } = this.props;
    // const { series, options } = this.state;
    return (
      <div id="chartmodal">
        {/* {activeDateValues.length === 0 ? (
          <label>
            {activeDateValues.length === 0
              ? 'No Data Selected'
              : `${activeDateValues}`}
          </label>
        ) : ( */}
        <ReactApexChart
          // modal={modal}
          //   key={series}
          ref={chartRef}
          options={options}
          series={series}
          type="line"
          height={500}
          // width={1300}
        />
        {/* )} */}
      </div>
    );
  }
}