import React, { Component } from 'react';
import SakLogo from '../../img/saklogo.png';
import UkAid from '../../img/ukaid.png';
import Logo from '../../img/logo.png';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <footer>
        <div className="footer-info">
          <div className="info-logo">
            <img className="main-logo" src={Logo} alt="" />
            <span className="span_book_15">
              A Small Leap towards Application of Open Data on Aid and
              Budget in Nepal.
            </span>
            <div className="logo-wrap">
              <div className="logo-img">
                <img src={SakLogo} alt="" />
              </div>
              <div className="logo-img">
                <img src={UkAid} alt="" />
              </div>
            </div>
          </div>

          <div className="info-points">
            <span className="span_heavy_13">
              Visualisation Structures
            </span>
            <div className="flex-points-wrap">
              <ul>
                <li className="span_heavy_15">
                  Sakchyam Partnerships
                </li>
                <li className="span_heavy_15">Logical Framework</li>
                <li className="span_heavy_15">Automation </li>
                <li className="span_heavy_15">
                  Product/Process Innovations
                </li>
                <li className="span_heavy_15">Payment Systems</li>
                <li className="span_heavy_15">MFS</li>
              </ul>

              <ul>
                <li className="span_heavy_15">
                  Financial Literacy Initiatives
                </li>
                <li className="span_heavy_15">Outreach Expansion</li>
                <li className="span_heavy_15">
                  Sakchyam Partnerships
                </li>
                <li className="span_heavy_15">Logical Framework</li>
                <li className="span_heavy_15">Automation</li>
                <li className="span_heavy_15">
                  Product/Process Innovations
                </li>
              </ul>
            </div>
          </div>

          <div className="contact">
            <ul>
              <li className="span_heavy_15">FAQs</li>
              <li className="span_heavy_15">Contact</li>
            </ul>
          </div>
        </div>

        <div className="footer-copy">
          <span className="span_book_14">
            &copy; 2020 Sakchyam. All rights reserved.
          </span>
          <span className="span_book_14">
            Privacy
            <span className="border-span">|</span>
            Terms of Service
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
