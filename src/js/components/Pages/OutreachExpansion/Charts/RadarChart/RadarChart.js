import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { connect } from 'react-redux';

class RadarChart extends Component {
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
        name: 'Series 1',
        data: [80, 50, 30, 40, 100, 20],
      },
      {
        name: 'Series 2',
        data: [20, 30, 40, 80, 20, 80],
      },
      {
        name: 'Series 3',
        data: [44, 76, 78, 13, 43, 10],
      },
    ];
    const options = {
      chart: {
        height: 350,
        type: 'radar',
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1,
        },
      },
      legend: {
        show: false,
      },
      title: {
        // text: 'Radar Chart - Multi Series',
      },
      stroke: {
        width: 2,
      },
      fill: {
        opacity: 0.1,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        categories: [
          'Percentage Branch',
          'Percentage BLB',
          'Percentage Extension Counter',
          'Percentage Tablet',
        ],
      },
    };
    this.setState({ options, series });
  };

  componentDidMount() {
    this.plotChart();
    const { activeModal } = this.props;
    if (activeModal) {
      this.updateBarChart();
    }
  }

  updateBarChart = () => {
    const {
      partnershipReducer: { spiderChartData },
    } = this.props;
    // console.log(this.props.partnershipReducer, 'partnershipReducer');
    // const series = [
    //   {
    //     name: 'PRODUCT A',
    //     data: [44, 55, 41, 67, 22, 43],
    //   },
    //   {
    //     name: 'PRODUCT B',
    //     data: [13, 23, 20, 8, 13, 27],
    //   },
    //   {
    //     name: 'PRODUCT C',
    //     data: [11, 17, 15, 15, 21, 14],
    //   },
    //   {
    //     name: 'PRODUCT D',
    //     data: [21, 7, 25, 13, 22, 8],
    //   },
    // ];
    const options = {
      chart: {
        height: 350,
        type: 'radar',
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1,
        },
      },
      // tooltip: {
      //   show: false,
      // },
      legend: {
        show: false,
      },
      title: {
        // text: 'Radar Chart - Multi Series',
      },
      stroke: {
        width: 2,
      },
      fill: {
        opacity: 0.1,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        categories: ['Branch', 'BLB', 'Extension Counter', 'Tablet'],
      },
    };
    this.setState({ options, series: spiderChartData });
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      partnershipReducer: { spiderChartData },
    } = this.props;
    if (
      prevProps.partnershipReducer.spiderChartData !== spiderChartData
    ) {
      this.updateBarChart();
    }
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="radar"
        height={350}
      />
    );
  }
}

const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});
export default connect(mapStateToProps, {
  // filterFinancialDataOfDistrictFromProvince,
})(RadarChart);
