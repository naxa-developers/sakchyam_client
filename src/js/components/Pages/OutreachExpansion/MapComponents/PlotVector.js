/* eslint-disable react/no-did-update-set-state */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prefer-template */
/* eslint-disable array-callback-return */
/* eslint-disable radix */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
import {
  calculateRange,
  choroplethColorArray,
} from '../../../common/Functions';

import Branch from '../../../../../img/Group5084.svg';
import Others from '../../../../../img/Group5086.svg';
import { getShortNumbers } from '../../../common/utilFunctions';

const defaultData = [
  { id: '1', count: 0 },
  { id: '2', count: 0 },
  { id: '3', count: 0 },
  { id: '4', count: 0 },
  { id: '5', count: 0 },
  { id: '6', count: 0 },
  { id: '7', count: 0 },
];

class PlotVector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: [],
      legendColors: [],
      finalStyle: null,
      stateMarker: '',
      vectorTileInitialized: false,
      legendTitle: 'Points of Service',
    };
  }

  componentDidMount() {
    this.changeGrades();
    this.plotVectorTile();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      map,
      vectorTileUrl,
      choroplethData,
      primaryData,
      mapViewDataBy,
      localOutreachSelected,
    } = this.props;
    const that = this;
    const { stateMarker, vectorTileInitialized } = this.state;

    if (prevProps.mapViewDataBy !== mapViewDataBy) {
      if (mapViewDataBy === 'outreach_local_units') {
        if (stateMarker.length > 0) {
          stateMarker.map(marker => {
            marker.remove();
          });
        }
        this.setState({ legendTitle: localOutreachSelected });
      } else {
        this.setMarkers(that);
        this.setState({ legendTitle: 'Points of Service' });
      }
    }

    if (localOutreachSelected !== prevProps.localOutreachSelected) {
      this.setState({ legendTitle: localOutreachSelected });
    }

    if (prevProps.choroplethData !== choroplethData) {
      this.changeGrades();
      if (vectorTileInitialized) {
        setTimeout(() => {
          map.setPaintProperty(
            'vector-tile-fill',
            'fill-color',
            this.state.finalStyle,
          );
        }, 100);
      }
    }

    if (prevProps.vectorTileUrl !== vectorTileUrl) {
      const newStyle = map.getStyle();
      newStyle.sources.municipality.tiles = [
        this.props.vectorTileUrl,
      ];
      map.setStyle(newStyle);
      this.plotVectorTile();
    }

    if (mapViewDataBy === 'general_outreach') {
      if (prevProps.primaryData !== primaryData) {
        this.setMarkers(that);
      }
    }
  }

  setMarkers = that => {
    const { stateMarker } = this.state;
    const { map, primaryData } = this.props;
    if (stateMarker.length > 0) {
      stateMarker.map(marker => {
        marker.remove();
      });
    }

    const featuresArray = primaryData.map(data => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          parseFloat(
            data.gps_point.substring(
              data.gps_point.indexOf(',') + 1,
              data.gps_point.length,
            ),
          ),
          parseFloat(
            data.gps_point.substring(0, data.gps_point.indexOf(',')),
          ),
        ],
      },
      properties: {
        ...data,
      },
    }));

    const temp = {
      type: 'FeatureCollection',
      features: featuresArray,
    };

    const markerCollection = [];
    temp.features.forEach(function(marker) {
      const el = document.createElement('div');
      el.addEventListener('click', () => {
        that.props.markerEventHandler(marker.properties);
      });
      let Marker1;
      if (marker.properties.partner_type === 'Commercial Bank') {
        if (marker.properties.point_service === 'Branch') {
          el.className = 'marker-outreach-branch';
          Marker1 = new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
        } else if (marker.properties.point_service === 'BLB') {
          el.className = 'marker-outreach-others ';
          Marker1 = new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
        }
      } else {
        el.className = 'marker-outreach-blb';
        Marker1 = new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
      }

      markerCollection.push(Marker1);
    });
    this.setState({ stateMarker: markerCollection });
  };

  changeGrades() {
    let range = [];
    const data = [];
    const gradeCount = 7;
    const fullRange = [];

    const fullData =
      this.props.choroplethData != null &&
      this.props.choroplethData.length > 0
        ? this.props.choroplethData
        : defaultData;

    if (
      this.props.choroplethData != null &&
      this.props.choroplethData.length > 0
    ) {
      this.props.choroplethData.forEach(data1 => {
        data.push(data1.count);
      });
    } else {
      defaultData.forEach(data1 => {
        data.push(data1.count);
      });
    }

    const max = Math.max.apply(null, Object.values(data));
    const min = Math.min.apply(null, Object.values(data));

    range =
      (max - min) / (gradeCount - 1) < 1
        ? [0, 2, 4, 6, 8, 10, 12]
        : calculateRange(min, max, (max - min) / (gradeCount - 1));

    if (this.props.YesNo) {
      range = [0, 1];
    }

    this.setState({
      grade: fullRange.length > 0 ? fullRange : range,
    });

    setTimeout(() => {
      this.ChangeLegendColors();
      this.setChoroplethStyle(fullData);
    }, 10);
  }

  ChangeLegendColors() {
    const choroplethColor = this.props.color;
    const color =
      choroplethColor !== undefined && choroplethColor.length > 0
        ? choroplethColor
        : '#ff0000';
    const data = this.state.grade;

    const firstColor = '#add8e6';

    let choroplethColors = choroplethColorArray(
      data.length,
      color,
      firstColor,
    );

    if (this.props.YesNo) {
      choroplethColors = ['rgb(235, 81, 73)', 'rgb(0,128,0)'];
    }
    this.setState({ legendColors: choroplethColors });
  }

  setChoroplethStyle(values) {
    const expression = ['match', ['get', 'code']];
    values.forEach(value => {
      const color = this.getLegendColor(value.count);
      expression.push(value.id.toString(), color);
    });
    expression.push('rgba(0,0,0,0)');
    this.setState({ finalStyle: expression });
  }

  plotVectorTile = () => {
    const { map } = this.props;
    const that = this;
    // let hoveredStateId = null;
    map.on('load', function() {
      map.addSource('municipality', {
        type: 'vector',
        // 'interactive':true,
        tiles: [
          that.props.vectorTileUrl
            ? that.props.vectorTileUrl
            : 'https://vectortile.naxa.com.np/federal/province.mvt/?tile={z}/{x}/{y}',
        ],
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
      that.setState({ vectorTileInitialized: true });

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

      map.on('click', 'vector-tile-fill', function(e) {
        // const getBbox = getCenterBboxProvince(
        //   e.features[0].properties.code,
        // );
        // map.fitBounds(getBbox.bbox);
        // that.props.handleFederalClickOnMap(
        //   'district',
        //   e.features[0].properties.code,
        // );
        // that.props.setMapViewBy('district');
        if (that.props.mapViewDataBy === 'outreach_local_units') {
          that.props.setHoveredMunicipalityId(e.features[0].id);
        }
      });

      // map.on('mousemove', 'vector-tile-fill', function(e) {
      //   if (e.features.length > 0) {
      //     if (hoveredStateId) {
      //       map.setFeatureState(
      //         {
      //           source: 'municipality',
      //           sourceLayer: 'default',
      //           id: hoveredStateId,
      //         },
      //         { hover: false },
      //       );
      //     }
      //     hoveredStateId = e.features[0].id;
      //     that.props.setHoveredMunicipalityId(e.features[0].id);
      //     map.setFeatureState(
      //       {
      //         source: 'municipality',
      //         sourceLayer: 'default',
      //         id: hoveredStateId,
      //       },
      //       { hover: true },
      //     );
      //   }
      // });

      // map.on('mouseleave', 'vector-tile-fill', function() {
      //   if (hoveredStateId) {
      //     map.setFeatureState(
      //       {
      //         source: 'municipality',
      //         sourceLayer: 'default',
      //         id: hoveredStateId,
      //       },
      //       { hover: false },
      //     );
      //   }
      //   hoveredStateId = null;
      //   that.props.setHoveredMunicipalityId(0);
      // });
    });

    map.on('style.load', () => {
      const waiting = () => {
        if (!map.isStyleLoaded()) {
          setTimeout(waiting, 200);
          that.props.loadingHandler(1);
        } else {
          that.props.loadingHandler(2);
        }
      };
      waiting();
    });
  };

  getLegendColor(value) {
    const { legendColors, grade } = this.state;
    let color = 'rgba(255,255,255,0)';

    if (this.props.YesNo) {
      if (value > 0) {
        return 'rgb(0,128,0)';
      }
      return 'rgb(235, 81, 73)';
      // eslint-disable-next-line no-else-return
    } else {
      // eslint-disable-next-line array-callback-return
      grade.map((gradeitem, j) => {
        if (value >= gradeitem && value !== 0) {
          color = legendColors[j];
        }
      });
      return color;
    }

    // eslint-disable-next-line array-callback-return
  }

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
    const stateGrade = this.state.grade;
    const {
      localOutreachSelected,
      YesNo,
      mapViewDataBy,
    } = this.props;
    const condition =
      mapViewDataBy === 'general_outreach' ? false : true;
    const { legendTitle } = this.state;

    return (
      <>
        <div className="map-legend newmap-legend is-start">
          <div className="color-list ">
            <h6>{legendTitle}</h6>
            <ul id="state-legend" className="color-legend">
              {stateGrade &&
                !YesNo &&
                stateGrade.map((grade, i) => {
                  let hideLastdiv = false;
                  hideLastdiv =
                    i === stateGrade.length - 1 ? true : false;
                  const grade1 =
                    grade < 1000
                      ? grade.toString()
                      : getShortNumbers(grade);

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
                        {localOutreachSelected === 'HDI of District'
                          ? grade1 / 100
                          : grade1}
                      </span>
                    </li>
                  );
                })}
            </ul>

            {YesNo && (
              <ul id="state-legend" className="color-legend">
                <li>
                  <div
                    style={{
                      backgroundColor: 'rgb(0,128,0)',
                    }}
                    className="color color1"
                  />
                  <span>Yes</span>
                </li>
                <li>
                  <div
                    style={{
                      backgroundColor: 'rgb(235, 81, 73)',
                    }}
                    className="color color1"
                  />
                  <span>No</span>
                </li>
              </ul>
            )}
          </div>

          {!condition && (
            <div className="color-list marker-legend">
              {/* <h6>Marker Legend</h6> */}
              <ul
                id="state-legend"
                className="color-legend outreach-legend"
              >
                <li>
                  <div>
                    <img src={Branch} />
                  </div>
                  <p>Branch</p>
                </li>
                <li>
                  <div>
                    <img src={Others} />
                  </div>
                  <p>BLB</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});

export default connect(mapStateToProps, {})(PlotVector);
