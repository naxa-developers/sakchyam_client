import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Slider from 'react-slick';

import CustomChart from '../CustomChart';
import {
  getIndicatorsGraphData,
  getIndicatorsGraphDataIndividual,
} from '../../actions/logFrame.actions';

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
      filteredDynamicData: [],
      toggleTimePeriodDropdown: false,
      toggleDataDropdown: false,
      selectedDataType: 'Cummulative',
      series: [
        // {
        //   name: 'Planned As per AFP contract Budget',
        //   type: 'column',
        //   data: planned,
        // },
        // {
        //   name: 'Achieved',
        //   type: 'column',
        //   data: achieved,
        // },
        // {
        //   name: 'Planned As per AFP contract Budget',
        //   type: 'line',
        //   data: planned,
        // },
        // {
        //   name: 'Achieved',
        //   type: 'line',
        //   data: achieved,
        // },
        {
          name: 'Achieved',
          type: 'column',
          data: [],
        },
        {
          name: 'Planned As per AFP contract Budget',
          type: 'column',
          data: [],
        },
        {
          name: 'Achieved',
          type: 'line',
          data: [],
        },
        {
          // name: 'Planned',
          name: 'Planned As per AFP contract Budget',
          type: 'line',
          data: [],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          stacked: false,
        },
        responsive: [
          {
            breakpoint: 992,
            options: {
              chart: {
                height: 320,
              },
            },
          },
        ],
        legend: {
          position: 'top',
          horizontalAlign: 'left',
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
          opacity: [0.85, 1, 1],
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: 'vertical',
            opacityFrom: 0.85,
            opacityTo: 0.55,
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
          floating: false,
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
              const roundNumber = Math.round(value);
              //   console.log(roundNumber);
              //   console.log(convert(roundNumber));
              return convert(roundNumber);
            },
          },
          min: 0,
        },
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
        toolbar: {
          show: true,
          // offsetX: 0,
          // offsetY: 0,
          // tools: {
          //   download: true,
          //   selection: true,
          //   zoom: true,
          //   zoomin: true,
          //   zoomout: true,
          //   pan: true,
          //   // reset: true | '<img src="/static/icons/reset.png" width="20">',
          //   // customIcons: []
          // },
          // autoSelected: 'zoom',
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter(y) {
              if (typeof y !== 'undefined') {
                return `${y.toFixed(0)} £`;
              }
              return y;
            },
          },
        },
      },
    };
  }

  filterDataWithDate = () => {
    // eslint-disable-next-line react/destructuring-assignment
    const { activeDate, activeLayer } = this.props;
    const {
      logFrameReducer: { logDataGraph },
    } = this.props;
    // const { statsData } = this.state;
    const filtered = [];
    // eslint-disable-next-line array-callback-return
    activeDate.map(date => {
      // eslint-disable-next-line array-callback-return
      logDataGraph.map(data => {
        if (
          data.year.range === date &&
          data.sub_category.name === activeLayer
        ) {
          filtered.push(data);
        }
      });
    });

    // const filtered = statsData.filter(result => {
    //   return result.year.range === JSON.stringify(d);
    // });
    const planned = filtered.map(el => {
      return el.planned_afp;
    });
    const achieved = filtered.map(el => {
      return el.achieved;
    });
    const label = filtered.map(el => {
      return el.year.name;
    });
    // const category = 'Test Year';
    const category = filtered.map(el => {
      return el.year.name;
    });

    const series = [
      {
        name: 'Planned As per AFP contract Budget Bar',
        type: 'column',
        data: planned,
      },
      {
        name: 'Achieved Bar',
        type: 'column',
        data: achieved,
      },
      {
        name: 'Planned As per AFP contract Budget Line',
        type: 'line',
        data: planned,
      },
      {
        name: 'Achieved Line',
        type: 'line',
        data: achieved,
      },
    ];
    this.setState(prevState => ({
      series,
      options: {
        ...prevState.options,
        labels: label,
        xaxis: { ...prevState.options.xaxis, categories: category },
      },
    }));
  };

  filterDataWithLayer = () => {
    const { activeLayer } = this.props;
    const a = activeLayer;
    //   const that = this;
    //   fetch('https://sakchyam.naxa.com.np/api/v1/log_data_alt')
    //     .then(function(response) {
    //       if (response.status !== 200) {
    //         console.log(
    //           `Looks like there was a problem. Status Code: ${response.status}`,
    //         );
    //         return;
    //       }
    //       // Examine the text in the response
    //       response.json().then(function(data) {
    //         console.log(data, 'data');
    //         that.setState({ statsData: data }, () => {
    // const { statsData } = this.state;
    const {
      logFrameReducer: { logDataGraph },
    } = this.props;
    console.log(logDataGraph, 'logdata');
    const filtered = logDataGraph.filter(result => {
      //   if (result.category === 'IMPACT') {
      //   console.log(a);
      return result.sub_category.name === a;
      //   }
    });
    this.setState({ filteredDynamicData: filtered });
    // console.log(filtered, 'filtered');
    // const { dataType } = filtered[0];
    const dataType = filtered[0].data_type;
    const dataUnit = filtered[0].unit;

    const planned = filtered.map(el => {
      return el.planned_afp;
    });
    const achieved = filtered.map(el => {
      return el.achieved;
    });
    const label = filtered.map(el => {
      //   console.log(el, 'elLabel');
      return el.year.name;
    });
    const category = filtered.map(el => {
      //   console.log(el, 'elLabel');
      return el.year.name;
    });
    const totalDateList = filtered.map(el => {
      // console.log(el, 'elLabel');
      return el.year;
    });
    // console.log(category, 'cat');
    // console.log(label, 'label');
    // console.log(achieved, 'achieved');
    const series = [
      {
        name: 'Planned As per AFP contract Budget Bar',
        type: 'column',
        data: planned,
      },
      {
        name: 'Achieved Bar',
        type: 'column',
        data: achieved,
      },
      {
        name: 'Planned As per AFP contract Budget Line',
        type: 'line',
        data: planned,
      },
      {
        name: 'Achieved Line',
        type: 'line',
        data: achieved,
      },
    ];
    // console.log(series, 'se');
    const { getDateRange } = this.props;
    getDateRange(totalDateList);
    this.setState(prevState => ({
      series,
      options: {
        ...prevState.options,
        labels: label,
        xaxis: { ...prevState.options.xaxis, categories: category },
        yaxis: {
          ...prevState.options.yaxis,
          title: {
            text: `${dataType}  (${dataUnit})`,
          },
        },
      },
    }));

    // this.setState({
    //   series,
    //   options: { ...this.state.options, labels: label },
    // });
  };

  handleSelectedDataType = option => {
    this.setState({ selectedDataType: option });
  };

  componentDidUpdate(prevProps, prevState) {
    // const that = this;
    const { selectedDataType } = this.state;
    const { activeLayer } = this.props;
    if (prevProps.activeLayer !== activeLayer) {
      this.filterDataWithLayer();
      // console.log('xxxss');
      // setTimeout(function() {

      //   console.log('setTimeout');
      // }, 3000);
    }
    const { updateChart } = this.props;
    if (prevProps.updateChart !== updateChart) {
      this.filterDataWithDate();
    }
    if (
      this.props.logFrameReducer.isDataFetched &&
      this.props.logFrameReducer.isDataFetched !==
        prevProps.logFrameReducer.isDataFetched
    ) {
      this.props.handleOneTimeLayerChange();
      // selectActivelayer("activelayer1")
    }
    if (prevState.selectedDataType !== selectedDataType) {
      console.log('selectedDataType');
      if (selectedDataType === 'Individual') {
        this.props.getIndicatorsGraphDataIndividual();
        // this.props.handleOneTimeLayerChange();
        // this.filterDataWithLayer();
      } else {
        this.props.getIndicatorsGraphData();
        // this.props.handleOneTimeLayerChange();
        this.filterDataWithLayer();
      }
    }
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

  componentDidMount() {
    this.props.getIndicatorsGraphData();

    const timeDropdownEl = document.getElementById('duration_id');
    const dataDropdownEl = document.getElementById('data_id');
    // console.log(specifiedElement, 'ss');
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
    //   console.log('s');
    //   this.props.handleOneTimeLayerChange();
    // }, 1000);
  }

  handleBarClick = () => {
    this.chartRef.chart.toggleSeries(
      'Planned As per AFP contract Budget Bar',
    );
    this.chartRef.chart.toggleSeries('Achieved Bar');
  };

  next = () => {
    // console.log('nextttttt');
    const v = document.getElementsByClassName('')[0];
    v.click();
    // this.slider.slickNext();
  };

  previous = () => {
    this.slider.slickPrev();
  };

  render() {
    const {
      series,
      options,
      filteredDynamicData,
      toggleTimePeriodDropdown,
      toggleDataDropdown,
      selectedDataType,
      // dateRange,
    } = this.state;
    // const settings = {
    //   dots: true,
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   afterChange(i) {
    //     // console.log(i, 'aft');
    //     // console.log('after change');
    //   },
    //   beforeChange(j) {
    //     // console.log(j, 'bef');
    //     // console.log('before change');
    //   },
    // };
    const {
      activeLayer,
      activeDate,
      handleActiveDate,
      updateChart,
      dateRange,
      handleModal,
    } = this.props;
    const {
      props: { logFrameReducer },
    } = this;
    return (
      <div className="info-content">
        <a href="#sidebar-toggle" className="toggle_button">
          <i className="material-icons">keyboard_backspace</i>
        </a>
        <div className="info-content-wrap">
          <div className="info-content-header">
            <h5>Logical framework</h5>
            <h2>
              {filteredDynamicData &&
                filteredDynamicData[0] &&
                filteredDynamicData[0].category.title}
            </h2>
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
                      All
                    </span>
                    <ul
                      className={`ul-dropdown ${
                        toggleTimePeriodDropdown ? 'active' : ''
                      }`}
                      id="dropdown-list"
                    >
                      {dateRange.map((d, key) => {
                        return (
                          <li className="checkbox">
                            <input
                              type="checkbox"
                              id={`check_time${key}`}
                              onClick={() => {
                                handleActiveDate(d.range);
                              }}
                              onKeyDown={() => {
                                handleActiveDate(d.range);
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
                        {selectedDataType}
                      </span>
                      <ul
                        className={`ul-dropdown ${
                          toggleDataDropdown ? 'active' : ''
                        }`}
                        id="data-list"
                      >
                        <li
                          className={
                            selectedDataType === 'Cummulative'
                              ? 'li-active'
                              : ''
                          }
                          role="tab"
                          onClick={() => {
                            this.handleSelectedDataType(
                              'Cummulative',
                            );
                          }}
                          onKeyDown={() => {
                            this.handleSelectedDataType(
                              'Cummulative',
                            );
                          }}
                        >
                          Cummulative
                        </li>
                        <li
                          className={
                            selectedDataType === 'Individual'
                              ? 'li-active'
                              : ''
                          }
                          role="tab"
                          onClick={() => {
                            this.handleSelectedDataType('Individual');
                          }}
                          onKeyDown={() => {
                            this.handleSelectedDataType('Individual');
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
                        className="span-label"
                        role="button"
                        tabIndex={0}
                        onKeyDown={this.handleBarClick}
                        onClick={this.handleBarClick}
                      >
                        Bar
                      </span>
                      <span className="span-label">Time graph</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="info-slider">
            <a href="#/" className="download-icon-image">
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
              <CustomChart
                activeLayer={activeLayer}
                activeDate={activeDate}
                updateChart={updateChart}
                series={series}
                options={options}
                chartRef={arg => {
                  this.chartRef = arg;
                }}
              />
              <div id="chartone" />
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
})(MiddleChartSection);
