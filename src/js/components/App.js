import React, { Component } from 'react';
import logo from '../../static/images/saklogo.jpg';
import TestComponent from './TestComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <TestComponent data="Sakchyam" />
        <img alt="sakchyam" src={logo} />
      </div>
    );
  }
}

export default App;
