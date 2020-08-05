import React, { Component } from 'react';
import { Redirect, Link, browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import LogoWhite from '../../img/logo-white.png';
import LogoIllustration from '../../img/Login-illustration.png';
import SakLogo from '../../img/saklogo.png';
import UkAid from '../../img/ukaid.png';
import {
  loginUser,
  getUserPermissions,
} from '../actions/authentication.actions';
import Loading from './common/Loading';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginLoading: false,
    };
  }

  handleSubmit = e => {
    this.setState({ loginLoading: true });
    e.preventDefault();
    this.props.loginUser(this.state);

    // browserHistory.push({
    //   pathname: '/yourpath',
    //   state: { history },
    // });
    // this.props.getUserPermissions();
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    this.updateWindowDimensions();

    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.authenticationReducer.isLoggedIn !==
      this.props.authenticationReducer.isLoggedIn
    ) {
      // const { history } = this.props.location.state;
      // history.push(this.props.location.pathname);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ loginLoading: false });
      // const { afterLogin } = this.props.location.state;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    // console.log(screen.height, 'screen');
    // console.log(window.innerHeight, 'windowheight');
    if (window.innerHeight === screen.height) {
      const loginWrapper = document.getElementsByClassName(
        'login-wrapper',
      )[0];
      loginWrapper.style.height = `${screen.height}px`;
      // console.log(loginWrapper, 'if loginwrapper');

      // $('.banner').css('height', y);
      // $('.login-wrapper ').css('height', y);
      // // $('.login-content .login-footer').css('top', '5rem');
      // $('.banner-content .dashed').css(
      //   'margin',
      //   '7.5rem auto 6.5rem',
      // );
    } else {
      const loginWrapper = document.getElementsByClassName(
        'login-wrapper',
      )[0];
      loginWrapper.style.height = `${window.innerHeight}px`;
      // console.log('else loginwrapper');

      // $('.banner').css('height', x);
      // $('.login-wrapper').css('height', x);
      // $('.login-content .login-footer').css('top', 'auto');
      // $('.banner-content .dashed').css(
      //   'margin',
      //   '5.688rem auto 5.313rem',
      // );
    }
  };

  render() {
    const {
      authenticationReducer: { redirectToReferrer },
    } = this.props;

    if (redirectToReferrer === true) {
      if (
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.afterLogin
      ) {
        return <Redirect to={this.props.location.state.afterLogin} />;
      }
      return <Redirect to="/" />;
    }
    const { username, password, loginLoading } = this.state;

    return (
      <div className="login-page">
        <Loading
          left="65%"
          loaderState={loginLoading}
          text="Signing In...Please Wait"
        />
        <div className="container-fluid p-0">
          <div className="login-wrapper">
            <aside className="login-sidebar">
              <div className="login">
                <div className="login-header">
                  <div className="logo">
                    <Link to="/">
                      <img src={LogoWhite} alt="Louis Berger" />
                    </Link>
                  </div>
                  <div className="title">
                    <h3>
                      Welcome
                      <span> to</span>
                      <br />
                      Data Visualization Port (DVP)
                    </h3>
                    <span className="span_heavy_15">
                      A Small Leap towards Application of Open Data on
                      Aid and Budget in Nepal.
                    </span>
                  </div>
                </div>
                <div className="login-body">
                  <div className="container">
                    <div className="image-content">
                      <img src={LogoIllustration} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="login-footer">
                <span className="span_book_14">
                  © 2020 Sakchyam. All rights reserved.
                </span>
                <span className="span_book_14">
                  Privacy
                  <span className="border-span">|</span>
                  Terms of Service
                </span>
              </div>
            </aside>

            <main className="main-section">
              <div className="login-content">
                <div className="login-header">
                  <h2>Log in</h2>
                  <span className="span_book_15">
                    Please log in to your account using email &
                    password.
                  </span>
                </div>

                <form
                  className="login-form"
                  onSubmit={this.handleSubmit}
                >
                  <div className="form-group">
                    <label
                      htmlFor="inputEmail"
                      className="span_heavy_15"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="username"
                      className="form-control span_book_15"
                      id="inputEmail"
                      onChange={this.handleChange}
                      placeholder="username"
                    />
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="inputPassword"
                      className="span_heavy_15"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control span_book_15"
                      id="inputPassword"
                      name="password"
                      onChange={this.handleChange}
                      placeholder="********"
                    />
                  </div>

                  <div className="form-group checkbox">
                    <input type="checkbox" id="checkbox_checked" />
                    <label
                      htmlFor="checkbox_checked"
                      className="span_book_15"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="btn-wrap">
                    <button type="submit">
                      <a className="span_heavy_15">Log in</a>
                    </button>
                    {/* <span className="span_book_15">
                      Can&apos;t log in?
                    </span> */}
                  </div>
                </form>
                <div className="login-footer">
                  <img src={SakLogo} alt="sakchyam_logo" />
                  <img src={UkAid} alt="UKaid_logo" />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authenticationReducer }) => ({
  authenticationReducer,
});
export default connect(mapStateToProps, {
  loginUser,
  getUserPermissions,
})(Login);
