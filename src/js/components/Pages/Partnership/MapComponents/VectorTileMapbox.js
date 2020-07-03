import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import province from '../../../../../data/province.json';
import district from '../../../../../data/district.json';
import municipality from '../../../../../data/municipality.json';

import {
  calculateRange,
  choroplethColorArray,
} from '../../../common/Functions';
import TimelineChart from './TimelineChart';

const defaultData = [
  { id: '1', count: 0 },
  { id: '2', count: 0 },
  { id: '3', count: 0 },
  { id: '4', count: 0 },
  { id: '5', count: 0 },
  { id: '6', count: 0 },
  { id: '7', count: 0 },
];
// gid": 77,
//     "districtid": 52,
//     "provinceid": 5,
//     "name": "RUKUM_E",
//     "centroid_x": 82.81076586,
//     "centroid_y": 28.67396361,
//     "bbox": "82.48569639000004,28.475450787000057,83.15244268300006,28.86920142400004"
const fullGeojsonProvince = {
  type: 'FeatureCollection',
  features: [],
};
province.map(data => {
  return fullGeojsonProvince.features.push({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [data.centroid_x, data.centroid_y],
    },
    properties: {
      name: data.prov_name,
      id: data.FIRST_PROV,
      code: data.FIRST_PROV,
    },
  });
});
const fullGeojsonDistrict = {
  type: 'FeatureCollection',
  features: [],
};
district.map(data => {
  return fullGeojsonDistrict.features.push({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [data.centroid_x, data.centroid_y],
    },
    properties: {
      name: data.name,
      id: data.gid,
      code: data.districtid,
    },
  });
});
const fullGeojsonMunicipality = {
  type: 'FeatureCollection',
  features: [],
};
municipality.map(data => {
  return fullGeojsonMunicipality.features.push({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [data.centroid_x, data.centroid_y],
    },
    properties: {
      name: data.lu_name,
      id: data.gid,
      code: data.munid,
    },
  });
});

