import React from 'react';
import ContentLoader from 'react-content-loader';

const OverviewLoader = props => (
  <ContentLoader
    speed={2}
    width={313}
    height={500}
    viewBox="0 0 313 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="47" y="19" rx="3" ry="3" width="161" height="12" />
    <rect x="46" y="43" rx="3" ry="3" width="42" height="28" />
    <circle cx="276" cy="50" r="27" />
    <rect x="47" y="86" rx="3" ry="3" width="161" height="12" />
    <rect x="46" y="110" rx="3" ry="3" width="42" height="28" />
    <circle cx="276" cy="117" r="27" />
    <rect x="47" y="157" rx="3" ry="3" width="161" height="12" />
    <rect x="46" y="181" rx="3" ry="3" width="42" height="28" />
    <circle cx="276" cy="188" r="27" />
    <rect x="45" y="229" rx="3" ry="3" width="161" height="12" />
    <rect x="44" y="253" rx="3" ry="3" width="42" height="28" />
    <circle cx="274" cy="260" r="27" />
    <rect x="45" y="302" rx="3" ry="3" width="161" height="12" />
    <rect x="44" y="326" rx="3" ry="3" width="42" height="28" />
    <circle cx="274" cy="333" r="27" />
    <rect x="45" y="368" rx="3" ry="3" width="161" height="12" />
    <rect x="44" y="392" rx="3" ry="3" width="42" height="28" />
    <circle cx="274" cy="399" r="27" />
    <rect x="45" y="439" rx="3" ry="3" width="161" height="12" />
    <rect x="44" y="463" rx="3" ry="3" width="42" height="28" />
    <circle cx="274" cy="470" r="27" />
  </ContentLoader>
);

export default OverviewLoader;
