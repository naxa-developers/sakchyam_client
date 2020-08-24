import React from 'react';
import ContentLoader from 'react-content-loader';

const BoxLoader = ({ height }) => (
  <ContentLoader
    speed={2}
    width="100%"
    height={height}
    viewBox="0 0 1200 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="100%" height={height} />
  </ContentLoader>
);

export default BoxLoader;
