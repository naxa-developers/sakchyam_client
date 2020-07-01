import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import {
  filterFinancialDataOfDistrictFromProvince,
  filterFinancialDataOfMunicipalityFromDistrict,
  getLeverageData,
} from '../../../../../actions/partnership.actions';
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
      // {
      //   name: 'Income',
      //   type: 'column',
      //   data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
      // },
      // {
      //   name: 'Cashflow',
      //   type: 'column',
      //   data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
      // },
      // {
      //   name: 'Revenue',
      //   type: 'line',
      //   data: [20, 29, 37, 36, 44, 45, 50, 58],
      // },
    ];

    const options = {
      chart: {
        height: 350,
        type: 'line',
        // events: {
        //   click(
        //     event,
        //     chartContext,
        //     { seriesIndex, dataPointIndex, config },
        //   ) {
        //     // console.log(seriesIndex, 'seriesIndex');
        //     // console.log(event, 'event');
        //     // console.log(chartContext, 'chartContext');
        //     // console.log(dataPointIndex, 'dataPointIndex');
        //     // console.log(config, 'config');
        //     console.log(
        //       config.xaxis.categories[dataPointIndex],
        //       'dataPointIndex Calc',
        //     );
        //     const {
        //       partnerSelection,
        //       projectSelection,
        //       projectStatus,
        //       showBarOf,
        //     } = that.props;
        //     // if (showBarOf === 'Provinces') {
        //     const filteredProvinceId = that.props.partnershipReducer.allProvinceList.filter(
        //       data => {
        //         return data.name.includes(
        //           config.xaxis.categories[dataPointIndex],
        //         );
        //       },
        //     );
        //     // console.log(filteredProvinceId, 'filteredProvinceId');
        //     const finalDistrictId = that.props.partnershipReducer.allDistrictList.filter(
        //       data => {
        //         return data.province_id === filteredProvinceId[0].id;
        //       },
        //     );
        //     // console.log(finalDistrictId, 'finalDistrtic');
        //     const districtIdList = finalDistrictId.map(data => {
        //       return data.n_code;
        //     });
        //     that.props.handleShowBarOf('district');
        //     // console.log(districtIdList, 'districtIdList');
        //     that.props.filterFinancialDataOfDistrictFromProvince(
        //       that.props.viewDataBy,
        //       districtIdList,
        //       partnerSelection,
        //       projectSelection,
        //       projectStatus,
        //     );
        //     // }
        //   },
        // },
      },
      plotOptions: {
        bar: {
          columnWidth: '40%',
          //  horizontal: true,
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
      colors: ['#13A8BE', '#5ae7a6'],
      xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
        labels: {
          show: false,
          hideOverlappingLabels: false,
        },
      },

      grid: {
        show: false,
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
            text: 'S-CF Funds',
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
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40,
      },
    };
    this.setState({ series });
  };

  componentDidMount() {
    this.plotChart();
    this.props.getLeverageData();
    const { activeModal } = this.props;
    if (activeModal) {
      this.updateBarChart();
    }
    // this.updateBarChart();
  }

  updateBarChart = () => {
    const that = this;
    const {
      partnershipReducer: { barDataByLeverage },
    } = this.props;
    // console.log(this.props.partnershipReducer, 'partnershipReducer');
    const series = [
      barDataByLeverage.scf.series[0],
      barDataByLeverage.leverage.series[0],
    ];
    const options = {
      chart: {
        height: 350,
        type: 'line',
        // events: {
        //   click(
        //     event,
        //     chartContext,
        //     { seriesIndex, dataPointIndex, config },
        //   ) {
        //     // console.log(seriesIndex, 'seriesIndex');
        //     // console.log(event, 'event');
        //     // console.log(chartContext, 'chartContext');
        //     // console.log(dataPointIndex, 'dataPointIndex');
        //     // console.log(config, 'config');
        //     // console.log(
        //     //   config.xaxis.categories[dataPointIndex],
        //     //   'dataPointIndex Calc',
        //     // );
        //     const {
        //       partnerSelection,
        //       projectSelection,
        //       projectStatus,
        //       showBarof,
        //     } = that.props;
        //     // console.log(showBarof, 'showBarOf');
        //     if (showBarof === 'Provinces') {
        //       // console.log(showBarof, 'inside showBarOf');
        //       const filteredProvinceId = that.props.partnershipReducer.allProvinceList.filter(
        //         data => {
        //           return data.label.includes(
        //             config.xaxis.categories[dataPointIndex],
        //           );
        //         },
        //       );
        //       // console.log(filteredProvinceId, 'filteredProvinceId');
        //       const finalDistrictId = that.props.partnershipReducer.allDistrictList.filter(
        //         data => {
        //           return (
        //             data.province_id === filteredProvinceId[0].id
        //           );
        //         },
        //       );
        //       // console.log(finalDistrictId, 'finalDistrtic');
        //       const districtIdList = finalDistrictId.map(data => {
        //         return data.n_code;
        //       });
        //       that.props.handleShowBarOf('Districts');
        //       // console.log(districtIdList, 'districtIdList');
        //       that.props.filterFinancialDataOfDistrictFromProvince(
        //         that.props.viewDataBy,
        //         districtIdList,
        //         partnerSelection,
        //         projectSelection,
        //         projectStatus,
        //       );
        //     } else if (showBarof === 'Districts') {
        //       const filteredDistrictId = that.props.partnershipReducer.allDistrictList.filter(
        //         data => {
        //           return data.label.includes(
        //             config.xaxis.categories[dataPointIndex],
        //           );
        //         },
        //       );
        //       // console.log(filteredProvinceId, 'filteredProvinceId');
        //       const finalMunicipalityId = that.props.partnershipReducer.allMunicipalityList.filter(
        //         data => {
        //           return (
        //             data.district_id === filteredDistrictId[0].id
        //           );
        //         },
        //       );
        //       // console.log(finalMunicipalityId, 'finalMunicipalityId');
        //       const districtIdList = finalMunicipalityId.map(data => {
        //         return data.code;
        //       });
        //       that.props.handleShowBarOf('Municipality');
        //       // console.log(districtIdList, 'districtIdList');
        //       that.props.filterFinancialDataOfMunicipalityFromDistrict(
        //         that.props.viewDataBy,
        //         districtIdList,
        //         partnerSelection,
        //         projectSelection,
        //         projectStatus,
        //       );
        //     }
        //   },
        // },
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
      xaxis: {
        categories: barDataByLeverage.scf.labels,
        labels: {
          // show: false,
          trim: true,
          hideOverlappingLabels: false,
        },
      },
      yaxis: [
        {
          // min: 0,
          // max: 600000,
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
            text: 'S-CF Funds',
            style: {
              color: '#008FFB',
            },
          },
          // tooltip: {
          //   enabled: true,
          // },
        },
        // {
        //   // min: 0,
        //   max: 600000,
        //   seriesName: 'Incomessss',
        //   show: false,
        //   opposite: true,
        //   axisTicks: {
        //     show: true,
        //   },
        //   axisBorder: {
        //     show: true,
        //     color: '#00E396',
        //   },
        //   labels: {
        //     style: {
        //       colors: '#00E396',
        //     },
        //   },
        //   //   title: {
        //   //     text: 'Operating Cashflow (thousand crores)',
        //   //     style: {
        //   //       color: '#00E396',
        //   //     },
        //   //   },
        // },
        {
          // min: 0,
          // max: 5000000,
          seriesName: 'Revenue',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#5ae7a6',
          },
          labels: {
            style: {
              colors: '#5ae7a6',
            },
            formatter: value => {
              // console.log(value, 'value');
              return convert(value);
            },
          },
          title: {
            text: 'Leverage',
            style: {
              color: '#5ae7a6',
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
    this.setState({ options, series });
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      partnershipReducer: { barDataByLeverage },
    } = this.props;
    if (
      prevProps.partnershipReducer.barDataByLeverage !==
      barDataByLeverage
    ) {
      console.log(barDataByLeverage, 'projectList');
      this.updateBarChart();
    }
  }

  render() {
    const { options, series } = this.state;
    const { activeModal } = this.props;
    return (
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={activeModal ? 600 : 350}
        // width={activeModal === true ? 1600 : '100%'}
      />
    );
  }
}
const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});
export default connect(mapStateToProps, {
  filterFinancialDataOfDistrictFromProvince,
  filterFinancialDataOfMunicipalityFromDistrict,
  getLeverageData,
})(StackedBar);
