import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
// import TestComponent from './MainComponent';
import TestChart from './TestComponents/TestChart';
import MainComponent from './MainComponent';
import Test from './TestComponents/TestScroll';
import OIndicator2 from './TestComponents/OIndicator2.3';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <MainComponent />
            {/* <TestComponent /> */}
            {/* <TestChart /> */}
            {/* <Test /> */}
          </Route>
          <Route path="/about">{/* <TestComponent /> */}</Route>
          <Route path="/users">{/* <TestComponent /> */}</Route>
          <Route exact path="/indicator">
            <OIndicator2 />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
