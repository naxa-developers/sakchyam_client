import * as d3 from 'd3';

const generateMiddleLines = (svgRect, leftRect, rightRect) => {
  const scale = d3
    .scaleLinear()
    .domain([svgRect.top, svgRect.top + svgRect.height])
    .range([0, svgRect.height]);

  const coordinates = {};
  coordinates.y1 = scale(leftRect.top + leftRect.height / 2);
  coordinates.y2 = scale(rightRect.top + rightRect.height / 2);

  return coordinates;
};

export default generateMiddleLines;
