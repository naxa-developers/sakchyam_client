/* eslint-disable no-param-reassign */
import React, { Component } from 'react';

import Axios from 'axios';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import Loading from '../../../common/Loading';
import randomGeojson from '../../../../../data/randomGeojson.json';
import ActiveIcon from '../../../../../img/fullactive.png';
import mapIcon from '../../../../../img/map.png';
import layersIcon from '../../../../../img/layers.png';
// import Select from 'react-select';
import TimelineChart from '../Chart/TimelineChart';
import CsvFile from '../../../../../data/provincemerge.json';

import 'mapbox-gl/src/css/mapbox-gl.css';
import '../MapRelatedComponents/MapRelatedCss/VectorTileMapbox.css';
import Choropleth from '../MapRelatedComponents/VectorTileMapbox';
import MarkerCluster from '../MapRelatedComponents/MarkerClusterMapbox';
import {
  getAllAutomationDataByPartner,
  getAutomationDataByProvince,
  getAutomationDataByDistrict,
  getAutomationDataByMunicipality,
  filterAutomationDataForVectorTiles,
} from '../../../../actions/automation.actions';
import automationReducerReducer from '../../../../reducers/automationReducer.reducer';
import { getCenterBboxMunicipality } from '../MapRelatedComponents/MunicipalityFunction';
import { getCenterBboxDistrict } from '../MapRelatedComponents/DistrictFunction';
// import ScrollTab from './ScrollTab';
// import IosSwitch from '../../Includes/IosSwitch';

// const map = {};
// const greenIcon = L.icon({
//   iconUrl: '../../../../img/marker.png',
//   // shadowUrl: 'leaf-shadow.png',

