import React, { Component } from "react";
import {connect} from 'react-redux';
import mapboxgl from 'mapbox-gl'

import {calculateRange, choroplethColorArray} from "./Functions";

const defaultData = [
    { 'id': '1', 'count': 0 },
    { 'id': '2', 'count': 0 },
    { 'id': '3', 'count': 0 },
    { 'id': '4', 'count': 0 },
    { 'id': '5', 'count': 0 },
    { 'id': '6', 'count': 0 },
    { 'id': '7', 'count': 0 }
    ];

class Choropleth extends Component {
  constructor(props) {
    super(props);
    this.state = {
        grade: [],
        legendColors: [],
        finalStyle:null,
    };
  }

  getLegendColor(value) {
    var colorArray = this.props.colorArray;
    var legendColor = colorArray!=null && colorArray.length>0?colorArray:this.state.legendColors;
    var color = "rgba(255,255,255,0)";
    // console.log(colorArray, "colorArray inside")
    this.state.grade.map((grade,j) => {
        if(value>grade){
            color = legendColor[j];
        }
    })
    return color;
  }

  changeGrades(){
    var range = [];
    var data = [];
    // console.log(this.props.choroplethData, "fulldata from")
    var colorArrayLength = this.props.colorArray && this.props.colorArray.length;
    var gradeCount = this.props.legendDivisions!=null && typeof(this.props.legendDivisions) == "number" && this.props.legendDivisions <= 20 && this.props.legendDivisions >= colorArrayLength?this.props.legendDivisions:7; //set default gradecount
    
    var fullRange = this.props.divisions && this.props.divisions.length>0?this.props.divisions:[];
    var fullData = this.props.choroplethData!=null && this.props.choroplethData.length>0?this.props.choroplethData:defaultData;
    // console.log(fullData, "fulldata")
    this.props.choroplethData!=null && this.props.choroplethData.length>0?this.props.choroplethData.map(data1 => {
        data.push(data1.count);
    }):defaultData.map(data1 => {
        data.push(data1.count);//if no dat passed take from default data
    })

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
            this.setChoroplethStyle(fullData);
        }, 200);
}
ChangeLegendColors(){
    var choroplethColor = this.props.color;
    var color = choroplethColor!=undefined && choroplethColor.length>0?choroplethColor:"#ff0000";
    var data = this.state.grade;
    var choroplethColors = choroplethColorArray(data.length, color);
    // console.log(choroplethColors, "legendcolors")
    this.setState({legendColors:choroplethColors})
        
}

