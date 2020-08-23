import * as d3 from 'd3';

const scale = svgRect => {
  return d3
    .scaleLinear()
    .domain([svgRect.top, svgRect.top + svgRect.height])
    .range([0, svgRect.height]);
};

export default scale;
