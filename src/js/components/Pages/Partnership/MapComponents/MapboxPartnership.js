import React, { Component } from 'react';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/src/css/mapbox-gl.css';
// import 'mapbox-gl/src/css/svg/mapboxgl-ctrl-compass.svg';
// import 'mapbox-gl/src/css/svg/mapboxgl-ctrl-geolocate.svg';
// import 'mapbox-gl/src/css/svg/mapboxgl-ctrl-zoom-in.svg';
// import 'mapbox-gl/src/css/svg/mapboxgl-ctrl-zoom-out.svg';
import { connect } from 'react-redux';
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
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // console.log(map, 'map');
    this.setState({ map });
  };

  componentDidMount() {
    this.addMap();
  }

  render() {
    const inputDivisions = [
      0,
      220299149,
      420299149,
      620299149,
      820299149,
      920299149,
      1020299149,
    ];
    const {
      state: { map },
      props: { vectorTileUrl },
    } = this;
    const { filteredMapData } = this.props.partnershipReducer;
    return (
      <div id="map">
        {map && (
          <div>
            <VectorTileMapbox
              choroplethData={filteredMapData}
              vectorTileUrl={vectorTileUrl}
              map={map}
              divisions={inputDivisions}
              // label = {true}
              color="#007078"
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

const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});
export default connect(mapStateToProps, {})(MapboxPartnership);
