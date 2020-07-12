/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { getProductProcessList } from '../../../../../actions/productProcess.actions';

class RadarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {},
    };
  }

  plotChart = () => {
    const options = {
      tooltip: {
        enabled: true,
        // shared: true,
      },
      chart: {
        toolbar: { show: false },
        height: 350,
        type: 'radar',
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1,
        },
      },
      title: {
        text: undefined,
      },
      stroke: {
        width: 2,
      },
      fill: {
        opacity: 0.1,
      },
      markers: {
        size: 4,
      },
      xaxis: {
        labels: {
          show: false,
          // show: true,
        },
        categories: [],
      },
      legend: {
        onItemClick: {
          toggleDataSeries: false,
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
      productProcessReducer: { radarChartData },
    } = this.props;
    // if (
    //   this.props.productProcessReducer.heatMapData !==
    //   prevProps.productProcessReducer.heatMapData
    // ) {
    //   this.setState(preState => ({
    //     series: radarChartData.series,
    //     options: {
    //       ...preState.options,
    //       xaxis: {
    //         ...preState.options.xaxis,
    //         categories: radarChartData.categories,
    //       },
    //     },
    //   }));
    // }
    if (
      this.props.productProcessReducer.radarChartData !==
      prevProps.productProcessReducer.radarChartData
    ) {
      this.setState(preState => ({
        series: radarChartData.series,
        options: {
          ...preState.options,
          xaxis: {
            ...preState.options.xaxis,
            categories: radarChartData.categories,
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
          type="radar"
          height={385}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ productProcessReducer }) => ({
  productProcessReducer,
});

export default connect(mapStateToProps, { getProductProcessList })(
  RadarChart,
);
