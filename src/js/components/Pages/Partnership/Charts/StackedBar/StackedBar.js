import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { filterFinancialDataOfDistrictFromProvince } from '../../../../../actions/partnership.actions';
import convert from '../../../../utils/convertNumbers';

class StackedBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {},
    };
  }

  plotChart = () => {
    // console.log(this.props.partnershipReducer, 'partnershipReducer');
    const that = this;
    const series = [
      {
        name: 'Income',
        type: 'column',
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
      },
      {
        name: 'Cashflow',
        type: 'column',
        data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
      },
      {
        name: 'Revenue',
        type: 'line',
        data: [20, 29, 37, 36, 44, 45, 50, 58],
      },
    ];

    const options = {
      chart: {
        height: 350,
        type: 'line',
        stacked: true,
        events: {
          click(
            event,
            chartContext,
            { seriesIndex, dataPointIndex, config },
          ) {
            // console.log(seriesIndex, 'seriesIndex');
            // console.log(event, 'event');
            // console.log(chartContext, 'chartContext');
            // console.log(dataPointIndex, 'dataPointIndex');
            // console.log(config, 'config');
            console.log(
              config.xaxis.categories[dataPointIndex],
              'dataPointIndex Calc',
            );
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
            // console.log(filteredProvinceId, 'filteredProvinceId');
            const finalDistrictId = that.props.partnershipReducer.allDistrictList.filter(
              data => {
                return data.province_id === filteredProvinceId[0].id;
              },
            );
            // console.log(finalDistrictId, 'finalDistrtic');
            const districtIdList = finalDistrictId.map(data => {
              return data.n_code;
            });
            that.props.handleShowBarOf('district');
            // console.log(districtIdList, 'districtIdList');
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
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1, 1, 4],
      },
      title: {
        text: 'XYZ - Stock Analysis (2009 - 2016)',
        align: 'left',
        offsetX: 110,
      },
      xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB',
          },
          labels: {
            style: {
              colors: '#008FFB',
            },
          },
          title: {
            text: 'Income (thousand crores)',
            style: {
              color: '#008FFB',
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        {
          seriesName: 'Income',
          show: true,
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#00E396',
          },
          labels: {
            style: {
              colors: '#00E396',
            },
          },
          //   title: {
          //     text: 'Operating Cashflow (thousand crores)',
          //     style: {
          //       color: '#00E396',
          //     },
          //   },
        },
        {
          seriesName: 'Revenue',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FEB019',
          },
          labels: {
            style: {
              colors: '#FEB019',
            },
          },
          title: {
            text: 'Revenue (thousand crores)',
            style: {
              color: '#FEB019',
            },
          },
        },
      ],
      tooltip: {
        // fixed: {
        //   enabled: true,
        //   position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
        //   offsetY: 30,
        //   offsetX: 60,
        // },
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
      this.updateBarChart();
    }
    // this.updateBarChart();
  }

  updateBarChart = () => {
    const that = this;
    const {
      partnershipReducer: { barDatas },
    } = this.props;
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
        stacked: true,
        events: {
          click(
            event,
            chartContext,
            { seriesIndex, dataPointIndex, config },
          ) {
            // console.log(seriesIndex, 'seriesIndex');
            // console.log(event, 'event');
            // console.log(chartContext, 'chartContext');
            // console.log(dataPointIndex, 'dataPointIndex');
            // console.log(config, 'config');
            console.log(
              config.xaxis.categories[dataPointIndex],
              'dataPointIndex Calc',
            );
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
            // console.log(filteredProvinceId, 'filteredProvinceId');
            const finalDistrictId = that.props.partnershipReducer.allDistrictList.filter(
              data => {
                return data.province_id === filteredProvinceId[0].id;
              },
            );
            // console.log(finalDistrictId, 'finalDistrtic');
            const districtIdList = finalDistrictId.map(data => {
              return data.n_code;
            });
            that.props.handleShowBarOf('district');
            // console.log(districtIdList, 'districtIdList');
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
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1, 1, 4],
      },
      title: {
        text: 'XYZ - Stock Analysis (2009 - 2016)',
        align: 'left',
        offsetX: 110,
      },
      xaxis: {
        categories: barDatas.labels,
      },
      yaxis: [
        {
          min: 0,
          max: 500000,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB',
          },
          labels: {
            style: {
              colors: '#008FFB',
            },
            formatter: value => {
              // console.log(value, 'value');
              return convert(value);
            },
          },
          title: {
            text: 'Income (thousand crores)',
            style: {
              color: '#008FFB',
            },
          },
          // tooltip: {
          //   enabled: true,
          // },
        },
        {
          min: 0,
          max: 5000000,
          seriesName: 'Incomessss',
          show: true,
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#00E396',
          },
          labels: {
            style: {
              colors: '#00E396',
            },
          },
          //   title: {
          //     text: 'Operating Cashflow (thousand crores)',
          //     style: {
          //       color: '#00E396',
          //     },
          //   },
        },
        {
          min: 0,
          max: 5000000,
          seriesName: 'Revenue',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FEB019',
          },
          labels: {
            style: {
              colors: '#FEB019',
            },
            formatter: value => {
              // console.log(value, 'value');
              return convert(value);
            },
          },
          title: {
            text: 'Budget Allocated',
            style: {
              color: '#FEB019',
            },
          },
          // tooltip: {
          //   enabled: true,
          // },
        },
      ],
      tooltip: {
        // fixed: {
        //   enabled: true,
        //   position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
        //   offsetY: 30,
        //   offsetX: 60,
        // },
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40,
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
})(StackedBar);