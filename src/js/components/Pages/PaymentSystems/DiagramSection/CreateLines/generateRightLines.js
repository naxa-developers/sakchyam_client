import * as d3 from 'd3';

const generateRightLines = (svgRect, rects, containerWidth) => {
  const scale = d3
    .scaleLinear()
    .domain([svgRect.top, svgRect.top + svgRect.height])
    .range([0, svgRect.height]);

  const coordinates = [];
  rects.forEach(item => {
    // const x1 = containerWidth;
    // const x2 = containerWidth * 0.45;
    const x1 = 175;
    const x2 = containerWidth * 0.45;
    const y1 = scale(item.rect1.top + item.rect1.height * 0.4);
    const y2 = scale(item.rect2.top + item.rect2.height * 0.4);
    coordinates.push({
      x1,
      x2,
      y1,
      y2,
    });
  });

  return coordinates;
};

export default generateRightLines;
