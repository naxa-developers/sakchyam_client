/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import {
  getProductProcessList,
  filterHeatmapChartData,
} from '../../../../../actions/productProcess.actions';

class HeatmapChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {},
    };
  }

  plotChart = () => {
    const options = {
      chart: {
        toolbar: { show: false },
        height: 350,
        type: 'heatmap',
        // width: 900,
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          radius: 0,
          // useFillColorAsStroke: true,
          useFillColorAsStroke: false,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 1,
                name: '',
                color: '#F9EBEA',
              },
              {
                from: 1,
                to: 2,
                name: '',
                color: '#E6B0AA',
              },
              {
                from: 2,
                to: 3,
                name: '',
                color: '#D98880',
              },
              {
                from: 4,
                to: 5,
                name: '',
                color: '#C0392B',
              },
              {
                from: 6,
                to: 7,
                name: '',
                color: '#A93226',
                // color: '',
              },
              {
                from: 8,
                to: 9,
                name: '',
                color: '#7B241C',
              },
              // {
              //   from: 0,
              //   to: 1,
              //   name: '',
              //   color: '',
              // },

              // {
              //   from: 0,
              //   to: 1,
              //   name: 'low',
              //   color: '#00A100', // green
              //   // color: '#B1B424', // green
              // },
              // {
              //   from: 2,
              //   to: 5,
              //   name: 'medium',
              //   color: '#128FD9', // blue // #B1B424
              //   // color: '#007078', // blue // #B1B424
              // },
              // {
              //   from: 6,
              //   to: 15,
              //   name: 'high',
              //   color: '#FFB200',
              // },
              // {
              //   from: 8,
              //   to: 15,
              //   name: 'extreme',
              //   color: '#FF0000',
              // },
            ],
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1,
      },
      // colors: ['#008FFB'],
      title: {
        text: undefined,
      },
      yaxis: {
        // labels: {
        //   // show: false,
        //   trim: true,
        //   // hideOverlappingLabels: false,
        // },
        labels: {
          show: true,
          // trim: true,
          // hideOverlappingLabels: false,
          align: 'right',
          minWidth: 150,
          // minWidth: 800,
          // minWidth: !this.props.activeModal ? 150 : 400,
          // maxWidth: 500,
          maxWidth: 300,
          style: {
            colors: [],
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
        },
      },
      xaxis: {
        labels: {
          // show: false,
          trim: true,
          hideOverlappingLabels: false,
        },
      },
      legend: {
        show: false,
      },
      tooltip: {
        y: {
          formatter: undefined,
          title: {
            formatter: seriesName => {
              const res = seriesName
                .replace(/^[, ]+|[, ]+$|[, ]+/g, ' ')
                .trim();
              return res;
            },
          },
        },
      },
    };

    this.setState({ options });
  };

  updateChartData = () => {
    const {
      productProcessReducer: { heatMapData },
    } = this.props;

    const options = {
      chart: {
        toolbar: { show: false },
        height: 350,
        type: 'heatmap',
        // width: 900,
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          radius: 0,
          // useFillColorAsStroke: true,
          useFillColorAsStroke: false,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 1,
                name: '',
                color: '#F9EBEA',
              },
              {
                from: 1,
                to: 2,
                name: '',
                color: '#E6B0AA',
              },
              {
                from: 2,
                to: 3,
                name: '',
                color: '#D98880',
              },
              {
                from: 4,
                to: 5,
                name: '',
                color: '#C0392B',
              },
              {
                from: 6,
                to: 7,
                name: '',
                color: '#A93226',
                // color: '',
              },
              {
                from: 8,
                to: 9,
                name: '',
                color: '#7B241C',
              },
              // {
              //   from: 0,
              //   to: 1,
              //   name: '',
              //   color: '',
              // },

              // {
              //   from: 0,
              //   to: 1,
              //   name: 'low',
              //   color: '#00A100', // green
              //   // color: '#B1B424', // green
              // },
              // {
              //   from: 2,
              //   to: 5,
              //   name: 'medium',
              //   color: '#128FD9', // blue // #B1B424
              //   // color: '#007078', // blue // #B1B424
              // },
              // {
              //   from: 6,
              //   to: 15,
              //   name: 'high',
              //   color: '#FFB200',
              // },
              // {
              //   from: 8,
              //   to: 15,
              //   name: 'extreme',
              //   color: '#FF0000',
              // },
            ],
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1,
      },
      // colors: ['#008FFB'],
      title: {
        text: undefined,
      },
      yaxis: {
        // labels: {
        //   // show: false,
        //   trim: true,
        //   // hideOverlappingLabels: false,
        // },
        labels: {
          show: true,
          // trim: true,
          // hideOverlappingLabels: false,
          align: 'right',
          minWidth: 150,
          // minWidth: 800,
          // minWidth: !this.props.activeModal ? 150 : 400,
          // maxWidth: 500,
          maxWidth: 300,
          style: {
            colors: [],
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
        },
      },
      xaxis: {
        labels: {
          // show: false,
          trim: true,
          hideOverlappingLabels: false,
        },
      },
      legend: {
        show: false,
      },
      tooltip: {
        y: {
          formatter: undefined,
          title: {
            formatter: seriesName => {
              const res = seriesName
                .replace(/^[, ]+|[, ]+$|[, ]+/g, ' ')
                .trim();
              return res;
            },
          },
        },
      },
    };

    this.setState(preState => ({
      series: heatMapData,
      options,
      // options: {
      //   ...preState.options,
      //   yaxis: {
      //     ...preState.options.yaxis,
      //     labels: {
      //       ...preState.options.yaxis.labels,
      //     },
      //   },
      // },
    }));
  };

  componentDidMount() {
    this.plotChart();

    const { activeModal, showRightSidebar } = this.props;
    if (activeModal) this.updateChartData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.productProcessReducer.heatMapData !==
      prevProps.productProcessReducer.heatMapData
    ) {
      this.updateChartData();
    }
  }

  render() {
    const { options, series } = this.state;
    const { activeModal, showRightSidebar } = this.props;

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
      height = 550;
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
      width = 1700;
    }

    return (
      <div
        id="chart"
        // style={{ paddingLeft: '30px' }}
        // style={{ width: 'auto' }}
      >
        <ReactApexChart
          options={options}
          series={series}
          type="heatmap"
          // height={!activeModal ? 550 : 650}
          height={height}
          width={width}
          // showRightSidebar && window.innerWidth < 1600
          //   ? 780
          //   : showRightSidebar && window.innerWidth > 1600
          //   ? 1100
          //   : !showRightSidebar && window.innerWidth < 1600
          //   ? 1100
          //   : 1400
          // }
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
