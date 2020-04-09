import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import MainComponent from './MainComponent';
import Login from './Login';

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
          </Route>
          <Route path="/about">{/* <TestComponent /> */}</Route>
          <Route path="/users">{/* <TestComponent /> */}</Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
