import React, { Component } from 'react';
import { Map } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import Axios from 'axios';
import 'leaflet.featuregroup.subgroup';
// import Select from 'react-select';
// import Control from 'react-leaflet-control';
import { connect } from 'react-redux';
import VectorGrid from './VectorGrid';
import BaseLayers from './BaselayersComponent';
import MarkerClusterComponent from './MarkerClusterComponent';
import {
  getAutomationDataByPartner,
  getAutomationDataByProvince,
} from '../../../actions/automation.actions';
// import ScrollTab from './ScrollTab';
// import IosSwitch from '../../Includes/IosSwitch';

const map = {};
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
    this.props.getAutomationDataByPartner();
    this.props.getAutomationDataByProvince();
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

  render() {
    const {
      automationDataByPartner,
      automationDataByProvince,
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
    const position = [27.7, 85.4];
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
    ];

    const headerHeight =
      document.getElementsByClassName('site-header')[0] &&
      document.getElementsByClassName('site-header')[0].offsetHeight;

    const choroplethtype = 'province'; // change this to (mun,province) change the level
    const choroplethInputData =
      choroplethtype === 'province'
        ? this.props.provinceCounts
        : this.props.agegroupdata;
    console.log(choroplethInputData, 'choroplethInputData');

    const colors =
      this.props.colorArray && this.props.colorArray.length > 0
        ? this.props.colorArray
        : [
            '#fff3d4',
            '#FED976',
            '#FEB24C',
            '#FD8D3C',
            '#FC4E2A',
            '#E31A1C',
            '#BD0026',
            '#800026',
          ];

    const vectorGridInputUrl =
      choroplethtype === 'province'
        ? 'https://dvsnaxa.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}'
        : 'https://dvsnaxa.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}';
    // Filter With Province
    // : 'https://dvsnaxa.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}&province_id=1';

    const inputDivisions =
      choroplethtype === 'province'
        ? []
        : [0, 5000, 10000, 15000, 20000, 25000, 30000];

    const inputStyle =
      choroplethtype === 'province'
        ? {
            fillColor: '#a3b7e3',
            fillOpacity: 1,
            weight: 1.5,
            opacity: 1,
            color: '#a3b7e3',
            fill: true,
          }
        : {
            fillColor: '#a3b7e3',
            fillOpacity: 1,
            weight: 1.5,
            opacity: 0.1,
            color: '#a3b7e3',
            fill: true,
          };
    console.log(automationDataByProvince, 'data');
    return (
      <>
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
          style={{ height: 500, width: 800 }}
          onClick={this.onClick}
          // zoomDelta = {0.5}
          zoomSnap={0.5}
        >
          {/* <IosSwitch/> */}
          <BaseLayers initialbase="mapbox" />
          {/* {choroplethInputData&&choroplethInputData.length >0 &&  */}
          <VectorGrid
            changetheme={this.props.changetheme}
            key="0"
            mapRef={this.props.mapRef}
            style={inputStyle} // Province style setting
            provinceCounts={[20, 12, 30, 4, 5, 26, 17]} // province counts for circles at center of province
            mode="both" // options- choropleth, provinceCircles, both
            choroplethData={automationDataByProvince} //
            color="#55b110" // single color gradient
            // legendDivisions = {10} //no of divisions in legend
            colorArray={colors} // multi color custom gradient
            divisions={inputDivisions}
            // divisions={[0, 5, 10, 15, 20]}
            // choroplethTitle = {"New Choropleth"}
            vectorGridUrl={vectorGridInputUrl} // vectortile url setting
          />
          {/* } */}
          <MarkerClusterComponent
            mapRef={this.props.mapRef}
            innovationData={provinceAllData}
            activelayer={this.props.activelayer}
            markertoplot={this.props.markertoplot}
            iconColor="#FF0000"
            mode="circle" // options - circle, circleIcon, marker
          />
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
  getAutomationDataByPartner,
  getAutomationDataByProvince,
})(MapComponent);
