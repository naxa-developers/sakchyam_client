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
import NewAutomation from './Pages/NewAutomation/Automation';
import FinancialLiteracy from './Pages/FinancialLiteracy/FinancialLiteracy';
import MainPartnership from './Pages/Partnership/MainPartnership';
import ProductProcess from './Pages/ProductProcess/ProductProcess';
import OutreachComponent from './Pages/OutreachExpansion';
import PaymentSystems from './Pages/PaymentSystems/PaymentSystems';
import MainMFS from './Pages/MFS/MainMFS';
import InsuranceModule from './Pages/Insurance';
import Header from './Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: '',
    };
  }

  setActivePage = selectedPage => {
    this.setState({ activePage: selectedPage });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activePage !== this.state.activePage) {
      window.location.href = `#/${this.state.activePage}`;
      // <Redirect to="/" />;
    }
  }

  render() {
    const { activePage } = this.state;
    return (
      <Router>
        <Header
          disableScroll
          activePage={activePage}
          setActivePage={this.setActivePage}
        />
        <Switch>
          <Route path="/login" component={Login} />

          <Route path="/forgot-password" component={ForgotPassword} />
          {/* <Route path="/signup" component={SignUp} /> */}
          <PrivateRoute path="/logframe" component={MainComponent} />
          {/* <PrivateRoute path="/" component={Landing} /> */}
          <PrivateRoute
            path="/automation"
            component={NewAutomation}
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
          <PrivateRoute
            path="/paymentsystems"
            component={PaymentSystems}
          />
          <PrivateRoute path="/mfs" component={MainMFS} />
          <PrivateRoute
            path="/insurance"
            component={InsuranceModule}
          />
          <Route path="/login" component={Login} />
          <Route path="/" component={Landing} />
          <Route component={Landing} />
        </Switch>
      </Router>
    );
  }
}

export default App;
