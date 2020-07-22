import React, { Component } from 'react';
import { connect } from 'react-redux';
import VectorTileMapbox from './VectorTileMapbox';
import {
  getMapDataByProvince,
  getMapDataByDistrict,
  getMapDataByMunicipality,
  filterMapDataOfCircleMarkerWithViewDataBy,
  getPartnershipAllData,
} from '../../../../actions/partnership.actions';

class MapboxPartnership extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // map: null,
    };
    this.markerRef = React.createRef();
    this.keyRef = React.createRef();
  }

  componentDidMount() {
    this.props.getMapDataByProvince();
    this.props.getMapDataByDistrict();
    this.props.getPartnershipAllData();
    this.props.getMapDataByMunicipality();
    this.props.addMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.mapViewDataBy !== this.props.mapViewDataBy) {
      if (this.props.mapViewDataBy !== 'investment_focus') {
        this.props.filterMapDataOfCircleMarkerWithViewDataBy(
          this.props.mapViewDataBy,
          this.props.mapViewBy,
        );
      }
    }
  }

  render() {
    const {
      mapViewBy,
      setMapViewBy,
      vectorTileUrl,
      mapViewDataBy,
      map,
    } = this.props;
    const inputDivisions =
      mapViewBy === 'province'
        ? [0, 10, 20, 30, 40, 50, 60, 70]
        : [0, 2, 4, 6, 8, 10, 12, 14, 20];

    const {
      filteredMapData,
      mapDataForCircleMarker,
    } = this.props.partnershipReducer;
    return (
      <>
        <div id="key" ref={this.keyRef} />
        <div id="map">
          {map && (
            <div>
              <VectorTileMapbox
                keyRef={this.keyRef}
                handleFederalClickOnMap={
                  this.props.handleFederalClickOnMap
                }
                markerRef={this.markerRef}
                setMapViewBy={setMapViewBy}
                mapViewBy={mapViewBy}
                mapViewDataBy={mapViewDataBy}
                vectorTileUrl={vectorTileUrl}
                map={map}
                choroplethData={filteredMapData}
                circleMarkerData={mapDataForCircleMarker}
                // divisions={inputDivisions}
                label
                color="#eb5149"
              />
              <div ref={this.markerRef} />
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});
export default connect(mapStateToProps, {
  getMapDataByProvince,
  getMapDataByDistrict,
  getMapDataByMunicipality,
  filterMapDataOfCircleMarkerWithViewDataBy,
  getPartnershipAllData,
})(MapboxPartnership);
