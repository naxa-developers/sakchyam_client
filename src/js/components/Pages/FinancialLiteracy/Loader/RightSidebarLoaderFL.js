import React from 'react';
import ContentLoader from 'react-content-loader';

export const WidgetCardLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={319}
      height={207}
      viewBox="0 0 319 207"
      backgroundColor="#e5e0e0"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="3" ry="3" width="130" height="14" />
      <rect x="0" y="105" rx="3" ry="3" width="70" height="22" />
      <rect x="0" y="80" rx="3" ry="3" width="130" height="14" />
      <rect x="0" y="25" rx="3" ry="3" width="70" height="22" />
      <rect x="0" y="157" rx="3" ry="3" width="130" height="14" />
      <rect x="0" y="181" rx="3" ry="3" width="70" height="22" />
    </ContentLoader>
  );
};

export const WidgetBodyLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={370}
      height={380}
      viewBox="0 0 370 380"
      backgroundColor="#e5e0e0"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="3" ry="3" width="231" height="16" />
      <rect x="86" y="107" rx="3" ry="3" width="140" height="24" />
      <rect x="86" y="275" rx="3" ry="3" width="24" height="24" />
      <rect x="86" y="48" rx="3" ry="3" width="270" height="24" />
      <rect x="86" y="165" rx="3" ry="3" width="41" height="24" />
      <rect x="86" y="222" rx="3" ry="3" width="84" height="24" />
      <rect x="86" y="330" rx="3" ry="3" width="245" height="24" />
    </ContentLoader>
  );
};
