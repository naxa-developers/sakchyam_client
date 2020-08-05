import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select } from 'd3';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/src/css/mapbox-gl.css';
import { ToastContainer, toast } from 'react-toastify';
import MapboxPartnership from './MapComponents/MapboxPartnership';
import Headers from '../../Header';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';

import Loading from '../../common/Loading';
import Select from '../../common/Select/Select';
import FilterBadge from './common/FilterBadge';
import { getCenterBboxProvince } from './common/ProvinceFunction';
import { getCenterBboxDistrict } from './common/DistrictFunction';
import { getCenterBboxMunicipality } from './common/MunicipalityFunction';
import { extendBounds } from '../Automation/MapRelatedComponents/extendBbox';
import {
  provinceLists,
  districtLists,
  municipalityLists,
  districtListByProvince,
  muniByDistrict,
} from '../../common/adminList';
import {
  getMfsAllData,
  filterByPartnerInstitution,
  filterMfsChoroplethData,
} from '../../../actions/mfs.action';
import {
  filterDistrictListFromProvince,
  filterMunListFromDistrict,
} from '../../../actions/common.actions';
import 'react-toastify/dist/ReactToastify.css';

global.markerList = [];
function removeMarker() {
  if (global.markerList !== null) {
    for (let i = global.markerList.length - 1; i >= 0; i -= 1) {
      global.markerList[i].remove();
      // const removed = global.markerList.splice(0);
    }
    document
      .querySelectorAll('.mapboxgl-marker')
      .forEach(function(a) {
        a.remove();
      });
    global.markerList = [];
    console.log(global.markerList, 'globalMarkerlist');
  }
}

class MainMFS extends Component {
  constructor() {
    super();
    this.state = {
      // Event Handle Section
      selectedPartner: '',
      selectedInnovation: '',
      selectedAchievement: '',
      provinceList: provinceLists(),
      districtList: districtLists(),
      municipalityList: municipalityLists(),
      selectedProvince: [],
      selectedDistrict: [],
      selectedMunicipality: [],
      showBarof: 'Provinces',
      // UI Section
      activeFilter: false,
      activeOverview: false,
      mapViewDataBy: '',
      // resetSunburst: false,
      // map Section
      map: null,
      mapViewBy: 'province',
      vectorTileUrl:
        'https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}',
    };
  }

  componentDidMount() {
    this.props.getMfsAllData();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      mapViewBy,
      selectedProvince,
      selectedDistrict,
      map,
      selectedPartner,
      districtList,
      municipalityList,
    } = this.state;

