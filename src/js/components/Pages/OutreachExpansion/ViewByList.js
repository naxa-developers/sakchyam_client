import React from 'react';

export default function ViewByList(props) {
  return (
    <div className="view-list">
      <span>view by</span>
      <ul className="tab-list">
        <li
          className={props.mapViewBy === 'province' ? 'active' : ''}
        >
          <a
            role="tab"
            tabIndex="-1"
            onClick={() => {
              props.setMapViewBy('province');
            }}
            onKeyUp={() => {
              props.setMapViewBy('province');
            }}
          >
            Province
          </a>
        </li>
        <li
          className={props.mapViewBy === 'district' ? 'active' : ''}
        >
          <a
            role="tab"
            tabIndex="-1"
            onClick={() => {
              props.setMapViewBy('district');
            }}
            onKeyUp={() => {
              props.setMapViewBy('district');
            }}
          >
            District
          </a>
        </li>
        <li
          className={
            props.mapViewBy === 'municipality' ? 'active' : ''
          }
        >
          <a
            role="tab"
            tabIndex="-1"
            onClick={() => {
              props.setMapViewBy('municipality');
            }}
            onKeyUp={() => {
              props.setMapViewBy('municipality');
            }}
          >
            Municipality
          </a>
        </li>
      </ul>
    </div>
  );
}
