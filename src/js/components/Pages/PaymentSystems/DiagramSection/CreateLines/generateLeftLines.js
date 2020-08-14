import * as d3 from 'd3';

const generateLeftLines = (leftSVGRect, rects) => {
  const scale = d3
    .scaleLinear()
    .domain([leftSVGRect.top, leftSVGRect.top + leftSVGRect.height])
    .range([0, leftSVGRect.height]);

  const newCoordinates = [];
  rects.forEach((item, index) => {
    // if (index % 2 === 0) {
    const x1 = 52;
    const x2 = 25;
    const y1 = scale(item.rect1.top + item.rect1.height * 0.5);
    const y2 = scale(item.rect2.top + item.rect2.height * 0.5);
    newCoordinates.push({ x1, x2, y1, y2 });
    // } else {
    //   const x1 = 52;
    //   const x2 = 20;
    //   const y1 = scale(item.rect1.top + item.rect1.height * 0.4);
    //   const y2 = scale(item.rect2.top + item.rect2.height * 0.6);
    //   newCoordinates.push({ x1, x2, y1, y2 });
    // }
  });
  return newCoordinates;
};

export default generateLeftLines;
