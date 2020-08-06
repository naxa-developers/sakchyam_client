import React from 'react';

const SVGLines = ({ data, dimension: { height, width } }) => {
  console.log(data, 'data');

  return (
    <div style={{ position: 'absolute' }}>
      <svg height={height} width={width}>
        {data.map(item => (
          <line
            x1={item.x1}
            y1={item.y1}
            x2={item.x2}
            y2={item.y2}
            style={{ stroke: 'red', strokeWidth: '2' }}
          />
        ))}
      </svg>
    </div>
  );
};

export default SVGLines;
