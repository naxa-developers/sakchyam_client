import React, { Component } from 'react';

class RightSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      props: {
        activeView,
        activeOverview,
        setActiveView,
        setActiveOverview,
      },
    } = this;
    return (
      <aside
        className="sidebar right-sidebar literacy-right-sidebar"
        style={{ maxWidth: '345px' }}
      >
        <div className="sidebar-in">
          <div className="right-sidebar-header">
            <h5>Overview</h5>
            {activeView === 'visualization' ? (
              <a
                onClick={() => {
                  setActiveView('map');
                }}
                onKeyUp={() => {
                  setActiveView('map');
                }}
                role="tab"
                tabIndex="0"
              >
                View on map
              </a>
            ) : (
              <a
                onClick={() => {
                  setActiveView('visualization');
                }}
                onKeyUp={() => {
                  setActiveView('visualization');
                }}
                role="tab"
                tabIndex="0"
              >
                Back to Visualization
              </a>
            )}
          </div>
          <div className="aside-body">
            <div className="sidebar-widget">
              <div className="widget-body is-dark">
                <ul className="widget-list">
                  <li>
                    <div className="widget-content">
                      <h6>Investment Focus</h6>
                      <span>2</span>
                    </div>
                    <div className="widget-icon">
                      <span>
                        <i className="material-icons">payments</i>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="widget-content">
                      <h6>Projects</h6>
                      <span>54</span>
                    </div>
                    <div className="widget-icon">
                      <span>
                        <i className="material-icons">assignment</i>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="widget-content">
                      <h6>Partner Institutions</h6>
                      <span>112</span>
                    </div>
                    <div className="widget-icon">
                      <span>
                        <i className="material-icons">
                          location_city
                        </i>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="widget-content">
                      <h6>Total Beneficiaries</h6>
                      <span>2</span>
                    </div>
                    <div className="widget-icon">
                      <span>
                        <i className="material-icons">people</i>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="widget-content">
                      <h6>Total Budgeted S-CF Contribution</h6>
                      <span>रू 589,509,062</span>
                    </div>
                    <div className="widget-icon">
                      <span>
                        <i className="material-icons">
                          monetization_on
                        </i>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="widget-content">
                      <h6>Branches</h6>
                      <span>112</span>
                    </div>
                    <div className="widget-icon">
                      <span>
                        <i className="material-icons">store</i>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="widget-content">
                      <h6>BLB</h6>
                      <span>54</span>
                    </div>
                    <div className="widget-icon">
                      <span>
                        <i className="material-icons">
                          account_balance
                        </i>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="widget-content">
                      <h6>Extension Counter</h6>
                      <span>112</span>
                    </div>
                    <div className="widget-icon">
                      <span>
                        <i className="material-icons">
                          local_convenience_store
                        </i>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="widget-content">
                      <h6>Tablet</h6>
                      <span>54</span>
                    </div>
                    <div className="widget-icon">
                      <span>
                        <i className="material-icons">tablet_mac</i>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="widget-content">
                      <h6>Other Major Products</h6>
                      <span>112</span>
                    </div>
                    <div className="widget-icon">
                      <span>
                        <i className="material-icons">local_offer</i>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`expand-button ${
            activeOverview ? 'active' : ''
          } `}
        >
          <button
            type="button"
            onClick={setActiveOverview}
            className="common-button is-clear close-all"
          >
            <i className="material-icons">chevron_right</i>
          </button>
        </div>
      </aside>
    );
  }
}

export default RightSideBar;
