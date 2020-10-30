/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

function numberWithCommas(x) {
  if (x !== null) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return x;
}
function clickHandler(e) {
  e.target.classList.toggle('active');
}
export default function divisionInfoPopUp(props) {
  const {
    data: { popupData, fulldata },
  } = props;
  const accList = document.querySelectorAll('.acc-list');
  if (accList) {
    accList.forEach(data => {
      data.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
      });
    });
  }
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
            <b>
              {fulldata && numberWithCommas(fulldata.props.count)}
            </b>
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
                            <a>
                              {numberWithCommas(achievement.count)}
                            </a>
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
