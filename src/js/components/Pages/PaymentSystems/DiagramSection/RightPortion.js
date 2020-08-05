import React from 'react';

const RightPortion = ({
  isRedActive,
  isBlueActive,
  isGreenActive,
  onRedClick,
  onBlueClick,
  onGreenClick,
}) => {
  return (
    <div
      className={
        isBlueActive ? 'retail-payement active' : 'retail-payement'
      }
    >
      <div className="top-section-payment">
        <h3>Retail payment System</h3>
        <div
          className={
            isRedActive
              ? 'switch-connect-system active'
              : 'switch-connect-system'
          }
        >
          <div className="payment-card switch-system">
            <h5>Card and Switch System</h5>
            <ul className="payment-logos">
              <li>
                <a href="#">
                  <img src="img/visa.png" alt="visa" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="img/master.png" alt="master" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="img/switches.png" alt="switches" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="img/NePS.png" alt="nepse" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="img/SCT.png" alt="sct" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="img/npn.png" alt="npn" />
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Other Switches</span>
                </a>
              </li>
            </ul>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="135.861"
              height="9.436"
              viewBox="0 0 135.861 9.436"
              className={
                isBlueActive
                  ? 'nrb-switch-line nrb-medium-line active'
                  : 'nrb-switch-line nrb-medium-line'
              }
            >
              <g
                id="medium-retail-line"
                transform="translate(-144.5 -280)"
                opacity=""
              >
                <path
                  id="Intersection_5"
                  data-name="Intersection 5"
                  d="M0,0,8.481,4.136,0,9.436Z"
                  transform="translate(271.88 280)"
                  fill=""
                />
                <line
                  id="Line_124"
                  data-name="Line 124"
                  x2="127"
                  transform="translate(144.5 284.5)"
                  fill="none"
                  stroke=""
                  strokeWidth="2"
                  strokeDasharray="5"
                />
              </g>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="175.86"
              height="9.436"
              viewBox="0 0 175.86 9.436"
              className={
                isRedActive
                  ? 'rtgs-switch-line active'
                  : 'rtgs-switch-line'
              }
            >
              <g id="rtgs-right-line" opacity="">
                <path
                  id="Intersection_5"
                  data-name="Intersection 5"
                  d="M0,0,8.481,4.136,0,9.436Z"
                  transform="translate(167.379)"
                  fill=""
                />
                <line
                  id="Line_124"
                  data-name="Line 124"
                  x2="166.999"
                  transform="translate(0 4.5)"
                  fill="none"
                  stroke=" "
                  strokeWidth="2"
                  strokeDasharray="5"
                />
              </g>
            </svg>
          </div>
          <div className="payment-card connectips-system">
            <ul className="payment-logos">
              <li>
                <a href="#">
                  <img
                    src="img/nepal-clearing-house.png"
                    alt="connect ips"
                  />
                </a>
              </li>
            </ul>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="135.861"
              height="9.436"
              viewBox="0 0 135.861 9.436"
              className={
                isBlueActive
                  ? 'nrb-switch-line nrb-medium-line active'
                  : 'nrb-switch-line nrb-medium-line'
              }
            >
              <g
                id="medium-retail-line"
                transform="translate(-144.5 -280)"
                opacity=""
              >
                <path
                  id="Intersection_5"
                  data-name="Intersection 5"
                  d="M0,0,8.481,4.136,0,9.436Z"
                  transform="translate(271.88 280)"
                  fill=""
                />
                <line
                  id="Line_124"
                  data-name="Line 124"
                  x2="127"
                  transform="translate(144.5 284.5)"
                  fill="none"
                  stroke=""
                  strokeWidth="2"
                  strokeDasharray="5"
                />
              </g>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="175.86"
              height="9.436"
              viewBox="0 0 175.86 9.436"
              className={
                isRedActive
                  ? 'rtgs-switch-line active'
                  : 'rtgs-switch-line'
              }
            >
              <g id="rtgs-right-line" opacity="">
                <path
                  id="Intersection_5"
                  data-name="Intersection 5"
                  d="M0,0,8.481,4.136,0,9.436Z"
                  transform="translate(167.379)"
                  fill=""
                />
                <line
                  id="Line_124"
                  data-name="Line 124"
                  x2="166.999"
                  transform="translate(0 4.5)"
                  fill="none"
                  stroke=" "
                  strokeWidth="2"
                  strokeDasharray="5"
                />
              </g>
            </svg>
          </div>
        </div>
        <div className="payment-card psp-system">
          <h5>PSPs/PSOs</h5>
          <ul className="payment-logos">
            <li>
              <a href="#">
                <img src="img/imepay.png" alt="ime pay" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="img/eSewa-Servie.png" alt="esewa" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="img/khalti.png" alt="khalti" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="img/CellPay-logo.png" alt="cellpay" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="img/nepal-telecom.png" alt="telecom" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="img/ncell.png" alt="ncell" />
              </a>
            </li>
            <li>
              <a href="#">
                <span>Other Switches</span>
              </a>
            </li>
          </ul>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="135.861"
            height="9.436"
            viewBox="0 0 135.861 9.436"
            className={
              isBlueActive
                ? 'nrb-switch-line nrb-medium-line active'
                : 'nrb-switch-line nrb-medium-line'
            }
          >
            <g
              id="medium-retail-line"
              transform="translate(-144.5 -280)"
              opacity=""
            >
              <path
                id="Intersection_5"
                data-name="Intersection 5"
                d="M0,0,8.481,4.136,0,9.436Z"
                transform="translate(271.88 280)"
                fill=""
              />
              <line
                id="Line_124"
                data-name="Line 124"
                x2="127"
                transform="translate(144.5 284.5)"
                fill="none"
                stroke=""
                strokeWidth="2"
                strokeDasharray="5"
              />
            </g>
          </svg>
        </div>
      </div>
      <div
        className={
          isGreenActive
            ? 'bottom-section-payment active'
            : 'bottom-section-payment'
        }
      >
        <div className="payment-card bfis">
          <h5>BFIs</h5>
          <ul className="payment-logos">
            <li>
              <a href="#">
                <span>Banks</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Financial Institutions</span>
              </a>
            </li>
          </ul>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="135.861"
            height="9.436"
            viewBox="0 0 135.861 9.436"
            className={
              isBlueActive
                ? 'nrb-switch-line nrb-medium-line active'
                : 'nrb-switch-line nrb-medium-line'
            }
          >
            <g
              id="medium-retail-line"
              transform="translate(-144.5 -280)"
              opacity=""
            >
              <path
                id="Intersection_5"
                data-name="Intersection 5"
                d="M0,0,8.481,4.136,0,9.436Z"
                transform="translate(271.88 280)"
                fill=""
              />
              <line
                id="Line_124"
                data-name="Line 124"
                x2="127"
                transform="translate(144.5 284.5)"
                fill="none"
                stroke=""
                strokeWidth="2"
                strokeDasharray="5"
              />
            </g>
          </svg>
        </div>
        <div className="payment-card bfis">
          <h5>Capital Market Players</h5>
          <ul className="payment-logos">
            <li>
              <a href="#">
                <img src="img/nepse.png" alt="nepse" />
              </a>
            </li>
          </ul>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="97.361"
            height="9.436"
            viewBox="0 0 97.361 9.436"
            className={
              isGreenActive
                ? 'cs-capital-line active'
                : 'cs-capital-line'
            }
          >
            <g id="csd-right-line" opacity="">
              <path
                id="Intersection_5"
                data-name="Intersection 5"
                d="M0,0,8.481,4.136,0,9.436Z"
                transform="translate(88.88)"
                fill=""
              />
              <line
                id="Line_124"
                data-name="Line 124"
                x2="88.5"
                transform="translate(0 4.5)"
                fill="none"
                stroke=""
                strokeWidth="2"
                strokeDasharray="5"
              />
            </g>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="135.861"
            height="9.436"
            viewBox="0 0 135.861 9.436"
            className={
              isBlueActive
                ? 'nrb-switch-line nrb-medium-line active'
                : 'nrb-switch-line nrb-medium-line'
            }
          >
            <g
              id="medium-retail-line"
              transform="translate(-144.5 -280)"
              opacity=""
            >
              <path
                id="Intersection_5"
                data-name="Intersection 5"
                d="M0,0,8.481,4.136,0,9.436Z"
                transform="translate(271.88 280)"
                fill=""
              />
              <line
                id="Line_124"
                data-name="Line 124"
                x2="127"
                transform="translate(144.5 284.5)"
                fill="none"
                stroke=""
                strokeWidth="2"
                strokeDasharray="5"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RightPortion;
