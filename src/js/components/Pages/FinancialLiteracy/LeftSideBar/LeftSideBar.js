import React, { Component } from 'react';

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <aside className="sidebar left-sidebar literacy-sidebar">
        <div className="sidebar-in">
          <div className="aside-header">
            <button type="button" className="common-button is-bg">
              Financial Literacy
            </button>
          </div>
          <div className="aside-body">
            <div className="sidebar-widget">
              <h6 className="title">Partner Type</h6>
              <div className="widget-body">
                <div className="widget-tag partner-tag">
                  <a href="#">
                    <span>Microfinance</span>
                  </a>
                  <a href="#">
                    <span>Commercial Bank</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="sidebar-widget partner-institue">
              <h6 className="title">Partner Institution</h6>
              <div className="widget-body">
                <div className="checklist-group">
                  <div className="checklist-header">
                    <div className="custom-checkbox">
                      <input
                        id="Initiative"
                        type="checkbox"
                        name="Initiative"
                      />
                      <label htmlFor="Initiative">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    <li>
                      <a href="#">
                        <div className="custom-checkbox">
                          <input
                            id="Initiative"
                            type="checkbox"
                            name="Initiative"
                          />
                          <label htmlFor="Initiative">
                            <span> VLBS Laghubitta </span>
                          </label>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="custom-checkbox">
                          <input
                            id="Initiative"
                            type="checkbox"
                            name="Initiative"
                          />
                          <label htmlFor="Initiative">
                            <span> Unique Laghubitta </span>
                          </label>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="custom-checkbox">
                          <input
                            id="Initiative"
                            type="checkbox"
                            name="Initiative"
                          />
                          <label htmlFor="Initiative">
                            <span> Nirdhan Utthan Laghubitta</span>
                          </label>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="custom-checkbox">
                          <input
                            id="Initiative"
                            type="checkbox"
                            name="Initiative"
                          />
                          <label htmlFor="Initiative">
                            <span> Kisan Laghubitta </span>
                          </label>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="custom-checkbox">
                          <input
                            id="Initiative"
                            type="checkbox"
                            name="Initiative"
                          />
                          <label htmlFor="Initiative">
                            <span> Chhimek Laghubitta </span>
                          </label>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div className="custom-checkbox">
                          <input
                            id="Initiative"
                            type="checkbox"
                            name="Initiative"
                          />
                          <label htmlFor="Initiative">
                            <span> Sahara Cooperative </span>
                          </label>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="sidebar-widget">
              <h6 className="title">Program Initiative</h6>
              <div className="widget-body">
                <div className="widget-tag Program-tag">
                  <a href="#">
                    <small className="icon is-red" />
                    <span>PGT</span>
                  </a>
                  <a href="#" className="active">
                    <small className="icon is-orange" />
                    <span>Centre meeting</span>
                  </a>
                  <a href="#">
                    <small className="icon is-blue" />
                    <span>IVR</span>
                  </a>
                  <a href="#">
                    <small className="icon is-pink" />
                    <span>Tab</span>
                  </a>
                  <a href="#">
                    <small className="icon is-green" />
                    <span>street drama</span>
                  </a>
                  <a href="#">
                    <small className="icon is-other" />
                    <span>others</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="apply-buttons buttons end">
              <button
                type="button"
                className="common-button is-clear "
              >
                reset
              </button>
              <button
                type="button"
                className="common-button is-bg is-disable"
              >
                apply
              </button>
            </div>
          </div>
        </div>
      </aside>
    );
  }
}

export default LeftSideBar;
