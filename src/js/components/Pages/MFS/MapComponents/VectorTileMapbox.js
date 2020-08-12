// /* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import * as d3 from 'd3';
import province from '../../../../../data/province.json';
import district from '../../../../../data/district.json';
import municipality from '../../../../../data/municipality.json';
import {
  calculateRange,
  choroplethColorArray,
} from '../../../common/Functions';
import TimelineChart from './TimelineChart';
import { getCenterBboxProvince } from '../common/ProvinceFunction';
import { getCenterBboxDistrict } from '../common/DistrictFunction';
import { getCenterBboxMunicipality } from '../common/MunicipalityFunction';

import { extendBounds } from '../../Automation/MapRelatedComponents/extendBbox';
import Loading from '../../../common/Loading';
import Popup from '../common/Popup';

global.markerList = [];
function removeMarker() {
  if (global.markerList !== null) {
    for (let i = global.markerList.length - 1; i >= 0; i -= 1) {
      // const removed = global.markerList.splice(0);
      global.markerList[i].remove();
    }
    document
      .querySelectorAll('.mapboxgl-marker')
      .forEach(function(a) {
        a.remove();
      });
    global.markerList = [];
    // console.log(global.markerList, 'globalMarkerlist VectorTile');
  }
}
const popup = new mapboxgl.Popup();