    if (prevState.selectedProvince !== selectedProvince) {
      console.log('selected provicne changed', selectedProvince);
      districtListByProvince(selectedProvince);
    }
    if (prevState.selectedDistrict !== selectedDistrict) {
      this.props.filterMunListFromDistrict(selectedDistrict);
    }
    if (prevState.mapViewBy !== mapViewBy) {
      const filteredList = [];
      removeMarker();
      // console.log(filteredList, 'beforefilter');
      if (mapViewBy === 'province') {
        if (selectedProvince && selectedProvince.length > 0) {
          map.setFilter('vector-tile-fill', [
            'in',
            ['get', 'code'],
            [
              'literal',
              selectedProvince.map(fed => {
                return fed.code.toString();
              }),
            ],
          ]);
          map.setFilter('vector-tile-outline', [
            'in',
            ['get', 'code'],
            [
              'literal',
              selectedProvince.map(fed => {
                return fed.code.toString();
              }),
            ],
          ]);
        }
      }
      if (mapViewBy === 'district') {
        if (selectedDistrict && selectedDistrict.length > 0) {
          // eslint-disable-next-line array-callback-return
          // selectedDistrict.map(selectedDist => {
          //   // console.log(province, 'prv1');
          //   // eslint-disable-next-line array-callback-return
          //   // districtList.map(district => {
          //   //   // console.log(district, 'district');
          //   //   if (selectedDist.code === district.province_code) {
          //   //     // console.log(district, 'true');
          //   filteredList.push(selectedDist);
          //   //   }
          //   // });
          //   // console.log(filtered, 'test filtered');
          // });
          // console.log(filteredList, 'dist2 ');
          map.setFilter('vector-tile-fill', [
            'in',
            ['get', 'code'],
            [
              'literal',
              selectedDistrict.map(fed => {
                return fed.code.toString();
              }),
            ],
          ]);
          map.setFilter('vector-tile-outline', [
            'in',
            ['get', 'code'],
            [
              'literal',
              selectedDistrict.map(fed => {
                return fed.code.toString();
              }),
            ],
          ]);
        } else if (selectedProvince && selectedProvince.length > 0) {
          // alert('province Selection on district');
          // eslint-disable-next-line array-callback-return
          selectedProvince.map(province => {
            // console.log(province, 'prv1');
            // eslint-disable-next-line array-callback-return
            districtList.map(district => {
              // console.log(district, 'district');
              if (province.code === district.province_code) {
                // console.log(district, 'true');
                filteredList.push(district);
              }
            });
            // console.log(filtered, 'test filtered');
          });

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

          // console.log(intersection, 'filteredDistrictList');
        }
      } else if (mapViewBy === 'municipality') {
        if (selectedProvince && selectedProvince.length > 0) {
          // eslint-disable-next-line array-callback-return
          selectedProvince.map(province => {
            // console.log(province, 'prv1');
            // eslint-disable-next-line array-callback-return
            municipalityList.map(district => {
              // console.log(district, 'dist');
              if (province.code === district.province_code) {
                // console.log(district, 'true');
                filteredList.push(district);
              }
            });
          });
          // console.log(filteredList, 'test filtered');
          // console.log(filteredList, 'dist2 ');
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
        if (selectedDistrict && selectedDistrict.length > 0) {
          // console.log(selectedProvince);
          // let filtered = null;
          // const intersection = districtList.filter(element =>
          //   selectedProvince.includes(element.province_id),
          // );
          // eslint-disable-next-line array-callback-return
          selectedDistrict.map(province => {
            // console.log(province, 'prv1');
            // eslint-disable-next-line array-callback-return
            municipalityList.map(district => {
              // console.log(district, 'dist');
              if (province.code === district.district_code) {
                filteredList.push(district);
              }
            });
          });
          // console.log(filteredList, 'test filtered');
          // console.log(filteredList, 'dist2 ');
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
          // console.log(intersection, 'filteredDistrictList');
        }
      }
    }
    if (prevState.selectedPartner !== selectedPartner) {
      this.props.filterByPartnerInstitution(selectedPartner);
    }
  }

  handleFederalClickOnMap = (statelevel, code) => {
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
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

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
    // console.log('setMapView By Function');
    const {
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
    } = this.state;
    this.setState({
      mapViewBy: selectedMapView,
    });
    this.props.filterMfsChoroplethData(
      selectedMapView,
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
    );
    // this.props.getFilteredMapData(selectedMapView);
    this.setState({
      vectorTileUrl: `https://vectortile.naxa.com.np/federal/${selectedMapView}.mvt/?tile={z}/{x}/{y}`,
    });
  };

  // handleStateLevel = () => {};

