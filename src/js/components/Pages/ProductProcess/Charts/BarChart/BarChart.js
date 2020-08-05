/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { getProductProcessList } from '../../../../../actions/productProcess.actions';

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
        // height: 350,
      },
      plotOptions: {
        bar: {
          // horizontal: false,
          columnWidth: '40%',
          startingShape: 'flat',
          endingShape: 'rounded',
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
          // text: !this.props.activeModal
          //   ? 'No. of Products'
          //   : undefined,
          text: 'No. of Products',
          rotate: 90,
          offsetX: 0,
          offsetY: 0,
          style: {
            // color: undefined,
            fontSize: '12px',
            fontFamily: 'Avenir Book, sans-serif',
            fontWeight: 500,
            cssClass: 'apexcharts-yaxis-title',
          },
        },
        axisBorder: {
          // show: !this.props.activeModal ? true : false,
          show: true,
        },
        axisTicks: {
          // show: !this.props.activeModal ? true : false,
          show: true,
        },
        labels: {
          formatter(value) {
            return value;
          },
        },
      },
      grid: {
        show: false,
      },
      tooltip: {
        marker: {
          show: false,
        },
      },

      // tooltip: {
      //   fixed: {
      //     enabled: true,
      //     position: 'topRight',
      //     offsetX: 0,
      //     offsetY: 0,
      //   },
      // },
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

    let height = 425;
    let width = 425;

    if (activeModal) {
      if (window.innerWidth > 1600) {
        height = 900;
        // width = 1500;
      } else if (window.innerWidth < 1600) {
        height = 570;
        // width = 1000;
        // } else if (window.innerWidth < 1600) {
        //   height = 570;
        //   width = 1000;
      }
    } else {
      // height = 425;
      height = 434;
      // width = 450;
    }

    if (!activeModal) {
      if (showRightSidebar && window.innerWidth < 1600) width = 780;
      else if (showRightSidebar && window.innerWidth > 1600)
        width = 1100;
      else if (!showRightSidebar && window.innerWidth < 1600)
        width = 1100;
      else width = 1400;
    } else {
      width = 1400;
    }

    return (
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          // height={!activeModal ? 450 : 685}
          width={width}
          // width={
          //   showRightSidebar && window.innerWidth < 1600
          //     ? 780
          //     : showRightSidebar && window.innerWidth > 1600
          //     ? 1100
          //     : !showRightSidebar && window.innerWidth < 1600
          //     ? 1100
          //     : 1400
          // }
          height={height}
          // width={width}
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
})(BarChart);
