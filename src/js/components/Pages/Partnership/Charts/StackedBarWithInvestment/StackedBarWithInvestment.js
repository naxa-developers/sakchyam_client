import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { filterBenefBudgetDataForBarClick } from '../../../../../actions/partnership.actions';
import convert from '../../../../utils/convertNumbers';

class StackedBarWithInvestment extends Component {
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

            // console.log(filteredProvinceId, 'filteredProvinceID');
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
      // colors: ['#84A59D', '#932F6D', '#43B929'],
      xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
      },

      grid: {
        show: false,
      },
      yaxis: [
        {
          // min: 0,
          max: 600000,
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
          max: 600000,
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
              // console.log(value, 'value');
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
            color: '#f7bc48',
          },
          labels: {
            style: {
              colors: '#f7bc48',
            },
            formatter: value => {
              // console.log(value, 'value');
              return convert(value);
            },
          },
          title: {
            text: 'Budget Allocated',
            style: {
              color: '#f7bc48',
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
      partnershipReducer: { barDatasByInvestment },
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
            // console.log(seriesIndex, 'seriesIndex');
            // console.log(event, 'event');
            // console.log(chartContext, 'chartContext');
            // console.log(dataPointIndex, 'dataPointIndex');
            // console.log(config, 'config');
            const clickedBar =
              config.xaxis.categories[dataPointIndex];

            // console.log(that.state.options.categories, 'categories');
            that.props.filterBenefBudgetDataForBarClick(clickedBar);
            // console.log(showBarof, 'showBarOf');
            // if (showBarof === 'Provinces') {
            //   // console.log(showBarof, 'inside showBarOf');
            //   const filteredProvinceId = that.props.partnershipReducer.allProvinceList.filter(
            //     data => {
            //       console.log(data, 'data');
            //       return (
            //         data.code ===
            //         config.xaxis.categories[dataPointIndex]
            //       );
            //       // return data.label
            //       //   .replace('Province')
            //       //   .includes(
            //       //     config.xaxis.categories[dataPointIndex],
            //       //   );
            //     },
            //   );
            //   console.log(filteredProvinceId, 'filteredProvinceId');
            //   const finalDistrictId = that.props.partnershipReducer.allDistrictList.filter(
            //     data => {
            //       return (
            //         data.province_id === filteredProvinceId[0].id
            //       );
            //     },
            //   );
            //   console.log(finalDistrictId, 'finalDistrtic');
            //   const districtIdList = finalDistrictId.map(data => {
            //     return data.n_code;
            //   });
            //   that.props.handleShowBarOf('Districts');
            //   // console.log(districtIdList, 'districtIdList');
            //   that.props.filterFinancialDataOfDistrictFromProvince(
            //     that.props.viewDataBy,
            //     districtIdList,
            //     partnerSelection,
            //     projectSelection,
            //     projectStatus,
            //   );
            // } else if (showBarof === 'Districts') {
            //   const filteredDistrictId = that.props.partnershipReducer.allDistrictList.filter(
            //     data => {
            //       return data.label.includes(
            //         config.xaxis.categories[dataPointIndex],
            //       );
            //     },
            //   );
            //   // console.log(filteredProvinceId, 'filteredProvinceId');
            //   const finalMunicipalityId = that.props.partnershipReducer.allMunicipalityList.filter(
            //     data => {
            //       return (
            //         data.district_id === filteredDistrictId[0].id
            //       );
            //     },
            //   );
            //   // console.log(finalMunicipalityId, 'finalMunicipalityId');
            //   const districtIdList = finalMunicipalityId.map(data => {
            //     return data.code;
            //   });
            //   that.props.handleShowBarOf('Municipality');
            //   // console.log(districtIdList, 'districtIdList');
            //   that.props.filterFinancialDataOfMunicipalityFromDistrict(
            //     that.props.viewDataBy,
            //     districtIdList,
            //     partnerSelection,
            //     projectSelection,
            //     projectStatus,
            //   );
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
      // title: {
      //   text: 'XYZ - Stock Analysis (2009 - 2016)',
      //   align: 'left',
      //   offsetX: 110,
      // },
      // colors: ['#84A59D', '#932F6D', '#43B929'],
      colors: ['#13A8BE', '#E11D3F', '#f7bc48'],
      xaxis: {
        labels: {
          trim: true,
          hideOverlappingLabels: false,
        },
        categories: barDatasByInvestment.labels,
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
            // console.log(max, 'max');
            // // // console.log(that.props.showBarof, 'showBarof');
            // if (that.props.showBarof === 'Provinces') {
            //   return 600000;
            // }
            // if (that.props.showBarof === 'Districts') {
            //   return 80000;
            // }

            return 1000000;
            // global.totalMaxValue = max / 120;
            // return max / 120;
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
              // console.log(value, 'value');
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
            console.log(max, '2ndmax');
            // console.log(that.props.showBarof, 'showBarof');
            // if (that.props.showBarof === 'Provinces') {
            //   return 600000;
            // }
            // if (that.props.showBarof === 'Districts') {
            //   return 80000;
            // }

            return 1000000;
            // global.totaMaxValue = max / 35;
            // return global.totalMaxValue;
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
              // console.log(value, 'value');
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
            color: '#f7bc48',
          },
          labels: {
            style: {
              colors: '#f7bc48',
            },
            formatter: value => {
              // console.log(value, 'value');
              return convert(value);
            },
          },
          title: {
            text: 'Budget Allocated',
            style: {
              color: '#f7bc48',
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
        x: {
          show: true,
          // format: 'dd MMM',
          formatter(x) {
            // console.log(x, 'x');
            if (x.toString().includes('Province')) {
              return `Province ${x}`;
            }
            return x;
          },
        },
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40,
      },
    };
    this.setState({ options, series: barDatasByInvestment.series });
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      partnershipReducer: { barDatasByInvestment },
    } = this.props;
    if (
      prevProps.partnershipReducer.barDatasByInvestment !==
      barDatasByInvestment
    ) {
      this.updateBarChart();
    }
  }

  render() {
    const { options, series } = this.state;
    const { activeModal } = this.props;
    return (
      <div id="stacked_chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={activeModal ? 600 : 350}
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
  filterBenefBudgetDataForBarClick,
})(StackedBarWithInvestment);