  handleStateLevel = clickedValue => {
    const {
      map,
      provinceList,
      districtList,
      municipalityList,
    } = this.state;
    // const {
    //   partnershipReducer: { municipalityList, districtList },
    // } = this.props;
    console.log(clickedValue, 'clickedValue');
    // console.log(e.target.value, 'target value');
    const {
      dataTypeLevel,
      activeClickPartners,
      selectedProvince,
      selectedDistrict,
      selectedMunicipality,
      mapViewDataBy,
      mapViewBy,
    } = this.state;
    removeMarker();
    if (
      (selectedProvince && selectedProvince.length > 0) ||
      (selectedDistrict && selectedDistrict.length > 0) ||
      (selectedMunicipality && selectedMunicipality.length > 0)
    ) {
      if (clickedValue === 'municipality') {
        // if (selectedMunicipality.length > 0) {
        // } else if (selectedDistrict.length > 0) {
        // } else {

        // }

        if (selectedDistrict && selectedDistrict.length > 0) {
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
          // const query = selectedDistrict
          //   .map(data => {
          //     return `code=${data.code}`;
          //   })
          //   .join('&');
          const filteredMunFromDist = [];
          selectedDistrict.forEach(dist => {
            municipalityList.forEach(mun => {
              if (dist.code === mun.district_code) {
                filteredMunFromDist.push(mun);
              }
            });
          });
          map.setFilter('vector-tile-fill', [
            'in',
            ['get', 'code'],
            [
              'literal',
              filteredMunFromDist.map(fed => {
                return fed.code.toString();
              }),
            ],
          ]);
          map.setFilter('vector-tile-outline', [
            'in',
            ['get', 'code'],
            [
              'literal',
              filteredMunFromDist.map(fed => {
                return fed.code.toString();
              }),
            ],
          ]);
        } else if (selectedProvince && selectedProvince.length > 0) {
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
          const filteredList = [];
          selectedProvince.forEach(province => {
            // console.log(province, 'prv1');
            // eslint-disable-next-line array-callback-return
            municipalityList.forEach(district => {
              // console.log(district, 'district');
              if (province.code === district.province_code) {
                // console.log(district, 'true');
                filteredList.push(district);
              }
            });
            // console.log(filtered, 'test filtered');
          });
          // console.log(filteredList, 'dist2 ');
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
      } else if (clickedValue === 'district') {
        // if (selectedMunicipality.length > 0) {
        //   const query = selectedMunicipality
        //     .map(data => {
        //       return `code=${data}`;
        //     })
        //     .join('&');
        //   const municipalityFilterUrl = `https://vectortile.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}&${query}`;
        //   this.setState({
        //     vectorTileUrl: municipalityFilterUrl,
        //
        //   });
        // } else
        if (selectedDistrict && selectedDistrict.length > 0) {
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
          map.setFilter('vector-tile-fill', [
            'in',
            ['get', 'code'],
            [
              'literal',
              selectedDistrict.map(fed => {
                return fed.code.toString();
              }),
            ],
          ]);
          map.setFilter('vector-tile-outline', [
            'in',
            ['get', 'code'],
            [
              'literal',
              selectedDistrict.map(fed => {
                return fed.code.toString();
              }),
            ],
          ]);
        } else if (selectedProvince && selectedProvince.length > 0) {
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
          const filteredList = [];
          selectedProvince.forEach(province => {
            // console.log(province, 'prv1');
            // eslint-disable-next-line array-callback-return
            districtList.forEach(district => {
              // console.log(district, 'district');
              if (province.code === district.province_code) {
                // console.log(district, 'true');
                filteredList.push(district);
              }
            });
            // console.log(filtered, 'test filtered');
          });
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
      } else if (clickedValue === 'province') {
        if (selectedProvince && selectedProvince.length > 0) {
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
          // const { map } = this.state;
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
          map.setFilter('vector-tile-fill', [
            'in',
            ['get', 'code'],
            [
              'literal',
              selectedProvince.map(fed => {
                return fed.code.toString();
              }),
            ],
          ]);
          map.setFilter('vector-tile-outline', [
            'in',
            ['get', 'code'],
            [
              'literal',
              selectedProvince.map(fed => {
                return fed.code.toString();
              }),
            ],
          ]);
        }
      }
      // alert('atleast on state is number');
    }
    //  else if (clickedValue === 'province') {
    // } else if (clickedValue === 'district') {
    // } else if (clickedValue === 'municipality') {
    // }
  };

  handleProvinceClick = (code, name) => {
    // console.log(id, 'asasa');
    const { mapViewBy } = this.state;
    if (mapViewBy === 'municipality') {
      document.querySelector(`.municipality .check_${code}`).click();
    } else if (mapViewBy === 'district') {
      document.querySelector(`.district .check_${code}`).click();
    } else if (mapViewBy === 'province') {
      document.querySelector(`.province .check_${code}`).click();
    }
  };

  handleShowBarOf = value => {
    this.setState({ showBarof: value });
  };

  handlePartnerSelection = clickedValue => {
    const { selectedPartner } = this.state;
    if (selectedPartner === clickedValue) {
      this.setState({ selectedPartner: '' });
    } else {
      this.setState({ selectedPartner: clickedValue });
    }
  };

  handleInnovationSelection = clickedValue => {
    const { selectedInnovation } = this.state;
    if (selectedInnovation === clickedValue) {
      this.setState({ selectedInnovation: '' });
    } else {
      this.setState({ selectedInnovation: clickedValue });
    }
  };

  handleAchievementSelection = clickedValue => {
    const { selectedAchievement } = this.state;
    if (selectedAchievement === clickedValue) {
      this.setState({ selectedAchievement: '' });
    } else {
      this.setState({ selectedAchievement: clickedValue });
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
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
      mapViewBy,
    } = this.state;

    // if (selectedPartner === '') {
    //   toast.warning('⚠ Please Select Partner!');
    // } else if (selectedInnovation === '') {
    //   toast.warning('⚠ Please Select Innovation Type!');
    if (selectedAchievement === '') {
      toast.warning('⚠ Please Select Achievement!');
    } else {
      this.props.filterMfsChoroplethData(
        mapViewBy,
        selectedPartner,
        selectedInnovation,
        selectedAchievement,
      );
    }
    // this.props.filterMapChoropleth(
    //   investmentFocusSelection,
    //   projectSelection,
    //   projectStatus,
    //   partnerType,
    //   partnerSelection,
    //   { selectedMunicipality, selectedDistrict, selectedProvince },
    // );
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
      map,
    } = this.state;
    // if (activeView === 'visualization') {
    //   this.props.filterOverviewData(
    //     investmentFocusSelection,
    //     projectSelection,
    //     partnerType,
    //     partnerSelection,
    //     { selectedMunicipality, selectedDistrict, selectedProvince },
    //   );
    // } else {
    // this.props.filterOverviewData(
    //   investmentFocusSelection,
    //   projectSelection,
    //   partnerType,
    //   partnerSelection,
    //   { selectedMunicipality, selectedDistrict, selectedProvince },
    // );
    // this.props.filterMapDataWithFederal();
    this.handleStateLevel(mapViewBy);
    // }
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
    const { mapViewBy, activeView, map } = this.state;
    this.resetLeftSideBarSelection();
    this.setState({
      selectedProvince: [],
      selectedDistrict: [],
      selectedMunicipality: [],
    });
    if (activeView === 'visualization') {
      // this.props.resetRadialData();

      this.props.resetOverviewData();
    } else {
      this.props.resetOverviewData();
      this.setMapViewBy(mapViewBy);
      this.setState({
        selectedProvince: [],
        selectedDistrict: [],
        selectedMunicipality: [],
      });

      const combinedBbox = [];
      // console.log(selectedProvince, 'selectedProvine');
      const getBboxValue = getCenterBboxProvince([
        1,
        2,
        3,
        4,
        5,
        6,
        7,
      ]);
      getBboxValue.map(data => {
        combinedBbox.push(data.bbox);
        return true;
      });
      const extendedValue = extendBounds(combinedBbox);
      map.fitBounds(extendedValue);
      map.setFilter('vector-tile-fill', null);
      map.setFilter('vector-tile-outline', null);
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
        selectedInnovation,
        selectedPartner,
        selectedAchievement,
        provinceList,
        districtList,
        municipalityList,
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
          className={`automation-wrapper literacy-wrapper mfs-wrapper ${
            activeOverview ? 'expand-right-sidebar' : ''
          }`}
        >
          <ToastContainer
            style={{
              fontFamily: 'Avenir Heavy',
              fontSize: '.9125rem',
              color: 'black',
            }}
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <LeftSideBar
            resetFilters={this.resetFilters}
            applyBtnClick={this.applyBtnClick}
            selectedPartner={selectedPartner}
            handlePartnerSelection={this.handlePartnerSelection}
            selectedInnovation={selectedInnovation}
            handleInnovationSelection={this.handleInnovationSelection}
            selectedAchievement={selectedAchievement}
            handleAchievementSelection={
              this.handleAchievementSelection
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
                      </ul>
                    </div>
                    <div className="filter-row">
                      <div className="filter-list">
                        <div className="form-group province">
                          <Select
                            withCheckbox
                            name="Select Province"
                            options={provinceList}
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
                          <div className="form-group district">
                            <Select
                              withCheckbox
                              name="Select District"
                              options={districtList}
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
                          <div className="form-group municipality">
                            <Select
                              withCheckbox
                              name="Select Municipality"
                              options={municipalityList}
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
                          icon="people"
                          title="Beneficiaries"
                        />
                        <FilterBadge
                          viewDataBy={viewDataBy}
                          onclick={() => {
                            this.setViewDataBy('allocated_budget');
                          }}
                          dataTitle="allocated_budget"
                          icon="monetization_on"
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
                          icon="payments"
                          title="Partners"
                        />
                        <FilterBadge
                          viewDataBy={mapViewDataBy}
                          onclick={() => {
                            this.setMapViewDataBy(
                              'allocated_beneficiary',
                            );
                          }}
                          dataTitle="allocated_beneficiary"
                          icon="people"
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
                          icon="monetization_on"
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
                <div className="literacy-tab-item">
                  {/* <div id="map" className="map"> */}
                  {/* {activeView === 'map' && ( */}
                  <MapboxPartnership
                    selectedProvince={selectedProvince}
                    selectedDistrict={selectedDistrict}
                    selectedMunicipality={selectedMunicipality}
                    handleProvinceClick={this.handleProvinceClick}
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
                  {/* )} */}
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
const mapStateToProps = ({ mfsReducer, commonReducer }) => ({
  mfsReducer,
  commonReducer,
});
export default connect(mapStateToProps, {
  getMfsAllData,
  filterMfsChoroplethData,
  filterByPartnerInstitution,
  filterDistrictListFromProvince,
  filterMunListFromDistrict,
})(MainMFS);
