/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';

let total = '';
class DonutChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   series: [],
      options: {},
      height: 1400,
    };
  }

  plotChart = () => {
    const series = [50, 120];
    const options = {
      chart: {
        width: 150,
        type: 'donut',
      },
      //   labels: ['a', 'b'],
      plotOptions: {
        pie: {
          customScale: 0.8,
          donut: {
            // customScale: 0.8,
            // size: 200,
            // size: '5%',
            labels: {
              show: true,
              name: {
                show: false,
                fontSize: '24px',
                fontFamily: 'Avenir book',
                fontWeight: 100,
                color: '#fff',
                offsetY: 50,
                formatter(val) {
                  return 'Totals';
                },
                value: {
                  show: true,
                },
              },
              value: {
                show: true,
                fontSize: '24px',
                fontFamily: 'Avenir book',
                fontWeight: 100,
                color: '#d9202c',
                offsetY: 5,
                // eslint-disable-next-line consistent-return
                formatter(w) {
                  // if (w.globals && w.globals.seriesTotals) {
                  //   return w.globals.seriesTotals.reduce((a, b) => {
                  //     return a + b;
                  //   }, 0);
                  // }
                  if (typeof w === 'number') {
                    // if (!total) {
                    total = w;
                    // }
                    return w;
                  }
                  return total;
                  // return null;
                },
                value: {
                  show: true,
                },
              },
              total: {
                show: true,
                showAlways: false,
                label: 'Total',
                fontSize: '24px',
                fontFamily: 'Avenir book',
                fontWeight: 100,
                color: '#d9202c',
                formatter(w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                },
              },
            },
          },
        },
      },
      tooltip: {
        // enabled: false,
        // fillSeriesColor: false,
        // fontColor: 'white',
        // style: {
        //   fontSize: '12px',
        //   fontColor: 'white',
        // },
        // followCursor: false,
        // fixed: {
        //   enabled: true,
        //   position: 'topRight',
        //   offsetX: 100,
        //   offsetY: 100,
        // },
        // marker: {
        //   show: false,
        // },
      },
      dataLabels: {
        enabled: false,
      },
      // responsive: [
      //   {
      //     breakpoint: 480,
      //     options: {
      //       chart: {
      //         width: 200,
      //       },
      //       legend: {
      //         show: false,
      //       },
      //     },
      //   },
      // ],
      legend: {
        show: true,
        position: 'bottom',
        offsetY: 0,
        // height: 230,
      },
      // fill: {
      //   opacity: 1,
      //   colors: [
      //     // '#e69109',
      //     // '#63a4ff',
      //     // '#8629ff',
      //     // '#e553ed',
      //     // '#f2575f',
      //     // '#915e0d',
      //     // '#a1970d',
      //     // '#4f7d14',
      //     // '#07aba1',
      //     // '#1d4c8f',
      //     // '#491991',
      //     // '#610766',
      //     // '#6e0208',
      //     // '#f07818',
      //     // '#7F95D1',
      //     // '#FF82A9',
      //     // '#FFC0BE',
      //     // '#f0e111',
      //     // '#9ff035',
      //     // '#34ede1',
      //     // '#D13F31',
      //     // '#DEDBA7',
      //     // '#72B095',
      //     // '#a1bd93',
      //   ],
      // },
    };
    this.setState({ options });
  };

  componentDidMount() {
    this.plotChart();
  }

  componentDidUpdate(prevProps, prevState) {
    const { label } = this.props.financialReducer.pieData;
    if (
      prevProps.financialReducer.pieData !==
      this.props.financialReducer.pieData
    ) {
      console.log(label, 'label');
      this.setState(preState => ({
        options: {
          ...preState.options,
          labels: label,
        },
      }));
    }
  }

  render() {
    const { series, label } = this.props.financialReducer.pieData;
    // console.log(series, 'series');
    const { options, height } = this.state;
    return (
      <div>
        {series && series && (
          <ReactApexChart
            options={options}
            series={series && series}
            type="donut"
            height="250"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ financialReducer }) => ({
  financialReducer,
});
export default connect(mapStateToProps, {})(DonutChart);
