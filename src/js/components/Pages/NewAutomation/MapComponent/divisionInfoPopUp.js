/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

export default function divisionInfoPopUp(props) {
  const code = props.data;
  return (
    <div
      className="mapbox-popup-content"
      
    >
      <div
        className="map-popup-view"
        style={{ marginBottom: '0 !important' }}
      >
        <div className="map-popup-view-header">
          <h5>{code.name}</h5>
          <div className="icons">
            <i className="material-icons">tablet_mac</i>
            <b>{code.totalCount}</b>
          </div>
        </div>
        <ul style={{ height: '100%', fontSize: '10px' }}>
          {code.uniqueData &&
            code.uniqueData.map(data => {
              return (
                <li style={{ marginBottom: '0 !important' }}>
                  <div className="organization-icon" />
                  <div className="organization-content">
                    <div className="org-header">
                      <>{data.partner}</>
                      <div className="icon-list">
                        <div className="icons">
                          <i className="material-icons">tablet_mac</i>
                          <>{data.count}</>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
