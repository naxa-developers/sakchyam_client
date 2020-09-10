import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select } from 'd3';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/src/css/mapbox-gl.css';
import MapboxPartnership from './MapComponents/MapboxPartnership';
import AlertComponent from '../../common/Notifier';
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
  filterMapChoropleth,
  filterMapDataOfCircleMarkerWithViewDataBy,
  getPartnerTypeList,
  getTimelineData,
} from '../../../actions/partnership.actions';
import Loading from '../../common/Loading';
import Select from '../../common/Select/Select';
import FilterBadge from './common/FilterBadge';
import { getCenterBboxProvince } from './common/ProvinceFunction';
import { getCenterBboxDistrict } from './common/DistrictFunction';
import { getCenterBboxMunicipality } from './common/MunicipalityFunction';
import { extendBounds } from '../../common/extendBbox';

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
  }
}

class MainPartnership extends Component {
  constructor() {
    super();
    this.timeOutId = null;
    this.state = {
      // Event Handle Section
      investmentFocusSelection: [],
      projectSelection: [],
      partnerSelection: [],
      projectStatus: [],
      partnerType: [],
      selectedProvince: [],
      selectedDistrict: [],
      selectedMunicipality: [],
      isAllPartnerSelected: false,
      isAllProjectSelected: false,
      isAllInvestmentFocusSelected: false,
      showBarof: 'Provinces',
      showBarofInvestmentBudgetBenef: 'investmentFocus',
      alertMessage: '',
      activeFilter: false,
      activeOverview: false,
      viewDataBy: 'allocated_beneficiary',
      mapViewDataBy: '',
      activeView: 'visualization',
      // resetSunburst: false,
      // map Section
      map: null,
      mapViewBy: 'province',
      vectorTileUrl:
        'https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}',
      isLeverageBarClicked: false,
    };
  }

  componentDidMount() {
    // const windowPos = window.pageYOffset;
    // const siteHeader = document.getElementsByClassName(
    //   '.main-header',
    // );
    // const scrollLink = document.getElementsByClassName('.scroll-top');
    // if (windowPos >= 110) {
    //   siteHeader.addClass('fixed-header');
    //   scrollLink.addClass('open');
    // } else {
    //   siteHeader.removeClass('fixed-header');
    //   scrollLink.removeClass('open');
    // }

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
    this.props.getSankeyChartData();
    //
    this.props.getRadialData(viewDataBy);

    // this.props.getMapDataByDistrict(viewDataBy);
    // this.props.getMapDataByMunicipality(viewDataBy);
    this.props.getDistrictData();
    this.props.getMunicipalityData();
    this.props.getPartnerTypeList();
    this.props.getTimelineData();
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
      map,
      activeView,
      selectedMunicipality,
      mapViewDataBy,
    } = this.state;

    const {
      partnershipReducer: { allDistrictList, allMunicipalityList },
    } = this.props;

