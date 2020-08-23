import * as d3 from 'd3';

function getXPosition(x) {
  if (x === 0) return 0.43;
  if (x === 1) return 0.55;
  if (x === 2) return 0.25;
  return 0.5;
}

function getYPosition(x) {
  if (x === 0) return 0.75;
  if (x === 1) return 0.25;
  if (x === 2) return 0.75;
  return 0.5;
}

const generateRightLinesAll = (svgRect, refs, containerWidth) => {
  const scale = d3
    .scaleLinear()
    .domain([svgRect.top, svgRect.top + svgRect.height])
    .range([0, svgRect.height]);

  const coordinates = [];

  refs.forEach((item, index) => {
    item.forEach(i => {
      const x1 = 175;
      const x2 = containerWidth * getXPosition(index);
      const y1 = scale(
        i.rect1.top + i.rect1.height * getYPosition(index),
      );
      const y2 = scale(
        i.rect2.top + i.rect2.height * getYPosition(index),
      );

      coordinates.push({
        x1,
        x2,
        y1,
        y2,
      });
    });

    return coordinates;
  });

  return coordinates;
};

export default generateRightLinesAll;
