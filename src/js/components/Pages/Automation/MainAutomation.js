import React, { Component } from 'react';
import L from 'leaflet';
import { connect } from 'react-redux';
import MapComponent from './MapComponent/MapComponent';
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
} from '../../../actions/automation.actions';
import Header from '../../Header';
import LeftSideBar from './LeftSideBar/LeftSideBar';
import RightSideBar from './RightSideBar/RightSideBar';
import TableViewComponent from './TableViewComponent/TableViewComponent';
import FirstIcon from '../../../../img/marker.png';
import SecondIcon from '../../../../img/firstaid.svg';
import LeftSideAutomationLoader from '../../common/SkeletonLoading';
import DropdownCheckbox from '../../common/DropdownCheckbox';

const myIcon = L.divIcon({ className: 'marker1' });

export const activeIcon = new L.Icon({
  iconUrl: FirstIcon,
  iconRetinaUrl: FirstIcon,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 25],
  shadowUrl: '../assets/marker-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
});
export const inactiveIcon = new L.Icon({
  iconUrl: SecondIcon,
  iconRetinaUrl: SecondIcon,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 25],
  shadowUrl: '../assets/marker-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
});
class MainAutomation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeClickPartners: [],
      partnersData: null,
      activeOutreachButton: false,
      activeFilterButton: false,
      activeRightSideBar: true,
      activeTableView: false,
      searchText: '',
      dataTypeLevel: 'municipality',
      vectorGridInputUrl:
        'https://dvsnaxa.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}',
      vectorGridKey: '0',
      color: '',
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
          colors: ['#E11D3F'],
        },
      },
      tabletsDeployed: {
        series: [44, 55],
        chart: {
          width: 150,
          type: 'donut',
        },
        dataLabels: {
          enabled: true,
        },

        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                show: false,
              },
            },
          },
        ],
        legend: {
          show: false,
          position: 'right',
          offsetY: 0,
          height: 230,
        },
        fill: {
          opacity: 1,
          colors: ['#E11D3F', '#489FA7'],
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
    this.props.getAllAutomationDataByPartner();
    this.props.getAutomationDataByMunicipality();
    this.props.getAutomationDataByProvince();
    this.props.getAutomationDataByDistrict();
    this.props.getProvinceData();
    this.props.getDistrictData();
    this.props.getMunicipalityData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.automationReducer.automationAllDataByPartner !==
      this.props.automationReducer.automationAllDataByPartner
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        partnersData: this.props.automationReducer
          .automationAllDataByPartner[0],
      });
    }
    if (prevState.searchText !== this.state.searchText) {
      if (this.state.searchText.length === 0) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.props.getSearchedPartners(this.state.searchText);
      } else {
        // const { partnersData } = this.state;
        this.props.getSearchedPartners(this.state.searchText);
        // const a =
        //   this.props.automationReducer.automationDataByPartner &&
        //   this.props.automationReducer.automationDataByPartner.filter(
        //     data => {
        //       return data.partners_name
        //         .toUpperCase()
        //         .includes(this.state.searchText.toUpperCase());
        //     },
        //   );
        // // eslint-disable-next-line react/no-did-update-set-state
        // this.setState({ partnersData: a });
      }
    }
    const { activeClickPartners } = this.state;
    if (prevState.activeClickPartners !== activeClickPartners) {
      const mapLayers = this.mapRef.current.leafletElement._layers;
      if (activeClickPartners.length === 0) {
        this.props.filterPartnerSelect(activeClickPartners);
        Object.entries(mapLayers).forEach(([key, value]) => {
          if (
            value.options &&
            value.options.attribution &&
            value.options.attribution.partner_id
          ) {
            value.setIcon(activeIcon);
          }
        });
      } else {
        this.props.filterPartnerSelect(activeClickPartners);
        Object.entries(mapLayers).forEach(([key, value]) => {
          if (
            value.options &&
            value.options.attribution &&
            value.options.attribution.partner_id
          ) {
            value.setIcon(inactiveIcon);
          }
        });
      }
      activeClickPartners.map(data => {
        Object.entries(mapLayers).forEach(([key, value]) => {
          if (
            value.options &&
            value.options.attribution &&
            value.options.attribution.partner_id &&
            value.options.attribution.partner_id === data
          ) {
            value.setIcon(activeIcon);
            value.openPopup();
          }
        });
        return true;
      });
    }
    const {
      automationReducer: {
        automationChoroplethData,
        automationDataByProvince,
      },
    } = this.props;
    // if (
    //   prevProps.automationReducer.automationDataByProvince !==
    //   automationDataByProvince
    // ) {
    //   this.props.filterAutomationDataForVectorTiles();
    // }
    if (
      prevProps.automationReducer.automationChoroplethData !==
      automationChoroplethData
    ) {
      console.log('if automationDataByProvince updated');
      this.getFilteredAutomationData();
      // this.getFilteredAutomationData();
      // console.log(a, 'aaaa');
    }
  }

  handleActiveClickPartners = clicked => {
    console.log(clicked, 'name');
    const { activeClickPartners } = this.state;
    if (activeClickPartners.includes(clicked)) {
      const removedPartnersFull = activeClickPartners.filter(function(
        partner,
      ) {
        return partner !== clicked;
      });

      this.setState({
        activeClickPartners: removedPartnersFull,
      });
    } else {
      const joined = activeClickPartners.concat(clicked);
      this.setState({ activeClickPartners: joined });
    }
  };

  toggleFilterButton = () => {
    this.setState(prevState => ({
      activeFilterButton: !prevState.activeFilterButton,
    }));
  };

  toggleRightSideBarButton = () => {
    this.setState(prevState => ({
      activeRightSideBar: !prevState.activeRightSideBar,
    }));
  };

  toggleTableViewButton = () => {
    this.setState(prevState => ({
      activeTableView: !prevState.activeTableView,
    }));
  };

  toggleOutreachButton = () => {
    this.setState(prevState => ({
      activeOutreachButton: !prevState.activeOutreachButton,
    }));
  };

  handleStateLevel = clickedValue => {
    // console.log(e.target.value, 'target value');
    this.setState({ filteredProvinceChoropleth: null });
    if (clickedValue === 'province') {
      this.setState({
        vectorGridInputUrl:
          'https://dvsnaxa.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}',
        vectorGridKey: '0',
        color: '#55b110',
      });
      this.props.filterAutomationDataForVectorTiles(clickedValue);
    } else if (clickedValue === 'district') {
      this.setState({
        vectorGridInputUrl:
          'https://dvsnaxa.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}',
        vectorGridKey: '1',
        color: '#FF0000',
      });
      this.props.filterAutomationDataForVectorTiles(clickedValue);
    } else if (clickedValue === 'municipality') {
      this.setState({
        vectorGridInputUrl:
          'https://dvsnaxa.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}',
        // 'https://geoserver.naxa.com.np/geoserver/gwc/service/tms/1.0.0/Bipad:Municipality@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf',
        vectorGridKey: '2',
        color: '#FF000',
      });
      this.props.filterAutomationDataForVectorTiles(clickedValue);
    }

    this.setState({ dataTypeLevel: clickedValue });
  };

  getFilteredAutomationData = () => {
    const {
      automationReducer: { automationChoroplethData },
    } = this.props;
    console.log(automationChoroplethData, 'sss');
    const a =
      automationChoroplethData &&
      automationChoroplethData.map(data => {
        return data.count;
      });
    this.setState({ filteredProvinceChoropleth: a });
  };

  handleProvinceClick = code => {
    const { vectorGridInputUrl } = this.state;
    const { dataTypeLevel } = this.props;
    if (dataTypeLevel === 'province') {
      const districtFilterUrl = `https://dvsnaxa.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}&province_id=${code}`;
      this.setState({
        vectorGridInputUrl: districtFilterUrl,
        vectorGridKey: Math.random(),
      });
    } else if (dataTypeLevel === 'district') {
      const districtFilterUrl = `https://dvsnaxa.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}&district_id=${code}`;
      this.setState({
        vectorGridInputUrl: districtFilterUrl,
        vectorGridKey: Math.random(),
      });
    } else if (dataTypeLevel === 'municipality') {
      const districtFilterUrl = `https://dvsnaxa.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}`;
      this.setState({
        vectorGridInputUrl: districtFilterUrl,
        vectorGridKey: Math.random(),
      });
    }
    console.log(
      `https://dvsnaxa.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}&province_id=${code}`,
    );
  };

  handleSearchTextChange = e => {
    this.setState({ searchText: e.target.value });
  };

  handleProvinceDropdown = () => {
    this.setState(prevState => ({
      activeProvince: !prevState.activeProvince,
    }));
  };

  handleDistrictDropdown = () => {
    this.setState(prevState => ({
      activeDistrict: !prevState.activeDistrict,
    }));
  };

  handleMunicipalityDropdown = () => {
    this.setState(prevState => ({
      activeMunicipality: !prevState.activeMunicipality,
    }));
  };

  render() {
    const {
      branchesCountOptions,
      areaChartOptions,
      tabletsDeployed,
      activeClickPartners,
      activeFilterButton,
      activeRightSideBar,
      activeTableView,
      dataTypeLevel,
      filteredProvinceChoropleth,
      vectorGridInputUrl,
      vectorGridKey,
      color,
      activeOutreachButton,
      searchText,
      partnersData,
      activeProvince,
      activeDistrict,
      activeMunicipality,
    } = this.state;
    const {
      automationDataByPartner,
      automationDataByProvince,
      automationChoroplethData,
      dataLoading,
      allProvinceName,
      allDistrictName,
      allMunicipalityName,
    } = this.props.automationReducer;
    return (
      <div className="page-wrap page-100">
        <Header />
        <div
          className={`automation-wrapper ${
            activeRightSideBar ? '' : 'expand-right-sidebar'
          } ${activeTableView ? 'active' : ''}`}
        >
          <LeftSideBar
            partnersData={partnersData}
            searchText={searchText}
            handleSearchTextChange={this.handleSearchTextChange}
            activeClickPartners={activeClickPartners}
            handleActiveClickPartners={this.handleActiveClickPartners}
            activeOutreachButton={activeOutreachButton}
            toggleOutreachButton={this.toggleOutreachButton}
          />

          <main className="main">
            <div className="main-card map-card">
              <div id="map" className="map">
                <MapComponent
                  handleActiveClickPartners={
                    this.handleActiveClickPartners
                  }
                  handleProvinceClick={this.handleProvinceClick}
                  mapRef={this.mapRef}
                  dataTypeLevel={dataTypeLevel}
                  filteredProvinceChoropleth={
                    filteredProvinceChoropleth
                  }
                  vectorGridInputUrl={vectorGridInputUrl}
                  vectorGridKey={vectorGridKey}
                  color={color}
                  activeOutreachButton={activeOutreachButton}
                  // toggleOutreachButton={this.toggleOutreachButton}
                />
              </div>
              <div
                className={`filter-bar ${
                  activeFilterButton ? 'active' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={this.toggleFilterButton}
                  onKeyPress={this.toggleFilterButton}
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
                        role="tab"
                        className={`${
                          dataTypeLevel === 'province' ? 'active' : ''
                        }`}
                        onClick={() => {
                          this.handleStateLevel('province');
                        }}
                        onKeyPress={() => {
                          this.handleStateLevel('province');
                        }}
                      >
                        <a href="#">Province</a>
                      </li>
                      <li
                        role="tab"
                        className={`${
                          dataTypeLevel === 'district' ? 'active' : ''
                        }`}
                        onClick={() => {
                          this.handleStateLevel('district');
                        }}
                        onKeyPress={() => {
                          this.handleStateLevel('district');
                        }}
                      >
                        <a href="#">District</a>
                      </li>
                      <li
                        role="tab"
                        className={`${
                          dataTypeLevel === 'municipality'
                            ? 'active'
                            : ''
                        }`}
                        onClick={() => {
                          this.handleStateLevel('municipality');
                        }}
                        onKeyPress={() => {
                          this.handleStateLevel('municipality');
                        }}
                      >
                        <a href="#">Municipality</a>
                      </li>
                    </ul>
                  </div>
                  <div className="filter-row">
                    <div className="filter-list">
                      {/* <DropdownCheckbox /> */}
                      <div
                        className="select-dropdown"
                        id="filter_dropdown"
                        onClick={this.handleProvinceDropdown}
                        onKeyDown={this.handleProvinceDropdown}
                        role="tab"
                        tabIndex="0"
                      >
                        <span
                          className={`span-label ${
                            activeProvince ? 'span-active' : ''
                          } `}
                        >
                          Province
                        </span>
                        <ul
                          className={`select-list ${
                            activeProvince ? 'active' : ''
                          }`}
                          id="dropdown-list"
                        >
                          {allProvinceName &&
                            allProvinceName.map(data => {
                              return (
                                <li className="checkbox">
                                  <input
                                    type="checkbox"
                                    id="check_time5"
                                  />
                                  <label htmlFor="check_time5">
                                    <i className="icon-ok-2" />
                                    {data.name}
                                  </label>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      <div
                        className="select-dropdown"
                        id="filter_dropdown"
                        onClick={this.handleDistrictDropdown}
                        onKeyDown={this.handleDistrictDropdown}
                        role="tab"
                        tabIndex="0"
                      >
                        <span
                          className={`span-label ${
                            activeDistrict ? 'span-active' : ''
                          } `}
                        >
                          District
                        </span>
                        <ul
                          className={`select-list ${
                            activeDistrict ? 'active' : ''
                          }`}
                          id="dropdown-list"
                        >
                          {allDistrictName &&
                            allDistrictName.map(data => {
                              return (
                                <li className="checkbox">
                                  <input
                                    type="checkbox"
                                    id="check_time5"
                                  />
                                  <label htmlFor="check_time5">
                                    <i className="icon-ok-2" />
                                    {data.name}
                                  </label>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      <div
                        className="select-dropdown"
                        id="filter_dropdown"
                        onClick={this.handleMunicipalityDropdown}
                        onKeyDown={this.handleMunicipalityDropdown}
                        role="tab"
                        tabIndex="0"
                      >
                        <span
                          className={`span-label ${
                            activeMunicipality ? 'span-active' : ''
                          } `}
                        >
                          District
                        </span>
                        <ul
                          className={`select-list ${
                            activeMunicipality ? 'active' : ''
                          }`}
                          id="dropdown-list"
                        >
                          {allMunicipalityName &&
                            allMunicipalityName.map(data => {
                              return (
                                <li className="checkbox">
                                  <input
                                    type="checkbox"
                                    id="check_time5"
                                  />
                                  <label htmlFor="check_time5">
                                    <i className="icon-ok-2" />
                                    {data.name}
                                  </label>
                                </li>
                              );
                            })}
                        </ul>
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
            </div>
            <TableViewComponent
              toggleTableViewButton={this.toggleTableViewButton}
            />
          </main>
          <RightSideBar
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
})(MainAutomation);
