import React, { Component } from 'react';
// import 'mapbox-gl/src/css/svg/mapboxgl-ctrl-compass.svg';
// import 'mapbox-gl/src/css/svg/mapboxgl-ctrl-geolocate.svg';
// import 'mapbox-gl/src/css/svg/mapboxgl-ctrl-zoom-in.svg';
// import 'mapbox-gl/src/css/svg/mapboxgl-ctrl-zoom-out.svg';
import { connect } from 'react-redux';
import VectorTileMapbox from './VectorTileMapbox';
import {
  getMapDataByProvince,
  getMapDataByDistrict,
  getMapDataByMunicipality,
  filterMapDataOfCircleMarkerWithViewDataBy,
  getPartnershipAllData,
} from '../../../../actions/partnership.actions';
import PopUp from '../common/divisionInfoPopUp';
import DivisionInfoPopUpLeft from '../common/divisionInfoPopupLeft';

class MapboxPartnership extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupData: [],
      leftPopupData: [],
      // map: null,
    };
    this.markerRef = React.createRef();
    this.keyRef = React.createRef();
    this.circleLegendRef = React.createRef();
    this.pieSquareLegend = React.createRef();
    this.markerPiePopupRef = React.createRef();
  }

  componentDidMount() {
    this.props.getMapDataByProvince('investment');
    this.props.getMapDataByDistrict('investment');
    this.props.getPartnershipAllData();
    this.props.getMapDataByMunicipality('investment');
    this.props.addMap();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      selectedProvince,
      selectedDistrict,
      selectedMunicipality,
    } = this.props;
    // if (prevProps.mapViewDataBy !== this.props.mapViewDataBy) {
    // }
    // if (prevProps.mapViewBy !== this.props.mapViewBy) {
    if (prevProps.mapViewDataBy !== this.props.mapViewDataBy) {
      this.setPopupData({
        propsdata: undefined,
      });
      this.setPopupData({
        leftPopupData: undefined,
      });
      let view = 'investment';
      if (this.props.mapViewDataBy === 'allocated_beneficiary') {
        view = 'total_beneficiary';
      } else if (this.props.mapViewDataBy === 'allocated_budget') {
        view = 'total_beneficiary';
      }
      // this.props.getMapDataByProvince(view);
      // if (this.props.mapViewDataBy !== 'investment_focus') {
      this.props.filterMapDataOfCircleMarkerWithViewDataBy(
        view,
        this.props.mapViewBy,
        { selectedMunicipality, selectedDistrict, selectedProvince },
      );
      // }
    }
    if (prevProps.mapViewBy !== this.props.mapViewBy) {
      let view = 'investment';
      if (this.props.mapViewDataBy === 'allocated_beneficiary') {
        view = 'total_beneficiary';
      } else if (this.props.mapViewDataBy === 'allocated_budget') {
        view = 'total_beneficiary';
      }
      this.props.filterMapDataOfCircleMarkerWithViewDataBy(
        view,
        this.props.mapViewBy,
        { selectedMunicipality, selectedDistrict, selectedProvince },
      );
    }
    // if (prevProps.vectorTileUrl !== this.props.vectorTileUrl) {
    //   //
    //   // this.changeGrades();
    //   this.props.filterMapDataOfCircleMarkerWithViewDataBy(
    //     this.props.mapViewDataBy,
    //     this.props.mapViewBy,
    //   );
    // }
  }

  setPopupData = data => {
    this.setState({ popupData: data });
  };

  setLeftPopupData = data => {
    this.setState({ leftPopupData: data });
  };

  render() {
    const { mapViewBy, setMapViewBy } = this.props;
    const inputDivisions =
      mapViewBy === 'province'
        ? [1, 14, 26, 39, 51]
        : mapViewBy === 'district'
        ? [1, 9, 17, 24, 32]
        : mapViewBy === 'municipality'
        ? [1, 7, 12, 18, 23]
        : [0, 2, 4, 6, 8, 10, 12, 14, 20];
    const {
      state: { popupData, leftPopupData },
      props: { vectorTileUrl, mapViewDataBy, map },
    } = this;
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
              <div
                className="pie-mapbox-popup"
                ref={this.markerPiePopupRef}
              />
              <VectorTileMapbox
                markerPiePopupRef={this.markerPiePopupRef}
                keyRef={this.keyRef}
                circleLegendRef={this.circleLegendRef}
                pieSquareLegend={this.pieSquareLegend}
                handleProvinceClick={this.props.handleProvinceClick}
                handleFederalClickOnMap={
                  this.props.handleFederalClickOnMap
                }
                markerRef={this.markerRef}
                setMapViewBy={setMapViewBy}
                mapViewBy={mapViewBy}
                mapViewDataBy={mapViewDataBy}
                choroplethData={filteredMapData}
                circleMarkerData={mapDataForCircleMarker}
                vectorTileUrl={vectorTileUrl}
                map={map}
                setPopupData={this.setPopupData}
                setLeftPopupData={this.setLeftPopupData}
                divisions={inputDivisions}
                label
                color="#007078"
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
              {mapViewDataBy && (
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
                      // height="300"
                      // width="450"
                    />
                  </div>
                </div>
              )}
              <PopUp data={popupData} mapViewBy={mapViewBy} />
              <DivisionInfoPopUpLeft data={leftPopupData} />
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
