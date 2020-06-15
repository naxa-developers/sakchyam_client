/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { connect } from 'react-redux';
// color: #c21c2e;
// color: #f36c00;
// color: #40a8be;
// color: #de2693;
function numberWithCommas(x) {
  if (x !== null) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return x;
}
class HorizontalChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {},
      height: 1800,
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
        // height: 2000,
        toolbar: {
          show: false,
        },
        events: {
          click(
            event,
            chartContext,
            { seriesIndex, dataPointIndex, config },
          ) {
            // console.log('Clicked Bar');
            // console.log(event);
            // console.log(chartContext);
            // console.log(seriesIndex);
            console.log(dataPointIndex);
            // console.log(config);
          },
        },
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
        enabled: false,
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
        floating: false,
        position: 'top',
        show: true,
        offsetX: 0,
        // labels: {
        //   show: true,
        //   style: {
        //     fontSize: '2px',
        //   },
        // },
        type: 'category',
        categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
      },
      yaxis: {
        // tooltip: {
        //   enabled: true,
        // },
        offsetY: 0,
        show: true,
        labels: {
          // hideOverlappingLabels: false,
          show: true,
          offsetX: 10,
          // style: {
          //   fontSize: '8px',
          //   fontFamily: 'Helvetica, Arial, sans-serif',
          //   fontWeight: 400,
          //   cssClass: 'apexcharts-xaxis-label',
          // },
        },
      },
    };
    this.setState({ options, series });
  };

  componentDidMount() {
    this.plotChart();
    const { filteredByProgram } = this.props.financialReducer;

    // console.log(filteredByProgram, 'filteredByProgram');
    if (this.props.activeModal) {
      if (
        filteredByProgram.series[0].data.length > 2
        // filteredByProgram.series.length > 10
      ) {
        this.setState(preState => ({
          height: 1800,
          series: filteredByProgram.series,
          options: {
            ...preState.options,
            plotOptions: {
              ...preState.options.plotOptions,
              bar: {
                ...preState.options.plotOptions.bar,
                barHeight: '80%',
                columnWidth: '100%',
              },
            },
            colors: filteredByProgram.color,
            xaxis: {
              ...preState.options.xaxis,
              categories: filteredByProgram.label,
            },
          },
        }));
      } else {
        this.setState(preState => ({
          height: 800,
          series: filteredByProgram.series,
          options: {
            ...preState.options,
            plotOptions: {
              ...preState.options.plotOptions,
              bar: {
                ...preState.options.plotOptions.bar,
                barHeight: '20%',
                columnWidth: '100%',
              },
            },
            colors: filteredByProgram.color,
            xaxis: {
              ...preState.options.xaxis,
              categories: filteredByProgram.label,
            },
          },
        }));
      }
    }

    // new ApexCharts(
    //     document.querySelector('#horizontal-chart'),
    //     options,
    //   );
  }

  componentDidUpdate(prevProps, prevState) {
    const { filteredByProgram } = this.props.financialReducer;
    if (
      prevProps.financialReducer.filteredByProgram !==
      this.props.financialReducer.filteredByProgram
    ) {
      // console.log(filteredByProgram, 'filteredByProgram');
      if (
        filteredByProgram.series[0].data.length > 2
        // filteredByProgram.series.length > 10
      ) {
        this.setState(preState => ({
          height: 1800,
          series: filteredByProgram.series,
          options: {
            ...preState.options,
            plotOptions: {
              ...preState.options.plotOptions,
              bar: {
                ...preState.options.plotOptions.bar,
                barHeight: '80%',
                columnWidth: '100%',
              },
            },
            colors: filteredByProgram.color,
            xaxis: {
              ...preState.options.xaxis,
              categories: filteredByProgram.label,
            },
          },
        }));
      } else {
        this.setState(preState => ({
          height: 800,
          series: filteredByProgram.series,
          options: {
            ...preState.options,
            plotOptions: {
              ...preState.options.plotOptions,
              bar: {
                ...preState.options.plotOptions.bar,
                barHeight: '20%',
                columnWidth: '100%',
              },
            },
            colors: filteredByProgram.color,
            xaxis: {
              ...preState.options.xaxis,
              categories: filteredByProgram.label,
            },
          },
        }));
      }
    }
  }

  render() {
    const { height } = this.state;
    const { filteredByProgram } = this.props.financialReducer;
    return (
      <div id="horizontal-chart">
        {filteredByProgram.series && filteredByProgram.series[0] && (
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={height}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ financialReducer }) => ({
  financialReducer,
});
export default connect(mapStateToProps, {})(HorizontalChart);
