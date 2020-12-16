import React from 'react';

const PlotLeftLines = ({
  coordinates,
  lineColor,
  // dimension: { height, width },
}) => {
  return (
    <svg height="700" width="700">
      <defs>
        <marker
          id="arrowhead"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={lineColor} />
        </marker>
      </defs>

      {coordinates.map(item => (
        <g
          fill="white"
          stroke={lineColor}
          strokeWidth="3"
          key={item.y2}
        >
          <line
            x1={item.x1}
            x2={item.x2}
            y1={item.y1}
            y2={item.y1}
            markerStart="url(#arrowhead)"
          />
          <line x1={item.x2} x2={item.x2} y1={item.y1} y2={item.y2} />
          <line
            x1={item.x2}
            x2={item.x1}
            y1={item.y2}
            y2={item.y2}
            markerEnd="url(#arrowhead)"
          />
        </g>
      ))}
    </svg>
  );
};

export default PlotLeftLines;
