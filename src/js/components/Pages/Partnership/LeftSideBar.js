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
          <div className="aside-header ">
            <button
              type="button"
              className="common-button is-bg partnership-button"
            >
              sakchyam partnerships
            </button>
          </div>
          <div className="aside-body">
            <div className="sidebar-widget partner-institue">
              <h6 className="title">Investment Focus</h6>
              <div className="widget-body">
                <div className="checklist-group">
                  <div className="checklist-header">
                    <div className="custom-checkbox">
                      <input
                        id="Initiative1"
                        type="checkbox"
                        name="Initiative1"
                      />
                      <label htmlFor="Initiative1">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    <li>
                      <a>
                        <div className="custom-checkbox">
                          <input
                            id="Initiative2"
                            type="checkbox"
                            name="Initiative2"
                          />
                          <label htmlFor="Initiative2">
                            <span> VLBS Laghubitta </span>
                          </label>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div className="custom-checkbox">
                          <input
                            id="Initiative3"
                            type="checkbox"
                            name="Initiative3"
                          />
                          <label htmlFor="Initiative3">
                            <span> Unique Laghubitta </span>
                          </label>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
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
                      <a>
                        <div className="custom-checkbox">
                          <input
                            id="Initiative4"
                            type="checkbox"
                            name="Initiative4"
                          />
                          <label htmlFor="Initiative4">
                            <span> Kisan Laghubitta </span>
                          </label>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div className="custom-checkbox">
                          <input
                            id="Initiative5"
                            type="checkbox"
                            name="Initiative5"
                          />
                          <label htmlFor="Initiative5">
                            <span> Chhimek Laghubitta </span>
                          </label>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div className="custom-checkbox">
                          <input
                            id="Initiative6"
                            type="checkbox"
                            name="Initiative6"
                          />
                          <label htmlFor="Initiative6">
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
              <h6 className="title">project status</h6>
              <div className="widget-body">
                <div className="widget-tag partner-tag">
                  <a>
                    <span>completed</span>
                  </a>
                  <a>
                    <span>ongoing</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="sidebar-widget partner-institue">
              <h6 className="title">Projects</h6>
              <div className="widget-body">
                <div className="checklist-group">
                  <div className="checklist-header">
                    <div className="custom-checkbox">
                      <input
                        id="Initiative7"
                        type="checkbox"
                        name="Initiative7"
                      />
                      <label htmlFor="Initiative7">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    <li>
                      <a>
                        <div className="custom-checkbox">
                          <input
                            id="Initiative8"
                            type="checkbox"
                            name="Initiative8"
                          />
                          <label htmlFor="Initiative8">
                            <span> VLBS Laghubitta </span>
                          </label>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div className="custom-checkbox">
                          <input
                            id="Initiative9"
                            type="checkbox"
                            name="Initiative9"
                          />
                          <label htmlFor="Initiative9">
                            <span> Unique Laghubitta </span>
                          </label>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div className="custom-checkbox">
                          <input
                            id="Initiative10"
                            type="checkbox"
                            name="Initiative10"
                          />
                          <label htmlFor="Initiative10">
                            <span> Nirdhan Utthan Laghubitta</span>
                          </label>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div className="custom-checkbox">
                          <input
                            id="Initiative11"
                            type="checkbox"
                            name="Initiative"
                          />
                          <label htmlFor="Initiative11">
                            <span> Kisan Laghubitta </span>
                          </label>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div className="custom-checkbox">
                          <input
                            id="Initiative12"
                            type="checkbox"
                            name="Initiative12"
                          />
                          <label htmlFor="Initiative12">
                            <span> Chhimek Laghubitta </span>
                          </label>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div className="custom-checkbox">
                          <input
                            id="Initiative13"
                            type="checkbox"
                            name="Initiative13"
                          />
                          <label htmlFor="Initiative13">
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
              <h6 className="title">Partner Type</h6>
              <div className="widget-body">
                <div className="widget-tag partner-tag">
                  <a>
                    <span>Microfinance</span>
                  </a>
                  <a>
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
                        id="Initiative14"
                        type="checkbox"
                        name="Initiative14"
                      />
                      <label htmlFor="Initiative14">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    <li>
                      <a>
                        <div className="custom-checkbox">
                          <input
                            id="Initiative15"
                            type="checkbox"
                            name="Initiative15"
                          />
                          <label htmlFor="Initiative15">
                            <span> VLBS Laghubitta </span>
                          </label>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div className="custom-checkbox">
                          <input
                            id="Initiative16"
                            type="checkbox"
                            name="Initiative16"
                          />
                          <label htmlFor="Initiative16">
                            <span> Unique Laghubitta </span>
                          </label>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div className="custom-checkbox">
                          <input
                            id="Initiative17"
                            type="checkbox"
                            name="Initiative17"
                          />
                          <label htmlFor="Initiative17">
                            <span> Nirdhan Utthan Laghubitta</span>
                          </label>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div className="custom-checkbox">
                          <input
                            id="Initiative18"
                            type="checkbox"
                            name="Initiative18"
                          />
                          <label htmlFor="Initiative18">
                            <span> Kisan Laghubitta </span>
                          </label>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div className="custom-checkbox">
                          <input
                            id="Initiative19"
                            type="checkbox"
                            name="Initiative19"
                          />
                          <label htmlFor="Initiative19">
                            <span> Chhimek Laghubitta </span>
                          </label>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a>
                        <div className="custom-checkbox">
                          <input
                            id="Initiative20"
                            type="checkbox"
                            name="Initiative20"
                          />
                          <label htmlFor="Initiative20">
                            <span> Sahara Cooperative </span>
                          </label>
                        </div>
                      </a>
                    </li>
                  </ul>
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
