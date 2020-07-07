import React from 'react';
import ReactApexChart from 'react-apexcharts';

class RadarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Series 1',
          data: [80, 50, 30, 40, 100, 20, 40, 100, 20, 100, 20],
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

export default RadarChart;
