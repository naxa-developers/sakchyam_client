/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { useLayoutEffect } from 'react';
import NepalBankLogo from '../../../../../img/nepal-bank.png';
import PlotLeftLines from './CreateLines/PlotLeftLines';
import { middleLineData } from './CreateLines/lines.data';

const LeftPortion = ({
  leftSVGContainerRef,
  leftCardRefs,
  leftSideContainerRef,
  rtgsRef,
  coordinates,
}) => {
  return (
    <aside className="payment-sidebar">
      <div
        className="payment-sidebar-cover"
        ref={leftSideContainerRef}
        style={{
          paddingLeft: '0px',
          display: 'flex',
          alignItems: 'flex-end',
          height: '440px',
        }}
      >
        <div
          style={{
            width: '60px',
            height: '74%',
            // backgroundColor: 'red',
          }}
          ref={leftSVGContainerRef}
        >
          <PlotLeftLines coordinates={coordinates} />
        </div>
        <div>
          <a href="#" className="nepalbank-logo">
            <img src={NepalBankLogo} alt="nepal bank" />
          </a>
          <ul className="top-payment">
            <div
              style={{
                color: 'red',
                height: '20px',
                width: '20px',
              }}
            />
            <li
              className="red-light"
              ref={el => (leftCardRefs.current[0] = el)}
            >
              <a href={() => {}}>RTGS</a>
            </li>
            <li
              className="blue-light"
              ref={el => (leftCardRefs.current[1] = el)}
            >
              <a href={() => {}}>NRB Interoperable Switch</a>
            </li>
            <li
              className="green-light"
              ref={el => (leftCardRefs.current[2] = el)}
            >
              <a href={() => {}}>CSD</a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default LeftPortion;