//   iconSize: [38, 95], // size of the icon
//   shadowSize: [50, 64], // size of the shadow
//   iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
//   shadowAnchor: [4, 62], // the same for the shadow
//   popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
// });
let i = 1;

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      provinceBbox: [],
      provinceAllData: [],
      selectedBaseLayer: 'harje',
      // bounds: [
      //   [30.441792349047404, 87.91087222877736],
      //   [25.504959616615796, 80.4671531221034],
      // ],
      // bounds: [
      //   [0, 0],
      //   [0, 0],
      // ],
      province: null,
      district: null,
      municipality: null,
      SelectedProvince: null,
      SelectedDistrict: null,
      SelectedMunicipality: null,
      minValue: '1/1/2015',
      maxValue: '1/1/2020',
      key: 1,
      playClick: false,
    };
  }

  moveEnd = () => {
    setTimeout(() => {
      global.migrationLayer.pause();
    }, 500);
  };

  addMap = () => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZ2VvbWF0dXBlbiIsImEiOiJja2E5bDFwb2swdHNyMnNvenZxa2Vpeml2In0.fCStqdwmFYFP-cUvb5vMCw';
    const map = new mapboxgl.Map({
      container: 'mapBoxMap',
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [84.0, 27.5], // starting position [lng, lat]
      zoom: 5, // starting zoom
    });
    this.setState({ map });
  };

  componentDidMount() {
    // const map = this.props.mapRef.current.leafletElement;
    // this.props.getAllAutomationDataByPartner();
    // immediately select a few origin points for Bezier path display,
    // instead of waiting for the first user click event to fire
    // oneToManyFlowmapLayer.selectFeaturesForPathDisplayById(
    //   's_city_id',
    //   562,
    //   true,
    //   'SELECTION_NEW',
    // );
    // oneToManyFlowmapLayer.selectFeaturesForPathDisplayById(
    //   's_city_id',
    //   657,
    //   true,
    //   'SELECTION_ADD',
    // );
    // oneToManyFlowmapLayer.selectFeaturesForPathDisplayById(
    //   's_city_id',
    //   516,
    //   true,
    //   'SELECTION_ADD',
    // );
    // this.props.filterAutomationDataForVectorTiles();
    this.addMap();
    console.log('entered');
  }

  componentDidUpdate(prevProps, prevState) {}

  markerClickProvinceSelect = clickedValue => {
    this.props.handleActiveClickPartners(clickedValue);
  };

  getYear = minDate => {
    const d = new Date(minDate);

    const day = d.getDate();
    const month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    const year = d.getFullYear();

    const dateStr = `${month}/${day}/${year}`;
    // time = dateStr;
    // console.log(time ,"time returns")
    // this.setState({ time: dateStr });
    return dateStr;
  };

  playBtn = (min, max) => {
    this.setState({
      minValue: this.getYear(min),
      maxValue: this.getYear(max),
      key: i,
      playClick: true,
    });
    i += 1;
    // global.timerId = null;
  };

  toggleMapChange = () => {
    this.setState(prevState => ({
      activeMapControl: !prevState.activeMapControl,
    }));
    // console.log(
    //   this.props.automationReducer.automationAllDataByPartner[0]
    //     .partner_data,
    // );
    // const a = this.props.automationReducer.automationAllDataByPartner[0].partner_data.map(
    //   partner => {

    // migrationLayer.pause();
    // setTimeout(() => {
    //   migrationLayer.hide();
    // }, 5000);
  };

  // onMapMoveEnd = e => {
  //   console.log('new bounds ', e.target.getBounds());
  // };

  render() {
    const {
      automationDataByPartner,
      automationDataByProvince,
      automationChoroplethData,
      dataLoading,
      automationLeftSidePartnerData,
      automationTableData,
      tableDataLoading,
    } = this.props.automationReducer;
    const {
      provinceBbox,
      selectedBaseLayer,
      province,
      district,
      municipality,
      SelectedProvince,
      SelectedDistrict,
      SelectedMunicipality,
      provinceAllData,
      minValue,
      maxValue,
      key,
      playClick,
      activeMapControl,
    } = this.state;
    const {
      dataTypeLevel,
      filteredProvinceChoropleth,
      vectorGridInputUrl,
      vectorGridKey,
      color,
      handleProvinceClick,
      activeOutreachButton,
      isTileLoaded,
      vectorGridFirstLoad,
      mapType,
      activeClickPartners,
    } = this.props;
    // console.log(vectorGridFirstLoad, 'vect');

    const position = [27.7, 85.4];
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
    ];

    const headerHeight =
      document.getElementsByClassName('site-header')[0] &&
      document.getElementsByClassName('site-header')[0].offsetHeight;

    const choroplethtype = this.props.dataTypeLevel; // change this to (mun,province) change the level
    const choroplethInputData =
      choroplethtype === 'province'
        ? this.props.provinceCounts
        : this.props.agegroupdata;
    // console.log(choroplethInputData, 'choroplethInputData');

    const colors =
      this.props.colorArray && this.props.colorArray.length > 0
        ? this.props.colorArray
        : [
            '#FED976',
            '#fff3d4',
            '#FEB24C',
            '#FD8D3C',
            '#FC4E2A',
            '#E31A1C',
            '#BD0026',
            '#800026',
            '#453C43',
            '#959A92',
            '#CCA575',
            '#AC4C25',
            '#A61D2C',
          ];

    // Filter With Province
    // : 'https://dvsnaxa.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}&province_id=1';
    const inputDivisions =
      choroplethtype === 'province'
        ? []
        : [0, 2, 4, 6, 8, 10, 12, 14, 20];
    // [0, 5, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500];

    const inputStyle =
      choroplethtype === 'province'
        ? {
            fillColor: '#a3b7e3',
            fillOpacity: 0,
            weight: 1.5,
            opacity: 0.1,
            color: 'black',
            fill: true,
          }
        : {
            fillColor: 'white',
            fillOpacity: 0.7,
            weight: 1.5,
            opacity: 0.1,
            color: 'black',
            fill: true,
          };
    // console.log('map component', activeOutreachButton);
    // console.log(vectorGridInputUrl, 'url');
    // console.log(automationDataByProvince, 'data');
    // console.log(filteredProvinceChoropleth, 'filterProvince');
    // console.log(randomGeojson, 'geojson');
    console.log(automationChoroplethData);
    return (
      <div id="mapBoxMap">
        {this.state.map && (
          <div>
            <Choropleth
              map={this.state.map}
              choroplethData={
                !activeOutreachButton ? [] : automationChoroplethData
              }
              // maxValue = {this.state.maxValue}
              divisions={inputDivisions}
              // label = {true}
              color="#0000FF"
              // colorArray = {["#fff3d4", "#FED976", "#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C", "#BD0026", "#800026"]}
              vectorTileUrl={vectorGridInputUrl}
            />
            {/* <MarkerCluster
          map = {this.state.map}
          geojsonData = {this.state.geojsonData}
        /> */}
            {/* <MigrationLines
          map ={this.state.map}
          migrationData = {this.state.migrationData}
        /> */}
          </div>
        )}
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
})(MapComponent);
