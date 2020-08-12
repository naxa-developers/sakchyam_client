/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/src/css/mapbox-gl.css';
import { connect } from 'react-redux';
import MapComp from './MapComponent/Mapbox';
import ListByView from './AdminList';
import { getCenterBboxMunicipality } from './MapRelatedComponents/MunicipalityFunction';
import Select from '../../common/Select/Select';
import {
  getAllAutomationDataByPartner,
  getAutomationDataByProvince,
  getAutomationDataByDistrict,
  getAutomationDataByMunicipality,
  getProvinceData,
  getDistrictData,
  getMunicipalityData,
  filterAutomationDataForVectorTiles,
  filterPartnerSelect,
  getSearchedPartners,
  getDistrictDataFromProvince,
  getMunicipalityDataFromDistrict,
  getFilteredPartnersByFederal,
  getBranchesTableData,
  getTableDataByPartnerSelect,
  getFilteredPartnersByFederalWithClickedPartners,
  partnerSelectWithOutreach,
  selectChoroplethDataOfProvince,
  selectChoroplethDataOfDistrict,
  selectChoroplethDataOfMunicipality,
  getTimelineData,
  filterAutomationByState,
} from '../../../actions/automation.actions';
import {
  provinceLists,
  districtLists,
  municipalityLists,
  districtListByProvince,
  muniByDistrict,
} from '../../common/adminList';
import Header from '../../Header';
import LeftSideBar from './LeftSideBar/LeftSideBar';
import RightSideBar from './RightSideBar/RightSideBar';
import TableViewComponent from './TableViewComponent/TableViewComponent';
import AllActiveIcon from '../../../../img/fullactive.png';
import InactiveIcon from '../../../../img/inactive.png';
import { getCenterBboxProvince } from './MapRelatedComponents/ProvinceFunction';
import { extendBounds } from './MapRelatedComponents/extendBbox';
import { getCenterBboxDistrict } from './MapRelatedComponents/DistrictFunction';

