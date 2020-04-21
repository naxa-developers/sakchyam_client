import React, { Component } from 'react';
import {
  Map,
  TileLayer,
  // Popup,
  // Marker,
  CircleMarker,
  Pane,
  LayersControl,
} from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import Axios from 'axios';
import 'react-leaflet-markercluster/dist/styles.min.css';
// import MarkerClusterGroup from "react-leaflet-markercluster";
// import 'leaflet.featuregroup.subgroup';
import VectorGridComponent from './VectortileComponent';
import BaseLayers from './BaselayersComponent';
// import MarkerClusterComponent from './MarkerClusterComponent';

// let map = {};
class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    // map =
    //   this.props.mapRef.current &&
    //   this.props.mapRef.current.leafletElement;
    // console.log(map, "mapcomponent map")
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { provinceBbox, selectedBaseLayer } = this.state;
    const position = [27.7, 85.4];
    return (
      <Map
        // preferCanvas
        animate
        zoom={8}
        maxZoom={18}
        attributionControl
        zoomControl
        // doubleClickZoom
        // scrollWheelZoom
        bounds={this.state.bounds}
        // ref={this.props.mapRef}
        center={position}
        style={{ height: '100vh' }}
        onClick={this.onClick}
        // zoomDelta = {0.5}
        zoomSnap={0.5}
      >
        <BaseLayers />
        {/* <VectorGridComponent
          mapRef={this.props.mapRef}
          provinceCounts={this.props.provinceCounts}
        /> */}
        {/* <MarkerClusterComponent
          mapRef={this.props.mapRef}
          innovationData={this.props.innovationData}
          viewDetailsClicked={this.handleViewDetailsClick}
        /> */}
      </Map>
    );
  }
}
export default MapComponent;
