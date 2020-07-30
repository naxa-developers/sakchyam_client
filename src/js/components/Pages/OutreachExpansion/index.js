/* eslint-disable array-callback-return */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/src/css/mapbox-gl.css';
import MapboxPartnership from './MapComponents/MapboxPartnership';
import Headers from '../../Header';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import MiddleChartSection from './MiddleChartSection/MiddleChartSection';
import ListByView from './ViewByList';
import {
  getPartnershipInvestmentFocus,
  getProjectListData,
  getMapDataByDistrict,
  getMapDataByMunicipality,
  getFilteredMapData,
  getRadialData,
  getPartnersList,
  filterPartnerListByPartnerType,
  filterFinancialDataWithAllFilters,
  getDistrictDataFromProvince,
} from '../../../actions/partnership.actions';
import {
  getProvinceData,
  getDistrictData,
  getMunicipalityData,
  filterDistrictListFromProvince,
  filterMunListFromDistrict,
} from '../../../actions/common.actions';
import Loading from '../../common/Loading';
import Select from '../../common/Select/Select';
import { getCenterBboxProvince } from './common/ProvinceFunction';
import { getCenterBboxDistrict } from './common/DistrictFunction';
import { getCenterBboxMunicipality } from './common/MunicipalityFunction';
import { extendBounds } from '../Automation/MapRelatedComponents/extendBbox';
import MapFilter from './MapFilter';
import {
  fetchOutreachSecondaryData,
  fetchOutreachChoropleth,
  fetchOutreachPrimaryData,
} from '../../../actions/outreach.actions';
import { provinceLists, districtLists } from '../../common/adminList';

class MainPartnership extends Component {
  constructor() {
    super();
    this.state = {
      primaryData: '',
      expsnsionSelection: [],
      projectSelection: [],
      partnerSelection: [],
      projectStatus: [],
      partnerType: [],
      serviceType: [],
      G2PTypes: [],
      demonstrationType: [],
      selectedProvince: '',
      selectedDistrict: null,
      selectedMunicipality: null,
      isAllPartnerSelected: false,
      isAllProjectSelected: false,
      isAllInvestmentFocusSelected: false,
      showBarof: 'Provinces',
      showBarofInvestmentBudgetBenef: 'investmentFocus',
      activeFilter: false,
      activeOverview: true,
      viewDataBy: 'allocated_beneficiary',
      mapViewBy: 'province',
      mapViewDataBy: 'general_outreach',
      activeView: 'map',
      map: null,
      vectorTileUrl:
        'https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}',
      localOutreachSelected: '',
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('userToken');
    // console.log('uset token', token);
    this.props.getProvinceData();
    this.props.getDistrictData();
    this.props.getMunicipalityData();

    const filterBar = document.getElementsByClassName(
      'filter-bar',
    )[0];
    document.addEventListener('click', async event => {
      const isClickInside = filterBar.contains(event.target);

      if (!isClickInside) {
        // console.log('clickoutside');
        this.setState({
          activeFilter: false,
        });
      }
    });
    this.props.getPartnershipInvestmentFocus();
    this.props.fetchOutreachSecondaryData();
    this.props.fetchOutreachChoropleth();
    this.props.fetchOutreachPrimaryData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedProvince, selectedDistrict } = this.state;
    const { outreachReducer } = this.props;
    const { primaryData } = outreachReducer;
    if (prevState.selectedProvince !== selectedProvince) {
      this.props.filterDistrictListFromProvince(selectedProvince);
      this.setState({
        selectedDistrict: '',
        selectedMunicipality: '',
      });
    }
    if (prevState.selectedDistrict !== selectedDistrict) {
      this.props.filterMunListFromDistrict(selectedDistrict);
      this.setState({
        selectedMunicipality: '',
      });
    }

    if (prevProps.outreachReducer.primaryData !== primaryData) {
      this.setState({ primaryData });
    }
  }

  setOutreachByLU = value => {
    this.setState({
      localOutreachSelected: value,
    });

    this.setMapViewBy('municipality');
  };

  setActiveView = selectedView => {
    this.setState({
      activeView: selectedView,
    });
  };

  setActiveOverview = () => {
    this.setState(prevState => ({
      activeOverview: !prevState.activeOverview,
    }));
    setTimeout(() => {
      this.state.map.resize();
    }, 100);
  };

