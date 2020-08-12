import React from 'react';
import ContentLoader from 'react-content-loader';

const LeftSidebarLoaderPP = props => (
  <ContentLoader
    speed={2}
    width={308}
    height={170}
    viewBox="0 0 308 170"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="308" height="170" />
  </ContentLoader>
);

export default LeftSidebarLoaderPP;
