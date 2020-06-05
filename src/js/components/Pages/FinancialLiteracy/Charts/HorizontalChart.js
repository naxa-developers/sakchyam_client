/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { connect } from 'react-redux';
// color: #c21c2e;
// color: #f36c00;
// color: #40a8be;
// color: #de2693;
class HorizontalChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {},
    };
  }

  plotChart = () => {
    const series = [
      {
        name: 'a',
        data: [44, 55, 41, 64, 22, 43, 21],
      },
      {
        data: [53, 32, 33, 52, 13, 44, 32],
      },
      {
        data: [44, 55, 41, 64, 22, 43, 21],
      },
      {
        data: [53, 32, 33, 52, 13, 44, 32],
      },
      {
        data: [53, 32, 33, 52, 13, 44, 32],
      },
      {
        data: [53, 32, 33, 52, 13, 44, 32],
      },
    ];
    const options = {
      chart: {
        type: 'bar',
        height: 2000,
      },
      plotOptions: {
        bar: {
          barHeight: '100%',
          columnWidth: '100%',
          distributed: false,
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
          startingShape: 'flat',
          endingShape: 'rounded',
        },
      },
      legend: { show: false },
      colors: ['#c21c2e', '#f36c00', '#40a8be', '#de2693'],
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff'],
      },
      xaxis: {
        show: false,
        offsetX: 0,
        labels: {
          show: false,
        },
        type: 'category',
        categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
      },
      yaxis: {
        offsetY: 0,
        // show: false,
      },
    };
    this.setState({ options, series });
  };

  componentDidMount() {
    console.log(this.props.financialReducer, 'reducer');
    this.plotChart();
    // new ApexCharts(
    //     document.querySelector('#horizontal-chart'),
    //     options,
    //   );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.financialReducer.filteredByProgram !==
      this.props.financialReducer.filteredByProgram
    ) {
      this.setState(preState => ({
        series: this.props.financialReducer.filteredByProgram.series,
        options: {
          ...preState.options,
          xaxis: {
            ...preState.options.xaxis,
            categories: this.props.financialReducer.filteredByProgram
              .label,
          },
        },
      }));
    }
  }

  render() {
    return (
      <div id="horizontal-chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={2000}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ financialReducer }) => ({
  financialReducer,
});
export default connect(mapStateToProps, {})(HorizontalChart);
