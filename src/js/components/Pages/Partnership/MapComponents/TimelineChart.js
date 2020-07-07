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
      minCurrent: '',
      maxCurrent: '',
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
    // console.log(minVal, 'minVal');
    // console.log(maxVal, 'maxVal');
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
          //     console.log(e, opts);
          //   },
          selection(chartContext, { xaxis, yaxis }) {
            // that.props.filterTimeline(xaxis.min, xaxis.max);
            that.setState({
              minCurrent: xaxis.min,
              maxCurrent: xaxis.max,
            });
            that.props.filterTimelineData(
              xaxis.min,
              xaxis.max,
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

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {} // componentwillmount

  componentDidMount() {
    // console.log(this.props.minValue, 'didmount min val');
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

  getAddedYear = minDate => {
    const d = new Date(minDate);

    const day = d.getDate();
    let month = d.getMonth() + 2; // Since getMonth() returns month from 0-11 not 1-12
    let year = d.getFullYear();
    if (month === 13) {
      month = 1;
      year = d.getFullYear() + 1;
    } else {
      month = d.getMonth() + 2;
    }

    const dateStr = `${year}-${month}-${day}`;
    time = dateStr;
    console.log(time, 'time returns');
    // this.setState({ time: dateStr });
    return dateStr;
  };

  updateChart = (minValue, maxValue) => {
    const that = this;
    time = minValue;
    global.timerId = setInterval(() => {
      // console.log(time, 'didupdate min val');
      // console.log(new Date(time), 'didupdate min val');
      // console.log(new Date(maxValue), 'didupdate max val');
      // console.log('once');
      if (new Date(time).getTime() < new Date(maxValue).getTime()) {
        const minval = new Date(minValue).getTime();
        const maxval = new Date(this.getAddedYear(time)).getTime();
        console.log(new Date(minval));
        console.log(new Date(maxval));
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
                  // console.log(xaxis.min, 'xaxis min');
                  // console.log(xaxis.max, 'xaxis maz');
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
        // console.log('clear');
        clearInterval(global.timerId);
        this.setState({ playSelected: false });
      }
    }, 1200);
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
  };

  render() {
    const { playSelected, minCurrent, maxCurrent, key } = this.state;
    // console.log(this.props.minValue, 'minValue render');
    // console.log(this.props.maxValue, 'maxValue Render');
    return (
      <div
        id="wrapper"
        className="chart-timeline"
        style={{ background: 'white' }}
      >
        <a
          onClick={() => {
            time = '2015-1-1';
            // console.log(new Date(minCurrent), 'onClick maxValue');
            // console.log(new Date(this.props.minValue), ' Current min Value');
            // global.chart.render();
            // console.log(this.props.minValue, 'onClick minValue');
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
            // console.log(new Date(minCurrent), 'onClick maxValue');
            // console.log(new Date(this.props.minValue), ' Current min Value');
            // global.chart.render();
            // console.log(this.props.minValue, 'onClick minValue');
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
