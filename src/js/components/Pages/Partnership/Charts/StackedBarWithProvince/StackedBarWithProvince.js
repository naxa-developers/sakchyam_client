import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { func } from 'prop-types';
import {
  filterFinancialDataOfDistrictFromProvince,
  filterFinancialDataOfMunicipalityFromDistrict,
} from '../../../../../actions/partnership.actions';
import convert from '../../../../utils/convertNumbers';

class StackedBarWithProvince extends Component {
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
    const {
      partnershipReducer: { barDatasOfProvinceOnly },
    } = this.props;
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
        stacked: true,
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
          columnWidth: '40%',
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
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
      },

      grid: {
        show: false,
      },
      yaxis: [
        {
          // min: 0,
          // max: 600000,
          // max(max) {
          //   const newArray = barDatas.series[0].data.map(
          //     (e, i) => e + barDatas.series[1].data[i],
          //   );
          //   //
          //   //
          //   global.maxValue = Math.max(...newArray);
          //   //
          //   // //
          //   // if (that.props.showBarof === 'Provinces') {
          //   //   return 600000;
          //   // }
          //   // if (that.props.showBarof === 'Districts') {
          //   //   return 80000;
          //   // }

          //   // return 10000;
          //   // global.totalMaxValue = max / 120;
          //   return global.maxValue;
          // },

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
              //
              return convert(value);
            },
          },
          title: {
            text: 'Beneficiaries (Male & Female)',
            style: {
              color: '#008FFB',
            },
          },
          // tooltip: {
          //   enabled: true,
          // },
        },
        {
          // min: 0,
          // max: 600000,
          // max(max) {
          //   return global.maxValue;
          // },
          seriesName: 'Incomessss',
          show: false,
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
            formatter: value => {
              //
              return convert(value);
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
          // min: 0,

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
              //
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
      partnershipReducer: { barDatasOfProvinceOnly },
    } = this.props;

    // alert('test');
    const newArray = barDatasOfProvinceOnly.series[0].data.map(
      (e, i) => e + barDatasOfProvinceOnly.series[1].data[i],
    );
    //
    //
    const maxValue = Math.max(...newArray);

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
        height: 350,
        type: 'line',
        stacked: true,
        toolbar: {
          show: false,
          // download: false,
        },
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

            const clicked = config.xaxis.categories[dataPointIndex];
            if (clicked !== undefined) {
              const {
                partnerSelection,
                investmentFocusSelection,
                partnerTypeSelection,
                projectSelection,
                projectStatus,
                showBarof,
              } = that.props;
              //
              if (showBarof === 'Provinces') {
                //
                const filteredProvinceId = that.props.partnershipReducer.allProvinceList.filter(
                  data => {
                    //
                    // return (
                    //   data.code ===
                    //   config.xaxis.categories[dataPointIndex]
                    // );
                    return data.label.includes(
                      config.xaxis.categories[dataPointIndex],
                    );
                  },
                );

                const finalDistrictId = that.props.partnershipReducer.allDistrictList.filter(
                  data => {
                    return (
                      data.province_code ===
                      filteredProvinceId[0].code
                    );
                  },
                );
                //
                const districtIdList = finalDistrictId.map(data => {
                  return data.n_code;
                });
                that.props.handleShowBarOf('Districts');

                //
                that.props.filterFinancialDataOfDistrictFromProvince(
                  that.props.viewDataBy,
                  districtIdList,
                  investmentFocusSelection,
                  partnerSelection,
                  partnerTypeSelection,
                  projectSelection,
                  projectStatus,
                );
              } else if (showBarof === 'Districts') {
                const filteredDistrictId = that.props.partnershipReducer.allDistrictList.filter(
                  data => {
                    return data.label.includes(
                      config.xaxis.categories[dataPointIndex],
                    );
                  },
                );
                //
                const finalMunicipalityId = that.props.partnershipReducer.allMunicipalityList.filter(
                  data => {
                    return (
                      data.district_code ===
                      filteredDistrictId[0].code
                    );
                  },
                );
                //
                const districtIdList = finalMunicipalityId.map(
                  data => {
                    return data.code;
                  },
                );
                that.props.handleShowBarOf('Municipality');
                //
                that.props.filterFinancialDataOfMunicipalityFromDistrict(
                  that.props.viewDataBy,
                  districtIdList,
                  investmentFocusSelection,
                  partnerSelection,
                  partnerTypeSelection,
                  projectSelection,
                  projectStatus,
                );
              }
            }
          },
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
        categories: barDatasOfProvinceOnly.labels,
        // title: {
        //   text: 'Provinces',
        // },
      },
      grid: {
        show: false,
      },
      yaxis: [
        {
          // min: 0,
          max(max) {
            // alert('inside max');
            //
            // const newArray = barDatas.series[0].data.map(
            //   (e, i) => e + barDatas.series[1].data[i],
            // );
            // //
            // //
            // const maxValue = Math.max(...newArray);
            //
            // //
            // if (that.props.showBarof === 'Provinces') {
            //   return 600000;
            // }
            // if (that.props.showBarof === 'Districts') {
            //   return 80000;
            // }

            // return 10000;
            // global.totalMaxValue = max / 120;

            return maxValue;
          },
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
              if (value % 1 !== 0) {
                return convert(value.toFixed(0));
              }
              return convert(value);
            },
          },
          title: {
            text: 'Beneficiaries (Male & Female)',
            style: {
              color: '#008FFB',
            },
          },
          // tooltip: {
          //   enabled: true,
          // },
        },
        {
          // min: 0,
          max(max) {
            //
            // const newArray = barDatas.series[0].data.map(
            //   (e, i) => e + barDatas.series[1].data[i],
            // );
            // //
            // //
            // const maxValue = Math.max(...newArray);
            //

            //
            // //
            // if (that.props.showBarof === 'Provinces') {
            //   return 600000;
            // }
            // if (that.props.showBarof === 'Districts') {
            //   return 80000;
            // }

            // return 10000;
            // global.totaMaxValue = max / 35;

            return maxValue;
          },
          seriesName: 'Incomessss',
          show: false,
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
            formatter: value => {
              if (value % 1 !== 0) {
                return convert(value.toFixed(0));
              }
              return convert(value);
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
          // min: 0,
          // max: 5000000,
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
              //
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
            //
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
    //
    this.setState({ options, series: barDatasOfProvinceOnly.series });
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      partnershipReducer: { barDatasOfProvinceOnly },
    } = this.props;
    if (
      prevProps.partnershipReducer.barDatasOfProvinceOnly !==
      barDatasOfProvinceOnly
    ) {
      // alert('test');
      this.updateBarChart();
    }
  }

  render() {
    const { options, series } = this.state;
    const { activeModal } = this.props;
    return (
      <div id="stacked_chart">
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
const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});
export default connect(mapStateToProps, {
  filterFinancialDataOfDistrictFromProvince,
  filterFinancialDataOfMunicipalityFromDistrict,
})(StackedBarWithProvince);
