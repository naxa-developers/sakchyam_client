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
          columnWidth: '60%',
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

  updateChartData = () => {
    const {
      productProcessReducer: { barChartData },
    } = this.props;

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
  };

  componentDidMount() {
    this.plotChart();

    const { activeModal } = this.props;
    if (activeModal) this.updateChartData();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.productProcessReducer.barChartData !==
      prevProps.productProcessReducer.barChartData
    ) {
      this.updateChartData();
    }
  }

  render() {
    const { options, series } = this.state;

    return (
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={450}
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
