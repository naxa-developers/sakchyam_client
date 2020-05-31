/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { Map, Popup, Marker, Pane } from 'react-leaflet';
import Loader from 'react-loader-spinner';
import 'leaflet/dist/leaflet.css';
import Control from 'react-leaflet-control';
import L, { CircleMarker } from 'leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css';
import Axios from 'axios';
import 'leaflet.featuregroup.subgroup';
// import '../../../../../library/canvasFlowmapLayer';
import '../../../../../library/leaflet.migrationLayer';
import '../../../../../library/SmoothWheelZoom';
import { connect } from 'react-redux';
import randomGeojson from '../../../../../data/randomGeojson.json';
import ActiveIcon from '../../../../../img/fullactive.png';
import mapIcon from '../../../../../img/map.png';
import layersIcon from '../../../../../img/layers.png';
// import Select from 'react-select';
// import Control from 'react-leaflet-control';
import TimelineChart from '../Chart/TimelineChart';
import CsvFile from '../../../../../data/provincemerge.json';
import VectorGrid from '../MapRelatedComponents/VectorGrid';
import BaseLayers from '../MapRelatedComponents/BaselayersComponent';
import MarkerClusterComponent from '../MapRelatedComponents/MarkerClusterComponent';
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
export const activeIcon = new L.Icon({
  iconUrl: ActiveIcon,
  iconSize: [35, 40],
  // iconAnchor: [17, 46],
});
class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceBbox: [],
      provinceAllData: [],
      selectedBaseLayer: 'harje',
      bounds: [
        [25.898761936567023, 80.00244140625001],
        [30.732392734006083, 88.79150390625],
      ],
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

  componentDidMount() {
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
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.vectorGridKey !== this.props.vectorGridKey) {
    //   console.log('xxx');
    //   // eslint-disable-next-line react/no-did-update-set-state
    //   this.props.handleVectorGridFirstLoad();
    // }
  }
  // fetchingForDropdown = name => {
  //   const key =
  //     name === 'province'
  //       ? 'province_api'
  //       : name === 'district'
  //       ? 'district_api'
  //       : name === 'municipality'
  //       ? 'municipality_api'
  //       : '';
  //   const url = `https://iomapi.naxa.com.np/api/v1/${key}`;
  //   const prvncDist =
  //     name === 'district'
  //       ? 'province'
  //       : name === 'municipality'
  //       ? 'district'
  //       : '';

  //   Axios.get(url).then(response => {
  //     const array = [];

  //     response.data.data.map(e => {
  //       const object = {
  //         value: e.id,
  //         label: e.name,
  //         [prvncDist]: e[prvncDist.toString()],
  //       };
  //       array.push(object);
  //       return true;
  //     });
  //     this.setState({ [name]: array });
  //   });
  // };

  markerClickProvinceSelect = clickedValue => {
    this.props.handleActiveClickPartners(clickedValue);
  };

  getYear = minDate => {
    const d = new Date(minDate);

    const day = d.getDate();
    const month = d.getMonth()+1; // Since getMonth() returns month from 0-11 not 1-12
    const year = d.getFullYear();

    const dateStr = `${month}/${day}/${year}`;
    // time = dateStr;
    //console.log(time ,"time returns")
    // this.setState({ time: dateStr });
    return dateStr;
  };
  playBtn = (min, max) => {
    // this.setState({ key: Math.random() });
    // this.setState({ playSelected: true });
    // const startDate = min;
    // const endDate = max;
    // const time = min;
    // console.log(min, max);
    // const minDate = parseInt(minDate)

    this.setState({
       minValue: this.getYear(min),
       maxValue: this.getYear(max),
      key: i,
      playClick: true,
    });
    i++;
    // global.timerId = null;
  };

  toggleMapChange = () => {
    this.setState(prevState => ({
      activeMapControl: !prevState.activeMapControl,
    }));
    console.log(
      this.props.automationReducer.automationAllDataByPartner[0]
        .partner_data,
    );
    // const a = this.props.automationReducer.automationAllDataByPartner[0].partner_data.map(
    //   partner => {

    const a = this.props.automationReducer.automationTableData.map(
      branch => {
        console.log('inside If ');
        // eslint-disable-next-line no-param-reassign
        // branch.s_lat = partner.lat;
        // // eslint-disable-next-line no-param-reassign
        // branch.s_long = partner.long;
        // console.log(branch.municipality, 'branchLat0');
        // console.log(
        //   getCenterBboxMunicipality(branch.municipality.trim()),
        //   'branchLat',
        // );
        const trimelat = getCenterBboxMunicipality(
          branch.municipality.trim(),
        ).center;
        const trimelong = getCenterBboxMunicipality(
          branch.municipality.trim(),
        ).center;
        // eslint-disable-next-line prefer-destructuring
        branch.des_long = trimelong ? trimelong[0] : null;
        // console.log(trimelong[0], 'trim');
        // console.log(timelong[0]);
        // eslint-disable-next-line prefer-destructuring
        branch.des_lat = trimelong ? trimelong[1] : null;
        // }
        return true;
      },
      console.log(
        this.props.automationReducer.automationTableData,
        'tableData',
      ),
    );

    const map = this.props.mapRef.current.leafletElement;
    // const marker = L.marker([84, 27], { icon: greenIcon }).addTo(map);
    // console.log(map, 'mapref');

  //   const geoJsonFeatureCollection = {
  //     type: 'FeatureCollection',
  //     features: this.props.automationReducer.automationTableData.map(
  //       function(datum) {
  //         return {
  //           type: 'Feature',
  //           geometry: {
  //             type: 'Point',
  //             coordinates: [datum.longitude, datum.latitude],
  //           },
  //           properties: datum,
  //         };
  //       },
  //     ),
  //   };
  //   console.log(geoJsonFeatureCollection, 'geoJsonFeatureCollection');
  //   map.createPane('migration_pane').style.zIndex = 900;
  //   // map.createPane('migration_pane').style.zIndex = 600;

  //   const oneToManyFlowmapLayer = L.canvasFlowmapLayer(
  //     geoJsonFeatureCollection,
  //     {
  //       // pane: 'migration_pane',
  //       originAndDestinationFieldIds: {
  //         originUniqueIdField: 'partner_id',
  //         originGeometry: {
  //           x: 'longitude',
  //           y: 'latitude',
  //         },
  //         destinationUniqueIdField: 'id',
  //         destinationGeometry: {
  //           x: 'des_long',
  //           y: 'des_lat',
  //         },
  //       },
  //       style(geoJsonFeature) {
  //         // console.log(layer, 'inside');
  //         // use leaflet's path styling options

  //         // since the GeoJSON feature properties are modified by the layer,
  //         // developers can rely on the "isOrigin" property to set different
  //         // symbols for origin vs destination CircleMarker stylings

  //         if (geoJsonFeature.properties.isOrigin) {
  //           return {
  //             renderer: L.canvas({
  //               pane: 'migration_pane',
  //               // tolerance: 15,
  //                padding: 0.2,
  //             }), // recommended to use your own L.canvas()
  //             radius: 8,
  //             weight: 1,
  //             opacity: 1,
  //             color: '#ff0000',
  //             fillColor: '#ff0000',
  //             fillOpacity: 1,
  //           };
  //         }
  //         return {
  //           // renderer: canvasRenderer,
  //           radius: 2.5,
  //           weight: 0.25,
  //           opacity: 0,
  //           color: 'rgb(17, 142, 170)',
  //           fillColor: 'rgb(17, 142, 170)',
  //           fillOpacity: 0,
  //         };
  //       },
  //       pathDisplayMode: 'selection',
  //       animationStarted: true,
  //       animationEasingFamily: 'Cubic',
  //       animationEasingType: 'In',
  //       animationDuration: 2000,
  //     },
  //   ).addTo(map);
  //   oneToManyFlowmapLayer.on('click', function(e) {
  //     if (e.sharedOriginFeatures.length) {
  //       oneToManyFlowmapLayer.selectFeaturesForPathDisplay(
  //         e.sharedOriginFeatures,
  //         'SELECTION_NEW',
  //       );
  //     }
  //     if (e.sharedDestinationFeatures.length) {
  //       oneToManyFlowmapLayer.selectFeaturesForPathDisplay(
  //         e.sharedDestinationFeatures,
  //         'SELECTION_NEW',
  //       );
  //     }
  //   });
  //   map.getPane('overlayPane').style.zIndex = 600;
  //   console.log(oneToManyFlowmapLayer, 'mig layer');
  //   // immediately select an origin point for Bezier path display,
  //   // instead of waiting for the first user click event to fire
  //   // oneToManyFlowmapLayer.selectFeaturesForPathDisplayById(
  //   //   'partner_id',
  //   //   373,
  //   //   true,
  //   //   'SELECTION_NEW',
  //   // );

  //   // since this demo is using the optional "pathDisplayMode" as "selection",
  //   // it is up to the developer to wire up a click or mouseover listener
  //   // and then call the "selectFeaturesForPathDisplay()" method to inform the layer
  //   // which Bezier paths need to be drawn
  //   oneToManyFlowmapLayer.on('click', function(e) {
  //     if (e.sharedOriginFeatures.length) {
  //       oneToManyFlowmapLayer.selectFeaturesForPathDisplay(
  //         e.sharedOriginFeatures,
  //         'SELECTION_NEW',
  //       );
  //     }
  //     if (e.sharedDestinationFeatures.length) {
  //       oneToManyFlowmapLayer.selectFeaturesForPathDisplay(
  //         e.sharedDestinationFeatures,
  //         'SELECTION_NEW',
  //       );
  //     }
  //   });
  // };

  // console.log(this.props.automationReducer.automationTableData);
  // console.log(
  //   this.vectorGridRef.current.leafletElement,
  //   'vectorgrid',
  // );
  // console.log(getCenterBboxMunicipality('Chitwan'), 'getCNETE');
  // console.log(
  //   getCenterBboxMunicipality([
  //     'Chitwan',
  //     'Kathmandu',
  //     'Bhaktapur',
  //   ]),
  //   'multiple',
  // );

  var data = [{"from":[85,27],"to":[85.5,28],"labels":["Los Angeles","San Francisco"],"color":"#ff3a31","value":15}];

  var migrationLayer = new L.migrationLayer({
    map: map,
    data: data,
    pulseRadius:0,
    arcWidth:0,
    arcLabel:true,
  })
  migrationLayer.addTo(map)

//migrationLayer.pause();
setTimeout(() => {
  migrationLayer.hide();
}, 5000);


   };

  render() {
    const {
      automationDataByPartner,
      automationDataByProvince,
      automationChoroplethData,
      dataLoading,
      automationLeftSidePartnerData,
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
    return (
      <>
        {/* <div>
          <select
            onChange={this.handleStateLevel}
            value={dataTypeLevel}
          >
            <option value="province">Province</option>
            <option value="district">District</option>
            <option value="municipality">Municipality</option>
          </select>
        </div> */}
        <Map
          doubleClickZoom={this.props.zoomControl}
          scrollWheelZoom={false} // disable original zoom function
          smoothWheelZoom // enable smooth zoom
          smoothSensitivity={2}
          // closePopupOnClick={this.props.zoomControl}
          // dragging={this.props.zoomControl}
          // zoomSnap= {this.props.zoomControl}
          // zoomDelta= {this.props.zoomControl}
          // trackResize= {this.props.zoomControl}
          // zoomControl={false}
          // touchZoom={this.props.zoomControl}
          // scrollWheelZoom={this.props.zoomControl}
          // preferCanvas
          animate
          zoom={8}
          maxZoom={18}
          attributionControl
          zoomControl
          // doubleClickZoom
          // scrollWheelZoom
          bounds={this.state.bounds}
          ref={this.props.mapRef}
          center={position}
          // style={{ height: 500, width: 800 }}
          onClick={this.onClick}
          // zoomDelta = {0.5}
          zoomSnap={0.5}
        >
          {/* <IosSwitch/> */}
          <BaseLayers initialbase="mapbox" />
          {/* {choroplethInputData&&choroplethInputData.length >0 &&  */}
          {!activeOutreachButton && (
            <VectorGrid
              activeOutreachButton={activeOutreachButton}
              handleVectorGridFirstLoad={
                this.props.handleVectorGridFirstLoad
              }
              vectorGridFirstLoad={vectorGridFirstLoad}
              // changetheme={this.props.changetheme}
              handleProvinceClick={handleProvinceClick}
              handleTileLoad={this.props.handleTileLoad}
              mapRef={this.props.mapRef}
              style={inputStyle} // Province style setting
              // divisions={inputDivisions}
              choroplethData={[]} //
              vectorGridUrl={vectorGridInputUrl} // vectortile url setting
            />
          )}
          {activeOutreachButton &&
            automationChoroplethData &&
            filteredProvinceChoropleth && (
              <VectorGrid
                activeOutreachButton={activeOutreachButton}
                handleVectorGridFirstLoad={
                  this.handleVectorGridFirstLoad
                }
                vectorGridFirstLoad={vectorGridFirstLoad}
                handleTileLoadEnd={this.props.handleTileLoadEnd}
                isTileLoaded={isTileLoaded}
                handleTileLoad={this.props.handleTileLoad}
                // changetheme={this.props.changetheme}
                //   key={"0"}
                // mapRef={this.props.mapRef}
                // style={inputStyle} // Province style setting
                //   provinceCounts={[20, 12, 30, 4, 5, 26, 17]} //province counts for circles at center of province
                // choroplethData={choroplethInputData} //
                // color="#0000FF" //single color gradient - to make this active dont pass colorArray
                // legendDivisions = {10} //no of divisions in legend
                // colorArray={colors} // multi color custom gradient
                // divisions = {inputDivisions}
                // label = {true}
                legend
                // choroplethTitle = {"Covid Cases"}
                // vectorGridUrl={vectorGridInputUrl} // vectortile url setting
                handleProvinceClick={handleProvinceClick}
                changetheme={this.props.changetheme}
                key={vectorGridKey}
                mapRef={this.props.mapRef}
                style={inputStyle} // Province style setting
                choroplethTitle="Tablet Deployed"
                // provinceCounts={[20, 12, 30, 4, 5, 26, 17]} // province counts for circles at center of province
                provinceCounts={
                  filteredProvinceChoropleth &&
                  filteredProvinceChoropleth
                } // province counts for circles at center of province
                mode="choropleth" // options- choropleth, provinceCircles, both
                choroplethData={automationChoroplethData} //
                color="#007078" // single color gradient
                // legendDivisions = {10} //no of divisions in legend
                // colorArray={[
                //   '#e69109',
                //   '#63a4ff',
                //   '#8629ff',
                //   '#e553ed',
                //   '#f2575f',
                //   '#915e0d',
                //   '#a1970d',
                //   '#4f7d14',
                //   '#07aba1',
                //   '#1d4c8f',
                //   '#491991',
                //   '#610766',
                //   '#6e0208',
                //   '#f07818',
                //   '#7F95D1',
                //   '#FF82A9',
                //   '#FFC0BE',
                //   '#f0e111',
                //   '#9ff035',
                //   '#34ede1',
                // ]} // multi color custom gradient
                // colorArray={[
                //   '#FFF3D4',
                //   '#FED976',
                //   '#FEB24C',
                //   '#FD8D3C',
                //   '#FC4E2A',
                //   '#E31A1C',
                //   '#BD0026',
                //   '#800026',
                // ]} // multi color custom gradient
                divisions={inputDivisions}
                // divisions={[0, 5, 10, 15, 20]}
                // choroplethTitle = {"New Choropleth"}
                vectorGridUrl={vectorGridInputUrl} // vectortile url setting
              />
            )}
          {/* } */}
          <MarkerClusterComponent
            mapRef={this.props.mapRef}
            innovationData={provinceAllData}
            activelayer={this.props.activelayer}
            markertoplot={this.props.markertoplot}
            iconColor="#FF0000"
            mode="circle" // options - circle, circleIcon, marker
          />
          {/* <Pane name="partner_marker" style={{ zIndex: 400 }}> */}
          {automationLeftSidePartnerData &&
            automationLeftSidePartnerData.map(data => {
              return (
                <Marker
                  // pane="migration_pane"
                  key={data.id}
                  onClick={() => {
                    this.markerClickProvinceSelect(data.partner_id);
                  }}
                  properties={{
                    name: data.partner_name,
                    partner_id: data.partner_id,
                  }}
                  position={[data.lat, data.long]}
                  icon={activeIcon}
                >
                  <Popup>
                    <ul>
                      <li>
                        <div className="organization-icon">
                          <span>CH</span>
                        </div>
                        <div className="organization-content">
                          <h5>{data.partner_name}</h5>
                        </div>
                      </li>
                    </ul>

                    {/* <div className="map-popup-view">
                      <div className="map-popup-view-header">
                        <h5>Chure</h5>
                        <div className="icons">
                          <i className="material-icons">tablet_mac</i>
                          <b>32</b>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <div className="organization-icon">
                            <span>CH</span>
                          </div>
                          <div className="organization-content">
                            <div className="org-header">
                              <h5>{data.partner_name}</h5>
                              <div className="icon-list">
                                <div className="icons">
                                  <i className="material-icons">
                                    business
                                  </i>
                                  <b>{data.branch}</b>
                                </div>
                                <div className="icons">
                                  <i className="material-icons">
                                    tablet_mac
                                  </i>
                                  <b>{data.tablets_deployed}</b>
                                </div>
                              </div>
                            </div>

                            <div className="branch-info-list">
                              <span>Branch1</span>
                              <div className="icons">
                                <i className="material-icons">
                                  tablet_mac
                                </i>
                                <b>{data.tablets_deployed}</b>
                              </div>
                            </div>
                            <div className="branch-info-list">
                              <span>Branch2</span>
                              <div className="icons">
                                <i className="material-icons">
                                  tablet_mac
                                </i>
                                <b>{data.tablets_deployed}</b>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="organization-icon is-red">
                            <span />
                          </div>
                          <div className="organization-content">
                            <div className="org-header">
                              <h5>{data.partner_name}</h5>
                              <div className="icon-list">
                                <div className="icons">
                                  <i className="material-icons">
                                    business
                                  </i>
                                  <b>{data.branch}</b>
                                </div>
                                <div className="icons">
                                  <i className="material-icons">
                                    tablet_mac
                                  </i>
                                  <b>{data.tablets_deployed}</b>
                                </div>
                              </div>
                            </div>

                            <div className="branch-info-list">
                              <span>Branch1</span>
                              <div className="icons">
                                <i className="material-icons">
                                  tablet_mac
                                </i>
                                <b>{data.tablets_deployed}</b>
                              </div>
                            </div>
                            <div className="branch-info-list">
                              <span>Branch2</span>
                              <div className="icons">
                                <i className="material-icons">
                                  tablet_mac
                                </i>
                                <b>{data.tablets_deployed}</b>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div className="map-view-footer">
                        <div className="map-view-progress">
                          <div
                            className="progress-item is-red"
                            style={{
                              flex: '0 0 60%',
                              maxWidth: '60%',
                            }}
                          />
                          <div
                            className="progress-item is-green"
                            style={{
                              flex: '0 0 40%',
                              maxWidth: '40%',
                            }}
                          />
                        </div>
                        <div className="progress-value">
                          <span className="red-value">60%</span>
                          <span className="green-value">40%</span>
                        </div>
                      </div>
                    </div> */}
                    {/* <li>
                      <div className="organization-icon">
                        <span>CH</span>
                      </div>
                      <div className="organization-content">
                        <h5>{data.partner_name}</h5>
                      </div>
                    </li> */}
                  </Popup>
                </Marker>
              );
            })}
          {/* </Pane> */}
          <div
            id="center_loader"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: 999,
            }}
          >
            <Loader
              type="BallTriangle"
              color="#c21c2e"
              height={100}
              width={100}
              visible={!isTileLoaded}
            />
            <label
              style={{
                display: !isTileLoaded ? 'block' : 'none',
                // marginLeft: '15px',
                color: 'red',
              }}
            >
              Loading...Please Wait
            </label>
          </div>
          {!activeOutreachButton ? (
            <TimelineChart
              // key={Math.random()}
              // key={this.state.key}
              minValue={minValue}
              maxValue={maxValue}
              playBtn={this.playBtn}
            /> 
          ) : null}
          <Control position="topleft">
            <div className="map-layer-option">
              <a
                className="leaflet-control-map-layer"
                href="#"
                title="map layer"
                onClick={this.toggleMapChange}
              >
                <img src={mapIcon} alt="map" />
              </a>
              <ul
                className="map-layer-list"
                style={
                  activeMapControl
                    ? { display: 'block' }
                    : { display: 'none' }
                }
              >
                <li
                  className={mapType === 'choropleth' ? 'active' : ''}
                >
                  <a
                    role="tab"
                    tabIndex="0"
                    onClick={() => {
                      this.props.handleMapTypeChange('choropleth');
                    }}
                    onKeyUp={() => {
                      this.props.handleMapTypeChange('choropleth');
                    }}
                  >
                    choropleth
                  </a>
                </li>
                <li
                  className={mapType === 'branches' ? 'active' : ''}
                >
                  <a
                    role="tab"
                    tabIndex="0"
                    onClick={() => {
                      this.props.handleMapTypeChange('branches');
                    }}
                    onKeyDown={() => {
                      this.props.handleMapTypeChange('branches');
                    }}
                  >
                    branches
                  </a>
                </li>
              </ul>
            </div>
          </Control>
        </Map>
        {/* <ScrollTab changetheme={this.props.changetheme} /> */}
      </>
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
