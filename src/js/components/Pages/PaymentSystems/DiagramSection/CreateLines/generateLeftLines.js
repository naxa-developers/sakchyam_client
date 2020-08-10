import React from 'react';
import * as d3 from 'd3';

const generateLeftLines = (leftSVGRect, rect1, rect2) => {
  const scale = d3
    .scaleLinear()
    .domain([leftSVGRect.top, leftSVGRect.top + leftSVGRect.height])
    .range([0, leftSVGRect.height]);

  const newCoordinates = [
    {
      y1: scale(rect1.top + rect1.height / 2),
      y2: scale(rect2.top + rect2.height / 2),
    },
  ];
  return newCoordinates;
};

export default generateLeftLines;
