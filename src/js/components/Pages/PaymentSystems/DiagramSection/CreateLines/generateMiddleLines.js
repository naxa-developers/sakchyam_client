import * as d3 from 'd3';

const generateMiddleLines = (svgRect, leftRects, rightRects) => {
  const scale = d3
    .scaleLinear()
    .domain([svgRect.top, svgRect.top + svgRect.height])
    .range([0, svgRect.height]);

  // const coordinates = {};
  const coordinates = [];
  rightRects.forEach(item => {
    const y1 = scale(leftRects[0].top + leftRects[0].height * 0.5);
    const y2 = scale(item.top + item.height * 0.5);
    coordinates.push({
      y1,
      y2,
    });
  });

  return coordinates;
};

export default generateMiddleLines;
