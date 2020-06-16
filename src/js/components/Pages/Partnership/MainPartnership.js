import React, { Component } from 'react';
import MapboxPartnership from './MapComponents/MapboxPartnership';
import DownloadIcon from '../../../../img/get_app.png';
import ExpandIcon from '../../../../img/open_in_full-black-18dp.png';
import Headers from '../../Header';

class MainPartnership extends Component {
  constructor() {
    super();
    this.state = {
      activeFilter: false,
      activeOverview: false,
      viewDataBy: 'Beneficiaries',
      activeView: 'visualization',
    };
  }

  setFilterTab = () => {
    this.setState(prevState => ({
      activeFilter: !prevState.activeFilter,
    }));
  };

  setActiveOverview = () => {
    this.setState(prevState => ({
      activeOverview: !prevState.activeOverview,
    }));
  };

  setViewDataBy = selectedView => {
    this.setState({
      viewDataBy: selectedView,
    });
  };

  setActiveView = selectedView => {
    this.setState({
      activeView: selectedView,
    });
  };

  render() {
    const {
      state: { activeFilter, activeOverview, viewDataBy, activeView },
      // props: {},
    } = this;
    return (
      <>
        <Headers />
        <div
          className={`automation-wrapper literacy-wrapper ${
            activeOverview ? 'expand-right-sidebar' : ''
          }`}
        >
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
                            id="Initiative"
                            type="checkbox"
                            name="Initiative"
                          />
                          <label htmlFor="Initiative">All</label>
                        </div>
                      </div>
                      <ul className="checkbox-list">
                        <li>
                          <a>
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
                          <a>
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
                          <a>
                            <div className="custom-checkbox">
                              <input
                                id="Initiative"
                                type="checkbox"
                                name="Initiative"
                              />
                              <label htmlFor="Initiative">
                                <span>
                                  {' '}
                                  Nirdhan Utthan Laghubitta
                                </span>
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
                                <span> Kisan Laghubitta </span>
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
                                <span> Chhimek Laghubitta </span>
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
                            id="Initiative"
                            type="checkbox"
                            name="Initiative"
                          />
                          <label htmlFor="Initiative">All</label>
                        </div>
                      </div>
                      <ul className="checkbox-list">
                        <li>
                          <a>
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
                          <a>
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
                          <a>
                            <div className="custom-checkbox">
                              <input
                                id="Initiative"
                                type="checkbox"
                                name="Initiative"
                              />
                              <label htmlFor="Initiative">
                                <span>
                                  {' '}
                                  Nirdhan Utthan Laghubitta
                                </span>
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
                                <span> Kisan Laghubitta </span>
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
                                <span> Chhimek Laghubitta </span>
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
                            id="Initiative"
                            type="checkbox"
                            name="Initiative"
                          />
                          <label htmlFor="Initiative">All</label>
                        </div>
                      </div>
                      <ul className="checkbox-list">
                        <li>
                          <a>
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
                          <a>
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
                          <a>
                            <div className="custom-checkbox">
                              <input
                                id="Initiative"
                                type="checkbox"
                                name="Initiative"
                              />
                              <label htmlFor="Initiative">
                                <span>
                                  {' '}
                                  Nirdhan Utthan Laghubitta
                                </span>
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
                                <span> Kisan Laghubitta </span>
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
                                <span> Chhimek Laghubitta </span>
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
          <main className="main">
            <div className="main-card literacy-main-card">
              <div className="partnership-filter">
                <div
                  className={`filter-bar ${
                    activeFilter ? 'active' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={this.setFilterTab}
                    className="common-buttonm is-borderm filter-button is-icon"
                  >
                    <i className="material-icons">filter_list</i>
                    <span>Filters</span>
                  </button>
                  <div className="filter-content">
                    <div className="view-list">
                      <span>view by</span>
                      <ul className="tab-list">
                        <li className="active">
                          <a>Province</a>
                        </li>
                        <li>
                          <a>District</a>
                        </li>
                        <li>
                          <a>Municipality</a>
                        </li>
                      </ul>
                    </div>
                    <div className="filter-row">
                      <div className="filter-list">
                        <div className="form-group">
                          <select className="form-control">
                            <option selected>select province</option>
                            <option>province 1</option>
                            <option>province 2</option>
                            <option>province 3</option>
                            <option>province 4</option>
                            <option>province 5</option>
                            <option>province 6</option>
                            <option>province 7</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <select className="form-control">
                            <option selected>select province</option>
                            <option>province 1</option>
                            <option>province 2</option>
                            <option>province 3</option>
                            <option>province 4</option>
                            <option>province 5</option>
                            <option>province 6</option>
                            <option>province 7</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <select className="form-control">
                            <option selected>select province</option>
                            <option>province 1</option>
                            <option>province 2</option>
                            <option>province 3</option>
                            <option>province 4</option>
                            <option>province 5</option>
                            <option>province 6</option>
                            <option>province 7</option>
                          </select>
                        </div>
                      </div>
                      <div className="buttons is-end">
                        <button
                          type="button"
                          className="common-button is-clear"
                        >
                          <i className="material-icons">refresh</i>
                        </button>
                        <button
                          type="button"
                          className="common-button is-clear"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="partnership-tab">
                  <span>view data by</span>
                  <ul>
                    <li
                      className={
                        viewDataBy === 'Beneficiaries' ? 'active' : ''
                      }
                      onClick={() => {
                        this.setViewDataBy('Beneficiaries');
                      }}
                      onKeyDown={() => {
                        this.setViewDataBy('Beneficiaries');
                      }}
                      role="tab"
                      tabIndex="0"
                    >
                      <a>Beneficiaries</a>
                    </li>
                    <li
                      className={
                        viewDataBy === 'Budget' ? 'active' : ''
                      }
                      onClick={() => {
                        this.setViewDataBy('Budget');
                      }}
                      onKeyDown={() => {
                        this.setViewDataBy('Budget');
                      }}
                      role="tab"
                      tabIndex="0"
                    >
                      <a>Budget Allocated</a>
                    </li>
                    <li
                      className={
                        viewDataBy === 'Leverage' ? 'active' : ''
                      }
                      onClick={() => {
                        this.setViewDataBy('Leverage');
                      }}
                      onKeyDown={() => {
                        this.setViewDataBy('Leverage');
                      }}
                      role="tab"
                      tabIndex="0"
                    >
                      <a>Leverage</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="literacy-tab-content">
                <div
                  className="literacy-tab-item"
                  style={
                    activeView === 'visualization'
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                >
                  <div className="graph-view">
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="card">
                          <div className="card-header">
                            <h5>
                              Investment focus zoomable sunburst
                            </h5>
                            <div className="header-icons">
                              <span className="">
                                <img src={DownloadIcon} alt="open" />
                              </span>
                              <span
                                className="zoom"
                                popup-link="graph-modal"
                              >
                                <img src={ExpandIcon} alt="open" />
                              </span>
                            </div>
                          </div>
                          <div className="card-body" />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="card">
                          <div className="card-header">
                            <h5>Stacked bar with Partner Type</h5>
                            <div className="header-icons">
                              <span className="">
                                <img src={DownloadIcon} alt="open" />
                              </span>
                              <span className="">
                                <img src={ExpandIcon} alt="open" />
                              </span>
                            </div>
                          </div>
                          <div className="card-body" />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="card">
                          <div className="card-header">
                            <h5>Spider Net diagram</h5>
                            <div className="header-icons">
                              <span className="">
                                <img src={DownloadIcon} alt="open" />
                              </span>
                              <span
                                className="zoom"
                                popup-link="graph-modal"
                              >
                                <img src={ExpandIcon} alt="open" />
                              </span>
                            </div>
                          </div>
                          <div className="card-body" />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="card">
                          <div className="card-header">
                            <h5>Zoomable Circle Packing</h5>
                            <div className="header-icons">
                              <span className="">
                                <img src={DownloadIcon} alt="open" />
                              </span>
                              <span className="">
                                <img src={ExpandIcon} alt="open" />
                              </span>
                            </div>
                          </div>
                          <div className="card-body" />
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="card">
                          <div className="card-header">
                            <h5>
                              Contribution of program initiatives
                            </h5>
                            <div className="header-icons">
                              <span className="">
                                <img src={DownloadIcon} alt="open" />
                              </span>
                              <span className="">
                                <img src={ExpandIcon} alt="open" />
                              </span>
                            </div>
                          </div>
                          <div className="card-body" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="literacy-tab-item"
                  style={
                    activeView === 'map'
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                >
                  {/* <div id="map" className="map"> */}
                  <MapboxPartnership />
                  {/* </div> */}
                </div>
              </div>
            </div>
          </main>
          <div className="popup" id="graph-modal">
            <div className="popup-container lg-popup">
              <div className="popup-body">
                <span className="close-icon">
                  <i className="material-icons">close</i>
                </span>
                <div className="popup-header no-flex">
                  <h3>modal header</h3>
                </div>
                <div className="popup-content" />
                <div className="popup-footer buttons is-end">
                  <button
                    type="button"
                    className="common-button is-border"
                  >
                    <span>cancel</span>
                  </button>
                  <button
                    type="button"
                    className="common-button is-bg"
                  >
                    <span>save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <aside className="sidebar right-sidebar literacy-right-sidebar">
            <div className="sidebar-in">
              <div className="right-sidebar-header">
                <h5>Overview</h5>
                {activeView === 'visualization' ? (
                  <a
                    onClick={() => {
                      this.setActiveView('map');
                    }}
                    onKeyDown={() => {
                      this.setActiveView('map');
                    }}
                    role="tab"
                    tabIndex="0"
                  >
                    View on map
                  </a>
                ) : (
                  <a
                    onClick={() => {
                      this.setActiveView('visualization');
                    }}
                    onKeyDown={() => {
                      this.setActiveView('visualization');
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
                            <i className="material-icons">
                              assignment
                            </i>
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
                            <i className="material-icons">
                              tablet_mac
                            </i>
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
                            <i className="material-icons">
                              local_offer
                            </i>
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
                onClick={this.setActiveOverview}
                className="common-button is-clear close-all"
              >
                <i className="material-icons">chevron_right</i>
              </button>
            </div>
          </aside>
        </div>
        {/* <MapboxPartnership /> */}
      </>
    );
  }
}

export default MainPartnership;
