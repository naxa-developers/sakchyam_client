import React from 'react';

export default function Popup() {
  return `
    <div
      className="leaflet-popup-content federal-popup"
      style={{ width: '100px' }}
    >
      <div className="map-popup-view">
        <div className="map-popup-view-header">
          <h5>headerTitle</h5>
          <div className="icons">
            <i className="material-icons">tablet_mac</i>
            <b>header count</b>
          </div>
        </div>
        <div className="map-view-footer" />
      </div>
    </div>`;
}
