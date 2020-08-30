/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

function clickHandler(e) {
  e.target.classList.toggle('active');
}
export default function divisionInfoPopUp(props) {
  const {
    data: { popupData, fulldata },
  } = props;

  return fulldata && fulldata.props ? (
    <div className="mapbox-popup-content">
      <div
        className="map-popup-view"
        style={{ marginBottom: '0 !important' }}
      >
        <div className="map-popup-view-header">
          <h5>{fulldata && fulldata.props.federal_name}</h5>
          <div className="icons">
            <i className="material-icons">payments</i>
            <b>{fulldata && fulldata.props.count}</b>
          </div>
        </div>
        <div className="acc is-after is-border">
          {popupData &&
            popupData.map(data => {
              return (
                <div
                  className="acc-list active"
                  onClick={e => {
                    clickHandler(e);
                  }}
                  onKeyDown={e => {
                    clickHandler(e);
                  }}
                >
                  <div className="acc-header">
                    <h5>{data.partner_name}</h5>
                  </div>
                  <div className="acc-body">
                    <ul>
                      {data.achievementType.map(achievement => {
                        return (
                          <li>
                            <a>{achievement.name}</a>
                            <a>{achievement.count}</a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="map-view-footer" />
      </div>
    </div>
  ) : null;
}
