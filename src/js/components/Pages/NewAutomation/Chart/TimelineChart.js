import React, { Component } from 'react';
import ApexCharts from 'apexcharts';
import { connect } from 'react-redux';
// import { githubdata } from './data';
import playIcon from '../../../../../img/play-black.png';
import pauseIcon from '../../../../../img/pause.png';
import { filterTimeline } from '../../../../actions/automation.actions';

let time = '1/1/2015';

class TimelineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playSelected: false,
      minCurrent: '',
      maxCurrent: '',
      githubdata: {
        series: [
          {
            x: new Date('2015-1-1').getTime(),
            y: 13,
          },
          {
            x: new Date('2016-1-1').getTime(),
            y: 10,
          },
          {
            x: new Date('2017-1-1').getTime(),
            y: 12,
          },
          {
            x: new Date('2018-1-1').getTime(),
            y: 36,
          },
          {
            x: new Date('2019-1-1').getTime(),
            y: 21,
          },
          {
            x: new Date('2020-1-1').getTime(),
            y: 29,
          },
        ],
      },
    };
  }

  plotChart = (seriesData, minVal, maxVal) => {
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
          selection(chartContext, { xaxis, yaxis }) {
            that.props.filterTimeline(xaxis.min, xaxis.max);
            that.setState({
              minCurrent: xaxis.min,
              maxCurrent: xaxis.max,
            });
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
          datetimeFormatter: {
            month: 'MM',
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

  componentDidMount() {
    setTimeout(() => {
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
      global.chart.addEventListener('click', function() {});
    }, 500);
  }

  getAddedYear = minDate => {
    const d = new Date(minDate);

    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear() + 1;

    const dateStr = `${month}/${day}/${year}`;
    time = dateStr;
    return dateStr;
  };

  updateChart = (minValue, maxValue) => {
    time = minValue;
    global.timerId = setInterval(() => {
      if (new Date(time).getTime() < new Date(maxValue).getTime()) {
        const minval = new Date(minValue).getTime();
        const maxval = new Date(this.getAddedYear(time)).getTime();
        ApexCharts.exec('chart1', 'updateOptions', {
          chart: {
            selection: {
              events: {
                selection(chartContext, { xaxis, yaxis }) {},
              },
              xaxis: {
                min: minval,
                max: maxval,
              },
            },
          },
        });
      } else {
        clearInterval(global.timerId);
        this.setState({ playSelected: false });
      }
    }, 2000);
  };

  pauseBtn = () => {
    clearInterval(global.timerId);
    this.setState({ playSelected: false });
  };

  render() {
    const { playSelected, minCurrent, maxCurrent, key } = this.state;
    const { activeOutreachButton } = this.props;
    return (
      <div
        id="wrapper"
        className="chart-timeline"
        style={
          activeOutreachButton === true
            ? { background: 'white', display: 'none' }
            : { background: 'white', display: 'block' }
        }
      >
        <a
          onClick={() => {
            time = '1/1/2015';
            this.props.playBtn(minCurrent, maxCurrent);
            this.setState({ playSelected: true });
            setTimeout(() => {
              this.updateChart(
                this.props.minValue,
                this.props.maxValue,
              );
            }, 200);
          }}
          onKeyDown={() => {
            time = '1/1/2015';
            this.props.playBtn(minCurrent, maxCurrent);
            this.setState({ playSelected: true });
            setTimeout(() => {
              this.updateChart(
                this.props.minValue,
                this.props.maxValue,
              );
            }, 200);
          }}
          role="tab"
          tabIndex="0"
          className="play-btn"
          title="Play"
          style={
            playSelected ? { display: 'none' } : { display: 'block' }
          }
        >
          <img
            src={playIcon}
            alt="map"
            style={{ marginTop: '2vh' }}
          />
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
          <img
            src={pauseIcon}
            alt="pause"
            style={{ marginTop: '2vh' }}
          />
        </a>
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
})(TimelineChart);
