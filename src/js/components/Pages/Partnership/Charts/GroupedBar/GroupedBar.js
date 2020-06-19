import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';

class GroupedBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {},
    };
  }

  plotChart = () => {
    console.log(this.props.partnershipReducer, 'partnershipReducer');
    const series = [
      {
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22, 43],
      },
      {
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27],
      },
      {
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21, 14],
      },
      {
        name: 'PRODUCT D',
        data: [21, 7, 25, 13, 22, 8],
      },
    ];
    const options = {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
        ],
      },
      yaxis: {
        title: {
          text: '$ (thousands)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter(val) {
            return `$ ${val} thousands`;
          },
        },
      },
    };
    this.setState({ options, series });
  };

  componentDidMount() {
    this.plotChart();
  }

  updateBarChart = () => {
    const { barDatas } = this.props.partnershipReducer;
    console.log(this.props.partnershipReducer, 'partnershipReducer');
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
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: barDatas.labels,
      },
      yaxis: {
        title: {
          text: '$ (thousands)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter(val) {
            return `$ ${val} thousands`;
          },
        },
      },
    };
    this.setState({ options, series: barDatas.series });
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      partnershipReducer: { barDatas },
    } = this.props;
    if (prevProps.partnershipReducer.barDatas !== barDatas) {
      this.updateBarChart();
    }
  }

  render() {
    const { options, series } = this.state;
    return (
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    );
  }
}
const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});
export default connect(mapStateToProps, {})(GroupedBar);
