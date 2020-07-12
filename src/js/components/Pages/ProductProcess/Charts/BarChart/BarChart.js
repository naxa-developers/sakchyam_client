/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import {
  getProductProcessList,
  filterBarChartData,
} from '../../../../../actions/productProcess.actions';

class BarChart extends Component {
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
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ];
    const options = {
      colors: ['#E11D3F'],
      chart: {
        toolbar: { show: false },
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          // horizontal: false,
        },
      },
      legend: {
        show: true,
        position: 'bottom',
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
        labels: {
          trim: true,
          hideOverlappingLabels: false,
        },
      },
      grid: {
        show: false,
      },
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topRight',
          offsetX: 0,
          offsetY: 0,
        },
      },
    };

    this.setState({ options });
  };

  componentDidMount() {
    this.plotChart();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      productProcessReducer: { barChartData },
    } = this.props;
    if (
      this.props.productProcessReducer.barChartData !==
      prevProps.productProcessReducer.barChartData
    ) {
      this.setState(preState => ({
        series: barChartData.series,
        options: {
          ...preState.options,
          xaxis: {
            ...preState.options.xaxis,
            categories: barChartData.categories,
          },
        },
      }));
    }
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ productProcessReducer }) => ({
  productProcessReducer,
});

export default connect(mapStateToProps, {
  getProductProcessList,
  filterBarChartData,
})(BarChart);
