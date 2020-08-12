import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import convert from '../../../../utils/convertNumbers';

class StackedBarWithAllFederal extends Component {
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
    // const {
    //   mfsReducer: {
    //     mfsChartData: { series, labels },
    //   },
    // } = this.props;
    const series = [
      // {
      //   name: 'Income',
      //   // type: 'column',
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
        width: 2000,
        type: 'line',
        stacked: true,
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
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1],
      },
      // title: {
      //   text: 'XYZ - Stock Analysis (2009 - 2016)',
      //   align: 'left',
      //   offsetX: 110,
      // },
      colors: ['#13A8BE'],
      // label: labels,
      xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
      },

      grid: {
        show: false,
      },
      // tooltip: {
      //   fixed: {
      //     enabled: true,
      //     position: 'topRight', // topRight, topLeft, bottomRight, bottomLeft
      //     // offsetY: 30,
      //     // offsetX: 60,
      //   },
      // },
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
      mfsReducer: {
        mfsChartData: { series, labels },
      },
    } = this.props;
    // console.log(barDatas, 'barDatas');
    // // alert('test');
    // const newArray = barDatas.series[0].data.map(
    //   (e, i) => e + barDatas.series[1].data[i],
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
        width: 2000,
        type: 'bar',
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
              // console.log(showBarof, 'showBarOf');
              if (showBarof === 'Provinces') {
                // console.log(clicked, 'clicked');
                const filteredProvinceId = that.props.partnershipReducer.allProvinceList.filter(
                  data => {
                    // console.log(data, 'data');
                    // return (
                    //   data.code ===
                    //   config.xaxis.categories[dataPointIndex]
                    // );
                    return data.label.includes(
                      config.xaxis.categories[dataPointIndex],
                    );
                  },
                );
                console.log(filteredProvinceId, 'filteredProvinceId');
                const finalDistrictId = that.props.partnershipReducer.allDistrictList.filter(
                  data => {
                    return (
                      data.province_code ===
                      filteredProvinceId[0].code
                    );
                  },
                );
                // console.log(finalDistrictId, 'finalDistrtic');
                const districtIdList = finalDistrictId.map(data => {
                  return data.n_code;
                });
                that.props.handleShowBarOf('Districts');
                console.log(districtIdList, 'distrList');
                // console.log(districtIdList, 'districtIdList');
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
                // console.log(filteredProvinceId, 'filteredProvinceId');
                const finalMunicipalityId = that.props.partnershipReducer.allMunicipalityList.filter(
                  data => {
                    return (
                      data.district_code ===
                      filteredDistrictId[0].code
                    );
                  },
                );
                // console.log(finalMunicipalityId, 'finalMunicipalityId');
                const districtIdList = finalMunicipalityId.map(
                  data => {
                    return data.code;
                  },
                );
                that.props.handleShowBarOf('Municipality');
                // console.log(districtIdList, 'districtIdList');
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
      plotOptions: {
        bar: {
          columnWidth: '20%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1],
      },
      // title: {
      //   text: 'XYZ - Stock Analysis (2009 - 2016)',
      //   align: 'left',
      //   offsetX: 110,
      // },
      colors: [
        '#256EFF',
        '#FF7F11',
        '#3DDC97',
        '#FF495C',
        '#463F1A',
        '#0D2149',
        '#E1F2FE',
        '#B2B1CF',
        '#826AED',
        '#CAFF8A',
      ],
      xaxis: {
        categories: labels,
        // title: {
        //   text: 'Provinces',
        // },
      },
      grid: {
        show: false,
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
      mfsReducer: {
        mfsChartData: { series },
      },
    } = this.props;
    if (prevProps.mfsReducer.mfsChartData.series !== series) {
      // alert('test');
      this.updateBarChart();
    }
  }

  render() {
    console.log(window.innerWidth);
    const { options, series } = this.state;
    const { activeModal, mapViewBy } = this.props;
    return (
      <div
        id="stacked_chart"
        style={mapViewBy === 'district' ? { width: '2500px' } : {}}
      >
        <ReactApexChart
          key={series}
          options={options}
          series={series}
          type="bar"
          height={activeModal && window.innerWidth < 1400 ? 450 : 500}
          // width={
          //   activeModal && window.innerWidth < 1400 ? 2000 : 2000
          // }
          // width={activeModal === true ? 1600 : '100%'}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ mfsReducer }) => ({
  mfsReducer,
});
export default connect(mapStateToProps, {
  // filterFinancialDataOfDistrictFromProvince,
  // filterFinancialDataOfMunicipalityFromDistrict,
})(StackedBarWithAllFederal);
