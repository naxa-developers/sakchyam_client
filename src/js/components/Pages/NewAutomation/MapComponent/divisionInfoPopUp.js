/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { toUpper } from 'lodash';

export default function divisionInfoPopUp(props) {
  const code = props.data;
  console.log('code ', code);
  return (
    <div className="map-popup" style={{ left: '30vw' }}>
      <div className="map-popup-container">
        <div className="map-popup-body">
          <div className="map-popup-header">
            <h3>
              {code.type}:{code.name}
            </h3>
            <h4>Count:{code.count}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
