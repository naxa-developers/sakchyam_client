import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { func } from 'prop-types';

class StackedBarWithProvince extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {},
    };
  }

  plotChart = () => {
    console.log(this.props.partnershipReducer, 'partnershipReducer');
    const that = this;
    const {
      logFrameReducer: { series },
    } = that.props;
    // const series = [
    //   // {
    //   //   name: 'Income',
    //   //   type: 'column',
    //   //   data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
    //   // },
    //   // {
    //   //   name: 'Cashflow',
    //   //   type: 'column',
    //   //   data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
    //   // },
    //   // {
    //   //   name: 'Revenue',
    //   //   type: 'line',
    //   //   data: [20, 29, 37, 36, 44, 45, 50, 58],
    //   // },
    // ];

    const options = {
      chart: {
        height: 350,
        type: 'line',
        stacked: true,
      },
      plotOptions: {
        bar: {
          columnWidth: '40%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1, 1, 1],
      },
      // title: {
      //   text: 'XYZ - Stock Analysis (2009 - 2016)',
      //   align: 'left',
      //   offsetX: 110,
      // },
      colors: ['#13A8BE', '#E11D3F', '#f7bc48', '#000'],
      xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014],
      },

      grid: {
        show: false,
      },

      markers: {
        size: 5,
        colors: ['#f7bc48'],
        strokeColor: '#f7bc48',
        strokeWidth: 3,
      },
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topRight', // topRight, topLeft, bottomRight, bottomLeft
          // offsetY: 30,
          // offsetX: 60,
        },
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40,
      },
    };
    this.setState({ options, series });
  };

  componentDidMount() {
    this.plotChart();

    const { activeModal } = this.props;
    if (activeModal) {
      // this.plotChart();
      this.updateBarChart();
    }
    // this.updateBarChart();
  }

  updateBarChart = () => {
    const that = this;
    const {
      logFrameReducer: { series },
    } = that.props;
    // console.log(barDatasOfProvinceOnly, 'barDatas');
    // alert('test');
    // const newArray = barDatasOfProvinceOnly.series[0].data.map(
    //   (e, i) => e + barDatasOfProvinceOnly.series[1].data[i],
    // );
    // console.log(newArray, 'newArray');
    // console.log(Math.max(...newArray));
    // const maxValue = Math.max(...newArray);
    // console.log(maxValue, 'maxValue');
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
        type: 'line',
        // stacked: true,
        toolbar: {
          show: false,
          // download: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1, 1, 4],
      },
      // title: {
      //   text: 'XYZ - Stock Analysis (2009 - 2016)',
      //   align: 'left',
      //   offsetX: 110,
      // },
      colors: ['#13A8BE', '#E11D3F', '#f7bc48'],
      xaxis: {
        // categories: series.labels,
        // title: {
        //   text: 'Provinces',
        // },
      },
      grid: {
        show: false,
      },

      markers: {
        size: 5,
        colors: ['#f7bc48'],
        strokeColor: '#f7bc48',
        strokeWidth: 3,
      },
      tooltip: {
        // fixed: {
        //   enabled: true,
        //   position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
        //   offsetY: 30,
        //   offsetX: 60,
        // },
        fixed: {
          enabled: true,
          position: 'topRight',
          offsetX: 0,
          offsetY: 0,
        },
        x: {
          show: true,
          // format: 'dd MMM',
          formatter(x) {
            // console.log(x, 'x');
            // if (x.toString().includes('Province')) {
            //   return `Province ${x}`;
            // }
            return x;
          },
        },
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40,
      },
    };
    // console.log(barDatas.series, 'bardataxx');
    this.setState({ options, series });
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      logFrameReducer: { series },
    } = this.props;
    if (prevProps.logFrameReducer.series !== series) {
      // alert('test');
      this.updateBarChart();
    }
  }

  render() {
    const { options, series } = this.state;
    const { activeModal } = this.props;
    return (
      <div
        id="stacked_chart"
        style={{ width: '1500px', height: '350px', left: '119px' }}
      >
        <ReactApexChart
          key={series}
          options={options}
          series={series}
          type="bar"
          height={activeModal ? 550 : 350}
          // width={activeModal === true ? 1600 : '100%'}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ logFrameReducer }) => ({
  logFrameReducer,
});
export default connect(mapStateToProps, {})(StackedBarWithProvince);
