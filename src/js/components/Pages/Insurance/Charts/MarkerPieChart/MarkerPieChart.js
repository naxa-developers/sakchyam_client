/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { connect } from 'react-redux';
// import d3 from 'd3';

class MarkerPieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      options: {},
    };
    this.pieRef = React.createRef();
  }

  plotChart = () => {
    const series = [
      {
        name: 'Series 1',
        data: [80, 50, 30, 40, 100, 20],
      },
      {
        name: 'Series 2',
        data: [20, 30, 40, 80, 20, 80],
      },
      {
        name: 'Series 3',
        data: [44, 76, 78, 13, 43, 10],
      },
    ];
    const options = {
      chart: {
        height: 350,
        type: 'radar',
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1,
        },
      },
      legend: {
        show: false,
      },
      title: {
        // text: 'Radar Chart - Multi Series',
      },
      stroke: {
        width: 2,
      },
      fill: {
        opacity: 0.1,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        categories: [
          'Percentage Branch',
          'Percentage BLB',
          'Percentage Extension Counter',
          'Percentage Tablet',
        ],
      },
    };
    this.setState({ options, series });
  };

  componentDidMount() {
    // alert('didmount');
    this.plotChart();
    const { activeModal } = this.props;
    if (activeModal) {
      this.updateBarChart();
    }
  }

  componentDidUpdate() {
    // alert('didupdate');
  }
  // createPieChart = () => {
  //   if (!this.pieRef.current) return;
  //   const w = 300; // width
  //   const h = 300; // height
  //   const r = 100; // radius
  //   const color = d3.scale.category20c(); // builtin range of colors

  //   const data = [
  //     { label: 'one', value: 20 },
  //     { label: 'two', value: 50 },
  //     { label: 'three', value: 30 },
  //   ];

  //   const vis = d3
  //     .select(this.pieRef.current)
  //     //   .append('svg:svg') // create the SVG element inside the <body>
  //     .data([data]) // associate our data with the document
  //     .attr('width', w) // set the width and height of our visualization (these will be attributes of the <svg> tag
  //     .attr('height', h)
  //     .append('svg:g') // make a group to hold our pie chart
  //     .attr('transform', `translate(${r},${r})`); // move the center of the pie chart from 0, 0 to radius, radius

  //   const arc = d3.svg
  //     .arc() // this will create <path> elements for us using arc data
  //     .outerRadius(r);

  //   const pie = d3.layout
  //     .pie() // this will create arc data for us given a list of values
  //     .value(function(d) {
  //       return d.value;
  //     }); // we must tell it out to access the value of each element in our data array

  //   const arcs = vis
  //     .selectAll('g.slice') // this selects all <g> elements with class slice (there aren't any yet)
  //     .data(pie) // associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
  //     .enter() // this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
  //     .append('svg:g') // create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
  //     .attr('class', 'slice'); // allow us to style things in the slices (like text)

  //   arcs
  //     .append('svg:path')
  //     .attr('fill', function(d, i) {
  //       return color(i);
  //     }) // set the color for each slice to be chosen from the color function defined above
  //     .attr('d', arc); // this creates the actual SVG path using the associated data (pie) with the arc drawing function

  //   arcs
  //     .append('svg:text') // add a label to each slice
  //     .attr('transform', function(d) {
  //       // set the label's origin to the center of the arc
  //       // we have to make sure to set these before calling arc.centroid
  //       d.innerRadius = 0;
  //       d.outerRadius = r;
  //       return `translate(${arc.centroid(d)})`; // this gives us a pair of coordinates like [50, 50]
  //     })
  //     .attr('text-anchor', 'middle') // center the text on it's origin
  //     .text(function(d, i) {
  //       return data[i].label;
  //     });
  //
  // };

  // componentDidMount() {
  //   this.createPieChart();
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   this.createPieChart();
  //   if (prevProps.key !== this.props.key) {
  //     this.createPieChart();
  //   }
  // }

  render() {
    return (
      <ReactApexChart
        options={this.state.options}
        series={this.state.series}
        type="radar"
        height={350}
      />
      // <div ref={this.pieRef} />
      // <svg ref={this.pieRef} />
      //   <svg width="300" height="300">
      //     <g transform="translate(100,100)">
      //       <g className="slice">
      //         <path
      //           fill="#3182bd"
      //           d="M-95.10565162951534,-30.901699437494813A100,100 0 0,1 7.044813998280223e-14,-100L0,0Z"
      //         />
      //         <text
      //           transform="translate(-29.38926261462363,-40.45084971874739)"
      //           textAnchor="middle"
      //         >
      //           one
      //         </text>
      //       </g>
      //       <g className="slice">
      //         <path
      //           fill="#6baed6"
      //           d="M6.123233995736766e-15,-100A100,100 0 1,1 -3.828568698926949e-14,100L0,0Z"
      //         />
      //         <text
      //           transform="translate(50,1.1102230246251565e-14)"
      //           textAnchor="middle"
      //         >
      //           two
      //         </text>
      //       </g>
      //       <g className="slice">
      //         <path
      //           fill="#9ecae1"
      //           d="M-3.828568698926949e-14,100A100,100 0 0,1 -95.10565162951534,-30.901699437494813L0,0Z"
      //         />
      //         <text
      //           transform="translate(-40.45084971874739,29.389262614623625)"
      //           textAnchor="middle"
      //         >
      //           three
      //         </text>
      //       </g>
      //     </g>
      //   </svg>
    );
  }
}

export default MarkerPieChart;
