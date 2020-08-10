import React from 'react';

const PlotLeftLines = ({
  coordinates,
  // dimension: { height, width },
}) => {
  return (
    <svg height="100%" width="100%">
      {coordinates.map(item => (
        <g fill="white" stroke="red" strokeWidth="2">
          <line x1={60} x2={30} y1={item.y1} y2={item.y1} />
          <line x1={30} x2={30} y1={item.y1} y2={item.y2} />
          <line x1={30} x2={60} y1={item.y2} y2={item.y2} />
        </g>
      ))}
    </svg>
  );
};

export default PlotLeftLines;
