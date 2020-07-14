// /* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import * as d3 from 'd3';
import powerplants from '../../../../../data/testcircledata.json';
import province from '../../../../../data/province.json';
import district from '../../../../../data/district.json';
import municipality from '../../../../../data/municipality.json';
import {
  calculateRange,
  choroplethColorArray,
} from '../../../common/Functions';
import TimelineChart from './TimelineChart';
import { getCenterBboxProvince } from '../common/ProvinceFunction';
import MarkerPieChart from '../Charts/MarkerPieChart/MarkerPieChart';

function removeMarker() {
  if (global.markerList !== null) {
    for (let i = global.markerList.length - 1; i >= 0; i -= 1) {
      global.markerList[i].remove();
    }
  }
}
// var colors = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c'];
const colors = [
  '#8dd3c7',
  '#ffffb3',
  '#bebada',
  '#fb8072',
  '#80b1d3',
  '#fdb462',
  '#b3de69',
  '#fccde5',
  '#d9d9d9',
  '#bc80bd',
  '#ccebc5',
];
const colorScale = d3
  .scaleOrdinal()
  .domain([
    'Automation of MFIs',
    'Channel Innovations',
    'Digital Financial Services',
    'Downscaling and Value Chain Financing By Banks',
    'Increased uptake of microinsurance',
    'Outreach Expansion',
    'Product Innovations',
    'SME Financing',
  ])
  .range(colors);
