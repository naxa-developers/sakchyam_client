import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
// import TestComponent from './MainComponent';
// import TestChart from './TestChart';
import MainComponent from './MainComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/">
            <MainComponent />
            {/* <TestComponent /> */}
            {/* <TestChart /> */}
          </Route>
          <Route path="/about">{/* <TestComponent /> */}</Route>
          <Route path="/users">{/* <TestComponent /> */}</Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
