/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React from 'react';
import NepalBankLogo from '../../../../../img/nepal-bank.png';

const LeftPortion = ({
  leftCardRefs,
  leftSideContainerRef,
  rtgsRef,
}) => {
  return (
    <aside className="payment-sidebar">
      <div
        className="payment-sidebar-cover"
        ref={leftSideContainerRef}
      >
        <a href="#" className="nepalbank-logo">
          <img src={NepalBankLogo} alt="nepal bank" />
        </a>
        <ul className="top-payment">
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
    </aside>
  );
};

export default LeftPortion;
