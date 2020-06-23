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
  filterFinancialDataWithAllFilters,
  getDistrictDataFromProvince,
  getProvinceData,
  getDistrictData,
  getMunicipalityData,
  filterRadialData,
  getSpiderChartData,
  getSankeyChartData,
  filterSankeyChartData,
} from '../../../actions/partnership.actions';
import Loading from '../../common/Loading';

class MainPartnership extends Component {
  constructor() {
    super();
    this.state = {
      // Event Handle Section
      investmentFocusSelection: [],
      projectSelection: [],
      partnerSelection: [],
      projectStatus: [],
      partnerType: [],
      isAllPartnerSelected: false,
      isAllProjectSelected: false,
      isAllInvestmentFocusSelected: false,
      showBarof: 'Provinces',
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
    this.props.getPartnersList();
    this.props.getMapDataByProvince(viewDataBy);
    this.props.getMapDataByDistrict(viewDataBy);
    this.props.getMapDataByMunicipality(viewDataBy);
    this.props.getSpiderChartData();
    this.props.getSankeyChartData();
    this.props.getProvinceData();
    this.props.getDistrictData();
    this.props.getMunicipalityData();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      investmentFocusSelection,
      viewDataBy,
      mapViewBy,
      partnerSelection,
      projectSelection,
      projectStatus,
      partnerType,
    } = this.state;
    if (
      prevState.investmentFocusSelection !== investmentFocusSelection
    ) {
      this.props.getProjectListData(investmentFocusSelection);
      this.props.filterPartnerListByPartnerType(partnerType);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isAllProjectSelected: false });
    }
    if (prevState.viewDataBy !== viewDataBy) {
      // this.props.getMapDataByProvince(viewDataBy);
      this.props.filterFinancialDataWithAllFilters(
        'province',
        viewDataBy,
        partnerSelection,
        projectSelection,
        projectStatus,
      );
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

  handleShowBarOf = value => {
    this.setState({ showBarof: value });
  };

  handleInvestmentParentCheckbox = e => {
    // e.stopPropagation();
    const {
      investmentFocusSelection,
      isAllInvestmentFocusSelected,
    } = this.state;
    if (isAllInvestmentFocusSelected) {
      const allInvestmentElement = document.getElementsByClassName(
        'investment_checkbox',
      );

      for (let i = 0; i < allInvestmentElement.length; i += 1) {
        allInvestmentElement[i].checked = false;
      }
      this.setState({
        investmentFocusSelection: [],
        isAllInvestmentFocusSelected: false,
      });
    } else {
      this.setState({
        isAllInvestmentFocusSelected: true,
      });
      if (e.target.checked === true) {
        const allInvestmentElement = document.getElementsByClassName(
          'investment_checkbox',
        );
        const selectedInvestment = investmentFocusSelection;
        for (let i = 0; i < allInvestmentElement.length; i += 1) {
          allInvestmentElement[i].checked = true;
          selectedInvestment.push(allInvestmentElement[i].name);
        }
        this.setState({
          investmentFocusSelection: selectedInvestment,
        });
        // this.setState({
        //   checkedProgressItems: joined,
        // });
      }
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

  handleProjectParentCheckbox = e => {
    // e.stopPropagation();
    const { projectSelection, isAllProjectSelected } = this.state;
    if (isAllProjectSelected) {
      const allProjectElement = document.getElementsByClassName(
        'project_checkbox',
      );

      for (let i = 0; i < allProjectElement.length; i += 1) {
        allProjectElement[i].checked = false;
      }
      this.setState({
        projectSelection: [],
        isAllProjectSelected: false,
      });
    } else {
      this.setState({
        isAllProjectSelected: true,
      });
      if (e.target.checked === true) {
        const allProjectElement = document.getElementsByClassName(
          'project_checkbox',
        );
        const selectedProject = projectSelection;
        for (let i = 0; i < allProjectElement.length; i += 1) {
          allProjectElement[i].checked = true;
          selectedProject.push(
            parseInt(allProjectElement[i].name, 10),
          );
        }
        this.setState({
          projectSelection: selectedProject,
        });
        // this.setState({
        //   checkedProgressItems: joined,
        // });
      }
    }
  };

  handleProjectSelectionCheckbox = e => {
    const {
      state: { projectSelection, isAllPartnerSelected },
    } = this;
    const {
      target: { name, checked },
    } = e;

    this.setState(preState => {
      if (checked) {
        return {
          projectSelection: [
            ...preState.projectSelection,
            parseInt(name, 10),
          ],
        };
      }
      if (!checked) {
        const newArr = projectSelection.filter(
          projectselected => projectselected !== parseInt(name, 10),
        );
        return { projectSelection: newArr };
      }
      return null;
    });
  };

  handlePartnerParentCheckbox = e => {
    // e.stopPropagation();
    const { partnerSelection, isAllPartnerSelected } = this.state;
    if (isAllPartnerSelected) {
      const allPartnerElement = document.getElementsByClassName(
        'partner_checkbox',
      );

      for (let i = 0; i < allPartnerElement.length; i += 1) {
        allPartnerElement[i].checked = false;
      }
      this.setState({
        partnerSelection: [],
        isAllPartnerSelected: false,
      });
    } else {
      this.setState({
        isAllPartnerSelected: true,
      });
      if (e.target.checked === true) {
        const allPartnerElement = document.getElementsByClassName(
          'partner_checkbox',
        );
        const selectedPartner = partnerSelection;
        for (let i = 0; i < allPartnerElement.length; i += 1) {
          allPartnerElement[i].checked = true;
          selectedPartner.push(
            parseInt(allPartnerElement[i].name, 10),
          );
        }
        this.setState({
          partnerSelection: selectedPartner,
        });
        // this.setState({
        //   checkedProgressItems: joined,
        // });
      }
    }
  };

  handlePartnerSelectionCheckbox = e => {
    const {
      state: { partnerSelection, isAllPartnerSelected },
    } = this;
    const {
      target: { name, checked },
    } = e;
    this.setState(preState => {
      if (checked) {
        return {
          partnerSelection: [
            ...preState.partnerSelection,
            parseInt(name, 10),
          ],
        };
      }
      if (!checked) {
        const newArr = partnerSelection.filter(
          partnerSelected => partnerSelected !== parseInt(name, 10),
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

  applyBtnClick = () => {
    const {
      viewDataBy,
      partnerSelection,
      projectSelection,
      projectStatus,
      investmentFocusSelection,
      partnerType,
    } = this.state;
    this.props.filterFinancialDataWithAllFilters(
      'province',
      viewDataBy,
      partnerSelection,
      projectSelection,
      projectStatus,
    );
    this.props.filterRadialData(
      investmentFocusSelection,
      projectSelection,
      partnerType,
      partnerSelection,
    );
    // const investmentSpaceReduced= investmentFocusSelection.map(data=>{
    //   return data.
    // })
    this.props.filterSankeyChartData(investmentFocusSelection);
  };
  // eslint-disable-next-line consistent-return

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
        showBarof,
      },
      // props: {},
    } = this;
    const { isDataFetched } = this.props.partnershipReducer;
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
            applyBtnClick={this.applyBtnClick}
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
            handlePartnerParentCheckbox={
              this.handlePartnerParentCheckbox
            }
            handleProjectParentCheckbox={
              this.handleProjectParentCheckbox
            }
            handleInvestmentParentCheckbox={
              this.handleInvestmentParentCheckbox
            }
          />
          <main className="main">
            <div className="main-card literacy-main-card">
              <Loading
                loaderState={!isDataFetched}
                top="50%"
                left="46%"
              />
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
                          // onClick={this.applyBtnClick}
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
                  viewDataBy={viewDataBy}
                  sankeyChartwidth={sankeyChartwidth}
                  activeOverview={activeOverview}
                  activeView={activeView}
                  partnerSelection={partnerSelection}
                  projectSelection={projectSelection}
                  projectStatus={projectStatus}
                  showBarof={showBarof}
                  handleShowBarOf={this.handleShowBarOf}
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
  filterFinancialDataWithAllFilters,
  getDistrictDataFromProvince,
  getProvinceData,
  getDistrictData,
  getMunicipalityData,
  filterRadialData,
  getSpiderChartData,
  getSankeyChartData,
  filterSankeyChartData,
})(MainPartnership);
