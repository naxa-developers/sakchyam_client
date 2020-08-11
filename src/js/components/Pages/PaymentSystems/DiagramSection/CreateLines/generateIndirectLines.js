import * as d3 from 'd3';

const generateIndirectLines = (svgRect, rects, containerWidth) => {
  const scale = d3
    .scaleLinear()
    .domain([svgRect.top, svgRect.top + svgRect.height])
    .range([0, svgRect.height]);

  const coordinates = [];
  rects.forEach(item => {
    const x1 = 178;
    const x2 = containerWidth * 0.6;
    const y1 = scale(item.rect1.top + item.rect1.height * 0.7);
    const y2 = scale(item.rect2.top + item.rect2.height * 0.5);
    coordinates.push({
      x1,
      x2,
      y1,
      y2,
    });
  });

  return coordinates;
};

export default generateIndirectLines;
