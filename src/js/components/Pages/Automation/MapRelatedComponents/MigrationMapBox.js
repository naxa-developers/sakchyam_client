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
    console.log(migrationData, 'migdata');
    // A simple line from origin to destination.
    const route = {
      type: 'FeatureCollection',
      features: [],
    };

    // A single point that animates along the route.
    // Coordinates are initially set to origin.
    const point = {
      type: 'FeatureCollection',
      features: [],
    };

    // Number of steps to use in the arc and animation, more steps means
    // a smoother arc and animation, but too many steps will result in a
    // low frame rate
    const step = 500;

    migrationData.map((data, index) => {
      console.log(data, 'migrationdata');
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

      // console.log(route.features[0])
      // var line = turf.lineString([originpoint,destinationpoint]);
      // var lineDistance = turf.length(line, {units: 'kilometers'});
      // console.log(lineDistance)
      // Calculate the distance in kilometers between route start/end point.
      // var lineDistance = turf.length(route.features[0], {units: 'kilometers'});

      // const lineD = lineDistance(route, {units: 'kilometers'});
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

      // console.log(lA, "lalalala");

      // var start = turf.point(originpoint);
      // var end = turf.point(destinationpoint);

      // var greatCircle = turf.greatCircle(start, end, {'name': 'Seattle to DC'});

      // console.log(greatCircle, "greatcircle")
      const lineDistance = turf.length(lA, { units: 'kilometers' });

      // // Draw an arc between the `origin` & `destination` of the two points
      for (let i = 0; i < lineDistance; i += lineDistance / step) {
        const segment = turf.along(lA, i, { units: 'kilometers' });
        arc.unshift(segment.geometry.coordinates);
      }
      console.log(arc, 'arc');

      // // Update the route with calculated arc coordinates
      route.features[index].geometry.coordinates = arc;
      return true;
    });

    console.log(route, 'route');
    // console.log(point, "point")
    // Used to increment the value of the point measurement against the route.

    this.setState({ counter: 0 });
    this.setState({ points: point });
    this.setState({ routes: route });
    this.setState({ steps: step });
    const that = this;
    // map.on('load', function() {
    console.log(map, 'Migration Map Ref');
    // Add a source and layer displaying a point which will be animated in a circle.
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

    // Update point geometry to a new position based on counter denoting
    // the index to access the arc.
    // console.log(map, "map again")
    // console.log(points, 'points');
    point.features.map((data, index) => {
      data.geometry.coordinates =
        route.features[index].geometry.coordinates[count];
      // console.log(count, "coordinates is required")
      // Calculate the bearing to ensure the icon is rotated to match the route arc
      // The bearing is calculate between the current point and the next point, except
      // at the end of the arc use the previous point and the current point
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

      // console.log(count, "count")
      // Update the source with this new data.
      map.getSource('point').setData(point);

      // Request the next frame of animation so long the end has not been reached.
      if (count <= step) {
        // console.log("entered again")
        requestAnimationFrame(this.animate);
      }
      // console.log(point, "point below")

      this.setState({ counter: count + 1 });
      this.setState({ points: point });
      this.setState({ routes: route });
      return true;
    });
    // count = count - 1;
  };

  //   animateMarker = () => {
  //     // document.getElementById('replay').addEventListener('click', function() {
  //     // Set the coordinates of the original point back to origin
  //     const { counter } = this.state;
  //     // point.features.map((data, index) =>{
  //     data.geometry.coordinates =
  //       route.features[index].geometry.coordinates[
  //         route.features[index].geometry.coordinates.length - 1
  //       ];

  //     // Update the source layer
  //     map.getSource('point').setData(point);

  //     // Reset the counter
  //     // counter = route.features[index].geometry.coordinates.length-1;

  //     // Restart the animation.
  //     animate(counter);
  //     // })
  //     // });
  //   };

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
