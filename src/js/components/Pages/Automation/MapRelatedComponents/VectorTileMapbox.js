import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import { calculateRange, choroplethColorArray } from './Functions';

const defaultData = [
  { id: '1', count: 0 },
  { id: '2', count: 0 },
  { id: '3', count: 0 },
  { id: '4', count: 0 },
  { id: '5', count: 0 },
  { id: '6', count: 0 },
  { id: '7', count: 0 },
];

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
    const {
      colorArray,
      legendDivisions,
      divisions,
      choroplethData,
    } = this.props;
    let range = [];
    const data = [];
    const colorArrayLength = colorArray && colorArray.length;
    const gradeCount =
      legendDivisions != null &&
      typeof legendDivisions === 'number' &&
      legendDivisions <= 20 &&
      legendDivisions >= colorArrayLength
        ? legendDivisions
        : 7; // set default gradecount

    const fullRange =
      divisions && divisions.length > 0 ? divisions : [];
    const fullData =
      choroplethData != null && choroplethData.length > 0
        ? choroplethData
        : defaultData;
    // console.log(fullData, 'fulldata');
    // const { choroplethData } = this.props;
    // choroplethData !== null && choroplethData.length > 0
    //   ? choroplethData.map(data1 => {
    //       data.push(data1.count);
    //     })
    //   // : defaultData.map(data1 => {
    //   //     data.push(data1.count); // if no dat passed take from default data
    //   //   });
    if (choroplethData !== null && choroplethData.length > 0) {
      choroplethData.map(data1 => {
        return data.push(data1.count);
      });
    } else {
      defaultData.map(data1 => {
        return data.push(data1.count); // if no dat passed take from default data
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
    // console.log(range, "range")
    this.setState({
      grade: fullRange.length > 0 ? fullRange : range,
    }); // add grade provided from props if available

    setTimeout(() => {
      this.ChangeLegendColors();
      this.setChoroplethStyle(fullData);
    }, 200);
  }

  ChangeLegendColors() {
    const { color } = this.props;
    const { grade } = this.state;
    const choroplethColor = color;
    const color2nd =
      choroplethColor !== undefined && choroplethColor.length > 0
        ? choroplethColor
        : '#ff0000';
    const data = grade;
    const choroplethColors = choroplethColorArray(
      data.length,
      color2nd,
    );
    // console.log(choroplethColors, 'legendcolors');
    this.setState({ legendColors: choroplethColors });
  }

  setChoroplethStyle(values) {
    // console.log(values, 'values');
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
    // console.log(this.state.finalStyle, 'finalstyl');
  }

  plotVectorTile = () => {
    const { map } = this.props;
    const that = this;
    // console.log(this.state.finalStyle, 'this finalstyle');
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

      map.addLayer(
        {
          id: 'vector-tile-fill',
          type: 'fill',
          source: 'municipality',
          'source-layer': 'default',
          paint: {
            'fill-color': that.state.finalStyle,
          },
        },
        'waterway-label',
      );

      map.addLayer({
        id: 'vector-tile-outline',
        type: 'line',
        source: 'municipality',
        'source-layer': 'default',
        paint: {
          'line-color': 'rgba(255, 0, 0, 1)',
          'line-width': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            5,
            1,
          ],
        },
      });

      if (that.props.label) {
        map.addLayer({
          id: 'vector-tile-label',
          type: 'symbol',
          source: 'municipality',
          'source-layer': 'default',
          layout: {
            'text-field': ['get', 'name'],
            'icon-image': ['concat', ['get', 'icon'], '-15'],
            'text-anchor': 'center',
            'text-offset': [0, 0],
            'symbol-placement': 'point',
            'text-justify': 'center',
            'text-size': 10,
          },
          paint: {
            'text-color': '#666',
            'text-halo-color': 'rgba(255,255,255,0.95)',
            'text-halo-width': 1.5,
            'text-halo-blur': 1,
          },
        });
      }
      // var bounds = coordinates.reduce(function(bounds, coord) {
      //   return bounds.extend(coord);
      //   }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
      // map.fitBounds()

      // map.on('click', 'vector-tile-fill', function(e) {
      //   // console.log(e, 'clicked');
      // });
      map.on('mousemove', 'vector-tile-fill', function(e) {
        // e.features[0].id = e.features[0].properties.id;
        // console.log(e.features[0], 'feature code');
        map.getCanvas().style.cursor = 'pointer';
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
          // console.log(hoveredStateId, 'hoverstateid');
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

      //   map.on('mouseleave', 'vector-tile-fill', function() {
      //     if (hoveredStateId) {
      //     map.setFeatureState(
      //     { source: 'municipality', sourceLayer: 'default', id: hoveredStateId },
      //     { hover: false }
      //     );
      //     }
      //     hoveredStateId = null;
      //   });
    });
    map.addControl(new mapboxgl.NavigationControl());
  };

  componentDidMount() {
    this.changeGrades();
    this.plotVectorTile();
  }

  componentDidUpdate(prevProps) {
    const { map, vectorTileUrl, choroplethData } = this.props;
    const { finalStyle } = this.state;
    if (prevProps.choroplethData !== choroplethData) {
      this.changeGrades();
      setTimeout(() => {
        // console.log(this.state.finalStyle, 'inside finalstyle');
        // console.log('entered inside');
        map.setPaintProperty(
          'vector-tile-fill',
          'fill-color',
          finalStyle,
        );
      }, 2000);
    }
    if (prevProps.vectorTileUrl !== vectorTileUrl) {
      // this.changeGrades();
      this.plotVectorTile();
    }
    // if (prevState.finalStyle !== this.state.finalStyle) {
    // }
  }

  render() {
    return <div />;
  }
}
export default Choropleth;
