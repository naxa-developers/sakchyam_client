import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/src/css/mapbox-gl.css';
import VectorTileMapbox from './VectorTileMapbox';

class MapboxPartnership extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
    };
  }

  addMap = () => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZ2VvbWF0dXBlbiIsImEiOiJja2E5bDFwb2swdHNyMnNvenZxa2Vpeml2In0.fCStqdwmFYFP-cUvb5vMCw';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [84.0, 27.5], // starting position [lng, lat]
      zoom: 7, // starting zoom
    });
    // console.log(map, 'map');
    this.setState({ map });
  };

  componentDidMount() {
    this.addMap();
  }

  render() {
    const {
      state: { map },
      props: { vectorTileUrl },
    } = this;
    return (
      <div id="map">
        {map && (
          <div>
            <VectorTileMapbox
              vectorTileUrl={vectorTileUrl}
              map={map}
              color="#ffffff"
            />
            {/* <MarkerCluster
              filteredByPartner={filteredByPartner}
              handleActiveClickPartners={handleActiveClickPartners}
              map={map}
              geojsonData={automationLeftSidePartnerData}
            /> */}
            {/* <MigrationLines
              map={map}
              migrationData={migrationArray}
            /> */}
          </div>
        )}
      </div>
    );
  }
}

export default MapboxPartnership;
