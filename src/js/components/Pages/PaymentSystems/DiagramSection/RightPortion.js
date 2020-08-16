/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
import React from 'react';
import Visa from '../../../../../img/visa.png';
import Master from '../../../../../img/master.png';
import Switches from '../../../../../img/switches.png';
import NePS from '../../../../../img/NePS.png';
import SCT from '../../../../../img/SCT.png';
import NPN from '../../../../../img/npn.png';
import NepalClearingHouse from '../../../../../img/nepal-clearing-house.png';
import IMEPay from '../../../../../img/imepay.png';
import eSEWA from '../../../../../img/eSewa-Servie.png';
import Khalti from '../../../../../img/khalti.png';
import CellPay from '../../../../../img/CellPay-logo.png';
import NepalTelecom from '../../../../../img/nepal-telecom.png';
import Ncell from '../../../../../img/ncell.png';
import Nepse from '../../../../../img/nepse.png';

const RightPortion = ({
  rightCardRefs,
  onRightCardClick,
  selectedCardRef,
  isLeftCardSelected,
}) => {
  return (
    <div
      className="retail-payement"
      style={{
        paddingLeft: '0px',
        alignSelf: 'flex-start',
        position: 'relative',
        zIndex: '-1',
        left: '-30px',
      }}
    >
      <div className="top-section-payment">
        <h3>Retail payment System</h3>
        <div className="switch-connect-system">
          <div
            className={
              !isLeftCardSelected && selectedCardRef === 0
                ? 'payment-card switch-system active'
                : 'payment-card switch-system'
            }
            style={{
              borderColor:
                !isLeftCardSelected &&
                selectedCardRef === 0 &&
                '#E11D3F',
            }}
            ref={el => (rightCardRefs.current[0] = el)}
            onClick={() => {
              onRightCardClick(0);
            }}
          >
            <h5>Card and Switch System</h5>
            <ul className="payment-logos">
              <li>
                <a href={() => {}}>
                  <img src={Visa} alt="visa" />
                </a>
              </li>
              <li>
                <a href={() => {}}>
                  <img src={Master} alt="master" />
                </a>
              </li>
              <li>
                <a href={() => {}}>
                  <img src={Switches} alt="switches" />
                </a>
              </li>
              <li>
                <a href={() => {}}>
                  <img src={NePS} alt="nepse" />
                </a>
              </li>
              <li>
                <a href={() => {}}>
                  <img src={SCT} alt="sct" />
                </a>
              </li>
              <li>
                <a href={() => {}}>
                  <img src={NPN} alt="npn" />
                </a>
              </li>
              <li>
                <a href={() => {}}>
                  <span>Other Switches</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          className={
            !isLeftCardSelected && selectedCardRef === 1
              ? 'payment-card psp-system active'
              : 'payment-card psp-system'
          }
          style={{
            borderColor:
              !isLeftCardSelected &&
              selectedCardRef === 1 &&
              '#E11D3F',
          }}
          ref={el => (rightCardRefs.current[1] = el)}
          onClick={() => onRightCardClick(1)}
        >
          <h5>PSPs/PSOs</h5>
          <ul className="payment-logos">
            <li>
              <a href={() => {}}>
                <img src={IMEPay} alt="ime pay" />
              </a>
            </li>
            <li>
              <a href={() => {}}>
                <img src={eSEWA} alt="esewa" />
              </a>
            </li>
            <li>
              <a href={() => {}}>
                <img src={Khalti} alt="khalti" />
              </a>
            </li>
            <li>
              <a href={() => {}}>
                <img src={CellPay} alt="cellpay" />
              </a>
            </li>
            {/* <li>
              <a href="#">
                <img src={NepalTelecom} alt="telecom" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src={Ncell} alt="ncell" />
              </a>
            </li> */}
            <li>
              <a href={() => {}}>
                <span>PSPs/PSOs</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bottom-section-payment">
        <div
          className={
            !isLeftCardSelected && selectedCardRef === 2
              ? 'payment-card connectips-system active'
              : 'payment-card connectips-system'
          }
          ref={el => (rightCardRefs.current[2] = el)}
          onClick={() => onRightCardClick(2)}
        >
          <ul className="payment-logos">
            <a href={() => {}}>
              <img src={NepalClearingHouse} alt="connect ips" />
            </a>
            <li>
              <a>
                <span>NPI</span>
              </a>
            </li>
            <li>
              <a>
                <span>IPS</span>
              </a>
            </li>
            <li>
              <a>
                <span>Connect IPS</span>
              </a>
            </li>
          </ul>
        </div>
        <div
          className={
            !isLeftCardSelected && selectedCardRef === 3
              ? 'payment-card bfis active'
              : 'payment-card bfis'
          }
          ref={el => (rightCardRefs.current[3] = el)}
          onClick={() => onRightCardClick(3)}
        >
          <h5>BFIs</h5>
          <ul className="payment-logos">
            <li>
              <a href={() => {}}>
                <span>Banks</span>
              </a>
            </li>
            <li>
              <a href={() => {}}>
                <span>Financial Institutions</span>
              </a>
            </li>
          </ul>
        </div>
        <div
          className={
            !isLeftCardSelected && selectedCardRef === 4
              ? 'payment-card capital active'
              : 'payment-card capital'
          }
          ref={el => (rightCardRefs.current[4] = el)}
          onClick={() => onRightCardClick(4)}
        >
          <h5>Capital Market Players</h5>
          <ul className="payment-logos">
            <li>
              <a href={() => {}}>
                <img src={Nepse} alt="nepse" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RightPortion;
