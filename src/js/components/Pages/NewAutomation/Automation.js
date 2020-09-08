/* eslint-disable no-lonely-if */
/* eslint-disable radix */
/* eslint-disable no-unused-expressions */
/* eslint-disable default-case */
/* eslint-disable no-else-return */
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
import { getCenterBboxMunicipality } from '../../common/BBoxFunctionsMapBox/MunicipalityFunction';
import { getCenterBboxDistrict } from '../../common/BBoxFunctionsMapBox/DistrictFunction';
import { getCenterBboxProvince } from '../../common/BBoxFunctionsMapBox/ProvinceFunction';
import Select from '../../common/Select/Select';
import {
  getBranchesTableDataByFed,
  getAllAutomationDataByPartner,
  getAutomationDataByMunicipality,
  filterPartnerSelect,
  getFilteredPartnersByFederal,
  getBranchesTableData,
  getTableDataByPartnerSelect,
  getFilteredPartnersByFederalWithClickedPartners,
  partnerSelectWithOutreach,
  getTimelineData,
  getAllDataForTimeline,
  setLegendValues,
} from '../../../actions/automation.actions';
import {
  provinceLists,
  districtLists,
  municipalityLists,
  districtListByProvince,
  muniByDistrict,
} from '../../common/adminList';
import LeftSideBar from './LeftSideBar/LeftSideBar';
import RightSideBar from './RightSideBar/RightSideBar';
import TableViewComponent from './TableViewComponent/TableViewComponent';
import { extendBounds } from './MapRelatedComponents/extendBbox';
import Notifier from '../../common/Notifier';
import Modal from './Modal';

let total = '';

