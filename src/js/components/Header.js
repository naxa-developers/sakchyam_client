// /* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import UKAidWhiteLogo from '../../img/uk-aid-white.png';
import Logo from '../../img/logo.png';
import WhiteLogo from '../../img/logo-white.png';
import UkaidLogo from '../../img/ukaid.png';
import PpImage from '../../img/pp.jpg';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeProfileDropdown: false,
      permissions: null,
    };
  }

  // componentDidMount() {
  //   const profileDropdownEl = document.getElementById(
  //     'profile_dropdown',
  //   );
  //   // console.log(specifiedElement, 'ss');
  //   document.addEventListener('click', async event => {
  //     const isClickInside = profileDropdownEl.contains(event.target);

  //     if (!isClickInside) {
  //       console.log('clickoutside');
  //       this.setState({
  //         activeProfileDropdown: false,
  //         // searchDropdown: false,
  //       });
  //       // the click was outside the specifiedElement, do something
  //     }
  //   });
  //   // const windowPos = window.pageYOffset;
  //   // const siteHeader = document.getElementsByClassName(
  //   //   '.main-header',
  //   // );
  //   // const scrollLink = document.getElementsByClassName('.scroll-top');
  //   // if (windowPos >= 110) {
  //   //   siteHeader.addClass('fixed-header');
  //   //   scrollLink.addClass('open');
  //   // } else {
  //   //   siteHeader.removeClass('fixed-header');
  //   //   scrollLink.removeClass('open');
  //   // }
  // }

  componentDidMount() {
    const permissionData = localStorage.getItem('userPermission');
    const permissionObject = JSON.parse(permissionData);
    this.setState({ permissions: permissionObject });
    // console.log(permissionObject, 'permission');
    if (this.props.disableScroll) {
      // this.headerUpdate();

      window.addEventListener('scroll', this.headerUpdate);
    } else {
      // const profileDropdownEl = document.getElementById(
      //   'profile_dropdown',
      // );
      // // console.log(specifiedElement, 'ss');
      // document.addEventListener('click', async event => {
      //   const isClickInside = profileDropdownEl.contains(
      //     event.target,
      //   );
      //   if (!isClickInside) {
      //     console.log('clickoutside');
      //     this.setState({
      //       activeProfileDropdown: false,
      //       // searchDropdown: false,
      //     });
      //     // the click was outside the specifiedElement, do something
      //   }
      // });
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.activePage !== this.state.activePage) {
  //     window.location.href = `#/${this.state.activePage}`;
  //     // <Redirect to="/" />;
  //   }
  // }

  componentWillUnmount() {
    if (this.props.disableScroll) {
      window.removeEventListener('scroll', this.headerUpdate);
    }
  }

  headerUpdate = () => {
    if (
      document.getElementsByClassName('apexcharts-legend-text')[0]
    ) {
      document.getElementsByClassName(
        'apexcharts-legend-text',
      )[0].innerText = document
        .getElementsByClassName('apexcharts-legend-text')[0]
        .innerText.replace('Bar', '');
    }
    if (
      document.getElementsByClassName('apexcharts-legend-text')[3]
    ) {
      document.getElementsByClassName(
        'apexcharts-legend-text',
      )[3].innerText = document
        .getElementsByClassName('apexcharts-legend-text')[3]
        .innerText.replace('Line', '');
    }
    const windowPos = window.pageYOffset;
    const siteHeader = document.getElementsByClassName('main-header');
    const scrollLink = document.getElementsByClassName('scroll-top');
    if (windowPos >= 110) {
      siteHeader[0].classList.add('fixed-header');
      scrollLink[0].classList.add('open');
    } else {
      siteHeader[0].classList.remove('fixed-header');
      scrollLink[0].classList.remove('open');
    }
  };

  handleDropdown = () => {
    this.setState(prevState => ({
      activeProfileDropdown: !prevState.activeProfileDropdown,
    }));
  };

  handleLogOut = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userPermission');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('expirationTime');
    window.location.href = '/';
  };

  render() {
    const { activeProfileDropdown, permissions } = this.state;
    const { activePage } = this.props;
    const { headerTransparent } = this.props;
    return (
      <header
        className={`main-header header-fixed ${
          headerTransparent ? 'home-header' : ''
        }`}
      >
        <div className="container-fluid p-0">
          <ul>
            <li>
              <Link to="/" className="logo">
                <img
                  src={headerTransparent ? WhiteLogo : Logo}
                  alt="sakchyam logo"
                />
              </Link>
            </li>
            <li>
              <ul className="link-wrap">
                <li>
                  <select
                    value={this.props.location.pathname.replace(
                      '/',
                      '',
                    )}
                    onChange={e => {
                      this.props.setActivePage(e.target.value);
                    }}
                  >
                    <option value="">Select Visualisation</option>
                    <option value="logframe">Logframe</option>
                    <option value="automation">Automation</option>
                    <option value="financial">
                      Financial Literacy
                    </option>
                    <option value="partnership">Partnership</option>
                    <option value="outreachexpansion">
                      Outreach Expansion
                    </option>
                    <option value="insurance">Insurance</option>
                    <option value="productprocess">
                      Product/Process
                    </option>
                    <option value="paymentsystems">
                      Payment System
                    </option>
                    <option value="mfs">MFS</option>
                  </select>
                  {/* <a href="#/" className="span_heavy_15">
                    Visualisation Structures
                  </a> */}
                </li>

                <li style={{ display: 'none' }}>
                  <Link to="/" className="span_heavy_15">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/" className="span_heavy_15">
                    Home
                  </Link>
                </li>
                <li>
                  <a href="#/" className="span_heavy_15">
                    Contact
                  </a>
                </li>
                {permissions && permissions[0].email ? (
                  ''
                ) : (
                  <li>
                    <Link to="/login" className="span_heavy_15">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
              {permissions && permissions[0].email ? (
                <div
                  className="profile-img dropdown"
                  id="profile_dropdown"
                >
                  <a
                    className="log-out dropdown_toggle"
                    role="button"
                    tabIndex="0"
                    onKeyDown={this.handleDropdown}
                    onClick={this.handleDropdown}
                  >
                    {permissions[0].image ? (
                      <img
                        src={`https://sakchyam.naxa.com.np${permissions[0].image}`}
                        alt="ppimage"
                      />
                    ) : (
                      <img src={PpImage} alt="ppimage" />
                    )}
                  </a>
                  <ul
                    className={`dropdown_menu ${
                      activeProfileDropdown ? 'active' : ''
                    }`}
                  >
                    {/* <li>
                      <a
                        href="#/"
                        className="disabled profile span_heavy_15"
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="#/"
                        className="disabled settings span_heavy_15"
                      >
                        Settings
                      </a>
                    </li> */}
                    <li>
                      {' '}
                      <a
                        href="#/"
                        onClick={this.handleLogOut}
                        className="logout span_heavy_15"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              ) : null}
              <a href="index.html" className="logo">
                <img
                  src={headerTransparent ? UKAidWhiteLogo : UkaidLogo}
                  alt="ukaid"
                />
              </a>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
