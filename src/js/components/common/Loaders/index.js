/* eslint-disable import/prefer-default-export */
import React from 'react';
import ContentLoader from 'react-content-loader';

export const LeftSidebarBoxLoader = props => (
  <ContentLoader
    speed={2}
    width="15vw"
    height={170}
    viewBox="0 0 15vw 170"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="15vw" height={170} />
  </ContentLoader>
);

export function ResponsiveLoader(props) {
  const heightValue = props.height ? props.height : '100%';
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height={heightValue}
      viewBox={`0 0 100% ${heightValue}`}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect
        x="0"
        y="0"
        rx="0"
        ry="0"
        width="100%"
        height={heightValue}
      />
    </ContentLoader>
  );
}
