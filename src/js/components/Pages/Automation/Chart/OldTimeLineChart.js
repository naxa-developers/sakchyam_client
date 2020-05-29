import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { connect } from 'react-redux';
import { githubdata } from './data';
import playIcon from '../../../../../img/play-black.png';
import pauseIcon from '../../../../../img/pause.png';
import {
  filterTimeline,
  selectChoroplethDataOfMunicipality,
} from '../../../../actions/automation.actions';

// let time = '1/1/2015';

class TimelineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playSelected: false,
      key: 1,
      minDate: '1/1/2015',
      maxDate: '1/1/2020',

      // series: [
      //   {
      //     name: 'commits',
      //     data: githubdata.series,
      //   },
      // ],
      // options: {
      //   chart: {
      //     id: 'chartyear',
      //     type: 'area',
      //     height: 160,
      //     background: '#F6F8FA',
      //     toolbar: {
      //       show: false,
      //       autoSelected: 'pan',
      //     },
      //     events: {
      //       dataPointSelection(e, chart, opts) {
      //         console.log(e, opts);
      //       },
      //       selection(chartContext, { xaxis, yaxis }) {
      //         console.log('sss');
      //       },
      //       mounted(chart) {
      //         const commitsEl = document.querySelector(
      //           '.cmeta span.commits',
      //         );
      //         const commits = chart.getSeriesTotalXRange(
      //           chart.w.globals.minX,
      //           chart.w.globals.maxX,
      //         );

      //         commitsEl.innerHTML = commits;
      //       },
      //       updated(chart) {
      //         const commitsEl = document.querySelector(
      //           '.cmeta span.commits',
      //         );
      //         const commits = chart.getSeriesTotalXRange(
      //           chart.w.globals.minX,
      //           chart.w.globals.maxX,
      //         );

      //         commitsEl.innerHTML = commits;
      //       },
      //     },
      //   },
      //   colors: ['#FF7F00'],
      //   stroke: {
      //     width: 0,
      //     curve: 'smooth',
      //   },
      //   dataLabels: {
      //     enabled: false,
      //   },
      //   fill: {
      //     opacity: 1,
      //     type: 'solid',
      //   },
      //   yaxis: {
      //     show: false,
      //     tickAmount: 3,
      //     forceNiceScale: true,
      //   },
      //   xaxis: {
      //     type: 'datetime',
      //     forceNiceScale: true,
      //   },
      // },

      seriesYears: [
        {
          name: 'commits',
          data: githubdata.series,
        },
      ],
      optionsYears: {
        chart: {
          events: {
            dataPointSelection(e, chart, opts) {
              console.log(e, opts);
            },
            selection(chartContext, { xaxis, yaxis }) {},
          },
          toolbar: {
            autoSelected: 'selection',
          },
          brush: {
            enabled: true,
            target: 'chartyear',
          },
          selection: {
            enabled: true,
            xaxis: {
              min: new Date('1 Jan 2015').getTime(),
              max: new Date('1 Jan 2016').getTime(),
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
        colors: ['#FF0000'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 1,
          curve: 'smooth',
        },
        // fill: {
        //   opacity: 1,
        //   type: 'solid',
        // },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
        },
        xaxis: {
          type: 'datetime',
          forceNiceScale: true,
          labels: {
            rotate: -45,
            hideOverlappingLabels: false,
          },
          // tickPlacement: 'on',
        },
        yaxis: {
          show: true,
          // forceNiceScale: true,
        },
      },
    };
  }

  getAddedYear = minDate => {
    const d = new Date(minDate);

    const day = d.getDate();
    const month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    const year = d.getFullYear() + 1;

    const dateStr = `${day}/${month}/${year}`;
    this.setState({ time: dateStr });
    return dateStr;
  };

  plotChart = () => {
    const that = this;
    const a = {
      optionsYears: {
        chart: {
          events: {
            dataPointSelection(e, chart, opts) {
              console.log(e, opts);
            },
            selection(chartContext, { xaxis, yaxis }) {
              that.props.filterTimeline(xaxis.min, xaxis.max);
              // that.setState({
              //   minDate: xaxis.min,
              //   maxDate: xaxis.max,
              // });
            },
          },
          toolbar: {
            autoSelected: 'selection',
          },
          brush: {
            enabled: true,
            target: 'chartyear',
          },
          selection: {
            enabled: true,
            xaxis: {
              min: new Date('1 Jan 2015').getTime(),
              max: new Date('1 Jan 2020').getTime(),
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
        colors: ['#FF0000'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 1,
          curve: 'smooth',
        },
        // fill: {
        //   opacity: 1,
        //   type: 'solid',
        // },
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
      },
    };
    this.setState({ optionsYears: a.optionsYears });
  };

  pauseBtn = () => {
    this.setState({ playSelected: false });
    clearInterval(global.timerId);
  };

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {}

  componentDidMount() {
    this.plotChart();
  }

  componentDidUpdate(prevProps, previousState) {
    if (prevProps.minValue !== this.props.minValue) {
      console.log('didupdate');
      const { time } = this.state;
      global.timerId = setInterval(() => {
        // const { time, endDate } = this.props;
        if (time < this.props.maxValue) {
          console.log(this.props.minValue, 'minValue');
          console.log(this.props.maxValue, 'maxVal');
          // console.log('inside if');
          // console.log(time, 'time');
          // console.log(endDate, 'endDate');
          this.setState(prevState => ({
            optionsYears: {
              ...prevState.optionsYears,
              chart: {
                ...prevState.optionsYears.chart,
                selection: {
                  ...prevState.optionsYears.chart.selection,
                  xaxis: {
                    ...prevState.optionsYears.chart.selection.xaxis,
                    min: new Date(this.props.minValue).getTime(),
                    max: new Date(this.getAddedYear(time)).getTime(),
                  },
                },
              },
            },
          }));
        } else {
          console.log('clear');
          clearInterval(global.timerId);
          this.setState({ playSelected: false });
        }
      }, 1200);
    }
  }

  render() {
    console.log(githubdata, 'data');
    const { playSelected, key, minDate, maxDate, time } = this.state;
    return (
      <div
        id="wrapper"
        className="chart-timeline"
        style={{ background: 'white', padding: '11px' }}
      >
        {/* <div id="chart-months" style={{ display: 'block' }}>
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="area"
            height={100}
          />
        </div> */}

        {/* <div className="github-style">
          <img
            className="userimg"
            src="https://picsum.photos/200/200/?image=1031"
            data-hovercard-user-id="634573"
            alt=""
            width="38"
            height="38"
          />
          <div className="userdetails">
            <a className="username">coder</a>
            <h5 className="cmeta">
              <span className="commits" />
              commits
            </h5>
          </div>
        </div> */}
        <a
          onClick={() => {
            this.props.playBtn(minDate, maxDate);
            this.setState({ key: Math.random() });
          }}
          className="play-btn"
          href="#"
          title="Play"
          style={
            playSelected ? { display: 'none' } : { display: 'block' }
          }
        >
          <img src={playIcon} alt="map" />
        </a>
        <a
          onClick={this.pauseBtn}
          className="pause-btn"
          href="#"
          title="Pause"
          style={
            !playSelected ? { display: 'none' } : { display: 'block' }
          }
        >
          <img src={pauseIcon} alt="map" />
        </a>
        <div id="chart-years">
          <ReactApexChart
            // key={key}
            options={this.state.optionsYears}
            series={this.state.seriesYears}
            type="area"
            height={100}
          />
        </div>
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
