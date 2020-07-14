import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select } from 'd3';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/src/css/mapbox-gl.css';
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
import Loading from '../../common/Loading';
import Select from '../../common/Select/Select';
import FilterBadge from './common/FilterBadge';
import { getCenterBboxProvince } from './common/ProvinceFunction';
import { getCenterBboxDistrict } from './common/DistrictFunction';
import { getCenterBboxMunicipality } from './common/MunicipalityFunction';
import { extendBounds } from '../Automation/MapRelatedComponents/extendBbox';

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
      mapViewDataBy: 'investment_focus',
      activeView: 'visualization',
      // resetSunburst: false,
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
    // this.props.getPartnershipAllData();
    this.props.getProvinceData();
    // this.props.getSpiderChartData();
    // this.props.getOverviewData();
    // this.props.getSankeyChartData();
    this.props.getBarDataByBenefBudget(viewDataBy);
    this.props.getBarDataByInvestmentFocus(viewDataBy);
    // this.props.getMapDataByDistrict(viewDataBy);
    // this.props.getMapDataByMunicipality(viewDataBy);
    this.props.getDistrictData();
    this.props.getMunicipalityData();

    // const provinceEl = document.getElementById(
    //   'filter_dropdown_province',
    // );
    // const districtEl = document.getElementById(
    //   'filter_dropdown_district',
    // );
    // const municipalityEl = document.getElementById(
    //   'filter_dropdown_municipality',
    // );
    // // console.log(specifiedElement, 'ss');
    // document.addEventListener('click', async event => {
    //   const isClickInside = provinceEl.contains(event.target);
    //   if (!isClickInside) {
    //     this.setState({
    //       activeProvince: false,
    //       // searchDropdown: false,
    //     });
    //     // the click was outside the specifiedElement, do something
    //   }
    // });
    // document.addEventListener('click', async event => {
    //   const isClickInside = districtEl.contains(event.target);
    //   if (!isClickInside) {
    //     this.setState({
    //       activeDistrict: false,
    //       // searchDropdown: false,
    //     });
    //     // the click was outside the specifiedElement, do something
    //   }
    // });
    // document.addEventListener('click', async event => {
    //   const isClickInside = municipalityEl.contains(event.target);
    //   if (!isClickInside) {
    //     this.setState({
    //       activeMunicipality: false,
    //       // searchDropdown: false,
    //     });
    //     // the click was outside the specifiedElement, do something
    //   }
    // });
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
      // this.props.filterFinancialDataWithAllFilters(
      //   'province',
      //   viewDataBy,
      //   partnerSelection,
      //   projectSelection,
      //   projectStatus,
      // );
      if (viewDataBy !== 'Leverage') {
        this.props.getSankeyChartData(viewDataBy);
        // this.props.filterSankeyChartData(
        //   investmentFocusSelection,
        //   projectSelection,
        //   partnerType,
        //   partnerSelection,
        //   projectStatus,
        // );
        this.props.filterRadialData(
          // 'province',
          viewDataBy,
          investmentFocusSelection,
          projectSelection,
          partnerType,
          partnerSelection,
          projectStatus,
        );
      }
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

  handleFederalClickOnMap = (statelevel, code) => {
    console.log(statelevel, code);
    if (statelevel === 'municipality') {
      const query = `code=${code}`;
      this.setState({
        vectorTileUrl: `https://vectortile.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}&${query}`,
      });
    } else if (statelevel === 'district') {
      const query = `code=${code}`;
      this.setState({
        vectorTileUrl: `https://vectortile.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}&${query}`,
      });
    } else {
      const query = `code=${code}`;
      this.setState({
        vectorTileUrl: `https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}&${query}`,
      });
    }
  };

  addMap = () => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZ2VvbWF0dXBlbiIsImEiOiJja2E5bDFwb2swdHNyMnNvenZxa2Vpeml2In0.fCStqdwmFYFP-cUvb5vMCw';
    const map = new mapboxgl.Map({
      container: 'map',
      // style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
      center: [84.0, 27.5], // starting position [lng, lat]
      zoom: 7, // starting zoom
    });
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // console.log(map, 'map');
    this.setState({ map });
  };

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

  handleStateLevel = clickedValue => {
    const { map } = this.state;
    // console.log(e.target.value, 'target value');
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
        // if (selectedMunicipality.length > 0) {
        // } else if (selectedDistrict.length > 0) {
        // } else {

        // }

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
        // if (selectedMunicipality.length > 0) {
        //   const query = selectedMunicipality
        //     .map(data => {
        //       return `code=${data}`;
        //     })
        //     .join('&');
        //   const municipalityFilterUrl = `https://vectortile.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}&${query}`;
        //   this.setState({
        //     vectorGridInputUrl: municipalityFilterUrl,
        //     vectorGridKey: Math.random(),
        //   });
        // } else
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
          console.log(combinedBbox, 'combineBbox');
          const extendedValue = extendBounds(combinedBbox);
          // const { map } = this.state;
          console.log(extendedValue, 'bbox');
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
    // this.setState({
    //   selectedProvince: [],
    //   selectedProvinceName: [],
    //   selectedProvinceDropdown: [],
    //   selectedDistrict: [],
    //   selectedDistrictName: [],
    //   selectedDistrictDropdown: [],
    //   selectedMunicipality: [],
    //   selectedMunicipalityName: [],
    // });
    // this.setState({ dataTypeLevel: clickedValue });
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
    this.props.filterBarDataByInvestment(
      'province',
      viewDataBy,
      partnerSelection,
      projectSelection,
      projectStatus,
      investmentFocusSelection,
    );
    // this.props.filterRadialData(
    //   viewDataBy,
    //   investmentFocusSelection,
    //   projectSelection,
    //   partnerType,
    //   partnerSelection,
    //   projectStatus,
    // );
    // const investmentSpaceReduced= investmentFocusSelection.map(data=>{
    //   return data.
    // })
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
    console.log('resertfiles');
    const { mapViewBy, activeView } = this.state;
    const that = this;
    this.resetLeftSideBarSelection();
    if (activeView === 'visualization') {
      this.props.resetRadialData();
      this.props.resetSankeyChartData();
      this.props.resetOverviewData();
      this.props.resetLeverageData();
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
                            this.setMapViewDataBy('investment_focus');
                          }}
                          dataTitle="investment_focus"
                          title="Investment Focus"
                        />
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
                            this.setMapViewDataBy('allocated_budget');
                          }}
                          dataTitle="allocated_budget"
                          title="Allocated Budget"
                        />
                        {/* <FilterBadge
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
                        /> */}
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
                      addMap={this.addMap}
                      handleFederalClickOnMap={
                        this.handleFederalClickOnMap
                      }
                      map={map}
                      vectorTileUrl={vectorTileUrl}
                      mapViewBy={mapViewBy}
                      mapViewDataBy={mapViewDataBy}
                      setMapViewBy={this.setMapViewBy}
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
  getBarDataByInvestmentFocus,
  filterBarDataByInvestment,
  resetBarDataByInvestmentFocus,
})(MainPartnership);
