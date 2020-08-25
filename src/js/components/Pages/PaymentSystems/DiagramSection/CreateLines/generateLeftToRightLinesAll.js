import * as d3 from 'd3';

const width = 235;

function getPosition(x) {
  if (x === 0) return 0.3;
  if (x === 1) return 0.2;
  if (x === 2) return 0.25;
  return 0.5;
}

const generateLeftToRightLinesAll = (svgRect, refs) => {
  const coordinates = [];

  const scale = d3
    .scaleLinear()
    .domain([svgRect.top, svgRect.top + svgRect.height])
    .range([0, svgRect.height]);

  refs.forEach((item, index) => {
    item.rightRef.forEach(i => {
      const x1 = 9;
      const x2 = width * 0.4;
      const y1 = scale(item.leftRef.top + item.leftRef.height * 0.5);
      const y2 = scale(i.top + i.height * 0.5);
      coordinates.push({
        x1,
        x2,
        y1,
        y2,
        position: getPosition(index),
      });
    });
  });

  return coordinates;
};

export default generateLeftToRightLinesAll;
