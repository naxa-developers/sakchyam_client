import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select } from 'd3';
import MapboxPartnership from './MapComponents/MapboxPartnership';
import Headers from '../../Header';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import MiddleChartSection from './MiddleChartSection/MiddleChartSection';
import {
  getPartnershipInvestmentFocus,
  getProjectListData,
  // getMapDataByProvince,
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
  getBarDataByBenefBudget,
  // getSpiderChartData,
  getSankeyChartData,
  filterSankeyChartData,
  getOverviewData,
  filterOverviewData,
  filterDistrictListFromProvince,
  filterMunListFromDistrict,
  filterFinancialDataWithAllFiltersAndFederal,
  getPartnershipAllData,
  resetBarDatas,
  resetRadialData,
  resetSankeyChartData,
  resetOverviewData,
  resetLeverageData,
  filterLeverageData,
} from '../../../actions/partnership.actions';
import Loading from '../../common/Loading';
import Select from '../../common/Select/Select';
import FilterBadge from './common/FilterBadge';

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
      selectedProvince: null,
      selectedDistrict: null,
      selectedMunicipality: null,
      isAllPartnerSelected: false,
      isAllProjectSelected: false,
      isAllInvestmentFocusSelected: false,
      showBarof: 'Provinces',
      // UI Section
      activeFilter: false,
      activeOverview: false,
      viewDataBy: 'allocated_beneficiary',
      mapViewDataBy: 'allocated_beneficiary',
      activeView: 'visualization',
      // map Section
      map: null,
      mapViewBy: 'province',
      vectorTileUrl:
        'https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}',
    };
  }

  async componentDidMount() {
    const { viewDataBy } = this.state;
    this.props.getPartnersList();
    this.props.getProjectListData();
    this.props.getPartnershipInvestmentFocus();
    this.props.getPartnershipAllData();
    this.props.getProvinceData();
    // this.props.getSpiderChartData();
    // this.props.getOverviewData();
    // this.props.getSankeyChartData();
    this.props.getBarDataByBenefBudget(viewDataBy);
    // this.props.getMapDataByDistrict(viewDataBy);
    // this.props.getMapDataByMunicipality(viewDataBy);
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
      selectedProvince,
      selectedDistrict,
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
      this.props.filterRadialData(
        // 'province',
        viewDataBy,
        investmentFocusSelection,
        projectSelection,
        partnerType,
        partnerSelection,
        // projectStatus,
      );
    }
    if (prevState.partnerType !== partnerType) {
      this.props.filterPartnerListByPartnerType(partnerType);
    }
    if (prevState.selectedProvince !== selectedProvince) {
      this.props.filterDistrictListFromProvince(selectedProvince);
    }
    if (prevState.selectedDistrict !== selectedDistrict) {
      this.props.filterMunListFromDistrict(selectedDistrict);
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

  setMapViewDataBy = selectedView => {
    this.setState({
      mapViewDataBy: selectedView,
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
      this.props.getFilteredMapData('province');
      this.setState({
        vectorTileUrl:
          'https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}',
      });
    } else if (selectedMapView === 'district') {
      this.props.getFilteredMapData('district');
      this.setState({
        vectorTileUrl:
          'https://vectortile.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}',
      });
    } else if (selectedMapView === 'municipality') {
      this.props.getFilteredMapData('municipality');
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
    this.props.filterOverviewData(
      investmentFocusSelection,
      projectSelection,
      partnerType,
      partnerSelection,
    );
    this.props.filterFinancialDataWithAllFilters(
      'province',
      viewDataBy,
      partnerSelection,
      projectSelection,
      projectStatus,
    );
    this.props.filterRadialData(
      viewDataBy,
      investmentFocusSelection,
      projectSelection,
      partnerType,
      partnerSelection,
      projectStatus,
    );
    // const investmentSpaceReduced= investmentFocusSelection.map(data=>{
    //   return data.
    // })
    this.props.filterSankeyChartData(
      investmentFocusSelection,
      projectSelection,
      partnerType,
      partnerSelection,
    );
    this.props.filterLeverageData(investmentFocusSelection);
  };

  // eslint-disable-next-line consistent-return
  handleApplyFederalFilter = () => {
    const {
      viewDataBy,
      partnerSelection,
      projectSelection,
      projectStatus,
      investmentFocusSelection,
      partnerType,
      selectedMunicipality,
      selectedDistrict,
      selectedProvince,
      activeView,
    } = this.state;
    if (activeView === 'visualization') {
      this.props.filterFinancialDataWithAllFiltersAndFederal(
        { selectedMunicipality, selectedDistrict, selectedProvince },
        viewDataBy,
        partnerSelection,
        projectSelection,
        projectStatus,
      );
      this.props.filterOverviewData(
        investmentFocusSelection,
        projectSelection,
        partnerType,
        partnerSelection,
        { selectedMunicipality, selectedDistrict, selectedProvince },
      );
      this.props.filterRadialData(
        viewDataBy,
        investmentFocusSelection,
        projectSelection,
        partnerType,
        partnerSelection,
        projectStatus,
        { selectedMunicipality, selectedDistrict, selectedProvince },
      );
    } else {
      this.props.filterMapDataWithFederal();
    }
  };

  resetLeftSideBarSelection = () => {
    this.setState({
      investmentFocusSelection: [],
      partnerSelection: [],
      projectSelection: [],
    });
  };

  resetFilters = () => {
    console.log('resertfiles');
    const that = this;
    that.resetLeftSideBarSelection();
    this.props.resetRadialData();
    this.props.resetSankeyChartData();
    this.props.resetOverviewData();
    this.props.resetLeverageData();
  };

  render() {
    const {
      state: {
        map,
        mapViewBy,
        activeFilter,
        activeOverview,
        viewDataBy,
        mapViewDataBy,
        activeView,
        vectorTileUrl,
        investmentFocusSelection,
        projectSelection,
        projectStatus,
        partnerSelection,
        partnerType,
        showBarof,
        selectedProvince,
        selectedDistrict,
        selectedMunicipality,
      },
      // props: {},
    } = this;
    const {
      isDataFetched,
      allProvinceList,
      allDistrictList,
      allMunicipalityList,
    } = this.props.partnershipReducer;
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
            resetFilters={this.resetFilters}
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
                          <Select
                            withCheckbox
                            name="Select Province"
                            options={
                              allProvinceList && allProvinceList
                            }
                            onChange={selectedOptions => {
                              this.setState({
                                selectedProvince: selectedOptions,
                              });
                              // eslint-disable-next-line react/jsx-curly-newline
                            }}
                          />
                        </div>
                        {mapViewBy === 'municipality' ||
                        mapViewBy === 'district' ? (
                          <div className="form-group">
                            <Select
                              withCheckbox
                              name="Select District"
                              options={
                                allDistrictList && allDistrictList
                              }
                              onChange={selectedOptions => {
                                this.setState({
                                  selectedDistrict: selectedOptions,
                                });
                                // eslint-disable-next-line react/jsx-curly-newline
                              }}
                            />
                          </div>
                        ) : null}
                        {mapViewBy === 'municipality' && (
                          <div className="form-group">
                            <Select
                              withCheckbox
                              name="Select Municipality"
                              options={
                                allMunicipalityList &&
                                allMunicipalityList
                              }
                              onChange={selectedOptions => {
                                this.setState({
                                  selectedMunicipality: selectedOptions,
                                });
                                // eslint-disable-next-line react/jsx-curly-newline
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="buttons is-end">
                        <button
                          type="button"
                          // onClick={this.resetFilters}
                          className="common-button is-clear"
                        >
                          <i className="material-icons">refresh</i>
                        </button>
                        <button
                          onClick={this.handleApplyFederalFilter}
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
                    {activeView === 'visualization' ? (
                      <>
                        <FilterBadge
                          viewDataBy={viewDataBy}
                          onclick={() => {
                            this.setViewDataBy(
                              'allocated_beneficiary',
                            );
                          }}
                          dataTitle="allocated_beneficiary"
                          title="Beneficiaries"
                        />
                        <FilterBadge
                          viewDataBy={viewDataBy}
                          onclick={() => {
                            this.setViewDataBy('allocated_budget');
                          }}
                          dataTitle="allocated_budget"
                          title="Budget Allocated"
                        />
                        <FilterBadge
                          viewDataBy={viewDataBy}
                          onclick={() => {
                            this.setViewDataBy('Leverage');
                          }}
                          dataTitle="Leverage"
                          title="Leverage"
                        />
                      </>
                    ) : (
                      <>
                        <FilterBadge
                          viewDataBy={mapViewDataBy}
                          onclick={() => {
                            this.setMapViewDataBy(
                              'allocated_beneficiary',
                            );
                          }}
                          dataTitle="allocated_beneficiary"
                          title="Beneficiaries"
                        />
                        {/* <FilterBadge
                          viewDataBy={mapViewDataBy}
                          onclick={() => {
                            this.setMapViewDataBy('allocated_budget');
                          }}
                          dataTitle="allocated_budget"
                          title="Budget Allocated"
                        /> */}
                        {/* total_beneficiary branch blb extension_counter
                        tablet */}
                        <FilterBadge
                          viewDataBy={mapViewDataBy}
                          onclick={() => {
                            this.setMapViewDataBy('blb');
                          }}
                          dataTitle="blb"
                          title="BLB"
                        />
                        <FilterBadge
                          viewDataBy={mapViewDataBy}
                          onclick={() => {
                            this.setMapViewDataBy('branch');
                          }}
                          dataTitle="branch"
                          title="Physical Branches"
                        />
                        <FilterBadge
                          viewDataBy={mapViewDataBy}
                          onclick={() => {
                            this.setMapViewDataBy('tablet');
                          }}
                          dataTitle="tablet"
                          title="Tablet"
                          icon="tablet"
                        />
                        {/* <FilterBadge
                          viewDataBy={viewDataBy}
                          onclick={() => {
                            this.setViewDataBy('Other major product');
                          }}
                          dataTitle="Other major product"
                          title="Other major product"
                        /> */}
                      </>
                    )}
                    {/* <li
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
                    </li> */}
                    {/* <li
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
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className="literacy-tab-content">
                <MiddleChartSection
                  resetLeftSideBarSelection={
                    this.resetLeftSideBarSelection
                  }
                  resetFilters={this.resetFilters}
                  viewDataBy={viewDataBy}
                  mapViewDataBy={mapViewDataBy}
                  sankeyChartwidth={sankeyChartwidth}
                  activeOverview={activeOverview}
                  activeView={activeView}
                  investmentFocusSelection={investmentFocusSelection}
                  partnerSelection={partnerSelection}
                  projectSelection={projectSelection}
                  projectStatus={projectStatus}
                  showBarof={showBarof}
                  handleShowBarOf={this.handleShowBarOf}
                  applyBtnClick={this.applyBtnClick}
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
                      mapViewBy={mapViewBy}
                      mapViewDataBy={mapViewDataBy}
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
  // getMapDataByProvince,
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
  getBarDataByBenefBudget,
  // getSpiderChartData,
  getSankeyChartData,
  filterSankeyChartData,
  getOverviewData,
  filterOverviewData,
  filterDistrictListFromProvince,
  filterMunListFromDistrict,
  filterFinancialDataWithAllFiltersAndFederal,
  getPartnershipAllData,
  resetBarDatas,
  resetRadialData,
  resetSankeyChartData,
  resetOverviewData,
  resetLeverageData,
  filterLeverageData,
})(MainPartnership);
