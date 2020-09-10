import React, { Component } from 'react';
import { connect } from 'react-redux';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/src/css/mapbox-gl.css';
import MapboxPartnership from './MapComponents/MapboxPartnership';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import AlertComponent from '../../common/Notifier';
import Select from '../../common/Select/Select';
import FilterBadge from './common/FilterBadge';
import { getCenterBboxProvince } from './common/ProvinceFunction';
import { getCenterBboxDistrict } from './common/DistrictFunction';
import { getCenterBboxMunicipality } from './common/MunicipalityFunction';
import { extendBounds } from '../../common/extendBbox';
import {
  provinceLists,
  districtLists,
  municipalityLists,
  districtListByProvince,
} from '../../common/adminList';
import {
  getMfsAllData,
  filterByPartnerInstitution,
  filterMfsChoroplethData,
  filterByKeyInnovation,
  filterOverViewData,
  filterMfsChartData,
  filterMfsMapPieData,
  filterMfsMapChartDataByPartner,
  filterMfsChartDataByDistrict,
} from '../../../actions/mfs.action';
import {
  filterDistrictListFromProvince,
  filterMunListFromDistrict,
} from '../../../actions/common.actions';
import CardTab from './common/CardTab';
import StackedBarWithAllFederal from './Chart/StackedBarWithAllFederal/StackedBarWithAllFederal';
import Modal from '../../common/Modal';

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