// import DropdownCheckbox from '../../common/DropdownCheckbox';
let total = '';
const count = 0;
const bbox = [];
function getPartnerColor(i) {
  if (i % 12 === 0) return '#e69109';
  if (i % 12 === 1) return '#63a4ff';
  if (i % 12 === 2) return '#8629ff';
  if (i % 12 === 3) return '#e553ed';
  if (i % 12 === 4) return '#f2575f';
  if (i % 12 === 5) return '#915e0d';
  if (i % 12 === 6) return '#a1970d';
  if (i % 12 === 7) return '#4f7d14';
  if (i % 12 === 8) return '#07aba1';
  if (i % 12 === 9) return '#1d4c8f';
  if (i % 12 === 10) return '#491991';
  if (i % 12 === 11) return '#610766';
  if (i % 12 === 12) return '#6e0208';
  if (i % 12 === 13) return '#f07818';
  return 'green';
}
class MainAutomation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceList: provinceLists(),
      districtList: districtLists(),
      municipalityList: municipalityLists(),
      selectedProvince: '',
      selectedDistrict: null,
      selectedMunicipality: null,
      map: '',
      mapViewBy: 'municipality',
      activeView: 'map',
      activeFilter: false,
      vectorTileUrl:
        'https://vectortile.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}',
      searchText: '',
      activeClickPartners: [],
      mapType: 'choropleth',
      branchesCooperative: 1,
      showBeneficiary: true,
      migrationArray: [],
      rightSideBarLoader: false,
      isTileLoaded: false,
      partnersData: null,
      activeOutreachButton: false,
      activeFilterButton: false,
      activeRightSideBar: true,
      activeTableView: false,
      vectorGridKey: '0',
      vectorGridFirstLoad: false,
      color: '',
      allPartners: '',
      filteredProvinceChoropleth: '',
      activeProvince: false,
      activeDistrict: false,
      activeMunicipality: false,
      branchesCountOptions: {
        series: [
          {
            data: [400, 430, 448],
          },
        ],
        chart: {
          type: 'bar',
          height: 150,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: ['CH', 'SK', 'K'],
        },
        fill: {
          opacity: 1,
          colors: ['#fff000'],
        },
      },
      tabletsDeployed: {
        series: [0, 0],
        chart: {
          width: 150,
          type: 'donut',
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: false,
                  fontSize: '24px',
                  fontFamily: 'Avenir book',
                  fontWeight: 100,
                  color: '#fff',
                  offsetY: 50,
                  formatter(val) {
                    return 'Totals';
                  },
                  value: {
                    show: true,
                  },
                },
                value: {
                  show: true,
                  fontSize: '24px',
                  fontFamily: 'Avenir book',
                  fontWeight: 100,
                  color: '#d9202c',
                  offsetY: 5,
                  // eslint-disable-next-line consistent-return
                  formatter(w) {
                    if (typeof w === 'number') {
                      // if (!total) {
                      total = w;
                      // }
                      return w;
                    }
                    return total;

                    // return null;
                  },
                  value: {
                    show: true,
                  },
                },
                total: {
                  show: true,
                  showAlways: false,
                  label: 'Total',
                  fontSize: '24px',
                  fontFamily: 'Avenir book',
                  fontWeight: 100,
                  color: '#d9202c',
                  formatter(w) {
                    return w.globals.seriesTotals.reduce((a, b) => {
                      return a + b;
                    }, 0);
                  },
                },
              },
            },
          },
        },
        tooltip: {
          // enabled: false,
          fillSeriesColor: false,
          fontColor: '#fff',
          style: {
            fontSize: '12px',
            fontColor: '#fff',
          },
          followCursor: false,
          fixed: {
            enabled: true,
            position: 'topRight',
            offsetX: 100,
            offsetY: 100,
          },
          marker: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
          position: 'right',
          offsetY: 0,
          height: 230,
        },
        fill: {
          opacity: 1,
          colors: [
            '#e69109',
            '#63a4ff',
            '#8629ff',
            '#e553ed',
            '#f2575f',
            '#915e0d',
            '#a1970d',
            '#4f7d14',
            '#07aba1',
            '#1d4c8f',
            '#491991',
            '#610766',
            '#6e0208',
            '#f07818',
            '#7F95D1',
            '#FF82A9',
            '#FFC0BE',
            '#f0e111',
            '#9ff035',
            '#34ede1',
          ],
        },
      },
      areaChartOptions: {
        series: [
          {
            name: 'series1',
            data: [42, 109, 100],
          },
          {
            name: 'series2',
            data: [34, 52, 41],
          },
        ],
        chart: {
          height: 300,
          type: 'area',
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '2018-09-19T05:30:00.000Z',
            '2018-09-19T06:30:00.000Z',
          ],
        },
        fill: {
          opacity: 1,
          colors: ['#E11D3F', '#489FA7'],
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
      },
    };

    this.mapRef = React.createRef();
  }

  componentDidMount() {
    const filterBar = document.getElementsByClassName(
      'filter-bar',
    )[0];
    document.addEventListener('click', async event => {
      const isClickInside = filterBar.contains(event.target);

      if (!isClickInside) {
        this.setState({
          activeFilter: false,
        });
      }
    });

    this.props.getAllAutomationDataByPartner([]);
    this.props.filterPartnerSelect([]);
    setTimeout(() => {
      this.props.getAutomationDataByMunicipality();
      // this.props.getAutomationDataByDistrict();
      // this.props.getAutomationDataByProvince();
      // this.props.getMunicipalityData();
    }, 5000);
  }

  componentDidUpdate(prevProps, prevState) {
    const { automationReducer } = this.props;
    if (
      prevProps.automationReducer.automationRightSidePartnerData !==
      automationReducer.automationRightSidePartnerData
    ) {
      const { tabletsDeployed } = this.state;
      const {
        automationRightSidePartnerData,
      } = this.props.automationReducer;
      this.setState({
        tabletsDeployed: {
          ...tabletsDeployed,
          series: automationRightSidePartnerData[0].tabletsGraphData,
          labels: automationRightSidePartnerData[0].tabletsGraphLabel,
          fill: {
            ...tabletsDeployed.fill,
            colors:
              automationRightSidePartnerData[0].tabletsGraphColor,
          },
        },
        rightSideBarLoader: false,
      });
    }
    const allPartners =
      automationReducer &&
      automationReducer.automationAllDataByPartner &&
      automationReducer.automationAllDataByPartner[0] &&
      automationReducer.automationAllDataByPartner[0].partner_data;

    if (
      prevProps.automationReducer.automationAllDataByPartner !==
      automationReducer.automationAllDataByPartner
    ) {
      this.setState({ allPartners });
    }
  }

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

  toggleRightSideBarButton = () => {
    this.setState(prevState => ({
      activeRightSideBar: !prevState.activeRightSideBar,
    }));
    setTimeout(() => {
      this.state.map.resize();
    }, 10);
  };

  setFilterTab = () => {
    this.setState(prevState => ({
      activeFilter: !prevState.activeFilter,
    }));
  };

  setMapViewBy = selectedMapView => {
    const { activeClickPartners } = this.state;
    this.setState({
      mapViewBy: selectedMapView,
    });
    this.setState({
      vectorTileUrl: `https://vectortile.naxa.com.np/federal/${selectedMapView}.mvt/?tile={z}/{x}/{y}`,
    });

    this.props.partnerSelectWithOutreach(
      activeClickPartners,
      selectedMapView,
    );
  };

  setFilterTab = () => {
    this.setState(prevState => ({
      activeFilter: !prevState.activeFilter,
    }));
  };

  toggleOutreachButton = () => {
    this.setState(prevState => ({
      activeOutreachButton: !prevState.activeOutreachButton,
    }));
  };

  refreshSelectedPartnerBtn = () => {
    const { activeTableView, activeClickPartners } = this.state;
    this.setState({
      activeClickPartners: [],
      activeOutreachButton: false,
    });

    if (activeClickPartners.length > 0) {
      this.props.filterPartnerSelect([]);
    }

    if (activeTableView && activeClickPartners.length > 0) {
      this.props.getBranchesTableData();
    }
  };

  handleActiveClickPartners = id => {
    let { activeClickPartners } = this.state;
    const { activeTableView } = this.state;
    const tempArray = activeClickPartners.slice();
    if (!activeClickPartners.includes(id)) {
      tempArray.push(id);
      activeClickPartners = tempArray;
    } else {
      const filteredData = activeClickPartners.filter(
        item => item !== id,
      );
      activeClickPartners = filteredData;
    }
    this.setState({ activeClickPartners });
    this.props.filterPartnerSelect(activeClickPartners);
    if (activeTableView) {
      this.props.getTableDataByPartnerSelect(activeClickPartners);
    }
  };

  toggleTableViewButton = () => {
    const { activeTableView, activeClickPartners } = this.state;
    if (!activeTableView && activeClickPartners.length > 0) {
      this.props.getTableDataByPartnerSelect(activeClickPartners);
    }
    this.setState(prevState => ({
      activeTableView: !prevState.activeTableView,
    }));
  };

  render() {
    const {
      map,
      mapViewBy,
      activeView,
      activeFilter,
      provinceList,
      districtList,
      municipalityList,
      tabletsDeployed,
      activeClickPartners,
      allPartners,
      vectorGridFirstLoad,
      isTileLoaded,
      branchesCountOptions,
      areaChartOptions,

      activeFilterButton,
      activeRightSideBar,
      activeTableView,
      dataTypeLevel,
      filteredProvinceChoropleth,
      vectorTileUrl,
      vectorGridKey,
      color,
      activeOutreachButton,
      searchText,
      partnersData,
      activeProvince,
      activeDistrict,
      activeMunicipality,
      selectedProvince,
      selectedDistrict,
      selectedMunicipality,
      selectedProvinceName,
      selectedDistrictName,
      selectedMunicipalityName,
      mapType,
      rightSideBarLoader,
      showBeneficiary,
      branchesCooperative,
    } = this.state;
    const {
      allProvinceName,
      allDistrictName,
      allMunicipalityName,
      tableDataLoading,
    } = this.props.automationReducer;

    // console.log('activeClickPartners', activeClickPartners);
    return (
      <div className="page-wrap page-100">
        <Header />
        <div
          className={`automation-wrapper ${
            activeRightSideBar ? '' : 'expand-right-sidebar'
          } ${activeTableView ? 'active' : ''}`}
        >
          <LeftSideBar
            activeTableView={activeTableView}
            searchText={searchText}
            activeOutreachButton={activeOutreachButton}
            activeClickPartners={activeClickPartners}
            handleSearchTextChange={this.handleSearchTextChange}
            handleActiveClickPartners={this.handleActiveClickPartners}
            toggleOutreachButton={this.toggleOutreachButton}
            refreshSelectedPartnerBtn={this.refreshSelectedPartnerBtn}
          />

          <main className="main">
            <div className="main-card map-card">
              <MapComp
                map={map}
                addMap={this.addMap}
                mapViewBy={mapViewBy}
                vectorTileUrl={vectorTileUrl}
                allPartners={allPartners}
                activeClickPartners={activeClickPartners}
                activeOutreachButton={activeOutreachButton}
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
                    <ListByView
                      mapViewBy={mapViewBy}
                      setMapViewBy={this.setMapViewBy}
                    />
                    <div className="filter-row">
                      <div className="filter-list">
                        <div className="form-group">
                          <Select
                            withCheckbox
                            name="Select Province"
                            options={provinceList && provinceList}
                            onChange={selectedOptions => {
                              console.log(
                                'automation main',
                                selectedOptions,
                              );
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
                              options={districtList && districtList}
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
                                municipalityList && municipalityList
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
                          onClick={this.resetFilters}
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
              </div>
            </div>
            <TableViewComponent
              toggleTableViewButton={this.toggleTableViewButton}
              activeTableView={activeTableView}
              activeClickPartners={activeClickPartners}
            />
          </main>
          <RightSideBar
            branchesCooperative={branchesCooperative}
            showBeneficiary={showBeneficiary}
            tableDataLoading={tableDataLoading}
            rightSideBarLoader={rightSideBarLoader}
            activeClickPartners={activeClickPartners}
            activeRightSideBar={activeRightSideBar}
            partnersData={partnersData}
            tabletsDeployed={tabletsDeployed}
            branchesCountOptions={branchesCountOptions}
            areaChartOptions={areaChartOptions}
            toggleRightSideBarButton={this.toggleRightSideBarButton}
            toggleTableViewButton={this.toggleTableViewButton}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ automationReducer }) => ({
  automationReducer,
});
export default connect(mapStateToProps, {
  getAllAutomationDataByPartner,
  getAutomationDataByProvince,
  getAutomationDataByDistrict,
  getAutomationDataByMunicipality,
  filterAutomationDataForVectorTiles,
  getProvinceData,
  getDistrictData,
  getMunicipalityData,
  filterPartnerSelect,
  getSearchedPartners,
  getDistrictDataFromProvince,
  getMunicipalityDataFromDistrict,
  getFilteredPartnersByFederal,
  getBranchesTableData,
  getTableDataByPartnerSelect,
  getFilteredPartnersByFederalWithClickedPartners,
  partnerSelectWithOutreach,
  selectChoroplethDataOfProvince,
  selectChoroplethDataOfDistrict,
  selectChoroplethDataOfMunicipality,
  getTimelineData,
  filterAutomationByState,
})(MainAutomation);
