import React, { Component } from "react";
import { withLeaflet } from 'react-leaflet';
import VectorGridDefault from 'react-leaflet-vectorgrid';
import {connect} from 'react-redux';
// import ScrollTab from './ScrollTab';
const VectorGrid = withLeaflet(VectorGridDefault);
import {label_Vector_Tiles, calculateRange, handleZoom, choroplethColorArray, getProvinceName,getCenterBboxMunicipality} from "./Functions";
import { filterDistrictFromProvinceColor } from "../../../../actions/automation.actions";

// import './Developers_css/vectorgrid.css';

var map = {};
var vt_label_province = L.featureGroup();
var labelcount = 0;
var province;
var circleLoad = true;
// var count = 0;
const defaultData = {
    choroplethData: [{id:1, count:1}, {id:2, count:2}, {id:3, count:3}, {id:4, count:4}, {id:5, count:5}, {id:6, count:6}, {id:7, count:7}],
}
var provinceDefaultStyle = {
    fillColor: "white",
    fillOpacity: 0,
    weight: 1.5,
    opacity: 1,
    color: "black",
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
            legendColors: [],
            bbox:[0,0,0,0],
            count: 0,
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
        // var fullData = this.props.choroplethData!=null && this.props.choroplethData.length>0?this.props.choroplethData:defaultData.choroplethData;
        var fullData = this.props.choroplethData;
        
        this.props.choroplethData!=null && this.props.choroplethData.length>0?this.props.choroplethData.map(data1 => {
            data.push(data1.count);
        }):defaultData.choroplethData.map(data1 => {
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
                this.setChoroplethStyle(province, fullData);
            }, 200);
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
        // console.log(layer,'choropleth')
        values.map((value) => {
            var color = this.getLegendColor(value.count);
            var newStyle= {};
            var newStyle1 = this.props.style && this.props.style != null?this.props.style:provinceDefaultStyle;
            Object.assign(newStyle, newStyle1)
            // newStyle.fillOpacity = 0.7;
            // console.log(value,'value1st');
            if(value.count!== 0){
                newStyle.fillColor = color;
                newStyle.fillOpacity = 0.7;
                newStyle.activechoropleth = true;
            
            
                setTimeout(() => {
                    layer.setFeatureStyle(value.id, newStyle);
                }, 100);
            
            }else{
                newStyle.fillColor = 'white';
                newStyle.fillOpacity = 0.7;
                // console.log(value,'value2nd');
                // newStyle.fillColor = '';
                newStyle.activechoropleth = false;
                setTimeout(() => {
                    layer.setFeatureStyle(value.id, newStyle);
                }, 100);
            }
            // newStyle.color = 'red';
            // console.log(color, "color")
            // console.log(newStyle, "newStyle")
            
        })
    }

    getShortNumbers = (n,d) =>{
        var x=(''+n).length;
        var p=Math.pow;
        d=p(10,d)
        x-=x%3
        return Math.round(n*d/p(10,x))/d+" kMGTPE"[x/3]
    }

    label= () => {
        province = this.vectorGridRef.current.leafletElement;
            map = this.props.mapRef.current.leafletElement;
            // console.log(map,'mapref')
            if(circleLoad == true){
                var feature = {properties:{}}
                this.state.provinceCenters.map((data, i) => {
                    feature.properties.id = i;
                    feature.properties.Centroid_X = data[1];
                    feature.properties.Centroid_Y = data[0];
                    feature.properties.PROV_NAME = null;
                    if(this.props.label && this.props.label == true){
                        label_Vector_Tiles(feature, vt_label_province, labelcount, this.props.provinceCounts);
                    }
                })
            }
            map.on("zoomend", (e)=>{
                if(this.props.label && this.props.label == true){
                    handleZoom(map, province, vt_label_province);
                }
            });
            circleLoad = false;
            province.on("click",(e)=>{
                // console.log(e.layer.properties.id,'id vectorgrid');
                // console.log(e.layer);
                // console.log(e.latlng);
                map.flyTo(e.latlng, 9,{
                    animate: true,
                    duration: 3 // in seconds
                  });
                this.props.handleProvinceClick(e.layer.properties.id,e.layer.properties.code);
                e.layer.setStyle({opacity:1});

                // this.props.filterDistrictFromProvinceColor(e.layer.properties.id);
                // const a = this.props.vectorGridUrl && this.props.vectorGridUrl != "" && typeof(this.props.vectorGridUrl) == "string"?this.props.vectorGridUrl:"https://geoserver.naxa.com.np/geoserver/gwc/service/tms/1.0.0/Bipad:Province@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf";
                // console.log(e.layer.properties.code);
                // console.log(a,'a'); 
                // console.log(`${a}&province_id=${e.layer.properties.code}`,'a'); 
            });
            // province.on('hover',(e)=>{
            //         alert('s');
            // });
        }
    vectorTileFullyLoaded=()=>{
        province = this.vectorGridRef.current.leafletElement;
        province.on("load",(e)=>{
            this.props.handleTileLoad();
            const a = this.state.bbox.map(data=>{return parseFloat(data)});
            const b = [[a[0],a[1]],[a[2],a[3]]];
            // console.log(b,'b');
            // if(this.mapRef && this.mapRef.current){
                global.maps =this.props.mapRef.current.leafletElement;
                const map =this.props.mapRef.current.leafletElement;
                if(this.props.vectorGridFirstLoad === true){
                    // console.log(b,'fitbound Up');
                    // map.fitBounds(b);
                } 
                // this.props.handleVectorGridFirstLoad();
        });
        // province.on("tileloadstart",(e)=>{
        //     this.props.handleTileLoadEnd();

        // })
    }
    addMouseoverLayer = () =>{
        province = this.vectorGridRef.current.leafletElement;
        // console.log(province.options);
        var infoDiv = this.infoDivRef.current;
        map = this.props.mapRef.current.leafletElement;
        province.on("mouseover",(e)=>{
            const {automationAllDataByPartner}= this.props.automationReducer;
            const{activeClickPartners,dataTypeLevel}=this.props;
            // console.log(e.layer);
            let b=[];
            const c=[];
            const v=[];
            if(dataTypeLevel=== 'municipality'){
                if(activeClickPartners.length>0){
                    activeClickPartners.map(x=>{
                        this.props.automationReducer.automationTableData.filter(data=>{
                        if(data.partner_id=== x && data.municipality_code=== parseInt(e.layer.properties.code)){
                            b.push(data)
                        }
                    });
                });
                console.log(b,'b');
                }else{
                    this.props.automationReducer.automationTableData.map(data=>{
                        if(data.municipality_code=== parseInt(e.layer.properties.code)){
                            b.push({partner_id:data.partner_id, tablets:data.tablets})
                        }
                    })
                }
            }else if (dataTypeLevel=== 'district'){
                if(activeClickPartners.length>0){
                    activeClickPartners.map(x=>{
                        this.props.automationReducer.automationTableData.filter(data=>{
                        if(data.partner_id=== x && data.district_code=== parseInt(e.layer.properties.code)){
                            b.push(data)
                        }
                    });
                });
                console.log(b,'b');
                }else{
                    this.props.automationReducer.automationTableData.map(data=>{
                        if(data.district_code=== parseInt(e.layer.properties.code)){
                            b.push({partner_id:data.partner_id, tablets:data.tablets})
                        }
                    })
                }
            }else if (dataTypeLevel=== 'province'){
                if(activeClickPartners.length>0){
                    activeClickPartners.map(x=>{
                        this.props.automationReducer.automationTableData.filter(data=>{
                        if(data.partner_id=== x && data.province_code=== parseInt(e.layer.properties.code)){
                            b.push(data)
                        }
                    });
                });
                console.log(b,'b');
                }else{
                    this.props.automationReducer.automationTableData.map(data=>{
                        if(data.province_code=== parseInt(e.layer.properties.code)){
                            b.push({partner_id:data.partner_id, tablets:data.tablets})
                        }
                    })
                }
            }
            // console.log(this.props.automationReducer.automationTableData);
            
            
            console.log(b,'beforefilter');
            b.map(data=>{
                automationAllDataByPartner[0] && automationAllDataByPartner[0].partner_data.filter(function(e) {
                    // console.log(data,'data');
                    // console.log(e,'e');
                    if(e.partner_id === data.partner_id){
                        e.single_tablets = data.tablets;
                        c.push(e);
                    }
                })
            })
            // var result = 
              
              console.log(c)
            // const d= b.map(filteredPartnerId=>{
            //     automationAllDataByPartner[0] && automationAllDataByPartner[0].partner_data.filter(data=>{
            //         console.log(data,'data');
            //         return filteredPartnerId === data.partner_id;
            //     })
            // })
            // console.log(automationAllDataByPartner[0],'afterfilter');
            // if(e.layer.properties.municipality_code === )
                // console.log(e.layer);
            // console.log(map, "ee")
            // infoDiv.style.display = "block";
            // var provName = "";
            // // console.log(provName, "provName")
            // var level = "";
            // if(e.layer.properties.FIRST_PROV!=undefined && e.layer.properties.FIRST_PROV!=null){
            //     level = "province";
            //     provName = getProvinceName(e.layer.properties.id, "en")
            // }
            // else if(e.layer.properties.FIRST_DISTRICT!=undefined && e.layer.properties.FIRST_DISTRICT!=null){
            //     level = "district"
            //     provName = getProvinceName(e.layer.properties.provinceId, "en")
            // }
            // else {
            //     level = "municipality"
            //     provName = getProvinceName(e.layer.properties.provinceId, "en")
            // }
            // var html = `<div style="background: white;padding: 10px;"><span><b>${
            //     level == "province"?provName:level == "district"?e.layer.properties.FIRST_DISTRICT:e.layer.properties.Name
            //   }</b></span>`; 
            // html+= level != "province"?`,</br><span style="    text-transform: capitalize;">${level=="district"?provName:e.layer.properties.name.toLowerCase()}`:"";
            // html+= level != "province" && level != "district"?`, ${provName}</span></div>`:"";
            // infoDiv.innerHTML = html;
            // console.log(e.layer.options);
            // const a= e.layer.options.opacity;
            // total_tablet(pin):3316
            // total_branch(pin):889
            // total_partner(pin):12
            // total_beneficiary(pin):590324
            // id(pin):4
            // partner_id(pin):3
            // partner_name(pin):"Chhimek Laghubitta Bittiya Sanstha"
            // district_covered(pin):65
            // province_covered(pin):7
            // municipality_covered(pin):136
            // branch(pin):162
            // beneficiary(pin):752
            // lat(pin):27.695951
            // long(pin):85.338666
            // date(pin):2016
            // tablets_deployed(pin):863

            //TOTAL BRANCH 
            // <div class="icons"><i class="material-icons">business</i><b>${data.branch}</b>
            // </div>
        
            // console.log(automationAllDataByPartner,'data of Partners');
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
                        //             <div class="branch-info-list"><span>Branch1</span>
                        //                 <div class="icons"><i class="material-icons">tablet_mac</i><b>${data.tablets_deployed}</b></div>
                        //             </div>
                        //             <div class="branch-info-list"><span>Branch2</span>
                        //         <div class="icons"><i class="material-icons">tablet_mac</i><b>${data.tablets_deployed}</b>
                        //     </div>
                        // </div>
        this.props.activeOutreachButton && e.layer.options.activechoropleth=== true &&
            L.popup({keepInView: false,autoPan:false})
            .setContent(
                `<div class="leaflet-popup-content" style="width: 281px;">
                    <div class="map-popup-view">
                        <div class="map-popup-view-header">
                            <h5>${e.layer.properties.name}</h5>
                            <div class="icons">
                            <i class="material-icons">tablet_mac</i><b>${total_tablets}</b>
                            </div>
                        </div>
                        <ul style="height:112px;overflow-y: scroll">
                        ${popupHtml}
                        
                        </ul>
                        <div class="map-view-footer">
                    <div class="map-view-progress">
                        <div class="progress-item is-red" style="flex: 0 0 60%; max-width: 60%;"></div>
                        <div class="progress-item is-green" style="flex: 0 0 20%; max-width: 20%;"></div>
                        <div class="progress-item is-color5" style="flex: 0 0 20%; max-width: 20%;"></div>
                        </div>
                <div class="progress-value"><span class="red-value">60%</span><span class="green-value">20%</span><span class="is-color5">20%</span></div>
            </div>
            </div>
    </div>`
            )
            .setLatLng(e.latlng)
            .openOn(map)
            e.layer.setStyle({opacity:0.4});
            // e.layer.setPopupContent('<label>Automation</label');
            //     e.layer.openPopup();
        });
            // <li>
            //     <div class="organization-icon is-red"><span></span></div>
            //         <div class="organization-content">
            //             <div class="org-header"><h5>Mahila Samudayik Laghubitta</h5>
            //                 <div class="icon-list">
            //                 <div class="icons"><i class="material-icons">business</i><b>23</b></div>
            //                 <div class="icons"><i class="material-icons">tablet_mac</i><b>83</b></div>
            //             </div>
            //         </div>
            //             <div class="branch-info-list"><span>Branch1</span>
            //                 <div class="icons"><i class="material-icons">tablet_mac</i><b>83</b></div>
            //             </div>
            //             <div class="branch-info-list"><span>Branch2</span>
            //                 <div class="icons"><i class="material-icons">tablet_mac</i><b>83</b></div>
            //             </div>
            //     </div>
            // </li>

        province.on("mouseout",(e)=>{
            infoDiv.style.display = "none";
            infoDiv.innerHTML = "";
            e.layer.setStyle({opacity:0.1});
            // map.closePopup();



        })

    }

    componentWillMount(){
    
    }

    componentDidMount(){
        map = this.props.mapRef.current.leafletElement;
        province = this.vectorGridRef.current.leafletElement;
        // console.log(province, "refrefref")
        map.addLayer(vt_label_province);
        this.changeGrades();
        this.label();
        this.addMouseoverLayer();
        this.vectorTileFullyLoaded();

    }

    componentDidUpdate(prevProps, prevState){
        // console.log(JSON.stringify(prevProps.automationReducer.automationChoroplethData),'old props');
        // console.log(JSON.stringify(this.props.automationReducer.automationChoroplethData),'new props');

       if(prevProps.automationReducer.automationChoroplethData !== this.props.automationReducer.automationChoroplethData){
        // console.log(this.props.automationReducer.automationChoroplethData,'did update change');   
        this.changeGrades();
       }
       if(prevProps.activeOutreachButton !== this.props.activeOutreachButton){
           this.changeGrades();
       }
       if(prevProps.dataTypeLevel !== this.props.dataTypeLevel){
           this.changeGrades();
       }
       if(prevProps.vectorGridInputUrl !== this.props.vectorGridInputUrl){
        //    console.log('url changed')
           this.changeGrades();
       }
        // }
    }
    // fitBoundonMap=(bboxArray)=>{
    //     // map.fitBounds(bboxArray).extend;    
    //     this.state.bbox.extend(bboxArray);
    //     console.log(this.state.bbox);
    // }

    // extendBounds=(boundingbox)=>{
    //     let minX=boundingbox[0];
    //     let minY=boundingbox[1];
    //     let maxX=boundingbox[2];
    //     let maxY=boundingbox[3];
    //     const {bbox,count}=this.state;
    //     if(count===0){
    //         this.setState({bbox: [boundingbox[0],boundingbox[1],boundingbox[2],boundingbox[3]]});
    //         this.setState({count:1});
    //     }
    //     // // if(bbox[0] !== 0 && boundingbox[0] !== 0){
    //     //     console.log(boundingbox[0],'boundingbox[0]');
    //     //     console.log(boundingbox[1],'boundingbox[1]');
    //     //     console.log(boundingbox[2],'boundingbox[2]');
    //     //     console.log(boundingbox[3],'boundingbox[3]');
    //         minX = bbox[0] > boundingbox[0] ? boundingbox[0] : bbox[0];
    //     // }
    //     // if(bbox[1] !== 0 && boundingbox[1] !== 0){
    //         minY = bbox[1] > boundingbox[1] ? boundingbox[1] : bbox[1] 

    //     // }
    //     // if(bbox[2] !== 0 && boundingbox[2] !== 0){
        
    //         maxX = bbox[2] < boundingbox[2] ? boundingbox[2] : bbox[2]; 
    //     // }
    //     // if(bbox[3] !== 0 && boundingbox[3] !== 0){
    //         maxY = bbox[3] < boundingbox[3] ? boundingbox[3] : bbox[3];
    //     // }
    //     //   console.log(bbox[0],'bbox[0]');
    //     //     console.log(bbox[1],'bbox[1]');
    //     //     console.log(bbox[2],'bbox[2]');
    //     //     console.log(bbox[3],'bbox[3]');
    //     if(minX!==0 && minY!== 0 && maxX!== 0 && maxY!==0){
    //             // console.log('Inside Setstate')
    //         this.setState({bbox: [minX,minY,maxX,maxY]});
    //     }

    // }
    render() {
        // console.log(this.props.vectorGridUrl,'render url')
        // console.log(this.props.automationReducer.automationChoroplethData,'choropleth Data');
        // const provinceUrl = this.props.vectorGridUrl && this.props.vectorGridUrl != "" && typeof(this.props.vectorGridUrl) == "string"?this.props.vectorGridUrl:"https://geoserver.naxa.com.np/geoserver/gwc/service/tms/1.0.0/Bipad:Province@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf";
        const provinceUrl = this.props.vectorGridUrl && this.props.vectorGridUrl;
        // console.log(provinceUrl,"provinceUrl")
        var style = this.props.style && this.props.style != null?this.props.style:provinceDefaultStyle;
        var currentComponent= this;
        // console.log(this.props.style && this.props.style != null?this.props.style:provinceDefaultStyle, "defaultstyle")
        const province=this.vectorGridRef && this.vectorGridRef.current &&this.vectorGridRef.current.leafletElement
        // province && province.bindPopup('<label>BindPopup</label');
        // console.log(,'ref')
        const options = {
            // updateWhenIdle:true,
            
            type: 'protobuf',
            // tooltip: (feature) =>{
                // },
                getFeatureId: function (feature) {
                        // console.log(feature, "feature  ")
                        // console.log(layer, "feature  ")
                    province && province.setFeatureStyle(parseInt(feature.properties.code),style);
                // let bboxString= feature.properties.bbox;
                // var bboxArray= bboxString.split(",");
                // // console.log(bboxArray,'bboxaray')
                // const a = bboxArray.map(data=>{return parseFloat(data)});
                // const b = [a[1],a[0],a[3],a[2]];
                // currentComponent.extendBounds(b);
                
                // var corner1 = L.latLng(40.712, -74.227),
                // corner2 = L.latLng(40.774, -74.125),
                // bounds = L.latLngBounds(corner1, corner2);

                // console.log(b,'b');
                // console.log(bboxArray);
                
                // currentComponent.fitBoundonMap(bboxArray);
                return feature.properties.code;
            },
            url: provinceUrl,
            vectorTileLayerStyles: {default: style},
            subdomains: 'abcd',
            key: 'abcdefghi32223',
            // rendererFactory: L.canvas.tile,
            interactive:true,
            // rendererFactory: L.canvas..extend({
            //     _handleMouseHover: function (e, point){ 
            //         console.log(e,'eeee');
            //     }})
        };
        // console.log(this.vectorGridRef.current && this.vectorGridRef.current.props.getFeatureId(function (feature) {}),'vectorRef')
        return (
            <div>
                <VectorGrid updateWhenZooming={false} updateWhenIdle={false} {...options} ref={this.vectorGridRef} ></VectorGrid>
                <div style={{position: "absolute", display:  this.props.legend?"flex":"none", flexDirection: "column", zIndex: 1999, background: "white", padding: 5, bottom: 0, margin: 5,maxWidth: "358px",width: "520px"}}>
                <div>{this.props.choroplethTitle?this.props.choroplethTitle:"Legend"}</div>
                <div className="map-legend">
                            {/* <ScrollTab changetheme={this.props.changetheme}/> */}
                            <ul className="color-legend">
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
                                <li key={Math.random()}>
                                    <div style={{backgroundColor: hideLastdiv?"transparent":this.getLegendColor(grade+1)}} className="color color1"></div>
                                    <span style={{marginLeft: grade1.trim().length==1?-2:grade1.trim().length==2?-8:-12}}>{grade1}</span>
                                </li>
                            )
                        })
                    }
                        </ul>
                    </div>
                </div>
                <div ref={this.infoDivRef} className="infoDiv" style={{display:"none"}}></div>
            </div>
        )
    }
}
const mapStateToProps = ({ automationReducer }) => ({
    automationReducer,
});

export default connect(mapStateToProps, {filterDistrictFromProvinceColor})(VectorGridComponent)