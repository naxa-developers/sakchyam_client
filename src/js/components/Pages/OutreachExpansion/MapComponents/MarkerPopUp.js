/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

export default function MunicipalityPopUp(props) {
  const data = props.markerData;
  const dEffect = data.demonstration_effect === 'Yes' ? true : false;
  const g2pPayment = data.g2p_payment === 'Yes' ? true : false;

  return (
    <div className="map-popup">
      <div className="map-popup-container">
        <div className="map-popup-body">
          <div className="map-popup-header">
            <h3>{data.partner}</h3>
            <h5>{data.partner_type}</h5>
          </div>
          <span
            className="close-icon"
            onClick={() => {
              props.closeMarker();
            }}
          >
            <i className="material-icons">close</i>
          </span>
          <div className="map-popup-content">
            <ul className="map-popup-list">
              <li>
                <p>Point of Service</p>
                <b>{data.point_service}</b>
              </li>
              <li>
                <p>Province</p>
                <b>{data.province}</b>
              </li>
              <li>
                <p>District</p>
                <b>{data.district}</b>
              </li>
              <li>
                <p>Municiplaity</p>
                <b>{data.municipality}</b>
              </li>
              <li>
                <p>Market Place</p>
                <b>{data.market_name}</b>
              </li>
              <li>
                <p>Date Established</p>
                <b> {data.date_established}</b>
              </li>
              <li>
                <p>GPS Point</p>
                <b>{data.gps_point}</b>
              </li>
            </ul>
          </div>
          <div className="map-popup-footer">
            <h5>Expanded Financial Service</h5>
            <ul className="communication">
              <li>
                <i
                  className={
                    dEffect
                      ? 'material-icons check'
                      : 'material-icons cancel'
                  }
                >
                  {dEffect ? 'check_circle' : 'cancel'}
                </i>
                <span>Demonstration Effect</span>
              </li>
              <li>
                <i
                  className={
                    g2pPayment
                      ? 'material-icons check'
                      : 'material-icons cancel'
                  }
                >
                  {g2pPayment ? 'check_circle' : 'cancel'}
                </i>
                <span>G2P Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
