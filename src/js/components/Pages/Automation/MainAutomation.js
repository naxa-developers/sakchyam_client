import React, { Component } from 'react';
import MapComponent from './MapComponent';

class MainAutomation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.mapRef = React.createRef();
  }

  render() {
    return <MapComponent mapRef={this.mapRef} />;
  }
}

export default MainAutomation;
