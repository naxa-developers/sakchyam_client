import React, { Component } from 'react';
import { connect } from 'react-redux';
import { githubdata } from './data';
import * as d3 from 'd3';
import './chart.scss';
import {
  filterTimeline,
  selectChoroplethDataOfMunicipality,
} from '../../../../actions/automation.actions';
class TimelineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  plotChart = () => {
    var svg = d3.select('#timelineChart'),
      margin = { top: 10, right: 10, bottom: 55, left: 20 },
      margin2 = { top: 215, right: 10, bottom: 15, left: 20 },
      width = +svg.attr('width') - margin.left - margin.right,
      height = +svg.attr('height') - margin.top - margin.bottom,
      height2 = +svg.attr('height') - margin2.top - margin2.bottom;

    var parseDate = d3.timeParse('%b %Y');

    /*var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]);*/

    var x2 = d3.scaleTime().range([0, width]),
      y2 = d3.scaleLinear().range([height2, 0]);

    /*var xAxis = d3.axisBottom(x),
    yAxis = d3.axisLeft(y);*/

    var xAxis2 = d3.axisBottom(x2);

    var brush = d3
      .brushX()
      .extent([
        [0, 0],
        [width, height2],
      ])
      .on('brush end', brushed);

    var zoom = d3
      .zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .extent([
        [0, 0],
        [width, height],
      ])
      .on('zoom', zoomed);

    /*var area = d3.area()
    .curve(d3.curveMonotoneX)
    .x(function(d) { return x(new Date(d.date)); })
    .y0(height)
    .y1(function(d) { return y(d.price); });*/

    var area2 = d3
      .area()
      .curve(d3.curveMonotoneX)
      .x(function(d) {
        return x2(new Date(d.x));
      })
      .y0(height2)
      .y1(function(d) {
        return y2(d.y);
      });

    svg
      .append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', width)
      .attr('height', height);

    /*var focus = svg.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/

    var context = svg
      .append('g')
      .attr('class', 'context')
      .attr(
        'transform',
        'translate(' + margin2.left + ',' + margin2.top + ')',
      );

    //d3.csv("sp500.csv", type, function(error, data) {
    //if (error) throw error;
    //console.log(data)
    var data = githubdata.series;

    /*x.domain(d3.extent(data, function(d) { console.log(d); return new Date(d.date); }));
  y.domain([0, d3.max(data, function(d) { return d.price; })]);*/

    x2.domain(
      d3.extent(data, function(d) {
        console.log(d);
        return d.x;
      }),
    );
    y2.domain([
      0,
      d3.max(data, function(d) {
        return d.y;
      }),
    ]);

    /*focus.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);

  focus.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  focus.append("g")
      .attr("class", "axis axis--y")
      .call(yAxis);*/

    context
      .append('path')
      .datum(data)
      .attr('class', 'area')
      .attr('d', area2);

    context
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height2 + ')')
      .call(xAxis2);

    //   context.append("g")
    //       .attr("class", "brush")
    //       .call(brush)
    //       .call(brush.move, x.range());

    svg
      .append('rect')
      .attr('class', 'zoom')
      .attr('width', width)
      .attr('height', height)
      .attr(
        'transform',
        'translate(' + margin.left + ',' + margin.top + ')',
      )
      .call(zoom);
    //});

    function brushed() {
      if (
        d3.event.sourceEvent &&
        d3.event.sourceEvent.type === 'zoom'
      )
        return; // ignore brush-by-zoom
      var s = d3.event.selection || x2.range();
      x.domain(s.map(x2.invert, x2));
      focus.select('.area').attr('d', area);
      focus.select('.axis--x').call(xAxis);
      svg
        .select('.zoom')
        .call(
          zoom.transform,
          d3.zoomIdentity
            .scale(width / (s[1] - s[0]))
            .translate(-s[0], 0),
        );
    }

    function zoomed() {
      if (
        d3.event.sourceEvent &&
        d3.event.sourceEvent.type === 'brush'
      )
        return; // ignore zoom-by-brush
      var t = d3.event.transform;
      x.domain(t.rescaleX(x2).domain());
      focus.select('.area').attr('d', area);
      focus.select('.axis--x').call(xAxis);
      context
        .select('.brush')
        .call(brush.move, x.range().map(t.invertX, t));
    }

    function type(d) {
      d.date = parseDate(d.date);
      d.price = +d.price;
      return d;
    }
  };

  componentDidMount() {
    this.plotChart();
  }

  componentDidUpdate(prevProps, prevStates) {}

  render() {
    const {} = this.state;
    return (
      <div
        id="wrapper"
        className="chart-timeline"
        style={{ background: 'white', padding: '11px' }}
      >
        <svg id="timelineChart" width="500" height="250"></svg>
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
