import React from 'react';

const BubbleLegend = ({ height, width, radius, fill, label }) => {
  return (
    <>
      <svg height="30" width="30">
        <circle
          cx="15"
          cy="15"
          r={radius}
          // stroke="black"
          // strokeWidth="3"
          fill={fill}
        />
      </svg>
      <label
        style={{ fontFamily: 'Avenir Heavy', fontWeight: '400' }}
      >
        {label}
      </label>
    </>
  );
};

export default BubbleLegend;
