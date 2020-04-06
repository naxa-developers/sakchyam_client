/* eslint-disable */
import React, { Component } from 'react';
import ApexCharts from 'apexcharts';
import Axios from 'axios';

class OIndicator2 extends Component {
  constructor(props) {
    super(props);

    this.state = { data: null };
  }

  componentDidMount() {
    Axios.get(`https://sakchyam.naxa.com.np/api/v1/log_data`).then(
      res =>
        res.data.map(d => {
          if(d.sub_category === 'Output Indicator 2.3') {
              console.log(d.planned_afp)

          }
        }),
    );
    const options = {
      series: [
        {
          name: 'SAMPLE A',
          data: [
            [1, 1, 0],
            [1,1, 0],
            [1, 1.0],
            [1,1, 0],
            [1, 1.0],
            [1,1, 0],
            
          ],
        },
        {
          name: 'SAMPLE B',
          data: [
            [3, 2,1],
            [3, 2,1],
            [3, 2,1],
            [3, 2,1],
            [3, 2,1],
            [3, 2,1],
           
          ],
        },
        {
          name: 'SAMPLE C',
          data: [
            [4,3,1],
            [4,3,1],
            [4,3,1],
            [4,3,1],
            [4,3,1],
            [4,3,1],
          ],
        },
        {
            name: 'SAMPLE D',
            data: [
              [6,4,2],
              [6,4,2],
              [6,4,2],
              [6,4,2],
              [6,4,2],
              [6,4,2],
      
            ],
          },
          {
            name: 'SAMPLE E',
            data: [
              [7,4,3],
              [7,4,3],
              [7,4,3],
              [7,4,3],
              [7,4,3],
              [7,4,3],
      
            ],
          },
      ],
      chart: {
        height: 350,
        type: 'scatter',
        zoom: {
          enabled: true,
          type: 'xy',
        },
      },
      xaxis: {
        tickAmount: 10,
        labels: {
          formatter(val) {
            return parseFloat(val).toFixed(1);
          },
        },
      },
      yaxis: {
        tickAmount: 7,
      },
    };

    const chart = new ApexCharts(
      document.querySelector('#chart'),
      options,
    );
    chart.render();
  }

  render() {
    return (
      <>
        <h3>For Output Indicator 2.3</h3>
        <div id="chart" />
      </>
    );
  }
}

export default OIndicator2;
