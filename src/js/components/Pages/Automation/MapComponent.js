import React, { Component } from 'react';
import { Map } from 'react-leaflet';
import Loader from 'react-loader-spinner';

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
  getAutomationDataByDistrict,
  getAutomationDataByMunicipality,
  filterAutomationDataForVectorTiles,
} from '../../../actions/automation.actions';
import automationReducerReducer from '../../../reducers/automationReducer.reducer';
// import ScrollTab from './ScrollTab';
// import IosSwitch from '../../Includes/IosSwitch';

const map = {};
class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinceBbox: [],
      provinceAllData: [],
      dataTypeLevel: 'province',
      selectedBaseLayer: 'harje',
      vectorGridInputUrl:
        'https://dvsnaxa.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}',
      vectorGridKey: '0',
      bounds: [
        [25.898761936567023, 80.00244140625001],
        [30.732392734006083, 88.79150390625],
      ],
      province: null,
      district: null,
      color: '',
      municipality: null,
      SelectedProvince: null,
      SelectedDistrict: null,
      SelectedMunicipality: null,
      filteredProvinceChoropleth: null,
    };
  }

  componentDidMount() {
    // this.props.getAutomationDataByPartner();
    this.props.getAutomationDataByProvince();
    this.props.getAutomationDataByDistrict();
    this.props.getAutomationDataByMunicipality();
    // this.props.filterAutomationDataForVectorTiles();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      automationReducer: {
        automationChoroplethData,
        automationDataByProvince,
      },
    } = this.props;
    // if (
    //   prevProps.automationReducer.automationDataByProvince !==
    //   automationDataByProvince
    // ) {
    //   this.props.filterAutomationDataForVectorTiles();
    // }
    if (
      prevProps.automationReducer.automationChoroplethData !==
      automationChoroplethData
    ) {
      console.log('if automationDataByProvince updated');
      this.getFilteredAutomationData();
      // this.getFilteredAutomationData();
      // console.log(a, 'aaaa');
    }
  }

  getFilteredAutomationData = () => {
    const {
      automationReducer: { automationChoroplethData },
    } = this.props;
    console.log(automationChoroplethData, 'sss');
    const a =
      automationChoroplethData &&
      automationChoroplethData.map(data => {
        return data.count;
      });
    this.setState({ filteredProvinceChoropleth: a });
  };

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

  handleProvinceClick = code => {
    const { vectorGridInputUrl, dataTypeLevel } = this.state;
    if (dataTypeLevel === 'province') {
      const districtFilterUrl = `https://dvsnaxa.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}&province_id=${code}`;
      this.setState({
        vectorGridInputUrl: districtFilterUrl,
        vectorGridKey: Math.random(),
      });
    } else if (dataTypeLevel === 'district') {
      const districtFilterUrl = `https://dvsnaxa.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}&district_id=${code}`;
      this.setState({
        vectorGridInputUrl: districtFilterUrl,
        vectorGridKey: Math.random(),
      });
    }
    // else if (dataTypeLevel === 'municipality') {
    //   const districtFilterUrl = `https://dvsnaxa.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}`;
    //   this.setState({
    //     vectorGridInputUrl: districtFilterUrl,
    //     vectorGridKey: Math.random(),
    //   });
    // }
    // console.log(
    //   `https://dvsnaxa.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}&province_id=${code}`,
    // );
  };

  handleStateLevel = e => {
    // console.log(e.target.value, 'target value');
    this.setState({ filteredProvinceChoropleth: null });
    if (e.target.value === 'province') {
      this.setState({
        vectorGridInputUrl:
          'https://dvsnaxa.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}',
        vectorGridKey: '0',
        color: '#55b110',
      });
      this.props.filterAutomationDataForVectorTiles(e.target.value);
    } else if (e.target.value === 'district') {
      this.setState({
        vectorGridInputUrl:
          'https://dvsnaxa.naxa.com.np/federal/district.mvt/?tile={z}/{x}/{y}',
        vectorGridKey: '1',
        color: '#FF0000',
      });
      this.props.filterAutomationDataForVectorTiles(e.target.value);
    } else if (e.target.value === 'municipality') {
      this.setState({
        vectorGridInputUrl:
          'https://dvsnaxa.naxa.com.np/federal/municipality.mvt/?tile={z}/{x}/{y}',
        // 'https://geoserver.naxa.com.np/geoserver/gwc/service/tms/1.0.0/Bipad:Municipality@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf',
        vectorGridKey: '2',
        color: '#FF000',
      });
      this.props.filterAutomationDataForVectorTiles(e.target.value);
    }

    this.setState({ dataTypeLevel: e.target.value });
  };

  render() {
    const {
      automationDataByPartner,
      automationDataByProvince,
      automationChoroplethData,
      dataLoading,
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
      vectorGridInputUrl,
      filteredProvinceChoropleth,
      dataTypeLevel,
      color,
      vectorGridKey,
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

    const choroplethtype = this.state.dataTypeLevel; // change this to (mun,province) change the level
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
        : [0, 5, 10, 25, 50, 100, 150, 200, 400];

    const inputStyle =
      choroplethtype === 'province'
        ? {
            fillColor: '#a3b7e3',
            fillOpacity: 0,
            weight: 1.5,
            opacity: 1,
            color: '#a3b7e3',
            fill: true,
          }
        : {
            fillColor: '#a3b7e3',
            fillOpacity: 0,
            weight: 1.5,
            opacity: 0.4,
            color: '#a3b7e3',
            fill: true,
          };

    // console.log(vectorGridInputUrl, 'url');
    // console.log(automationDataByProvince, 'data');
    console.log(filteredProvinceChoropleth, 'filterProvince');
    // console.log()
    return (
      <>
        <div>
          <select onChange={this.handleStateLevel}>
            <option value="province">Province</option>
            <option value="district">District</option>
            <option value="municipality">Municipality</option>
          </select>
        </div>
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
          {automationChoroplethData && filteredProvinceChoropleth && (
            <VectorGrid
              handleProvinceClick={this.handleProvinceClick}
              changetheme={this.props.changetheme}
              key={vectorGridKey}
              mapRef={this.props.mapRef}
              style={inputStyle} // Province style setting
              // provinceCounts={[20, 12, 30, 4, 5, 26, 17]} // province counts for circles at center of province
              provinceCounts={
                filteredProvinceChoropleth &&
                filteredProvinceChoropleth
              } // province counts for circles at center of province
              mode="choropleth" // options- choropleth, provinceCircles, both
              choroplethData={automationChoroplethData} //
              // color={color} // single color gradient
              // legendDivisions = {10} //no of divisions in legend
              colorArray={[
                '#FFF3D4',
                '#FED976',
                '#FEB24C',
                '#FD8D3C',
                '#FC4E2A',
                '#E31A1C',
                '#BD0026',
                '#800026',
              ]} // multi color custom gradient
              divisions={inputDivisions}
              // divisions={[0, 5, 10, 15, 20]}
              // choroplethTitle = {"New Choropleth"}
              vectorGridUrl={vectorGridInputUrl} // vectortile url setting
            />
          )}
          {/* } */}
          <MarkerClusterComponent
            mapRef={this.props.mapRef}
            innovationData={provinceAllData}
            activelayer={this.props.activelayer}
            markertoplot={this.props.markertoplot}
            iconColor="#FF0000"
            mode="circle" // options - circle, circleIcon, marker
          />
          <div
            id="center_loader"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: 999,
            }}
          >
            <Loader
              type="Audio"
              color="#c21c2e"
              height={100}
              width={100}
              visible={dataLoading}
            />
            <label
              style={{
                display: dataLoading ? 'none' : 'block',
                marginLeft: '15px',
              }}
            >
              Loading...
            </label>
          </div>
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
  getAutomationDataByDistrict,
  getAutomationDataByMunicipality,
  filterAutomationDataForVectorTiles,
})(MapComponent);
