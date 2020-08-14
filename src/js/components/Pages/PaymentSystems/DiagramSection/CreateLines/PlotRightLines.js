import React from 'react';

const PlotRightLines = ({ coordinates, width }) => {
  return (
    <svg height="100%" width="100%">
      {coordinates.map(item => (
        <g fill="white" stroke="red" strokeWidth="3">
          <line x1={item.x1} x2={item.x2} y1={item.y1} y2={item.y1} />
          <line x1={item.x1} x2={item.x2} y1={item.y1} y2={item.y2} />
          <line x1={item.x1} x2={item.x2} y1={item.y2} y2={item.y2} />
        </g>
      ))}
    </svg>
  );
};

export default PlotRightLines;
