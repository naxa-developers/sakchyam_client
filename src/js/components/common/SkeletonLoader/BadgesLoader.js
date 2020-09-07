import React from 'react';
import ContentLoader from 'react-content-loader';

const BadgesLoader = props => (
  <ContentLoader
    speed={2}
    width={280}
    height={171}
    viewBox="0 0 330 171"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="2" y="18" rx="27" ry="27" width="143" height="29" />
    <rect x="2" y="58" rx="27" ry="27" width="143" height="29" />
    <rect x="154" y="18" rx="27" ry="27" width="143" height="29" />
    <rect x="155" y="59" rx="27" ry="27" width="143" height="29" />
    <rect x="2" y="95" rx="27" ry="27" width="143" height="29" />
    <rect x="158" y="95" rx="27" ry="27" width="143" height="29" />
    <rect x="0" y="134" rx="27" ry="27" width="143" height="29" />
    <rect x="159" y="134" rx="27" ry="27" width="143" height="29" />
  </ContentLoader>
);

export default BadgesLoader;
