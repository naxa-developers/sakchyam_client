import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import CustomChart from '../CustomChart';
import {
  getIndicatorsGraphData,
  getIndicatorsGraphDataIndividual,
  filterIndicatorGraphData,
  filterIndicatorGraphDataWithDate,
  loadingTrue,
} from '../../../../actions/logFrame.actions';

function convert(x) {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(x)) return x;

  if (x < 9999) {
    return x;
  }

  if (x < 1000000) {
    return `${Math.round(x / 1000)}K`;
  }
  if (x < 10000000) {
    return `${(x / 1000000).toFixed(2)}M`;
  }

  if (x < 1000000000) {
    return `${Math.round(x / 1000000)}M`;
  }

  if (x < 1000000000000) {
    return `${Math.round(x / 1000000000)}B`;
  }

  return '1T+';
}

class MiddleChartSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // statsData: [],
      // dateRange: [],
      allIndicatorCategory: null,
      selectedOption: null,
      activeBar1: true,
      activeBar2: true,
      activeLine1: true,
      activeLine2: true,
      activeTimeGraph: true,
      activeBar: true,
      toggleTimePeriodDropdown: false,
      toggleDataDropdown: false,
      firstPlannedSelected: false,
      secondAchievedSelected: false,
      options: null,
    };
  }

  plotChart = () => {
    const currentComponent = this;
    const option = {
      options: {
        chart: {
          parentHeightOffset: 15,
          // offsetY: -0,
          toolbar: {
            show: true,
            // offsetX: 0,
            // offsetY: 0,
            tools: {
              // download: `<a href="#/" class="download-icon-image"><img src=${DownloadIcon} alt=""></a>`,
              download: `<i class="fa fa-download" aria-hidden="true"></i>`,
              //   selection: true,
              //   zoom: true,
              //   zoomin: true,
              //   zoomout: true,
              //   pan: true,
              //   // reset: true | '<img src="/static/icons/reset.png" width="20">',
              //   // customIcons: []
            },
            // autoSelected: 'zoom',
          },
          height: 350,
          // width: '100%',
          type: 'line',
          stacked: false,
          events: {
            // eslint-disable-next-line object-shorthand
            legendClick: function(chartContext, seriesIndex, config) {
              //
              // console.log(
              //   currentComponent.state.activeBar1,
              //   'activeBar1',
              // );
              //
              // if (seriesIndex === 0) {
              //
              // }
            },
          },
          // events: {
          //   // eslint-disable-next-line object-shorthand
          //   legendClick: function(chartContext, seriesIndex, config) {
          //
          //   },
          //   // eslint-disable-next-line object-shorthand
          //   click: function(event, chartContext, config) {
          //     // ...
          //     //
          //   },
          // },
        },
        responsive: [
          {
            breakpoint: 992,
            options: {
              chart: {
                height: 320,
                events: {
                  legendClick(chartContext, seriesIndex, config) {},
                },
              },
            },
          },
        ],
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          // markers: {
          //   onClick(chart, seriesIndex, opts) {
          //
          //   },
          // },
          // onItemClick: e => {
          //
          // },
        },
        stroke: {
          width: [0, 1, 1],
          curve: 'straight',
        },
        plotOptions: {
          bar: {
            columnWidth: '20%',
          },
        },
        colors: ['#b41833', '#287078'],
        fill: {
          opacity: [0.45, 0.75, 0.15, 0.2],
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: 'vertical',
            opacityFrom: 0,
            opacityTo: 0,
            stops: [0, 100, 100, 100],
          },
        },
        labels: [
          '01/01/2003',
          '02/01/2003',
          '03/01/2003',
          '04/01/2003',
          '05/01/2003',
          '06/01/2003',
          '07/01/2003',
          '08/01/2003',
          '09/01/2003',
          '10/01/2003',
          '11/01/2003',
          '12/01/2003',
          '01/01/2004',
          '02/01/2004',
        ],
        markers: {
          size: 5,
          offsetX: 0,
          offsetY: 0,
        },
        xaxis: {
          tickAmount: 10,
          crosshairs: {
            show: true,
            position: 'back',
            stroke: {
              color: '#ffffff',
              width: 0,
              dashArray: 0,
            },
          },
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
          ],
          type: 'category',
        },
        yaxis: {
          // floating: true
          decimalsInFloat: 2,
          tickPlacement: 'between',
          // y: 8200,
          // y: 1000,
          crosshairs: {
            show: true,
            position: 'back',
            stroke: {
              color: '#b6b6b6',
              width: 1,
              dashArray: 0,
            },
          },
          title: {
            text: 'Points',

            style: {
              color: undefined,
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-title',
            },
          },
          // floating: true,
          // align: 'center',
          // minWidth: '200',
          // maxWidth: '200',
          labels: {
            show: true,
            align: 'right',
            minWidth: 0,
            maxWidth: 160,
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
            formatter: value => {
              if (value <= 1) {
                return value.toFixed(1);
              }
              //
              const roundNumber = Math.round(value);
              //
              //
              return convert(roundNumber);
            },
          },
          min: 0,
          forceNiceScale: true,
          // axisBorder: {
          //   show: true,
          //   color: '#78909C',
          //   offsetX: 100,
          //   offsetY: 0,
          // },
          // max: 10,
        },
        logarithmic: true,
        title: {
          text: undefined,
          rotate: -90,
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
          },
        },

        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter(y) {
              //
              if (typeof y !== 'undefined') {
                return `${y.toFixed(0)} £`;
              }
              return y;
            },
          },
        },
      },
    };
    this.setState({ options: option.options });
    return true;
  };

  // filterDataWithDate = () => {
  //   // eslint-disable-next-line react/destructuring-assignment
  //   const { activeDate, activeLayer } = this.props;
  //   const {
  //     logFrameReducer: { logDataGraph },
  //   } = this.props;
  //   // const { statsData } = this.state;
  //   const filtered = [];
  //   // eslint-disable-next-line array-callback-return
  //   activeDate.map(date => {
  //     // eslint-disable-next-line array-callback-return
  //     logDataGraph.map(data => {
  //       if (
  //         data.year.range === date &&
  //         data.sub_category.name === activeLayer
  //       ) {
  //         filtered.push(data);
  //       }
  //     });
  //   });

  //   // const filtered = statsData.filter(result => {
  //   //   return result.year.range === JSON.stringify(d);
  //   // });
  //   const planned = filtered.map(el => {
  //     return el.planned_afp;
  //   });
  //   const achieved = filtered.map(el => {
  //     return el.achieved;
  //   });
  //   const label = filtered.map(el => {
  //     return el.year.name;
  //   });
  //   // const category = 'Test Year';
  //   const category = filtered.map(el => {
  //     return el.year.name;
  //   });

  //   const series = [
  //     {
  //       name: 'Planned As per AFP contract Budget Bar',
  //       type: 'column',
  //       data: planned,
  //     },
  //     {
  //       name: 'Achieved ',
  //       type: 'column',
  //       data: achieved,
  //     },
  //     {
  //       name: 'Planned As per AFP contract Budget ',
  //       type: 'line',
  //       data: planned,
  //     },
  //     {
  //       name: 'Achieved Line',
  //       type: 'line',
  //       data: achieved,
  //     },
  //   ];
  //   this.setState(prevState => ({
  //     series,
  //     options: {
  //       ...prevState.options,
  //       labels: label,
  //       xaxis: { ...prevState.options.xaxis, categories: category },
  //     },
  //   }));
  // };

  // filterDataWithLayer = () => {
  //   const { activeLayer } = this.props;
  //   const a = activeLayer;
  //   //   const that = this;
  //   //   fetch('https://sakchyam.naxa.com.np/api/v1/log_data_alt')
  //   //     .then(function(response) {
  //   //       if (response.status !== 200) {
  //   //         console.log(
  //   //           `Looks like there was a problem. Status Code: ${response.status}`,
  //   //         );
  //   //         return;
  //   //       }
  //   //       // Examine the text in the response
  //   //       response.json().then(function(data) {
  //   //
  //   //         that.setState({ statsData: data }, () => {
  //   // const { statsData } = this.state;
  //   const {
  //     logFrameReducer: { logDataGraph },
  //   } = this.props;
  //
  //   const filtered = logDataGraph.filter(result => {
  //     //   if (result.category === 'IMPACT') {
  //     //
  //     return result.sub_category.name === a;
  //     //   }
  //   });
  //   this.setState({ filteredDynamicData: filtered });
  //   //
  //   // const { dataType } = filtered[0];
  //   const dataType = filtered[0].data_type;
  //   const dataUnit = filtered[0].unit;

  //   const planned = filtered.map(el => {
  //     return el.planned_afp;
  //   });
  //   const achieved = filtered.map(el => {
  //     return el.achieved;
  //   });
  //   const label = filtered.map(el => {
  //     //
  //     return el.year.name;
  //   });
  //   const category = filtered.map(el => {
  //     //
  //     return el.year.name;
  //   });
  //   const totalDateList = filtered.map(el => {
  //     //
  //     return el.year;
  //   });
  //   //
  //   //
  //   //
  //   const series = [
  //     {
  //       name: 'Planned As per AFP contract Budget Bar',
  //       type: 'column',
  //       data: planned,
  //     },
  //     {
  //       name: 'Achieved ',
  //       type: 'column',
  //       data: achieved,
  //     },
  //     {
  //       name: 'Planned As per AFP contract Budget ',
  //       type: 'line',
  //       data: planned,
  //     },
  //     {
  //       name: 'Achieved Line',
  //       type: 'line',
  //       data: achieved,
  //     },
  //   ];
  //   //
  //   const { getDateRange } = this.props;
  //   getDateRange(totalDateList);
  //   this.setState(prevState => ({
  //     series,
  //     options: {
  //       ...prevState.options,
  //       labels: label,
  //       xaxis: { ...prevState.options.xaxis, categories: category },
  //       yaxis: {
  //         ...prevState.options.yaxis,
  //         title: {
  //           text: `${dataType}  (${dataUnit})`,
  //         },
  //       },
  //     },
  //   }));

  //   // this.setState({
  //   //   series,
  //   //   options: { ...this.state.options, labels: label },
  //   // });
  // };
  allIndicatorCategorySetState = array => {
    this.setState({ allIndicatorCategory: array });
  };

  // handleClickOnLegend = () => {
  //
  // };

  componentDidMount() {
    // setTimeout(() => {
    //   const firstLegend = document.getElementsByClassName(
    //     'apexcharts-legend-series',
    //   )[0];
    //   // firstLegend.addEventListener('click', function() {
    //   //   alert('clicked First Legend');
    //   // });
    //   // const firstLegend = document.getElementsByClassName(
    //   //   'apexcharts-legend-series',
    //   // )[0];
    //   // const secondLegend = document.getElementsByClassName(
    //   //   'apexcharts-legend-series',
    //   // )[3];
    //   firstLegend.addEventListener('change', event => {
    //
    //     this.setState(prevState => ({
    //       firstPlannedSelected: !prevState.firstPlannedSelected,
    //     }));
    //   });
    // }, 2000);
    // setTimeout(() => {
    //   const secondLegend = document.getElementsByClassName(
    //     'apexcharts-legend-series',
    //   )[3];
    //   // firstLegend.addEventListener('click', function() {
    //   //   alert('clicked First Legend');
    //   // });
    //   // const firstLegend = document.getElementsByClassName(
    //   //   'apexcharts-legend-series',
    //   // )[0];
    //   // const secondLegend = document.getElementsByClassName(
    //   //   'apexcharts-legend-series',
    //   // )[3];
    //   secondLegend.addEventListener('change', event => {
    //
    //     this.setState(prevState => ({
    //       secondAchievedSelected: !prevState.secondAchievedSelected,
    //     }));
    //   });
    // }, 2000);
    // window.addEventListener('resize', this.handleClickOnLegend);
    const { activeLayer, activeDate } = this.props;
    this.props.getIndicatorsGraphData(activeLayer, false);

    const timeDropdownEl = document.getElementById('duration_id');
    const dataDropdownEl = document.getElementById('data_id');
    //
    document.addEventListener('click', async event => {
      const isClickInside = timeDropdownEl.contains(event.target);

      if (!isClickInside) {
        this.setState({
          toggleTimePeriodDropdown: false,
          // searchDropdown: false,
        });
        // the click was outside the specifiedElement, do something
      }
    });
    document.addEventListener('click', async event => {
      const isClickInside = dataDropdownEl.contains(event.target);

      if (!isClickInside) {
        this.setState({
          toggleDataDropdown: false,
          // searchDropdown: false,
        });
        // the click was outside the specifiedElement, do something
      }
    });

    // setTimeout(() => {
    //
    //   this.props.handleOneTimeLayerChange();
    // }, 1000);
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.handleClickOnLegend);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    this.plotChart();

    // window.removeEventListener('resize', this.handleClickOnLegend);
  }

  checkTooltip = () => {
    // alert('ss');
    if (this.state.activeLine1 && this.state.activeBar1) {
      // alert('2selected activeLine1 activeBar1');
      setTimeout(() => {
        document
          .getElementsByClassName(
            'apexcharts-tooltip-series-group',
          )[2]
          .classList.add('none');
      }, 200);
    } else {
      // alert('else activeLine1 activeBar1');
      setTimeout(() => {
        document
          .getElementsByClassName(
            'apexcharts-tooltip-series-group',
          )[2]
          .classList.remove('none');
      }, 200);
    }
    if (this.state.activeLine2 && this.state.activeBar2) {
      // alert('2selected activeLine1 activeBar1');
      setTimeout(() => {
        document
          .getElementsByClassName(
            'apexcharts-tooltip-series-group',
          )[3]
          .classList.add('none');
      }, 200);
    } else {
      // alert('else activeLine1 activeBar1');
      setTimeout(() => {
        document
          .getElementsByClassName(
            'apexcharts-tooltip-series-group',
          )[3]
          .classList.remove('none');
      }, 200);
    }
    // if (this.state.activeBar1 && this.state.activeLine1) {
    //   setTimeout(() => {
    //     document
    //       .getElementsByClassName(
    //         'apexcharts-tooltip-series-group',
    //       )[1]
    //       .classList.remove('none');
    //   }, 2000);
    // } else {
    //   setTimeout(() => {
    //     document
    //       .getElementsByClassName(
    //         'apexcharts-tooltip-series-group',
    //       )[1]
    //       .classList.add('none');
    //   }, 2000);
    // }
    // if (this.state.activeBar2 && this.state.activeLine2) {
    //   setTimeout(() => {
    //     document
    //       .getElementsByClassName(
    //         'apexcharts-tooltip-series-group',
    //       )[2]
    //       .classList.remove('none');
    //   }, 2000);
    // } else {
    //   setTimeout(() => {
    //     document
    //       .getElementsByClassName(
    //         'apexcharts-tooltip-series-group',
    //       )[2]
    //       .classList.add('none');
    //   }, 2000);
    // }
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      props: {
        logFrameReducer: { filteredDynamicData },
      },
    } = this;
    // if (
    //   prevProps.logFrameReducer.filteredDynamicData &&
    //   prevProps.logFrameReducer.filteredDynamicData[0] &&
    //   prevProps.logFrameReducer.filteredDynamicData[0].sub_category
    //     .title !== filteredDynamicData &&
    //   filteredDynamicData[0] &&
    //   filteredDynamicData[0].sub_category.title
    // ) {
    //   // eslint-disable-next-line react/no-did-update-set-state
    //   this.setState({
    //     activeBar: true,
    //     activeBar1: true,
    //     activeBar2: true,
    //     activeLine1: true,
    //     activeLine2: true,
    //     activeTimeGraph: true,
    //   });
    // }
    if (
      prevProps.logFrameReducer.totalRangeDateName !==
      this.props.logFrameReducer.totalRangeDateName
    ) {
      // if (!this.state.activeBar && !this.state.activeTimeGraph) {
      //   // eslint-disable-next-line react/no-did-update-set-state
      //   this.setState({
      //     activeBar1: true,
      //     activeBar2: true,
      //     activeLine1: true,
      //     activeLine2: true,
      //   });
      // }
      this.props.selectAllDate();
    }

    if (
      prevState.activeBar1 !== this.state.activeBar1 ||
      prevState.activeBar2 !== this.state.activeBar2 ||
      prevState.activeLine1 !== this.state.activeLine1 ||
      prevState.activeLine2 !== this.state.activeLine2
    ) {
      // setTimeout(() => {
      this.checkTooltip();
      if (this.state.activeBar1) {
        // setTimeout(() => {
        //   document
        //     .getElementsByClassName(
        //       'apexcharts-tooltip-series-group',
        //     )[1]
        //     .classList.remove('none');
        // }, 2000);
        // setTimeout(() => {
        //   document
        //     .getElementsByClassName(
        //       'apexcharts-tooltip-series-group',
        //     )[2]
        //     .classList.remove('none');
        // }, 2000);
        this.chartRef.chart.showSeries('Planned');
      } else {
        // setTimeout(() => {
        //   document
        //     .getElementsByClassName(
        //       'apexcharts-tooltip-series-group',
        //     )[1]
        //     .classList.add('none');
        // }, 2000);
        // setTimeout(() => {
        //   document
        //     .getElementsByClassName(
        //       'apexcharts-tooltip-series-group',
        //     )[2]
        //     .classList.remove('none');
        // }, 2000);
        this.chartRef.chart.hideSeries('Planned');
      }
      if (this.state.activeBar2) {
        // setTimeout(() => {
        //   document
        //     .getElementsByClassName(
        //       'apexcharts-tooltip-series-group',
        //     )[2]
        //     .classList.remove('none');
        // }, 2000);
        this.chartRef.chart.showSeries('Achieved ');
      } else {
        // setTimeout(() => {
        //   document
        //     .getElementsByClassName(
        //       'apexcharts-tooltip-series-group',
        //     )[2]
        //     .classList.add('none');
        // }, 2000);
        this.chartRef.chart.hideSeries('Achieved ');
      }
      if (this.state.activeLine1) {
        // setTimeout(() => {
        //   document
        //     .getElementsByClassName(
        //       'apexcharts-tooltip-series-group',
        //     )[1]
        //     .classList.remove('none');
        // }, 2000);
        this.chartRef.chart.showSeries('Planned ');
      } else {
        // setTimeout(() => {
        //   document
        //     .getElementsByClassName(
        //       'apexcharts-tooltip-series-group',
        //     )[1]
        //     .classList.add('none');
        // }, 2000);
        this.chartRef.chart.hideSeries('Planned ');
      }
      if (this.state.activeLine2) {
        // setTimeout(() => {
        //   document
        //     .getElementsByClassName(
        //       'apexcharts-tooltip-series-group',
        //     )[1]
        //     .classList.remove('none');
        // }, 2000);
        this.chartRef.chart.showSeries('Achieved');
      } else {
        // setTimeout(() => {
        //   document
        //     .getElementsByClassName(
        //       'apexcharts-tooltip-series-group',
        //     )[1]
        //     .classList.add('none');
        // }, 2000);
        this.chartRef.chart.hideSeries('Achieved');
      }
    }
    if (
      prevProps.logFrameReducer.series !==
      this.props.logFrameReducer.series
    ) {
      if (
        this.state.activeBar1 &&
        this.state.activeBar2 &&
        this.state.activeLine1 &&
        this.state.activeLine2
      ) {
        // alert('updated data');
        setTimeout(() => {
          document
            .getElementsByClassName(
              'apexcharts-tooltip-series-group',
            )[1]
            .classList.add('none');
        }, 500);
        setTimeout(() => {
          document
            .getElementsByClassName(
              'apexcharts-tooltip-series-group',
            )[2]
            .classList.add('none');
        }, 500);
      } else {
        setTimeout(() => {
          document
            .getElementsByClassName(
              'apexcharts-tooltip-series-group',
            )[1]
            .classList.remove('none');
        }, 500);
        setTimeout(() => {
          document
            .getElementsByClassName(
              'apexcharts-tooltip-series-group',
            )[2]
            .classList.remove('none');
        }, 500);
      }
    }
    if (
      prevProps.logFrameReducer.options !==
      this.props.logFrameReducer.options
    ) {
      //
      //
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        options: { ...this.props.logFrameReducer.options },
      });
    }
    if (document.getElementsByClassName('apexcharts-menu-icon')[0]) {
      document.getElementsByClassName(
        'apexcharts-menu-icon',
      )[0].title = 'Export';
    }

    const {
      logFrameReducer: { indicatorCategory },
    } = this.props;
    if (
      prevProps.logFrameReducer.indicatorCategory !==
      indicatorCategory
    ) {
      // this.filterDataWithLayer();
      const b = [];
      const a = indicatorCategory.map(data => {
        data.subcat.map(subdata => {
          return b.push(subdata.name);
        });
        return true;
      });
      //
      this.allIndicatorCategorySetState(b);
      // this.props.filterIndicatorGraphData(activeLayer);
    }
    // const that = this;
    // const { selectedDataType } = this.state;
    const { activeLayer, activeDate } = this.props;
    if (prevProps.activeLayer !== activeLayer) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        activeBar: true,
        activeBar1: true,
        activeBar2: true,
        activeLine1: true,
        activeLine2: true,
        activeTimeGraph: true,
      });
      // this.filterDataWithLayer();
      if (activeDate.length === 0) {
        //
        this.props.filterIndicatorGraphData(activeLayer);
      } else {
        //

        this.props.filterIndicatorGraphDataWithDate(
          activeLayer,
          activeDate,
        );
      }

      //
      // setTimeout(function() {

      //
      // }, 3000);
    }
    const { activeDataType } = this.props;
    if (prevProps.activeDate !== activeDate) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        activeBar: true,
        activeBar1: true,
        activeBar2: true,
        activeLine1: true,
        activeLine2: true,
        activeTimeGraph: true,
      });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        activeBar1: true,
        activeBar2: true,
        activeLine1: true,
        activeLine2: true,
      });
      this.props.filterIndicatorGraphDataWithDate(
        activeLayer,
        activeDate,
      );
    }
    // if (
    //   this.props.logFrameReducer.isDataFetched &&
    //   this.props.logFrameReducer.isDataFetched !==
    //     prevProps.logFrameReducer.isDataFetched
    // ) {
    //   this.props.handleOneTimeLayerChange();
    //   // selectActivelayer("activelayer1")
    // }
    if (prevProps.activeDataType !== activeDataType) {
      this.props.loadingTrue();
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        activeBar1: true,
        activeBar2: true,
        activeLine1: true,
        activeLine2: true,
        activeBar: true,
        activeTimeGraph: true,
      });
      //
      if (activeDataType === 'Individual') {
        if (activeDate.length === 0) {
          this.props.getIndicatorsGraphDataIndividual(
            activeLayer,
            false,
          );
        } else {
          this.props.getIndicatorsGraphDataIndividual(
            activeLayer,
            activeDate,
          );
        }
        // this.filterDataWithLayer();
      } else if (activeDate.length === 0) {
        // if (activeDate.length === 0) {
        this.props.getIndicatorsGraphData(activeLayer, false);
      } else {
        this.props.getIndicatorsGraphData(activeLayer, activeDate);
      }
      // } else {
      //   this.props.getIndicatorsGraphData(activeLayer, activeDate);
      // }
      // this.props.getIndicatorsGraphData(activeLayer, activeDate);
      // this.filterDataWithLayer();
      // }
    }
    const firstLegend = document.getElementsByClassName(
      'apexcharts-legend-series',
    )[0];
    const secondLegend = document.getElementsByClassName(
      'apexcharts-legend-series',
    )[3];
    //
    //
    // firstLegend.addEventListener('click', async event => {
    //
    //   this.chartRef.chart.toggleSeries(
    //     'Planned As per AFP contract Budget Bar',
    //   );
    //   this.chartRef.chart.toggleSeries(
    //     'Planned As per AFP contract Budget ',
    //   );
    // });
    // secondLegend.addEventListener('click', async event => {
    //
    //   this.chartRef.chart.toggleSeries('Achieved ');
    //   this.chartRef.chart.toggleSeries('Achieved Line');
    // });
  }

  handleToggleTimePeriodDropdown = () => {
    this.setState(prevState => ({
      toggleTimePeriodDropdown: !prevState.toggleTimePeriodDropdown,
    }));
  };

  handleToggleDataDropdown = () => {
    this.setState(prevState => ({
      toggleDataDropdown: !prevState.toggleDataDropdown,
    }));
  };

  changedElementCssBar = () => {
    document
      .getElementsByClassName('apexcharts-tooltip-series-group')[0]
      .classList.add('flex');
    document
      .getElementsByClassName('apexcharts-tooltip-series-group')[1]
      .classList.add('none');
    document
      .getElementsByClassName('apexcharts-tooltip-series-group')[2]
      .classList.add('none');
    document
      .getElementsByClassName('apexcharts-tooltip-series-group')[3]
      .classList.add('flex');
  };

  changedElementCssTime = () => {
    document
      .getElementsByClassName('apexcharts-tooltip-series-group')[0]
      .classList.add('flex');
    document
      .getElementsByClassName('apexcharts-tooltip-series-group')[1]
      .classList.add('flex');
    document
      .getElementsByClassName('apexcharts-tooltip-series-group')[2]
      .classList.add('none');
    document
      .getElementsByClassName('apexcharts-tooltip-series-group')[3]
      .classList.add('flex');
  };

  handleBarClick = () => {
    // html2canvas(document.querySelector('.info-content-wrap')[0]).then(
    //   canvas => {
    //     document.body.appendChild(canvas);
    //   },
    // );

    // this.setState(prevState => ({
    //   activeBar: !prevState.activeBar,
    // }));
    this.setState(prevState => ({
      activeBar: prevState.activeBar
        ? prevState.activeTimeGraph
          ? false
          : true
        : true,
    }));
    // if(this.state.activeBar){}

    if (this.state.activeBar) {
      // true === false
      // this.setState({ activeBar1: false, activeBar2: false });
      // this.setState({ activeBar1: false, activeBar2: false });
      if (this.state.activeTimeGraph) {
        this.setState({ activeBar1: false, activeBar2: false });
      }
    } else {
      // false === true
      if (this.state.activeBar1 || this.state.activeLine1) {
        this.setState({ activeBar1: true });
      }
      if (this.state.activeBar2 || this.state.activeLine2) {
        this.setState({ activeBar2: true });
      }
    }
    // if (!this.state.activeTimeGraph && this.state.activeBar) {
    //   this.setState({
    //     activeBar: true,
    //     activeTimeGraph: true,
    //     activeBar1: true,
    //     activeBar2: true,
    //     activeLine1: true,
    //     activeLine2: true,
    //   });
    // }
  };

  handleTimeGraphClick = () => {
    // this.setState(prevState => ({
    //   activeTimeGraph: !prevState.activeTimeGraph,
    // }));
    this.setState(prevState => ({
      activeTimeGraph: prevState.activeTimeGraph
        ? prevState.activeBar
          ? false
          : true
        : true,
    }));

    if (this.state.activeTimeGraph) {
      // true === false
      // this.setState({ activeLine1: false, activeLine2: false });
      if (this.state.activeBar) {
        this.setState({ activeLine1: false, activeLine2: false });
      }
    } else {
      // false === true
      if (this.state.activeBar1 || this.state.activeLine1) {
        this.setState({ activeLine1: true });
      }
      if (this.state.activeBar2 || this.state.activeLine2) {
        this.setState({ activeLine2: true });
      }
    }
    //
    //
    // if (this.state.activeTimeGraph && !this.state.activeBar) {
    //
    //   this.setState({
    //     activeBar: true,
    //     activeTimeGraph: true,
    //     activeBar1: true,
    //     activeBar2: true,
    //     activeLine1: true,
    //     activeLine2: true,
    //   });
    // }
  };

  handleMainCategorySlide = selectedValue => {
    this.props.logFrameReducer.indicatorCategory.map(a => {
      a.subcat.filter(b => {
        if (b.name === selectedValue) {
          return this.props.handleActiveIndicator(a.name);
        }
        return true;
      });
      return true;
    });
  };

  nextBtnClick = () => {
    this.setState({
      activeBar: true,
      activeTimeGraph: true,
      activeBar1: true,
      activeBar2: true,
      activeLine1: true,
      activeLine2: true,
    });
    // console.log(
    //   this.props.logFrameReducer.indicatorCategory.map(a => {
    //     a.subcat.filter(data => data.name === 'Impact Indicator 2');
    //   }),
    //   'filtered data',
    // );

    const activeLayerIndex = this.state.allIndicatorCategory.indexOf(
      this.props.activeLayer,
    );
    const totalNumberofIndex = this.state.allIndicatorCategory.length;
    //
    const addedNumberIndex = activeLayerIndex + 1;
    if (addedNumberIndex < totalNumberofIndex) {
      //
      //
      //
      this.props.handleActiveLayer(
        this.state.allIndicatorCategory[addedNumberIndex],
      );

      this.handleMainCategorySlide(
        this.state.allIndicatorCategory[addedNumberIndex],
      );
      // const b = this.props.logFrameReducer.indicatorCategory.map(
      //   a => {
      //     a.subcat.filter(b => {
      //       if (b.name === this.props.activeLayer) {
      //         return this.props.handleActiveIndicator(a.name);
      //       }
      //     });
      //   },
      // );
      //
      // } else if (addedNumberIndex >= totalNumberofIndex) {
    } else {
      //
      //
      this.props.handleActiveLayer(
        this.state.allIndicatorCategory[0],
      );
      this.handleMainCategorySlide(
        this.state.allIndicatorCategory[0],
      );
    }
    // this.props.handleSelectAllDate(
    //   this.props.logFrameReducer.totalRangeDate,
    // );
    // this.props.handleSelectAllDateName(
    //   this.props.logFrameReducer.totalRangeDateName,
    // );
  };

  prevBtnClick = () => {
    this.setState({
      activeBar: true,
      activeTimeGraph: true,
      activeBar1: true,
      activeBar2: true,
      activeLine1: true,
      activeLine2: true,
    });
    const activeLayerIndex = this.state.allIndicatorCategory.indexOf(
      this.props.activeLayer,
    );
    const totalNumberofIndex = this.state.allIndicatorCategory.length;
    const subtractNumberIndex = activeLayerIndex - 1;
    if (
      subtractNumberIndex < totalNumberofIndex &&
      subtractNumberIndex >= 0
    ) {
      this.props.handleActiveLayer(
        this.state.allIndicatorCategory[subtractNumberIndex],
      );
      this.handleMainCategorySlide(
        this.state.allIndicatorCategory[subtractNumberIndex],
      );
    } else {
      this.props.handleActiveLayer(
        this.state.allIndicatorCategory[totalNumberofIndex - 1],
      );
      this.handleMainCategorySlide(
        this.state.allIndicatorCategory[totalNumberofIndex - 1],
      );
    }
  };

  handleChange = selectedOption => {
    //
    this.setState({ selectedOption });
  };

  handleLegend1Click = () => {
    if (this.state.activeBar1 === true) {
      this.setState({
        activeBar1: false,
        // activeLine2: false,
      });
    } else if (this.state.activeBar) {
      this.setState({
        activeBar1: true,
        // activeLine2: false,
      });
    }
    if (this.state.activeLine1 === true) {
      this.setState({
        activeLine1: false,
      });
    } else if (this.state.activeTimeGraph) {
      this.setState({
        activeLine1: true,
        // activeLine2: false,
      });
    }
  };

  handleLegend2Click = () => {
    if (this.state.activeBar2 === true) {
      this.setState({
        activeBar2: false,
        // activeLine2: false,
      });
    } else if (this.state.activeBar) {
      this.setState({
        activeBar2: true,
        // activeLine2: false,
      });
    }
    if (this.state.activeLine2 === true) {
      this.setState({
        activeLine2: false,
      });
    } else if (this.state.activeTimeGraph) {
      this.setState({
        activeLine2: true,
        // activeLine2: false,
      });
    }
  };

  render() {
    const optionsd = [
      { label: 'Thing 1', value: 1 },
      { label: 'Thing 2', value: 2 },
    ];
    const {
      // series,
      // options,
      toggleTimePeriodDropdown,
      toggleDataDropdown,
      activeBar,
      activeTimeGraph,
      firstPlannedSelected,
      secondAchievedSelected,
      allIndicatorCategory,
      selectedOption,
      selectedDataType,
      activeBar1,
      activeBar2,
      activeLine1,
      activeLine2,
      options,

      // dateRange,
    } = this.state;
    // const settings = {
    //   dots: true,
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   afterChange(i) {
    //     //
    //     //
    //   },
    //   beforeChange(j) {
    //     //
    //     //
    //   },
    // };
    const {
      activeLayer,
      activeDateValues,
      activeDate,
      handleActiveDate,
      updateChart,
      handleModal,
      activeDataType,
      handleSelectedDataType,
    } = this.props;
    const {
      props: {
        logFrameReducer: {
          series,
          dateRange,
          filteredDynamicData,
          isDataFetched,
          indicatorCategory,
        },
      },
    } = this;
    const settings = {
      // dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      // beforeChange: (current, next) => {
      //
      //
      // },
      // afterChange: (current, next) => {
      //
      //
      // },
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div className="info-content">
        <a className="toggle_button">
          <i className="material-icons">keyboard_backspace</i>
        </a>
        <div className="info-content-wrap">
          <div className="info-content-header">
            {/* <h5>Logical framework</h5> */}
            <h3>
              {filteredDynamicData &&
                filteredDynamicData[0] &&
                filteredDynamicData[0].category.title}
            </h3>
            <div className="info-header-top">
              <h3 className="h3-red">
                {filteredDynamicData &&
                  filteredDynamicData[0] &&
                  filteredDynamicData[0].sub_category.title}
              </h3>
              <span className="span_black_15">{activeLayer}</span>
            </div>

            <div className="info-header-bottom">
              <div className="bottom-wrapper">
                <div className="duration-wrap">
                  <span className="span-option">Time period</span>
                  <div
                    className="dropdown"
                    id="duration_id"
                    role="button"
                    tabIndex="-1"
                    onClick={this.handleToggleTimePeriodDropdown}
                    onKeyDown={this.handleToggleTimePeriodDropdown}
                  >
                    <span
                      className={`span-label span-dropdown ${
                        toggleTimePeriodDropdown ? 'span-active' : ''
                      }`}
                    >
                      {activeDateValues.length === 0
                        ? 'Choose Time Period'
                        : activeDateValues.length >= 6
                        ? 'All'
                        : `${activeDateValues}`}
                    </span>
                    <ul
                      className={`ul-dropdown ${
                        toggleTimePeriodDropdown ? 'active' : ''
                      }`}
                      id="dropdown-list"
                    >
                      <li className="checkbox">
                        <input
                          type="checkbox"
                          checked={
                            activeDate.length >= 6 === true
                              ? true
                              : false
                          }
                          id="check_time"
                          onClick={e => {
                            handleActiveDate('All', e);
                          }}
                          onKeyDown={e => {
                            handleActiveDate('All', e);
                          }}
                        />
                        <label htmlFor="check_time">All</label>
                      </li>
                      {dateRange.map((d, key) => {
                        return (
                          <li key={d.id} className="checkbox">
                            <input
                              type="checkbox"
                              checked={
                                activeDate.includes(d.range) === true
                                  ? true
                                  : false
                              }
                              id={`check_time${key}`}
                              onClick={e => {
                                handleActiveDate(d.range, e, d.name);
                              }}
                              onKeyDown={e => {
                                handleActiveDate(d.range, e, d.name);
                              }}
                            />
                            <label htmlFor={`check_time${key}`}>
                              {d.name}
                            </label>
                          </li>
                        );
                      })}

                      {/* <li className="checkbox">
                        <input type="checkbox" id="check_time2" />
                        <label htmlFor="check_time2">
                          Milestone Year 2
                        </label>
                        Milestone Year 2
                      </li>
                      <li className="checkbox">
                        <input type="checkbox" id="check_time3" />
                        <label htmlFor="check_time3">
                          Milestone Year 3
                        </label>
                      </li>
                      <li className="checkbox">
                        <input type="checkbox" id="check_time4" />
                        <label htmlFor="check_time4">
                          Milestone Year 4
                        </label>
                      </li>
                      <li className="checkbox">
                        <input type="checkbox" id="check_time5" />
                        <label htmlFor="check_time5">
                          Milestone Year 5
                        </label>
                        Milestone Year 5
                      </li>
                      <li className="checkbox">
                        <input type="checkbox" id="check_time6" />
                        <label htmlFor="check_time6">
                          Milestone Year 6
                        </label>
                        Milestone Year 6
                      </li> */}
                    </ul>
                    {/* <select>
                      {dateRange.map((d, key) => {
                        return (
                          <option value={d.name}>{d.name}</option>
                        );
                      })}
                    </select> */}
                    {/* <ReactMultiSelectCheckboxes
                      // value={selectedOption}
                      // onChange={this.handleChange}
                      options={optionsd}
                    /> */}
                  </div>
                </div>
                <div className="option-wrap">
                  <div className="data">
                    <span className="span-option">Data</span>
                    <div
                      role="button"
                      tabIndex="-1"
                      onClick={this.handleToggleDataDropdown}
                      onKeyDown={this.handleToggleDataDropdown}
                      className="data-wrap"
                      id="data_id"
                    >
                      <span
                        className={`span-label span-dropdown ${
                          toggleDataDropdown ? 'span-active' : ''
                        }`}
                      >
                        {activeDataType}
                      </span>
                      <ul
                        className={`ul-dropdown ${
                          toggleDataDropdown ? 'active' : ''
                        }`}
                        id="data-list"
                      >
                        <li
                          className={
                            activeDataType === 'Cumulative'
                              ? 'li-active'
                              : ''
                          }
                          role="tab"
                          onClick={() => {
                            handleSelectedDataType('Cumulative');
                          }}
                          onKeyDown={() => {
                            handleSelectedDataType('Cumulative');
                          }}
                        >
                          Cumulative
                        </li>
                        <li
                          // className={
                          //   {activeDataType === 'Individual'
                          //     ? 'li-active'
                          //     : ''}
                          //     activeLayer === 'Output Indicator 2.1' ? 'disabled':''
                          // }
                          className={`${
                            activeDataType === 'Individual'
                              ? 'li-active'
                              : ''
                          } ${
                            activeLayer === 'Output Indicator 2.1'
                              ? 'disabled'
                              : ''
                          }`}
                          role="tab"
                          // style={activeLayer === 'Output Indicator 2.1'? ''}}
                          onClick={() => {
                            handleSelectedDataType('Individual');
                          }}
                          onKeyDown={() => {
                            handleSelectedDataType('Individual');
                          }}
                        >
                          Individual
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="chart">
                    <span className="span-option">Chart</span>
                    <div className="chart-wrap">
                      <span
                        className={`span-label ${
                          activeBar ? 'span-active' : ''
                        }`}
                        role="button"
                        tabIndex="-1"
                        onKeyDown={this.handleBarClick}
                        onClick={this.handleBarClick}
                      >
                        Bar
                      </span>
                      <span
                        className={`span-label ${
                          activeTimeGraph ? 'span-active' : ''
                        }`}
                        role="button"
                        tabIndex="-1"
                        onKeyDown={this.handleTimeGraphClick}
                        onClick={this.handleTimeGraphClick}
                      >
                        Line graph
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="chart-wrap">
            <span
              className={`span-label ${
                activeBar1
                  ? 'span-active'
                  : activeLine1
                  ? 'span-active'
                  : ''
              }`}
              role="button"
              tabIndex="-1"
              onKeyDown={this.handleLegend1Click}
              onClick={this.handleLegend1Click}
            >
              Planned As per AFP contract Budget
            </span>
            <span
              className={`span-label ${
                activeBar2
                  ? 'span-active'
                  : activeLine2
                  ? 'span-active'
                  : ''
              }`}
              role="button"
              tabIndex="-1"
              onKeyDown={this.handleLegend2Click}
              onClick={this.handleLegend2Click}
            >
              Achieved
            </span>
          </div>
          <div className="info-slider">
            <a className="download-icon-image">
              <img src="./img/save_alt.svg" alt="" />
            </a>
            <ul className="download-dropdown">
              <li>
                <a>Download .PNG</a>
              </li>
              <li>
                <a>Download .PDF</a>
              </li>
            </ul>
            <div className="slider-container">
              {/* <div id="chart" /> */}
              {/* <Slider {...settings}> */}
              <button
                onClick={this.prevBtnClick}
                type="button"
                data-role="none"
                className="slick-arrow slick-prev"
                // style="display: block;"
              >
                {' '}
                Previous
              </button>
              <CustomChart
                activeDateValues={activeDateValues}
                activeLayer={activeLayer}
                activeDate={activeDate}
                updateChart={updateChart}
                series={series}
                options={options}
                chartRef={arg => {
                  this.chartRef = arg;
                }}
              />

              <button
                onClick={this.nextBtnClick}
                type="button"
                data-role="none"
                className="slick-arrow slick-next"
                // style="display: block;"
              >
                {' '}
                Next
              </button>
              {/* <CustomChart
                  activeLayer={activeLayer}
                  activeDate={activeDate}
                  updateChart={updateChart}
                  series={series}
                  options={options}
                  chartRef={arg => {
                    this.chartRef2 = arg;
                  }}
                /> */}
              {/* </Slider> */}
              <div id="chartone" />
              <div
                id="center_loader"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                }}
              >
                <label
                  style={{
                    display:
                      activeDateValues.length === 0
                        ? 'block'
                        : activeBar1 === false &&
                          activeBar2 === false &&
                          activeLine1 === false &&
                          activeLine2 === false
                        ? 'block'
                        : 'none',
                    marginLeft: '15px',
                  }}
                >
                  No Data Selected
                </label>
              </div>
              <div
                id="center_loader"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                }}
              >
                <Loader
                  type="Audio"
                  color="#c21c2e"
                  height={100}
                  width={100}
                  visible={!isDataFetched}
                />
                <label
                  style={{
                    display: isDataFetched ? 'none' : 'block',
                    marginLeft: '15px',
                  }}
                >
                  Loading...
                </label>
              </div>
            </div>
          </div>
          <div className="info-content-footer">
            <p className="span_book_14">
              {filteredDynamicData &&
                filteredDynamicData[0] &&
                filteredDynamicData[0].sub_category.description}
            </p>
            <a
              role="button"
              tabIndex="0"
              onClick={handleModal}
              onKeyDown={handleModal}
              className="more"
            >
              more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ logFrameReducer }) => ({
  logFrameReducer,
});
export default connect(mapStateToProps, {
  getIndicatorsGraphData,
  getIndicatorsGraphDataIndividual,
  filterIndicatorGraphData,
  filterIndicatorGraphDataWithDate,
  loadingTrue,
})(MiddleChartSection);
