import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import Slider from 'react-slick';
import CustomChart from '../CustomChart';
import {
  getIndicatorsGraphData,
  getIndicatorsGraphDataIndividual,
  filterIndicatorGraphData,
  filterIndicatorGraphDataWithDate,
} from '../../../../actions/logFrame.actions';

class MiddleChartSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // statsData: [],
      // dateRange: [],
      allIndicatorCategory: null,
      selectedOption: null,
      activeTimeGraph: true,
      activeBar: true,
      toggleTimePeriodDropdown: false,
      toggleDataDropdown: false,
    };
  }

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
  //       name: 'Achieved Bar',
  //       type: 'column',
  //       data: achieved,
  //     },
  //     {
  //       name: 'Planned As per AFP contract Budget Line',
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
  //   //         console.log(data, 'data');
  //   //         that.setState({ statsData: data }, () => {
  //   // const { statsData } = this.state;
  //   const {
  //     logFrameReducer: { logDataGraph },
  //   } = this.props;
  //   console.log(logDataGraph, 'logdata');
  //   const filtered = logDataGraph.filter(result => {
  //     //   if (result.category === 'IMPACT') {
  //     //   console.log(a);
  //     return result.sub_category.name === a;
  //     //   }
  //   });
  //   this.setState({ filteredDynamicData: filtered });
  //   // console.log(filtered, 'filtered');
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
  //     //   console.log(el, 'elLabel');
  //     return el.year.name;
  //   });
  //   const category = filtered.map(el => {
  //     //   console.log(el, 'elLabel');
  //     return el.year.name;
  //   });
  //   const totalDateList = filtered.map(el => {
  //     // console.log(el, 'elLabel');
  //     return el.year;
  //   });
  //   // console.log(category, 'cat');
  //   // console.log(label, 'label');
  //   // console.log(achieved, 'achieved');
  //   const series = [
  //     {
  //       name: 'Planned As per AFP contract Budget Bar',
  //       type: 'column',
  //       data: planned,
  //     },
  //     {
  //       name: 'Achieved Bar',
  //       type: 'column',
  //       data: achieved,
  //     },
  //     {
  //       name: 'Planned As per AFP contract Budget Line',
  //       type: 'line',
  //       data: planned,
  //     },
  //     {
  //       name: 'Achieved Line',
  //       type: 'line',
  //       data: achieved,
  //     },
  //   ];
  //   // console.log(series, 'se');
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

  componentDidUpdate(prevProps, prevState) {
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
      console.log(b);
      this.allIndicatorCategorySetState(b);
      // this.props.filterIndicatorGraphData(activeLayer);
    }
    // const that = this;
    // const { selectedDataType } = this.state;
    const { activeLayer, activeDate } = this.props;
    if (prevProps.activeLayer !== activeLayer) {
      // this.filterDataWithLayer();
      if (activeDate.length === 0) {
        console.log('if active layer changed');
        this.props.filterIndicatorGraphData(activeLayer);
      } else {
        console.log('else active layer changed');

        this.props.filterIndicatorGraphDataWithDate(
          activeLayer,
          activeDate,
        );
      }

      // console.log('xxxss');
      // setTimeout(function() {

      //   console.log('setTimeout');
      // }, 3000);
    }
    const { updateChart, activeDataType } = this.props;
    if (prevProps.updateChart !== updateChart) {
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
      console.log(activeDataType, 'change datatype');
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
      } else {
        this.props.getIndicatorsGraphData(activeLayer, activeDate);
        // this.filterDataWithLayer();
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
    const { activeLayer, activeDate } = this.props;
    this.props.getIndicatorsGraphData(activeLayer, false);

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
    this.setState(prevState => ({
      activeBar: !prevState.activeBar,
    }));
    this.chartRef.chart.toggleSeries(
      'Planned As per AFP contract Budget Bar',
    );
    this.chartRef.chart.toggleSeries('Achieved Bar');
  };

  handleTimeGraphClick = () => {
    this.setState(prevState => ({
      activeTimeGraph: !prevState.activeTimeGraph,
    }));
    this.chartRef.chart.toggleSeries(
      'Planned As per AFP contract Budget Line',
    );
    this.chartRef.chart.toggleSeries('Achieved Line');
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
    // console.log(totalNumberofIndex, 'totalnumberindex');
    const addedNumberIndex = activeLayerIndex + 1;
    if (addedNumberIndex < totalNumberofIndex) {
      // console.log(totalNumberofIndex, 'totalNumber index if');
      // console.log(addedNumberIndex, 'activeLayer + 1 index if');
      // console.log('error');
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
      // console.log(b, 'bbbb');
      // } else if (addedNumberIndex >= totalNumberofIndex) {
    } else {
      // console.log(totalNumberofIndex, 'totalNumber index else if');
      // console.log(addedNumberIndex, 'activeLayer + 1 index else if');
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
    console.log('selectedOption', selectedOption);
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption),
    );
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
      allIndicatorCategory,
      selectedOption,
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
          options,
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
      //   console.log('currentbefore', current);
      //   console.log('nextbefore', current);
      // },
      // afterChange: (current, next) => {
      //   console.log('currentafter', current);
      //   console.log('nextafter', next);
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
        <a href="#sidebar-toggle" className="toggle_button">
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
                        ? 'All'
                        : `${activeDateValues},`}
                    </span>
                    <ul
                      className={`ul-dropdown ${
                        toggleTimePeriodDropdown ? 'active' : ''
                      }`}
                      id="dropdown-list"
                    >
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
                            activeDataType === 'Cummulative'
                              ? 'li-active'
                              : ''
                          }
                          role="tab"
                          onClick={() => {
                            handleSelectedDataType('Cummulative');
                          }}
                          onKeyDown={() => {
                            handleSelectedDataType('Cummulative');
                          }}
                        >
                          Cummulative
                        </li>
                        <li
                          className={
                            activeDataType === 'Individual'
                              ? 'li-active'
                              : ''
                          }
                          role="tab"
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
                        Time graph
                      </span>
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
                <Loader
                  type="Audio"
                  color="#c21c2e"
                  height={100}
                  width={100}
                  visible={!isDataFetched}
                />
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
})(MiddleChartSection);
