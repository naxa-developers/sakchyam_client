/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { getProductProcessList } from '../../../../../actions/productProcess.actions';

class RadarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Series 1',
          data: [80, 0, 30, 0, 100, 20, 4, 0, 0, 100, 0],
        },
        {
          name: 'Series 2',
          data: [20, 30, 40, 80, 20, 80, 40, 100, 20, 100, 20],
        },
        {
          name: 'Series 3',
          data: [44, 76, 78, 13, 43, 10, 40, 100, 20, 100, 20],
        },
        {
          name: 'Series 4',
          data: [44, 26, 78, 33, 43, 10, 45, 100, 27, 100, 90],
        },
      ],
      options: {
        tooltip: {
          enabled: true,
          // shared: true,
        },
        chart: {
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
          size: 0,
        },
        xaxis: {
          labels: {
            show: false,
          },
          categories: [
            'I1',
            'I2',
            'I3',
            'I4',
            'I5',
            'I6',
            'I7',
            'I8',
            'I9',
            'I10',
            'I11',
          ],
        },
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      productProcessReducer: { radarChartData },
    } = this.props;
    if (
      this.props.productProcessReducer.heatMapData !==
      prevProps.productProcessReducer.heatMapData
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
