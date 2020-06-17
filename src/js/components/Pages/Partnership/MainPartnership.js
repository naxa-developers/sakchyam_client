import React, { Component } from 'react';
import MapboxPartnership from './MapComponents/MapboxPartnership';
import DownloadIcon from '../../../../img/get_app.png';
import ExpandIcon from '../../../../img/open_in_full-black-18dp.png';
import Headers from '../../Header';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import Sunburst from './Charts/SunBurst/SunBurst';
import sunBurstData from './Charts/SunBurst/sunburstData';
import StackedBar from './Charts/StackedBar/StackedBar';
import RadarChart from './Charts/RadarChart/RadarChart';
import CirclePackChart from './Charts/CirclePack/CirclePackChart';
import SankeyChart from './Charts/SankeyChart/SankeyChart';

class MainPartnership extends Component {
  constructor() {
    super();
    this.state = {
      activeFilter: false,
      activeOverview: false,
      viewDataBy: 'Beneficiaries',
      activeView: 'visualization',
      map: null,
      mapViewBy: 'province',
      vectorTileUrl:
        'https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}',
    };
  }

  componentDidMount() {}

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

  setMapViewBy = selectedMapView => {
    this.setState({
      mapViewBy: selectedMapView,
    });
    if (selectedMapView === 'province') {
      this.setState({
        vectorTileUrl:
          'https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}',
      });
    } else if (selectedMapView === 'district') {
      this.setState({
        vectorTileUrl:
          'https://vectortile.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}',
      });
    } else if (selectedMapView === 'municipality') {
      this.setState({
        vectorTileUrl:
          'https://vectortile.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}',
      });
    }
  };

  render() {
    const {
      state: {
        map,
        mapViewBy,
        activeFilter,
        activeOverview,
        viewDataBy,
        activeView,
        vectorTileUrl,
      },
      // props: {},
    } = this;
    const sankeyChartwidth =
      document.getElementById('sankeyChart') &&
      document.getElementById('sankeyChart').offsetWidth;

    return (
      <>
        <Headers />
        <div
          className={`automation-wrapper literacy-wrapper ${
            activeOverview ? 'expand-right-sidebar' : ''
          }`}
        >
          <LeftSideBar />
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
                        <li
                          className={
                            mapViewBy === 'province' ? 'active' : ''
                          }
                        >
                          <a
                            role="tab"
                            tabIndex="-1"
                            onClick={() => {
                              this.setMapViewBy('province');
                            }}
                            onKeyUp={() => {
                              this.setMapViewBy('province');
                            }}
                          >
                            Province
                          </a>
                        </li>
                        <li
                          className={
                            mapViewBy === 'district' ? 'active' : ''
                          }
                        >
                          <a
                            role="tab"
                            tabIndex="-1"
                            onClick={() => {
                              this.setMapViewBy('district');
                            }}
                            onKeyUp={() => {
                              this.setMapViewBy('district');
                            }}
                          >
                            District
                          </a>
                        </li>
                        <li
                          className={
                            mapViewBy === 'municipality'
                              ? 'active'
                              : ''
                          }
                        >
                          <a
                            role="tab"
                            tabIndex="-1"
                            onClick={() => {
                              this.setMapViewBy('municipality');
                            }}
                            onKeyUp={() => {
                              this.setMapViewBy('municipality');
                            }}
                          >
                            Municipality
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="filter-row">
                      <div className="filter-list">
                        <div className="form-group">
                          <select className="form-control">
                            <option defaultValue>
                              select province
                            </option>
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
                      tabIndex="-1"
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
                      tabIndex="-1"
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
                      tabIndex="-1"
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
                          <div className="card-body">
                            <Sunburst
                              data={sunBurstData}
                              width={500}
                              height={370}
                              count_member="size"
                            />
                          </div>
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
                          <div className="card-body">
                            <StackedBar />
                          </div>
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
                          <div className="card-body">
                            <RadarChart />
                          </div>
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
                          <div className="card-body">
                            <CirclePackChart />
                          </div>
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
                          <div className="card-body" id="sankeyChart">
                            <SankeyChart
                              cardWidth={sankeyChartwidth}
                              activeOverview={activeOverview}
                            />
                          </div>
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
                  {activeView === 'map' && (
                    <MapboxPartnership
                      map={map}
                      vectorTileUrl={vectorTileUrl}
                    />
                  )}
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
          <RightSideBar
            activeOverview={activeOverview}
            activeView={activeView}
            setActiveOverview={this.setActiveOverview}
            setActiveView={this.setActiveView}
          />
        </div>
        {/* <MapboxPartnership /> */}
      </>
    );
  }
}

export default MainPartnership;
