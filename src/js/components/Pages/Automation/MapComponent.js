import React, { Component } from 'react';
import {
  Map,
  // TileLayer,
  // Popup,
  // Marker,
  // CircleMarker,
  // Pane,
  // LayersControl,
} from 'react-leaflet';
import Axios from 'axios';
import Choropleth from 'react-leaflet-choropleth';
import L from 'leaflet';
// import ProvinceGeojson from '../../../../data/provincemerge.geojson';

import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
// import MarkerClusterGroup from 'react-leaflet-markercluster';
// import 'leaflet.featuregroup.subgroup';
import VectorGridComponent from './VectortileComponent';
import BaseLayers from './BaselayersComponent';
// import MarkerClusterComponent from './MarkerClusterComponent';

// let map = {};
class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceAllData: null,
      provinceBbox: [],
      selectedBaseLayer: 'mapbox',
      bounds: [
        [26.086388149394875, 79.8651123046875],
        [30.68988785772121, 88.39599609375001],
      ],
    };
  }

  handleViewDetailsClick = data => {
    this.props.viewDetailsClicked(data); // pass again back to parent
  };

  componentDidMount() {
    Axios.get(
      // 'http://hydromap.nitifoundation.org/static/assets/data/provincemerge.geojson',
      'https://covidapi.mohp.gov.np/api/v1/health-facility/',
    ).then(res => {
      console.log(res.data);
      this.setState({ provinceAllData: res.data });
    });
    // map =
    //   this.props.mapRef.current &&
    //   this.props.mapRef.current.leafletElement;
    // console.log(map, "mapcomponent map")
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const {
      provinceBbox,
      selectedBaseLayer,
      provinceAllData,
    } = this.state;

    const style = {
      fillColor: '#F28F3B',
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.6,
    };
    const position = [27.7, 85.4];
    // console.log(ProvinceGeojson, 'province');
    return (
      <Map
        // preferCanvas
        animate
        zoom={7}
        maxZoom={18}
        attributionControl
        zoomControl
        // doubleClickZoom
        // scrollWheelZoom
        bounds={this.state.bounds}
        ref={this.props.mapRef}
        center={position}
        style={{ height: '100vh' }}
        onClick={this.onClick}
        // zoomDelta = {0.5}
        zoomSnap={0.5}
      >
        <BaseLayers />
        {/* {provinceAllData && (
          <Choropleth
            data={provinceAllData && provinceAllData.features}
            valueProperty={feature => feature.properties.OBJECTID}
            visible={feature => feature.id !== active.id}
            scale={[
              '#B30625',
              '#CF0F38',
              '#E06A78',
              '#FBCAD4',
              '#B30625',
              '#E06A78',
              '#F02840',
            ]}
            steps={7}
            mode="e"
            style={style}
            onEachFeature={(feature, layer) => {
              layer.bindPopup(feature.properties.STATE);
            }}
            ref={el => {
              this.choropleth = el.leafletElement;
            }}
          />
        )} */}
        <VectorGridComponent
          mapRef={this.props.mapRef}
          provinceCounts={[1, 2, 3, 4, 5, 6, 7]}
          // provinceCounts={7}
        />
        {/* {provinceAllData && ( */}
        {/* <MarkerClusterComponent
          mapRef={this.props.mapRef}
          innovationData={
            provinceAllData === null ? [] : provinceAllData
          }
          viewDetailsClicked={this.handleViewDetailsClick}
        /> */}
        {/* )} */}
      </Map>
    );
  }
}
export default MapComponent;
