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
} from '../../../actions/automation.actions';
import Header from '../../Header';
import LeftSideBar from './LeftSideBar/LeftSideBar';
import RightSideBar from './RightSideBar/RightSideBar';
import TableViewComponent from './TableViewComponent/TableViewComponent';
import AllActiveIcon from '../../../../img/fullactive.png';
import InactiveIcon from '../../../../img/inactive.png';
// import DropdownCheckbox from '../../common/DropdownCheckbox';

const myIcon = L.divIcon({ className: 'marker1' });
export const allActive = new L.Icon({
  iconUrl: AllActiveIcon,
  // iconRetinaUrl: AllActiveIcon,
  iconSize: [35, 40],
});
export const Inactive = new L.Icon({
  iconUrl: InactiveIcon,
  // iconRetinaUrl: InactiveIcon,
  iconSize: [23, 22],
});
class MainAutomation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeClickPartners: [],
      selectedProvince: [],
      selectedProvinceName: [],
      selectedDistrict: [],
      selectedDistrictName: [],
      selectedMunicipality: [],
      selectedMunicipalityName: [],
      partnersData: null,
      activeOutreachButton: false,
      activeFilterButton: false,
      activeRightSideBar: true,
      activeTableView: false,
      searchText: '',
      dataTypeLevel: 'municipality',
      vectorGridInputUrl:
        'https://dvsnaxa.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}',
      vectorGridInputUrl1: '',
      vectorGridKey1: '1',
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
        // chartOptions: {
        // labels: [],
        // },
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
                  formatter(w) {
                    if (w.globals && w.globals.seriesTotals) {
                      return w.globals.seriesTotals.reduce((a, b) => {
                        return a + b;
                      }, 0);
                    }
                    return null;
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
        // responsive: [
        //   {
        //     breakpoint: 480,
        //     options: {
        //       chart: {
        //         width: 200,
        //       },
        //       legend: {
        //         show: false,
        //       },
        //     },
        //   },
        // ],
        legend: {
          show: false,
          position: 'right',
          offsetY: 0,
          height: 230,
        },
        fill: {
          opacity: 1,
          // colors: ['#E11D3F', '#489FA7'],
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
    this.props.getBranchesTableData();

    const provinceEl = document.getElementById(
      'filter_dropdown_province',
    );
    const districtEl = document.getElementById(
      'filter_dropdown_district',
    );
    const municipalityEl = document.getElementById(
      'filter_dropdown_municipality',
    );
    // console.log(specifiedElement, 'ss');
    document.addEventListener('click', async event => {
      const isClickInside = provinceEl.contains(event.target);
      if (!isClickInside) {
        this.setState({
          activeProvince: false,
          // searchDropdown: false,
        });
        // the click was outside the specifiedElement, do something
      }
    });
    document.addEventListener('click', async event => {
      const isClickInside = districtEl.contains(event.target);
      if (!isClickInside) {
        this.setState({
          activeDistrict: false,
          // searchDropdown: false,
        });
        // the click was outside the specifiedElement, do something
      }
    });
    document.addEventListener('click', async event => {
      const isClickInside = municipalityEl.contains(event.target);
      if (!isClickInside) {
        this.setState({
          activeMunicipality: false,
          // searchDropdown: false,
        });
        // the click was outside the specifiedElement, do something
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      activeClickPartners,
      activeTableView,
      dataTypeLevel,
    } = this.state;
    if (prevState.dataTypeLevel !== dataTypeLevel) {
      if (dataTypeLevel === 'province') {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          vectorGridInputUrl:
            'https://dvsnaxa.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}',
          vectorGridKey: '0',
          color: '#55b110',
        });
        this.props.filterAutomationDataForVectorTiles(dataTypeLevel);
      } else if (dataTypeLevel === 'district') {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          vectorGridInputUrl:
            'https://dvsnaxa.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}',
          vectorGridKey: '1',
          color: '#FF0000',
        });
        this.props.filterAutomationDataForVectorTiles(dataTypeLevel);
      } else if (dataTypeLevel === 'municipality') {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          vectorGridInputUrl:
            'https://dvsnaxa.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}',
          // 'https://geoserver.naxa.com.np/geoserver/gwc/service/tms/1.0.0/Bipad:Municipality@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf',
          vectorGridKey: '2',
          color: '#FF000',
        });
        this.props.filterAutomationDataForVectorTiles(dataTypeLevel);
      }
    }
    // if (activeOutreachButton && activeClickPartners.length <= 0) {
    //   this.props.getAllAutomationDataByPartner();
    //   // alert('tung');
    //   // this.props.partnerSelectWithOutreach(activeClickPartners);
    // }
    if (
      prevProps.automationReducer.automationRightSidePartnerData !==
      this.props.automationReducer.automationRightSidePartnerData
    ) {
      const { tabletsDeployed } = this.state;
      const {
        automationRightSidePartnerData,
      } = this.props.automationReducer;
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        tabletsDeployed: {
          ...tabletsDeployed,
          series: automationRightSidePartnerData[0].tabletsGraphData,
          labels: automationRightSidePartnerData[0].tabletsGraphLabel,
          // plotOptions: {
          //   pie: {
          //     donut: {
          //       labels: {
          //         ...tabletsDeployed.plotOptions.pie.donut.labels,
          //         value: {
          //           ...tabletsDeployed.plotOptions.pie.donut.labels
          //             .value,
          //           formatter(val) {
          //             return automationRightSidePartnerData[0]
          //               .total_branch;
          //           },
          //         },
          //       },
          //     },
          //   },
          // },
        },
      });
    }
    if (prevState.selectedProvince !== this.state.selectedProvince) {
      this.props.getDistrictDataFromProvince(
        this.state.selectedProvince,
      );
    }
    if (prevState.selectedDistrict !== this.state.selectedDistrict) {
      this.props.getMunicipalityDataFromDistrict(
        this.state.selectedDistrict,
      );
    }

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
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ activeClickPartners: [] });
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
    // const { activeClickPartners } = this.state;
    if (prevState.activeClickPartners !== activeClickPartners) {
      const mapLayers = this.mapRef.current.leafletElement._layers;
      if (activeClickPartners.length === 0) {
        this.props.filterPartnerSelect(activeClickPartners);
        if (activeTableView) {
          this.props.getTableDataByPartnerSelect(activeClickPartners);
        }
        Object.entries(mapLayers).forEach(([key, value]) => {
          if (
            value.options &&
            value.options.properties &&
            value.options.properties.partner_id
          ) {
            value.setIcon(allActive);
            value.closePopup();
          }
        });
      } else {
        this.props.filterPartnerSelect(activeClickPartners);
        if (activeTableView) {
          this.props.getTableDataByPartnerSelect(activeClickPartners);
        }
        Object.entries(mapLayers).forEach(([key, value]) => {
          if (
            value.options &&
            value.options.properties &&
            value.options.properties.partner_id
          ) {
            value.setIcon(Inactive);
          }
        });
      }
      activeClickPartners.map(data => {
        Object.entries(mapLayers).forEach(([key, value]) => {
          if (
            value.options &&
            value.options.properties &&
            value.options.properties.partner_id &&
            value.options.properties.partner_id === data
          ) {
            value.setIcon(allActive);
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
      prevProps.automationReducer.getAutomationDataByMunicipality !==
      this.props.automationReducer.getAutomationDataByMunicipality
    ) {
      this.props.filterAutomationDataForVectorTiles(
        this.state.dataTypeLevel,
      );
    }
    if (
      prevProps.automationReducer.automationChoroplethData !==
      automationChoroplethData
    ) {
      // console.log('if automationDataByProvince updated');
      this.getFilteredAutomationData();
      // this.getFilteredAutomationData();
      // console.log(a, 'aaaa');
    }
    if (
      prevProps.automationReducer.automationChoroplethData !==
      this.props.automationReducer.automationChoroplethData
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ vectorGridKey: Math.random() });
    }
  }

  handleActiveClickPartners = clicked => {
    // console.log(clicked, 'name');
    const {
      activeClickPartners,
      activeOutreachButton,
      dataTypeLevel,
    } = this.state;
    if (activeClickPartners.includes(clicked)) {
      const removedPartnersFull = activeClickPartners.filter(function(
        partner,
      ) {
        return partner !== clicked;
      });

      this.setState({
        activeClickPartners: removedPartnersFull,
      });
      if (removedPartnersFull.length < 1 && activeOutreachButton) {
        if (dataTypeLevel === 'province') {
          this.props.selectChoroplethDataOfProvince();
        } else if (dataTypeLevel === 'district') {
          this.props.selectChoroplethDataOfDistrict();
        } else {
          this.props.selectChoroplethDataOfMunicipality();
        }
        // this.props.partnerSelectWithOutreach(removedPartnersFull);
      } else {
        this.props.partnerSelectWithOutreach(
          removedPartnersFull,
          dataTypeLevel,
        );
      }
    } else {
      const joined = activeClickPartners.concat(clicked);
      this.setState({ activeClickPartners: joined });
      if (joined.length > 0 && activeOutreachButton) {
        this.props.partnerSelectWithOutreach(joined, dataTypeLevel);
      }
      // } else {
      //   this.props.getAllAutomationDataByPartner();
      //   // this.props.getAutomationDataByMunicipality();
      // }
    }
  };

  toggleFilterButton = () => {
    if (this.state.activeFilterButton) {
      this.setState({
        activeProvince: false,
        activeDistrict: false,
        activeMunicipality: false,
      });
    }
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
    // if (this.state.activeOutreachButton) {
    this.setState({ vectorGridKey: Math.random() });
    // }
    const {
      activeClickPartners,
      activeOutreachButton,
      dataTypeLevel,
    } = this.state;

    if (activeClickPartners.length > 0 && !activeOutreachButton) {
      this.props.partnerSelectWithOutreach(
        activeClickPartners,
        dataTypeLevel,
      );
      // this.setState({ vectorGridKey: Math.random() });
    } else if (
      activeClickPartners.length > 0 &&
      activeOutreachButton
    ) {
      // this.setState({ vectorGridKey: Math.random() });
    } else {
      this.props.getAllAutomationDataByPartner();
    }
  };

  handleStateLevel = clickedValue => {
    // console.log(e.target.value, 'target value');
    const { dataTypeLevel, activeClickPartners } = this.state;
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
    this.props.partnerSelectWithOutreach(
      activeClickPartners,
      clickedValue,
    );
  };

  getFilteredAutomationData = () => {
    const {
      automationReducer: { automationChoroplethData },
    } = this.props;
    // console.log(automationChoroplethData, 'sss');
    const a =
      automationChoroplethData &&
      automationChoroplethData.map(data => {
        return data.count;
      });
    this.setState({ filteredProvinceChoropleth: a });
  };

  handleProvinceClick = (id, code) => {
    console.log(id, 'asasa');
    const {
      vectorGridInputUrl,
      dataTypeLevel,
      activeClickPartners,
    } = this.state;
    if (dataTypeLevel === 'province') {
      this.props.getFilteredPartnersByFederal({
        municipality: [],
        district: [],
        province: [code],
      });
      console.log('province');
      const provinceFilterUrl = `https://dvsnaxa.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}&id=${id}`;
      // const provinceFilterUrl2 = `https://dvsnaxa.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}&province_id=2`;
      // const provinceFilterUrl = `https://dvsnaxa.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}&province_id=1&province_id=2`;
      this.setState({
        vectorGridInputUrl: provinceFilterUrl,
        // vectorGridInputUrl1: provinceFilterUrl2,
        vectorGridKey: Math.random(),
        // vectorGridKey1: Math.random(),
        // dataTypeLevel: 'district',
      });
    } else if (dataTypeLevel === 'district') {
      console.log('disrict');
      this.props.getFilteredPartnersByFederal({
        municipality: [],
        district: [code],
        province: [],
      });
      const districtFilterUrl = `https://dvsnaxa.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}&id=${id}`;
      this.setState({
        vectorGridInputUrl: districtFilterUrl,
        vectorGridKey: Math.random(),
        // dataTypeLevel: 'municipality',
      });
    } else if (dataTypeLevel === 'municipality') {
      this.props.getFilteredPartnersByFederal({
        municipality: [code],
        district: [],
        province: [],
      });
      console.log('municipality');
      console.log(code);
      const municipalityFilterUrl = `https://dvsnaxa.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}&id=${id}`;
      this.setState({
        vectorGridInputUrl: municipalityFilterUrl,
        vectorGridKey: Math.random(),
      });
    }
    // console.log(
    //   `https://dvsnaxa.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}&province_id=${code}`,
    // );
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

  handleProvinceAllCheck = event => {
    const { allProvinceName } = this.props.automationReducer;

    if (event.target.checked) {
      const a = allProvinceName.map(data => {
        return data.id;
      });
      const provinceNames = allProvinceName.map(data => {
        return data.name;
      });
      // console.log(provinceCheckboxes, 'checkboxes');
      this.setState({
        selectedProvince: a,
        selectedProvinceName: provinceNames,
      });
    } else {
      this.setState({
        selectedProvince: [],
        selectedProvinceName: [],
      });
    }
  };

  handleProvinceSingleClick = (id, name) => {
    const { selectedProvince, selectedProvinceName } = this.state;
    if (selectedProvince.includes(id)) {
      const a = selectedProvince.filter(data => data !== id);
      const filteredProvinceName = selectedProvinceName.filter(
        data => data !== name,
      );
      this.setState({
        selectedProvince: a,
        selectedProvinceName: filteredProvinceName,
      });
    } else {
      const b = selectedProvince.concat(id);
      const filteredProvinceName = selectedProvinceName.concat(name);
      this.setState({
        selectedProvince: b,
        selectedProvinceName: filteredProvinceName,
      });
    }
  };

  handleDistrictAllCheck = event => {
    const { allDistrictName } = this.props.automationReducer;

    if (event.target.checked) {
      const a = allDistrictName.map(data => {
        return data.id;
      });
      const districtNames = allDistrictName.map(data => {
        return data.name;
      });
      // console.log(provinceCheckboxes, 'checkboxes');
      this.setState({
        selectedDistrict: a,
        selectedDistrictName: districtNames,
      });
    } else {
      this.setState({
        selectedDistrict: [],
        selectedDistrictName: [],
      });
    }
  };

  handleDistrictSingleClick = (value, name) => {
    const { selectedDistrict, selectedDistrictName } = this.state;
    if (selectedDistrict.includes(value)) {
      const a = selectedDistrict.filter(data => data !== value);
      const filteredDistrictName = selectedDistrictName.filter(
        data => data !== name,
      );
      this.setState({
        selectedDistrict: a,
        selectedDistrictName: filteredDistrictName,
      });
    } else {
      const b = selectedDistrict.concat(value);
      const filteredDistrictName = selectedDistrictName.concat(name);
      this.setState({
        selectedDistrict: b,
        selectedDistrictName: filteredDistrictName,
      });
    }
  };

  handleMunicipalityAllCheck = event => {
    const { allMunicipalityName } = this.props.automationReducer;

    if (event.target.checked) {
      const a = allMunicipalityName.map(data => {
        return data.id;
      });
      const munNames = allMunicipalityName.map(data => {
        return data.name;
      });
      // console.log(provinceCheckboxes, 'checkboxes');
      this.setState({
        selectedMunicipality: a,
        selectedMunicipalityName: munNames,
      });
    } else {
      this.setState({
        selectedMunicipality: [],
        selectedMunicipalityName: [],
      });
    }
  };

  handleMunicipalitySingleClick = (value, name) => {
    const {
      selectedMunicipality,
      selectedMunicipalityName,
    } = this.state;
    if (selectedMunicipality.includes(value)) {
      const a = selectedMunicipality.filter(data => data !== value);
      const filteredMunicipality = selectedMunicipalityName.filter(
        data => data !== name,
      );
      this.setState({
        selectedMunicipality: a,
        selectedMunicipalityName: filteredMunicipality,
      });
    } else {
      const b = selectedMunicipality.concat(value);
      const filteredMunicipality = selectedMunicipalityName.concat(
        name,
      );
      this.setState({
        selectedMunicipality: b,
        selectedMunicipalityName: filteredMunicipality,
      });
    }
  };

  applyClickForPartnerFilter = () => {
    const {
      selectedMunicipality,
      selectedDistrict,
      selectedProvince,
      activeClickPartners,
      activeOutreachButton,
      dataTypeLevel,
    } = this.state;
    // this.handleProvinceClick(7);
    if (activeClickPartners.length > 0) {
      this.props.getFilteredPartnersByFederalWithClickedPartners(
        {
          municipality: selectedMunicipality,
          district: selectedDistrict,
          province: selectedProvince,
        },
        activeClickPartners,
      );
    } else {
      if (activeOutreachButton) {
        // if (
        //   dataTypeLevel === 'municipality' &&
        //   selectedProvince.length >= 0 &&
        //   selectedDistrict.length <= 0 &&
        //   selectedMunicipality.length <= 0
        // ) {
        //   this.setState({ dataTypeLevel: 'province' });
        // } else if (
        //   dataTypeLevel === 'municipality' &&
        //   selectedProvince.length >= 0 &&
        //   selectedDistrict.length >= 0 &&
        //   selectedMunicipality.length <= 0
        // ) {
        //   this.setState({ dataTypeLevel: 'district' });
        // }
        // this.props.getAllAutomationDataByPartner();
        // this.props.partnerSelectWithOutreach(activeClickPartners);
        this.props.getFilteredPartnersByFederalWithClickedPartners(
          {
            municipality: selectedMunicipality,
            district: selectedDistrict,
            province: selectedProvince,
          },
          activeClickPartners,
        );
      }
      this.props.getFilteredPartnersByFederal({
        municipality: selectedMunicipality,
        district: selectedDistrict,
        province: selectedProvince,
      });
    }
    // this.setState({ activeOutreachButton: true });
  };

  handleResetButtonForFilter = () => {
    this.props.getAllAutomationDataByPartner();
    this.setState({
      selectedProvince: [],
      selectedProvinceName: [],
      selectedDistrict: [],
      selectedDistrictName: [],
      selectedMunicipality: [],
      selectedMunicipalityName: [],
    });
    this.props.partnerSelectWithOutreach(
      this.state.activeClickPartners,
    );
  };

  refreshSelectedPartnerBtn = () => {
    this.setState({ activeClickPartners: [] });
    this.handleStateLevel(this.state.dataTypeLevel);
    this.props.getAllAutomationDataByPartner();
    const bounds = [
      [25.898761936567023, 80.00244140625001],
      [30.732392734006083, 88.79150390625],
    ];
    const map = this.mapRef.current.leafletElement;
    map.flyToBounds(bounds, {
      animate: true,
      duration: 4,
    });
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
      selectedProvince,
      selectedDistrict,
      selectedMunicipality,
      selectedProvinceName,
      selectedDistrictName,
      selectedMunicipalityName,
      vectorGridInputUrl1,
      vectorGridKey1,
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
            refreshSelectedPartnerBtn={this.refreshSelectedPartnerBtn}
          />

          <main className="main">
            <div className="main-card map-card">
              <div id="map" className="map">
                <MapComponent
                  vectorGridInputUrl1={vectorGridInputUrl1}
                  vectorGridKey1={vectorGridKey1}
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
                        id="filter_dropdown_province"
                        tooltip={
                          selectedProvinceName.length === 0
                            ? ''
                            : `${
                                selectedProvinceName.length ===
                                allProvinceName.length
                                  ? 'All'
                                  : selectedProvinceName
                              }`
                        }
                        flow="up"
                      >
                        <span
                          className={`span-label ${
                            activeProvince ? 'span-active' : ''
                          } `}
                          onClick={this.handleProvinceDropdown}
                          onKeyDown={this.handleProvinceDropdown}
                          role="tab"
                          tabIndex="0"
                        >
                          {selectedProvinceName.length === 0
                            ? 'Select Province'
                            : `${
                                selectedProvinceName.length ===
                                allProvinceName.length
                                  ? 'All'
                                  : selectedProvinceName
                              }`}
                        </span>
                        <ul
                          className={`select-list ${
                            activeProvince ? 'active' : ''
                          }`}
                          id="dropdown-list"
                        >
                          <li className="checkbox">
                            <input
                              type="checkbox"
                              id="allProvinceCheck"
                              onClick={this.handleProvinceAllCheck}
                              checked={
                                selectedProvince.length ===
                                allProvinceName.length
                                  ? true
                                  : false
                              }
                            />
                            <label htmlFor="allProvinceCheck">
                              <i className="icon-ok-2" />
                              All
                            </label>
                          </li>
                          {allProvinceName &&
                            allProvinceName.map((data, i) => {
                              return (
                                <li
                                  key={data.id}
                                  className="checkbox"
                                >
                                  <input
                                    type="checkbox"
                                    id={`check_time${i}`}
                                    checked={selectedProvince.includes(
                                      data.code,
                                    )}
                                    onClick={() => {
                                      this.handleProvinceSingleClick(
                                        data.code,
                                        data.name,
                                      );
                                    }}
                                  />
                                  <label htmlFor={`check_time${i}`}>
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
                        id="filter_dropdown_district"
                        onClick={this.handleDistrictDropdown}
                        onKeyDown={this.handleDistrictDropdown}
                        role="tab"
                        tabIndex="0"
                        style={
                          dataTypeLevel === 'province'
                            ? { display: 'none' }
                            : { display: 'block' }
                        }
                        tooltip={
                          selectedDistrictName.length === 0
                            ? ''
                            : `${
                                selectedDistrictName.length ===
                                allDistrictName.length
                                  ? 'All'
                                  : selectedDistrictName
                              }`
                        }
                        flow="up"
                      >
                        <span
                          className={`span-label ${
                            activeDistrict ? 'span-active' : ''
                          } `}
                        >
                          {selectedDistrictName.length === 0
                            ? 'Select District'
                            : `${
                                selectedDistrictName.length ===
                                allDistrictName.length
                                  ? 'All'
                                  : selectedDistrictName
                              }`}
                        </span>
                        <ul
                          className={`select-list ${
                            activeDistrict ? 'active' : ''
                          }`}
                          id="dropdown-list-district"
                        >
                          <li className="checkbox">
                            <input
                              type="checkbox"
                              id="allDistrictCheck"
                              onClick={this.handleDistrictAllCheck}
                              checked={
                                selectedDistrict.length ===
                                allDistrictName.length
                                  ? true
                                  : false
                              }
                            />
                            <label htmlFor="allDistrictCheck">
                              <i className="icon-ok-2" />
                              All
                            </label>
                          </li>
                          {allDistrictName &&
                            allDistrictName.map((data, i) => {
                              return (
                                <li className="checkbox">
                                  <input
                                    type="checkbox"
                                    id={`check_district${i}`}
                                    checked={selectedDistrict.includes(
                                      data.code,
                                    )}
                                    onClick={() => {
                                      this.handleDistrictSingleClick(
                                        data.code,
                                        data.name,
                                      );
                                    }}
                                  />
                                  <label
                                    htmlFor={`check_district${i}`}
                                  >
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
                        id="filter_dropdown_municipality"
                        onClick={this.handleMunicipalityDropdown}
                        onKeyDown={this.handleMunicipalityDropdown}
                        role="tab"
                        tabIndex="0"
                        style={
                          dataTypeLevel === 'province' ||
                          dataTypeLevel === 'district'
                            ? { display: 'none' }
                            : { display: 'block' }
                        }
                        tooltip={
                          selectedMunicipalityName.length === 0
                            ? ''
                            : `${
                                selectedMunicipalityName.length ===
                                allMunicipalityName.length
                                  ? 'All'
                                  : selectedMunicipalityName
                              }`
                        }
                        flow="up"
                      >
                        <span
                          className={`span-label ${
                            activeMunicipality ? 'span-active' : ''
                          } `}
                        >
                          {selectedMunicipalityName.length === 0
                            ? 'Select Municipality'
                            : `${
                                selectedMunicipalityName.length ===
                                allMunicipalityName.length
                                  ? 'All'
                                  : selectedMunicipalityName
                              }`}
                        </span>
                        <ul
                          className={`select-list ${
                            activeMunicipality ? 'active' : ''
                          }`}
                          id="dropdown-list-mun"
                        >
                          <li className="checkbox">
                            <input
                              type="checkbox"
                              id="allMunicipalityCheck"
                              onClick={
                                this.handleMunicipalityAllCheck
                              }
                              checked={
                                selectedMunicipality.length ===
                                allMunicipalityName.length
                                  ? true
                                  : false
                              }
                            />
                            <label htmlFor="allMunicipalityCheck">
                              <i className="icon-ok-2" />
                              All
                            </label>
                          </li>
                          {allMunicipalityName &&
                            allMunicipalityName.map((data, i) => {
                              return (
                                <li
                                  key={data.id}
                                  className="checkbox"
                                >
                                  <input
                                    type="checkbox"
                                    id={`check_mun${i}`}
                                    checked={selectedMunicipality.includes(
                                      data.code,
                                    )}
                                    onClick={() => {
                                      this.handleMunicipalitySingleClick(
                                        data.code,
                                        data.name,
                                      );
                                    }}
                                  />
                                  <label htmlFor={`check_mun${i}`}>
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
                        onClick={this.handleResetButtonForFilter}
                      >
                        <i className="material-icons">refresh</i>
                      </button>
                      <button
                        type="button"
                        className="common-button is-clear"
                        onClick={this.applyClickForPartnerFilter}
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
              activeTableView={activeTableView}
            />
          </main>
          <RightSideBar
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
})(MainAutomation);
