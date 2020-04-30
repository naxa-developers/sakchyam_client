import React, { Component } from "react";
import { withLeaflet } from 'react-leaflet';
import VectorGridDefault from 'react-leaflet-vectorgrid';
import {connect} from 'react-redux';
// import ScrollTab from './ScrollTab';
const VectorGrid = withLeaflet(VectorGridDefault);
import {label_Vector_Tiles, calculateRange, handleZoom, choroplethColorArray, getProvinceName} from "./Functions";
import { filterDistrictFromProvinceColor } from "../../../actions/automation.actions";
// import './Developers_css/vectorgrid.css';

var map = {};
var vt_label_province = L.featureGroup();
var labelcount = 0;
var province;
var circleLoad = true;

const defaultData = {
    choroplethData: [{id:1, count:1}, {id:2, count:2}, {id:3, count:3}, {id:4, count:4}, {id:5, count:5}, {id:6, count:6}, {id:7, count:7}],
}
var provinceDefaultStyle = {
    fillColor: "white",
    fillOpacity: 0,
    weight: 1.5,
    opacity: 1,
    color: "#a3b7e3",
    fill: true
  };
  

class VectorGridComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            provinceCounts:[],
            provinceCenters: [
                [27.176469131898898, 87.220458984375],
                [27.01998400798257, 85.6494140625],
                [27.712710260887476, 85.36376953125001],
                [28.362401735238237, 84.03442382812501],
                [28.04289477256162, 82.78198242187501],
                [29.15216128331894, 82.22167968750001],
                [29.36302703778376, 80.97148437500001]
              ],
            choroplethTitle: "dataCategory1",
            grade: [],
            legendColors: []
        };
        this.vectorGridRef = React.createRef();
        this.infoDivRef = React.createRef();
    }

    getLegendColor = (value) => {
        var colorArray = this.props.colorArray;
        var legendColor = colorArray!=null && colorArray.length>0?colorArray:this.state.legendColors;
        var color = "#f4f4f2";
        // console.log(colorArray, "colorArray inside")
        this.state.grade.map((grade,j) => {
            if(value>grade){
                color = legendColor[j];
            }
        })
        return color;
    }

    changeGrades = () =>{
        var range = [];
        var data = [];
        
        var colorArrayLength = this.props.colorArray && this.props.colorArray.length;
        var gradeCount = this.props.legendDivisions!=null && typeof(this.props.legendDivisions) == "number" && this.props.legendDivisions <= 20 && this.props.legendDivisions >= colorArrayLength?this.props.legendDivisions:7; //set default gradecount
        
        var fullRange = this.props.divisions && this.props.divisions.length>0?this.props.divisions:[];
        var fullData = this.props.choroplethData!=null && this.props.choroplethData.length>0?this.props.choroplethData:defaultData.choroplethData;
        
        this.props.choroplethData!=null && this.props.choroplethData.length>0?this.props.choroplethData.map(data1 => {
            data.push(data1.count);
        }):defaultData.choroplethData.map(data1 => {
            data.push(data1.count);//if no dat passed take from default data
        })

        if(this.props.mode && this.props.mode == "choropleth" || this.props.mode == "both"){
            // console.log(data, "data new")
            var max = Math.max.apply(null, Object.values(data));
            var min = 0;//Math.min(...data);
            // console.log(max, "max")
            // console.log(min, "min")
            range = (max-min)/(gradeCount-1)<1?[0,2,4,6,8,10,12]:calculateRange(min, max, (max-min)/(gradeCount-1));
            // console.log(range, "range")
            this.setState({grade:fullRange.length>0?fullRange:range}) //add grade provided from props if available
            
            setTimeout(() => {
                this.ChangeLegendColors();
                this.setChoroplethStyle(province, fullData);
            }, 200);
        } 
    }
    ChangeLegendColors = () =>{
        var choroplethColor = this.props.color;
        var color = choroplethColor!=undefined && choroplethColor.length>0?choroplethColor:"#ff0000";
        var data = this.state.grade;
        var choroplethColors = choroplethColorArray(data.length, color);
        // console.log(choroplethColors, "legendcolors")
        this.setState({legendColors:choroplethColors})
            
    }

    setChoroplethStyle = (layer, values) =>{
        
        values.map((value) => {
            var color = this.getLegendColor(value.count);
            var newStyle= {};
            var newStyle1 = this.props.style && this.props.style != null?this.props.style:provinceDefaultStyle;
            Object.assign(newStyle, newStyle1)
            newStyle.fillColor = color;
            newStyle.fillOpacity = 0.7;
            // console.log(color, "color")
            // console.log(newStyle, "newStyle")
            setTimeout(() => {
                layer.setFeatureStyle(value.id, newStyle);
            }, 100);
        })
    }

    getShortNumbers = (n,d) =>{
        var x=(''+n).length;
        var p=Math.pow;
        d=p(10,d)
        x-=x%3
        return Math.round(n*d/p(10,x))/d+" kMGTPE"[x/3]
    }

    loadProvinceCircles=()=>{
        province = this.vectorGridRef.current.leafletElement;
        console.log(province,'ProvinceRef')
            var infoDiv = this.infoDivRef.current;
            map = this.props.mapRef.current.leafletElement;
            console.log('if case')
            if(circleLoad == true){
                var feature = {properties:{}}
                this.state.provinceCenters.map((data, i) => {
                    feature.properties.id = i;
                    feature.properties.Centroid_X = data[1];
                    feature.properties.Centroid_Y = data[0];
                    feature.properties.PROV_NAME = null;
                    if(this.props.mode && this.props.mode == "provinceCircles" || this.props.mode == "both"){
                        label_Vector_Tiles(feature, vt_label_province, labelcount, this.props.provinceCounts);
                    }
                })
            }
            map.on("zoomend", (e)=>{
                if(this.props.mode && this.props.mode == "provinceCircles" || this.props.mode == "both"){
                    handleZoom(map, province, vt_label_province);
                }
            });
            province.on("click",(e)=>{
                this.props.handleProvinceClick(e.layer.properties.id);
                this.props.filterDistrictFromProvinceColor(e.layer.properties.id);
                // const a = this.props.vectorGridUrl && this.props.vectorGridUrl != "" && typeof(this.props.vectorGridUrl) == "string"?this.props.vectorGridUrl:"https://geoserver.naxa.com.np/geoserver/gwc/service/tms/1.0.0/Bipad:Province@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf";
                // console.log(e.layer.properties.code);
                // console.log(a,'a'); 
                // console.log(`${a}&province_id=${e.layer.properties.code}`,'a'); 
            });
            province.on("mouseover",(e)=>{
                var provName = "";
                // console.log(provName, "provName")
                var level = "";
                if(e.layer.properties.FIRST_PROV!=undefined && e.layer.properties.FIRST_PROV!=null){
                    level = "province";
                    provName = getProvinceName(e.layer.properties.id, "en")
                }
                else if(e.layer.properties.FIRST_DISTRICT!=undefined && e.layer.properties.FIRST_DISTRICT!=null){
                    level = "district"
                    provName = getProvinceName(e.layer.properties.provinceId, "en")
                }
                else {
                    level = "municipality"
                    provName = getProvinceName(e.layer.properties.provinceId, "en")
                }
                var html = `<div style="background: white;padding: 10px;"><span><b>${
                    level == "province"?provName:level == "district"?e.layer.properties.FIRST_DISTRICT:e.layer.properties.Name
                  }</b></span>`; 
                // html+= level != "province"?`,</br><span style="    text-transform: capitalize;">${level=="district"?provName:e.layer.properties.District.toLowerCase()}`:"";
                html+= level != "province"?`,</br><span style="    text-transform: capitalize;">${level=="district"?provName:e.layer.properties.name.toLowerCase()}`:"";
                html+= level != "province" && level != "district"?`, ${provName}</span></div>`:"";
                infoDiv.innerHTML = html;
            });

            province.on("mouseout",(e)=>{
                infoDiv.innerHTML = "";
            })

            circleLoad = false;
    }

    componentWillMount(){
    
    }
    
    componentDidMount(){
        map = this.props.mapRef.current.leafletElement;
        province = this.vectorGridRef.current.leafletElement;
        console.log(this.vectorGridRef,'vectorGridre')
        // console.log(province, "refrefref")
        map.addLayer(vt_label_province);
        this.changeGrades();
        this.loadProvinceCircles();
    }

    componentDidUpdate(prevProps, prevState){
        console.log('update')
        if(prevProps.provinceCounts != this.props.provinceCounts){
            
        }
        // if(prevProps.choroplethTitle != this.props.choroplethTitle){
        //     this.setState({choroplethTitle:this.props.choroplethTitle})
        // }

        
    }

    render() {
        const provinceUrl = this.props.vectorGridUrl && this.props.vectorGridUrl != "" && typeof(this.props.vectorGridUrl) == "string"?this.props.vectorGridUrl:"https://geoserver.naxa.com.np/geoserver/gwc/service/tms/1.0.0/Bipad:Province@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf";
        console.log(provinceUrl,"provinceUrlss")
        var style = this.props.style && this.props.style != null?this.props.style:provinceDefaultStyle;
        // console.log(this.props.style && this.props.style != null?this.props.style:provinceDefaultStyle, "defaultstyle")
        const options = {
            type: 'protobuf',
            // tooltip: (feature) =>{
            //     console.log(feature, "feature  ")
            // },
            getFeatureId: function (feature) {
                console.log(feature, "feature  ")
                return feature.properties.code; // feature.properties.code
            },
            url: provinceUrl,
            vectorTileLayerStyles: {default: style},
            // vectorTileLayerStyles: {Default: style},
            subdomains: 'abcd',
            key: 'abcdefghi01234567890',
        };
        // console.log(province && province.getBounds(),'ProvinceRefBound')
        return (
            <div>
                <VectorGrid {...options} ref={this.vectorGridRef}></VectorGrid>
                <div style={{position: "absolute", display:"block", zIndex:1999, background:"white", padding: "5px", bottom:0, margin:"5px"}}>
                <div>{this.props.choroplethTitle?this.props.choroplethTitle:"Legend"}</div>
                <div class="map-legend">
                            {/* <ScrollTab changetheme={this.props.changetheme}/> */}
                            <ul class="color-legend">
                    {
                        this.state.grade && this.state.grade.map((grade,i) => {
                            var hideLastdiv = false;
                            hideLastdiv= i == (this.state.grade.length-1)?true:false;
                            var grade1 = grade<1000?grade.toString():this.getShortNumbers(grade,1);
                            // uncomment this to add vertical legend
                            // return <div><div style={{width:"12px", height:"12px", backgroundColor: this.getLegendColor(this.state.grade[i] + 1), border:"solid 1px #e2e2e2", display:"inline-block"}}></div> <span>{this.state.grade[i]} {this.state.grade[i + 1]?"-"+this.state.grade[i + 1]: "+"}</span></div>
                            // uncomment this to add horizontal legend
                            // return <div style={{display:"inline-block"}}><div style={{width:"12px", height:"12px", backgroundColor: this.getLegendColor(this.state.grade[i] + 1), border:"solid 1px #e2e2e2", display:"inline-block", marginLeft:"5px"}}></div> <span >{this.state.grade[i]} {this.state.grade[i + 1]?"-"+this.state.grade[i + 1]: "+"}</span></div>
                            // uncomment this to add nice horizontal legend
                            return (
                                <li>
                                    <div style={{backgroundColor: hideLastdiv?"transparent":this.getLegendColor(grade+1)}} class="color color1"></div>
                                    <span style={{marginLeft: grade1.trim().length==1?-2:grade1.trim().length==2?-8:-12}}>{grade1}</span>
                                </li>
                            )
                        })
                    }
                        </ul>
                    </div>
                </div>
                <div ref={this.infoDivRef} class="infoDiv"></div>
            </div>
        )
    }
}
const mapStateToProps = ({ automationReducer }) => ({
    automationReducer,
});

export default connect(mapStateToProps, {filterDistrictFromProvinceColor})(VectorGridComponent)