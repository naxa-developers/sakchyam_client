/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import {
  getProductProcessList,
  filterHeatmapChartData,
} from '../../../../../actions/productProcess.actions';

function generateData(count, yrange) {
  let i = 0;
  const series = [];
  while (i < count) {
    const x = (i + 1).toString();
    const y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
      yrange.min;

    series.push({
      x,
      y,
    });
    i += 1;
  }
  return series;
}

class HeatmapChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Metric1',
          data: generateData(10, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric2',
          data: generateData(10, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric3',
          data: generateData(10, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric4',
          data: generateData(10, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric5',
          data: generateData(10, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric6',
          data: generateData(10, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric7',
          data: generateData(10, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric8',
          data: generateData(10, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric9',
          data: generateData(10, {
            min: 0,
            max: 90,
          }),
        },
      ],
      // series: [
      //   {
      //     name: 'Innovation Area 1',
      //     data: [
      //       {
      //         x: 'Market Failure 1',
      //         y: 0,
      //       },
      //       {
      //         x: 'Market Failure 2',
      //         y: 29,
      //       },
      //       {
      //         x: 'Market Failure 3',
      //         y: 13,
      //       },
      //       {
      //         x: 'Market Failure 4',
      //         y: 32,
      //       },
      //     ],
      //   },
      //   {
      //     name: 'Innovation Area 2',
      //     data: [
      //       {
      //         x: 'Market Failure 1',
      //         y: 43,
      //       },
      //       {
      //         x: 'Market Failure 2',
      //         y: 43,
      //       },
      //       {
      //         x: 'Market Failure 3',
      //         y: 43,
      //       },
      //       {
      //         x: 'Market Failure 4',
      //         y: 43,
      //       },
      //     ],
      //   },
      // ],
      options: {
        chart: {
          toolbar: { show: false },
          height: 350,
          type: 'heatmap',
        },
        dataLabels: {
          enabled: false,
        },
        colors: ['#008FFB'],
        title: {
          text: undefined,
        },
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      productProcessReducer: { heatMapData },
    } = this.props;
    if (
      this.props.productProcessReducer.heatMapData !==
      prevProps.productProcessReducer.heatMapData
    ) {
      this.setState({
        series: heatMapData,
      });
    }
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="heatmap"
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
  filterHeatmapChartData,
})(HeatmapChart);
