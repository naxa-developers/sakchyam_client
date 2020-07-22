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

global.markerList = [];
function removeMarker() {
  if (global.markerList !== null) {
    for (let i = global.markerList.length - 1; i >= 0; i -= 1) {
      global.markerList[i].remove();
    }
  }
}

const colors = [
  '#E11D3F',
  '#FF6D00',
  '#13A8BE',
  '#651FFF',
  '#B1B424',
  '#2196F3',
  '#4CE2A7',
  '#1967A0',
  '#FFCD00',
  '#DE2693',
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

  finalData.map((prov, i) => {
    api.map(data => {
      if (prov.id === data.municipality_id) {
        if (
          data.start_date >= startDate &&
          data.start_date <= endDate
        ) {
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
const timelineKey = 1;

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

  componentDidMount() {
    this.changeGrades();
    this.plotVectorTile();
  }

  componentDidUpdate(prevProps, prevState) {
    const { map, vectorTileUrl } = this.props;
    if (prevProps.choroplethData !== this.props.choroplethData) {
      if (this.props.mapViewBy === 'municipality') {
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
          const testEl = this.createDonutChart(singleData, total2nd);

          const marker = new mapboxgl.Marker({ element: testEl })
            .setLngLat(data.geometry.coordinates)
            .addTo(map);
          global.markerList.push(marker);
        });
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
        fullGeojsonDistrict.features.forEach(data => {
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
        fullGeojsonDistrict.features.forEach(data => {
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
          const testEl = this.createDonutChart(singleData, total2nd);

          const marker = new mapboxgl.Marker({ element: testEl })
            .setLngLat(data.geometry.coordinates)
            .addTo(map);
          global.markerList.push(marker);
        });
      } else {
        removeMarker();
        let singleData = {};
        let singleData2nd = {};
        const total = [];
        const total2nd = [];

        fullGeojsonProvince.features.forEach((item, index) => {
          this.props.choroplethData.forEach(p => {
            if (p.code === item.properties.code) {
              fullGeojsonProvince.features[index].properties = {
                ...item.properties,
                ...p,
              };
            }
          });
        });

        fullGeojsonProvince.features.forEach(data => {
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
        fullGeojsonProvince.features.forEach(data => {
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
          const testEl = this.createDonutChart(singleData, total2nd);

          const marker = new mapboxgl.Marker({ element: testEl })
            .setLngLat(data.geometry.coordinates)
            .addTo(map);
          global.markerList.push(marker);
        });
      }
    }

    if (prevProps.circleMarkerData !== this.props.circleMarkerData) {
      // if(this.props.mapViewDataBy === )
      removeMarker();
      console.log(this.props.circleMarkerData, 'circlemarker ');
      if (this.props.mapViewBy === 'district') {
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
      } else if (this.props.mapViewBy === 'municipality') {
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
    }
    if (prevProps.mapViewDataBy !== this.props.mapViewDataBy) {
      // alert('pie marker');
      if (this.props.mapViewDataBy === 'investment_focus') {
        map.removeLayer('circles1');
        map.removeSource('fullGeojsonProvince');
        if (this.props.mapViewBy === 'province') {
          let singleData = {};
          let singleData2nd = {};
          const total = [];
          const total2nd = [];

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

      const newStyle = map.getStyle();
      newStyle.sources.municipality.tiles = [
        this.props.vectorTileUrl,
      ];
      map.setStyle(newStyle);
    }
    if (prevProps.vectorTileUrl !== vectorTileUrl) {
      this.plotVectorTile();
    }
  }

  changeGrades() {
    let range = [];
    const data = [];

    const colorArrayLength =
      this.props.colorArray && this.props.colorArray.length;

    // eslint-disable-next-line no-unused-expressions
    this.props.colorArray &&
      console.log('colors of legend', this.props.colorArray);

    const gradeCount =
      this.props.legendDivisions != null &&
      typeof this.props.legendDivisions === 'number' &&
      this.props.legendDivisions <= 20 &&
      this.props.legendDivisions >= colorArrayLength
        ? this.props.legendDivisions
        : 7;

    // eslint-disable-next-line no-unused-expressions
    this.props.legendDivisions &&
      console.log(
        'colors of gradecount',
        gradeCount,
        this.props.legendDivisions,
      );

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

    // eslint-disable-next-line no-unused-expressions
    this.props.choroplethData &&
      console.log(
        'colors of choroplethData',
        this.props.choroplethData,
        fullData,
      );

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

    const max = Math.max.apply(null, Object.values(data));
    const min = 0;

    range =
      (max - min) / (gradeCount - 1) < 1
        ? [0, 2, 4, 6, 8, 10, 12]
        : calculateRange(min, max, (max - min) / (gradeCount - 1));

    // console.log('range=====>', range);

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

    expression.push('rgba(0,0,0,0)');
    console.log('expression fill style', expression);

    this.setState({ finalStyle: expression });
  }

  getLegendColor(value) {
    const { legendColors, grade } = this.state;
    const { colorArray } = this.props;
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

      // if (that.props.label) {
      // }

      map.on('zoom', function() {});
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
        popup.remove();
      });

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
    });
  };

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

    const radius = scale(props.point_count);
    // const radius = scale(props.point_count - 10);
    // const circleRadius = radius - thickness;
    const circleRadius = radius;
    const svg = d3
      .select(div)
      .append('svg')
      .attr('class', 'pie')
      .attr('width', radius * 2)
      .attr('height', radius * 2);
    // console.log(circleRadius, 'circleRadiuS');
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
      </>
    );
  }
}
const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});

export default connect(mapStateToProps, {})(Choropleth);
