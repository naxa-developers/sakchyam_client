/* eslint-disable no-else-return */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-unused-expressions */
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
import { removeDuplicates } from '../../../common/utilFunctions';

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
      activeMarkers: '',
      inactiveMarkers: '',
      count: 0,
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
      activeClickPartners,
      allPartners,
      activeMarkers,
    } = this.props;
    const that = this;
    const { stateMarker, vectorTileInitialized } = this.state;

    if (allPartners !== prevProps.allPartners) {
      let { count } = this.state;
      if (count === 0) {
        count += 1;
        this.setState({
          activeMarkers: allPartners,
          inactiveMarkers: '',
          count,
        });
        setTimeout(() => {
          this.setMarkers(that);
        }, 100);
      }
    }

    if (activeClickPartners !== prevProps.activeClickPartners) {
      if (activeClickPartners.length > 0) {
        const actives = [];
        allPartners.map(partner => {
          activeClickPartners.map(id => {
            if (partner.partner_id === id) {
              actives.push(partner);
            }
          });
        });
        let inactives = [];
        let tempArray = allPartners;
        activeClickPartners.map(id => {
          inactives = tempArray.filter(
            partner => partner.partner_id !== id,
          );
          tempArray = inactives;
        });
        const uniqueActives = removeDuplicates(actives, 'partner_id');
        const uniqueInactives = removeDuplicates(
          inactives,
          'partner_id',
        );
        this.setState({
          activeMarkers: uniqueActives,
          inactiveMarkers: uniqueInactives,
        });
        setTimeout(() => {
          this.setMarkers(that);
        }, 100);
      } else {
        this.setState({
          activeMarkers: allPartners,
          inactiveMarkers: '',
        });
        setTimeout(() => {
          this.setMarkers(that);
        }, 100);
      }
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
  }

  setMarkers = that => {
    const {
      stateMarker,
      activeMarkers,
      inactiveMarkers,
    } = this.state;
    const { map } = that.props;

    if (stateMarker.length > 0) {
      stateMarker.map(marker => {
        marker.remove();
      });
    }

    const featuresArrayActive = activeMarkers.map(data => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [data.long, data.lat],
      },
      properties: {
        ...data,
      },
    }));
    const featuresArrayInactive =
      inactiveMarkers &&
      inactiveMarkers.map(data => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [data.long, data.lat],
        },
        properties: {
          ...data,
        },
      }));

    const tempActive = {
      type: 'FeatureCollection',
      features: featuresArrayActive,
    };

    const tempInActive = featuresArrayInactive && {
      type: 'FeatureCollection',
      features: featuresArrayInactive,
    };

    const markerCollection = [];
    tempActive.features.forEach(function(marker) {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        `${marker.properties.partner_name}`,
      );
      const el = document.createElement('div');
      let Marker1 = '';

      el.className = 'marker-outreach-branch';
      Marker1 = new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(popup)
        .addTo(map);
      markerCollection.push(Marker1);
    });

    tempInActive &&
      tempInActive.features.forEach(function(marker) {
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(
          `${marker.properties.partner_name}`,
        );
        const el = document.createElement('div');
        let Marker1 = '';

        el.className = 'marker-outreach-inactive';
        Marker1 = new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(popup)
          .addTo(map);

        markerCollection.push(Marker1);
      });
    // console.log('marker collection', markerCollection);
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

    const firstColor = '#ADD8E6';

    const choroplethColors = choroplethColorArray(
      data.length,
      color,
      firstColor,
    );

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

      // const popup = new mapboxgl.Popup({
      //   closeButton: false,
      //   closeOnClick: false,
      // });

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

    // map.on('style.load', () => {
    //   const waiting = () => {
    //     if (!map.isStyleLoaded()) {
    //       setTimeout(waiting, 200);
    //       that.props.loadingHandler(1);
    //     } else {
    //       that.props.loadingHandler(2);
    //     }
    //   };
    //   waiting();
    // });
  };

  getLegendColor(value) {
    const { legendColors, grade } = this.state;
    let color = 'rgba(255,255,255,0)';

    // eslint-disable-next-line array-callback-return
    grade.map((gradeitem, j) => {
      if (value >= gradeitem && value > 0) {
        color = legendColors[j];
      }
    });
    if (this.props.activeOutreachButton) {
      return color;
    } else {
      const colorTemp = 'rgba(255,255,255,0)';
      return colorTemp;
    }
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
      activeOutreachButton,
    } = this.props;

    return (
      <>
        {activeOutreachButton && (
          <div className="map-legend newmap-legend is-start">
            <div className="color-list ">
              <h6>Number of Tablet Deployed</h6>
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
                          {localOutreachSelected === 'HDI of District'
                            ? grade1 / 100
                            : grade1}
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});

export default connect(mapStateToProps, {})(PlotVector);
