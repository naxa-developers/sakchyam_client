import React from 'react';
import NepalBankLogo from '../../../../../img/nepal-bank.png';

const LeftPortion = ({
  isRedActive,
  isBlueActive,
  isGreenActive,
  onRedClick,
  onBlueClick,
  onGreenClick,
}) => {
  return (
    <aside className="payment-sidebar">
      <div className="payment-sidebar-cover">
        <a href="#" className="nepalbank-logo">
          <img src={NepalBankLogo} alt="nepal bank" />
        </a>
        <ul className="top-payment">
          <li
            className={isRedActive ? 'red-light active' : 'red-light'}
          >
            <a href={() => {}} onClick={onRedClick}>
              RTGS
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52.5"
              height="9.434"
              viewBox="0 0 52.5 9.434"
              className="rtgs-left-line"
            >
              <g
                id="rtgs-left-line"
                transform="translate(-0.002 -0.001)"
                opacity=""
              >
                <path
                  id="Intersection_5"
                  data-name="Intersection 5"
                  d="M0,0,9.014,5.3,0,9.434Z"
                  transform="translate(9.016 9.435) rotate(180)"
                  fill=""
                />
                <line
                  id="Line_124"
                  data-name="Line 124"
                  x1="43.083"
                  transform="translate(9.419 4.5)"
                  fill="none"
                  stroke=""
                  strokeWidth="2"
                  strokeDasharray="5"
                />
              </g>
            </svg>
          </li>
          <li
            className={
              isBlueActive ? 'blue-light active' : 'blue-light'
            }
          >
            <a href={() => {}} onClick={onBlueClick}>
              NRB Interoperable Switch
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="92.5"
              height="9.434"
              viewBox="0 0 92.5 9.434"
              className="nrb-left-line"
            >
              <g id="nrm-left-line" opacity="">
                <path
                  id="Intersection_5"
                  data-name="Intersection 5"
                  d="M0,0,7.1,5.3,0,9.434Z"
                  transform="translate(7.105 9.434) rotate(180)"
                  fill=""
                />
                <line
                  id="Line_124"
                  data-name="Line 124"
                  x1="85.078"
                  transform="translate(7.422 4.499)"
                  fill="none"
                  stroke=""
                  strokeWidth="2"
                  strokeDasharray="5"
                />
              </g>
            </svg>
          </li>
          <li
            className={
              isGreenActive ? 'green-light active' : 'green-light'
            }
          >
            <a href={() => {}} onClick={onGreenClick}>
              CSD
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="132.5"
              height="9.434"
              viewBox="0 0 132.5 9.434"
              className="cs-left-line"
            >
              <g
                id="csd-left-line"
                transform="translate(-0.002 -0.001)"
                opacity=""
              >
                <path
                  id="Intersection_5"
                  data-name="Intersection 5"
                  d="M0,0,9.014,5.3,0,9.434Z"
                  transform="translate(9.016 9.435) rotate(180)"
                  fill=""
                />
                <line
                  id="Line_124"
                  data-name="Line 124"
                  x1="123.083"
                  transform="translate(9.419 4.5)"
                  fill="none"
                  stroke=""
                  strokeWidth="2"
                  strokeDasharray="5"
                />
              </g>
            </svg>
          </li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38.361"
            height="258.436"
            viewBox="0 0 38.361 258.436"
            className="rtgs-csd"
          >
            <g id="rtgs-csd" transform="translate(-262 -280)">
              <path
                id="Intersection_5"
                data-name="Intersection 5"
                d="M15247.88-15056.352l8.481,4.136-8.481,5.3Z"
                transform="translate(-14956 15336.352)"
                fill={
                  isRedActive
                    ? '#E11D3F'
                    : isGreenActive
                    ? '#1EC853'
                    : ''
                }
                stroke={
                  isRedActive
                    ? '#E11D3F'
                    : isGreenActive
                    ? '#1EC853'
                    : ''
                }
              />
              <line
                id="Line_124"
                data-name="Line 124"
                x2="28.5"
                transform="translate(263 284.5)"
                fill={
                  isRedActive
                    ? '#E11D3F'
                    : isGreenActive
                    ? '#1EC853'
                    : ''
                }
                stroke={
                  isRedActive
                    ? '#E11D3F'
                    : isGreenActive
                    ? '#1EC853'
                    : ''
                }
                strokeWidth="2"
                strokeDasharray="5"
              />
              <line
                id="Line_176"
                data-name="Line 176"
                y2="250"
                transform="translate(263 283.5)"
                fill={
                  isRedActive
                    ? '#E11D3F'
                    : isGreenActive
                    ? '#1EC853'
                    : ''
                }
                stroke={
                  isRedActive
                    ? '#E11D3F'
                    : isGreenActive
                    ? '#1EC853'
                    : ''
                }
                strokeWidth="2"
                strokeDasharray="5"
              />
              <path
                id="Intersection_5-2"
                data-name="Intersection 5"
                d="M15247.88-15056.352l8.481,4.136-8.481,5.3Z"
                transform="translate(-14956 15585.352)"
                fill={
                  isRedActive
                    ? '#E11D3F'
                    : isGreenActive
                    ? '#1EC853'
                    : ''
                }
                stroke={
                  isRedActive
                    ? '#E11D3F'
                    : isGreenActive
                    ? '#1EC853'
                    : ''
                }
              />
              <line
                id="Line_124-2"
                data-name="Line 124"
                x2="28.5"
                transform="translate(263 533.5)"
                fill={
                  isRedActive
                    ? '#E11D3F'
                    : isGreenActive
                    ? '#1EC853'
                    : ''
                }
                stroke={
                  isRedActive
                    ? '#E11D3F'
                    : isGreenActive
                    ? '#1EC853'
                    : ''
                }
                strokeWidth="2"
                strokeDasharray="5"
              />
            </g>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18.361"
            height="112.436"
            viewBox="0 0 18.361 112.436"
            className="rtgs-nrb"
          >
            <g
              id="payment-rtgs-nrb"
              transform="translate(-130.5 -486)"
            >
              <line
                id="Line_177"
                data-name="Line 177"
                y2="103"
                transform="translate(131.5 490.5)"
                fill={
                  isRedActive
                    ? '#E11D3F'
                    : isBlueActive
                    ? '#13A8BE'
                    : ''
                }
                stroke={
                  isRedActive
                    ? '#E11D3F'
                    : isBlueActive
                    ? '#13A8BE'
                    : ''
                }
                strokeWidth="2"
                strokeDasharray="5"
              />
              <path
                id="Intersection_5"
                data-name="Intersection 5"
                d="M0,0,8.481,4.136,0,9.436Z"
                transform="translate(140.38 589)"
                fill={
                  isRedActive
                    ? '#E11D3F'
                    : isBlueActive
                    ? '#13A8BE'
                    : ''
                }
                stroke={
                  isRedActive
                    ? '#E11D3F'
                    : isBlueActive
                    ? '#13A8BE'
                    : ''
                }
              />
              <line
                id="Line_124"
                data-name="Line 124"
                x2="13.19"
                transform="translate(131.431 593.5)"
                fill={
                  isRedActive
                    ? '#E11D3F'
                    : isBlueActive
                    ? '#13A8BE'
                    : ''
                }
                stroke={
                  isRedActive
                    ? '#E11D3F'
                    : isBlueActive
                    ? '#13A8BE'
                    : ''
                }
                strokeWidth="2"
                strokeDasharray="5"
              />
              <line
                id="Line_124-2"
                data-name="Line 124"
                x2="13.19"
                transform="translate(131.431 490.5)"
                fill={
                  isRedActive
                    ? '#E11D3F'
                    : isBlueActive
                    ? '#13A8BE'
                    : ''
                }
                stroke={
                  isRedActive
                    ? '#E11D3F'
                    : isBlueActive
                    ? '#13A8BE'
                    : ''
                }
                strokeWidth="2"
                strokeDasharray="5"
              />
              <path
                id="Intersection_5-2"
                data-name="Intersection 5"
                d="M0,0,8.481,4.136,0,9.436Z"
                transform="translate(140.38 486)"
                fill={
                  isRedActive
                    ? '#E11D3F'
                    : isBlueActive
                    ? '#13A8BE'
                    : ''
                }
                stroke={
                  isRedActive
                    ? '#E11D3F'
                    : isBlueActive
                    ? '#13A8BE'
                    : ''
                }
              />
            </g>
          </svg>
        </ul>
      </div>
    </aside>
  );
};

export default LeftPortion;
