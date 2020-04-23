import React, { Component } from "react";
import { withLeaflet } from 'react-leaflet';
import VectorGridDefault from 'react-leaflet-vectorgrid';
const VectorGrid = withLeaflet(VectorGridDefault);
import {label_Vector_Tiles, CalculateRange, setProvinceCircleSize, handleZoom} from "./Functions"

var map = {};
var vt_label_province = L.featureGroup();
var vt_label_district = L.featureGroup();
var vt_label_municipality = L.featureGroup();
var label = null;
var labelcount = 0;
var province, district, municipality;
var circleLoad = true;

class VectorGridComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            provinceStyleState:{},
            districtStyleState:{},
            municipalityStyleState:{},
            provinceCounts:[],
            provinceCenters: [
                [27.176469131898898, 87.220458984375],
                [27.01998400798257, 85.6494140625],
                [27.712710260887476, 85.36376953125001],
                [28.362401735238237, 84.03442382812501],
                [28.04289477256162, 82.78198242187501],
                [29.15216128331894, 82.22167968750001],
                [29.36302703778376, 80.97148437500001]
              ]
        };
        this.vectorGridRef = React.createRef();
    }
    componentWillMount(){
        var provinceStyle = {
            fillColor: "white",
            fillOpacity: 0.4,
            weight: 1.5,
            opacity: 1,
            color: '#a3b7e3',
            fill: true
          };
        var districtStyle = {
            fillColor: "blue",
            fillOpacity: 0,
            weight: 0.7,
            opacity: 0.7,
            color: "#a3b7e3",
            fill: true
          };
        var municipalityStyle = {
            fillColor: "blue",
            fillOpacity: 0,
            weight: 0.3,
            opacity: 0.2,
            color: "#696969",
            fill: true
          };
      this.setState({provinceStyleState:provinceStyle, districtStyleState:districtStyle, municipalityStyleState:municipalityStyle})
    }

    componentDidMount(){
        map = this.props.mapRef.current.leafletElement;
        province = this.vectorGridRef.current.leafletElement;
        // console.log(province, "refrefref")
        map.addLayer(vt_label_province);

        //call this function after zoom in out.
        
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.provinceCounts != this.props.provinceCounts){
            province = this.vectorGridRef.current.leafletElement;
            map = this.props.mapRef.current.leafletElement;
            // province.on("load", ()=>{
                if(circleLoad == true){
                var feature = {properties:{}}
                this.state.provinceCenters.map((data, i) => {
                    feature.properties.id = i;
                    feature.properties.Centroid_X = data[1]
                    feature.properties.Centroid_Y = data[0]
                    feature.properties.PROV_NAME = null
                    // label_Vector_Tiles(feature, vt_label_province, vt_label_district, vt_label_municipality, labelcount, this.props.provinceCounts);
                })
            }
            map.on("zoomend", (e)=>{
                // handleZoom(map, province, district, municipality, vt_label_province, vt_label_district, vt_label_municipality, labelcount);
            });

            circleLoad = false;
        }
        //document.getElementById("provinceCount1") != null && setProvinceCircleSize(this.props.provinceCounts);
    }

    render() {
        const provinceUrl = "https://geoserver.naxa.com.np/geoserver/gwc/service/tms/1.0.0/Bipad:Province@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf";
        const districtUrl = "https://geoserver.naxa.com.np/geoserver/gwc/service/tms/1.0.0/Bipad:District@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf";
        const municipalityUrl ="https://geoserver.naxa.com.np/geoserver/gwc/service/tms/1.0.0/Bipad:Municipality@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf";

        var currentComponent = this;
        const options = {
            type: 'protobuf',
            // tooltip: (feature) =>{
            //     console.log(feature, "feature  ")
            // },
            getFeatureId: function (feature) {
                //console.log(feature, "feature  ")
                return feature.properties.id;
            },
            url: provinceUrl,
            vectorTileLayerStyles: {Province: this.state.provinceStyleState},
            subdomains: 'abcd',
            key: 'abcdefghi01234567890',
        };
        return (
            <VectorGrid {...options} ref={this.vectorGridRef}></VectorGrid>
        )
    }
}
export default VectorGridComponent;