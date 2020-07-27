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
  // getMapDataByProvince,
  getMapDataByDistrict,
  getMapDataByMunicipality,
  getFilteredMapData,
  getRadialData,
  getPartnersList,
  filterPartnerListByPartnerType,
  filterFinancialDataWithAllFilters,
  getDistrictDataFromProvince,
  filterRadialData,
  getBarDataByBenefBudget,
  getBarDataByInvestmentFocus,
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
  resetBarDataByInvestmentFocus,
  filterLeverageData,
  filterBarDataByInvestment,
} from '../../../actions/partnership.actions';
import {
  getProvinceData,
  getDistrictData,
  getMunicipalityData,
} from '../../../actions/common.actions';
import Loading from '../../common/Loading';
import Select from '../../common/Select/Select';
import { getCenterBboxProvince } from './common/ProvinceFunction';
import { getCenterBboxDistrict } from './common/DistrictFunction';
import { getCenterBboxMunicipality } from './common/MunicipalityFunction';
import { extendBounds } from '../Automation/MapRelatedComponents/extendBbox';
import MapFilter from './MapFilter';
import { fetchOutreachSecondaryData } from '../../../actions/outreach.actions';
import { provinceLists, districtLists } from '../../common/adminList';

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
      serviceType: [],
      G2PTypes: [],
      demonstrationType: [],
      selectedProvince: null,
      selectedDistrict: null,
      selectedMunicipality: null,
      isAllPartnerSelected: false,
      isAllProjectSelected: false,
      isAllInvestmentFocusSelected: false,
      showBarof: 'Provinces',
      showBarofInvestmentBudgetBenef: 'investmentFocus',
      // UI Section
      activeFilter: false,
      activeOverview: true,
      viewDataBy: 'allocated_beneficiary',
      mapViewDataBy: 'general_outreach',
      activeView: 'map',
      map: null,
      mapViewBy: 'province',
      vectorTileUrl:
        'https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}',
      localOutreachSelected: '',
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('userToken');
    // console.log('uset token', token);
    // const { viewDataBy } = this.state;
    // this.props.getPartnersList();
    // this.props.getProjectListData();
    // this.props.getPartnershipInvestmentFocus();
    // this.props.getBarDataByBenefBudget(viewDataBy);
    // this.props.getBarDataByInvestmentFocus(viewDataBy);
    // this.props.getSankeyChartData();
    this.props.getProvinceData();
    this.props.getDistrictData();
    this.props.getMunicipalityData();
    const filterBar = document.getElementsByClassName(
      'filter-bar',
    )[0];
    const provinceList = document.getElementsByClassName(
      'filter-bar',
    )[0];
    const districtList = document.getElementsByClassName(
      'filter-bar',
    )[0];
    const munList = document.getElementsByClassName('filter-bar')[0];
    document.addEventListener('click', async event => {
      const isClickInside = filterBar.contains(event.target);

      if (!isClickInside) {
        // console.log('clickoutside');
        this.setState({
          activeFilter: false,
        });
      }
    });
    this.props.fetchOutreachSecondaryData();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      investmentFocusSelection,
      viewDataBy,
      partnerSelection,
      projectSelection,
      projectStatus,
      partnerType,
      selectedProvince,
      selectedDistrict,
    } = this.state;
    // if (
    //   prevState.investmentFocusSelection !== investmentFocusSelection
    // ) {
    //   this.props.getProjectListData(investmentFocusSelection);
    //   this.props.filterPartnerListByPartnerType(partnerType);
    //   // eslint-disable-next-line react/no-did-update-set-state
    //   this.setState({ isAllProjectSelected: false });
    // }
    // if (prevState.viewDataBy !== viewDataBy) {
    //   if (viewDataBy !== 'Leverage') {
    //     this.props.getSankeyChartData(viewDataBy);
    //     this.props.filterRadialData(
    //       // 'province',
    //       viewDataBy,
    //       investmentFocusSelection,
    //       projectSelection,
    //       partnerType,
    //       partnerSelection,
    //       projectStatus,
    //     );
    //   }
    // }
    // if (prevState.partnerType !== partnerType) {
    //   this.props.filterPartnerListByPartnerType(partnerType);
    // }
    if (prevState.selectedProvince !== selectedProvince) {
      this.props.filterDistrictListFromProvince(selectedProvince);
    }
    if (prevState.selectedDistrict !== selectedDistrict) {
      this.props.filterMunListFromDistrict(selectedDistrict);
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
      center: [87.5, 27.25],
      zoom: 6.5,
    });

    // map.addControl(new mapboxgl.NavigationControl(), 'top-right');

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
  };

  handleStateLevel = clickedValue => {
    const { map } = this.state;
    const {
      dataTypeLevel,
      activeClickPartners,
      selectedProvince,
      selectedDistrict,
      selectedMunicipality,
    } = this.state;
    if (
      selectedProvince.length > 0 ||
      selectedDistrict.length > 0 ||
      selectedMunicipality.length > 0
    ) {
      if (clickedValue === 'municipality') {
        if (selectedMunicipality.length > 0) {
          const combinedBbox = [];
          // console.log(selectedMunicipality, 'selectedMunicipality');
          const getBboxValue = getCenterBboxMunicipality(
            selectedMunicipality.map(data => {
              return data.code;
            }),
          );
          // console.log(getBboxValue, 'bboxValue');
          getBboxValue.map(data => {
            combinedBbox.push(data.bbox);
            return true;
          });
          const extendedValue = extendBounds(combinedBbox);
          // console.log(extendedValue, 'bbox');
          map.fitBounds(extendedValue);
          const query = selectedMunicipality
            .map(data => {
              return `code=${data.code}`;
            })
            .join('&');
          const municipalityFilterUrl = `https://vectortile.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}&${query}`;
          this.setState({
            vectorTileUrl: municipalityFilterUrl,
            // vectorGridKey: Math.random(),
          });
        } else if (selectedDistrict.length > 0) {
          const combinedBbox = [];
          // console.log(selectedDistrict, 'selectedDistrict');
          const getBboxValue = getCenterBboxDistrict(
            selectedDistrict.map(data => {
              return data.code;
            }),
          );
          // console.log(getBboxValue, 'bboxValue');
          getBboxValue.map(data => {
            combinedBbox.push(data.bbox);
            return true;
          });
          const extendedValue = extendBounds(combinedBbox);
          // console.log(extendedValue, 'bbox');
          map.fitBounds(extendedValue);
          const query = selectedDistrict
            .map(data => {
              return `district_code=${data.code}`;
            })
            .join('&');
          const municipalityFilterUrl = `https://vectortile.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}&${query}`;
          this.setState({
            vectorTileUrl: municipalityFilterUrl,
            // vectorGridKey: Math.random(),
          });
        } else if (selectedProvince.length > 0) {
          const combinedBbox = [];
          // console.log(selectedProvince, 'selectedProvine');
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
          // console.log(extendedValue, 'bbox');
          map.fitBounds(extendedValue);
          const query = selectedProvince
            .map(data => {
              return `province_id_id=${data.code}`;
            })
            .join('&');
          const municipalityFilterUrl = `https://vectortile.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}&${query}`;
          this.setState({
            vectorTileUrl: municipalityFilterUrl,
            // vectorGridKey: Math.random(),
          });
        }
      } else if (clickedValue === 'district') {
        if (selectedDistrict.length > 0) {
          const combinedBbox = [];
          // console.log(selectedDistrict, 'selectedDistrict');
          const getBboxValue = getCenterBboxDistrict(
            selectedDistrict.map(data => {
              return data.code;
            }),
          );
          // console.log(getBboxValue, 'bboxValue');
          getBboxValue.map(data => {
            combinedBbox.push(data.bbox);
            return true;
          });
          const extendedValue = extendBounds(combinedBbox);
          // console.log(extendedValue, 'bbox');
          map.fitBounds(extendedValue);
          const query = selectedDistrict
            .map(data => {
              return `code=${data.code}`;
            })
            .join('&');
          const municipalityFilterUrl = `https://vectortile.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}&${query}`;
          this.setState({
            vectorTileUrl: municipalityFilterUrl,
            // vectorGridKey: Math.random(),
          });
        } else if (selectedProvince.length > 0) {
          const combinedBbox = [];
          // console.log(selectedProvince, 'selectedProvine');
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
          // console.log(extendedValue, 'bbox');
          map.fitBounds(extendedValue);
          const query = selectedProvince
            .map(data => {
              return `province_id_id=${data.code}`;
            })
            .join('&');
          const municipalityFilterUrl = `https://vectortile.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}&${query}`;
          this.setState({
            vectorTileUrl: municipalityFilterUrl,
            // vectorGridKey: Math.random(),
          });
        }
      } else if (clickedValue === 'province') {
        if (selectedProvince.length > 0) {
          const combinedBbox = [];
          // console.log(selectedProvince, 'selectedProvine');
          const getBboxValue = getCenterBboxProvince(
            selectedProvince.map(data => {
              return data.id;
            }),
          );
          getBboxValue.map(data => {
            combinedBbox.push(data.bbox);
            return true;
          });
          // console.log(combinedBbox, 'combineBbox');
          const extendedValue = extendBounds(combinedBbox);
          // const { map } = this.state;
          // console.log(extendedValue, 'bbox');
          map.fitBounds(extendedValue);
          // map.flyToBounds(extendedValue, {
          //   animate: true,
          //   duration: 2,
          // });
          const query = selectedProvince
            .map(data => {
              return `code=${data.code}`;
            })
            .join('&');
          const municipalityFilterUrl = `https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}&${query}`;
          this.setState({
            vectorTileUrl: municipalityFilterUrl,
            // vectorGridKey: Math.random(),
          });
        }
      }
      // alert('atleast on state is number');
    } else if (clickedValue === 'province') {
      // alert('province ');
      this.setState({
        vectorTileUrl:
          'https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}',
        // vectorGridKey: Math.random(),
        // color: '#55b110',
      });
      this.props.filterAutomationDataForVectorTiles(clickedValue);
    } else if (clickedValue === 'district') {
      this.setState({
        vectorTileUrl:
          'https://vectortile.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}',
        // vectorGridKey: '1',
        // vectorGridKey: Math.random(),
        // color: '#FF0000',
      });
      this.props.filterAutomationDataForVectorTiles(clickedValue);
    } else if (clickedValue === 'municipality') {
      this.setState({
        vectorTileUrl:
          'https://vectortile.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}',
        // 'https://geoserver.naxa.com.np/geoserver/gwc/service/tms/1.0.0/Bipad:Municipality@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf',
        // vectorGridKey: '2',
        // vectorGridKey: Math.random(),
        // color: '#FF000',
      });
      this.props.filterAutomationDataForVectorTiles(clickedValue);
    }
  };

  handleShowBarOf = value => {
    this.setState({ showBarof: value });
  };

  handleShowBarOfInvestmentBudgetBenefBar = value => {
    this.setState({ showBarofInvestmentBudgetBenef: value });
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
    // console.log(value);
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
      investmentFocusSelection,
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
      investmentFocusSelection,
    );
    this.props.filterSankeyChartData(
      viewDataBy,
      investmentFocusSelection,
      projectSelection,
      partnerType,
      partnerSelection,
      projectStatus,
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
      mapViewBy,
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
      // this.props.filterMapDataWithFederal();
      this.handleStateLevel(mapViewBy);
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
        investmentFocusSelection,
        projectSelection,
        projectStatus,
        partnerSelection,
        partnerType,
        showBarof,
        showBarofInvestmentBudgetBenef,
        selectedProvince,
        selectedDistrict,
        selectedMunicipality,
        demonstrationType,
        serviceType,
        G2PTypes,
        localOutreachSelected,
      },
      // props: {},
    } = this;
    const {
      allProvinceList,
      allDistrictList,
      allMunicipalityList,
    } = this.props.commonReducer;

    const temp = provinceLists();

    console.log('province list======>', allProvinceList);
    console.log('new pro list======>', temp);

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
            G2PTypes={G2PTypes}
            serviceType={serviceType}
            demonstrationType={demonstrationType}
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
                    />
                    <div className="filter-row">
                      <div className="filter-list">
                        <div className="form-group">
                          <Select
                            withCheckbox
                            name="Select Province"
                            options={temp && temp}
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
                  investmentFocusSelection={investmentFocusSelection}
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
          />
        </div>
        {/* <MapboxPartnership /> */}
      </>
    );
  }
}
const mapStateToProps = ({ commonReducer }) => ({
  commonReducer,
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
  getBarDataByInvestmentFocus,
  filterBarDataByInvestment,
  resetBarDataByInvestmentFocus,
  fetchOutreachSecondaryData,
})(MainPartnership);
