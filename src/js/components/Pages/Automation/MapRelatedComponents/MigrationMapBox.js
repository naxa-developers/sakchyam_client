/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
// import './js/turf.min'
import * as turf from '@turf/turf';
import midpoint from '@turf/midpoint';
import bearing from '@turf/bearing';
import destination from '@turf/destination';
import distance from '@turf/distance';

// import {
//   label_Vector_Tiles,
//   calculateRange,
//   handleZoom,
//   choroplethColorArray,
//   getProvinceName,
// } from './Functions';

class MigrationLines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      points: {},
      routes: {},
      steps: 0,
    };
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
        400, // lineDistance, //each line radius will be different if line distance is used
        bearing(originpoint, destinationpoint) - 90,
      );
      const lA = turf.lineArc(
        center,
        distance(center, originpoint),
        bearing(center, destinationpoint),
        bearing(center, originpoint),
      );
      const lineDistance = turf.length(lA, { units: 'kilometers' });

      // // Draw an arc between the `origin` & `destination` of the two points
      for (let i = 0; i < lineDistance; i += lineDistance / step) {
        const segment = turf.along(lA, i, { units: 'kilometers' });
        arc.unshift(segment.geometry.coordinates);
      }
      // console.log(arc, 'arc');

      // // Update the route with calculated arc coordinates
      route.features[index].geometry.coordinates = arc;
      return true;
    });

    this.setState({ counter: 0 });
    this.setState({ points: point });
    this.setState({ routes: route });
    this.setState({ steps: step });
    const that = this;

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
        'icon-image': 'airport-15',
        'icon-rotate': ['get', 'bearing'],
        'icon-rotation-alignment': 'map',
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
      },
    });

    // Start the animation.
    // that.animate();
    // });
  };

  animate = () => {
    const count = this.state.counter;
    const point = this.state.points;
    const route = this.state.routes;
    const { map } = this.props;
    const step = this.state.steps;
    point.features.map((data, index) => {
      data.geometry.coordinates =
        route.features[index].geometry.coordinates[count];
      data.properties.bearing = turf.bearing(
        turf.point(
          route.features[index].geometry.coordinates[
            count >= step ? count + 1 : count
          ],
        ),
        turf.point(
          route.features[index].geometry.coordinates[
            count >= step ? count : count + 1
          ],
        ),
      );

      map.getSource('point').setData(point);

      if (count <= step) {
        requestAnimationFrame(this.animate);
      }

      this.setState({ counter: count + 1 });
      this.setState({ points: point });
      this.setState({ routes: route });
      return true;
    });
    // count = count - 1;
  };

  componentDidMount() {
    // this.setState({ map });
    // this.plotMigration(map, migrationData);
  }

  componentDidUpdate(prevProps, prevState) {
    const { migrationData } = this.props;
    const { map } = this.props;
    if (prevProps.migrationData !== this.props.migrationData) {
      console.log('plotMigration didupdate');
      this.plotMigration(map, migrationData);
    }
  }

  render() {
    return <div />;
  }
}
export default MigrationLines;
