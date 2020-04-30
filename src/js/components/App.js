import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from './Login';
import PrivateRoute from '../Routes/PrivateRouter.routes';
import MainComponent from './Pages/Logframe/MainComponent';
import ForgotPassword from './ForgotPassword';
import Landing from './Landing';
import MainAutomation from './Pages/Automation/MainAutomation';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // if (localStorage.getItem('userToken')) {
    //   localStorage.removeItem('userToken');
    // }
  }

  // handleLogOutClick = () => {
  //   if (localStorage.getItem('userToken')) {
  //     localStorage.removeItem('userToken');
  //     return <Redirect to="/login" />;
  //   }
  // };

  render() {
    return (
      <Router>
        {/* {localStorage.getItem('userToken') ? (
          <button
            style={{ zIndex: 999999999, position: 'fixed' }}
            type="button"
            onClick={this.handleLogOutClick}
          >
            Log Out
          </button>
        ) : null} */}
        <Switch>
          <Route path="/login" component={Login} />
          {/* <Route
            path="/change-password"
            component={ChangePasswordByUser}
          /> */}
          <Route path="/forgot-password" component={ForgotPassword} />
          {/* <Route path="/signup" component={SignUp} /> */}
          <PrivateRoute path="/logframe" component={MainComponent} />
          {/* <PrivateRoute path="/" component={Landing} /> */}
          <PrivateRoute
            path="/automation"
            component={MainAutomation}
          />
          <Route path="/login" component={Login} />
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
    );
  }
}

export default App;
