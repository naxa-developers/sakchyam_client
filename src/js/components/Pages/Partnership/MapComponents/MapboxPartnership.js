import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/src/css/mapbox-gl.css';
import VectorTileMapbox from './VectorTileMapbox';

class MapboxPartnership extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 84,
      lat: 27,
      zoom: 7,
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZ2VvbWF0dXBlbiIsImEiOiJja2E5bDFwb2swdHNyMnNvenZxa2Vpeml2In0.fCStqdwmFYFP-cUvb5vMCw';
    global.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
    });
  }

  render() {
    return (
      <>
        <div
          // eslint-disable-next-line no-return-assign
          ref={el => (this.mapContainer = el)}
          className="mapContainer"
        >
          {global.map && <VectorTileMapbox />}
        </div>
      </>
    );
  }
}

export default MapboxPartnership;
