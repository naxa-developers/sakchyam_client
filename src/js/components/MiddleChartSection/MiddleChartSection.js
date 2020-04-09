import React, { Component } from 'react';
// import Slider from 'react-slick';
import CustomChart from '../CustomChart';

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
      statsData: [],
      // dateRange: [],
      filteredDynamicData: [],
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
          data: [33, 21, 32, 37, 23, 32, 27, 11, 34, 32, 40],
        },
        {
          name: 'Planned As per AFP contract Budget',
          type: 'column',
          data: [13, 5, 12, 17, 10, 12, 17, 11, 14, 12, 20],
        },
        {
          name: 'Achieved',
          type: 'line',
          data: [33, 21, 32, 37, 23, 32, 27, 11, 34, 32, 40],
        },
        {
          // name: 'Planned',
          name: 'Planned As per AFP contract Budget',
          type: 'line',
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          stacked: false,
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
    const { statsData } = this.state;
    const filtered = [];
    // eslint-disable-next-line array-callback-return
    activeDate.map(date => {
      // eslint-disable-next-line array-callback-return
      statsData.map(data => {
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
        name: 'Planned As per AFP contract Budget',
        type: 'column',
        data: planned,
      },
      {
        name: 'Achieved',
        type: 'column',
        data: achieved,
      },
      {
        name: 'Planned As per AFP contract Budget',
        type: 'line',
        data: planned,
      },
      {
        name: 'Achieved',
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
    const { statsData } = this.state;
    // console.log(statsData);
    const filtered = statsData.filter(result => {
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
        name: 'Planned As per AFP contract Budget',
        type: 'column',
        data: planned,
      },
      {
        name: 'Achieved',
        type: 'column',
        data: achieved,
      },
      {
        name: 'Planned As per AFP contract Budget',
        type: 'line',
        data: planned,
      },
      {
        name: 'Achieved',
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

  componentDidUpdate(prevProps) {
    // const that = this;
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
  }

  componentDidMount() {
    // const a = document
    //   .getElementsByClassName('slick-next')[0]
    //   .addEventListener('click', this.next);
    // console.log(a);
    const that = this;
    // const { activeLayer } = this.props;
    // console.log(this.props.activeDate, 'activeLayer');
    // const a = activeLayer;
    fetch('https://sakchyam.naxa.com.np/api/v1/logFrame-data')
      .then(function(response) {
        if (response.status !== 200) {
          // console.log(
          //   `Looks like there was a problem. Status Code: ${response.status}`,
          // );
          return;
        }
        // Examine the text in the response
        response.json().then(function(data) {
          //   console.log(data, 'data');
          that.setState({ statsData: data }, () => {
            that.props.handleOneTimeLayerChange();
          });
        });

        // console.log(this.state.series, 'series');
      })
      .catch(function(err) {
        return err;
        // console.log('Fetch Error :-S', err);
      });
  }

  handleBarClick = () => {
    // console.log('handleBarclick');
    // console.log(this.chartRef.chart, 'ref');
    // console.log(this.chartRef.chart.toggleSeries('Achieved'), 'ref');
    // this.chartRef.chart.updateOptions({
    // });
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
    const { activeLayer, activeDate, updateChart } = this.props;
    return (
      <div className="info-content">
        {/* <a href="#" className="toggle_button">
          <i className="material-icons">keyboard_backspace</i>
        </a> */}
        <div className="info-content-wrap">
          <div className="info-content-header">
            <h2>
              {filteredDynamicData &&
                filteredDynamicData[0] &&
                filteredDynamicData[0].category.title}
            </h2>
            <div className="info-header-top">
              <h5 className="h3-red">
                {filteredDynamicData &&
                  filteredDynamicData[0] &&
                  filteredDynamicData[0].sub_category.title}
              </h5>
              <span className="span_black_15">{activeLayer}</span>
            </div>

            <div className="info-header-bottom">
              <div className="option-wrap">
                <div className="data">
                  <span className="span-option">Data</span>
                  <div className="data-wrap">
                    <span>Cummulative</span>
                    <ul className="ul-dropdown">
                      <li>Cummulative</li>
                      <li>Individual</li>
                    </ul>
                  </div>
                </div>
                <div className="chart">
                  <span className="span-option">Chart</span>
                  <div className="chart-wrap">
                    <span
                      role="button"
                      tabIndex={0}
                      onKeyDown={this.handleBarClick}
                      onClick={this.handleBarClick}
                    >
                      Bar
                    </span>
                    <span>Time graph</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="info-slider">
            {/* <a href="foo" className="download-icon-image">
              <img src={SaveAlt} alt="" />
            </a> */}
            <div className="slider-container">
              {/* <Slider {...settings}> */}
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
              {/* <CustomChart
                  activeLayer={activeLayer}
                  activeDate={activeDate}
                  updateChart={updateChart}
                  series={series}
                  options={options}
                  chartRef={arg => {
                    this.chartRef = arg;
                  }}
                /> */}
              {/* </Slider> */}
            </div>
          </div>
          <div className="info-content-footer">
            <p className="span_book_14">
              {filteredDynamicData &&
                filteredDynamicData[0] &&
                filteredDynamicData[0].sub_category.description}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default MiddleChartSection;
