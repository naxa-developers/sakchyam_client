import React, { Component } from 'react';
import ApexCharts from 'apexcharts';
import { connect } from 'react-redux';
import { githubdata } from './data';
import playIcon from '../../../../../img/play-black.png';
import pauseIcon from '../../../../../img/pause.png';
import {
  filterTimeline,
  selectChoroplethDataOfMunicipality,
} from '../../../../actions/automation.actions';

let time = '1/1/2015';

class TimelineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [],
      playSelected: false,
      // time: '1/1/2015',
      minDate: '1/1/2015',
      maxDate: '1/1/2020',
      minCurrent: '',
      maxCurrent: '',
      // categories: [],
    };
  }

  plotChart = (seriesData, minVal, maxVal) => {
    console.log(minVal, 'minVal');
    console.log(maxVal, 'maxVal');
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
        height: 100,
        events: {
          dataPointSelection(e, chart, opts) {
            console.log(e, opts);
          },
          selection(chartContext, { xaxis, yaxis }) {
            that.props.filterTimeline(xaxis.min, xaxis.max);
            that.setState({
              minCurrent: xaxis.min,
              maxCurrent: xaxis.max,
            });
            // that.props.playBtn(xaxis.min, xaxis.max);
          },
        },
        toolbar: {
          autoSelected: 'selection',
        },
        brush: {
          enabled: true,
          target: 'chart1',
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
        type: 'solid',
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
        // tickPlacement: 'on',
        labels: {
          rotate: -45,
          // hideOverlappingLabels: true,
          // showDuplicates: true,
          // trim: true,
          datetimeFormatter: {
            year: 'yyyy',
            month: "MMM 'yy",
            day: 'dd MMM',
            hour: 'HH:mm',
          },
          style: {
            colors: [],
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label',
          },
          min: '1/1/2015',
        },
        // tickPlacement: 'between',
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
    setTimeout(() => {
      // this.setState({
      //   data: githubdata.series,
      // });
      const defaultMin = new Date('1 Jan 2015').getTime();
      const defaultMax = new Date('1 Jan 2020').getTime();
      const options = this.plotChart(
        githubdata.series,
        defaultMin,
        defaultMax,
      );
      global.chart = new ApexCharts(
        document.querySelector('#timelineChart'),
        options,
      );
      global.chart.render();
      global.chart.addEventListener('click', function() {
        alert('selected');
        // this.setState({});
      });
    }, 500);
  }

  getAddedYear = minDate => {
    const d = new Date(minDate);

    const day = d.getDate();
    const month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    const year = d.getFullYear() + 1;

    const dateStr = `${day}/${month}/${year}`;
    time = dateStr;
    // this.setState({ time: dateStr });
    return dateStr;
  };

  playBtn = () => {
    const maxV = '1/1/2020';
    const minV = '1/1/2015';

    if (new Date(time).getTime() >= new Date(maxV).getTime()) {
      time = '1/1/2015';
      this.props.changeKey();
    }
    global.timerId = setInterval(() => {
      // while (time !== this.props.maxVal) {
      // const { time, endDate } = this.props;
      if (new Date(time).getTime() < new Date(maxV).getTime()) {
        console.log(time);
        // console.log(this.state.time);
        // console.log(this.props.minValue, 'minValue');
        // console.log(this.props.maxValue, 'maxVal');
        // console.log('inside if');
        // console.log(time, 'time');
        // console.log(endDate, 'endDate');
        const minval = new Date(minV).getTime();
        const maxval = new Date(this.getAddedYear(time)).getTime();
        console.log(minval, maxval);
        // this.plotChart(this.state.data, minval, maxval);
        global.chart.updateOptions({
          chart: {
            selection: {
              // enabled: false,
              xaxis: {
                min: minval,
                max: maxval,
              },
            },
          },
        });
        // this.setState(prevState => ({
        //   optionsLine: {
        //     ...prevState.optionsLine,
        //     chart: {
        //       ...prevState.optionsLine.chart,
        //       selection: {
        //         ...prevState.optionsLine.chart.selection,
        //         xaxis: {
        //           ...prevState.optionsLine.chart.selection.xaxis,
        //           min: new Date(this.props.minValue).getTime(),
        //           max: new Date(this.getAddedYear(time)).getTime(),
        //         },
        //       },
        //     },
        //   },
        // }));
      } else {
        console.log('clear');
        clearInterval(global.timerId);
        // this.setState({ playSelected: false });
      }
    }, 1200);
  };

  componentDidUpdate(prevProps, prevStates) {} // componentdidupdate

  render() {
    const {
      playSelected,
      minDate,
      maxDate,
      minCurrent,
      maxCurrent,
      key,
    } = this.state;
    console.log(this.props.minValue, 'minValue render');
    console.log(this.props.maxValue, 'maxValue Render');
    return (
      <div
        id="wrapper"
        className="chart-timeline"
        style={{ background: 'white', padding: '11px' }}
      >
        <a
          onClick={() => {
            this.playBtn();
          }}
          key={this.props.key}
          className="play-btn"
          href="#"
          title="Play"
          style={
            playSelected ? { display: 'none' } : { display: 'block' }
          }
        >
          <img src={playIcon} alt="map" />
        </a>
        {/* <a
          onClick={this.pauseBtn}
          className="pause-btn"
          href="#"
          title="Pause"
          style={
            !playSelected ? { display: 'none' } : { display: 'block' }
          }
        /> */}
        <div id="timelineChart" style={{ marginLeft: '20px' }} />
      </div>
    );
  }
}
const mapStateToProps = ({ automationReducer }) => ({
  automationReducer,
});
export default connect(mapStateToProps, {
  filterTimeline,
  selectChoroplethDataOfMunicipality,
})(TimelineChart);
