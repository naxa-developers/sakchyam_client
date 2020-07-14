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
      yaxis: {
        title: {
          text: 'No. of Products',
          rotate: 90,
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '12px',
            fontFamily: 'Avenir Book, sans-serif',
            fontWeight: 500,
            cssClass: 'apexcharts-yaxis-title',
          },
        },
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
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

    const { showRightSidebar, activeModal } = this.props;

    return (
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={!activeModal ? 450 : 685}
          width={
            showRightSidebar && window.innerWidth < 1600
              ? 780
              : showRightSidebar && window.innerWidth > 1600
              ? 1100
              : !showRightSidebar && window.innerWidth < 1600
              ? 1100
              : 1400
          }
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
