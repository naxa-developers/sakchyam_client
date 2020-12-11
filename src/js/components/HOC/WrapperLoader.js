import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
// import Header from './Header';
// import Spinner from './Spinner';
import Logo from '../../../img/sakchyam-logo.png';

export default WrappedComponent => {
  class Wrapper extends Component {
    // eslint-disable-next-line react/state-in-constructor
    state = { isLoading: true };

    componentDidMount = () => this.setTimer();

    componentDidUpdate = prevProps => {
      if (this.props.location !== prevProps.location) {
        this.clearTimer();
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ isLoading: true }, () => this.setTimer());
      }
    };

    clearTimer = () => clearTimeout(this.timeout);

    timer = () =>
      this.setState({ isLoading: false }, () => this.clearTimer());

    // eslint-disable-next-line no-return-assign
    setTimer = () => (this.timeout = setTimeout(this.timer, 3000));

    render = () => (
      <>
        <div
          id="sakchyam-preloader"
          style={
            this.state.isLoading
              ? { display: 'flex' }
              : { display: 'none' }
          }
        >
          <img alt="sakchyam-logo" src={Logo} />
          <div className="spinner">
            <div className="spinnerhalf spinnerhalf--left" />
            <div className="spinnerhalf spinnerhalf--right" />
          </div>
        </div>
        <WrappedComponent {...this.props} />
      </>
    );
  }
  return withRouter(Wrapper);
};