// console.log(fullGeojsonProvince, 'province');
// console.log(fullGeojsonDistrict, 'district');
// console.log(fullGeojsonMunicipality, 'municipality');
class Choropleth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: [],
      legendColors: [],
      finalStyle: null,
    };
  }

  getLegendColor(value) {
    const { colorArray } = this.props;
    const { legendColors, grade } = this.state;
    const legendColor =
      colorArray != null && colorArray.length > 0
        ? colorArray
        : legendColors;
    let color = 'rgba(255,255,255,0)';
    // console.log(colorArray, "colorArray inside")
    // eslint-disable-next-line array-callback-return
    grade.map((gradeitem, j) => {
      if (value > gradeitem) {
        color = legendColor[j];
      }
    });
    return color;
  }

  changeGrades() {
    let range = [];
    const data = [];
    // console.log(this.props.choroplethData, "fulldata from")
    const colorArrayLength =
      this.props.colorArray && this.props.colorArray.length;
    const gradeCount =
      this.props.legendDivisions != null &&
      typeof this.props.legendDivisions === 'number' &&
      this.props.legendDivisions <= 20 &&
      this.props.legendDivisions >= colorArrayLength
        ? this.props.legendDivisions
        : 7; // set default gradecount

    const fullRange =
      this.props.divisions && this.props.divisions.length > 0
        ? this.props.divisions
        : [];
    const fullData =
      this.props.choroplethData != null &&
      this.props.choroplethData.length > 0
        ? this.props.choroplethData
        : defaultData;
    // console.log(fullData, "fulldata")
    if (
      this.props.choroplethData != null &&
      this.props.choroplethData.length > 0
    ) {
      this.props.choroplethData.forEach(data1 => {
        data.push(data1.count);
      });
    } else {
      defaultData.forEach(data1 => {
        data.push(data1.count); // if no dat passed take from default data
      });
    }

    // console.log(data, "data new")
    const max = Math.max.apply(null, Object.values(data));
    const min = 0; // Math.min(...data);
    // console.log(max, "max")
    // console.log(min, "min")
    range =
      (max - min) / (gradeCount - 1) < 1
        ? [0, 2, 4, 6, 8, 10, 12]
        : calculateRange(min, max, (max - min) / (gradeCount - 1));
    console.log(calculateRange(0, 100, (100 - 0) / (8 - 1), 'range'));
    this.setState({
      grade: fullRange.length > 0 ? fullRange : range,
    }); // add grade provided from props if available

    setTimeout(() => {
      this.ChangeLegendColors();
      this.setChoroplethStyle(fullData);
    }, 200);
  }

  ChangeLegendColors() {
    const choroplethColor = this.props.color;
    const color =
      choroplethColor !== undefined && choroplethColor.length > 0
        ? choroplethColor
        : '#ff0000';
    const data = this.state.grade;
    const choroplethColors = choroplethColorArray(data.length, color);
    // console.log(choroplethColors, "legendcolors")
    this.setState({ legendColors: choroplethColors });
  }

  setChoroplethStyle(values) {
    // console.log(values, "values")
    const expression = ['match', ['get', 'code']];
    values.forEach(value => {
      const color = this.getLegendColor(value.count);
      expression.push(value.id.toString(), color);
    });

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

    this.setState({ finalStyle: expression });
    // console.log(this.state.finalStyle,"finalstyl")
  }

  plotVectorTile = () => {
    const { map } = this.props;
    const that = this;
    // console.log(this.state.finalStyle, "this finalstyle")
    const hoveredStateId = null;
    map.on('load', function() {
      // Add Mapillary sequence layer.
      // https://www.mapillary.com/developer/tiles-documentation/#sequence-layer
      map.addSource('municipality', {
        type: 'vector',
        // 'interactive':true,
        tiles: [
          that.props.vectorTileUrl
            ? that.props.vectorTileUrl
            : 'https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}',
        ], // "https://apps.naxa.com.np/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=Naxa:educationpoint&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=application/vnd.mapbox-vector-tile&TILECOL={x}&TILEROW={y}"],
        minzoom: 0,
        maxzoom: 20,
        promoteId: { default: 'code' },
      });

      map.addLayer({
        id: 'vector-tile-fill',
        type: 'fill',
        source: 'municipality',
        'source-layer': 'default',
        activeChoropleth: false,
        paint: {
          'fill-color': that.state.finalStyle,
          'fill-opacity': 0.6,
        },
      });

      map.addLayer({
        id: 'vector-tile-outline',
        type: 'line',
        source: 'municipality',
        'source-layer': 'default',
        paint: {
          'line-color': 'rgba(0,0,0, 0.6)',
          'line-width': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            5,
            1,
          ],
        },
      });

      // fullGeojsonProvince.features.forEach((item, index) => {
      //   this.props.choroplethData.forEach(p => {
      //     if (p.code === item.properties.code) {
      //       fullGeojsonProvince.features[index].properties = {
      //         ...item.properties,
      //         ...p,
      //       };
      //     }
      //   });
      // });
      // map.addSource('fullGeojsonProvince', {
      //   type: 'geojson',
      //   data: fullGeojsonProvince,
      // });
      // map.addLayer({
      //   id: 'circles1',
      //   source: 'fullGeojsonProvince',
      //   type: 'circle',
      //   // 'source-layer': 'default',
      //   paint: {
      //     'circle-radius': ['get', 'count'],
      //     'circle-color': '#007cbf',
      //     'circle-opacity': 0.5,
      //     'circle-stroke-width': 0,
      //   },
      //   // filter: ['==', 'modelId', 1],
      // });
      // map.addLayer({
      //   id: 'singles-count',
      //   type: 'symbol',
      //   source: 'fullGeojsonProvince',
      //   // filter: ["has", "singles_count"],
      //   layout: {
      //     'text-field': ['get', 'count'],
      //     'text-allow-overlap': true,
      //     'text-font': [
      //       'DIN Offc Pro Medium',
      //       'Arial Unicode MS Bold',
      //     ],
      //     'text-size': 12,
      //     'text-ignore-placement': true,
      //   },
      //   paint: {
      //     'text-color': '#000000',
      //     'text-halo-color': 'rgba(255,255,255,0.95)',
      //     'text-halo-width': 1.5,
      //     'text-halo-blur': 1,
      //   },
      // });
      if (that.props.label) {
        // map.addLayer({
        //   id: 'vector-tile-outline',
        //   type: 'line',
        //   source: 'municipality',
        //   'source-layer': 'default',
        //   paint: {
        //     'line-color': 'rgba(255, 0, 0, 1)',
        //     'line-width': [
        //       'case',
        //       ['boolean', ['feature-state', 'hover'], false],
        //       5,
        //       1,
        //     ],
        //   },
        // });
        // if (that.props.label) {
        //   map.addLayer({
        //     id: 'vector-tile-label',
        //     type: 'symbol',
        //     source: 'municipality',
        //     'source-layer': 'default',
        //     layout: {
        //       'text-field': ['get', 'name'],
        //       'icon-image': ['concat', ['get', 'icon'], '-15'],
        //       'text-anchor': 'center',
        //       'text-offset': [0, 0],
        //       'symbol-placement': 'point',
        //       'text-justify': 'center',
        //       'text-size': 10,
        //     },
        //     paint: {
        //       'text-color': '#666',
        //       'text-halo-color': 'rgba(255,255,255,0.95)',
        //       'text-halo-width': 1.5,
        //       'text-halo-blur': 1,
        //     },
        //   });
        // }
      }
      // var bounds = coordinates.reduce(function(bounds, coord) {
      //   return bounds.extend(coord);
      //   }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
      // map.fitBounds()

      const popup = new mapboxgl.Popup();
      map.on('mousemove', 'circles1', function(e) {
        // console.log(e, 'event1st');
        // console.log(e.features[0], 'event');
        popup
          .setLngLat(e.lngLat)
          .setHTML(
            `<div class="leaflet-popup-content" style="width: 100px;">
              <div class="map-popup-view">
                  <div class="map-popup-view-header">
                      <h5>${e.features[0].properties.name}</h5>
                      <div class="icons">
                      <i class="material-icons">tablet_mac</i><b>${e.features[0].properties.count}</b>
                      </div>
                  </div>
                  <div class="map-view-footer">
                  </div>
                      </div>
                  </div>`,
          )
          .addTo(map);
        // console.log(e.features[0],'e');
        // e.features[0].id = e.features[0].properties.id;
        // console.log(e.features[0], "feature code")
        // console.log(that.props.automationReducer.automationAllDataByPartner,'allData');
        // const {
        //   automationAllDataByPartner,
        // } = that.props.automationReducer;
        // const { activeClickPartners, dataTypeLevel } = that.props;
        // // console.log(e.layer);
        // const b = [];
        // const c = [];
        // const v = [];
        // if (dataTypeLevel === 'municipality') {
        //   if (activeClickPartners.length > 0) {
        //     activeClickPartners.map(x => {
        //       // console.log(x,'x1st');
        //       that.props.automationReducer.automationTableData.filter(
        //         data => {
        //           if (
        //             data.partner_id === x &&
        //             data.municipality_code ===
        //               parseInt(e.features[0].properties.code, 10)
        //           ) {
        //             b.push(data);
        //           }
        //           return true;
        //         },
        //       );
        //       return true;
        //     });
        //     // console.log(b,'b');
        //   } else {
        //     that.props.automationReducer.automationTableData.map(
        //       data => {
        //         if (
        //           data.municipality_code ===
        //           parseInt(e.features[0].properties.code, 10)
        //         ) {
        //           b.push({
        //             partner_id: data.partner_id,
        //             tablets: data.tablets,
        //           });
        //         }
        //         return true;
        //       },
        //     );
        //   }
        // } else if (dataTypeLevel === 'district') {
        //   if (activeClickPartners.length > 0) {
        //     activeClickPartners.map(x => {
        //       that.props.automationReducer.automationTableData.filter(
        //         data => {
        //           if (
        //             data.partner_id === x &&
        //             data.district_code ===
        //               parseInt(e.features[0].properties.code, 10)
        //           ) {
        //             b.push(data);
        //           }
        //           return true;
        //         },
        //       );
        //       return true;
        //     });
        //     // console.log(b,'b');
        //   } else {
        //     that.props.automationReducer.automationTableData.map(
        //       data => {
        //         if (
        //           data.district_code ===
        //           parseInt(e.features[0].properties.code, 10)
        //         ) {
        //           b.push({
        //             partner_id: data.partner_id,
        //             tablets: data.tablets,
        //           });
        //         }
        //         return true;
        //       },
        //     );
        //   }
        // } else if (dataTypeLevel === 'province') {
        //   if (activeClickPartners.length > 0) {
        //     activeClickPartners.map(x => {
        //       that.props.automationReducer.automationTableData.filter(
        //         data => {
        //           if (
        //             data.partner_id === x &&
        //             data.province_code ===
        //               parseInt(e.features[0].properties.code, 10)
        //           ) {
        //             b.push(data);
        //           }
        //           return true;
        //         },
        //       );
        //       return true;
        //     });
        //     // console.log(b,'b');
        //   } else {
        //     that.props.automationReducer.automationTableData.map(
        //       data => {
        //         if (
        //           data.province_code ===
        //           parseInt(e.features[0].properties.code, 10)
        //         ) {
        //           b.push({
        //             partner_id: data.partner_id,
        //             tablets: data.tablets,
        //           });
        //         }
        //         return true;
        //       },
        //     );
        //   }
        // }
        // // console.log(b,'beforefilter');
        // b.map(data => {
        //   // eslint-disable-next-line no-unused-expressions
        //   automationAllDataByPartner[0] &&
        //     automationAllDataByPartner[0].partner_data.filter(
        //       // eslint-disable-next-line array-callback-return
        //       function(x) {
        //         // console.log(data,'data');
        //         // console.log(e,'e');
        //         if (x.partner_id === data.partner_id) {
        //           // eslint-disable-next-line no-param-reassign
        //           x.single_tablets = data.tablets;
        //           c.push(x);
        //         }
        //       },
        //     );
        //   return true;
        // });
        // // var result =
        // // console.log(c)
        // let totalTablets = 0;
        // const popupHtml =
        //   c &&
        //   c.map(data => {
        //     totalTablets += data.single_tablets;
        //     return `<li>
        //                 <div class="organization-icon"><span></span></div>
        //                     <div class="organization-content">
        //                         <div class="org-header">
        //                             <h5>${data.partner_name}</h5>
        //                                 <div class="icon-list">
        //                                         <div class="icons"><i class="material-icons">tablet_mac</i><b>${data.single_tablets}</b></div>
        //                                     </div>
        //                                 </div>
        //                                 </div>
        //                                 </li>`;
        //   });
        // map.getCanvas().style.cursor = 'pointer';
        // if (e.features.length > 0) {
        //   if (hoveredStateId) {
        //     map.setFeatureState(
        //       {
        //         source: 'municipality',
        //         sourceLayer: 'default',
        //         id: hoveredStateId,
        //       },
        //       { hover: false },
        //     );
        //     const colorCheck =
        //       e.features[0].layer.paint['fill-color'];
        //     const checkChoropleth =
        //       JSON.stringify(colorCheck) ===
        //       '{"r":0,"g":0,"b":0,"a":0}';
        //     // console.log(that.props.activeOutreachButton,'check')
        //     // console.log(c.length >0,'check1')
        //     if (that.props.activeOutreachButton && c.length > 0) {
        //       popup
        //         .setLngLat(e.lngLat)
        //         .setHTML(
        //           `<div class="leaflet-popup-content" style="width: 281px;">
        //   <div class="map-popup-view">
        //       <div class="map-popup-view-header">
        //           <h5>${e.features[0].properties.name}</h5>
        //           <div class="icons">
        //           <i class="material-icons">tablet_mac</i><b>${totalTablets}</b>
        //           </div>
        //       </div>
        //       <ul style="height:112px;overflow-y: scroll">
        //       ${popupHtml}
        //       </ul>
        //       <div class="map-view-footer">
        //       </div>
        //           </div>
        //       </div>`,
        //         )
        //         .addTo(map);
        //     }
        //     hoveredStateId = e.features[0].id;
        //     // console.log(hoveredStateId, "hoverstateid")
        //     map.setFeatureState(
        //       {
        //         source: 'municipality',
        //         sourceLayer: 'default',
        //         id: hoveredStateId,
        //       },
        //       { hover: false },
        //     );
        //   }
        // }
        // Popup On Hover
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
    });
    // console.log(document.getElementById('vector-tile-fill'), 'vctor');
    // map.addControl(new mapboxgl.NavigationControl());
  };

  componentDidMount() {
    this.changeGrades();
    this.plotVectorTile();
  }

  componentDidUpdate(prevProps, prevState) {
    const { map, vectorTileUrl } = this.props;
    if (
      prevProps.partnershipAllData !==
      this.props.partnershipReducer.partnershipAllData
    ) {
      console.log(this.props.partnershipAllData, 'alldata');
    }
    if (prevProps.circleMarkerData !== this.props.circleMarkerData) {
      // console.log(this.props.circleMarkerData, 'circlemarker ');
      if (this.props.mapViewBy === 'district') {
        // alert('district');
        // map.removeLayer('fullGeojsonProvince');
        // map.removeSource('fullGeojsonProvince');
        // map.removeLayer('fullGeojson');
        // map.removeSource('fullGeojson');
        fullGeojsonDistrict.features.forEach((item, index) => {
          this.props.circleMarkerData.forEach(p => {
            if (p.code === item.properties.code) {
              fullGeojsonDistrict.features[index].properties = {
                ...item.properties,
                ...p,
              };
            }
          });
        });
        map
          .getSource('fullGeojsonProvince')
          .setData(fullGeojsonDistrict);
        // map.addSource('fullGeojsonDistrict', {
        //   type: 'geojson',
        //   data: fullGeojsonDistrict,
        // });
        // map.addLayer({
        //   id: 'circles1',
        //   source: 'fullGeojsonDistrict',
        //   type: 'circle',
        //   // 'source-layer': 'default',
        //   paint: {
        //     'circle-radius': ['get', 'count'],
        //     'circle-color': '#007cbf',
        //     'circle-opacity': 0.5,
        //     'circle-stroke-width': 0,
        //   },
        //   // filter: ['==', 'modelId', 1],
        // });
        // map.addLayer({
        //   id: 'singles-count',
        //   type: 'symbol',
        //   source: 'fullGeojsonDistrict',
        //   // filter: ["has", "singles_count"],
        //   layout: {
        //     'text-field': ['get', 'count'],
        //     'text-allow-overlap': true,
        //     'text-font': [
        //       'DIN Offc Pro Medium',
        //       'Arial Unicode MS Bold',
        //     ],
        //     'text-size': 12,
        //     'text-ignore-placement': true,
        //   },
        //   paint: {
        //     'text-color': '#000000',
        //     'text-halo-color': 'rgba(255,255,255,0.95)',
        //     'text-halo-width': 1.5,
        //     'text-halo-blur': 1,
        //   },
        // });
      } else if (this.props.mapViewBy === 'municipality') {
        // map.removeLayer('fullGeojsonDistrict');
        // map.removeSource('fullGeojsonDistrict');
        fullGeojsonMunicipality.features.forEach((item, index) => {
          this.props.circleMarkerData.forEach(p => {
            if (p.code === item.properties.code) {
              fullGeojsonMunicipality.features[index].properties = {
                ...item.properties,
                ...p,
              };
            }
          });
        });
        // console.log(fullGeojsonMunicipality, 'fullgeojson');
        if (map.getSource('fullGeojsonProvince')) {
          map
            .getSource('fullGeojsonProvince')
            .setData(fullGeojsonMunicipality);
        }
        // map.addSource('fullGeojsonMunicipality', {
        //   type: 'geojson',
        //   data: fullGeojsonMunicipality,
        // });
        // map.addLayer({
        //   id: 'circles1',
        //   source: 'fullGeojsonMunicipality',
        //   type: 'circle',
        //   // 'source-layer': 'default',
        //   paint: {
        //     'circle-radius': ['get', 'count'],
        //     'circle-color': '#007cbf',
        //     'circle-opacity': 0.5,
        //     'circle-stroke-width': 0,
        //   },
        //   // filter: ['==', 'modelId', 1],
        // });
        // map.addLayer({
        //   id: 'singles-count',
        //   type: 'symbol',
        //   source: 'fullGeojsonMunicipality',
        //   // filter: ["has", "singles_count"],
        //   layout: {
        //     'text-field': ['get', 'count'],
        //     'text-allow-overlap': true,
        //     'text-font': [
        //       'DIN Offc Pro Medium',
        //       'Arial Unicode MS Bold',
        //     ],
        //     'text-size': 12,
        //     'text-ignore-placement': true,
        //   },
        //   paint: {
        //     'text-color': '#000000',
        //     'text-halo-color': 'rgba(255,255,255,0.95)',
        //     'text-halo-width': 1.5,
        //     'text-halo-blur': 1,
        //   },
        // });
      } else {
        // map.removeLayer('fullGeojson');
        // map.removeSource('fullGeojson');
        fullGeojsonProvince.features.forEach((item, index) => {
          this.props.circleMarkerData.forEach(p => {
            if (p.code === item.properties.code) {
              fullGeojsonProvince.features[index].properties = {
                ...item.properties,
                ...p,
              };
            }
          });
        });
        if (map.getSource('fullGeojsonProvince')) {
          map
            .getSource('fullGeojsonProvince')
            .setData(fullGeojsonProvince);
        } else {
          map.addSource('fullGeojsonProvince', {
            type: 'geojson',
            data: fullGeojsonProvince,
          });
          map.addLayer({
            id: 'circles1',
            source: 'fullGeojsonProvince',
            type: 'circle',
            // 'source-layer': 'default',
            paint: {
              'circle-radius': ['get', 'count'],
              'circle-color': '#007cbf',
              'circle-opacity': 0.5,
              'circle-stroke-width': 0,
            },
            // filter: ['==', 'modelId', 1],
          });
          map.addLayer({
            id: 'singles-count',
            type: 'symbol',
            source: 'fullGeojsonProvince',
            // filter: ["has", "singles_count"],
            layout: {
              'text-field': ['get', 'count'],
              'text-allow-overlap': true,
              'text-font': [
                'DIN Offc Pro Medium',
                'Arial Unicode MS Bold',
              ],
              'text-size': 12,
              'text-ignore-placement': true,
            },
            paint: {
              'text-color': '#000000',
              'text-halo-color': 'rgba(255,255,255,0.95)',
              'text-halo-width': 1.5,
              'text-halo-blur': 1,
            },
          });
        }
      }
    }
    if (prevProps.choroplethData !== this.props.choroplethData) {
      // map.addLayer({
      //   id: 'circle-tile-label',
      //   type: 'symbol',
      //   source: 'fullGeojsonProvince',
      //   'source-layer': 'default',
      //   layout: {
      //     'text-field': 'v',
      //     'icon-image': ['concat', ['get', 'icon'], '-15'],
      //     'text-anchor': 'center',
      //     'text-offset': [0, 0],
      //     'symbol-placement': 'point',
      //     'text-justify': 'center',
      //     'text-size': 10,
      //   },
      //   paint: {
      //     'text-color': '#666',
      //     'text-halo-color': 'rgba(255,255,255,0.95)',
      //     'text-halo-width': 1.5,
      //     'text-halo-blur': 1,
      //   },
      // });

      this.changeGrades();
      setTimeout(() => {
        // console.log(this.state.finalStyle, "inside finalstyle")
        // console.log("entered inside");
        map.setPaintProperty(
          'vector-tile-fill',
          'fill-color',
          this.state.finalStyle,
        );
      }, 1000);
    }
    if (prevProps.vectorTileUrl !== this.props.vectorTileUrl) {
      // console.log(this.props.vectorTileUrl,'vectorTIleUrl');
      // this.changeGrades();

      const newStyle = map.getStyle();
      newStyle.sources.municipality.tiles = [
        this.props.vectorTileUrl,
      ];
      map.setStyle(newStyle);
      // district.forEach(function(marker) {
      //   // create a DOM element for the marker
      //   const el = document.createElement('div');
      //   el.className = 'marker circle';
      //   // el.style.backgroundImage = `url(https://placekitten.com/g/${marker.districtid})`;
      //   el.style.width = `24px`;
      //   el.style.height = `24px`;
      //   // el.innerHTML = '23';
      //   el.addEventListener('click', function() {
      //     window.alert(marker.districtid);
      //   });

      //   // add marker to map
      //   new mapboxgl.Marker(el)
      //     .setLngLat([marker.centroid_x, marker.centroid_y])
      //     .addTo(map);
      // });
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
    if (prevProps.vectorTileUrl !== vectorTileUrl) {
      // this.changeGrades();
      this.plotVectorTile();
    }
    // if (prevState.finalStyle !== this.state.finalStyle) {
    // }
  }

  render() {
    const { choroplethLegend, legendColors } = this.state;
    return (
      <>
        <div className="map-legend newmap-legend">
          <div className="color-list">
            <h6>Number of Projects</h6>
            <ul id="state-legend" className="color-legend">
              {this.state.grade &&
                this.state.grade.map((grade, i) => {
                  let hideLastdiv = false;
                  hideLastdiv =
                    i === this.state.grade.length - 1 ? true : false;
                  const grade1 =
                    grade < 1000
                      ? grade.toString()
                      : this.getShortNumbers(grade, 1);
                  // uncomment this to add vertical legend
                  // return <div><div style={{width:"12px", height:"12px", backgroundColor: this.getLegendColor(this.state.grade[i] + 1), border:"solid 1px #e2e2e2", display:"inline-block"}}></div> <span>{this.state.grade[i]} {this.state.grade[i + 1]?"-"+this.state.grade[i + 1]: "+"}</span></div>
                  // uncomment this to add horizontal legend
                  // return <div style={{display:"inline-block"}}><div style={{width:"12px", height:"12px", backgroundColor: this.getLegendColor(this.state.grade[i] + 1), border:"solid 1px #e2e2e2", display:"inline-block", marginLeft:"5px"}}></div> <span >{this.state.grade[i]} {this.state.grade[i + 1]?"-"+this.state.grade[i + 1]: "+"}</span></div>
                  // uncomment this to add nice horizontal legend
                  return (
                    <li>
                      <div
                        style={{
                          backgroundColor: hideLastdiv
                            ? 'transparent'
                            : this.getLegendColor(grade + 1),
                        }}
                        className="color color1"
                      />
                      <span
                        style={{
                          marginLeft:
                            grade1.trim().length === 1
                              ? -2
                              : grade1.trim().length === 2
                              ? -8
                              : -12,
                        }}
                      >
                        {grade1}
                      </span>
                    </li>
                  );
                })}
              {/* <li>
                <div style={{ 'background-color': '#723122' }} className="color" />
                <span>25,000,000</span>
              </li>
              <li>
                <div style={{ 'background-color': '#8B4225' }} className="color" />
                <span>10,000,000</span>
              </li>
              <li>
                <div style={{ 'background-color': '#A25626' }} className="color" />
                <span>7,500,000</span>
              </li>
              <li>
                <div style={{ 'background-color': '#B86B25' }} className="color" />
                <span>5,000,000</span>
              </li>
              <li>
                <div style={{ 'background-color': '#CA8323' }} className="color" />
                <span>2,500,000</span>
              </li>
              <li>
                <div className="color" style={{ 'background-color': '#DA9C20' }} />
                <span>1,000,000</span>
              </li>
              <li>
                <div style={{ 'background-color': '#E6B71E' }} className="color" />
                <span>750,000</span>
              </li>
              <li>
                <div style={{ 'background-color': '#EED322' }} className="color" />
                <span>500,000</span>
              </li>
              <li>
                <div style={{ 'background-color': '#F2F12D' }} className="color" />
                <span> 0</span>
              </li> */}
            </ul>
          </div>
          {/* <div className="overlay-data">
            <h6>overlay data</h6>
            <div className="widget-tag">
              <a href="#">
                <i className="material-icons">store</i>
                <span>Branch</span>
              </a>
              <a href="#">
                <i className="material-icons">store</i>
                <span>BLB</span>
              </a>
              <a href="#">
                <i className="material-icons">store</i>
                <span>Extention Counter</span>
              </a>
              <a href="#">
                <i className="material-icons">tablet</i>
                <span>Tablet</span>
              </a>
              <a href="#">
                <i className="material-icons">store</i>
                <span>Other major product</span>
              </a>
            </div>
          </div> */}
        </div>
        <TimelineChart />
      </>
    );
  }
}
const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});

export default connect(mapStateToProps, {})(Choropleth);
