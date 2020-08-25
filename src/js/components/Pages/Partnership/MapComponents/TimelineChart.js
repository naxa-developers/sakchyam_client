import React, { Component } from 'react';
import ApexCharts from 'apexcharts';
import { connect } from 'react-redux';
// import { githubdata } from './data';
import playIcon from '../../../../../img/play-black.png';
import pauseIcon from '../../../../../img/pause.png';
import { filterTimelineData } from '../../../../actions/partnership.actions';

let time = '2015-1-1';

class TimelineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [],
      playSelected: false,
      // time: '1/1/2015',
      timelineFrom: '',
      timelineTo: '',
      minCurrent: '',
      maxCurrent: '',
      fourMonthArray: [],
      githubdata: {
        series: [
          {
            x: new Date('2015-1-1').getTime(),
            // a: 306,
            // d: 33,
            y: 13,
          },

          {
            x: new Date('2016-1-1').getTime(),
            // a: 25,
            // d: 16,
            y: 10,
          },
          {
            x: new Date('2017-1-1').getTime(),
            // a: 55,
            // d: 86,
            y: 12,
          },
          {
            x: new Date('2018-1-1').getTime(),
            // a: 47,
            // d: 24,
            y: 36,
          },
          {
            x: new Date('2019-1-1').getTime(),
            // a: 78,
            // d: 98,
            y: 21,
          },
          {
            x: new Date('2020-1-1').getTime(),
            y: 29,
          },
        ],
      },
      // categories: [],
    };
  }

  plotChart = (seriesData, minVal, maxVal) => {
    //
    //
    const that = this;
    const optionsLine = {
      series: [
        {
          name: 'commits',
          data: seriesData,
        },
      ],
      chart: {
        id: 'chart1',
        type: 'area',
        height: 100,
        events: {
          //   dataPointSelection(e, chart, opts) {
          //
          //   },
          selection(chartContext, { xaxis, yaxis }) {
            // //
            const minaxis = xaxis.min;
            const maxaxis = xaxis.max;
            const selectedMin = that.compareMinMax(minaxis);
            const selectedMax = that.compareMinMax(maxaxis);
            setTimeout(() => {
              that.setState({
                timelineFrom: new Date(+selectedMin),
                timelineTo: new Date(+selectedMax),
              });
            }, 1000);
            // that.props.filterTimeline(xaxis.min, xaxis.max);
            that.setState({
              minCurrent: new Date(+selectedMin),
              maxCurrent: new Date(+selectedMax),
            });
            that.props.filterTimelineData(
              new Date(+selectedMin),
              new Date(+selectedMax),
              that.props.mapViewBy,
            );
            // that.props.playBtn(xaxis.min, xaxis.max);
          },
        },
        toolbar: {
          autoSelected: 'selection',
        },
        brush: {
          enabled: true,
        },
        selection: {
          enabled: true,
          xaxis: {
            min: minVal,
            max: maxVal,
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.61,
          opacityTo: 0.1,
        },
      },
      colors: ['#ff0000'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        curve: 'smooth',
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
      },
      xaxis: {
        type: 'datetime',
        forceNiceScale: true,
        tickPlacement: 'between',
        labels: {
          rotate: -45,
          // hideOverlappingLabels: true,
          // showDuplicates: true,
          // trim: true,
          datetimeFormatter: {
            // year: 'yyyy',
            // month: 'DD',
            // day: 'dd MMM',
            // hour: 'HH:mm',
          },
          style: {
            colors: [],
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label',
          },
        },
      },
      yaxis: {
        show: false,
        forceNiceScale: true,
      },
    };
    return optionsLine;
  };

  createDateRange = (minValue, maxValue) => {
    const array = [];
    array.push(minValue);
    // const convertedMaxValue = new Date(maxValue);
    let temp = minValue;
    //
    //
    //
    //
    while (new Date(temp).getTime() < new Date(maxValue).getTime()) {
      temp = this.getAddedMonth(temp);
      //
      array.push(temp);
    }
    //
    this.setState({ fourMonthArray: array });
  };

  removeTime = minDate => {
    const d = new Date(minDate);

    const day = d.getDate();
    let month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    let year = d.getFullYear();
    if (month === 13) {
      month = 1;
      year = d.getFullYear();
    } else {
      month = d.getMonth() + 1;
    }

    const dateStr = `${year}-${month}-${day}`;
    time = dateStr;
    //
    // this.setState({ time: dateStr });
    return dateStr;
  };

  compareMinMax = value => {
    const { fourMonthArray } = this.state;
    let returnedTime = '';

    //
    fourMonthArray.forEach((data, i) => {
      //
      //
      const firstIndexData = new Date(data).setHours(0, 0, 0);
      const secondIndexData = new Date(
        fourMonthArray[i + 1],
      ).setHours(0, 0, 0);
      const getTimeValue = new Date(value).setHours(0, 0, 0);
      //
      //
      //
      //
      //
      //
      if (firstIndexData === getTimeValue) {
        //
        returnedTime = firstIndexData.toString();
      } else if (
        firstIndexData < getTimeValue &&
        secondIndexData >= getTimeValue
      ) {
        returnedTime = secondIndexData.toString();
      }
    });

    return returnedTime;
  };

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {} // componentwillmount

  componentDidMount() {
    const { minValue } = this.props;
    const { maxValue } = this.props;
    this.createDateRange(minValue, maxValue);
    //
    setTimeout(() => {
      // this.setState({
      //   data: githubdata.series,
      // });
      const { githubdata } = this.state;
      const defaultMin = new Date('1 Jan 2015').getTime();
      const defaultMax = new Date('1 Jan 2020').getTime();
      const options = this.plotChart(
        githubdata.series,
        new Date(this.props.minValue).getTime(),
        new Date(this.props.maxValue).getTime(),
      );
      global.chart = new ApexCharts(
        document.querySelector('#timelineChart'),
        options,
      );
      global.chart.render();
      global.chart.addEventListener('click', function() {
        // alert('selected');
        // this.setState({});
      });
    }, 1500);
  }

  getAddedMonth = minDate => {
    const d = new Date(minDate);

    const day = d.getDate();
    let month = d.getMonth() + 4; // Since getMonth() returns month from 0-11 not 1-12
    let year = d.getFullYear();
    if (month === 13) {
      month = 1;
      year = d.getFullYear() + 1;
    } else {
      month = d.getMonth() + 4;
    }

    const dateStr = `${year}-${month}-${day}`;
    time = dateStr;
    //
    // this.setState({ time: dateStr });
    return dateStr;
  };

  getAddedYear = minDate => {
    const d = new Date(minDate);

    const day = d.getDate();
    let month = d.getMonth() + 4; // Since getMonth() returns month from 0-11 not 1-12
    let year = d.getFullYear();
    if (month === 13) {
      month = 1;
      year = d.getFullYear() + 1;
    } else {
      month = d.getMonth() + 4;
    }

    const dateStr = `${year}-${month}-${day}`;
    time = dateStr;
    //
    // this.setState({ time: dateStr });
    return dateStr;
  };

  updateChart = (minValue, maxValue) => {
    const that = this;
    time = minValue;
    global.timerId = setInterval(() => {
      //
      //
      //
      //
      if (new Date(time).getTime() < new Date(maxValue).getTime()) {
        const minval = new Date(minValue).getTime();
        const maxval = new Date(this.getAddedYear(time)).getTime();
        //
        //
        this.props.filterTimelineData(
          minval,
          maxval,
          this.props.mapViewBy,
        );
        ApexCharts.exec('chart1', 'updateOptions', {
          // global.chart.updateOptions({
          chart: {
            selection: {
              // enabled: false,
              events: {
                selection(chartContext, { xaxis, yaxis }) {
                  // that.props.playBtn(xaxis.min, xaxis.max);
                  //
                  //
                },
              },
              xaxis: {
                min: minval,
                max: maxval,
              },
            },
          },
        });
      } else {
        //
        clearInterval(global.timerId);
        this.setState({ playSelected: false });
      }
    }, 1250);
  };

  componentDidUpdate(prevProps, prevStates) {
    if (
      prevProps.minValue !== this.props.minValue ||
      prevProps.maxValue !== this.props.maxValue
    ) {
      // this.updateChart(this.props.minValue, this.props.maxValue);
    }
  } // componentdidupdate

  pauseBtn = () => {
    clearInterval(global.timerId);
    this.setState({ playSelected: false });
    this.props.handleIsTimeline();
  };

  render() {
    const {
      playSelected,
      minCurrent,
      maxCurrent,
      key,
      fourMonthArray,
      timelineFrom,
      timelineTo,
    } = this.state;
    const minCurr = new Date(minCurrent);
    const d = new Date(maxCurrent);

    const day = d.getDate();
    const month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    const year = d.getFullYear();
    const minday = minCurr.getDate();
    const minmonth = minCurr.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    const minyear = minCurr.getFullYear();
    //
    //
    return (
      <div
        id="wrapper"
        className="chart-timeline"
        style={{ background: 'white' }}
      >
        {/* <div className="timeline-date end-data">
          <time>StartDate:1 January 2019</time>
        </div> */}
        <div className="timeline-date start-date">
          {/* <time>Date:1 December 2019</time> */}
          <time>
            FROM:
            {`${timelineFrom}`}
            {/* {`${minyear}-${minmonth}-${minday}`} */}
          </time>
          <time style={{ marginLeft: '43px' }}>
            TO:
            {`${timelineTo}`}
            {/* {`${year}-${month}-${day}`} */}
          </time>
        </div>
        <a
          onClick={() => {
            time = '2015-1-1';
            //
            //
            // global.chart.render();
            //
            this.props.playBtn(minCurrent, maxCurrent);
            this.setState({ playSelected: true });
            setTimeout(() => {
              this.updateChart(
                this.props.minValue,
                this.props.maxValue,
              );
            }, 200);

            // this.setState({ key: Math.random() });
          }}
          onKeyDown={() => {
            time = '2015-1-1';
            //
            //
            // global.chart.render();
            //
            this.props.playBtn(minCurrent, maxCurrent);
            this.setState({ playSelected: true });
            setTimeout(() => {
              this.updateChart(
                this.props.minValue,
                this.props.maxValue,
              );
            }, 200);

            // this.setState({ key: Math.random() });
          }}
          role="tab"
          tabIndex="0"
          // key={this.props.key}
          className="play-btn"
          title="Play"
          style={
            playSelected ? { display: 'none' } : { display: 'block' }
          }
        >
          <img src={playIcon} alt="map" />
        </a>
        <a
          onClick={this.pauseBtn}
          onKeyDown={this.pauseBtn}
          role="tab"
          tabIndex="0"
          className="pause-btn"
          title="Pause"
          style={
            !playSelected ? { display: 'none' } : { display: 'block' }
          }
        >
          <img src={pauseIcon} alt="pause" />
        </a>
        <div id="timelineChart" style={{ marginLeft: '20px' }} />
      </div>
    );
  }
}
const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});
export default connect(mapStateToProps, {
  filterTimelineData,
  // filterTimeline,
  // selectChoroplethDataOfMunicipality,
})(TimelineChart);
