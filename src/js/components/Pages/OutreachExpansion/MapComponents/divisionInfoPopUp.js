/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Bother from '../../../../../img/Group5084.png';
import Bblb from '../../../../../img/Group5086.png';
import Bbank from '../../../../../img/Group5085.png';
import { numberWithCommas } from '../../../common/utilFunctions';

export default function divisionInfoPopUp(props) {
  const code = props.data;
  // console.log(props, 'props');
  let popupHtml = (
    <div className="icons">
      <b>
        {code.totalCount ? numberWithCommas(+code.totalCount) : ''}
      </b>
    </div>
  );
  if (
    props.selectedDropdown
      .toLowerCase()
      .includes('available means of communication') ||
    props.selectedDropdown.toLowerCase().includes('availability')
  ) {
    popupHtml = (
      <div className="icons">
        <b>
          {code.totalCount === 0
            ? 'No'
            : code.totalCount === 1
            ? 'Yes'
            : ''}
        </b>
      </div>
    );
  } else if (
    props.selectedDropdown.toLowerCase().includes('distance')
  ) {
    popupHtml = (
      <div className="icons">
        <b>
          {code.totalCount
            ? `${numberWithCommas(+code.totalCount)} Km`
            : ''}
        </b>
      </div>
    );
  } else if (
    (props.selectedDropdown.toLowerCase().includes('yearly') &&
      props.selectedDropdown.toLowerCase().includes('funding')) ||
    (props.selectedDropdown.toLowerCase().includes('yearly') &&
      props.selectedDropdown.toLowerCase().includes('payments'))
  ) {
    popupHtml = (
      <div className="icons">
        <b>
          {code.totalCount
            ? `NPR ${numberWithCommas(+code.totalCount)}`
            : ''}
        </b>
      </div>
    );
  }
  return (
    <div className="mapbox-popup-content">
      <div
        className="map-popup-view"
        style={{ marginBottom: '0 !important' }}
      >
        <div className="map-popup-view-header">
          <h5>{code.name}</h5>
          {popupHtml}
        </div>
        {props.mapViewDataBy === 'general_outreach' && (
          <ul style={{ height: '100%', fontSize: '10px' }}>
            {code.cBank > 0 && (
              <li
                style={{
                  marginBottom: '0 !important',
                  paddingRight: '0.5vw',
                }}
              >
                <div className="organization-content">
                  <div className="org-header">
                    <>
                      <img
                        src={Bbank}
                        alt=""
                        height="17px"
                        width="17px"
                      />
                      <span style={{ paddingLeft: '5px' }}>
                        Commerical Bank Branch
                      </span>
                    </>
                    <div className="icon-list">
                      <div className="icons">
                        <>{code.cBank}</>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )}
            {code.oBank > 0 && (
              <li
                style={{
                  marginBottom: '0 !important',
                  paddingRight: '0.5vw',
                }}
              >
                <div className="organization-content">
                  <div className="org-header">
                    <>
                      <img
                        src={Bother}
                        alt=""
                        height="17px"
                        width="17px"
                      />
                      <span style={{ paddingLeft: '5px' }}>
                        {' '}
                        MFI/Other FIs branches
                      </span>
                    </>
                    <div className="icon-list">
                      <div className="icons">
                        <>{code.oBank}</>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )}

            {code.cBlb > 0 && (
              <li
                style={{
                  marginBottom: '0 !important',
                  paddingRight: '0.5vw',
                }}
              >
                <div className="organization-content">
                  <div className="org-header">
                    <>
                      <img
                        src={Bblb}
                        alt=""
                        height="17px"
                        width="17px"
                        // style={{ paddingRight: '5px' }}
                      />
                      <span style={{ paddingLeft: '5px' }}>BLB</span>
                    </>
                    <div className="icon-list">
                      <div className="icons">
                        <>{code.cBlb}</>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
