/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';

function numberWithCommas(x) {
  if (x !== null) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return x;
}
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
    const { label } = this.props.financialReducer.pieData;
    const options = {
      chart: {
        width: 150,
        type: 'donut',
      },
      //   labels: ['a', 'b'],
      labels: label ? label : [],
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
                // showAlways: true,
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
                    return numberWithCommas(w);
                  }
                  return numberWithCommas(total);
                  // return null;
                },
                value: {
                  show: true,
                },
              },
              total: {
                show: true,
                showAlways: true,
                label: 'Total',
                fontSize: '24px',
                fontFamily: 'Avenir book',
                fontWeight: 100,
                color: '#d9202c',
                formatter(w) {
                  let x = 0;
                  w.globals.seriesTotals.forEach(i => {
                    x += i;
                  });
                  return numberWithCommas(x);
                },
              },
            },
          },
        },
      },
      tooltip: {
        fillSeriesColor: false,
        // enabled: false,
        style: {
          fontSize: '11px',
          fontColor: '#fff',
          backgroundColor: '#fff',
        },
        y: {
          formatter: val => numberWithCommas(val),
        },
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
        show: false,
        position: 'bottom',
        offsetY: 0,
        // height: 230,
      },
      yaxis: {
        crosshairs: {
          show: false,
        },
      },
      fill: {
        opacity: 1,
        colors: [
          '#13A8BE',
          '#E11D3F',
          // '#e69109',
          // '#63a4ff',
          // '#8629ff',
          // '#e553ed',
          // '#f2575f',
          // '#915e0d',
          // '#a1970d',
          // '#4f7d14',
          // '#07aba1',
          // '#1d4c8f',
          // '#491991',
          // '#610766',
          // '#6e0208',
          // '#f07818',
          // '#7F95D1',
          // '#FF82A9',
          // '#FFC0BE',
          // '#f0e111',
          // '#9ff035',
          // '#34ede1',
          // '#D13F31',
          // '#DEDBA7',
          // '#72B095',
          // '#a1bd93',
        ],
      },
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
    //
    const { options, height } = this.state;
    const Total = series && series[1] + series[0];
    const microPercent = series && (series[1] * 100) / Total;
    const commPercent = series && (series[0] * 100) / Total;
    // console.log(
    //   Total,
    //   Math.round(microPercent),
    //   Math.round(commPercent),
    // );
    return (
      <div
        id="donut-chart"
        style={{ height: this.props.activeModal ? '500px' : '400px' }}
      >
        {series && series && (
          <span
            style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
            }}
          >
            <span style={{ flex: 3.5 }}>
              {' '}
              <ReactApexChart
                options={options}
                series={series && series}
                type="donut"
                height={this.props.activeModal ? '350' : '350'}
              />
            </span>
            <span
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingBottom: '10px',
              }}
            >
              <div className="pie-legend">
                <div className="legend-list">
                  <h5>
                    <small style={{ backgroundColor: '#e11d3f' }} />
                    <span>
                      <strong style={{ fontSize: '14px' }}>
                        Microfinance/Cooperative
                      </strong>
                    </span>
                  </h5>
                  <div
                    className="legend-count"
                    style={{ fontSize: '14px' }}
                  >
                    <b className="numeric">
                      {numberWithCommas(series[1])}
                    </b>
                    <b className="percent">
                      {`${microPercent.toFixed(2)}%`}
                    </b>
                  </div>
                </div>
                <div className="legend-list">
                  <h5>
                    <small style={{ backgroundColor: '#13a8be' }} />
                    <span>
                      <strong style={{ fontSize: '14px' }}>
                        Commercial Banks and Mobile Network Operators
                      </strong>
                    </span>
                  </h5>
                  <div
                    className="legend-count"
                    style={{ fontSize: '14px' }}
                  >
                    <b className="numeric">
                      {numberWithCommas(series[0])}
                    </b>
                    <b className="percent">
                      {`${commPercent.toFixed(2)}%`}
                    </b>
                  </div>
                </div>
              </div>
            </span>
          </span>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ financialReducer }) => ({
  financialReducer,
});
export default connect(mapStateToProps, {})(DonutChart);