    if (
      prevState.investmentFocusSelection !== investmentFocusSelection
    ) {
      this.props.getProjectListData(investmentFocusSelection);
      this.props.filterPartnerListByPartnerType(partnerType);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isAllProjectSelected: false });
    }
    if (prevState.mapViewDataBy !== mapViewDataBy) {
      let view = 'investment';
      if (this.props.mapViewDataBy === 'allocated_beneficiary') {
        view = 'total_beneficiary';
      } else if (this.props.mapViewDataBy === 'allocated_budget') {
        view = 'total_beneficiary';
      }
      this.handleStateLevel(mapViewBy);
      // this.props.getMapDataByProvince(view);
      // if (this.props.mapViewDataBy !== 'investment_focus') {
      // this.props.filterMapDataOfCircleMarkerWithViewDataBy(
      //   view,
      //   this.props.mapViewBy,
      //   { selectedMunicipality, selectedDistrict, selectedProvince },
      // );
      // }
    }
    if (prevState.mapViewBy !== mapViewBy) {
      let view = 'investment';
      if (this.props.mapViewDataBy === 'allocated_beneficiary') {
        view = 'total_beneficiary';
      } else if (this.props.mapViewDataBy === 'allocated_budget') {
        view = 'total_beneficiary';
      }
      this.handleStateLevel(mapViewBy);
      // this.props.filterMapDataOfCircleMarkerWithViewDataBy(
      //   view,
      //   this.props.mapViewBy,
      //   { selectedMunicipality, selectedDistrict, selectedProvince },
      // );
    }
    if (prevState.viewDataBy !== viewDataBy) {
      // this.props.getMapDataByProvince(viewDataBy);
      // this.props.filterFinancialDataWithAllFilters(
      //   'province',mapbox-popup-content
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
        this.props.getRadialData(viewDataBy);
        // this.props.filterRadialData(
        //   // 'province',
        //   viewDataBy,
        //   investmentFocusSelection,
        //   projectSelection,
        //   partnerType,
        //   partnerSelection,
        //   projectStatus,
        // );
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
    if (prevState.mapViewBy !== mapViewBy) {
      const filteredList = [];
      removeMarker();
      //
      if (activeView === 'map') {
        if (mapViewBy === 'province') {
          if (selectedProvince && selectedProvince.length > 0) {
            // eslint-disable-next-line array-callback-return
            // selectedDistrict.map(selectedDist => {
            //   //
            //   // eslint-disable-next-line array-callback-return
            //   // allDistrictList.map(district => {
            //   //   //
            //   //   if (selectedDist.code === district.province_code) {
            //   //     //
            //   filteredList.push(selectedDist);
            //   //   }
            //   // });
            //   //
            // });
            //
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
            let view = 'investment';
            if (mapViewDataBy === 'allocated_beneficiary') {
              view = 'total_beneficiary';
            } else if (mapViewDataBy === 'allocated_budget') {
              view = 'total_beneficiary';
            }
            this.props.filterMapDataOfCircleMarkerWithViewDataBy(
              view,
              mapViewBy,
              {
                selectedMunicipality: [],
                selectedDistrict: [],
                selectedProvince,
              },
            );
          }
        }
        if (mapViewBy === 'district') {
          if (selectedDistrict && selectedDistrict.length > 0) {
            // eslint-disable-next-line array-callback-return
            // selectedDistrict.map(selectedDist => {
            //   //
            //   // eslint-disable-next-line array-callback-return
            //   // allDistrictList.map(district => {
            //   //   //
            //   //   if (selectedDist.code === district.province_code) {
            //   //     //
            //   filteredList.push(selectedDist);
            //   //   }
            //   // });
            //   //
            // });
            //
            map.setFilter('vector-tile-fill', [
              'in',
              ['get', 'code'],
              [
                'literal',
                selectedDistrict.map(fed => {
                  return fed.n_code.toString();
                }),
              ],
            ]);
            map.setFilter('vector-tile-outline', [
              'in',
              ['get', 'code'],
              [
                'literal',
                selectedDistrict.map(fed => {
                  return fed.n_code.toString();
                }),
              ],
            ]);
            let view = 'investment';
            if (mapViewDataBy === 'allocated_beneficiary') {
              view = 'total_beneficiary';
            } else if (mapViewDataBy === 'allocated_budget') {
              view = 'total_beneficiary';
            }
            this.props.filterMapDataOfCircleMarkerWithViewDataBy(
              view,
              mapViewBy,
              {
                selectedMunicipality: [],
                selectedDistrict: filteredList,
                selectedProvince: [],
              },
            );
          } else if (
            selectedProvince &&
            selectedProvince.length > 0
          ) {
            // alert('province Selection on district');
            // eslint-disable-next-line array-callback-return
            selectedProvince.map(province => {
              //
              // eslint-disable-next-line array-callback-return
              allDistrictList.map(district => {
                //
                if (province.code === district.province_code) {
                  //
                  filteredList.push(district);
                }
              });
              //
            });

            map.setFilter('vector-tile-fill', [
              'in',
              ['get', 'code'],
              [
                'literal',
                filteredList.map(fed => {
                  return fed.n_code.toString();
                }),
              ],
            ]);
            map.setFilter('vector-tile-outline', [
              'in',
              ['get', 'code'],
              [
                'literal',
                filteredList.map(fed => {
                  return fed.n_code.toString();
                }),
              ],
            ]);
            let view = 'investment';
            if (mapViewDataBy === 'allocated_beneficiary') {
              view = 'total_beneficiary';
            } else if (mapViewDataBy === 'allocated_budget') {
              view = 'total_beneficiary';
            }
            this.props.filterMapDataOfCircleMarkerWithViewDataBy(
              view,
              mapViewBy,
              {
                selectedMunicipality: [],
                selectedDistrict: filteredList,
                selectedProvince: [],
              },
            );
            //
          }
        } else if (mapViewBy === 'municipality') {
          if (selectedProvince && selectedProvince.length > 0) {
            // eslint-disable-next-line array-callback-return
            selectedProvince.map(province => {
              //
              // eslint-disable-next-line array-callback-return
              allMunicipalityList.map(district => {
                //
                if (province.code === district.province_code) {
                  //
                  filteredList.push(district);
                }
              });
            });
            //
            //
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
            let view = 'investment';
            if (mapViewDataBy === 'allocated_beneficiary') {
              view = 'total_beneficiary';
            } else if (mapViewDataBy === 'allocated_budget') {
              view = 'total_beneficiary';
            }
            this.props.filterMapDataOfCircleMarkerWithViewDataBy(
              view,
              mapViewBy,
              {
                selectedMunicipality: filteredList,
                selectedDistrict: [],
                selectedProvince: [],
              },
            );
          }
          if (selectedDistrict && selectedDistrict.length > 0) {
            //
            // let filtered = null;
            // const intersection = allDistrictList.filter(element =>
            //   selectedProvince.includes(element.province_id),
            // );
            // eslint-disable-next-line array-callback-return
            selectedDistrict.map(province => {
              //
              // eslint-disable-next-line array-callback-return
              allMunicipalityList.map(district => {
                //
                if (province.code === district.district_code) {
                  filteredList.push(district);
                }
              });
            });
            //
            //
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
            let view = 'investment';
            if (mapViewDataBy === 'allocated_beneficiary') {
              view = 'total_beneficiary';
            } else if (mapViewDataBy === 'allocated_budget') {
              view = 'total_beneficiary';
            }
            this.props.filterMapDataOfCircleMarkerWithViewDataBy(
              view,
              mapViewBy,
              {
                selectedMunicipality: filteredList,
                selectedDistrict: [],
                selectedProvince: [],
              },
            );

            //
          }
        }
      }
    }
  }

  handleLeverageBarClicked = clickedBool => {
    this.setState(prevState => ({
      isLeverageBarClicked: clickedBool,
    }));
  };

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
      zoom: 5.8,
      // starting zoom
    });
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    //
    this.setState({ map });
  };

  setFilterTab = () => {
    this.setState(prevState => ({
      activeFilter: !prevState.activeFilter,
    }));
    // document.querySelectorAll('.select-dropdown span').forEach(el => {
    //   el.classList.remove('span-active');
    // });
    // document.querySelectorAll('.select-dropdown ul').forEach(el => {
    //   el.classList.remove('active');
    // });
  };

  onFilterBlurHandler = () => {
    this.timeOutId = setTimeout(() => {
      this.setState({
        activeFilter: false,
      });
    });
  };

  onFilterFocusHandler = () => {
    clearTimeout(this.timeOutId);
  };

  setActiveOverview = () => {
    this.setState(prevState => ({
      activeOverview: !prevState.activeOverview,
    }));
    setTimeout(() => {
      this.state.map.resize();
    }, 100);
  };

  setViewDataBy = selectedView => {
    this.setState({
      viewDataBy: selectedView,
    });
  };

  setMapViewDataBy = selectedView => {
    this.setState(prevState => ({
      mapViewDataBy:
        selectedView === prevState.mapViewDataBy ? '' : selectedView,
    }));
  };

  setActiveView = selectedView => {
    this.setState({
      activeView: selectedView,
      selectedProvince: [],
      selectedDistrict: [],
      selectedMunicipality: [],
    });
  };

  setMapViewBy = selectedMapView => {
    //
    const { viewDataBy } = this.state;
    this.setState({
      mapViewBy: selectedMapView,
    });
    this.props.getFilteredMapData(selectedMapView);
    this.setState({
      vectorTileUrl: `https://vectortile.naxa.com.np/federal/${selectedMapView}.mvt/?tile={z}/{x}/{y}`,
    });
  };

  // handleStateLevel = () => {};

  handleStateLevel = clickedValue => {
    const { map } = this.state;
    const {
      partnershipReducer: { allMunicipalityList, allDistrictList },
    } = this.props;

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
        if (selectedMunicipality && selectedMunicipality.length > 0) {
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

          const query = selectedMunicipality
            .map(data => {
              return `code=${data.code}`;
            })
            .join('&');
          if (map) {
            map.fitBounds(extendedValue);
            map.setFilter('vector-tile-fill', [
              'in',
              ['get', 'code'],
              [
                'literal',
                selectedMunicipality.map(fed => {
                  return fed.code.toString();
                }),
              ],
            ]);
            map.setFilter('vector-tile-outline', [
              'in',
              ['get', 'code'],
              [
                'literal',
                selectedMunicipality.map(fed => {
                  return fed.code.toString();
                }),
              ],
            ]);
          }
          let view = 'investment';
          if (mapViewDataBy === 'allocated_beneficiary') {
            view = 'total_beneficiary';
          } else if (mapViewDataBy === 'allocated_budget') {
            view = 'total_beneficiary';
          }
          this.props.filterMapDataOfCircleMarkerWithViewDataBy(
            view,
            clickedValue,
            {
              selectedMunicipality,
              selectedDistrict: [],
              selectedProvince: [],
            },
          );
        } else if (selectedDistrict && selectedDistrict.length > 0) {
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

          const filteredMunFromDist = [];
          selectedDistrict.forEach(dist => {
            allMunicipalityList.forEach(mun => {
              if (dist.n_code === mun.district_code) {
                filteredMunFromDist.push(mun);
              }
            });
          });
          if (map) {
            map.fitBounds(extendedValue);

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
          }
          let view = 'investment';
          if (mapViewDataBy === 'allocated_beneficiary') {
            view = 'total_beneficiary';
          } else if (mapViewDataBy === 'allocated_budget') {
            view = 'total_beneficiary';
          }
          this.props.filterMapDataOfCircleMarkerWithViewDataBy(
            view,
            clickedValue,
            {
              selectedMunicipality: filteredMunFromDist,
              selectedDistrict: [],
              selectedProvince: [],
            },
          );
        } else if (selectedProvince && selectedProvince.length > 0) {
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

          const filteredList = [];
          selectedProvince.forEach(province => {
            allMunicipalityList.forEach(district => {
              //
              if (province.code === district.province_code) {
                //
                filteredList.push(district);
              }
            });
          });
          if (map) {
            map.fitBounds(extendedValue);

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
          let view = 'investment';
          if (mapViewDataBy === 'allocated_beneficiary') {
            view = 'total_beneficiary';
          } else if (mapViewDataBy === 'allocated_budget') {
            view = 'total_beneficiary';
          }
          this.props.filterMapDataOfCircleMarkerWithViewDataBy(
            view,
            clickedValue,
            {
              selectedMunicipality: filteredList,
              selectedDistrict: [],
              selectedProvince: [],
            },
          );
        }
      } else if (clickedValue === 'district') {
        if (selectedDistrict && selectedDistrict.length > 0) {
          const combinedBbox = [];
          const getBboxValue = getCenterBboxDistrict(
            selectedDistrict.map(data => {
              return data.n_code;
            }),
          );
          getBboxValue.map(data => {
            combinedBbox.push(data.bbox);
            return true;
          });
          const extendedValue = extendBounds(combinedBbox);

          const query = selectedDistrict
            .map(data => {
              return `code=${data.n_code}`;
            })
            .join('&');
          if (map) {
            map.fitBounds(extendedValue);

            map.setFilter('vector-tile-fill', [
              'in',
              ['get', 'code'],
              [
                'literal',
                selectedDistrict.map(fed => {
                  return fed.n_code.toString();
                }),
              ],
            ]);
            map.setFilter('vector-tile-outline', [
              'in',
              ['get', 'code'],
              [
                'literal',
                selectedDistrict.map(fed => {
                  return fed.n_code.toString();
                }),
              ],
            ]);
          }
          let view = 'investment';
          if (mapViewDataBy === 'allocated_beneficiary') {
            view = 'total_beneficiary';
          } else if (mapViewDataBy === 'allocated_budget') {
            view = 'total_beneficiary';
          }
          this.props.filterMapDataOfCircleMarkerWithViewDataBy(
            view,
            clickedValue,
            {
              selectedMunicipality: [],
              selectedDistrict,
              selectedProvince: [],
            },
          );
        } else if (selectedProvince && selectedProvince.length > 0) {
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

          const filteredList = [];
          selectedProvince.forEach(province => {
            allDistrictList.forEach(district => {
              if (province.code === district.province_code) {
                filteredList.push(district);
              }
            });
          });
          //
          if (map) {
            map.fitBounds(extendedValue);

            map.setFilter('vector-tile-fill', [
              'in',
              ['get', 'code'],
              [
                'literal',
                filteredList.map(fed => {
                  return fed.n_code.toString();
                }),
              ],
            ]);
            map.setFilter('vector-tile-outline', [
              'in',
              ['get', 'code'],
              [
                'literal',
                filteredList.map(fed => {
                  return fed.n_code.toString();
                }),
              ],
            ]);
          }
          let view = 'investment';
          if (mapViewDataBy === 'allocated_beneficiary') {
            view = 'total_beneficiary';
          } else if (mapViewDataBy === 'allocated_budget') {
            view = 'total_beneficiary';
          }
          this.props.filterMapDataOfCircleMarkerWithViewDataBy(
            view,
            clickedValue,
            {
              selectedMunicipality: [],
              selectedDistrict: filteredList,
              selectedProvince: [],
            },
          );
        }
      } else if (clickedValue === 'province') {
        if (selectedProvince && selectedProvince.length > 0) {
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
          //
          const extendedValue = extendBounds(combinedBbox);
          //

          const query = selectedProvince
            .map(data => {
              return `code=${data.code}`;
            })
            .join('&');
          if (map) {
            map.fitBounds(extendedValue);

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
          let view = 'investment';
          if (mapViewDataBy === 'allocated_beneficiary') {
            view = 'total_beneficiary';
          } else if (mapViewDataBy === 'allocated_budget') {
            view = 'total_beneficiary';
          }
          this.props.filterMapDataOfCircleMarkerWithViewDataBy(
            view,
            clickedValue,
            {
              selectedMunicipality: [],
              selectedDistrict: [],
              selectedProvince,
            },
          );
        }
      }
    }
  };

  handleProvinceClick = (code, name) => {
    //
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
      activeView,
      selectedMunicipality,
      selectedDistrict,
      selectedProvince,
      mapViewBy,
    } = this.state;
    if (activeView === 'visualization') {
      this.handleShowBarOf('Provinces');
      this.handleShowBarOfInvestmentBudgetBenefBar('investmentFocus');
      // document.querySelectorAll('.chart-reset').forEach(el => {
      //   el.click();
      // });
      this.props.filterOverviewData(
        investmentFocusSelection,
        projectSelection,
        partnerType,
        partnerSelection,
      );
      this.props.filterFinancialDataWithAllFiltersAndFederal(
        { selectedMunicipality, selectedDistrict, selectedProvince },
        investmentFocusSelection,
        viewDataBy,
        partnerType,
        partnerSelection,
        projectSelection,
        projectStatus,
      );
      // this.props.filterFinancialDataWithAllFilters(
      //   'province',
      //   investmentFocusSelection,
      //   viewDataBy,
      //   partnerType,
      //   partnerSelection,
      //   projectSelection,
      //   projectStatus,
      // );
      this.props.filterBarDataByInvestment(
        'province',
        viewDataBy,
        partnerType,
        partnerSelection,
        projectSelection,
        projectStatus,
        investmentFocusSelection,
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
        viewDataBy,
        investmentFocusSelection,
        projectSelection,
        partnerType,
        partnerSelection,
        projectStatus,
      );

      this.props.filterLeverageData(
        investmentFocusSelection,
        projectSelection,
      );
    } else {
      this.props.filterOverviewData(
        investmentFocusSelection,
        projectSelection,
        partnerType,
        partnerSelection,
      );
      this.props.filterMapChoropleth(
        investmentFocusSelection,
        projectSelection,
        projectStatus,
        partnerType,
        partnerSelection,
        { selectedMunicipality, selectedDistrict, selectedProvince },
        mapViewBy,
      );
    }
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
    if (activeView === 'visualization') {
      // this.props.filterFinancialDataWithAllFiltersAndFederal(
      //   { selectedMunicipality, selectedDistrict, selectedProvince },
      //   investmentFocusSelection,
      //   viewDataBy,
      //   partnerType,
      //   partnerSelection,
      //   projectSelection,
      //   projectStatus,
      // );
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
      this.props.filterBarDataByInvestment(
        'province',
        viewDataBy,
        partnerType,
        partnerSelection,
        projectSelection,
        projectStatus,
        investmentFocusSelection,
        { selectedMunicipality, selectedDistrict, selectedProvince },
      );
      this.props.filterSankeyChartData(
        viewDataBy,
        investmentFocusSelection,
        projectSelection,
        partnerType,
        partnerSelection,
        projectStatus,
        { selectedMunicipality, selectedDistrict, selectedProvince },
      );
      this.handleLeverageBarClicked(false);
    } else {
      this.props.filterOverviewData(
        investmentFocusSelection,
        projectSelection,
        partnerType,
        partnerSelection,
        { selectedMunicipality, selectedDistrict, selectedProvince },
      );
      // this.props.filterMapDataWithFederal();
      this.handleStateLevel(mapViewBy);
    }
  };

  resetLeftSideBarSelection = () => {
    this.setState({
      investmentFocusSelection: [],
      isAllInvestmentFocusSelected: false,
      partnerSelection: [],
      isAllPartnerSelected: false,
      projectSelection: [],
      isAllProjectSelected: false,
      partnerType: [],
    });
    document.querySelectorAll('.allCheckbox').forEach(el => {
      // eslint-disable-next-line no-param-reassign
      el.checked = false;
    });
  };

  resetFilters = () => {
    const { mapViewBy, activeView, map } = this.state;
    this.resetLeftSideBarSelection();
    this.setState({
      selectedProvince: [],
      selectedDistrict: [],
      selectedMunicipality: [],
      partnerType: [],
    });
    document.querySelectorAll('.fed_checkbox').forEach(el => {
      // eslint-disable-next-line no-param-reassign
      el.checked = false;
    });
    this.props.getProvinceData();

    if (activeView === 'visualization') {
      this.props.resetRadialData();
      this.props.resetSankeyChartData();
      this.props.resetOverviewData();
      this.props.resetLeverageData();
      this.props.resetBarDatas();
      this.props.resetBarDataByInvestmentFocus();
      this.handleLeverageBarClicked(false);
    } else {
      this.props.resetOverviewData();
      this.setMapViewBy(mapViewBy);
      this.setState({
        selectedProvince: [],
        selectedDistrict: [],
        selectedMunicipality: [],
      });
      let view = 'investment';
      if (this.state.mapViewDataBy === 'allocated_beneficiary') {
        view = 'total_beneficiary';
      } else if (this.state.mapViewDataBy === 'allocated_budget') {
        view = 'total_beneficiary';
      }
      this.props.filterMapDataOfCircleMarkerWithViewDataBy(
        view,
        mapViewBy,
        {
          selectedMunicipality: [],
          selectedDistrict: [],
          selectedProvince: [],
        },
      );
      const combinedBbox = [];
      //
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
      map.setZoom(5.8);
    }
  };

  componentWillUnmount() {
    const filterBar = document.getElementsByClassName(
      'filter-bar',
    )[0];
    document.removeEventListener('click', async event => {
      const isClickInside = filterBar.contains(event.target);

      if (!isClickInside) {
        this.setState({
          activeFilter: false,
          // searchDropdown: false,
        });
        // the click was outside the specifiedElement, do something
      }
    });
  }

  notificationHandler = () => {
    this.setState({
      alertMessage: 'The infographics will be downloaded shortly.',
    });

    setTimeout(() => {
      this.setState({ alertMessage: '' });
    }, 3000);
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
        isLeverageBarClicked,
        alertMessage,
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
        {/* <Headers /> */}
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
                  onBlur={this.onFilterBlurHandler}
                  onFocus={this.onFilterFocusHandler}
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
                        {activeView === 'visualization' ? (
                          <>
                            <div className="form-group province">
                              <Select
                                withCheckbox
                                inputClassname="province_check"
                                name="Select Province"
                                selectedItem={selectedProvince}
                                options={
                                  allProvinceList && allProvinceList
                                }
                                onChange={selectedOptions => {
                                  this.setState({
                                    // eslint-disable-next-line react/no-unused-state
                                    selectedProvince: selectedOptions,
                                  });
                                  // eslint-disable-next-line react/jsx-curly-newline
                                }}
                              />
                            </div>
                            <div className="form-group district">
                              <Select
                                withCheckbox
                                inputClassname="district_check"
                                name="Select District"
                                selectedItem={selectedDistrict}
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
                            <div className="form-group municipality">
                              <Select
                                withCheckbox
                                inputClassname="mun_check"
                                name="Select Municipality"
                                selectedItem={selectedMunicipality}
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
                          </>
                        ) : (
                          <>
                            <div className="form-group province">
                              <Select
                                withCheckbox
                                inputClassname="province_check"
                                name="Select Province"
                                selectedItem={selectedProvince}
                                options={
                                  allProvinceList && allProvinceList
                                }
                                onChange={selectedOptions => {
                                  this.setState({
                                    // eslint-disable-next-line react/no-unused-state
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
                                  inputClassname="district_check"
                                  name="Select District"
                                  selectedItem={selectedDistrict}
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
                              <div className="form-group municipality">
                                <Select
                                  withCheckbox
                                  inputClassname="mun_check"
                                  name="Select Municipality"
                                  selectedItem={selectedMunicipality}
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
                          </>
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
                          className="apply-btn common-button is-clear"
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
                          icon="euro_symbol"
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
                          icon="euro_symbol"
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
                  {activeView === 'visualization' ? (
                    <a
                      className="viewon-map common-button is-bg"
                      onClick={() => {
                        this.setActiveView('map');
                      }}
                      onKeyUp={() => {
                        this.setActiveView('map');
                      }}
                      role="tab"
                      tabIndex="0"
                    >
                      View on map
                    </a>
                  ) : (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <a
                      className="viewon-map common-button is-bg"
                      onClick={() => {
                        this.setActiveView('visualization');
                      }}
                      onKeyDown={() => {
                        this.setActiveView('visualization');
                      }}
                      // onKeyDown={() => {
                      //   setActiveView('visualization');
                      // }}
                      role="tab"
                      tabIndex="0"
                    >
                      Back to Visualisation
                    </a>
                  )}
                </div>
              </div>
              <div className="literacy-tab-content">
                <MiddleChartSection
                  resetLeftSideBarSelection={
                    this.resetLeftSideBarSelection
                  }
                  groupedStackData={[
                    {
                      investmentFocusSelection,
                      viewDataBy,
                      partnerType,
                      partnerSelection,
                      projectSelection,
                      projectStatus,
                    },
                  ]}
                  isLeverageBarClicked={isLeverageBarClicked}
                  handleLeverageBarClicked={
                    this.handleLeverageBarClicked
                  }
                  resetFilters={this.resetFilters}
                  viewDataBy={viewDataBy}
                  mapViewDataBy={mapViewDataBy}
                  sankeyChartwidth={sankeyChartwidth}
                  activeOverview={activeOverview}
                  activeView={activeView}
                  investmentFocusSelection={investmentFocusSelection}
                  partnerSelection={partnerSelection}
                  partnerTypeSelection={partnerType}
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
                  notificationHandler={this.notificationHandler}
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
                {/* <div className="popup-footer buttons is-end">
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
                </div> */}
              </div>
            </div>
          </div>
          <RightSideBar
            activeOverview={activeOverview}
            activeView={activeView}
            setActiveOverview={this.setActiveOverview}
            setActiveView={this.setActiveView}
            handelAlerts={this.notificationHandler}
          />
          {alertMessage && (
            <AlertComponent message={alertMessage} case="warning" />
          )}
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
  filterMapChoropleth,
  filterMapDataOfCircleMarkerWithViewDataBy,
  getPartnerTypeList,
  getTimelineData,
})(MainPartnership);