function CaculateCount(date, finalData, api) {
  const startDate = date[0];
  const endDate = date[1];
  // console.log(date, 'date');
  // console.log(finalData, 'finalData');
  // console.log(api, 'api');
  finalData.map((prov, i) => {
    // console.log(prov, 'prov 1st loop');
    api.map(data => {
      if (prov.id === data.municipality_id) {
        // console.log(startDate, ' local startDate');
        // console.log(data.start_date, 'api startDate');
        // console.log(endDate, 'endDate');
        // console.log(data.start_date, 'api startDate');
        // console.log(startDate >= data.start_date, '1st date');
        // console.log(endDate <= data.start_date, '2nd date');
        if (
          data.start_date >= startDate &&
          data.start_date <= endDate
        ) {
          // console.log(data, 'data 3rd Loop');
          // console.log(data,'')
          // eslint-disable-next-line no-param-reassign
          finalData[i].count += 1;
        }
      }
      return true;
    });
    return true;
  });
}
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
      allocated_beneficiary: 0,
      allocated_budget: 0,
    },
  });
});
let timelineKey = 1;
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
      minValue: '2015-01-01',
      maxValue: '2020-01-01',
      key: 1,
      playClick: false,
      circleMarkerRadius: null,
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

  setCircleMarkerRadius(values, viewdataBy) {
    // console.log(values, 'values');
    // const expression = ['match', ['get', 'code']];
    values.forEach(value => {
      // console.log(value.properties, 'prop');
      // console.log(
      //   value.properties.allocated_beneficiary,
      //   'all benef',
      // );
      // console.log(value, 'Circleradius FUnction');
      const color = this.getLegendColor(
        value.properties.allocated_beneficiary,
      );
      // expression.push(value.properties.id.toString(), color);
    });
    // eslint-disable-next-line prefer-spread
    const maxValue = Math.max.apply(
      Math,
      values.map(function(o) {
        return viewdataBy === 'allocated_beneficiary'
          ? o.properties.allocated_beneficiary
          : o.properties.allocated_budget;
      }),
    );
    // eslint-disable-next-line prefer-spread
    const minValue = Math.min.apply(
      Math,
      values.map(function(o) {
        return viewdataBy === 'allocated_beneficiary'
          ? o.properties.allocated_beneficiary
          : o.properties.allocated_budget;
      }),
    );
    // console.log(maxValue, 'maxValue');
    // console.log(minValue, 'minValue');
    // New Value=(( Old Value - Old minimum value) / (old maximum value - old minimum value))*(New maximum value- New minimum Value) + New minimum value
    const a = values.map(data => {
      return {
        ...data,
        properties: {
          ...data.properties,
          radiusRange:
            ((viewdataBy === 'allocated_beneficiary'
              ? data.properties.allocated_beneficiary
              : data.properties.allocated_budget - minValue) /
              (maxValue - minValue)) *
              (30 - 10) +
            10,
        },
      };
    });
    console.log(a);
    return a;
    // console.log(a);
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
    // expression.push('rgba(0,0,0,0)');
    // console.log(expression, 'exp');
    // this.setState({ circleMarkerRadius: expression });
    // console.log(this.state.finalStyle,"finalstyl")
  }

  createDonutChart = (props, totals) => {
    const div = document.createElement('div');
    const data = [
      {
        type: 'Automation of MFIs',
        count: props['Automation of MFIs'],
      },
      {
        type: 'Channel Innovations',
        count: props['Channel Innovations'],
      },
      {
        type: 'Digital Financial Services',
        count: props['Digital Financial Services'],
      },
      {
        type: 'Downscaling and Value Chain Financing By Banks',
        count:
          props['Downscaling and Value Chain Financing By Banks'],
      },
      {
        type: 'Increased uptake of microinsurance',
        count: props['Increased uptake of microinsurance'],
      },
      {
        type: 'Outreach Expansion',
        count: props['Outreach Expansion'],
      },
      {
        type: 'Product Innovations',
        count: props['Product Innovations'],
      },
      {
        type: 'SME Financing',
        count: props['SME Financing'],
      },
    ];

    const thickness = 10;
    const scale = d3
      .scaleLinear()
      .domain([d3.min(totals), d3.max(totals)])
      .range([d3.min(totals), d3.max(totals)]);

    const radius = scale(props.point_count - 10);
    const circleRadius = radius - thickness;
    const svg = d3
      .select(div)
      .append('svg')
      .attr('class', 'pie')
      .attr('width', radius * 2)
      .attr('height', radius * 2);

    // center
    const g = svg
      .append('g')
      .attr('transform', `translate(${radius}, ${radius})`);
    const piepopup = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip-donut')
      .style('opacity', 0);
    const arc = d3
      .arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius);

    const pie = d3
      .pie()
      .value(d => d.count)
      .sort(null);

    const path = g
      .selectAll('path')
      .data(pie(data.sort((x, y) => d3.ascending(y.count, x.count))))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => colorScale(d.data.type))
      .on('mouseover', function(d, i) {
        console.log(d, 'mouseover');
        piepopup
          .transition()
          .duration(50)
          .style('opacity', 1);
        d3.select(this)
          .transition()
          .duration('50')
          .attr('opacity', '.65');
      })
      .on('mouseout', function(d, i) {
        piepopup
          .transition()
          .duration('50')
          .style('opacity', 0);
        d3.select(this)
          .transition()
          .duration('50')
          .attr('opacity', '1');
      });

    const circle = g
      .append('circle')
      .attr('r', circleRadius)
      .attr('fill', 'rgba(0, 0, 0, 0)')
      .attr('class', 'center-circle');

    // const text = g
    //   .append('text')
    //   .attr('class', 'total')
    //   .text(props.point_count)
    //   .attr('text-anchor', 'middle')
    //   .attr('dy', 5)
    //   .attr('fill', 'white');

    // const infoEl = createTable(props);

    // svg.on('click', () => {
    //   d3.selectAll('.center-circle').attr(
    //     'fill',
    //     'rgba(0, 0, 0, 0.7)',
    //   );
    //   circle.attr('fill', 'rgb(71, 79, 102)');
    //   document.getElementById('key').innerHTML = '';
    //   document.getElementById('key').append(infoEl);
    // });

    return div;
  };

  plotVectorTile = () => {
    const { map } = this.props;
    const that = this;
    // console.log(this.state.finalStyle, "this finalstyle")
    let hoveredStateId = null;
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
            2,
            1,
          ],
        },
      });
      // filters for classifying earthquakes into five categories based on magnitude

      // console.log(fullGeojsonProvince, 'fullgeojsonpro');
      // console.log(powerplants, 'powerplants');
      // PieChart in Marker Start

      // PieChart in Marker End

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
      map.on('zoom', function() {
        // const that = this;
        // upto 6 province view after 6 and upto 9  district and after 9 municipality
        // console.log(map.getZoom(), 'zoom Level');
        // if (map.getZoom() <= 6) {
        //   console.log('province');
        //   that.props.setMapViewBy('province');
        // } else if (map.getZoom() <= 9) {
        //   console.log('district');
        //   that.props.setMapViewBy('district');
        // } else if (map.getZoom() > 9) {
        //   console.log('municipality');
        //   that.props.setMapViewBy('municipality');
        // }
        // if (map.getZoom() >= 4) {
        //   stateLegendEl.style.display = 'none';
        //   countyLegendEl.style.display = 'block';
        // } else if (map.getZoom() >= 8) {
        //   stateLegendEl.style.display = 'block';
        //   countyLegendEl.style.display = 'none';
        // }
      });
      map.on('click', 'vector-tile-fill', function(e) {
        // console.log(e.features[0].properties.code, 'e');
        // console.log(e.features[0], 'e');
        // console.log(
        //   getCenterBboxProvince(e.features[0].properties.code),
        // );
        const getBbox = getCenterBboxProvince(
          e.features[0].properties.code,
        );
        map.fitBounds(getBbox.bbox);
        that.props.handleFederalClickOnMap(
          'district',
          e.features[0].properties.code,
        );
        that.props.setMapViewBy('district');
      });
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
                      <i class="material-icons">tablet_mac</i><b>${
                        e.features[0].properties[
                          that.props.mapViewDataBy
                        ]
                      }</b>
                      </div>
                  </div>
                  <div class="map-view-footer">
                  </div>
                      </div>
                  </div>`,
          )
          .addTo(map);
      });
      map.on('mousemove', 'vector-tile-fill', function(e) {
        if (e.features.length > 0) {
          if (hoveredStateId) {
            map.setFeatureState(
              {
                source: 'municipality',
                sourceLayer: 'default',
                id: hoveredStateId,
              },
              { hover: false },
            );
          }
          hoveredStateId = e.features[0].id;
          map.setFeatureState(
            {
              source: 'municipality',
              sourceLayer: 'default',
              id: hoveredStateId,
            },
            { hover: true },
          );
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      map.on('mouseleave', 'vector-tile-fill', function() {
        if (hoveredStateId) {
          map.setFeatureState(
            {
              source: 'municipality',
              sourceLayer: 'default',
              id: hoveredStateId,
            },
            { hover: false },
          );
        }
        hoveredStateId = null;
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
      global.markerList = [];
      fullGeojsonProvince.features.forEach((item, index) => {
        that.props.choroplethData.forEach(p => {
          if (p.code === item.properties.code) {
            fullGeojsonProvince.features[index].properties = {
              ...item.properties,
              ...p,
            };
          }
        });
      });
      console.log(fullGeojsonProvince, 'fullGeojsonProvince');
      // const testEl = createDonutChart(a,b);
      let singleData = {};
      let singleData2nd = {};
      const total = [];
      const total2nd = [];

      // const getPointCount = features => {
      //   features.forEach(f => {
      //     if (f.properties.cluster) {
      //       total.push(f.properties.point_count);
      //     }
      //   });

      //   return total;
      // };
      fullGeojsonProvince.features.forEach(data => {
        // console.log(data, 'data');
        singleData2nd = {
          point_count: 0,
        };
        data.properties.pie.forEach(piedata => {
          // console.log(piedata);
          singleData2nd[`${piedata.investment_primary}`] =
            piedata.project_count;
          singleData2nd.point_count += piedata.project_count;
        });
        total2nd.push(singleData2nd.point_count);
      });
      // console.log(total2nd, 'total');
      fullGeojsonProvince.features.forEach(data => {
        // console.log(data, 'data');
        singleData = {
          point_count: 0,
        };
        data.properties.pie.forEach(piedata => {
          // console.log(piedata);
          singleData[`${piedata.investment_primary}`] =
            piedata.project_count;
          singleData.point_count += piedata.project_count;
        });
        total.push(singleData.point_count);
        // console.log(singleData, 'singleData');
        // console.log(total, 'total');
        const testElMain = document.createElement('div');
        testElMain.className = 'marker';
        const props = data.properties;
        // eslint-disable-next-line no-use-before-define
        const testEl = that.createDonutChart(singleData, total2nd);

        const marker = new mapboxgl.Marker({ element: testEl })
          .setLngLat(data.geometry.coordinates)
          .addTo(map);
        global.markerList.push(marker);
      });
      // global.marker.remove();
      const withRadius = that.setCircleMarkerRadius(
        fullGeojsonProvince.features,
        that.props.mapViewDataBy,
      );
      fullGeojsonProvince.features = withRadius;

      // const test = createDonutChart(a,b);
      // console.log(test,'test')
      // console.log(fullGeojsonProvince, 'outputProvince');

      // if (map.getSource('fullGeojsonProvince')) {
      //   map
      //     .getSource('fullGeojsonProvince')
      //     .setData(fullGeojsonProvince);
      // } else {
      //   map.addSource('fullGeojsonProvince', {
      //     type: 'geojson',
      //     data: fullGeojsonProvince,
      //   });
      //   map.addLayer({
      //     id: 'circles1',
      //     source: 'fullGeojsonProvince',
      //     type: 'circle',
      //     // 'source-layer': 'default',
      //     paint: {
      //       'circle-radius': ['get', 'radiusRange'],
      //       // 'circle-radius': 20,
      //       'circle-color': '#FFE300',
      //       'circle-opacity': 0.5,
      //       'circle-stroke-width': 0,
      //     },
      //     // filter: ['==', 'modelId', 1],
      //   });

      // map.addLayer({
      //   id: 'singles-count',
      //   type: 'symbol',
      //   source: 'fullGeojsonProvince',
      //   // filter: ["has", "singles_count"],
      //   layout: {
      //     'text-field': ['get', 'allocated_beneficiary'],
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
      // }
    });
    // const createDonutChart = (props, totals) => {
    //   const div = document.createElement('div');
    //   const data = [
    //     {
    //       type: 'Automation of MFIs',
    //       count: props['Automation of MFIs'],
    //     },
    //     {
    //       type: 'Channel Innovations',
    //       count: props['Channel Innovations'],
    //     },
    //     {
    //       type: 'Digital Financial Services',
    //       count: props['Digital Financial Services'],
    //     },
    //     {
    //       type: 'Downscaling and Value Chain Financing By Banks',
    //       count:
    //         props['Downscaling and Value Chain Financing By Banks'],
    //     },
    //     {
    //       type: 'Increased uptake of microinsurance',
    //       count: props['Increased uptake of microinsurance'],
    //     },
    //     {
    //       type: 'Outreach Expansion',
    //       count: props['Outreach Expansion'],
    //     },
    //     {
    //       type: 'Product Innovations',
    //       count: props['Product Innovations'],
    //     },
    //     { type: 'SME Financing', count: props['SME Financing'] },
    //   ];

    //   const thickness = 15;
    //   const scale = d3
    //     .scaleLinear()
    //     .domain([d3.min(totals), d3.max(totals)])
    //     .range([d3.min(totals), d3.max(totals)]);

    //   const radius = scale(props.point_count);
    //   const circleRadius = radius - thickness;
    //   const svg = d3
    //     .select(div)
    //     .append('svg')
    //     .attr('class', 'pie')
    //     .attr('width', radius * 2)
    //     .attr('height', radius * 2);

    //   // center
    //   const g = svg
    //     .append('g')
    //     .attr('transform', `translate(${radius}, ${radius})`);

    //   const arc = d3
    //     .arc()
    //     .innerRadius(radius - thickness)
    //     .outerRadius(radius);

    //   const pie = d3
    //     .pie()
    //     .value(d => d.count)
    //     .sort(null);

    //   const path = g
    //     .selectAll('path')
    //     .data(
    //       pie(data.sort((x, y) => d3.ascending(y.count, x.count))),
    //     )
    //     .enter()
    //     .append('path')
    //     .attr('d', arc)
    //     .attr('fill', d => colorScale(d.data.type));

    //   const circle = g
    //     .append('circle')
    //     .attr('r', circleRadius)
    //     .attr('fill', 'rgba(0, 0, 0, 0.7)')
    //     .attr('class', 'center-circle');

    //   const text = g
    //     .append('text')
    //     .attr('class', 'total')
    //     .text(props.point_count)
    //     .attr('text-anchor', 'middle')
    //     .attr('dy', 5)
    //     .attr('fill', 'white');

    //   // const infoEl = createTable(props);

    //   // svg.on('click', () => {
    //   //   d3.selectAll('.center-circle').attr(
    //   //     'fill',
    //   //     'rgba(0, 0, 0, 0.7)',
    //   //   );
    //   //   circle.attr('fill', 'rgb(71, 79, 102)');
    //   //   document.getElementById('key').innerHTML = '';
    //   //   document.getElementById('key').append(infoEl);
    //   // });

    //   return div;
    // };
    // function createDonutChart(props) {
    //   var offsets = [];
    //   var counts = [
    //   props.mag1,
    //   props.mag2,
    //   props.mag3,
    //   props.mag4,
    //   props.mag5
    //   ];
    //   var total = 0;
    //   for (var i = 0; i < counts.length; i++) {
    //   offsets.push(total);
    //   total += counts[i];
    //   }
    //   var fontSize =
    //   total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
    //   var r = total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
    //   var r0 = Math.round(r * 0.6);
    //   var w = r * 2;

    //   var html =
    //   '<div><svg width="' +
    //   w +
    //   '" height="' +
    //   w +
    //   '" viewbox="0 0 ' +
    //   w +
    //   ' ' +
    //   w +
    //   '" text-anchor="middle" style="font: ' +
    //   fontSize +
    //   'px sans-serif; display: block">';

    //   for (i = 0; i < counts.length; i++) {
    //   html += donutSegment(
    //   offsets[i] / total,
    //   (offsets[i] + counts[i]) / total,
    //   r,
    //   r0,
    //   colors[i]
    //   );
    //   }
    //   html +=
    //   '<circle cx="' +
    //   r +
    //   '" cy="' +
    //   r +
    //   '" r="' +
    //   r0 +
    //   '" fill="white" /><text dominant-baseline="central" transform="translate(' +
    //   r +
    //   ', ' +
    //   r +
    //   ')">' +
    //   total.toLocaleString() +
    //   '</text></svg></div>';

    //   var el = document.createElement('div');
    //   el.innerHTML = html;
    //   return el.firstChild;
    //   }

    //   function donutSegment(start, end, r, r0, color) {
    //   if (end - start === 1) end -= 0.00001;
    //   var a0 = 2 * Math.PI * (start - 0.25);
    //   var a1 = 2 * Math.PI * (end - 0.25);
    //   var x0 = Math.cos(a0),
    //   y0 = Math.sin(a0);
    //   var x1 = Math.cos(a1),
    //   y1 = Math.sin(a1);
    //   var largeArc = end - start > 0.5 ? 1 : 0;

    //   return [
    //   '<path d="M',
    //   r + r0 * x0,
    //   r + r0 * y0,
    //   'L',
    //   r + r * x0,
    //   r + r * y0,
    //   'A',
    //   r,
    //   r,
    //   0,
    //   largeArc,
    //   1,
    //   r + r * x1,
    //   r + r * y1,
    //   'L',
    //   r + r0 * x1,
    //   r + r0 * y1,
    //   'A',
    //   r0,
    //   r0,
    //   0,
    //   largeArc,
    //   0,
    //   r + r0 * x0,
    //   r + r0 * y0,
    //   '" fill="' + color + '" />'
    //   ].join(' ');
    //   }
    // console.log(document.getElementById('vector-tile-fill'), 'vctor');
    // map.addControl(new mapboxgl.NavigationControl());
  };

  componentDidMount() {
    this.changeGrades();
    this.plotVectorTile();
  }

  componentDidUpdate(prevProps, prevState) {
    const { map, vectorTileUrl } = this.props;
    // if (
    //   prevProps.partnershipAllData !==
    //   this.props.partnershipReducer.partnershipAllData
    // ) {
    //   const { partnershipAllData } = this.props.partnershipReducer;
    //   console.log(
    //     this.props.partnershipReducer.partnershipAllData,
    //     'alldata',
    //   );
    //   const provincedata = [];
    //   // const finalData = [];
    //   // district.map(mun => {
    //   //   provincedata.push({
    //   //     id: mun.districtid,
    //   //     count: 0,
    //   //   });
    //   //   return true;
    //   // });
    //   const finalData = [];
    //   municipality.map(mun => {
    //     provincedata.push({
    //       id: mun.munid,
    //       count: 0,
    //     });
    //     return true;
    //   });
    //   // const workers = new WebWorker(worker);
    //   // workers.postMessage({
    //   //   state: { clonePrimaryGeojson, primaryGeojson },
    //   //   action: { payload },
    //   // });
    //   // workers.addEventListener('message', event => {
    //   //   dispatch({
    //   //     type: FILTER_PRIMARYGEOJSON,
    //   //     payload: event.data,
    //   //   });
    //   // });
    //   CaculateCount(
    //     ['2015-01-01', '2019-02-01'],
    //     provincedata,
    //     partnershipAllData,
    //   );
    //   console.log(provincedata, 'finalData');
    //   // console.log(provincedata, 'provincedata');
    // }

    // if ( prevProps.mapViewDataBy !== this.props.mapViewDataBy) {
    //  if(this.props.mapViewDataBy === 'investment_focus'){

    //     fullGeojsonProvince.features.forEach((item, index) => {
    //       this.props.circleMarkerData.forEach(p => {
    //         if (p.code === item.properties.code) {
    //           fullGeojsonProvince.features[index].properties = {
    //             ...item.properties,
    //             ...p,
    //           };
    //         }
    //       });
    //     });
    //     const withRadius = this.setCircleMarkerRadius(
    //       fullGeojsonProvince.features,
    //       this.props.mapViewDataBy,
    //     );
    //     fullGeojsonProvince.features = withRadius;
    //     fullGeojsonProvince.features.forEach(data=>{
    //       // console.log(data,'data');
    //       const testElMain = document.createElement('div');
    //       testElMain.className = 'marker';
    //       testElMain.innerHTML='<svg width="100" height="100" viewBox="0 0 100 100" text-anchor="middle" style="font: 22px sans-serif; display: block"><path d="M 50 20 L 50 0 A 50 50 0 1 1 0.005684784409183408 50.75395366180185 L 20.00341087064551 50.45237219708111 A 30 30 0 1 0 50 20 " fill="#fed976"></path><path d="M 20.00341087064551 50.45237219708111 L 0.005684784409183408 50.75395366180185 A 50 50 0 0 1 34.728529581887344 2.3892639075102053 L 40.8371177491324 21.433558344506125 A 30 30 0 0 0 20.00341087064551 50.45237219708111 " fill="#feb24c"></path><path d="M 40.8371177491324 21.433558344506125 L 34.728529581887344 2.3892639075102053 A 50 50 0 0 1 47.61329688057537 0.05699600324657439 L 48.567978128345224 20.034197601947945 A 30 30 0 0 0 40.8371177491324 21.433558344506125 " fill="#fd8d3c"></path><path d="M 48.567978128345224 20.034197601947945 L 47.61329688057537 0.05699600324657439 A 50 50 0 0 1 49.68584280172206 0.0009869571931417909 L 49.81150568103324 20.000592174315887 A 30 30 0 0 0 48.567978128345224 20.034197601947945 " fill="#fc4e2a"></path><path d="M 49.81150568103324 20.000592174315887 L 49.68584280172206 0.0009869571931417909 A 50 50 0 0 1 49.99999999999999 0 L 49.99999999999999 20 A 30 30 0 0 0 49.81150568103324 20.000592174315887 " fill="#e31a1c"></path><circle cx="50" cy="50" r="30" fill="white"></circle><text dominant-baseline="central" transform="translate(50, 50)">5,000</text></svg>'
    //       var marker = new mapboxgl.Marker(testElMain)
    //       .setLngLat(data.geometry.coordinates)
    //       .addTo(map);
    //     });

    //     // this.setCircleMarkerRadius(fullGeojsonProvince.features);
    //     // if (map.getSource('fullGeojsonProvince')) {

    //     // } else {

    //     // }

    //   // if (prevProps.mapViewDataBy !== this.props.mapViewDataBy) {

    //  }
    // }
    if (prevProps.circleMarkerData !== this.props.circleMarkerData) {
      // if(this.props.mapViewDataBy === )
      removeMarker();
      console.log(this.props.circleMarkerData, 'circlemarker ');
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
        const withRadius = this.setCircleMarkerRadius(
          fullGeojsonDistrict.features,
          this.props.mapViewDataBy,
        );
        fullGeojsonDistrict.features = withRadius;

        // this.setCircleMarkerRadius(fullGeojsonMunicipality.features);
        if (map.getSource('fullGeojsonProvince')) {
          map
            .getSource('fullGeojsonProvince')
            .setData(fullGeojsonDistrict);
        } else {
          map.addSource('fullGeojsonProvince', {
            type: 'geojson',
            data: fullGeojsonDistrict,
          });
          map.addLayer({
            id: 'circles1',
            source: 'fullGeojsonProvince',
            type: 'circle',
            // 'source-layer': 'default',
            paint: {
              'circle-radius': ['get', 'radiusRange'],
              // 'circle-radius': 20,
              'circle-color': '#FFE300',
              'circle-opacity': 0.5,
              'circle-stroke-width': 0,
            },
            // filter: ['==', 'modelId', 1],
          });
        }
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
        const withRadius = this.setCircleMarkerRadius(
          fullGeojsonMunicipality.features,
          this.props.mapViewDataBy,
        );
        fullGeojsonMunicipality.features = withRadius;
        // this.setCircleMarkerRadius(fullGeojsonDistrict.features);
        // console.log(fullGeojsonMunicipality, 'fullgeojson');
        if (map.getSource('fullGeojsonProvince')) {
          map
            .getSource('fullGeojsonProvince')
            .setData(fullGeojsonMunicipality);
        } else {
          map.addSource('fullGeojsonProvince', {
            type: 'geojson',
            data: fullGeojsonMunicipality,
          });
          map.addLayer({
            id: 'circles1',
            source: 'fullGeojsonProvince',
            type: 'circle',
            // 'source-layer': 'default',
            paint: {
              'circle-radius': ['get', 'radiusRange'],
              // 'circle-radius': 20,
              'circle-color': '#FFE300',
              'circle-opacity': 0.5,
              'circle-stroke-width': 0,
            },
            // filter: ['==', 'modelId', 1],
          });
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
        const withRadius = this.setCircleMarkerRadius(
          fullGeojsonProvince.features,
          this.props.mapViewDataBy,
        );
        fullGeojsonProvince.features = withRadius;

        // this.setCircleMarkerRadius(fullGeojsonProvince.features);
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
              'circle-radius': ['get', 'radiusRange'],
              // 'circle-radius': 20,
              'circle-color': '#FFE300',
              'circle-opacity': 0.5,
              'circle-stroke-width': 0,
            },
            // filter: ['==', 'modelId', 1],
          });
        }
      }

      // if (prevProps.mapViewDataBy !== this.props.mapViewDataBy) {
      // map.setLayoutProperty('singles-count', 'text-field', [
      //   'get',
      //   `${this.props.mapViewDataBy}`,
      // ]);
      // }
    }
    if (prevProps.mapViewDataBy !== this.props.mapViewDataBy) {
      alert('pie marker');
      if (this.props.mapViewDataBy === 'investment_focus') {
        map.removeLayer('circles1');
        map.removeSource('fullGeojsonProvince');
        if (this.props.mapViewBy === 'province') {
          let singleData = {};
          let singleData2nd = {};
          const total = [];
          const total2nd = [];

          // const getPointCount = features => {
          //   features.forEach(f => {
          //     if (f.properties.cluster) {
          //       total.push(f.properties.point_count);
          //     }
          //   });

          //   return total;
          // };
          fullGeojsonProvince.features.forEach(data => {
            // console.log(data, 'data');
            singleData2nd = {
              point_count: 0,
            };
            data.properties.pie.forEach(piedata => {
              // console.log(piedata);
              singleData2nd[`${piedata.investment_primary}`] =
                piedata.project_count;
              singleData2nd.point_count += piedata.project_count;
            });
            total2nd.push(singleData2nd.point_count);
          });
          // console.log(total2nd, 'total');
          fullGeojsonProvince.features.forEach(data => {
            // console.log(data, 'data');
            singleData = {
              point_count: 0,
            };
            data.properties.pie.forEach(piedata => {
              // console.log(piedata);
              singleData[`${piedata.investment_primary}`] =
                piedata.project_count;
              singleData.point_count += piedata.project_count;
            });
            total.push(singleData.point_count);
            // console.log(singleData, 'singleData');
            // console.log(total, 'total');
            const testElMain = document.createElement('div');
            testElMain.className = 'marker';
            const props = data.properties;
            // eslint-disable-next-line no-use-before-define
            const testEl = this.createDonutChart(
              singleData,
              total2nd,
            );

            const marker = new mapboxgl.Marker({ element: testEl })
              .setLngLat(data.geometry.coordinates)
              .addTo(map);
            global.markerList.push(marker);
          });
          // const withRadius = this.setCircleMarkerRadius(
          //   fullGeojsonProvince.features,
          //   this.props.mapViewDataBy,
          // );
          // fullGeojsonProvince.features = withRadius;
        } else if (this.props.mapViewBy === 'district') {
          removeMarker();
          let singleData = {};
          let singleData2nd = {};
          const total = [];
          const total2nd = [];

          fullGeojsonDistrict.features.forEach((item, index) => {
            this.props.choroplethData.forEach(p => {
              if (p.code === item.properties.code) {
                fullGeojsonDistrict.features[index].properties = {
                  ...item.properties,
                  ...p,
                };
              }
            });
          });

          // const getPointCount = features => {
          //   features.forEach(f => {
          //     if (f.properties.cluster) {
          //       total.push(f.properties.point_count);
          //     }
          //   });

          //   return total;
          // };
          // console.log(fullGeojsonDistrict, 'fullGeojsonDistrict');
          fullGeojsonDistrict.features.forEach(data => {
            // console.log(data, 'data');
            singleData2nd = {
              point_count: 0,
            };
            data.properties.pie.forEach(piedata => {
              // console.log(piedata);
              singleData2nd[`${piedata.investment_primary}`] =
                piedata.project_count;
              singleData2nd.point_count += piedata.project_count;
            });
            total2nd.push(singleData2nd.point_count);
          });
          // console.log(total2nd, 'total');
          fullGeojsonDistrict.features.forEach(data => {
            // console.log(data, 'data');
            singleData = {
              point_count: 0,
            };
            data.properties.pie.forEach(piedata => {
              // console.log(piedata);
              singleData[`${piedata.investment_primary}`] =
                piedata.project_count;
              singleData.point_count += piedata.project_count;
            });
            total.push(singleData.point_count);
            // console.log(singleData, 'singleData');
            // console.log(total, 'total');
            const testElMain = document.createElement('div');
            testElMain.className = 'marker';
            const props = data.properties;
            // eslint-disable-next-line no-use-before-define
            const testEl = this.createDonutChart(
              singleData,
              total2nd,
            );

            const marker = new mapboxgl.Marker({ element: testEl })
              .setLngLat(data.geometry.coordinates)
              .addTo(map);
            global.markerList.push(marker);
          });
          // const withRadius = this.setCircleMarkerRadius(
          //   fullGeojsonProvince.features,
          //   this.props.mapViewDataBy,
          // );
          // fullGeojsonProvince.features = withRadius;
        } else if (this.props.mapViewBy === 'municipality') {
          removeMarker();
          let singleData = {};
          let singleData2nd = {};
          const total = [];
          const total2nd = [];

          fullGeojsonMunicipality.features.forEach((item, index) => {
            this.props.choroplethData.forEach(p => {
              if (p.code === item.properties.code) {
                fullGeojsonMunicipality.features[index].properties = {
                  ...item.properties,
                  ...p,
                };
              }
            });
          });
          console.log(
            fullGeojsonMunicipality,
            'fullGeojsonMunicipality',
          );
          // const getPointCount = features => {
          //   features.forEach(f => {
          //     if (f.properties.cluster) {
          //       total.push(f.properties.point_count);
          //     }
          //   });

          //   return total;
          // };
          // console.log(fullGeojsonDistrict, 'fullGeojsonDistrict');
          fullGeojsonMunicipality.features.forEach(data => {
            // console.log(data, 'data');
            singleData2nd = {
              point_count: 0,
            };
            if (data.properties.pie) {
              data.properties.pie.forEach(piedata => {
                // console.log(piedata);
                singleData2nd[`${piedata.investment_primary}`] =
                  piedata.project_count;
                singleData2nd.point_count += piedata.project_count;
              });
              total2nd.push(singleData2nd.point_count);
            }
          });

          // console.log(total2nd, 'total');
          fullGeojsonMunicipality.features.forEach(data => {
            // console.log(data, 'data');
            singleData = {
              point_count: 0,
            };
            if (data.properties.pie) {
              data.properties.pie.forEach(piedata => {
                // console.log(piedata);
                singleData[`${piedata.investment_primary}`] =
                  piedata.project_count;
                singleData.point_count += piedata.project_count;
              });
              total.push(singleData.point_count);
            }
            // console.log(singleData, 'singleData');
            // console.log(total, 'total');
            const testElMain = document.createElement('div');
            testElMain.className = 'marker';
            const props = data.properties;
            // eslint-disable-next-line no-use-before-define
            const testEl = this.createDonutChart(
              singleData,
              total2nd,
            );

            const marker = new mapboxgl.Marker({ element: testEl })
              .setLngLat(data.geometry.coordinates)
              .addTo(map);
            global.markerList.push(marker);
          });
          // const withRadius = this.setCircleMarkerRadius(
          //   fullGeojsonProvince.features,
          //   this.props.mapViewDataBy,
          // );
          // fullGeojsonProvince.features = withRadius;
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
      }, 2000);
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

  getYear = minDate => {
    const d = new Date(minDate);

    const day = d.getDate();
    const month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    const year = d.getFullYear();

    const dateStr = `${month}/${day}/${year}`;
    // time = dateStr;
    // console.log(time ,"time returns")
    // this.setState({ time: dateStr });
    return dateStr;
  };

  playBtn = (min, max) => {
    console.log(min, 'min');
    console.log(max, 'max');
    this.setState({
      minValue: this.getYear(min),
      maxValue: this.getYear(max),
      key: timelineKey,
      playClick: true,
    });
    timelineKey += 1;
    // global.timerId = null;
  };

  getShortNumbers = (n, d) => {
    let x = `${n}`.length;
    // eslint-disable-next-line no-restricted-properties
    const p = Math.pow;
    // eslint-disable-next-line no-param-reassign
    d = p(10, d);
    x -= x % 3;
    return Math.round((n * d) / p(10, x)) / d + ' kMGTPE'[x / 3];
  };

  render() {
    const { mapViewBy } = this.props;
    const {
      choroplethLegend,
      legendColors,
      minValue,
      maxValue,
      key,
      playClick,
      circleMarkerRadius,
    } = this.state;
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
        <label>End Date: 2015-01-01</label>
        <TimelineChart
          minValue={minValue}
          maxValue={maxValue}
          playBtn={this.playBtn}
          mapViewBy={mapViewBy}
        />
      </>
    );
  }
}
const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});

export default connect(mapStateToProps, {})(Choropleth);
