/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

export default function MunicipalityPopUp(props) {
  const data = props.selectedMuni;
  console.log('data===>', data);

  const mobileChceck =
    data.communication_mobile === 'Yes' ? true : false;
  const landlineChceck =
    data.communication_landline === 'Yes' ? true : false;
  const internetChceck =
    data.communication_internet === 'Yes' ? true : false;
  const motherChceck =
    data.communication_internet_other === 'Yes' ? true : false;
  const mainChceck =
    data.available_electricity_maingrid === 'Yes' ? true : false;
  const microChceck =
    data.available_electricity_micro_hydro === 'Yes' ? true : false;
  return (
    <div className="map-popup">
      <div className="map-popup-container">
        <div className="map-popup-body">
          <div className="map-popup-header">
            <h3>{data.municipality_name}</h3>
            <h5>{data.district_name}</h5>
          </div>
          <span
            className="close-icon"
            onClick={props.localPopUpClose}
          >
            <i className="material-icons">close</i>
          </span>
          <div
            className="map-popup-content"
            style={{ height: '60vh' }}
          >
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
                <p>Categorisation by Sakchyam</p>
                <b>{data.categorisation_by_sakchyam}</b>
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
                <p>Social Security Recipients</p>
                <b>{data.social_security_recipients}</b>
              </li>
              <li>
                <p>Yearly Social Security Payments</p>
                <b>Rs. {data.yearly_social_security_payment}</b>
              </li>
              <li>
                <p>Nearest Road Distance</p>
                <b>
                  {data.nearest_road_distance === -1
                    ? 'N/A'
                    : data.nearest_road_distance}
                </b>
              </li>
              <li>
                <p>Nearest Police Presence</p>
                <b>
                  {data.nearest_police_distance === -1
                    ? 'N/A'
                    : data.nearest_police_distance}
                </b>
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
            <div
              className="map-popup-footer"
              style={{ padding: '.6125rem 0 .6125rem 0' }}
            >
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
            <div
              className="map-popup-footer"
              style={{ padding: '0 0 .6125rem 0' }}
            >
              <h5>Available Means of Electricity</h5>
              <ul className="communication">
                <li>
                  <i
                    className={
                      mainChceck
                        ? 'material-icons check'
                        : 'material-icons cancel'
                    }
                  >
                    {mainChceck ? 'check_circle' : 'cancel'}
                  </i>
                  <span>Main Grid</span>
                </li>
                <li>
                  <i
                    className={
                      microChceck
                        ? 'material-icons check'
                        : 'material-icons cancel'
                    }
                  >
                    {microChceck ? 'check_circle' : 'cancel'}
                  </i>
                  <span>Micro Hydro</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
