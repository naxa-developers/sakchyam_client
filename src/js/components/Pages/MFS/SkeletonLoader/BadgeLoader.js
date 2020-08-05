import React from 'react';
import ContentLoader from 'react-content-loader';

const BadgeLoader = props => (
  <ContentLoader
    speed={2}
    width={278}
    height={127}
    viewBox="0 0 278 127"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="4" y="3" rx="3" ry="3" width="270" height="18" />
    <rect x="3" y="34" rx="3" ry="3" width="270" height="18" />
    <rect x="4" y="66" rx="3" ry="3" width="270" height="18" />
    <rect x="4" y="97" rx="3" ry="3" width="270" height="18" />
  </ContentLoader>
);

export default BadgeLoader;