  addMap = () => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZ2VvbWF0dXBlbiIsImEiOiJja2E5bDFwb2swdHNyMnNvenZxa2Vpeml2In0.fCStqdwmFYFP-cUvb5vMCw';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [84.5, 28.5],
      zoom: 6,
    });
    this.setState({ map });
  };

  setFilterTab = () => {
    this.setState(prevState => ({
      activeFilter: !prevState.activeFilter,
    }));
  };

  setMapViewBy = selectedMapView => {
    console.log('setMapViewBy called');
    this.setState({
      mapViewBy: selectedMapView,
    });
    this.props.getFilteredMapData(selectedMapView);
    this.setState({
      vectorTileUrl: `https://vectortile.naxa.com.np/federal/${selectedMapView}.mvt/?tile={z}/{x}/{y}`,
    });
  };

  handleFederalClickOnMap = (statelevel, code) => {
    // console.log(statelevel, code);
    const query = `code=${code}`;
    this.setState({
      vectorTileUrl: `https://vectortile.naxa.com.np/federal/${statelevel}.mvt/?tile={z}/{x}/{y}&${query}`,
    });
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

    if (selectedView === 'general_outreach') {
      console.log("'general_outreach' condition");
      this.setMapViewBy('province');
    }
  };

  handleShowBarOf = value => {
    this.setState({ showBarof: value });
  };

  handleShowBarOfInvestmentBudgetBenefBar = value => {
    this.setState({ showBarofInvestmentBudgetBenef: value });
  };

  handelExpansionParentCheckbox = e => {
    // e.stopPropagation();
    const {
      expsnsionSelection,
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
        expsnsionSelection: [],
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
        const selectedInvestment = expsnsionSelection;
        for (let i = 0; i < allInvestmentElement.length; i += 1) {
          allInvestmentElement[i].checked = true;
          selectedInvestment.push(allInvestmentElement[i].name);
        }
        this.setState({
          expsnsionSelection: selectedInvestment,
        });
      }
    }
  };

  handelExpansionCheckbox = e => {
    const {
      state: { expsnsionSelection },
    } = this;
    const {
      target: { name, checked, value },
    } = e;
    this.setState(preState => {
      if (checked) {
        return {
          expsnsionSelection: [...preState.expsnsionSelection, name],
          projectSelection: [],
        };
      }
      if (!checked) {
        const newArr = expsnsionSelection.filter(
          daily => daily !== name,
        );
        return {
          expsnsionSelection: newArr,
          projectSelection: [],
        };
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

  handlePartnerType = (clickedValue, type) => {
    const { serviceType, G2PTypes, demonstrationType } = this.state;
    let tempCollection;
    let filteredData = [];

    switch (type) {
      case 1:
        tempCollection = serviceType;
        break;
      case 2:
        tempCollection = G2PTypes;
        break;
      case 3:
        tempCollection = demonstrationType;
        break;
      default:
        tempCollection = '';
    }

    if (tempCollection.includes(clickedValue)) {
      filteredData = tempCollection.filter(
        data => data !== clickedValue,
      );
    } else {
      filteredData = tempCollection.concat(clickedValue);
    }

    // console.log('filtereddata in handeler', filteredData);

    switch (type) {
      case 1:
        this.setState({ serviceType: filteredData });
        break;
      case 2:
        this.setState({ G2PTypes: filteredData });
        break;
      case 3:
        this.setState({ demonstrationType: filteredData });
        break;
      default:
        tempCollection = '';
    }
  };

  applyBtnClick = () => {
    const {
      viewDataBy,
      partnerSelection,
      projectSelection,
      projectStatus,
      expsnsionSelection,
      partnerType,
    } = this.state;
    this.props.filterOverviewData(
      expsnsionSelection,
      projectSelection,
      partnerType,
      partnerSelection,
    );
    this.props.filterFinancialDataWithAllFilters(
      'province',
      expsnsionSelection,
      viewDataBy,
      partnerSelection,
      projectSelection,
      projectStatus,
    );
    this.props.filterBarDataByInvestment(
      'province',
      viewDataBy,
      partnerSelection,
      projectSelection,
      projectStatus,
      expsnsionSelection,
    );
    this.props.filterSankeyChartData(
      viewDataBy,
      expsnsionSelection,
      projectSelection,
      partnerType,
      partnerSelection,
      projectStatus,
    );
    this.props.filterLeverageData(expsnsionSelection);
  };

  applyHandler = () => {
    const {
      G2PTypes,
      demonstrationType,
      serviceType,
      expsnsionSelection,
      partnerSelection,
      primaryData,
    } = this.state;
    console.log('values onsole', primaryData);
    let filteredData = [];

    if (G2PTypes.length > 0) {
      // g2p_payment

      G2PTypes.map(type => {
        primaryData.map(data => {
          if (type === data.g2p_payment) {
            filteredData.push(data);
          }
        });
      });
    }

    if (demonstrationType.length > 0) {
      const value =
        filteredData.length > 0 ? filteredData : primaryData;
      filteredData = [];
      demonstrationType.map(type => {
        value.map(data => {
          if (type === data.demonstration_effect) {
            filteredData.push(data);
          }
        });
      });
    }
    if (serviceType.length > 0) {
      const value =
        filteredData.length > 0 ? filteredData : primaryData;
      filteredData = [];
      serviceType.map(type => {
        value.map(data => {
          if (type === data.point_service) {
            filteredData.push(data);
          }
        });
      });
    }
    if (expsnsionSelection.length > 0) {
      const value =
        filteredData.length > 0 ? filteredData : primaryData;
      filteredData = [];
      expsnsionSelection.map(type => {
        value.map(data => {
          if (type === data.expansion_driven_by) {
            filteredData.push(data);
          }
        });
      });
    }
    if (partnerSelection.length > 0) {
      const value =
        filteredData.length > 0 ? filteredData : primaryData;
      filteredData = [];
      partnerSelection.map(type => {
        value.map(data => {
          if (type === data.partner_type) {
            filteredData.push(data);
          }
        });
      });
    }

    this.setState({ primaryData: filteredData });
  };

  // eslint-disable-next-line consistent-return
  handleApplyFederalFilter = () => {
    const {
      selectedMunicipality,
      selectedDistrict,
      selectedProvince,
      mapViewDataBy,
      map,
    } = this.state;

    const provinceCheck =
      selectedProvince && selectedProvince.length > 0;
    const districtCheck =
      selectedDistrict && selectedDistrict.length > 0;
    const muniCheck =
      selectedMunicipality && selectedMunicipality.length > 0;

    const { allMunicipalityList } = this.props.commonReducer;

    if (mapViewDataBy === 'outreach_local_units') {
      const filteredList = [];
      if (muniCheck) {
        console.log('muni condition', selectedMunicipality);
        const combinedBbox = [];
        const getBboxValue = getCenterBboxMunicipality(
          selectedMunicipality.map(data => {
            return data.code;
          }),
        );
        getBboxValue.map(data => {
          combinedBbox.push(data.bbox);
          return true;
        });
        const extendedValue = extendBounds(combinedBbox);
        map.fitBounds(extendedValue);

        const filteredMuni = selectedMunicipality.filter(
          muni => muni.value !== 'all',
        );
        filteredMuni.map(muni => filteredList.push(muni));
      } else if (districtCheck) {
        console.log('dsistrivsad condition', selectedDistrict);
        const combinedBbox = [];
        const getBboxValue = getCenterBboxDistrict(
          selectedDistrict.map(data => {
            return data.code;
          }),
        );
        getBboxValue.map(data => {
          combinedBbox.push(data.bbox);
          return true;
        });
        const extendedValue = extendBounds(combinedBbox);
        map.fitBounds(extendedValue);

        const filteredDist = selectedDistrict.filter(
          muni => muni.value !== 'all',
        );

        filteredDist.forEach(dist => {
          allMunicipalityList.forEach(mun => {
            if (dist.code === mun.district_code) {
              filteredList.push(mun);
            }
          });
        });

        // console.log('filtered list', filteredList);
      } else if (provinceCheck) {
        console.log('province condition', selectedProvince);
        const combinedBbox = [];
        const getBboxValue = getCenterBboxProvince(
          selectedProvince.map(data => {
            return data.code;
          }),
        );

        getBboxValue.map(data => {
          combinedBbox.push(data.bbox);
          return true;
        });
        const extendedValue = extendBounds(combinedBbox);
        map.fitBounds(extendedValue);

        const filteredPro = selectedProvince.filter(
          muni => muni.value !== 'all',
        );

        filteredPro.forEach(province => {
          allMunicipalityList.forEach(district => {
            if (province.code === district.province_code) {
              filteredList.push(district);
            }
          });
        });
      }

      if (provinceCheck || districtCheck || muniCheck) {
        console.log(
          'one met condition',
          provinceCheck,
          districtCheck,
          muniCheck,
        );
        map.setFilter('vector-tile-fill', [
          'in',
          ['get', 'code'],
          [
            'literal',
            filteredList.map(fed => {
              return fed.code.toString();
            }),
          ],
        ]);
        map.setFilter('vector-tile-outline', [
          'in',
          ['get', 'code'],
          [
            'literal',
            filteredList.map(fed => {
              return fed.code.toString();
            }),
          ],
        ]);
      }
      this.setState({ activeFilter: false });
    }
  };

  resetLeftSideBarSelection = () => {
    this.setState({
      expsnsionSelection: [],
      partnerSelection: [],
      partnerType: [],
      serviceType: [],
      G2PTypes: [],
      primaryData: this.props.outreachReducer.primaryData,
    });
  };

  resetFilters = () => {
    // console.log('resertfiles');
    const { mapViewBy, activeView } = this.state;
    const that = this;
    this.resetLeftSideBarSelection();
    if (activeView === 'visualization') {
      this.props.resetRadialData();
      this.props.resetSankeyChartData();
      this.props.resetOverviewData();
      this.props.resetLeverageData();
      this.props.resetBarDatas();
      this.props.resetBarDataByInvestmentFocus();
    } else {
      this.setMapViewBy(mapViewBy);
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
        mapViewDataBy,
        activeView,
        vectorTileUrl,
        expsnsionSelection,
        partnerSelection,
        demonstrationType,
        serviceType,
        G2PTypes,
        localOutreachSelected,
        primaryData,
      },
      // props: {},
    } = this;
    const {
      allProvinceList,
      allDistrictList,
      allMunicipalityList,
    } = this.props.commonReducer;

    const temp = provinceLists();

    return (
      <>
        <Headers />
        <div
          className={`automation-wrapper literacy-wrapper ${
            activeOverview ? 'expand-right-sidebar' : ''
          }`}
        >
          <LeftSideBar
            primaryData={primaryData}
            expsnsionSelection={expsnsionSelection}
            partnerSelection={partnerSelection}
            G2PTypes={G2PTypes}
            serviceType={serviceType}
            demonstrationType={demonstrationType}
            handelExpansionCheckbox={this.handelExpansionCheckbox}
            handlePartnerSelectionCheckbox={
              this.handlePartnerSelectionCheckbox
            }
            handlePartnerParentCheckbox={
              this.handlePartnerParentCheckbox
            }
            handelExpansionParentCheckbox={
              this.handelExpansionParentCheckbox
            }
            handlePartnerType={this.handlePartnerType}
            resetFilters={this.resetLeftSideBarSelection}
            applyBtnClick={this.applyHandler}
          />
          <main className="main">
            <div className="main-card literacy-main-card">
              {/* <Loading
                loaderState={!isDataFetched}
                top="50%"
                left="46%"
              /> */}
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
                    <ListByView
                      mapViewBy={mapViewBy}
                      setMapViewBy={this.setMapViewBy}
                      mapViewDataBy={mapViewDataBy}
                    />
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

                <MapFilter
                  activeView={activeView}
                  viewDataBy={viewDataBy}
                  mapViewDataBy={mapViewDataBy}
                  setViewDataBy={this.setViewDataBy}
                  setMapViewDataBy={this.setMapViewDataBy}
                  setOutreachByLU={this.setOutreachByLU}
                />
              </div>
              <div className="literacy-tab-content">
                {/* <MiddleChartSection
                  resetLeftSideBarSelection={
                    this.resetLeftSideBarSelection
                  }
                  resetFilters={this.resetFilters}
                  viewDataBy={viewDataBy}
                  mapViewDataBy={mapViewDataBy}
                  sankeyChartwidth={sankeyChartwidth}
                  activeOverview={activeOverview}
                  activeView={activeView}
                  expsnsionSelection={expsnsionSelection}
                  partnerSelection={partnerSelection}
                  projectSelection={projectSelection}
                  projectStatus={projectStatus}
                  showBarof={showBarof}
                  handleShowBarOf={this.handleShowBarOf}
                  showBarofInvestmentBudgetBenef={
                    showBarofInvestmentBudgetBenef
                  }
                  handleShowBarOfInvestmentBudgetBenefBar={
                    this.handleShowBarOfInvestmentBudgetBenefBar
                  }
                  applyBtnClick={this.applyBtnClick}
                /> */}
                <div
                  className="literacy-tab-item"
                  style={
                    activeView === 'map'
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                >
                  {activeView === 'map' && (
                    <MapboxPartnership
                      addMap={this.addMap}
                      handleFederalClickOnMap={
                        this.handleFederalClickOnMap
                      }
                      map={map}
                      vectorTileUrl={vectorTileUrl}
                      mapViewBy={mapViewBy}
                      mapViewDataBy={mapViewDataBy}
                      setMapViewBy={this.setMapViewBy}
                      localOutreachSelected={localOutreachSelected}
                      primaryData={primaryData}
                    />
                  )}
                </div>
              </div>
            </div>
          </main>

          <RightSideBar
            activeOverview={activeOverview}
            activeView={activeView}
            setActiveOverview={this.setActiveOverview}
            setActiveView={this.setActiveView}
            mapViewDataBy={mapViewDataBy}
            primaryData={primaryData}
          />
        </div>
        {/* <MapboxPartnership /> */}
      </>
    );
  }
}
const mapStateToProps = ({ commonReducer, outreachReducer }) => ({
  commonReducer,
  outreachReducer,
});
export default connect(mapStateToProps, {
  fetchOutreachChoropleth,
  fetchOutreachPrimaryData,
  getPartnershipInvestmentFocus,
  getProjectListData,
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
  filterDistrictListFromProvince,
  filterMunListFromDistrict,
  fetchOutreachSecondaryData,
})(MainPartnership);
