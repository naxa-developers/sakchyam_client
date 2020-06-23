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
