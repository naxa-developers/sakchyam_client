/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
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
import * as turf from '@turf/turf';
import midpoint from '@turf/midpoint';
import bearing from '@turf/bearing';
import destination from '@turf/destination';
import distance from '@turf/distance';
import { connect } from 'react-redux';
import {
  calculateRange,
  choroplethColorArray,
} from '../../../common/Functions';
import { removeDuplicates } from '../../../common/utilFunctions';
import TimelineChart from '../Chart/TimelineChart';

const defaultData = [
  { id: '1', count: 0 },
  { id: '2', count: 0 },
  { id: '3', count: 0 },
  { id: '4', count: 0 },
  { id: '5', count: 0 },
  { id: '6', count: 0 },
  { id: '7', count: 0 },
];

let i = 1;
class PlotVector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: [],
      legendColors: [],
      finalStyle: null,
      stateMarker: '',
      vectorTileInitialized: false,
      activeMarkers: [],
      inactiveMarkers: [],
      count: 0,
      minValue: '1/1/2015',
      maxValue: '2/2/2020',
      timeline: false,
      timelineMarkers: [],
      timelinePartnersPlotted: [],
      provinceLegendData: '',
      districtLegendData: '',
      municipalityLegendData: '',
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
      activeClickPartners,
      allPartners,
      automationReducer,
      activeOutreachButton,
      migrationArray,
      showBranches,
    } = this.props;
    const that = this;
    const {
      vectorTileInitialized,
      timelineMarkers,
      stateMarker,
      timeline,
    } = this.state;

    if (
      prevProps.automationReducer.provinceLegendData !==
      automationReducer.provinceLegendData
    ) {
      this.setState({
        provinceLegendData: automationReducer.provinceLegendData,
      });
    }

    if (
      prevProps.automationReducer.districtLegendData !==
      automationReducer.districtLegendData
    ) {
      this.setState({
        districtLegendData: automationReducer.districtLegendData,
      });
    }

    if (
      prevProps.automationReducer.municipalityLegendData !==
      automationReducer.municipalityLegendData
    ) {
      this.setState({
        municipalityLegendData:
          automationReducer.municipalityLegendData,
      });
      setTimeout(() => {
        this.changeGrades();
      }, 1000);
    }

    if (activeOutreachButton !== prevProps.activeOutreachButton) {
      if (activeOutreachButton) {
        if (map.getLayer('route')) map.removeLayer('route');
        if (map.getLayer('point')) map.removeLayer('point');

        if (stateMarker.length > 0) {
          stateMarker.map(marker => {
            marker.remove();
          });
        }

        if (timelineMarkers && timelineMarkers.length > 0) {
          timelineMarkers.map(marker => {
            marker.remove();
          });
        }

        this.setState({
          timeline: false,
          timelineMarkers: [],
          timelinePartnersPlotted: [],
        });
      } else {
        setTimeout(() => {
          this.setActiveInactiveMarkers();
        }, 500);
      }
    }

    if (activeClickPartners !== prevProps.activeClickPartners) {
      if (!activeOutreachButton) {
        this.setActiveInactiveMarkers();
      }
    }

    if (showBranches !== prevProps.showBranches) {
      if (showBranches) {
        this.plotMigration(map, migrationArray);
      } else {
        if (map.getLayer('route')) map.removeLayer('route');
        if (map.getLayer('point')) map.removeLayer('point');
      }
    }

    if (migrationArray !== prevProps.migrationArray) {
      if (showBranches) {
        this.plotMigration(map, migrationArray);
      } else {
        if (map.getLayer('route')) map.removeLayer('route');
        if (map.getLayer('point')) map.removeLayer('point');
      }
    }

    if (
      prevProps.automationReducer.timelineFilteredData !==
      automationReducer.timelineFilteredData
    ) {
      if (!activeOutreachButton && timeline) {
        this.setState({
          inactiveMarkers: [],
          activeMarkers: automationReducer.timelineFilteredData,
        });
        setTimeout(() => {
          this.settimelineMarkers(that);
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

  setActiveInactiveMarkers = () => {
    const { activeClickPartners, allPartners } = this.props;
    const that = this;

    const { timelineMarkers } = this.state;

    if (timelineMarkers && timelineMarkers.length > 0) {
      timelineMarkers.map(marker => {
        marker.remove();
      });
    }
    this.setState({
      timeline: false,
      timelineMarkers: [],
      timelinePartnersPlotted: [],
    });

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
        timeline: false,
      });
      setTimeout(() => {
        this.setMarkers(that);
      }, 100);
    } else {
      this.setState({
        activeMarkers: allPartners,
        inactiveMarkers: '',
        timeline: false,
      });
      setTimeout(() => {
        this.setMarkers(that);
      }, 100);
    }
  };

  settimelineMarkers = that => {
    const {
      stateMarker,
      activeMarkers,
      timelinePartnersPlotted,
      timeline,
      timelineMarkers,
    } = this.state;
    const { map } = that.props;

    if (timeline) {
      if (stateMarker.length > 0) {
        //
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

      const tempActive = {
        type: 'FeatureCollection',
        features: featuresArrayActive,
      };

      const markerCollection = timelineMarkers;
      tempActive.features.forEach(function(marker) {
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
        }).setText(`${marker.properties.partner_name}`);

        if (
          !timelinePartnersPlotted.includes(
            marker.properties.partner_id,
          )
        ) {
          timelinePartnersPlotted.push(marker.properties.partner_id);
          const el = document.createElement('div');

          el.className = 'marker-outreach-branch';

          const Marker1 = new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(popup)
            .addTo(map);

          el.addEventListener('mouseenter', () =>
            Marker1.togglePopup(),
          );
          el.addEventListener('mouseleave', () =>
            Marker1.togglePopup(),
          );

          if (that.state.timeline) {
            Marker1.togglePopup();
            setTimeout(() => {
              Marker1.togglePopup();
            }, 1000);
          }

          markerCollection.push(Marker1);
        }
      });

      this.setState({
        timelineMarkers: markerCollection,
        timelinePartnersPlotted,
      });
    }
  };

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
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
      }).setText(`${marker.properties.partner_name}`);
      const el = document.createElement('div');

      el.className = 'marker-outreach-branch';

      const Marker1 = new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(popup)
        .addTo(map);

      el.addEventListener('mouseenter', () => Marker1.togglePopup());
      el.addEventListener('mouseleave', () => Marker1.togglePopup());

      // if (that.state.timeline) {
      //   Marker1.togglePopup();
      //   setTimeout(() => {
      //     Marker1.togglePopup();
      //   }, 2000);
      // }

      markerCollection.push(Marker1);
    });

    tempInActive &&
      tempInActive.features.forEach(function(marker) {
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
        }).setText(`${marker.properties.partner_name}`);
        const el = document.createElement('div');
        let Marker1 = '';

        el.className = 'marker-outreach-inactive';
        Marker1 = new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(popup)
          .addTo(map);

        el.addEventListener('mouseenter', () =>
          Marker1.togglePopup(),
        );
        el.addEventListener('mouseleave', () =>
          Marker1.togglePopup(),
        );

        markerCollection.push(Marker1);
      });
    //
    this.setState({ stateMarker: markerCollection });
  };

  changeGrades() {
    let range = [];

    const gradeCount = 7;
    const fullRange = [];
    const { mapViewBy } = this.props;
    const {
      provinceLegendData,
      districtLegendData,
      municipalityLegendData,
    } = this.state;

    const fullData =
      this.props.choroplethData != null &&
      this.props.choroplethData.length > 0
        ? this.props.choroplethData
        : defaultData;

    // const data = [];
    // if (
    //   this.props.choroplethData != null &&
    //   this.props.choroplethData.length > 0
    // ) {
    //   this.props.choroplethData.forEach(data1 => {
    //     data.push(data1.count);
    //   });
    // } else {
    //   defaultData.forEach(data1 => {
    //     data.push(data1.count);
    //   });
    // }

    let legendData;
    let tempData = [];

    if (mapViewBy === 'municipality') {
      legendData = municipalityLegendData.result;
    } else if (mapViewBy === 'district') {
      legendData = districtLegendData.result;
    } else {
      legendData = provinceLegendData.result;
    }

    if (legendData != null && legendData.length > 0) {
      legendData.forEach(data1 => {
        tempData.push(data1.tablets_deployed);
      });
    } else {
      defaultData.forEach(data1 => {
        tempData.push(data1.count);
      });
    }

    const max = Math.max.apply(null, Object.values(tempData));
    const min = 1;

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

  plotMigration = (map, migrationData) => {
    const route = {
      type: 'FeatureCollection',
      features: [],
    };

    const point = {
      type: 'FeatureCollection',
      features: [],
    };

    const step = 500;

    migrationData.map((data, index) => {
      const originpoint = data.origin;
      const destinationpoint = data.destination;

      const singleLine = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [originpoint, destinationpoint],
        },
      };

      const singlePoint = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: originpoint,
        },
      };

      point.features.push(singlePoint);
      route.features.push(singleLine);

      const arc = [];
      const mp = midpoint(originpoint, destinationpoint);
      const center = destination(
        mp,
        400,
        bearing(originpoint, destinationpoint) - 90,
      );
      const lA = turf.lineArc(
        center,
        distance(center, originpoint),
        bearing(center, destinationpoint),
        bearing(center, originpoint),
      );
      const lineDistance = turf.length(lA, { units: 'kilometers' });

      for (let i1 = 0; i1 < lineDistance; i1 += lineDistance / step) {
        const segment = turf.along(lA, i1, { units: 'kilometers' });
        arc.unshift(segment.geometry.coordinates);
      }
      route.features[index].geometry.coordinates = arc;
      return true;
    });

    this.setState({ counter: 0 });
    this.setState({ points: point });
    this.setState({ routes: route });
    this.setState({ steps: step });
    const that = this;

    if (map.getLayer('route')) map.removeLayer('route');
    if (map.getLayer('point')) map.removeLayer('point');
    if (map.getSource('route')) map.removeSource('route');
    if (map.getSource('point')) map.removeSource('point');

    map.addSource('route', {
      type: 'geojson',
      data: route,
    });

    map.addSource('point', {
      type: 'geojson',
      data: point,
    });

    map.addLayer({
      id: 'route',
      source: 'route',
      type: 'line',
      paint: {
        'line-width': 2,
        'line-color': '#007cbf',
      },
    });

    map.addLayer({
      id: 'point',
      source: 'point',
      type: 'symbol',
      layout: {
        'icon-rotate': ['get', 'bearing'],
        'icon-rotation-alignment': 'map',
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
      },
    });
  };

  plotVectorTile = () => {
    const { map } = this.props;
    const that = this;
    let hoveredStateId = null;
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
        that.props.handleMapClick(e.features[0].properties.code);
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
          that.props.activeOutreachButton &&
            that.props.setHoveredMunicipalityId(e.features[0].id);
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
          // popup.remove();
        }
        hoveredStateId = null;
        that.props.setHoveredMunicipalityId(0);
      });
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

  playBtn = (min, max) => {
    const { timelineMarkers } = this.state;

    if (timelineMarkers.length > 0) {
      timelineMarkers.map(marker => {
        marker.remove();
      });
    }

    this.setState({
      minValue: this.getYear(min),
      maxValue: this.getYear(max),
      timelineMarkers: [],
      timelinePartnersPlotted: [],
      key: i,
      playClick: true,
      timeline: true,
    });
    i += 1;
  };

  getYear = minDate => {
    const d = new Date(minDate);

    const day = d.getDate();
    const month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    const year = d.getFullYear();

    const dateStr = `${month}/${day}/${year}`;
    return dateStr;
  };

  render() {
    const stateGrade = this.state.grade;
    const {
      localOutreachSelected,
      YesNo,
      mapViewDataBy,

      activeOutreachButton,
    } = this.props;

    const { minValue, maxValue } = this.state;

    return (
      <>
        {activeOutreachButton && (
          <div className="map-legend newmap-legend is-start">
            <div className="color-list ">
              <h6>Number of Tablet Deployed</h6>
              <ul id="state-legend" className="color-legend">
                {stateGrade &&
                  !YesNo &&
                  stateGrade.map((grade, key) => {
                    let hideLastdiv = false;
                    hideLastdiv =
                      key === stateGrade.length - 1 ? true : false;
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
        <TimelineChart
          activeOutreachButton={activeOutreachButton}
          minValue={minValue}
          maxValue={maxValue}
          playBtn={this.playBtn}
        />
      </>
    );
  }
}

const mapStateToProps = ({ automationReducer }) => ({
  automationReducer,
});

export default connect(mapStateToProps, {})(PlotVector);
