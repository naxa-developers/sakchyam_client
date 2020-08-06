import React from 'react';

const RightPortion = () => {
  return (
    <div className="retail-payement">
      <div className="top-section-payment">
        <h3>Retail payment System</h3>
        <div className="switch-connect-system ">
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
        </div>
      </div>
      <div className="bottom-section-payment">
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
        </div>
      </div>
    </div>
  );
};

export default RightPortion;
