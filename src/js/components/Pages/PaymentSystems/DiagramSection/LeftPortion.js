/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React from 'react';
import NepalBankLogo from '../../../../../img/nepal-bank.png';

const LeftPortion = ({ refs }) => {
  return (
    <aside className="payment-sidebar">
      <div className="payment-sidebar-cover">
        <a href="#" className="nepalbank-logo">
          <img src={NepalBankLogo} alt="nepal bank" />
        </a>
        <ul className="top-payment">
          <li
            className="red-light"
            ref={el => (refs.current[0] = el)}
          >
            <a href={() => {}}>RTGS</a>
          </li>
          <li className="blue-light">
            <a href={() => {}}>NRB Interoperable Switch</a>
          </li>
          <li className="green-light">
            <a href={() => {}}>CSD</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default LeftPortion;
