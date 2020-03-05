import React from 'react';

function TestComponent(props) {
  const { data } = props;
  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
}

export default TestComponent;