class MainMFS extends Component {
  constructor() {
    super();
    this.state = {
      // Event Handle Section
      selectedPartner: [],
      selectedInnovation: [],
      isAllInnovationSelected: false,
      selectedAchievement: [],
      isAllAchievementSelected: false,
      provinceList: provinceLists(),
      districtList: districtLists(),
      municipalityList: municipalityLists(),
      selectedProvince: [],
      selectedDistrict: [],
      selectedMunicipality: [],
      showBarof: 'Provinces',
      clickedBarDistrict: [],
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
      showBarChartBy: 'Federal',
      barData: [],
      activeModal: false,
      selectedModal: '',
      showBarPartnerChartOf: 'Partner',
      alertMessage: '',
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
      selectedInnovation,
      showBarChartBy,
    } = this.state;

    if (prevState.selectedProvince !== selectedProvince) {
      districtListByProvince(selectedProvince);
    }
    // if (prevState.selectedDistrict !== selectedDistrict) {
    //   this.props.filterMunListFromDistrict(selectedDistrict);
    // }
    if (prevState.mapViewBy !== mapViewBy) {
      const filteredList = [];
      removeMarker();
      //
      if (mapViewBy === 'province') {
        if (selectedProvince && selectedProvince.length > 0) {
          const provinceSelection = selectedProvince.filter(data => {
            return data.value !== 'all';
          });
          map.setFilter('vector-tile-fill', [
            'in',
            ['get', 'code'],
            [
              'literal',
              provinceSelection.map(fed => {
                return fed.code.toString();
              }),
            ],
          ]);
          map.setFilter('vector-tile-outline', [
            'in',
            ['get', 'code'],
            [
              'literal',
              provinceSelection.map(fed => {
                return fed.code.toString();
              }),
            ],
          ]);
        }
      }
      if (mapViewBy === 'district') {
        if (selectedDistrict && selectedDistrict.length > 0) {
          const districtSelection = selectedDistrict.filter(data => {
            return data.value !== 'all';
          });
          map.setFilter('vector-tile-fill', [
            'in',
            ['get', 'code'],
            [
              'literal',
              districtSelection.map(fed => {
                return fed.value !== 'all' && fed.code.toString();
              }),
            ],
          ]);
          map.setFilter('vector-tile-outline', [
            'in',
            ['get', 'code'],
            [
              'literal',
              selectedDistrict.map(fed => {
                return fed.value !== 'all' && fed.code.toString();
              }),
            ],
          ]);
        } else if (selectedProvince && selectedProvince.length > 0) {
          // alert('province Selection on district');
          // eslint-disable-next-line array-callback-return
          selectedProvince.map(province => {
            //
            // eslint-disable-next-line array-callback-return
            districtList.map(district => {
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
                return fed.value !== 'all' && fed.code.toString();
              }),
            ],
          ]);
          map.setFilter('vector-tile-outline', [
            'in',
            ['get', 'code'],
            [
              'literal',
              filteredList.map(fed => {
                return fed.value !== 'all' && fed.code.toString();
              }),
            ],
          ]);

          //
        }
      }
      // } else if (mapViewBy === 'municipality') {
      //   if (selectedProvince && selectedProvince.length > 0) {
      //     // eslint-disable-next-line array-callback-return
      //     selectedProvince.map(province => {
      //       //
      //       // eslint-disable-next-line array-callback-return
      //       municipalityList.map(district => {
      //         //
      //         if (province.code === district.province_code) {
      //           //
      //           filteredList.push(district);
      //         }
      //       });
      //     });
      //     //
      //     //
      //     map.setFilter('vector-tile-fill', [
      //       'in',
      //       ['get', 'code'],
      //       [
      //         'literal',
      //         filteredList.map(fed => {
      //           return fed.code.toString();
      //         }),
      //       ],
      //     ]);
      //     map.setFilter('vector-tile-outline', [
      //       'in',
      //       ['get', 'code'],
      //       [
      //         'literal',
      //         filteredList.map(fed => {
      //           return fed.code.toString();
      //         }),
      //       ],
      //     ]);
      //   }
      //   if (selectedDistrict && selectedDistrict.length > 0) {
      //     //
      //     // let filtered = null;
      //     // const intersection = districtList.filter(element =>
      //     //   selectedProvince.includes(element.province_id),
      //     // );
      //     // eslint-disable-next-line array-callback-return
      //     selectedDistrict.map(province => {
      //       //
      //       // eslint-disable-next-line array-callback-return
      //       municipalityList.map(district => {
      //         //
      //         if (province.code === district.district_code) {
      //           filteredList.push(district);
      //         }
      //       });
      //     });
      //     //
      //     //
      //     map.setFilter('vector-tile-fill', [
      //       'in',
      //       ['get', 'code'],
      //       [
      //         'literal',
      //         filteredList.map(fed => {
      //           return fed.code.toString();
      //         }),
      //       ],
      //     ]);
      //     map.setFilter('vector-tile-outline', [
      //       'in',
      //       ['get', 'code'],
      //       [
      //         'literal',
      //         filteredList.map(fed => {
      //           return fed.code.toString();
      //         }),
      //       ],
      //     ]);
      //     //
      //   }
      // }
    }
    if (prevState.selectedPartner !== selectedPartner) {
      this.props.filterByPartnerInstitution(selectedPartner);
    }
    if (prevState.selectedInnovation !== selectedInnovation) {
      this.props.filterByKeyInnovation(selectedInnovation);
    }
    if (prevState.showBarChartBy !== showBarChartBy) {
      if (showBarChartBy === 'Federal') {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          barData: this.props.mfsReducer.mfsChartData,
        });
      } else if (showBarChartBy === 'Partner') {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          barData: this.props.mfsReducer.mfsChartDataByPartner,
        });
      }
    }
  }

  notificationHandler = () => {
    this.setState({
      alertMessage: 'The infographics will be downloaded shortly.',
    });

    setTimeout(() => {
      this.setState({ alertMessage: '' });
    }, 3000);
  };

  handleModal = () => {
    this.setState(prevState => ({
      activeModal: !prevState.activeModal,
    }));
  };

  handleSelectedModal = value => {
    this.setState({
      selectedModal: value,
    });
  };

  setClickedBarDistrict = selectedDistrict => {
    this.setState({
      clickedBarDistrict: selectedDistrict,
    });
  };

  getModalContent = contentType => {
    const {
      state: {
        mapViewBy,
        showBarof,
        selectedInnovation,
        selectedPartner,
        selectedAchievement,
        provinceList,
        districtList,
        showBarChartBy,
        activeModal,
        barData,
      },
      // props: {},
    } = this;
    switch (contentType) {
      case 'mfsBar':
        return (
          <div
            id="scroller_card"
            className="scroller_card"
            style={
              mapViewBy === 'district' && window.innerWidth > 1400
                ? {
                    width: '1800px',
                    overflowX: 'scroll',
                  }
                : mapViewBy === 'district' && window.innerWidth < 1400
                ? {
                    width: '1350px',
                    overflowX: 'scroll',
                  }
                : {}
            }
          >
            <StackedBarWithAllFederal
              barData={barData}
              showBarChartBy={showBarChartBy}
              mapViewBy={mapViewBy}
              selectedPartner={selectedPartner}
              selectedInnovation={selectedInnovation}
              selectedAchievement={selectedAchievement}
              provinceList={provinceList}
              districtList={districtList}
              showBarof={showBarof}
              handleShowBarOf={this.handleShowBarOf}
              activeModal={activeModal}
            />
          </div>
        );

      default:
        break;
    }
    return true;
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

  setShowBarChartBy = clicked => {
    this.setState(prevState => ({
      showBarChartBy: clicked,
    }));
  };

  addMap = () => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZ2VvbWF0dXBlbiIsImEiOiJja2E5bDFwb2swdHNyMnNvenZxa2Vpeml2In0.fCStqdwmFYFP-cUvb5vMCw';
    const map = new mapboxgl.Map({
      container: 'map',
      // style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
      center: [84.0, 27.5], // starting position [lng, lat]
      zoom: 5.8, // starting zoom
      preserveDrawingBuffer: true,
    });
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    //
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
    setTimeout(() => {
      this.state.map.resize();
    }, 100);
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
    //
    const {
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
      selectedDistrict,
      selectedProvince,
      showBarof,
      showBarPartnerChartOf,
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
    this.props.filterMfsChartData(
      selectedMapView,
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
      selectedDistrict,
      selectedProvince,
      showBarof,
      showBarPartnerChartOf,
    );
    this.props.filterMfsMapPieData(
      selectedMapView,
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
      selectedDistrict,
      selectedProvince,
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

    //
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
          //
          const getBboxValue = getCenterBboxDistrict(
            selectedDistrict.map(data => {
              return data.code;
            }),
          );
          //
          getBboxValue.map(data => {
            combinedBbox.push(data.bbox);
            return true;
          });
          const extendedValue = extendBounds(combinedBbox);
          //
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
                return fed.code && fed.code.toString();
              }),
            ],
          ]);
          map.setFilter('vector-tile-outline', [
            'in',
            ['get', 'code'],
            [
              'literal',
              filteredMunFromDist.map(fed => {
                return fed.code && fed.code.toString();
              }),
            ],
          ]);
        } else if (selectedProvince && selectedProvince.length > 0) {
          const combinedBbox = [];
          //
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
          //
          map.fitBounds(extendedValue);
          const filteredList = [];
          selectedProvince.forEach(province => {
            //
            // eslint-disable-next-line array-callback-return
            municipalityList.forEach(district => {
              //
              if (province.code === district.province_code) {
                //
                filteredList.push(district);
              }
            });
            //
          });
          //
          map.setFilter('vector-tile-fill', [
            'in',
            ['get', 'code'],
            [
              'literal',
              filteredList.map(fed => {
                return fed.code && fed.code.toString();
              }),
            ],
          ]);
          map.setFilter('vector-tile-outline', [
            'in',
            ['get', 'code'],
            [
              'literal',
              filteredList.map(fed => {
                return fed.code && fed.code.toString();
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
          //
          const getBboxValue = getCenterBboxDistrict(
            selectedDistrict.map(data => {
              return data.code;
            }),
          );
          //
          getBboxValue.map(data => {
            combinedBbox.push(data.bbox);
            return true;
          });
          const extendedValue = extendBounds(combinedBbox);
          //
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
                return fed.code && fed.code.toString();
              }),
            ],
          ]);
          map.setFilter('vector-tile-outline', [
            'in',
            ['get', 'code'],
            [
              'literal',
              selectedDistrict.map(fed => {
                return fed.code && fed.code.toString();
              }),
            ],
          ]);
        } else if (selectedProvince && selectedProvince.length > 0) {
          const combinedBbox = [];
          //
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
          //
          map.fitBounds(extendedValue);
          const filteredList = [];
          selectedProvince.forEach(province => {
            //
            // eslint-disable-next-line array-callback-return
            districtList.forEach(district => {
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
                return fed.code && fed.code.toString();
              }),
            ],
          ]);
          map.setFilter('vector-tile-outline', [
            'in',
            ['get', 'code'],
            [
              'literal',
              filteredList.map(fed => {
                return fed.code && fed.code.toString();
              }),
            ],
          ]);
        }
      } else if (clickedValue === 'province') {
        if (selectedProvince && selectedProvince.length > 0) {
          const combinedBbox = [];
          //
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
          const provinceSelection = selectedProvince.filter(data => {
            return data.value !== 'all';
          });
          map.setFilter('vector-tile-fill', [
            'in',
            ['get', 'code'],
            [
              'literal',
              provinceSelection.map(fed => {
                return fed.code && fed.code.toString();
              }),
            ],
          ]);
          map.setFilter('vector-tile-outline', [
            'in',
            ['get', 'code'],
            [
              'literal',
              provinceSelection.map(fed => {
                return fed.code && fed.code.toString();
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

  handleShowBarPartnerChartOf = value => {
    this.setState({ showBarPartnerChartOf: value });
  };

  handlePartnerSelection = name => {
    const { selectedPartner } = this.state;

    this.setState(preState => {
      if (!preState.selectedPartner.includes(name)) {
        return {
          selectedPartner: [...preState.selectedPartner, name],
        };
      }
      if (preState.selectedPartner.includes(name)) {
        const newArr = selectedPartner.filter(
          partner => partner !== name,
        );
        return { selectedPartner: newArr };
      }
      return null;
    });
  };

  // handlePartnerSelection = clickedValue => {
  //   const { selectedPartner } = this.state;
  //   if (selectedPartner === clickedValue) {
  //     this.setState({ selectedPartner: '' });
  //   } else {
  //     this.setState({ selectedPartner: clickedValue });
  //   }
  // };

  // handleInnovationSelection = clickedValue => {
  //   const { selectedInnovation } = this.state;
  //   if (selectedInnovation === clickedValue) {
  //     this.setState({ selectedInnovation: '' });
  //   } else {
  //     this.setState({ selectedInnovation: clickedValue });
  //   }
  // };
  handleInnovationAllSelection = e => {
    // e.stopPropagation();
    const {
      selectedInnovation,
      isAllInnovationSelected,
    } = this.state;
    if (isAllInnovationSelected) {
      const allInnovationElement = document.getElementsByClassName(
        'innovation_checkbox',
      );

      for (let i = 0; i < allInnovationElement.length; i += 1) {
        allInnovationElement[i].checked = false;
      }
      this.setState({
        selectedInnovation: [],
        isAllInnovationSelected: false,
      });
    } else {
      this.setState({
        isAllInnovationSelected: true,
      });
      if (e.target.checked === true) {
        const allInnovationElement = document.getElementsByClassName(
          'innovation_checkbox',
        );
        const innovationSelection = selectedInnovation;
        for (let i = 0; i < allInnovationElement.length; i += 1) {
          allInnovationElement[i].checked = true;
          innovationSelection.push(allInnovationElement[i].name);
        }
        this.setState({
          selectedInnovation: innovationSelection,
        });
        // this.setState({
        //   checkedProgressItems: joined,
        // });
      }
    }
  };

  handleInnovationSelection = e => {
    const {
      state: { selectedInnovation, isAllPartnerSelected },
    } = this;
    const {
      target: { name, checked },
    } = e;
    this.setState(preState => {
      if (checked) {
        return {
          selectedInnovation: [...preState.selectedInnovation, name],
        };
      }
      if (!checked) {
        const newArr = selectedInnovation.filter(
          innovselected => innovselected !== name,
        );
        return { selectedInnovation: newArr };
      }
      return null;
    });
  };

  // handleAchievementSelection = clickedValue => {
  //   const { selectedAchievement } = this.state;
  //   if (selectedAchievement === clickedValue) {
  //     this.setState({ selectedAchievement: '' });
  //   } else {
  //     this.setState({ selectedAchievement: clickedValue });
  //   }
  // };
  handleAchievementAllSelection = e => {
    // e.stopPropagation();
    const {
      selectedAchievement,
      isAllAchievementSelected,
    } = this.state;
    if (isAllAchievementSelected) {
      const allAchievementElement = document.getElementsByClassName(
        'achievement_checkbox',
      );

      for (let i = 0; i < allAchievementElement.length; i += 1) {
        allAchievementElement[i].checked = false;
      }
      this.setState({
        selectedAchievement: [],
        isAllAchievementSelected: false,
      });
    } else {
      this.setState({
        isAllAchievementSelected: true,
      });
      if (e.target.checked === true) {
        const allAchievementElement = document.getElementsByClassName(
          'achievement_checkbox',
        );
        const achievementSelection = selectedAchievement;
        for (let i = 0; i < allAchievementElement.length; i += 1) {
          allAchievementElement[i].checked = true;
          achievementSelection.push(allAchievementElement[i].name);
        }
        this.setState({
          selectedAchievement: achievementSelection,
        });
        // this.setState({
        //   checkedProgressItems: joined,
        // });
      }
    }
  };

  handleAchievementSelection = e => {
    const {
      state: { selectedAchievement, isAllPartnerSelected },
    } = this;
    const {
      target: { name, checked },
    } = e;
    this.setState(preState => {
      if (checked) {
        return {
          selectedAchievement: [
            ...preState.selectedAchievement,
            name,
          ],
        };
      }
      if (!checked) {
        const newArr = selectedAchievement.filter(
          achievementSelected => achievementSelected !== name,
        );
        return { selectedAchievement: newArr };
      }
      return null;
    });
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
      selectedDistrict,
      selectedProvince,
      clickedBarDistrict,
    } = this.state;

    // if (selectedPartner === '') {
    //   toast.warning('⚠ Please Select Partner!');
    // } else if (selectedInnovation === '') {
    //   toast.warning('⚠ Please Select Innovation Type!');
    // } else if (selectedAchievement === '') {
    //   toast.warning('⚠ Please Select Achievement!');
    // } else {
    this.props.filterMfsChoroplethData(
      mapViewBy,
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
    );
    if (clickedBarDistrict.length > 0) {
      this.props.filterMfsChartDataByDistrict(
        'district',
        clickedBarDistrict,
        selectedPartner,
        selectedInnovation,
        selectedAchievement,
      );
    } else {
      this.props.filterMfsChartData(
        mapViewBy,
        selectedPartner,
        selectedInnovation,
        selectedAchievement,
      );
    }
    this.props.filterMfsMapChartDataByPartner(
      mapViewBy,
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
    );
    this.props.filterOverViewData(
      mapViewBy,
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
    );
    this.props.filterMfsMapPieData(
      mapViewBy,
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
      // selectedDistrict,
      // selectedProvince,
    );
    // }
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
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
      selectedDistrict,
      selectedProvince,
      mapViewBy,
      showBarof,
      showBarPartnerChartOf,
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
    this.props.filterMfsChoroplethData(
      mapViewBy,
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
      selectedDistrict,
      selectedProvince,
    );
    this.props.filterMfsChartData(
      mapViewBy,
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
      selectedDistrict,
      selectedProvince,
      showBarof,
      showBarPartnerChartOf,
    );
    this.props.filterMfsMapChartDataByPartner(
      mapViewBy,
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
      selectedDistrict,
      selectedProvince,
    );
    this.props.filterOverViewData(
      mapViewBy,
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
      selectedDistrict,
      selectedProvince,
    );
    this.props.filterMfsMapPieData(
      mapViewBy,
      selectedPartner,
      selectedInnovation,
      selectedAchievement,
      selectedDistrict,
      selectedProvince,
    );
    this.handleStateLevel(mapViewBy);
    // }
  };

  resetLeftSideBarSelection = () => {
    this.setState({
      selectedPartner: [],
      selectedInnovation: [],
      selectedAchievement: [],
      isAllAchievementSelected: false,
      isAllInnovationSelected: false,
    });
    document.querySelectorAll('.allCheckbox').forEach(el => {
      // eslint-disable-next-line no-param-reassign
      el.checked = false;
    });
  };

  resetFilters = () => {
    //
    const { mapViewBy, activeView, map } = this.state;
    this.resetLeftSideBarSelection();
    this.setState({
      selectedProvince: [],
      selectedDistrict: [],
      selectedMunicipality: [],
      clickedBarDistrict: [],
    });
    document.querySelectorAll('.fed_checkbox').forEach(el => {
      // eslint-disable-next-line no-param-reassign
      el.checked = false;
    });

    this.handleShowBarOf('Provinces');
    this.handleShowBarPartnerChartOf('Partner');
    this.props.filterMfsChoroplethData(mapViewBy, [], [], []);
    this.props.filterMfsChartData(mapViewBy, [], [], [], [], []);
    this.props.filterMfsMapChartDataByPartner(
      'district',
      [],
      [],
      [],
      [],
      [],
    );
    this.props.filterOverViewData('province', [], [], []);
    this.props.filterMfsMapPieData(mapViewBy, [], [], [], [], []);
    // this.handleShowBarOf('Provinces');

    // this.props.resetOverviewData();
    document.querySelectorAll('.allCheckbox').forEach(el => {
      // eslint-disable-next-line no-param-reassign
      el.checked = false;
    });

    const combinedBbox = [];
    //
    const getBboxValue = getCenterBboxProvince([1, 2, 3, 4, 5, 6, 7]);
    getBboxValue.map(data => {
      combinedBbox.push(data.bbox);
      return true;
    });
    const extendedValue = extendBounds(combinedBbox);
    map.fitBounds(extendedValue);
    map.setFilter('vector-tile-fill', null);
    map.setFilter('vector-tile-outline', null);
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
        isAllAchievementSelected,
        provinceList,
        districtList,
        municipalityList,
        showBarChartBy,
        barData,
        selectedModal,
        activeModal,
        showBarPartnerChartOf,
        alertMessage,
        clickedBarDistrict,
      },
      // props: {},
    } = this;

    const sankeyChartwidth =
      document.getElementById('sankeyChart') &&
      document.getElementById('sankeyChart').offsetWidth;

    return (
      <>
        {/* <Headers /> */}
        <div
          className={`automation-wrapper literacy-wrapper mfs-wrapper ${
            activeOverview ? 'expand-right-sidebar' : ''
          }`}
        >
          {alertMessage && (
            <AlertComponent message={alertMessage} case="warning" />
          )}
          {activeModal && (
            <Modal
              // visible={selectedModal === 'bar' ? true : false}
              // modalHeader="Sakchyam Investment Focus"
              showBarChartBy={showBarChartBy}
              activeModal={activeModal}
              showBarof={showBarof}
              selectedModal={selectedModal}
              handleModal={this.handleModal}
              component={() => this.getModalContent(selectedModal)}
              notificationHandler={this.notificationHandler}
            />
          )}
          <LeftSideBar
            resetFilters={this.resetFilters}
            applyBtnClick={this.applyBtnClick}
            selectedPartner={selectedPartner}
            handlePartnerSelection={this.handlePartnerSelection}
            selectedInnovation={selectedInnovation}
            handleInnovationAllSelection={
              this.handleInnovationAllSelection
            }
            handleInnovationSelection={this.handleInnovationSelection}
            selectedAchievement={selectedAchievement}
            handleAchievementSelection={
              this.handleAchievementSelection
            }
            handleAchievementAllSelection={
              this.handleAchievementAllSelection
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
                            inputClassname="province_check"
                            name="Select Province"
                            selectedItem={selectedProvince}
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
                          <div className="form-group district">
                            <Select
                              withCheckbox
                              inputClassname="district_check"
                              name="Select District"
                              selectedItem={selectedDistrict}
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
                          <div className="form-group municipality">
                            <Select
                              withCheckbox
                              name="Select Municipality"
                              selectedItem={selectedMunicipality}
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
              </div>
              <div className="literacy-tab-content">
                <div className="literacy-tab-item">
                  <div className="graph-view">
                    {/* <div style={{ height: '800px', width: '500px' }}> */}
                    <CardTab
                      // resetFunction={() => {
                      //   this.props.resetBarDatas();
                      //   this.props.handleShowBarOf('Provinces');
                      // }}
                      // showBarof={showBarof}
                      // handleShowBarOf={handleShowBarOf}
                      cardTitle="Province/District Wise Achievement Type"
                      style={{ position: 'relative' }}
                      cardClass="col-xl-12"
                      cardChartId="groupedChart"
                      handleModal={this.handleModal}
                      handleSelectedModal={() => {
                        this.handleSelectedModal('groupedChart');
                      }}
                      notificationHandler={this.notificationHandler}
                      disableResetButton
                      disableExpand
                      renderChartComponent={() => {
                        return (
                          <MapboxPartnership
                            selectedProvince={selectedProvince}
                            selectedDistrict={selectedDistrict}
                            selectedMunicipality={
                              selectedMunicipality
                            }
                            handleProvinceClick={
                              this.handleProvinceClick
                            }
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
                        );
                      }}
                    />
                    {/* </div> */}
                    <CardTab
                      resetFunction={() => {
                        this.resetFilters();
                      }}
                      // showBarof={showBarof}
                      // handleShowBarOf={handleShowBarOf}
                      cardTitle="Province/District Wise Achievement Type"
                      showBarChartBy={showBarChartBy}
                      setShowBarChartBy={this.setShowBarChartBy}
                      cardClass="col-xl-12"
                      cardChartId="stacked_chart"
                      handleModal={this.handleModal}
                      handleSelectedModal={() => {
                        this.handleSelectedModal('stacked_chart');
                      }}
                      notificationHandler={this.notificationHandler}
                      badgeProp={['Partner', 'Federal']}
                      renderChartComponent={() => {
                        return (
                          // <label>Test</label>
                          <div
                            className="scroller_card"
                            style={
                              mapViewBy === 'district' &&
                              window.innerWidth > 1400
                                ? {
                                    width: '1200px',
                                    overflowX: 'scroll',
                                  }
                                : mapViewBy === 'district' &&
                                  window.innerWidth < 1400
                                ? {
                                    width: '800px',
                                    overflowX: 'scroll',
                                  }
                                : {}
                            }
                          >
                            <StackedBarWithAllFederal
                              setClickedBarDistrict={
                                this.setClickedBarDistrict
                              }
                              handleStateLevel={this.setMapViewBy}
                              barData={barData}
                              showBarChartBy={showBarChartBy}
                              mapViewBy={mapViewBy}
                              selectedPartner={selectedPartner}
                              selectedInnovation={selectedInnovation}
                              selectedAchievement={
                                selectedAchievement
                              }
                              provinceList={provinceList}
                              districtList={districtList}
                              showBarof={showBarof}
                              handleShowBarOf={this.handleShowBarOf}
                              showBarPartnerChartOf={
                                showBarPartnerChartOf
                              }
                              handleShowBarPartnerChartOf={
                                this.handleShowBarPartnerChartOf
                              }
                            />
                          </div>
                          // <StackedBarWithProvince
                          //   viewDataBy={viewDataBy}
                          //   activeModal={activeModal}
                          //   investmentFocusSelection={
                          //     investmentFocusSelection
                          //   }
                          //   partnerSelection={partnerSelection}
                          //   partnerTypeSelection={partnerTypeSelection}
                          //   projectSelection={projectSelection}
                          //   projectStatus={projectStatus}
                          //   showBarof={showBarof}
                          //   handleShowBarOf={handleShowBarOf}
                          // />
                        );
                      }}
                    />
                    {/* <div id="map" className="map"> */}
                    {/* {activeView === 'map' && ( */}

                    {/* )} */}
                    {/* </div> */}
                  </div>
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
            selectedInnovation={selectedInnovation}
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
  filterByKeyInnovation,
  filterOverViewData,
  filterMfsChartData,
  filterMfsMapChartDataByPartner,
  filterMfsMapPieData,
  filterMfsChartDataByDistrict,
})(MainMFS);
