import React, { Component, Suspense } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  withRouter,
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
import Loading from './common/Loading';
import WrapperLoader from './HOC/WrapperLoader';

// const MainPartnership = React.lazy(() =>
//   import('../components/Pages/Partnership/MainPartnership'),
// );
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log(this.props);
    return (
      <>
        {this.props.location.pathname !== '/login' && <Header />}
        {/* <Suspense
          fallback={<Loading loaderState top="50%" left="46%" />}
        > */}
        {/* <Header disableScroll /> */}
        <Switch>
          <Route path="/login" component={Login} />

          <Route
            path="/forgot-password"
            component={WrapperLoader(ForgotPassword)}
          />
          {/* <Route path="/signup" component={SignUp} /> */}
          <PrivateRoute
            path="/logframe"
            component={WrapperLoader(MainComponent)}
          />
          {/* <PrivateRoute path="/" component={Landing} /> */}
          <PrivateRoute
            path="/automation"
            component={WrapperLoader(NewAutomation)}
          />

          <PrivateRoute
            path="/financial"
            component={WrapperLoader(FinancialLiteracy)}
          />
          <PrivateRoute
            path="/partnership"
            component={WrapperLoader(MainPartnership)}
          />
          <PrivateRoute
            path="/productprocess"
            component={WrapperLoader(ProductProcess)}
          />
          <PrivateRoute
            path="/outreachexpansion"
            component={WrapperLoader(OutreachComponent)}
          />
          <PrivateRoute
            path="/paymentsystems"
            component={WrapperLoader(PaymentSystems)}
          />
          <PrivateRoute
            path="/mfs"
            component={WrapperLoader(MainMFS)}
          />
          <PrivateRoute
            path="/insurance"
            component={WrapperLoader(InsuranceModule)}
          />
          <Route path="/login" component={Login} />
          <Route path="/" component={Landing} />
          <Route component={Landing} />
        </Switch>
        {/* </Suspense> */}
      </>
    );
  }
}

export default withRouter(App);
