import React from 'react';

const PlotLines = ({
  coordinates,
  rightCoordinates,
  width,
  lineColor,
  indirectCoordinates,
}) => {
  return (
    <svg height="100%" width="100%">
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
          strokeWidth="4"
          key={item.y2}
        >
          <line
            x1={5}
            x2={width * 0.3}
            y1={item.y1}
            y2={item.y1}
            markerStart="url(#arrowhead)"
          />
          <line
            x1={width * 0.3}
            x2={width * 0.3}
            y1={item.y1}
            y2={item.y2}
          />
          <line
            x1={width * 0.3}
            // x2={width}
            x2={178}
            y1={item.y2}
            y2={item.y2}
            markerEnd="url(#arrowhead)"
          />
        </g>
      ))}
      {rightCoordinates.map(item => (
        <g
          fill="white"
          stroke={lineColor}
          strokeWidth="4"
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
      {indirectCoordinates.map(item => (
        <g
          fill="white"
          stroke={lineColor}
          strokeWidth="4"
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

export default PlotLines;
