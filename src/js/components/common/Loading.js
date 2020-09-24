import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = ({ loaderState, text, left, top }) => {
  return (
    <div
      id="center_loader"
      style={{
        position: 'absolute',
        top,
        left,
        zIndex: 999,
      }}
    >
      {/* <div className="cssload-dots">
        <div className="cssload-dot" />
        <div className="cssload-dot" />
        <div className="cssload-dot" />
        <div className="cssload-dot" />
        <div className="cssload-dot" />
      </div>

      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="12"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0	0 1 0 0 0	0 0 1 0 0	0 0 0 18 -7"
              result="goo"
            />
          </filter>
        </defs>
      </svg> */}

      <Loader
        type="Bars"
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
Loading.defaultProps = {
  loaderState: true,
  text: 'Loading...Please Wait.',
  color: '#c21c2e',
  left: '37%',
  top: '36%',
};
export default Loading;
// Loading.propTypes = {
//   loaderState: PropTypes.bool,
//   text: PropTypes.string,
//   color: PropTypes.string,
// };