setChoroplethStyle(values){
    // console.log(values, "values")
    var expression = ['match', ['get', 'code']];
    values.map((value) => {
        var color = this.getLegendColor(value.count);
        expression.push(value.id.toString(),color)
    })
    
    
    
    // const data = this.props.choroplethData;
    // const maxValue = this.props.maxValue;
    // // Calculate color for each state based on the unemployment rate
    // data.forEach(function(row) {
    //     console.log(row);
    //     var red = "";
    //     var green = "";
    //     var blue = "";
    //     green = (row['count'] / maxValue) * 255;
    //     var color = 'rgba(' + green + ', ' + 0 + ', ' + 0 + ', 1)';
    //     expression.push(row['code'], color);
    // });
    
    // Last value is the default, used where there is no data
    expression.push('rgba(0,0,0,0)');

    this.setState({finalStyle:expression})
    // console.log(this.state.finalStyle,"finalstyl")
}

  plotVectorTile = () =>{
    const map = this.props.map;
    const that = this;
    // console.log(this.state.finalStyle, "this finalstyle")
    var hoveredStateId = null;
    map.on('load', function() {
        // Add Mapillary sequence layer.
        // https://www.mapillary.com/developer/tiles-documentation/#sequence-layer
        map.addSource('municipality', {
        'type': 'vector',
        // 'interactive':true,
        'tiles': [that.props.vectorTileUrl?that.props.vectorTileUrl:"https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}"],//"https://apps.naxa.com.np/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=Naxa:educationpoint&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/vnd.mapbox-vector-tile&TILECOL={x}&TILEROW={y}"],
        'minzoom': 0,
        'maxzoom': 20,
        "promoteId": {"default": "code"}
        });

        map.addLayer(
        {
        'id': 'vector-tile-fill',
        'type': 'fill',
        'source': 'municipality',
        'source-layer': 'default',
        'activeChoropleth': false,
        'paint': {
            'fill-color':that.state.finalStyle,
        },
        },
        'waterway-label'
        );

        map.addLayer({
            'id': 'vector-tile-outline',
            'type': 'line',
            
            'source': 'municipality',
            'source-layer': 'default',
            'paint': {
              'line-color': 'rgba(255, 0, 0, 1)',
              'line-width': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                5,
                1
               ]
            }
          });

          if(that.props.label){
            map.addLayer({
                "id": "vector-tile-label",
                "type": "symbol",
                "source": "municipality",
                "source-layer": "default",
                "layout": {
                    "text-field": ['get', 'name'],
                    'icon-image': ['concat', ['get', 'icon'], '-15'],
                    "text-anchor": 'center',
                    "text-offset": [0,0],
                    "symbol-placement": "point",
                    "text-justify": "center",
                    "text-size": 10,
                },
                "paint": {
                "text-color": "#666",
                "text-halo-color": "rgba(255,255,255,0.95)",
                "text-halo-width": 1.5,
                "text-halo-blur": 1,
                }
              })
           }
          // var bounds = coordinates.reduce(function(bounds, coord) {
          //   return bounds.extend(coord);
          //   }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
          // map.fitBounds() 

         
          var popup= new mapboxgl.Popup();
          map.on('mousemove', 'vector-tile-fill', function(e) {
            // console.log(e.features[0],'e');
            //e.features[0].id = e.features[0].properties.id;
            // console.log(e.features[0], "feature code")
            // console.log(that.props.automationReducer.automationAllDataByPartner,'allData');
            const {automationAllDataByPartner}= that.props.automationReducer;
            const{activeClickPartners,dataTypeLevel}=that.props;
            // console.log(e.layer);
            let b=[];
            const c=[];
            const v=[];
            if(dataTypeLevel=== 'municipality'){
                if(activeClickPartners.length>0){
                    activeClickPartners.map(x=>{
                      // console.log(x,'x1st');
                      that.props.automationReducer.automationTableData.filter(data=>{
                        if(data.partner_id=== x && data.municipality_code=== parseInt(e.features[0].properties.code)){
                            b.push(data)
                        }
                    });
                });
                // console.log(b,'b');
                }else{
                  that.props.automationReducer.automationTableData.map(data=>{
                        if(data.municipality_code=== parseInt(e.features[0].properties.code)){
                            b.push({partner_id:data.partner_id, tablets:data.tablets})
                        }
                    })
                }
            }else if (dataTypeLevel=== 'district'){
                if(activeClickPartners.length>0){
                    activeClickPartners.map(x=>{
                      that.props.automationReducer.automationTableData.filter(data=>{
                        if(data.partner_id=== x && data.district_code=== parseInt(e.features[0].properties.code)){
                            b.push(data)
                        }
                    });
                });
                // console.log(b,'b');
                }else{
                  that.props.automationReducer.automationTableData.map(data=>{
                        if(data.district_code=== parseInt(e.features[0].properties.code)){
                            b.push({partner_id:data.partner_id, tablets:data.tablets})
                        }
                    })
                }
            }else if (dataTypeLevel=== 'province'){
                if(activeClickPartners.length>0){
                    activeClickPartners.map(x=>{
                      that.props.automationReducer.automationTableData.filter(data=>{
                        if(data.partner_id=== x && data.province_code=== parseInt(e.features[0].properties.code)){
                            b.push(data)
                        }
                    });
                });
                // console.log(b,'b');
                }else{
                  that.props.automationReducer.automationTableData.map(data=>{
                        if(data.province_code=== parseInt(e.features[0].properties.code)){
                            b.push({partner_id:data.partner_id, tablets:data.tablets})
                        }
                    })
                }
            }

            // console.log(b,'beforefilter');
            b.map(data=>{
                automationAllDataByPartner[0] && automationAllDataByPartner[0].partner_data.filter(function(x) {
                    // console.log(data,'data');
                    // console.log(e,'e');
                    if(x.partner_id === data.partner_id){
                        x.single_tablets = data.tablets;
                        c.push(x);
                    }
                })
            })
            // var result = 
              
              // console.log(c)

              let total_tablets= 0;
              const popupHtml =c && c.map(data=>{
                  total_tablets += data.single_tablets;
                  return (
                      `<li>
                          <div class="organization-icon"><span></span></div>
                              <div class="organization-content">
                                  <div class="org-header">
                                      <h5>${data.partner_name}</h5>
                                          <div class="icon-list">
                                              
                                                  <div class="icons"><i class="material-icons">tablet_mac</i><b>${data.single_tablets}</b></div>
                                              </div>
                                          </div>
                                          </div>
                                          </li>`)});



                                         
            map.getCanvas().style.cursor = 'pointer';
            if (e.features.length > 0) {
            if (hoveredStateId) {
            map.setFeatureState(
                { source: 'municipality', sourceLayer: 'default', id: hoveredStateId },
                { hover: false }
            );
            const colorCheck = e.features[0].layer.paint["fill-color"];
            const checkChoropleth = JSON.stringify(colorCheck) === '{"r":0,"g":0,"b":0,"a":0}';
            // console.log(that.props.activeOutreachButton,'check')
            // console.log(c.length >0,'check1')
            that.props.activeOutreachButton && c.length >0 ? (
            popup
            .setLngLat(e.lngLat)
            .setHTML(`<div class="leaflet-popup-content" style="width: 281px;">
            <div class="map-popup-view">
                <div class="map-popup-view-header">
                    <h5>${e.features[0].properties.name}</h5>
                    <div class="icons">
                    <i class="material-icons">tablet_mac</i><b>${total_tablets}</b>
                    </div>
                </div>
                <ul style="height:112px;overflow-y: scroll">
                ${popupHtml}
                
                </ul>
                <div class="map-view-footer">
                </div>
                    </div>
                </div>`)
            .addTo(map)) : null;
            }
            
            hoveredStateId = e.features[0].id;
            // console.log(hoveredStateId, "hoverstateid")
            map.setFeatureState(
                { source: 'municipality', sourceLayer: 'default', id: hoveredStateId },
                { hover: true }
            );
            }

            //Popup On Hover

            
          });
         

          map.on('mouseleave', 'vector-tile-fill', function() {
            // if (hoveredStateId) {
            // map.setFeatureState(
            // { source: 'municipality', sourceLayer: 'default', id: hoveredStateId },
            // { hover: false }
            // );
            // }
            // hoveredStateId = null;
            popup.remove();
          });
        
    })
    map.addControl(new mapboxgl.NavigationControl());
  }

  componentDidMount() {
    this.changeGrades();
    this.plotVectorTile();
  }

  componentDidUpdate(prevProps, prevState) {
    const map = this.props.map;
    if(prevProps.choroplethData != this.props.choroplethData){
        this.changeGrades();
        setTimeout(() => {
            // console.log(this.state.finalStyle, "inside finalstyle")
            // console.log("entered inside");
            map.setPaintProperty("vector-tile-fill", 'fill-color', this.state.finalStyle);
        }, 1000);
        
    }
    if(prevProps.vectorTileUrl != this.props.vectorTileUrl){
      // console.log(this.props.vectorTileUrl,'vectorTIleUrl');
        //this.changeGrades();
        
        var newStyle = map.getStyle();
        newStyle.sources.municipality.tiles = [this.props.vectorTileUrl];
        map.setStyle(newStyle);

        // map.removeSource('municipality');
        
        // setTimeout(() => {
        //   map.addSource('municipality', {'type': 'vector',
        // // 'interactive':true,
        // 'tiles': [this.props.vectorTileUrl?this.props.vectorTileUrl:"https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}"],//"https://apps.naxa.com.np/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=Naxa:educationpoint&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/vnd.mapbox-vector-tile&TILECOL={x}&TILEROW={y}"],
        // 'minzoom': 0,
        // 'maxzoom': 20,
        // "promoteId": {"default": "code"}});
        // }, 200);
        // this.plotVectorTile();
    }
    if(prevState.finalStyle != this.state.finalStyle){
        
    }

  }

  render() {
    return (
        <div></div>
    )
  }
}
const mapStateToProps = ({ automationReducer }) => ({
  automationReducer,
});

export default connect(mapStateToProps, {})(Choropleth)