import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapboxPartnership from './MapComponents/MapboxPartnership';
import Headers from '../../Header';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import MiddleChartSection from './MiddleChartSection/MiddleChartSection';
import {
  getPartnershipInvestmentFocus,
  getProjectListData,
  getMapDataByProvince,
  getMapDataByDistrict,
  getMapDataByMunicipality,
  getFilteredMapData,
  getRadialData,
  getPartnersList,
  filterPartnerListByPartnerType,
} from '../../../actions/partnership.actions';

class MainPartnership extends Component {
  constructor() {
    super();
    this.state = {
      // Event Handle Section
      investmentFocusSelection: [],
      projectSelection: [],
      partnerSelection: [],
      projectStatus: [],
      partnerType: [
        'Microfinance Institutions/Cooperatives',
        'Commercial Bank and Other Partners',
      ],
      // UI Section
      activeFilter: false,
      activeOverview: false,
      viewDataBy: 'allocated_beneficiary',
      activeView: 'visualization',
      // map Section
      map: null,
      mapViewBy: 'province',
      vectorTileUrl:
        'https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}',
    };
  }

  componentDidMount() {
    const { viewDataBy } = this.state;
    this.props.getRadialData();
    this.props.getPartnershipInvestmentFocus();
    this.props.getProjectListData();
    this.props.getMapDataByProvince(viewDataBy);
    this.props.getMapDataByDistrict(viewDataBy);
    this.props.getMapDataByMunicipality(viewDataBy);
    this.props.getPartnersList();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      investmentFocusSelection,
      viewDataBy,
      mapViewBy,
      partnerType,
    } = this.state;
    if (
      prevState.investmentFocusSelection !== investmentFocusSelection
    ) {
      this.props.getProjectListData(investmentFocusSelection);
    }
    if (prevState.viewDataBy !== viewDataBy) {
      this.props.getFilteredMapData(mapViewBy, viewDataBy);
    }
    if (prevState.partnerType !== partnerType) {
      this.props.filterPartnerListByPartnerType(partnerType);
    }
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

  setMapViewBy = selectedMapView => {
    const { viewDataBy } = this.state;
    this.setState({
      mapViewBy: selectedMapView,
    });
    if (selectedMapView === 'province') {
      this.props.getFilteredMapData('province', viewDataBy);
      this.setState({
        vectorTileUrl:
          'https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}',
      });
    } else if (selectedMapView === 'district') {
      this.props.getFilteredMapData('district', viewDataBy);
      this.setState({
        vectorTileUrl:
          'https://vectortile.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}',
      });
    } else if (selectedMapView === 'municipality') {
      this.props.getFilteredMapData('municipality', viewDataBy);
      this.setState({
        vectorTileUrl:
          'https://vectortile.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}',
      });
    }
  };

  handleInvestmentFocusCheckbox = e => {
    const {
      state: { investmentFocusSelection },
    } = this;
    const {
      target: { name, checked, value },
    } = e;
    console.log(value);
    this.setState(preState => {
      if (checked) {
        return {
          investmentFocusSelection: [
            ...preState.investmentFocusSelection,
            name,
          ],
          projectSelection: [],
        };
      }
      if (!checked) {
        const newArr = investmentFocusSelection.filter(
          daily => daily !== name,
        );
        return {
          investmentFocusSelection: newArr,
          projectSelection: [],
        };
      }
      return null;
    });
  };

  handleProjectSelectionCheckbox = e => {
    const {
      state: { projectSelection },
    } = this;
    const {
      target: { name, checked },
    } = e;

    this.setState(preState => {
      if (checked) {
        return {
          projectSelection: [...preState.projectSelection, name],
        };
      }
      if (!checked) {
        const newArr = projectSelection.filter(
          projectselected => projectselected !== name,
        );
        return { projectSelection: newArr };
      }
      return null;
    });
  };

  handlePartnerSelectionCheckbox = e => {
    const {
      state: { partnerSelection },
    } = this;
    const {
      target: { name, checked },
    } = e;

    this.setState(preState => {
      if (checked) {
        return {
          partnerSelection: [...preState.partnerSelection, name],
        };
      }
      if (!checked) {
        const newArr = partnerSelection.filter(
          partnerSelected => partnerSelected !== name,
        );
        return { partnerSelection: newArr };
      }
      return null;
    });
  };

  handleProjectStatus = clickedValue => {
    const { projectStatus } = this.state;
    if (projectStatus.includes(clickedValue)) {
      const filteredData = projectStatus.filter(
        data => data !== clickedValue,
      );
      this.setState({ projectStatus: filteredData });
    } else {
      const addedPartnerType = projectStatus.concat(clickedValue);
      this.setState({ projectStatus: addedPartnerType });
    }
  };

  handlePartnerType = clickedValue => {
    const { partnerType } = this.state;
    if (partnerType.includes(clickedValue)) {
      const filteredData = partnerType.filter(
        data => data !== clickedValue,
      );
      this.setState({ partnerType: filteredData });
    } else {
      const addedPartnerType = partnerType.concat(clickedValue);
      this.setState({ partnerType: addedPartnerType });
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
        investmentFocusSelection,
        projectSelection,
        projectStatus,
        partnerSelection,
        partnerType,
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
          <LeftSideBar
            investmentFocusSelection={investmentFocusSelection}
            handleInvestmentFocusCheckbox={
              this.handleInvestmentFocusCheckbox
            }
            projectSelection={projectSelection}
            handleProjectSelectionCheckbox={
              this.handleProjectSelectionCheckbox
            }
            projectStatus={projectStatus}
            handleProjectStatus={this.handleProjectStatus}
            partnerType={partnerType}
            handlePartnerType={this.handlePartnerType}
            partnerSelection={partnerSelection}
            handlePartnerSelectionCheckbox={
              this.handlePartnerSelectionCheckbox
            }
          />
          <main className="main">
            <div className="main-card literacy-main-card">
              <div
                className={`partnership-filter ${
                  activeView === 'map' ? 'is-position' : ''
                }`}
              >
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
                        viewDataBy === 'allocated_beneficiary'
                          ? 'active'
                          : ''
                      }
                      onClick={() => {
                        this.setViewDataBy('allocated_beneficiary');
                      }}
                      onKeyDown={() => {
                        this.setViewDataBy('allocated_beneficiary');
                      }}
                      role="tab"
                      tabIndex="-1"
                    >
                      <a>Beneficiaries</a>
                    </li>
                    <li
                      className={
                        viewDataBy === 'allocated_budget'
                          ? 'active'
                          : ''
                      }
                      onClick={() => {
                        this.setViewDataBy('allocated_budget');
                      }}
                      onKeyDown={() => {
                        this.setViewDataBy('allocated_budget');
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
                <MiddleChartSection
                  sankeyChartwidth={sankeyChartwidth}
                  activeOverview={activeOverview}
                  activeView={activeView}
                />
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
const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});
export default connect(mapStateToProps, {
  getPartnershipInvestmentFocus,
  getProjectListData,
  getMapDataByProvince,
  getMapDataByDistrict,
  getMapDataByMunicipality,
  getFilteredMapData,
  getRadialData,
  getPartnersList,
  filterPartnerListByPartnerType,
})(MainPartnership);