class MainAutomation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceList: provinceLists(),
      districtList: districtLists(),
      municipalityList: municipalityLists(),
      selectedProvince: [],
      selectedDistrict: [],
      selectedMunicipality: [],
      map: '',
      modalType: '',
      mapViewBy: 'municipality',
      activeView: 'map',
      activeFilter: false,
      vectorTileUrl:
        'https://vectortile.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}',
      searchText: '',
      loading: false,
      activeClickPartners: [],
      allPartners: '',
      finalPartnerList: '',
      partnerApiCall: 0,
      activeOutreachButton: true,
      mapType: 'choropleth',
      branchesCooperative: 1,
      showBeneficiary: true,
      migrationArray: [],
      rightSideBarLoader: false,
      isTileLoaded: false,
      partnersData: null,
      activeFilterButton: false,
      activeRightSideBar: true,
      activeTableView: false,
      vectorGridKey: '0',
      vectorGridFirstLoad: false,
      color: '',
      filteredProvinceChoropleth: '',
      showBranches: false,
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
            fontSize: '1px',
            fontColor: '#fff',
          },
          followCursor: true,
          fixed: {
            enabled: true,
            position: 'bottomRight',
            offsetX: 50,
            offsetY: 0,
          },
          marker: {
            show: false,
          },
          items: {
            display: 'flex',
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
      message: '',
      activeModal: false,
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
    this.props.setLegendValues();
    this.props.getAllDataForTimeline();
    this.props.filterPartnerSelect([]);
    this.props.getAutomationDataByMunicipality();
    this.props.getBranchesTableData();
    this.props.getTimelineData();

    setTimeout(() => {
      this.props.partnerSelectWithOutreach([], 'municipality');
    }, 200);
  }

  componentDidUpdate(prevProps, prevState) {
    const { automationReducer } = this.props;
    const {
      selectedDistrict,
      selectedProvince,
      districtList,
      municipalityList,
      activeClickPartners,
      mapViewBy,
      finalPartnerList,
      partnerApiCall,
    } = this.state;

    const tableData = this.props.automationReducer
      .automationTableData;

    if (prevState.mapViewBy !== mapViewBy) {
      this.handleStateLevel();
    }

    if (
      prevProps.automationReducer.automationRightSidePartnerData !==
      automationReducer.automationRightSidePartnerData
    ) {
      // console.log(
      //   'automationReducer.automationRightSidePartnerData',
      //   automationReducer.automationRightSidePartnerData[0]
      //     .partner_data,
      // );
      this.setState({
        allPartners:
          automationReducer.automationRightSidePartnerData[0]
            .partner_data,
      });
      const { tabletsDeployed } = this.state;
      const {
        automationRightSidePartnerData,
      } = this.props.automationReducer;
      const numberTabletsDeployed =
        automationReducer.automationRightSidePartnerData[0]
          .total_tablet;
      if (numberTabletsDeployed > 0) {
        this.setState({
          tabletsDeployed: {
            ...tabletsDeployed,
            series:
              automationRightSidePartnerData[0].tabletsGraphData,
            labels:
              automationRightSidePartnerData[0].tabletsGraphLabel,
            fill: {
              ...tabletsDeployed.fill,
              colors:
                automationRightSidePartnerData[0].tabletsGraphColor,
            },
            total_beneficiary:
              automationRightSidePartnerData[0].total_beneficiary,
          },
          rightSideBarLoader: false,
        });
      } else {
        this.setState({
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
                        return w.globals.seriesTotals.reduce(
                          (a, b) => {
                            return a + b;
                          },
                          0,
                        );
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
          rightSideBarLoader: false,
        });
      }
    }

    if (
      prevProps.automationReducer.automationAllDataByPartner !==
      automationReducer.automationAllDataByPartner
    ) {
      const allPartners =
        automationReducer &&
        automationReducer.automationAllDataByPartner &&
        automationReducer.automationAllDataByPartner[0] &&
        automationReducer.automationAllDataByPartner[0].partner_data;
      this.setState({ allPartners });
      if (partnerApiCall === 0) {
        this.setState({
          partnerApiCall: 1,
          finalPartnerList: allPartners,
        });
      }
    }

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
        selectedDistrict: [],
        selectedMunicipality: [],
        districtList: districts,
      });
    }
    if (prevState.selectedDistrict !== selectedDistrict) {
      let municipality;

      if (
        (selectedDistrict &&
          selectedDistrict.length === 78 &&
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
        selectedMunicipality: [],
        municipalityList: municipality,
      });
    }

    if (
      tableData !== prevProps.automationReducer.automationTableData
    ) {
      const array = [];

      tableData.map(branch => {
        const trimelong = getCenterBboxMunicipality(
          branch.municipality_code,
        ).center;

        branch.des_long = trimelong ? trimelong[0] : null;
        branch.des_lat = trimelong ? trimelong[1] : null;

        return true;
      });

      activeClickPartners.map((clickedPartners, i) => {
        const partnerColor = this.makeRandomColor();
        tableData.map(data => {
          if (data.partner_id === clickedPartners) {
            array.push({
              origin: [data.longitude, data.latitude],
              destination: [data.des_long, data.des_lat],
              originName: data.partner,
              destinationName: data.branch,
              size: 2,
              color: partnerColor,
            });
          }

          return true;
        });
        return true;
      });
      this.setState({ migrationArray: array });
    }

    if (prevState.activeClickPartners !== activeClickPartners) {
      if (activeClickPartners.length === 0) {
        this.props.filterPartnerSelect(activeClickPartners);
        this.setState({ migrationArray: '' });
      }
    }
  }

  makeRandomColor = () => {
    let c = '';
    while (c.length < 7) {
      c += Math.random()
        .toString(16)
        .substr(-6)
        .substr(-1);
    }
    return `#${c}`;
  };

  addMap = () => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZ2VvbWF0dXBlbiIsImEiOiJja2E5bDFwb2swdHNyMnNvenZxa2Vpeml2In0.fCStqdwmFYFP-cUvb5vMCw';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [84, 28.5],
      zoom: 5.8,
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

  setFilterTab = () => {
    this.setState(prevState => ({
      activeFilter: !prevState.activeFilter,
    }));
  };

  toggleOutreachButton = () => {
    // if (this.state.activeOutreachButton) {
    //   this.refreshSelectedPartnerBtn();
    // }

    this.setState(prevState => ({
      activeOutreachButton: !prevState.activeOutreachButton,
    }));
  };

  handleSearchTextChange = e => {
    this.setState({ searchText: e.target.value });
  };

  toggleTableViewButton = () => {
    const { activeTableView } = this.state;

    this.setState(prevState => ({
      activeTableView: !prevState.activeTableView,
    }));

    setTimeout(() => {
      this.state.map.resize();
    }, 10);
  };

  handleActiveClickPartners = id => {
    let { activeClickPartners } = this.state;
    const { mapViewBy, activeTableView } = this.state;

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

    this.props.partnerSelectWithOutreach(
      activeClickPartners,
      mapViewBy,
    );
    setTimeout(() => {
      this.handleStateLevel();
    }, 100);
  };

  handleStateLevel = () => {
    const {
      map,
      mapViewBy,
      selectedMunicipality,
      selectedDistrict,
      selectedProvince,
      municipalityList,
      districtList,
      activeClickPartners,
    } = this.state;

    let provinceCodes = [];
    let muniCodes = [];
    let districtCodes = [];

    const provinceCheck =
      selectedProvince && selectedProvince.length > 0;
    const districtCheck =
      selectedDistrict && selectedDistrict.length > 0;
    const muniCheck =
      selectedMunicipality && selectedMunicipality.length > 0;

    // if (selectedMunicipality && selectedMunicipality.length > 150) {
    //   if (selectedMunicipality.length !== 776) {
    //     this.setState({
    //       message:
    //         'Either select all or select less than 150 Municiplaities!',
    //     });
    //     setTimeout(() => {
    //       this.clearNotification();
    //     }, 3000);
    //     return;
    //   }
    // }

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
          this.changeMapTiles(filteredMunFromDist);
        } else if (provinceCheck) {
          const filteredList = this.provinceListByMunnicipalityTiles(
            selectedProvince,
            municipalityList,
          );
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
          this.changeMapTiles(selectedDistrict);
        } else if (provinceCheck) {
          const filteredList = this.provinceListByMunnicipalityTiles(
            selectedProvince,
            districtList,
          );
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
          this.changeMapTiles(selectedProvince);
        }
      }

      if (activeClickPartners.length > 0) {
        if (
          selectedMunicipality.length === 776 ||
          selectedDistrict.length === 78
        ) {
          this.props.filterPartnerSelect(activeClickPartners);
        } else {
          this.props.getFilteredPartnersByFederalWithClickedPartners(
            {
              municipality: this.getCodes(selectedMunicipality),
              district: this.getCodes(selectedDistrict),
              province: this.getCodes(selectedProvince),
            },
            activeClickPartners,
          );
        }
      } else {
        if (
          selectedMunicipality.length === 776 ||
          selectedDistrict.length === 78
        ) {
          this.props.getAllAutomationDataByPartner([]);
        } else {
          this.props.getFilteredPartnersByFederal({
            municipality: this.getCodes(selectedMunicipality),
            district: this.getCodes(selectedDistrict),
            province: this.getCodes(selectedProvince),
          });
        }
      }
    } else {
      this.props.filterPartnerSelect(activeClickPartners);

      map.setZoom(5.8);
      map.setCenter([84, 28.5]);
      if (mapViewBy === 'municipality') {
        this.changeMapTiles(municipalityLists());
      } else if (mapViewBy === 'district') {
        this.changeMapTiles(districtLists());
      } else if (mapViewBy === 'province') {
        this.changeMapTiles(provinceLists());
      }
    }

    if (provinceCheck) {
      provinceCodes = this.getCodes(selectedProvince);
    }
    if (districtCheck) {
      districtCodes = this.getCodes(selectedDistrict);
    }
    if (muniCheck) {
      muniCodes = this.getCodes(selectedMunicipality);
    }
    if (provinceCheck || districtCheck || muniCheck) {
      if (
        selectedMunicipality.length === 776 ||
        selectedDistrict.length === 78
      ) {
        this.props.getTableDataByPartnerSelect(activeClickPartners);
      } else {
        this.props.getBranchesTableDataByFed(
          {
            municipality: muniCodes,
            district: districtCodes,
            province: provinceCodes,
          },
          activeClickPartners,
        );
      }
    } else {
      this.props.getTableDataByPartnerSelect(activeClickPartners);
    }
  };

  getCodes = array => {
    if (array.length > 0) {
      const filteredArray = array.filter(
        data => data.value !== 'all',
      );
      const codeList = filteredArray.map(item => item.code);
      return codeList;
    } else {
      return [];
    }
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

  loadingHandler = value => {
    if (value === 1) {
      this.setState({ loading: true });
    } else {
      this.setState({ loading: false });
    }
  };

  handleAdminSelects = (option, type) => {
    switch (type) {
      case 'province':
        this.setState({ selectedProvince: option });
        break;
      case 'district':
        this.setState({ selectedDistrict: option });
        break;
      case 'municipality':
        this.setState({ selectedMunicipality: option });
        break;
    }
  };

  handleMapClick = value => {
    const { mapViewBy } = this.state;
    if (mapViewBy === 'province') {
      const allProvinces = provinceLists();
      allProvinces.unshift();
      const selectedProvince = allProvinces.filter(
        pro => parseInt(pro.code) === parseInt(value),
      );
      this.setState({ selectedProvince });
      setTimeout(() => {
        this.handleStateLevel();
      }, 10);
      setTimeout(() => {
        this.setMapViewBy('district');
      }, 100);
    }

    if (mapViewBy === 'district') {
      const allDistricts = districtLists();
      allDistricts.unshift();
      const selectedDistrict = allDistricts.filter(
        pro => parseInt(pro.code) === parseInt(value),
      );
      this.setState({ selectedDistrict });
      setTimeout(() => {
        this.handleStateLevel();
      }, 10);
      setTimeout(() => {
        this.setMapViewBy('municipality');
      }, 100);
    }
  };

  // change set time out value once migration lines issues is resolved
  resetPartnersOnly = () => {
    const { mapViewBy } = this.state;
    this.setState({
      activeClickPartners: [],
      searchText: '',
      activeOutreachButton: true,
    });

    setTimeout(() => {
      this.props.partnerSelectWithOutreach([], mapViewBy);
    }, 500);
    setTimeout(() => {
      this.handleStateLevel();
    }, 1000);
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

  resetAdminFiltersOnly = () => {
    const { activeClickPartners } = this.state;
    this.setState({
      provinceList: provinceLists(),
      districtList: districtLists(),
      municipalityList: municipalityLists(),
      selectedProvince: provinceLists(),
      selectedDistrict: [],
      selectedMunicipality: municipalityLists(),
    });

    setTimeout(() => {
      this.setMapViewBy('municipality');
    }, 10);

    setTimeout(() => {
      this.handleStateLevel();
    }, 500);
  };

  modalHandler = type => {
    console.log('pressed');
    this.setState(prevState => ({
      activeModal: !prevState.activeModal,
      modalType: type,
    }));
  };

  clearNotification = () => {
    setTimeout(() => {
      this.setState({ message: '' });
    }, 3000);
  };

  notifyHandler = message => {
    console.log('message is', message);
    this.setState({
      message,
    });

    this.clearNotification();
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
      message,
      finalPartnerList,
      branchesCountOptions,
      areaChartOptions,
      activeRightSideBar,
      activeTableView,
      vectorTileUrl,
      activeOutreachButton,
      searchText,
      partnersData,
      rightSideBarLoader,
      showBeneficiary,
      branchesCooperative,
      loading,
      selectedProvince,
      selectedDistrict,
      selectedMunicipality,
      migrationArray,
      activeModal,
      allPartners,
      modalType,
    } = this.state;
    const { tableDataLoading } = this.props.automationReducer;

    return (
      <div className="page-wrap page-100">
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
            refreshSelectedPartnerBtn={this.resetPartnersOnly}
            toogleBranches={this.toggleOutreachButton}
            loading={loading}
          />

          <main className="main">
            <div className="main-card map-card">
              <MapComp
                map={map}
                addMap={this.addMap}
                mapViewBy={mapViewBy}
                vectorTileUrl={vectorTileUrl}
                allPartners={finalPartnerList}
                activeClickPartners={activeClickPartners}
                activeOutreachButton={activeOutreachButton}
                loadingHandler={this.loadingHandler}
                loading={loading}
                handleMapClick={this.handleMapClick}
                migrationArray={migrationArray}
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
                  {!loading && (
                    <button
                      type="button"
                      onClick={this.setFilterTab}
                      className="common-buttonm is-borderm filter-button is-icon"
                    >
                      <i className="material-icons">filter_list</i>
                      <span>Filters</span>
                    </button>
                  )}

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
                          <div className="form-group">
                            <Select
                              withCheckbox
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
                          <div className="form-group">
                            <Select
                              withCheckbox
                              name="Select Municipality"
                              selectedItem={selectedMunicipality}
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
                          onClick={this.resetAdminFiltersOnly}
                          className="common-button is-clear"
                        >
                          <i className="material-icons">refresh</i>
                        </button>
                        <button
                          onClick={this.handleStateLevel}
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
              activeTableView={activeTableView}
              activeClickPartners={activeClickPartners}
              provinceList={provinceList}
              districtList={districtList}
              municipalityList={municipalityList}
              toggleTableViewButton={this.toggleTableViewButton}
              handleAdminSelects={this.handleAdminSelects}
              handleStateLevel={this.handleStateLevel}
              refreshSelectedPartnerBtn={this.resetAdminFiltersOnly}
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
            loading={loading}
            modalHandler={this.modalHandler}
            notifyHandler={this.notifyHandler}
          />
          {message && <Notifier case="warning" message={message} />}
          {activeModal && (
            <Modal
              handleModal={this.modalHandler}
              activeModal={activeModal}
              tabletsDeployed={tabletsDeployed}
              allPartners={allPartners}
              modalType={modalType}
              notifyHandler={this.notifyHandler}
            />
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ automationReducer }) => ({
  automationReducer,
});
export default connect(mapStateToProps, {
  getBranchesTableDataByFed,
  getAllAutomationDataByPartner,
  getAutomationDataByMunicipality,
  filterPartnerSelect,
  getFilteredPartnersByFederal,
  getBranchesTableData,
  getTableDataByPartnerSelect,
  getFilteredPartnersByFederalWithClickedPartners,
  partnerSelectWithOutreach,
  getTimelineData,
  getAllDataForTimeline,
  setLegendValues,
})(MainAutomation);
