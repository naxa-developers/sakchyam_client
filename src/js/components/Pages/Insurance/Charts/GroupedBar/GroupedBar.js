import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { filterFinancialDataOfDistrictFromProvince } from '../../../../../actions/partnership.actions';

class GroupedBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {},
    };
  }

  plotChart = () => {
    //
    const that = this;
    const series = [
      // {
      //   name: 'PRODUCT A',
      //   data: [44, 55, 41, 67, 22, 43],
      // },
      // {
      //   name: 'PRODUCT B',
      //   data: [13, 23, 20, 8, 13, 27],
      // },
      // {
      //   name: 'PRODUCT C',
      //   data: [11, 17, 15, 15, 21, 14],
      // },
      // {
      //   name: 'PRODUCT D',
      //   data: [21, 7, 25, 13, 22, 8],
      // },
    ];
    const options = {
      chart: {
        type: 'bar',
        height: 350,
        events: {
          click(
            event,
            chartContext,
            { seriesIndex, dataPointIndex, config },
          ) {
            //
            //
            //
            //
            //
            // console.log(
            //   config.xaxis.categories[dataPointIndex],
            //   'dataPointIndex Calc',
            // );
            const {
              partnerSelection,
              projectSelection,
              projectStatus,
              showBarOf,
            } = that.props;
            // if (showBarOf === 'Provinces') {
            const filteredProvinceId = that.props.partnershipReducer.allProvinceList.filter(
              data => {
                return data.name.includes(
                  config.xaxis.categories[dataPointIndex],
                );
              },
            );
            //
            const finalDistrictId = that.props.partnershipReducer.allDistrictList.filter(
              data => {
                return data.province_id === filteredProvinceId[0].id;
              },
            );
            //
            const districtIdList = finalDistrictId.map(data => {
              return data.n_code;
            });
            that.props.handleShowBarOf('district');
            //
            that.props.filterFinancialDataOfDistrictFromProvince(
              that.props.viewDataBy,
              districtIdList,
              partnerSelection,
              projectSelection,
              projectStatus,
            );
            // }
          },
        },
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
        title: {
          text: 'Provinces',
        },
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
          text: 'Beneficiaries',
        },
        crosshairs: {
          show: false,
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        x: {
          formatter(val) {
            return `Province ${val}`;
          },
        },
      },
    };
    this.setState({ options, series });
  };

  componentDidMount() {
    this.plotChart();

    const { activeModal } = this.props;
    if (activeModal) {
      this.updateBarChart();
    }
    // this.updateBarChart();
  }

  updateBarChart = () => {
    const {
      partnershipReducer: { barDatas },
    } = this.props;
    //
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
        crosshairs: {
          show: false,
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        // y: {
        //   formatter(val) {
        //     return `$ ${val} thousands`;
        //   },
        // },
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
export default connect(mapStateToProps, {
  filterFinancialDataOfDistrictFromProvince,
})(GroupedBar);
