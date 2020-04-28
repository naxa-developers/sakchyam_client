import React, { Component } from "react";
import {
  TileLayer,
  Pane,
  LayersControl,
  CircleMarker,
  Circle,
  Popup,
  Marker,
  FeatureGroup
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import 'react-leaflet-markercluster/dist/styles.min.css';
// import L, { marker } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { handleMarkerZoom, getMarkerColor } from "./Functions";
import ReactDOMServer from 'react-dom/server';
import { divIcon } from 'leaflet';
import HospitalIcon from '../../../../Icons/HospitalIcon';
import LabIcon from '../../../../Icons/LabIcon';
// import InfectedIcon from './Icons/Infected';
// import HealthWorkerIcon from './Icons/HealthWorker';
// import InfectionControlIcon from './Icons/InfectionControl';
// import DoctorIcon from './Icons/Doctor';
// import TestingIcon from './Icons/Testing';
// import BoreHoleIcon from './Icons/Borehole';
// import BoreholeIcon from "./Icons/Borehole";
let map = {};

class MarkerClusterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ["1", "2", "3", "4", "5", "6", "7"],
      color: [
        '#e69109',
        "#8A2BE2",
        '#9ff035',
        // '#34ede1',
        // '#8629ff',
        '#e553ed',
        '#f2575f',
        '#915e0d',
        '#a1970d',
        '#4f7d14',
        '#07aba1',
        '#1d4c8f',
        '#491991',
        '#610766',
        '#6e0208',
      ],
      markertoshow:[],
      oncecalled:false
      //type and color array should be of same length
    };
    this.clusterRef = React.createRef();
    this.sidebarListRef = React.createRef();
  }

  handleViewDetailsClick = (data) => {
    this.props.viewDetailsClicked(data); //pass again back to parent
  }

  componentWillMount() { }

  componentDidMount() {
    map = this.props.mapRef.current.leafletElement;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.innovationData !== this.props.innovationData) {
      //console.log(this.props.innovationData, "clusterinnovation")    
      map = this.props.mapRef.current.leafletElement;
      var markerLayers = this.clusterRef.current.leafletElement;
      const innovationData = this.props.innovationData;

      // remove static circle markers with count and show markers at first load
      // handleMarkerZoom(map, markerLayers);


      map.on("zoomend", (e) => {
        // remove static circle markers with count and show markers at first load
        handleMarkerZoom(map, markerLayers);
      })
      var types = [];
      innovationData.map(data => {
        if (!types.includes(data.type_name)) {
          types.push(data.type_name);
        }
      });
      this.setState({type:types})
     
    }  
  }

  geticon=(a)=>{
    var icontype=<HospitalIcon color={this.props.iconColor}/>;
    if(a=="Testing lab"){
      icontype=<LabIcon color={this.props.iconColor}/>

    }
    return  divIcon({
      className: 'map-label',
      html: ReactDOMServer.renderToString(icontype)
    });

  }

  render() {
    const innovationData = this.props.innovationData;
    // console.log(innovationData,"innovationData")

    return (
      <div>
        <MarkerClusterGroup ref={this.clusterRef} disableClusteringAtZoom={6} showCoverageOnHover={false}>
          {/* <FeatureGroup color="purple"> */}
          {/* <Popup>
                        <span>Popup in FeatureGroup</span>
                    </Popup> */}
          {
            innovationData && innovationData.map((markerData, i) => {
              var color = getMarkerColor(markerData.type_name && markerData.type_name, this.state.type, this.state.color);
              return (<div>
                <Marker
                  key={i}
                  ref = {this.markerRef}
                  position={{ lat: markerData.lat, lng: markerData.long }}
                  icon={ this.geticon("Hospital")}
                  onLoad = {this.handleMarkers}
                >
                  <Popup>
                    {markerData.name}
                  </Popup>
                </Marker>
                {/* <CircleMarker
                  key={i}
                  center={[markerData.lat, markerData.long]}
                  radius={4}
                  fillOpacity={1}
                  opacity={1}
                  fill="true"
                  color={"" + color}
                  fillColor={"" + color}//"#008ffb"
                  weight={4}

                  onMouseOver={(e) => {
                    e.target.setStyle({
                      radius: 7,
                      fillOpacity: 1,
                      fillColor: color,
                      color: color,
                      weight: 4
                    });
                  }}
                  onMouseOut={(e) => {
                    e.target.setStyle({
                      radius: 4,
                      fillOpacity: 1,
                      fillColor: color,
                      color: color,
                      weight: 4
                    });
                  }}
                >
                  <Popup>
                    
                  </Popup>
                </CircleMarker> */}
              </div>)
            })
          }
          {/* </FeatureGroup> */}
        </MarkerClusterGroup>
      </div>
    )
  }
}
export default MarkerClusterComponent;