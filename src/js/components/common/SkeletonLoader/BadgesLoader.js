import React from 'react';
import ContentLoader from 'react-content-loader';

const BadgesLoader = props => (
  <ContentLoader
    className="test-loader"
    speed={2}
    style={{ width: '100%' }}
    // width={280}
    height={171}
    // viewBox="0 0 100 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="2" y="18" rx="27" ry="27" width="250" height="29" />
    <rect x="2" y="58" rx="27" ry="27" width="250" height="29" />
    <rect x="2" y="95" rx="27" ry="27" width="250" height="29" />
    <rect x="0" y="134" rx="27" ry="27" width="250" height="29" />
  </ContentLoader>
);

export default BadgesLoader;
