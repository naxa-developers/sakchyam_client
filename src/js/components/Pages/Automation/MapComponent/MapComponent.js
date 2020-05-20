import React, { Component } from 'react';
import { Map, Popup, Marker } from 'react-leaflet';
import Loader from 'react-loader-spinner';
import 'leaflet/dist/leaflet.css';

import L, { CircleMarker } from 'leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css';
import Axios from 'axios';
import 'leaflet.featuregroup.subgroup';
import '../../../../../library/canvasFlowmapLayer';
import { connect } from 'react-redux';
import randomGeojson from '../../../../../data/randomGeojson.json';
import ActiveIcon from '../../../../../img/fullactive.png';
// import Select from 'react-select';
// import Control from 'react-leaflet-control';
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
    };
  }

  componentDidMount() {
    // this.props.getAllAutomationDataByPartner();

    const map = this.props.mapRef.current.leafletElement;
    // const marker = L.marker([84, 27], { icon: greenIcon }).addTo(map);
    console.log(map, 'mapref');

    const geoJsonFeatureCollection = {
      type: 'FeatureCollection',
      features: CsvFile.map(function(datum) {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [datum.s_lon, datum.s_lat],
          },
          properties: datum,
        };
      }),
    };
    console.log(geoJsonFeatureCollection, 'geoJsonFeatureCollection');

    // const oneToManyFlowmapLayer = L.canvasFlowmapLayer(
    //   geoJsonFeatureCollection,
    //   {
    //     originAndDestinationFieldIds: {
    //       originUniqueIdField: 's_city_id',
    //       originGeometry: {
    //         x: 's_lon',
    //         y: 's_lat',
    //       },
    //       destinationUniqueIdField: 'e_city_id',
    //       destinationGeometry: {
    //         x: 'e_lon',
    //         y: 'e_lat',
    //       },
    //     },
    //     pathDisplayMode: 'selection',
    //     animationStarted: true,
    //     animationEasingFamily: 'Cubic',
    //     animationEasingType: 'In',
    //     animationDuration: 2000,
    //   },
    // ).addTo(map);
    // oneToManyFlowmapLayer.on('click', function(e) {
    //   if (e.sharedOriginFeatures.length) {
    //     oneToManyFlowmapLayer.selectFeaturesForPathDisplay(
    //       e.sharedOriginFeatures,
    //       'SELECTION_NEW',
    //     );
    //   }
    //   if (e.sharedDestinationFeatures.length) {
    //     oneToManyFlowmapLayer.selectFeaturesForPathDisplay(
    //       e.sharedDestinationFeatures,
    //       'SELECTION_NEW',
    //     );
    //   }
    // });

    // // immediately select an origin point for Bezier path display,
    // // instead of waiting for the first user click event to fire
    // oneToManyFlowmapLayer.selectFeaturesForPathDisplayById(
    //   's_city_id',
    //   373,
    //   true,
    //   'SELECTION_NEW',
    // );

    // since this demo is using the optional "pathDisplayMode" as "selection",
    // it is up to the developer to wire up a click or mouseover listener
    // and then call the "selectFeaturesForPathDisplay()" method to inform the layer
    // which Bezier paths need to be drawn
    // oneToManyFlowmapLayer.on('click', function(e) {
    //   if (e.sharedOriginFeatures.length) {
    //     oneToManyFlowmapLayer.selectFeaturesForPathDisplay(
    //       e.sharedOriginFeatures,
    //       'SELECTION_NEW',
    //     );
    //   }
    //   if (e.sharedDestinationFeatures.length) {
    //     oneToManyFlowmapLayer.selectFeaturesForPathDisplay(
    //       e.sharedDestinationFeatures,
    //       'SELECTION_NEW',
    //     );
    //   }
    // });

    // // immediately select a few origin points for Bezier path display,
    // // instead of waiting for the first user click event to fire
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

  fetchingForDropdown = name => {
    const key =
      name === 'province'
        ? 'province_api'
        : name === 'district'
        ? 'district_api'
        : name === 'municipality'
        ? 'municipality_api'
        : '';
    const url = `https://iomapi.naxa.com.np/api/v1/${key}`;
    const prvncDist =
      name === 'district'
        ? 'province'
        : name === 'municipality'
        ? 'district'
        : '';

    Axios.get(url).then(response => {
      const array = [];

      response.data.data.map(e => {
        const object = {
          value: e.id,
          label: e.name,
          [prvncDist]: e[prvncDist.toString()],
        };
        array.push(object);
        return true;
      });
      this.setState({ [name]: array });
    });
  };

  markerClickProvinceSelect = clickedValue => {
    this.props.handleActiveClickPartners(clickedValue);
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
    } = this.state;
    const {
      dataTypeLevel,
      filteredProvinceChoropleth,
      vectorGridInputUrl,
      vectorGridKey,
      color,
      handleProvinceClick,
      activeOutreachButton,
    } = this.props;
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
        : [0, 5, 10, 25, 50, 100, 150, 200, 400];

    const inputStyle =
      choroplethtype === 'province'
        ? {
            fillColor: '#a3b7e3',
            fillOpacity: 0,
            weight: 1.5,
            opacity: 1,
            color: '#a3b7e3',
            fill: true,
          }
        : {
            fillColor: 'white',
            fillOpacity: 0.7,
            weight: 1.5,
            opacity: 0.4,
            color: '#a3b7e3',
            fill: true,
          };

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
          {activeOutreachButton &&
            automationChoroplethData &&
            filteredProvinceChoropleth && (
              <VectorGrid
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
                choroplethTitle="Automation Deployed"
                // provinceCounts={[20, 12, 30, 4, 5, 26, 17]} // province counts for circles at center of province
                provinceCounts={
                  filteredProvinceChoropleth &&
                  filteredProvinceChoropleth
                } // province counts for circles at center of province
                mode="choropleth" // options- choropleth, provinceCircles, both
                choroplethData={automationChoroplethData} //
                // color={color} // single color gradient
                // legendDivisions = {10} //no of divisions in legend
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
          {automationLeftSidePartnerData &&
            automationLeftSidePartnerData.map(data => {
              return (
                <Marker
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
                    <li>
                      <div className="organization-icon">
                        <span>CH</span>
                      </div>
                      <div className="organization-content">
                        <h5>{data.partner_name}</h5>
                        {/* <div className="icon-list">
                          <div className="icons">
                            <i className="material-icons">
                              tablet_mac
                            </i>
                            <b>{data.tablets_deployed}</b>
                          </div>
                          <div className="icons">
                            <i className="material-icons">business</i>
                            <b>{data.branch}</b>
                          </div>
                          <div className="icons">
                            <i className="material-icons">people</i>
                            <b>{data.beneficiary}</b>
                          </div>
                        </div>
                        <div className="orgnization-info">
                          <a href="#">
                            Province
                            <span>{data.province_covered}</span>
                          </a>
                          <a href="#">
                            District
                            <span>{data.district_covered}</span>
                          </a>
                          <a href="#">
                            Local units
                            <span>{data.municipality_covered}</span>
                          </a>
                        </div> */}
                      </div>
                    </li>
                  </Popup>
                </Marker>
              );
            })}
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
              visible={dataLoading}
            />
            <label
              style={{
                display: dataLoading ? 'block' : 'none',
                // marginLeft: '15px',
                color: 'red',
              }}
            >
              Loading...Please Wait
            </label>
          </div>
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
