import React from 'react';
import ApexChart from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { githubdata } from './data';

class TimelineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'commits',
          data: githubdata.series,
        },
      ],
      options: {
        chart: {
          id: 'chartyear',
          type: 'area',
          height: 160,
          background: '#F6F8FA',
          toolbar: {
            show: false,
            autoSelected: 'pan',
          },
          events: {
            dataPointSelection(e, chart, opts) {
              console.log(e, opts);
            },
            selection(chartContext, { xaxis, yaxis }) {
              console.log('sss');
            },
            mounted(chart) {
              const commitsEl = document.querySelector(
                '.cmeta span.commits',
              );
              const commits = chart.getSeriesTotalXRange(
                chart.w.globals.minX,
                chart.w.globals.maxX,
              );

              commitsEl.innerHTML = commits;
            },
            updated(chart) {
              const commitsEl = document.querySelector(
                '.cmeta span.commits',
              );
              const commits = chart.getSeriesTotalXRange(
                chart.w.globals.minX,
                chart.w.globals.maxX,
              );

              commitsEl.innerHTML = commits;
            },
          },
        },
        colors: ['#FF7F00'],
        stroke: {
          width: 0,
          curve: 'smooth',
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 1,
          type: 'solid',
        },
        yaxis: {
          show: false,
          tickAmount: 3,
          forceNiceScale: true,
        },
        xaxis: {
          type: 'datetime',
          forceNiceScale: true,
        },
      },

      seriesYears: [
        {
          name: 'commits',
          data: githubdata.series,
        },
      ],
      optionsYears: {
        chart: {
          height: 200,
          type: 'area',
          background: '#F6F8FA',
          events: {
            dataPointSelection(e, chart, opts) {
              console.log(e, opts);
            },
            selection(chartContext, { xaxis, yaxis }) {
              console.log('dddd');
              console.log(chartContext, 'chartContext');
              console.log(xaxis, 'x');
              console.log(yaxis, 'y');
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
              min: new Date('26 Jan 2014').getTime(),
              max: new Date('29 Mar 2015').getTime(),
            },
          },
        },
        colors: ['#7BD39A'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 0,
          curve: 'smooth',
        },
        fill: {
          opacity: 1,
          type: 'solid',
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
        },
        xaxis: {
          type: 'datetime',
          forceNiceScale: true,
        },
        yaxis: {
          show: true,
          // forceNiceScale: true,
        },
      },
    };
  }

  render() {
    return (
      <div
        id="wrapper"
        className="chart-timeline"
        style={{ background: 'white', padding: '11px' }}
      >
        <div id="chart-months" style={{ display: 'block' }}>
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="area"
            height={100}
          />
        </div>

        <div className="github-style">
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
        </div>

        <div id="chart-years">
          <ReactApexChart
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

export default TimelineChart;
