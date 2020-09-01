import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import convert from '../../../../utils/convertNumbers';
import {
  filterMfsChartDataByDistrict,
  filterMfsMapChartDataByPartner,
  filterMfsMapChartDataByPartnerWithInnovation,
} from '../../../../../actions/mfs.action';
import Achart from './Achart';

function numberWithCommas(x) {
  if (x !== null) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return x;
}
class StackedBarWithAllFederal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Fedseries: [],
      Partnerseries: [],
      options: {},
    };
  }

  plotChart = () => {
    //
    const that = this;
    const { showBarChartBy } = this.props;
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
        type: 'bar',
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
            const clicked = config.xaxis.categories[dataPointIndex];
            if (showBarChartBy === 'Federal') {
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
                  return (
                    data.province_id === filteredProvinceId[0].id
                  );
                },
              );
              //
              const districtIdList = finalDistrictId.map(data => {
                return data.n_code;
              });
              that.props.handleShowBarOf('district');
              //
              that.props.filterMfsChartDataByDistrict(
                that.props.viewDataBy,
                districtIdList,
                partnerSelection,
                projectSelection,
                projectStatus,
              );
            }
            // if (showBarChartBy === 'Partner') {
            // }
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
    this.setState({ options, Fedseries: series });
  };

  componentDidMount() {
    this.plotChart();
    this.props.filterMfsMapChartDataByPartner(
      'district',
      [],
      [],
      [],
      [],
    );
    const { activeModal } = this.props;
    if (activeModal) {
      // this.plotChart();
      this.updateBarChart();
      // this.props.filterMfsMapChartDataByPartner();
    }
    // this.updateBarChart();
  }

  updateBarChart = () => {
    const that = this;
    const {
      mfsReducer: { mfsChartData, mfsChartDataByPartner },
      showBarChartBy,
    } = this.props;
    const { mapViewBy } = this.props;
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
            const {
              selectedPartner,
              selectedInnovation,
              selectedAchievement,
              showBarof,
              showBarPartnerChartOf,
            } = that.props;
            const clicked = config.xaxis.categories[dataPointIndex];
            if (that.props.showBarChartBy === 'Federal') {
              if (clicked !== undefined) {
                if (showBarof === 'Provinces') {
                  //
                  const filteredProvinceId = that.props.provinceList.filter(
                    data => {
                      //
                      // return (
                      //   data.code ===
                      //   config.xaxis.categories[dataPointIndex]
                      // );
                      return data.label.includes(
                        config.xaxis.categories[
                          dataPointIndex
                        ].toUpperCase(),
                      );
                    },
                  );
                  console.log(
                    filteredProvinceId,
                    'filteredProvinceId',
                  );
                  const finalDistrictId = that.props.districtList.filter(
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
                  that.props.filterMfsChartDataByDistrict(
                    'district',
                    districtIdList,
                    selectedPartner,
                    selectedInnovation,
                    selectedAchievement,
                  );
                }
              }
            }
            if (that.props.showBarChartBy === 'Partner') {
              if (showBarPartnerChartOf === 'Partner') {
                that.props.filterMfsMapChartDataByPartnerWithInnovation(
                  mapViewBy,
                  selectedPartner,
                  selectedInnovation,
                  selectedAchievement,
                  [],
                  [],
                  clicked,
                );
                that.props.handleShowBarPartnerChartOf('Innovation');
              }
            }
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [0],
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
        categories:
          showBarChartBy === 'Partner'
            ? mfsChartDataByPartner.labels
            : mfsChartData.labels,
        // title: {
        //   text: 'Provinces',
        // },
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
      tooltip: {
        y: {
          show: true,
          formatter: data => `${numberWithCommas(data)}`,
        },
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40,
      },
    };
    //
    this.setState({
      options,
      Fedseries: mfsChartData.series,
      Partnerseries: mfsChartDataByPartner.series,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      mfsReducer: { mfsChartData, mfsChartDataByPartner },
    } = this.props;
    if (prevProps.mfsReducer.mfsChartData !== mfsChartData) {
      // alert('test');
      this.updateBarChart();
    }
    if (
      prevProps.mfsReducer.mfsChartDataByPartner !==
      mfsChartDataByPartner
    ) {
      // alert('test');
      // eslint-disable-next-line react/no-did-update-set-state
      // this.setState({ test: true });
      this.updateBarChart();
    }

    if (prevProps.showBarChartBy !== this.props.showBarChartBy) {
      // alert(this.props.showBarChartBy);
      // this.updateBarChart();
      if (this.props.showBarChartBy === 'Partner') {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          Partnerseries: this.props.mfsReducer.mfsChartDataByPartner
            .series,
          options: {
            // eslint-disable-next-line react/no-access-state-in-setstate
            ...this.state.options,
            xaxis: {
              categories: this.props.mfsReducer.mfsChartDataByPartner
                .labels,
              // title: {
              //   text: 'Provinces',
              // },
            },
          },
        });
      } else {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          Fedseries: this.props.mfsReducer.mfsChartData.series,
          options: {
            // eslint-disable-next-line react/no-access-state-in-setstate
            ...this.state.options,
            xaxis: {
              categories: this.props.mfsReducer.mfsChartData.labels,
              // title: {
              //   text: 'Provinces',
              // },
            },
          },
        });
      }
    }
    // if (
    //   prevProps.mfsReducer.mfsChartDataByPartner.series !== series
    // ) {
    //   // alert('test');
    //   this.updateBarChart();
    // }
  }

  render() {
    const { options, Fedseries, Partnerseries, test } = this.state;
    const { activeModal, mapViewBy, showBarChartBy } = this.props;
    const {
      mfsReducer: { mfsChartDataByPartner, mfsChartData },
    } = this.props;

    return (
      <div
        id="stacked_chart"
        style={mapViewBy === 'district' ? { width: '2500px' } : {}}
      >
        {showBarChartBy === 'Partner' ? (
          <Achart
            // key={Partnerseries}
            options={options}
            series={Partnerseries || []}
            type="bar"
            height={
              activeModal && window.innerWidth < 1400 ? 450 : 500
            }
            // width={
            //   activeModal && window.innerWidth < 1400 ? 2000 : 2000
            // }
            // width={activeModal === true ? 1600 : '100%'}
          />
        ) : (
          <Achart
            // key={Fedseries}
            options={options}
            series={Fedseries || []}
            type="bar"
            height={
              activeModal && window.innerWidth < 1400 ? 450 : 500
            }
            // width={
            //   activeModal && window.innerWidth < 1400 ? 2000 : 2000
            // }
            // width={activeModal === true ? 1600 : '100%'}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ mfsReducer }) => ({
  mfsReducer,
});
export default connect(mapStateToProps, {
  filterMfsChartDataByDistrict,
  filterMfsMapChartDataByPartner,
  filterMfsMapChartDataByPartnerWithInnovation,
  // filterFinancialDataOfDistrictFromProvince,
  // filterFinancialDataOfMunicipalityFromDistrict,
})(StackedBarWithAllFederal);
