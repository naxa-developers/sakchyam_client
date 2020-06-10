import React, { Component } from 'react';
import MapboxPartnership from './MapboxPartnership';

class MainPartnership extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>MainPartnership</h1>
        <MapboxPartnership />
      </div>
    );
  }
}

export default MainPartnership;