// var colors = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c'];
// const colors = [
//   '#8dd3c7',
//   '#ffffb3',
//   '#bebada',
//   '#fb8072',
//   '#80b1d3',
//   '#fdb462',
//   '#b3de69',
//   '#fccde5',
//   '#d9d9d9',
//   '#bc80bd',
//   '#ccebc5',
// ];
// const colors = [
//   '#E11D3F',
//   '#FF6D00',
//   '#13A8BE',
//   '#651FFF',
//   '#B1B424',
//   '#2196F3',
//   '#4CE2A7',
//   '#1967A0',
//   '#FFCD00',
//   '#DE2693',
// ];
const colors = [
  '#e45642',
  '#f7c349',
  '#4dd291',
  '#225687',
  '#651FFF',
  '#70356f',
  '#8f1c52',
  '#cc4967',
  '#E11D3F',
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

const defaultData = [
  { code: '1', count: 0 },
  { code: '2', count: 0 },
  { code: '3', count: 0 },
  { code: '4', count: 0 },
  { code: '5', count: 0 },
  { code: '6', count: 0 },
  { code: '7', count: 0 },
];
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

let timelineKey = 1;

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
      loading: false,
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
    //
    // eslint-disable-next-line array-callback-return
    grade.map((gradeitem, j) => {
      // console.log(gradeitem, 'gradeitem');
      if (value > gradeitem) {
        color = legendColor[j];
      }
    });
    return color;
  }

  changeGrades() {
    let range = [];
    const data = [];
    const {
      props: {
        colorArray,
        legendDivisions,
        divisions,
        choroplethData,
      },
    } = this;
    const colorArrayLength = colorArray && colorArray.length;
    const gradeCount =
      legendDivisions != null &&
      typeof legendDivisions === 'number' &&
      legendDivisions <= 20 &&
      legendDivisions >= colorArrayLength
        ? legendDivisions
        : 5; // set default gradecount

    const fullRange =
      divisions && divisions.length > 0 ? divisions : [];
    const fullData =
      choroplethData != null && choroplethData.length > 0
        ? choroplethData
        : defaultData;
    //
    if (choroplethData != null && choroplethData.length > 0) {
      choroplethData.forEach(data1 => {
        data.push(data1.count);
      });
    } else {
      defaultData.forEach(data1 => {
        data.push(data1.count); // if no dat passed take from default data
      });
    }

    //
    const max = Math.max.apply(null, Object.values(data));
    const min = 1; // Math.min(...data);
    //
    //
    range =
      (max - min) / (gradeCount - 1) < 1
        ? [0, 2, 4, 6, 8, 10, 12]
        : calculateRange(min, max, (max - min) / (gradeCount - 1));

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
    //
    this.setState({ legendColors: choroplethColors });
  }

  setChoroplethStyle(values) {
    // console.log('values', values);
    //
    const expression = ['match', ['get', 'code']];
    values.forEach(value => {
      const color = this.getLegendColor(value.count);
      expression.push(value.code.toString(), color);
    });

    // const data = this.props.choroplethData;
    // const maxValue = this.props.maxValue;
    // // Calculate color for each state based on the unemployment rate
    // data.forEach(function(row) {
    //
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
    //
  }

  plotVectorTile = () => {
    const { map } = this.props;
    const that = this;
    //
    let hoveredStateId = null;

    map.on('load', function() {
      const combinedBbox = [];
      // console.log(selectedProvince, 'selectedProvine');
      const getBboxValue = getCenterBboxProvince([
        1,
        2,
        3,
        4,
        5,
        6,
        7,
      ]);
      getBboxValue.map(data => {
        combinedBbox.push(data.bbox);
        return true;
      });
      // console.log(combinedBbox, 'combineBbox');
      const extendedValue = extendBounds(combinedBbox);
      that.props.map.fitBounds(extendedValue);
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
      global.mapGlobal = map;

      // filters for classifying earthquakes into five categories based on magnitude

      //
      //
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
      map.on('click', function() {
        // alert('clicked Map');
        document
          .querySelectorAll('.pie-mapbox-popup')
          .forEach(function(el) {
            // eslint-disable-next-line no-param-reassign
            el.style.display = 'none';
            // a.remove();
          });
      });

      // map.on('click', function(e) {
      //   const features = map.queryRenderedFeatures(e.point, {
      //     layers: ['vector-tile-fill', 'vector-tile-outline'],
      //   });
      //   if (features.length === 0) {
      //     document
      //       .querySelectorAll('.pie-mapbox-popup')
      //       .forEach(function(el) {
      //         // eslint-disable-next-line no-param-reassign
      //         el.style.display = 'none';
      //         // a.remove();
      //       });
      //     // alert('onClick of query');
      //     // do something
      //   }
      // });
      map.on('click', 'vector-tile-fill', function(e) {
        const filterMapChoroplethPie = (getBbox, federalCode) => {
          map.fitBounds(getBbox.bbox);
          that.props.handleProvinceClick(parseInt(federalCode, 10));
          map.setFilter('vector-tile-fill', [
            'in',
            ['get', 'code'],
            ['literal', [federalCode]],
          ]);
          map.setFilter('vector-tile-outline', [
            'in',
            ['get', 'code'],
            ['literal', [federalCode.toString()]],
          ]);
        };

        e.preventDefault();
        const federalCode = e.features[0].properties.code;

        if (that.props.mapViewBy === 'province') {
          // console.log(e.features[0]);
          const getBbox = getCenterBboxProvince(federalCode);
          // filterMapChoroplethPie(getBbox, federalCode);
        } else if (that.props.mapViewBy === 'district') {
          const getBbox = getCenterBboxDistrict(
            parseInt(federalCode, 10),
          );
          that.props.handleProvinceClick(parseInt(federalCode, 10));
          // filterMapChoroplethPie(getBbox, federalCode);
        } else if (that.props.mapViewBy === 'municipality') {
          const getBbox = getCenterBboxMunicipality(
            parseInt(federalCode, 10),
          );
          that.props.handleProvinceClick(parseInt(federalCode, 10));
          // filterMapChoroplethPie(getBbox, federalCode);
        }
      });
      map.on('mousemove', 'vector-tile-fill', function(e) {
        console.log(e.features[0]);
        const filteredCodeData = that.props.choroplethData.filter(
          data => {
            return (
              parseInt(data.code, 10) ===
              parseInt(e.features[0].properties.code, 10)
            );
          },
        );
        //     props,
        // totals,
        // radiusValue,
        // partners,
        // mapViewDataBy,
        // totalSum,
        const donut = that.createDonutChart(
          {},
          30,
          30,
          ['a', 'b'],
          100,
        );
        console.log(`${donut}`, 'donut');
        function popupContent() {
          return (
            <div
              className="leaflet-popup-content federal-popup"
              style={{ width: '100px' }}
            >
              <div className="map-popup-view">
                <div className="map-popup-view-header">
                  <h5>{e.features[0].properties.name}</h5>
                  <div className="icons">
                    <i className="material-icons">tablet_mac</i>
                    <b>{filteredCodeData[0].count}</b>
                  </div>
                </div>
                <div className="map-view-footer">{donut}</div>
              </div>
            </div>
          );
        }
        popup
          .setLngLat(e.lngLat)
          .setHTML(
            `<div class="leaflet-popup-content federal-popup" style="width: 100px;">
              <div class="map-popup-view">
                  <div class="map-popup-view-header">
                      <h5>${e.features[0].properties.name}</h5>
                      <div class="icons">
                      <i class="material-icons">tablet_mac</i><b>${filteredCodeData[0].count}</b>
                      </div>
                  </div>
                  <div class="map-view-footer">
                  ${donut}
                  </div>
                      </div>
                  </div>`,
          )
          // .setDOMContent(donut)
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
    });

    map.on('style.load', () => {
      const waiting = () => {
        if (!map.isStyleLoaded()) {
          setTimeout(waiting, 200);
          // console.log('if');
        } else {
          this.setState(prevState => ({
            loading: !prevState.loading,
          }));
          // console.log('loadMyLayer');
        }
      };
      waiting();
    });
  };

  componentDidMount() {
    this.changeGrades();
    this.plotVectorTile();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      map,
      vectorTileUrl,
      circleMarkerData,
      mapViewBy,
      mapViewDataBy,
    } = this.props;

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
        //
        //
        map.setPaintProperty(
          'vector-tile-fill',
          'fill-color',
          this.state.finalStyle,
        );
      }, 2000);
    }
    if (prevProps.vectorTileUrl !== this.props.vectorTileUrl) {
      //
      // this.changeGrades();

      const newStyle = map.getStyle();
      newStyle.sources.municipality.tiles = [
        this.props.vectorTileUrl,
      ];
      map.setStyle(newStyle);
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
    //
    // this.setState({ time: dateStr });
    return dateStr;
  };

  playBtn = (min, max) => {
    setTimeout(() => {
      this.setState({
        minValue: this.getYear(min),
        maxValue: this.getYear(max),
        key: timelineKey,
        playClick: true,
      });
      timelineKey += 1;
    }, 10000);
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

  createDonutChart = (
    props,
    totals,
    radiusValue,
    partners,
    mapViewDataBy,
    totalSum,
  ) => {
    const div = document.createElement('div');

    const allCount = [];
    Object.values(props).forEach(data => {
      //
      allCount.push(data);
    });
    // const maxValue=
    //     const getRadius = data.properties.pie.total_beneficiary -
    //     minValue) /
    //   (maxValue - minValue)) *
    //   (30 - 10) +
    // 10,
    const data = [
      {
        type: 'Automation of MFIs',
        count: 5,
      },
      {
        type: 'Channel Innovations',
        count: 10,
      },
      {
        type: 'Digital Financial Services',
        count: 15,
      },
      {
        type: 'Downscaling and Value Chain Financing By Banks',
        count: 20,
      },
      {
        type: 'Increased uptake of microinsurance',
        count: 25,
      },
      {
        type: 'Outreach Expansion',
        count: 30,
      },
      {
        type: 'Product Innovations',
        count: 35,
      },
      {
        type: 'SME Financing',
        count: 40,
      },
    ];

    const thickness = 10;
    // const scale = d3
    //   .scaleLinear()
    //   .domain([d3.min(totals), d3.max(totals)])
    //   .range([d3.min(totals), d3.max(totals)]);

    // const radius = scale(props.point_count);
    const radius = radiusValue ? radiusValue : 30;

    // const radius = scale(props.point_count - 10);
    // const circleRadius = radius - thickness;
    // const circleRadius = radiusValue;
    const svg = d3
      .select(div)
      .append('svg')
      .attr('class', 'pie')
      .attr('width', radius * 2)
      .attr('height', radius * 2);
    //
    // center
    const g = svg
      .append('g')
      .attr('transform', `translate(${radius}, ${radius})`);

    // <div
    //       className="leaflet-popup  leaflet-zoom-animated"
    //       style="opacity: 1; transform: translate3d(116px, 282px, 0px); bottom: -7px; left: -141px;"
    //     >
    //       <div className="leaflet-popup-content-wrapper">
    //     <div className="leaflet-popup-content" style="width: 281px;">
    //           <ul>
    //         <li>
    //               <div className="organization-icon">
    //             <span>CH</span>
    //           </div>
    //               <div className="organization-content">
    //             <h5>Kisan Microfinance</h5>
    //           </div>
    //             </li>
    //       </ul>
    //         </div>
    //   </div>
    //       <div className="leaflet-popup-tip-container">
    //     <div className="leaflet-popup-tip" />
    //   </div>
    //       <a className="leaflet-popup-close-button" href="#close">
    //     ×
    //   </a>
    //     </div>;
    const tooltip = d3
      .select(div)
      .append('div')
      .attr('class', 'pie-mapbox-popup')
      .style('opacity', 0);

    tooltip.append('div').attr('class', 'popup-div');
    const tooltip2nd = d3
      .select(div)
      .append('div')
      .attr('class', 'pie-mapbox-popup')
      .style('opacity', 0);

    tooltip2nd.append('div').attr('class', 'popup-div');

    // tooltip
    //   .select('.popup-div')
    //   .append('ul')
    //   .attr('class', 'mapbox-popup-content');
    // .style('width', '281px');

    // tooltip
    //   .select('.leaflet-popup-content')
    //   .append('div')
    //   .attr('class', 'organization-content');

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
      .on('click', function() {
        d3.event.stopPropagation();
        // d.stopPropagation();
        document
          .querySelectorAll('.pie-mapbox-popup')
          .forEach(function(el) {
            // eslint-disable-next-line no-param-reassign
            el.style.display = 'none';
            // a.remove();
          });
        // const that = this;

        // console.log(props, 'props');
        // if (document.querySelector('.federal-popup')) {
        //   document.querySelector('.federal-popup').style.display =
        //     'none';
        // }
        // popup.remove();
        /* <div className="icons">
        <i className="material-icons">tablet_mac</i>
        <b>4</b></div> */
        // <div className="icon-list">
        //             </div>
        // document
        //   .querySelectorAll('.pie-mapbox-popup')
        //   .forEach(function(el) {
        //     // eslint-disable-next-line no-param-reassign
        //     el.style.display = 'none';
        //     // a.remove();
        //   });
        let partnerContent = null;
        // partnerList =
        // eslint-disable-next-line no-restricted-syntax
        partnerContent = partners
          .map((partnerData, index) => {
            const partnerList = partnerData.partnerlist
              .map(singlepartner => {
                return `
                <li>
                  <a>${singlepartner}</a>
                </li>
                `;
              })
              .join('');
            return `
          <div class="acc-list ${
            index === 0 ? 'active' : ''
          }" onclick="this.classList.toggle('active');">
            <div class="acc-header">
              <h5>${partnerData.partnerName}</h5>
            </div>
            <div class="acc-body">
              <ul>
              ${partnerList}
              </ul>
            </div>
          </div>
        `;
          })
          .join('');

        // <h6>${props.federal_name}</h6>
        tooltip.select('.popup-div').html(
          `<div class="leaflet-popup-content" style="width: 100px;">
            <div class="map-popup-view" style="${
              mapViewDataBy === 'investment_focus'
                ? 'height: 302px;'
                : 'height: 10px'
            }overflow-y: scroll;">
              <div class="map-popup-view-header">
                  <h5>${props.federal_name}</h5>
                  <div class="icons">
                    <i class="material-icons">${
                      mapViewDataBy === 'allocated_beneficiary'
                        ? 'people'
                        : mapViewDataBy === 'allocated_budget'
                        ? 'monetization_on'
                        : 'payments'
                    }</i><b>${totalSum}</b>
                  </div>
              </div>
              <div class="acc is-after is-border">
                  ${
                    partnerContent !== undefined &&
                    mapViewDataBy === 'investment_focus'
                      ? partnerContent
                      : ''
                  }
                  </div>
                
              <div class="map-view-footer">
              </div>
            </div>
          </div>` /* eslint-disable-line */
        );

        // const t = document.querySelector('.acc-header');
        // t.addEventListener('click', function(e) {
        //   // console.log('test');
        //   e.stopPropagation();
        //   alert('function');
        // });
        const mapPopup = document.querySelector('.map-popup-view');
        mapPopup.addEventListener('click', function(e) {
          // console.log('test');
          e.stopPropagation();
          // alert('function');
        });
        const Popupscroll = document.querySelector('.map-popup-view');
        Popupscroll.addEventListener('wheel', function(e) {
          e.stopPropagation();
        });
        // const accList = document.querySelector('.acc-list');
        // accList.addEventListener('click', function(e) {
        //   console.log(e, 'test');
        //   // if (e.target.classList.includes('active')) {
        //   this.classList.remove('active');
        //   // } else {
        //   // e.target.classList.add('active');
        //   // }
        //   // e.stopPropagation();
        //   // alert('function');
        // });
        // .style('color', 'black');
        // .style('background-color', 'white');
        // tooltip.select('.count').html('Test');
        // tooltip.select('.percent').html(`${34}%`);

        tooltip.style('display', 'block');
        tooltip.style('opacity', 2);
      })
      .on('mouseover', function(d) {
        d3.select(this)
          .transition()
          .duration('50')
          .attr('opacity', '.65')
          .attr(
            'd',
            d3
              .arc()
              .innerRadius(radius - thickness)
              .outerRadius(radius * 1.04),
          );
        tooltip2nd.style('display', 'block');
        tooltip2nd.style('opacity', 1);
        tooltip2nd.select('.popup-div').html(
          `<div class="leaflet-popup-content" style="width: 100px;">
            <div class="map-popup-view">
              <div class="map-popup-view-header">
                  <h5>${d.data.type}</h5>
                  <div class="icons">
                    <i class="material-icons">${
                      mapViewDataBy === 'allocated_beneficiary'
                        ? 'people'
                        : mapViewDataBy === 'allocated_budget'
                        ? 'monetization_on'
                        : 'payments'
                    }</i><b>${d.data.count}</b>
                  </div>
              </div>
            </div>
          </div>` /* eslint-disable-line */
        );
      })
      .on('mousemove', function() {
        tooltip2nd
          .style('top', `${d3.event.offsetY + 20}px`)
          .style('left', `${d3.event.offsetX + 20}px`);
        tooltip
          .style('top', `${d3.event.offsetY + 20}px`)
          .style('left', `${d3.event.offsetX + 20}px`);
      })
      .on('mouseout', function() {
        tooltip2nd.style('display', 'none');
        tooltip2nd.style('opacity', 0);

        d3.select(this)
          .transition()
          // .duration('200')
          // .ease(d3.easeBounceIn)
          .attr('opacity', '1')
          .attr(
            'd',
            d3
              .arc()
              .innerRadius(radius - thickness)
              .outerRadius(radius),
          );
      });

    // const circle = g
    //   .append('circle')
    //   .attr('r', circleRadius)
    //   .attr('fill', 'rgba(0, 0, 0, 0)')
    //   .attr('class', 'center-circle');

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

  render() {
    const { mapViewBy, choroplethData } = this.props;
    const {
      choroplethLegend,
      legendColors,
      minValue,
      maxValue,
      key,
      playClick,
      circleMarkerRadius,
      loading,
    } = this.state;
    return (
      <>
        <Loading loaderState={!loading} />
        <div className="map-legend newmap-legend">
          {choroplethData.length > 0 ? (
            <div className="color-list">
              <h6>Number of Projects</h6>
              <ul id="state-legend" className="color-legend">
                {this.state.grade &&
                  this.state.grade.map((grade, i) => {
                    let hideLastdiv = false;
                    hideLastdiv =
                      i === this.state.grade.length - 1
                        ? true
                        : false;
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
              </ul>
            </div>
          ) : null}
        </div>
        {/* <TimelineChart
          minValue={minValue}
          maxValue={maxValue}
          playBtn={this.playBtn}
          mapViewBy={mapViewBy}
        /> */}
      </>
    );
  }
}
const mapStateToProps = ({ mfsReducer }) => ({
  mfsReducer,
});

export default connect(mapStateToProps, {})(Choropleth);
