import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div>
      <div
        className="loaderData"
        style={{
          display: 'inline-block',
          marginRight: '8px',
          marginTop: '2px',
        }}
      />
      <span>Data is loading</span>
    </div>
  );
}
export default Loader;
