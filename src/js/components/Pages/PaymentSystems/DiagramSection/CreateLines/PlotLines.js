import React from 'react';

const PlotLines = ({
  svgContainerRef,
  data,
  dimension: { height, width },
}) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: '675px',
        alignSelf: 'flex-start',
      }}
      ref={svgContainerRef}
    >
      <svg height="100%" width="100%">
        <g fill="white" stroke="red" strokeWidth="2">
          <line x1={0} x2={90} y1={data.y1} y2={data.y1} />
          <line
            x1={width / 2}
            x2={width / 2}
            y1={data.y1}
            y2={data.y2}
          />
          <line x1={width / 2} x2={width} y1={data.y2} y2={data.y2} />
        </g>
      </svg>
    </div>
  );
};

export default PlotLines;
