/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

export default function divisionInfoPopUp(props) {
  const code = props.data;
  return (
    <div className="mapbox-popup-content">
      <div
        className="map-popup-view"
        style={{ marginBottom: '0 !important' }}
      >
        <div className="map-popup-view-header">
          <h5>{code.name}</h5>
          {code.totalCount && (
            <div className="icons">
              <b>{code.totalCount}</b>
            </div>
          )}
        </div>
        {/* {props.mapViewDataBy === 'general_outreach' && (
          <li style={{ marginBottom: '0 !important' }}>
            <div className="organization-icon" />
            <div className="organization-content">
              <div className="org-header">
                <>Commercial Bank</>
                <div className="icon-list">
                  <div className="icons">
                    <i className="material-icons">tablet_mac</i>
                    <>{props.data.bBank}</>
                  </div>
                </div>
              </div>
            </div>
          </li>
        )} */}
      </div>
    </div>
  );
}
