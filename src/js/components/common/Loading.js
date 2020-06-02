import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = ({ loaderState, text }) => {
  return (
    <div
      id="center_loader"
      style={{
        position: 'absolute',
        top: '36%',
        left: '37%',
        zIndex: 999,
      }}
    >
      <Loader
        type="BallTriangle"
        color="#c21c2e"
        height={100}
        width={100}
        visible={loaderState}
      />
      <label
        style={{
          display: loaderState ? 'block' : 'none',
          // marginLeft: '15px',
          color: 'red',
        }}
      >
        {text}
      </label>
    </div>
  );
};
export default Loading;
