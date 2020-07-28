/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

export default function MunicipalityPopUp(props) {
  const data = props.selectedMuni;

  const mobileChceck =
    data.communication_mobile === 'Yes' ? true : false;
  const landlineChceck =
    data.communication_landline === 'Yes' ? true : false;
  const internetChceck =
    data.communication_internet === 'Yes' ? true : false;
  const motherChceck =
    data.communication_internet_other === 'Yes' ? true : false;
  return (
    <div className="map-popup">
      <div className="map-popup-container">
        <div className="map-popup-body">
          <div className="map-popup-header">
            <h3>{data.municipality_name}</h3>
            <h5>{data.district_name}</h5>
          </div>
          <span className="close-icon">
            <i className="material-icons">close</i>
          </span>
          <div className="map-popup-content">
            <ul className="map-popup-list">
              <li>
                <p>Head-Quarter of the Local Unit</p>
                <b>{data.head_quarter}</b>
              </li>
              <li>
                <p>HDI of District</p>
                <b>{data.hdi}</b>
              </li>
              <li>
                <p>Population in Local Unit</p>
                <b>{data.population}</b>
              </li>
              <li>
                <p>Yearly Central Government Funding</p>
                <b>Rs. {data.yearly_fund}</b>
              </li>
              <li>
                <p>{data.social_security_recipients}</p>
                <b>3,001</b>
              </li>
              <li>
                <p>Yearly Social Security Payments</p>
                <b>Rs. {data.yearly_social_security_payment}</b>
              </li>
              <li>
                <p>
                  Road distance from nearest commercial bank before
                  establishment of branch
                </p>
                <b>
                  {data.nearest_branch_distance === -1
                    ? 'N/A'
                    : data.nearest_branch_distance}
                </b>
              </li>
            </ul>
          </div>
          <div className="map-popup-footer">
            <h5>Available Means of Communication</h5>
            <ul className="communication">
              <li>
                <i
                  className={
                    landlineChceck
                      ? 'material-icons check'
                      : 'material-icons cancel'
                  }
                >
                  {landlineChceck ? 'check_circle' : 'cancel'}
                </i>
                <span>Landline</span>
              </li>
              <li>
                <i
                  className={
                    internetChceck
                      ? 'material-icons check'
                      : 'material-icons cancel'
                  }
                >
                  {internetChceck ? 'check_circle' : 'cancel'}
                </i>
                <span>Internet</span>
              </li>
              <li>
                <i
                  className={
                    mobileChceck
                      ? 'material-icons check'
                      : 'material-icons cancel'
                  }
                >
                  {mobileChceck ? 'check_circle' : 'cancel'}
                </i>
                <span>Mobile</span>
              </li>
              <li>
                <i
                  className={
                    motherChceck
                      ? 'material-icons check'
                      : 'material-icons cancel'
                  }
                >
                  {motherChceck ? 'check_circle' : 'cancel'}
                </i>
                <span>other internet</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
