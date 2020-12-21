// /* eslint-disable */
import React, { Component } from 'react';
import * as loadash from 'lodash';
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

import { extendBounds } from '../../../common/extendBbox';
import Loading from '../../../common/Loading';
import { numberWithCommas } from '../../../common/utilFunctions';

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
    //
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
  { id: '1', count: 0 },
  { id: '2', count: 0 },
  { id: '3', count: 0 },
  { id: '4', count: 0 },
  { id: '5', count: 0 },
  { id: '6', count: 0 },
  { id: '7', count: 0 },
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
// console.log(fullGeojsonProvince, 'fullgeojson');
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
      id: data.districtid,
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
      id: data.munid,
      code: data.munid,
      allocated_beneficiary: 0,
      allocated_budget: 0,
    },
  });
});
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
      isTimeline: false,
    };
    // this.markerPiePopupRef = React.createRef();
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
      //
      if (value > gradeitem) {
        color = legendColor[j];
      }
    });
    return color;
  }

  handleIsTimeline = () => {
    this.setState({
      isTimeline: false,
    });
  };

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
    const min = 0; // Math.min(...data);
    //
    //
    range =
      (max - min) / (gradeCount - 1) < 1
        ? [0, 2, 4, 6, 8, 10, 12]
        : calculateRange(min, max, (max - min) / (gradeCount - 1));

    this.setState({
      grade: fullRange.length > 0 ? fullRange : range,
    }); // add grade provided from props if available
    //
    setTimeout(() => {
      this.ChangeLegendColors();
      this.setChoroplethStyle(fullData);
    }, 500);
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
    //
    //
    // console.log(values, 'values');
    const expression = ['match', ['get', 'code']];
    values.forEach(value => {
      // console.log(value, 'value');
      const color = this.getLegendColor(value.count);
      if (value.code) {
        expression.push(value.code.toString(), color);
      } else {
        expression.push(value.id.toString(), color);
      }
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

    //
    this.setState({ finalStyle: expression });
    //
    //
    //
  }

  filterPieCharts(viewBy) {
    const that = this;
    const {
      mapViewBy,
      circleMarkerData,
      map,
      mapViewDataBy,
    } = that.props;
    // console.log(circleMarkerData, 'cirlceMarkerData');
    const FederalData =
      mapViewBy === 'municipality'
        ? fullGeojsonMunicipality
        : mapViewBy === 'district'
        ? fullGeojsonDistrict
        : fullGeojsonProvince;
    removeMarker();
    const FinalGeojson = { ...FederalData };

    FinalGeojson.features.forEach((item, index) => {
      circleMarkerData.forEach(p => {
        if (p.code === item.properties.code) {
          FinalGeojson.features[index].properties = {
            ...item.properties,
            ...p,
          };
        }
      });
    });
    const myArrayFiltered = FinalGeojson.features.filter(el => {
      return circleMarkerData.some(f => {
        return f.code === el.properties.code;
      });
    });
    FinalGeojson.features = myArrayFiltered;

    //
    let singleData = {};
    let partnerList = [];
    let singleData2nd = {};
    const total = [];
    const total2nd = [];
    FinalGeojson.features.forEach(data => {
      //
      singleData2nd = {
        point_count: 0,
      };
      if (data.properties.pie) {
        data.properties.pie.forEach(piedata => {
          singleData2nd[`${piedata.investment_primary}`] =
            piedata[`${viewBy}`];
          singleData2nd.point_count += piedata[`${viewBy}`];
        });
      }
      total2nd.push(singleData2nd.point_count);
      const allCount = [];
      Object.values(singleData2nd).forEach(singledata => {
        //
        allCount.push(singledata);
      });
      const sum = allCount.reduce(
        (partialSum, a) => partialSum + a,
        0,
      );
      // const min = Math.min.apply(null, allCount);
      // const max = Math.max.apply(null, allCount);
      // eslint-disable-next-line no-param-reassign
      // data.min = min;
      // eslint-disable-next-line no-param-reassign
      // data.max = max;
      // eslint-disable-next-line no-param-reassign
      data.total_sum = sum;
    });
    const totalSumList = [];
    FinalGeojson.features.forEach(fed => {
      totalSumList.push(fed.total_sum);
    });
    const min = Math.min.apply(null, totalSumList);
    const max = Math.max.apply(null, totalSumList);
    FinalGeojson.features.forEach(data => {
      const totalPartners = [];

      partnerList = [];
      singleData = {
        point_count: 0,
        federal_name: data.properties.name,
      };
      if (data.properties.pie) {
        data.properties.pie.forEach(piedata => {
          piedata.partner_list.forEach(d => {
            totalPartners.push(d);
          });
          singleData[`${piedata.investment_primary}`] =
            piedata[`${viewBy}`];
          if (piedata.partner_list) {
            singleData[`${piedata.investment_primary}_partnerList`] =
              piedata.partner_list;

            partnerList.push({
              partnerName: piedata.investment_primary,
              partnerlist: piedata.partner_list,
              totalCount: piedata[`${viewBy}`],
            });
          }
          singleData.point_count += piedata[`${viewBy}`];
        });
      }
      total.push(singleData.point_count);
      // eslint-disable-next-line no-param-reassign

      const radiusRange =
        // eslint-disable-next-line prettier/prettier
        ((data.total_sum - min) / (max - min)) * (30 - 10) + 10;
      const testElMain = document.createElement('div');
      testElMain.className = 'marker';
      const totalUniquePartner = [...new Set(totalPartners)];
      //
      // const props = data.properties;
      // eslint-disable-next-line no-use-before-define
      const testEl = this.createDonutChart(
        singleData,
        total2nd,
        radiusRange,
        partnerList,
        mapViewDataBy,
        data.total_sum,
        totalUniquePartner,
      );
      const marker = new mapboxgl.Marker({ element: testEl })
        .setLngLat(data.geometry.coordinates)
        .addTo(map);
      global.markerList.push(marker);
    });
  }

  createPieLegend = () => {
    const that = this;
    const datas = this.props.partnershipReducer.legendList;
    // select the svg area
    const SVG = d3.select(that.props.pieSquareLegend.current);
    // const firstLegend = d3.select(SVG);
    // const legendCon = d3.select(firstLegend.node().parentNode);
    // const legendY = parseInt(
    //   firstLegend.select('text').attr('y'),
    //   10,
    // );
    SVG.append('text')
      .text('Investment Focus')
      .attr('x', 10)
      .attr('y', 20)
      .style('font-size', '13px');
    // By Partner/Benef/Budget
    // translate(109px, -19px)
    // create a list of keys
    // const keys = [
    //   'Mister A',
    //   'Brigitte',
    //   'Eleonore',
    //   'Another friend',
    //   'Batman',
    // ];

    // Usually you have a color scale in your chart already
    // const color = d3
    //   .scaleOrdinal()
    //   .domain(datas)
    //   .range(d3.schemeSet1);

    // Add one dot in the legend for each name.
    const size = 20;
    SVG.selectAll('mydots')
      .data(datas)
      .enter()
      .append('rect')
      .attr('x', 10)
      .attr('y', function(d, i) {
        return 10 + i * (size + 5);
      }) // 100 is where the first dot appears. 25 is the distance between dots
      .attr('width', '13px')
      .attr('height', '12px')
      .style('transform', `translate(0px, ${size + 5}px)`)
      .style('fill', function(d) {
        return colorScale(d);
      });

    // Add one dot in the legend for each name.
    SVG.selectAll('mylabels')
      .data(datas)
      .enter()
      // .append('h5')
      // .text('Investment Focus Quantify By Partner/Benef/Budget')
      .append('text')
      .attr('x', 10 + size * 1.2)
      .attr('y', function(d, i) {
        return 10 + i * (size + 5) + size / 2;
      }) // 100 is where the first dot appears. 25 is the distance between dots
      .style('transform', `translate(0px, ${size + 5}px)`)
      .style('fill', function() {
        return '#000';
        // return color(d.type);
      })
      .text(function(d) {
        function truncate(str, n) {
          return str.length > n ? `${str.substr(0, n - 1)}...` : str;
        }

        return truncate(d, 22);
      })
      .attr('text-anchor', 'left')
      .style('alignment-baseline', 'middle');
  };

  createDonutChart = (
    props,
    totals,
    radiusValue,
    partners,
    mapViewDataBy,
    totalSum,
    totalUniquePartner,
  ) => {
    const that = this;
    const legendDataArray = [];
    const { legendList } = this.props.partnershipReducer;
    const div = document.createElement('div');
    legendList.forEach(data => {
      legendDataArray.push({ type: data, count: props[data] });
    });

    const allCount = [];
    Object.values(props).forEach(data => {
      //
      allCount.push(data);
    });

    const data = legendDataArray;
    const thickness = 10;
    const radius = radiusValue ? radiusValue : 30;

    const tooltip2nd = d3
      .select(this.props.markerPiePopupRef.current)
      // .append('div')
      // .attr('class', 'pie-mapbox-popup')
      .style('opacity', 0);
    // tooltip2nd.append('div').attr('class', 'popup-div');
    const svg = d3
      .select(div)
      .append('svg')
      .attr('class', 'pie')
      .style('z-index', '9')
      .attr('width', radius * 2)
      .attr('height', radius * 2);
    //
    // center
    const g = svg
      .append('g')
      .attr('transform', `translate(${radius}, ${radius})`);

    const arc = d3
      .arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius);

    const pie = d3
      .pie()
      .value(d => d.count)
      .sort(null);
    const tooltip = d3
      .select(div)
      .append('div')
      .attr('class', 'pie-mapbox-popup')
      .style('opacity', 0);

    tooltip.append('div').attr('class', 'popup-div');

    const path = g
      .selectAll('path')
      .data(pie(data.sort((x, y) => d3.ascending(y.count, x.count))))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => colorScale(d.data.type))
      .on('click', function() {
        d3.event.stopPropagation();
        that.props.setPopupData({
          propsdata: props,
          partners,
          mapViewDataBy,
          totalUniquePartner,
        });
      })
      .on('mouseover', function(d) {
        svg.selectAll('path').sort(function(a, b) {
          // select the parent and sort the path's
          if (a.id !== d.id) return -1;
          // a is not the hovered element, send "a" to the back
          return 1; // a is the hovered element, bring "a" to the front
        });
        d3.select(this)
          .transition()
          .duration('50')
          .attr('opacity', '.65')
          .style('z-index', '1000')
          .attr(
            'd',
            d3
              .arc()
              .innerRadius(radius - thickness)
              .outerRadius(radius * 1.04),
          );
        tooltip2nd.style('display', 'block');
        tooltip2nd.style('opacity', 1);
        const classValue =
          mapViewDataBy === 'allocated_budget'
        ? '' // eslint-disable-line prettier/prettier
            : 'material-icons';
        tooltip2nd.html(
          `<div class="leaflet-popup-content" style="width: 100px;">
            <div class="map-popup-view">
              <div class="map-popup-view-header">
                  <h5>${d.data.type}</h5>
                  ${
                    classValue !== ''
                      ? `<div class="icons">
                    <i class=${classValue}>${
                          mapViewDataBy === 'allocated_beneficiary'
                            ? 'people'
                            : mapViewDataBy === 'allocated_budget'
                            ? ''
                            : 'payments'
                        }</i><b>${numberWithCommas(
                          Math.round(d.data.count),
                        )}</b>
                  </div>`
                      : `<div class="icons">
                    <i class='fas fa-pound-sign'>${
                      mapViewDataBy === 'allocated_beneficiary'
                        ? 'people'
                        : mapViewDataBy === 'allocated_budget'
                        ? ''
                        : 'payments'
                    }</i><b>${numberWithCommas(
                          Math.round(d.data.count),
                        )}</b>
                  </div>`
                  }
              </div>
            </div>
          </div>` /* eslint-disable-line */,
        );
      })
      .on('mousemove', function() {
        tooltip2nd
          .style('top', `${d3.event.pageY - 160}px`)
          .style('left', `${d3.event.pageX - 380}px`);
        tooltip
          .style('top', `${d3.event.offsetY + 20}px`)
          .style('left', `${d3.event.offsetX + 200}px`);
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

  plotVectorTile = () => {
    const { map, setLeftPopupData } = this.props;
    const that = this;
    //
    let hoveredStateId = null;

    map.on('load', function() {
      const combinedBbox = [];
      //
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
      //
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

      // if (that.props.label) {
      // }
      map.on('click', function() {
        // alert('clicked Map');
        document
          .querySelectorAll('.pie-mapbox-popup')
          .forEach(function(el) {
            // eslint-disable-next-line no-param-reassign
            el.style.display = 'none';
            // a.remove();
          });
        that.props.setPopupData({
          propsdata: undefined,
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
          that.props.handleProvinceClick(parseInt(federalCode, 10));
          map.fitBounds(getBbox.bbox);
          // console.log(federalCode, 'fedCOde');
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
          //
          // that.props.handleProvinceClick(parseInt(federalCode, 10));
          const getBbox = getCenterBboxProvince(federalCode);
          filterMapChoroplethPie(getBbox, federalCode);
          that.props.setMapViewBy('district');
        } else if (that.props.mapViewBy === 'district') {
          // that.props.handleProvinceClick(parseInt(federalCode, 10));
          const getBbox = getCenterBboxDistrict(
            parseInt(federalCode, 10),
          );
          // that.props.handleProvinceClick(parseInt(federalCode, 10));
          filterMapChoroplethPie(getBbox, federalCode);
          that.props.setMapViewBy('municipality');
        } else if (that.props.mapViewBy === 'municipality') {
          const getBbox = getCenterBboxMunicipality(
            parseInt(federalCode, 10),
          );
          // that.props.handleProvinceClick(parseInt(federalCode, 10));
          filterMapChoroplethPie(getBbox, federalCode);
        }
      });
      map.on('mousemove', 'vector-tile-fill', function(e) {
        // console.log(that.props.choroplethData);
        // console.log(e.features[0].properties.id);

        const filteredCodeData = that.props.choroplethData.filter(
          data => {
            if (data.code) {
              return (
                parseInt(data.code, 10) ===
                parseInt(e.features[0].properties.code, 10)
              );
            }
            return (
              parseInt(data.id, 10) ===
              parseInt(e.features[0].properties.code, 10)
            );
          },
        );
        // console.log(filteredCodeData, 'codeData ');

        setLeftPopupData({
          name: e.features[0].properties.name,
          code: e.features[0].properties.code,
          id: e.features[0].properties.code,
          count: filteredCodeData[0].count,
        });
        // popup
        //   .setLngLat(e.lngLat)
        //   .setHTML(
        //     `<div class="leaflet-popup-content federal-popup" style="width: 100px;">
        //       <div class="map-popup-view">
        //           <div class="map-popup-view-header">
        //               <h5>${e.features[0].properties.name}</h5>
        //               <h5>Code:${e.features[0].properties.code}</h5>
        //               <h5>ID:${e.features[0].properties.id}</h5>
        //               <div class="icons">
        //               <i class="material-icons">tablet_mac</i><b>${filteredCodeData[0].count}</b>
        //               </div>
        //           </div>
        //           <div class="map-view-footer">
        //           </div>
        //               </div>
        //           </div>`,
        //   )
        //   .addTo(map);
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
        popup.remove();
        setLeftPopupData({});
      });

      map.setZoom(5.8);
    });

    map.on('style.load', () => {
      const waiting = () => {
        if (!map.isStyleLoaded()) {
          setTimeout(waiting, 200);
        } else {
          this.setState(prevState => ({
            loading: !prevState.loading,
          }));
        }
      };
      waiting();
    });
    map.on('zoom', () => {
      global.markerList.forEach(marker => {
        let scalePercent = 1 + (map.getZoom() - 8) * 3;
        // console.log(scalePercent, 'scalePercent');
        if (scalePercent < 0) {
          scalePercent = 1;
        }
        // console.log(scalePercent, 'After scalePercent');
        const svgElement = marker.getElement().children[0];
        svgElement.style.transform = `scale(${scalePercent})`;
        svgElement.style.transformOrigin = 'bottom';
      });
    });
  };

  componentDidMount() {
    const { map } = this.props;
    if (map) {
      if (map.getLayer('vector-tile-fill')) {
        map.removeLayer('vector-tile-fill');
      }
      if (map.getLayer('vector-tile-outline')) {
        map.removeLayer('vector-tile-outline');
      }
      if (map.getSource('municipality')) {
        map.removeSource('municipality');
      }
    }
    setTimeout(() => {
      this.changeGrades();
      this.plotVectorTile();
    }, 10);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      map,
      vectorTileUrl,
      circleMarkerData,
      mapViewBy,
      mapViewDataBy,
    } = this.props;

    if (prevProps.circleMarkerData !== circleMarkerData) {
      // removeMarker();
      if (
        this.props.pieSquareLegend &&
        this.props.pieSquareLegend.current &&
        this.props.pieSquareLegend.current.childNodes.length <= 0
      ) {
        this.createPieLegend();
      }
      const viewBy =
        mapViewDataBy === 'allocated_beneficiary'
          ? 'total_beneficiary'
          : mapViewDataBy === 'allocated_budget'
          ? 'allocated_budget'
          : 'partner_count';

      if (mapViewBy === 'municipality') {
        if (mapViewDataBy !== '') {
          this.filterPieCharts(viewBy);
        }
      } else if (mapViewBy === 'district') {
        if (mapViewDataBy !== '') {
          this.filterPieCharts(viewBy);
        }
      } else if (mapViewBy === 'province') {
        if (mapViewDataBy !== '') {
          this.filterPieCharts(viewBy);
        }
      }

      const FederalData =
        mapViewBy === 'municipality'
          ? fullGeojsonMunicipality
          : mapViewBy === 'district'
          ? fullGeojsonDistrict
          : fullGeojsonProvince;

      if (mapViewDataBy === 'investment_focus') {
        this.filterPieCharts(viewBy);
      } else if (mapViewDataBy === 'allocated_beneficiary') {
        this.filterPieCharts(viewBy);
      } else if (mapViewDataBy === 'allocated_budget') {
        this.filterPieCharts(viewBy);
      }
      // const test = this.createDonutChart(a, b);
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
      // setInterval(
      // const timerId = setInterval(
      //   () => ,
      //   250,
      // );
      this.changeGrades();
      setTimeout(() => {
        if (map.getLayer('vector-tile-fill')) {
          map.setPaintProperty(
            'vector-tile-fill',
            'fill-color',
            this.state.finalStyle,
          );
        }
      }, 1500);
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
        isTimeline: true,
        minValue: this.getYear(min),
        maxValue: this.getYear(max),
        key: timelineKey,
        playClick: true,
      });
      timelineKey += 1;
    }, 200);
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
    const { mapViewBy, isDataFetched } = this.props;
    const {
      choroplethLegend,
      legendColors,
      minValue,
      maxValue,
      key,
      playClick,
      circleMarkerRadius,
      loading,
      isTimeline,
    } = this.state;
    return (
      <>
        {isDataFetched && <Loading loaderState={!loading} />}
        <div className="map-legend newmap-legend">
          <div className="color-list partnership-legend">
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
            </ul>
          </div>
        </div>

        <TimelineChart
          minValue={minValue}
          maxValue={maxValue}
          playBtn={this.playBtn}
          handleIsTimeline={this.handleIsTimeline}
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
