/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { Map, Popup, Marker, Pane, Tooltip } from 'react-leaflet';
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
import Loading from '../../../common/Loading';
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
      provinceAllData: [],
      bounds: [
        [30.441792349047404, 87.91087222877736],
        [25.504959616615796, 80.4671531221034],
      ],
      minValue: '1/1/2015',
      maxValue: '1/1/2020',
      key: 1,
      playClick: false,
    };
  }

  moveEnd = () => {
    setTimeout(() => {
      if (global.migrationLayer) {
        global.migrationLayer.pause();
      }
    }, 500);
  };

  markerClickProvinceSelect = clickedValue => {
    this.props.handleActiveClickPartners(clickedValue);
  };

  getYear = minDate => {
    const d = new Date(minDate);

    const day = d.getDate();
    const month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    const year = d.getFullYear();

    const dateStr = `${month}/${day}/${year}`;
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
  };

  toggleMapChange = () => {
    this.setState(prevState => ({
      activeMapControl: !prevState.activeMapControl,
    }));
  };

  render() {
    const {
      automationChoroplethData,
      dataLoading,
      automationLeftSidePartnerData,
      automationTableData,
      tableDataLoading,
    } = this.props.automationReducer;
    const {
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
    return (
      <>
        <Map
          doubleClickZoom={this.props.zoomControl}
          onMoveEnd={this.moveEnd}
          onZoomEnd={this.moveEnd}
          scrollWheelZoom={false} // disable original zoom function
          smoothWheelZoom // enable smooth zoom
          smoothSensitivity={2}
          animate
          // zoom={12}
          maxZoom={18}
          minZoom={5}
          attributionControl
          zoomControl
          // doubleClickZoom
          // scrollWheelZoom
          // onMoveend={this.onMapMoveEnd}
          bounds={this.state.bounds}
          ref={this.props.mapRef}
          center={position}
          // style={{ height: 500, width: 800 }}
          onClick={this.onClick}
          // zoomDelta = {0.5}
          zoomSnap={0.5}
        >
          <BaseLayers initialbase="mapbox" />

          <VectorGrid
            activeClickPartners={activeClickPartners}
            dataTypeLevel={dataTypeLevel}
            activeOutreachButton={activeOutreachButton}
            handleVectorGridFirstLoad={this.handleVectorGridFirstLoad}
            vectorGridFirstLoad={vectorGridFirstLoad}
            handleTileLoadEnd={this.props.handleTileLoadEnd}
            isTileLoaded={isTileLoaded}
            handleTileLoad={this.props.handleTileLoad}
            legend={!activeOutreachButton ? false : true}
            handleProvinceClick={handleProvinceClick}
            changetheme={this.props.changetheme}
            key={vectorGridKey}
            mapRef={this.props.mapRef}
            style={inputStyle} // Province style setting
            choroplethTitle="Number of Tablet Deployed"
            mode="choropleth" // options- choropleth, provinceCircles, both
            choroplethData={
              !activeOutreachButton ? [] : automationChoroplethData
            } //
            color="#007078"
            vectorGridUrl={vectorGridInputUrl} // vectortile url setting
          />

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
                  </Popup>
                  <Tooltip>
                    {/* <div className="leaflet-popup-content-wrapper"> */}
                    <div className="leaflet-popup-content">
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
                    </div>
                    {/* </div> */}
                  </Tooltip>
                </Marker>
              );
            })}
          {/* </Pane> */}
          <Loading loaderState={dataLoading && dataLoading} />
          {/* {!activeOutreachButton ? ( */}
          <TimelineChart
            activeOutreachButton={activeOutreachButton}
            minValue={minValue}
            maxValue={maxValue}
            playBtn={this.playBtn}
          />
          {/* ) : null} */}

          <Control position="topleft">
            <div
              className="map-layer-option"
              style={
                tableDataLoading
                  ? {
                      opacity: 0.3,
                      pointerEvents: 'none',
                    }
                  : {
                      opacity: 1,
                      pointerEvents: 'auto',
                    }
              }
            >
              <a
                className="leaflet-control-map-layer"
                // href="#"
                role="tab"
                tabIndex="0"
                title="map layer"
                onClick={this.toggleMapChange}
                onKeyDown={this.toggleMapChange}
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
