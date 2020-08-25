import * as d3 from 'd3';

const generateMiddleLines = (
  svgRect,
  leftRects,
  rightRects,
  containerWidth,
) => {
  const scale = d3
    .scaleLinear()
    .domain([svgRect.top, svgRect.top + svgRect.height])
    .range([0, svgRect.height]);

  const coordinates = [];
  rightRects.forEach(item => {
    const x1 = 9;
    const x2 = containerWidth * 0.4;
    const y1 = scale(leftRects[0].top + leftRects[0].height * 0.5);
    const y2 = scale(item.top + item.height * 0.5);
    coordinates.push({
      x1,
      x2,
      y1,
      y2,
      position: 0.4,
    });
  });

  return coordinates;
};

export default generateMiddleLines;
