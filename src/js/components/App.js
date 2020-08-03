import React, { Component } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  // Redirect,
} from 'react-router-dom';

import Login from './Login';
import PrivateRoute from '../Routes/PrivateRouter.routes';
import MainComponent from './Pages/Logframe/MainComponent';
import ForgotPassword from './ForgotPassword';
import Landing from './Landing';
import MainAutomation from './Pages/Automation/MainAutomation';
// import MainAutomation from './Pages/Automation/MainAutomationMapbox';
import FinancialLiteracy from './Pages/FinancialLiteracy/FinancialLiteracy';
import MainPartnership from './Pages/Partnership/MainPartnership';
import ProductProcess from './Pages/ProductProcess/ProductProcess';
import OutreachComponent from './Pages/OutreachExpansion';
import MainMFS from './Pages/MFS/MainMFS';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />

          <Route path="/forgot-password" component={ForgotPassword} />
          {/* <Route path="/signup" component={SignUp} /> */}
          <PrivateRoute path="/logframe" component={MainComponent} />
          {/* <PrivateRoute path="/" component={Landing} /> */}
          <PrivateRoute
            path="/automation"
            component={MainAutomation}
          />
          <PrivateRoute
            path="/financial"
            component={FinancialLiteracy}
          />
          <PrivateRoute
            path="/partnership"
            component={MainPartnership}
          />
          <PrivateRoute
            path="/productprocess"
            component={ProductProcess}
          />
          <PrivateRoute
            path="/outreachexpansion"
            component={OutreachComponent}
          />
          <PrivateRoute path="/mfs" component={MainMFS} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Landing} />
          <Route component={Landing} />
        </Switch>
      </Router>
    );
  }
}

export default App;
