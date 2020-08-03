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
import { getFilteredMapData } from '../../../actions/partnership.actions';
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
import {
  provinceLists,
  districtLists,
  municipalityLists,
  districtListByProvince,
  muniByDistrict,
} from '../../common/adminList';

class MainPartnership extends Component {
  constructor() {
    super();
    this.state = {
      provinceList: provinceLists(),
      districtList: districtLists(),
      municipalityList: municipalityLists(),
      primaryData: '',
      expsnsionSelection: [],
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
    // const token = localStorage.getItem('userToken');
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
    // this.props.getMunicipalityData();
    this.props.fetchOutreachPrimaryData();
    this.props.fetchOutreachSecondaryData();
    this.props.fetchOutreachChoropleth();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      selectedProvince,
      selectedDistrict,
      districtList,
      municipalityList,
      mapViewBy,
      mapViewDataBy,
    } = this.state;
    const { outreachReducer } = this.props;
    const { primaryData } = outreachReducer;
    if (prevState.selectedProvince !== selectedProvince) {
      let districts;
      if (
        (selectedProvince[0] &&
          selectedProvince[0].value === 'all') ||
        selectedProvince.length === 0
      ) {
        districts = districtLists();
      } else {
        districts = districtListByProvince(
          selectedProvince,
          districtList,
        );
      }
      this.setState({
        selectedDistrict: '',
        selectedMunicipality: '',
        districtList: districts,
      });
    }
    if (prevState.selectedDistrict !== selectedDistrict) {
      // this.props.filterMunListFromDistrict(selectedDistrict);
      let municipality;
      if (
        (selectedDistrict &&
          selectedDistrict[0] &&
          selectedDistrict[0].value === 'all') ||
        selectedDistrict.length === 0
      ) {
        municipality = municipalityLists();
      } else {
        municipality = muniByDistrict(
          selectedDistrict,
          municipalityList,
        );
      }
      this.setState({
        selectedMunicipality: '',
        municipalityList: municipality,
      });
    }

    if (prevState.mapViewBy !== mapViewBy) {
      if (mapViewDataBy === 'general_outreach') {
        this.handleStateLevel();
      }
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
    const { map } = this.state;
    this.setState({
      mapViewDataBy: selectedView,
      selectedProvince: provinceLists(),
      selectedDistrict: '',
      selectedMunicipality: '',
    });

    if (selectedView === 'general_outreach') {
      this.setMapViewBy('province');

      map.setCenter([84.5, 28.5]);
      map.setZoom(6);
    } else {
      this.setState({ localOutreachSelected: '' });
      setTimeout(() => {
        this.setMapViewBy('municipality');
      }, 100);

      const proList = provinceLists();
      const munList = municipalityLists();
      const filteredList = this.provinceListByMunnicipalityTiles(
        proList,
        munList,
      );
      this.changeMapTiles(filteredList);

      map.setCenter([82.5, 29]);
      map.setZoom(6.5);
    }
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
      target: { name, checked },
    } = e;
    this.setState(preState => {
      if (checked) {
        return {
          expsnsionSelection: [...preState.expsnsionSelection, name],
        };
      }
      if (!checked) {
        const newArr = expsnsionSelection.filter(
          daily => daily !== name,
        );
        return {
          expsnsionSelection: newArr,
          isAllInvestmentFocusSelected: false,
        };
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
        return {
          partnerSelection: newArr,
          isAllPartnerSelected: false,
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
          selectedPartner.push(allPartnerElement[i].name);
        }
        this.setState({
          partnerSelection: selectedPartner,
        });
      }
    }
  };

  handelMultiChoice = (clickedValue, type) => {
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
  };

  leftApplyHandler = () => {
    const {
      G2PTypes,
      demonstrationType,
      serviceType,
      expsnsionSelection,
      partnerSelection,
    } = this.state;
    let filteredData = [];
    const { primaryData } = this.props.outreachReducer;

    if (
      G2PTypes.length === 0 &&
      demonstrationType.length === 0 &&
      serviceType.length === 0 &&
      expsnsionSelection.length === 0 &&
      expsnsionSelection.length === 0
    ) {
      filteredData = primaryData;
    }

    if (G2PTypes.length > 0) {
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
      municipalityList,
      mapViewBy,
      districtList,
    } = this.state;

    const provinceCheck =
      selectedProvince && selectedProvince.length > 0;
    const districtCheck =
      selectedDistrict && selectedDistrict.length > 0;
    const muniCheck =
      selectedMunicipality && selectedMunicipality.length > 0;

    if (mapViewDataBy === 'outreach_local_units') {
      let filteredList = [];
      if (muniCheck) {
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
          municipalityList.forEach(mun => {
            if (dist.code === mun.district_code) {
              filteredList.push(mun);
            }
          });
        });

        // console.log('filtered list', filteredList);
      } else if (provinceCheck) {
        filteredList = this.provinceListByMunnicipalityTiles(
          selectedProvince,
          municipalityList,
        );
      }

      if (provinceCheck || districtCheck || muniCheck) {
        this.changeMapTiles(filteredList);
      }
      this.setState({ activeFilter: false });
    } else if (mapViewDataBy === 'general_outreach') {
      this.handleStateLevel();
    }
  };

  handleStateLevel = () => {
    const {
      selectedMunicipality,
      selectedDistrict,
      selectedProvince,
      map,
      municipalityList,
      mapViewBy,
      districtList,
    } = this.state;

    const provinceCheck =
      selectedProvince && selectedProvince.length > 0;
    const districtCheck =
      selectedDistrict && selectedDistrict.length > 0;
    const muniCheck =
      selectedMunicipality && selectedMunicipality.length > 0;
    if (provinceCheck || districtCheck || muniCheck) {
      if (mapViewBy === 'municipality') {
        if (muniCheck) {
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
          this.filterMarkers('municipality', selectedMunicipality);
          this.changeMapTiles(selectedMunicipality);
        } else if (districtCheck) {
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
          const filteredMunFromDist = [];
          selectedDistrict.forEach(dist => {
            municipalityList.forEach(mun => {
              if (dist.code === mun.district_code) {
                filteredMunFromDist.push(mun);
              }
            });
          });
          this.filterMarkers('district', selectedDistrict);
          this.changeMapTiles(filteredMunFromDist);
        } else if (provinceCheck) {
          const filteredList = this.provinceListByMunnicipalityTiles(
            selectedProvince,
            municipalityList,
          );
          this.filterMarkers('province', selectedProvince);
          this.changeMapTiles(filteredList);
        }
      } else if (mapViewBy === 'district') {
        if (districtCheck) {
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
          this.filterMarkers(mapViewBy, selectedDistrict);
          this.changeMapTiles(selectedDistrict);
        } else if (provinceCheck) {
          const filteredList = this.provinceListByMunnicipalityTiles(
            selectedProvince,
            districtList,
          );
          this.filterMarkers('province', selectedProvince);
          this.changeMapTiles(filteredList);
        }
      } else if (mapViewBy === 'province') {
        if (provinceCheck) {
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
          this.filterMarkers(mapViewBy, selectedProvince);
          this.changeMapTiles(selectedProvince);
        }
      }
    } else {
      this.setState({
        primaryData: this.props.outreachReducer.primaryData,
      });
      map.setZoom(6);
      map.setCenter([84.5, 28.5]);
      if (mapViewBy === 'municipality') {
        this.changeMapTiles(municipalityLists());
      } else if (mapViewBy === 'district') {
        this.changeMapTiles(districtLists());
      } else if (mapViewBy === 'province') {
        this.changeMapTiles(provinceLists());
      }
    }
  };

  filterMarkers = (type, array) => {
    const { primaryData } = this.props.outreachReducer;
    const filteredArray = array.filter(data => data.value !== 'all');
    const filteredPrimaryData = [];

    switch (type) {
      case 'province':
        filteredArray.map(selectedData => {
          primaryData.map(pdata => {
            if (pdata.province_code === selectedData.code) {
              filteredPrimaryData.push(pdata);
            }
          });
        });
        console.log(
          ' province type,array',
          type,
          filteredArray,
          filteredPrimaryData,
        );

        break;
      case 'district':
        filteredArray.map(selectedData => {
          primaryData.map(pdata => {
            if (pdata.district_code === selectedData.code) {
              filteredPrimaryData.push(pdata);
            }
          });
        });
        console.log(
          ' dsirict type,array',
          type,
          filteredArray,
          filteredPrimaryData,
        );
        break;
      case 'municipality':
        filteredArray.map(selectedData => {
          primaryData.map(pdata => {
            if (pdata.municipality_code === selectedData.code) {
              filteredPrimaryData.push(pdata);
            }
          });
        });
        console.log(
          ' muni type,array',
          type,
          filteredArray,
          filteredPrimaryData,
        );
        break;
      default:
        console.log(' default type,array', type, array);
    }

    this.setState({ primaryData: filteredPrimaryData });
  };

  changeMapTiles = array => {
    const { map } = this.state;

    const filteredArray = array.filter(data => data.value !== 'all');
    map.setFilter('vector-tile-fill', [
      'in',
      ['get', 'code'],
      [
        'literal',
        filteredArray.map(fed => {
          return fed.code.toString();
        }),
      ],
    ]);
    map.setFilter('vector-tile-outline', [
      'in',
      ['get', 'code'],
      [
        'literal',
        filteredArray.map(fed => {
          return fed.code.toString();
        }),
      ],
    ]);
  };

  provinceListByMunnicipalityTiles = (
    selectedProvince,
    municipalityList,
  ) => {
    const { map } = this.state;
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

    const filteredList = [];

    filteredPro.forEach(province => {
      municipalityList.forEach(district => {
        if (province.code === district.province_code) {
          filteredList.push(district);
        }
      });
    });

    return filteredList;
  };

  resetLeftSideBarSelection = () => {
    this.setState({
      expsnsionSelection: [],
      partnerSelection: [],
      demonstrationType: [],
      serviceType: [],
      G2PTypes: [],
      isAllPartnerSelected: false,
      isAllInvestmentFocusSelected: false,
      primaryData: this.props.outreachReducer.primaryData,
    });
  };

  resetFilters = () => {
    const { mapViewDataBy, map } = this.state;
    this.setState({
      selectedDistrict: '',
      selectedMunicipality: 'null',
      selectedProvince: provinceLists(),
    });

    if (mapViewDataBy === 'outreach_local_units') {
      this.setState({
        activeFilter: false,
      });
      const proList = provinceLists();
      const munList = municipalityLists();
      const filteredList = this.provinceListByMunnicipalityTiles(
        proList,
        munList,
      );
      this.changeMapTiles(filteredList);

      map.setZoom(6);
      map.setCenter([84.5, 28.5]);
    } else if (mapViewDataBy === 'general_outreach') {
      map.setZoom(6);
      map.setCenter([84.5, 28.5]);
      this.setMapViewBy('province');
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
        provinceList,
        districtList,
        municipalityList,
        isAllPartnerSelected,
        isAllInvestmentFocusSelected,
        selectedProvince,
      },
    } = this;

    return (
      <>
        <Headers />
        <div
          className={`automation-wrapper literacy-wrapper ${
            activeOverview ? 'expand-right-sidebar' : ''
          }`}
        >
          <LeftSideBar
            expsnsionSelection={expsnsionSelection}
            partnerSelection={partnerSelection}
            G2PTypes={G2PTypes}
            serviceType={serviceType}
            demonstrationType={demonstrationType}
            isAllPartnerSelected={isAllPartnerSelected}
            isAllInvestmentFocusSelected={
              isAllInvestmentFocusSelected
            }
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
            handelMultiChoice={this.handelMultiChoice}
            resetFilters={this.resetLeftSideBarSelection}
            applyBtnClick={this.leftApplyHandler}
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
                            options={provinceList && provinceList}
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
                      map={map}
                      vectorTileUrl={vectorTileUrl}
                      mapViewBy={mapViewBy}
                      mapViewDataBy={mapViewDataBy}
                      localOutreachSelected={localOutreachSelected}
                      primaryData={primaryData}
                      addMap={this.addMap}
                      setMapViewBy={this.setMapViewBy}
                      handleFederalClickOnMap={
                        this.handleFederalClickOnMap
                      }
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
const mapStateToProps = ({ outreachReducer }) => ({
  outreachReducer,
});
export default connect(mapStateToProps, {
  fetchOutreachChoropleth,
  fetchOutreachPrimaryData,
  getFilteredMapData,
  fetchOutreachSecondaryData,
})(MainPartnership);
