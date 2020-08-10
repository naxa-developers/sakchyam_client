/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React from 'react';
import NepalBankLogo from '../../../../../img/nepal-bank.png';
import PlotLeftLines from './CreateLines/PlotLeftLines';

const LeftPortion = ({
  leftSVGContainerRef,
  leftCardRefs,
  leftSideContainerRef,
  coordinates,
  onLeftCardClick,
  lineColor,
  selectedCardRef,
  isLeftCardSelected,
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
          position: 'relative',
          left: '15px',
          zIndex: '0',
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
          <PlotLeftLines
            lineColor={lineColor}
            coordinates={coordinates}
          />
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
              className={
                isLeftCardSelected && selectedCardRef === 0
                  ? 'red-light active'
                  : 'red-light'
              }
              ref={el => (leftCardRefs.current[0] = el)}
            >
              <a href={() => {}} onClick={() => onLeftCardClick(0)}>
                RTGS
              </a>
            </li>
            <li
              className={
                isLeftCardSelected && selectedCardRef === 1
                  ? 'blue-light active'
                  : 'blue-light'
              }
              ref={el => (leftCardRefs.current[1] = el)}
            >
              <a href={() => {}} onClick={() => onLeftCardClick(1)}>
                National Switch
              </a>
            </li>
            <li
              className={
                isLeftCardSelected && selectedCardRef === 2
                  ? 'green-light active'
                  : 'green-light'
              }
              ref={el => (leftCardRefs.current[2] = el)}
            >
              <a href={() => {}} onClick={() => onLeftCardClick(2)}>
                CSD
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default LeftPortion;
