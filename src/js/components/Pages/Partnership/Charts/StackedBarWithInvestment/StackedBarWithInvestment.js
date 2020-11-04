import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { active } from 'd3';
import { filterBenefBudgetDataForBarClick } from '../../../../../actions/partnership.actions';
import convert from '../../../../utils/convertNumbers';

function shorten(text, max) {
  return text && text.length > max
    ? `${text
        .slice(0, max)
        .split(' ')
        .slice(0, -1)
        .join(' ')}...`
    : text;
}
class StackedBarWithInvestment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {},
      update: false,
    };
  }

  plotChart = () => {
    //
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
            //
            //
            //
            //
            //
            const clickedBar =
              config.xaxis.categories[dataPointIndex];
            // alert(clickedBar);
            if (clickedBar !== undefined) {
              if (
                !document.querySelector(
                  `[data-label='${clickedBar}']`,
                ).checked
              ) {
                document
                  .querySelector(`[data-label='${clickedBar}']`)
                  .click();
              }
              //
              // console.log(`[data-label='${clickedBar}']`);
              // document.querySelector(`.apply-btn`).click();
              if (
                that.props.showBarofInvestmentBudgetBenef ===
                'investmentFocus'
              ) {
                that.props.filterBenefBudgetDataForBarClick(
                  clickedBar,
                );
              }
              that.props.handleShowBarOfInvestmentBudgetBenefBar(
                'projects',
              );
            }
            // if (showBarOf === 'Provinces') {

            //
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
        label: {
          fontSize: '10px',
          // formatter: value => {
          //   if (value.length > 19) {
          //     return value.split(' ');
          //   }
          //   return value;
          // },
        },
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
              //
              if (value && value % 1 !== 0) {
                return convert(value.toFixed(2));
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
              //
              if (value % 1 !== 0) {
                return convert(value.toFixed(2));
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
            color: '#f7bc48',
          },
          labels: {
            style: {
              colors: '#f7bc48',
            },
            formatter: value => {
              //
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
    // alert('didmount 2nd barChart');
    // this.updateBarChart();

    const { activeModal } = this.props;
    if (activeModal) {
      // this.plotChart();
      this.updateBarChart(activeModal);
    }
    if (
      Object.keys(this.props.partnershipReducer.barDatasByInvestment)
        .length > 0
    ) {
      // alert('run');
      this.updateBarChart(activeModal);
    }
    // if (this.state.update === true) {
    //   this.updateBarChart();
    // }
    // this.forceUpdate();
  }

  updateBarChart = () => {
    const that = this;
    const {
      partnershipReducer: { barDatasByInvestment },
      projectSelection,
      activeModal,
    } = this.props;
    const newArray = barDatasByInvestment.series[0].data.map(
      (e, i) => e + barDatasByInvestment.series[1].data[i],
    );
    //
    //
    const maxValue = Math.max(...newArray);
    //
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
            const clickedBar =
              config.xaxis.categories[dataPointIndex];
            // alert(clickedBar);

            if (clickedBar !== undefined) {
              //
              if (
                that.props.showBarofInvestmentBudgetBenef ===
                'investmentFocus'
              ) {
                if (
                  document.querySelector(
                    `[data-label='${clickedBar}']`,
                  ).checked === false
                ) {
                  document
                    .querySelector(`[data-label='${clickedBar}']`)
                    .click();
                }
                // alert(clickedBar);
                setTimeout(() => {
                  that.props.filterBenefBudgetDataForBarClick(
                    clickedBar,
                    projectSelection,
                  );
                }, 1000);
                document.querySelector(`.apply-btn`).click();
              }
              that.props.handleShowBarOfInvestmentBudgetBenefBar(
                'projects',
              );
            }
            //
            // if (showBarof === 'Provinces') {
            //   //
            //   const filteredProvinceId = that.props.partnershipReducer.allProvinceList.filter(
            //     data => {
            //
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
            //
            //   const finalDistrictId = that.props.partnershipReducer.allDistrictList.filter(
            //     data => {
            //       return (
            //         data.province_id === filteredProvinceId[0].id
            //       );
            //     },
            //   );
            //
            //   const districtIdList = finalDistrictId.map(data => {
            //     return data.n_code;
            //   });
            //   that.props.handleShowBarOf('Districts');
            //   //
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
            //   //
            //   const finalMunicipalityId = that.props.partnershipReducer.allMunicipalityList.filter(
            //     data => {
            //       return (
            //         data.district_id === filteredDistrictId[0].id
            //       );
            //     },
            //   );
            //   //
            //   const districtIdList = finalMunicipalityId.map(data => {
            //     return data.code;
            //   });
            //   that.props.handleShowBarOf('Municipality');
            //   //
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
          style: {
            // colors: [],
            fontSize: '10px',
          },
          // formatter: value => {
          //   // const a = 'abc def ghi jkl mno pqr';
          //   if (value.length > 19) {
          //     const splited = value.split(' ');
          //     const combined = [];
          //     for (let i = 0; i < splited.length; i += 2) {
          //       combined.push(`${splited[i]} ${splited[i + 1]}`);
          //     }
          //     return combined;
          //   }
          //   return value;
          // },
          // formatter: value => {
          //   if (value.length > 19) {
          //     return value.split(' ');
          //   }
          //   return value;
          // },

          // formatter: value => {
          //   if (value.length > 19) {
          //     return shorten(value, 19);
          //   }
          //   return value;
          // },
          trim: activeModal ? false : true,
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
            //
            // // //
            // if (that.props.showBarof === 'Provinces') {
            //   return 600000;
            // }
            // if (that.props.showBarof === 'Districts') {
            //   return 80000;
            // }

            return maxValue;
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
              //
              // if (value === 0) {
              //   return value;
              // }
              // if (value === 1) {
              //   return value;
              // }
              // if (value <= 1) {
              //   return value.toFixed(1);
              // }

              // const roundNumber = Math.round(value);
              //
              //
              if (value % 1 !== 0) {
                return convert(value.toFixed(0));
              }
              return convert(Math.trunc(value.toFixed(0)));
            },
            // formatter: value => {
            //   //
            //   return convert(value);
            // },
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
            //
            // if (that.props.showBarof === 'Provinces') {
            //   return 600000;
            // }
            // if (that.props.showBarof === 'Districts') {
            //   return 80000;
            // }

            return maxValue;
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
              if (value % 1 !== 0) {
                return convert(value.toFixed(0));
              }
              return convert(Math.trunc(value.toFixed(0)));
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
              //
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
            //
            if (x.toString().includes('Province')) {
              return `Province ${x}`;
            }
            return x;
          },
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 40,
      },
    };
    this.setState({ options, series: barDatasByInvestment.series });
  };

  componentDidUpdate(prevProps, prevState) {
    const { activeModal } = this.props;
    const {
      partnershipReducer: { barDatasByInvestment },
    } = this.props;
    if (
      prevProps.partnershipReducer.barDatasByInvestment !==
      barDatasByInvestment
    ) {
      this.updateBarChart(activeModal);
    }
    //
    //
    if (prevProps.viewDataBy !== this.props.viewDataBy) {
      // alert('test');
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ update: true });
      this.updateBarChart(activeModal);
    }
  }

  render() {
    const {
      options,
      series,
      update,
      showDataOf,
      viewDataBy,
    } = this.state;
    const { activeModal, cardTitle } = this.props;
    return (
      <div
        id="stackedWithInvestment"
        // style={
        //   viewDataBy !== 'Leverage'
        //     ? { display: 'block' }
        //     : { display: 'none' }
        // }
      >
        <h5 className="graph-title">{cardTitle}</h5>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          // height={activeModal ? 600 : 350}
          height={
            !activeModal
              ? 350
              : activeModal && window.innerWidth < 1400
              ? 500 // modal on and arjun screen size perfect
              : 780
          }
          // width={activeModal ? '290%' : '100%'}

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
