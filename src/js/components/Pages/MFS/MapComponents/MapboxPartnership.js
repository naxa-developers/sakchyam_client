import React, { Component } from 'react';
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
      // map: null,
    };
    this.markerRef = React.createRef();
    this.keyRef = React.createRef();
    this.circleLegendRef = React.createRef();
    this.pieSquareLegend = React.createRef();
  }

  // addMap = () => {
  //   mapboxgl.accessToken =
  //     'pk.eyJ1IjoiZ2VvbWF0dXBlbiIsImEiOiJja2E5bDFwb2swdHNyMnNvenZxa2Vpeml2In0.fCStqdwmFYFP-cUvb5vMCw';
  //   const map = new mapboxgl.Map({
  //     container: 'map',
  //     style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  //     center: [84.0, 27.5], // starting position [lng, lat]
  //     zoom: 7, // starting zoom
  //   });
  //   map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

  //   // console.log(map, 'map');
  //   this.setState({ map });
  // };

  componentDidMount() {
    this.props.addMap();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      selectedProvince,
      selectedDistrict,
      selectedMunicipality,
    } = this.props;
  }

  render() {
    const { mapViewBy, setMapViewBy } = this.props;
    const inputDivisions =
      mapViewBy === 'province'
        ? [0, 10, 20, 30, 40, 50, 60, 70]
        : [0, 2, 4, 6, 8, 10, 12, 14, 20];
    const {
      // state: {  },
      props: { vectorTileUrl, mapViewDataBy, map },
    } = this;
    const { mfsChoroplethData, mfsPieData } = this.props.mfsReducer;
    return (
      <>
        <div id="key" ref={this.keyRef} />
        <div
          id="map"
          style={{
            position: 'inherit',
            top: 'unset',
            bottom: 'unset',
            width: '100%',
          }}
        >
          {map && (
            <div>
              <VectorTileMapbox
                keyRef={this.keyRef}
                handleProvinceClick={this.props.handleProvinceClick}
                handleFederalClickOnMap={
                  this.props.handleFederalClickOnMap
                }
                markerRef={this.markerRef}
                setMapViewBy={setMapViewBy}
                mapViewBy={mapViewBy}
                mapViewDataBy={mapViewDataBy}
                choroplethData={mfsChoroplethData}
                vectorTileUrl={vectorTileUrl}
                map={map}
                circleMarkerData={mfsPieData}
                // divisions={inputDivisions}
                label
                color="#5014e4"
              />
              {/* <div
                // id="bargraph"
                // className="marker mapboxgl-marker mapboxgl-marker-anchor-center"
                ref={this.markerRef}
                // style={{
                // backgroundImage: url(
                //   'https://placekitten.com/g/40/40',
                // ),
                // width: '40px',
                // height: '40px',
                // }}
              /> */}
              {/* {mapViewDataBy && ( */}
              <div className="legend-wrapper">
                <div
                  // id="markercircleLegend"
                  className="markercircleLegend"
                  ref={this.circleLegendRef}
                />
                <div id="markerPieLegend">
                  <svg
                    // id="pieSquareLegend"
                    className="pieSquareLegend"
                    ref={this.pieSquareLegend}
                  />
                </div>
              </div>
              {/* )} */}
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
      </>
    );
  }
}

const mapStateToProps = ({ mfsReducer }) => ({
  mfsReducer,
});

export default connect(mapStateToProps, {})(MapboxPartnership);
