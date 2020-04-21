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
import {handleMarkerZoom, getMarkerColor} from "./Functions";
import RightSidebarList from '../../includes/rightSidebarList';
let map = {};

class MarkerClusterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          type : ["Under Development", "Existing Prototype","Piloting Phase","Nationwide Implementation"],
          color : ["#008ffb", "#00e396", "#feb019", "#ff4560" ], //type and color array should be of same length
        };
        this.clusterRef = React.createRef();
        this.sidebarListRef = React.createRef();
    }

    handleViewDetailsClick = (data) => {
      this.props.viewDetailsClicked(data); //pass again back to parent
    }

    componentWillMount(){}

    componentDidMount(){
        map = this.props.mapRef.current.leafletElement;
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.innovationData !== this.props.innovationData) {
          //console.log(this.props.innovationData, "clusterinnovation")    
          map = this.props.mapRef.current.leafletElement;
          var markerLayers = this.clusterRef.current.leafletElement;
          const innovationData = this.props.innovationData;
          handleMarkerZoom(map, markerLayers);
          map.on("zoomend", (e)=>{
            handleMarkerZoom(map, markerLayers);
          })
        }
    }
    
    render() {
        const innovationData = this.props.innovationData;
        return (
          <div>
            <MarkerClusterGroup ref = {this.clusterRef} disableClusteringAtZoom = {6} showCoverageOnHover = {false}>
                {/* <FeatureGroup color="purple"> */}
                    {/* <Popup>
                        <span>Popup in FeatureGroup</span>
                    </Popup> */}
                    {
                    innovationData.length>0 && innovationData.map((markerData, i)=>{
                      var color = getMarkerColor(markerData.stage && markerData.stage.name, this.state.type, this.state.color);
                        return (<div>
                            <CircleMarker
                                key={i}
                                center = {[markerData.lat, markerData.long]}
                                radius =  {4}
                                fillOpacity = {1}
                                opacity = {1}
                                fill="true"
                                color = {""+color}
                                fillColor = {""+color}//"#008ffb"
                                weight = {4}

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
                                    <RightSidebarList ref={this.sidebarListRef} data={markerData} viewDetailsClicked = {this.handleViewDetailsClick}/>
                                </Popup>
                            </CircleMarker>
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