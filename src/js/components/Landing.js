/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AutomationImg from '../../img/Automation.svg';
import BG from '../../img/BG.jpg';
import Main from '../../img/Main.png';
import GridImg from '../../img/grid-img.png';
import LoginIllustration from '../../img/Login-illustration.png';
import Footer from './Footer';
import Header from './Header';
import LandingCard from './common/LandingCard';

let permissionObject = {};
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissions: [],
    };
  }

  handleTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  componentDidMount() {
    // console.log(process.env.PLATFORM,'env');
    const today = localStorage.getItem('loginTime');
    const currentTime = new Date().valueOf();
    // console.log(currentTime,'cuirren  ')
    const expireTime = localStorage.getItem('expirationTime');
    // console.log(Date.parse(expireTime),'expireTime  ')
    // console.log(currentTime <= expireTime && expireTime.valueOf());
    if (currentTime >= Date.parse(expireTime)) {
      // console.log('correct');
      localStorage.removeItem('userToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('loginTime');
      localStorage.removeItem('expirationTime');
      localStorage.removeItem('userPermission');
      window.location.reload();
    } else {
      // alert('else')
      // window.location.reload()
      // console.log('incorrect');
    }
    const permissionData = localStorage.getItem('userPermission');
    permissionObject = JSON.parse(permissionData);
    this.setState({ permissions: permissionObject });
    console.log(permissionObject, '======permission');
    this.updateWindowDimensions();

    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {};

  render() {
    const { permissions } = this.state;
    return (
      <>
        <Header headerTransparent disableScroll />
        <section className="banner">
          <div
            className="banner_content"
            style={{ backgroundImage: `url(${BG})` }}
          >
            <div className="container">
              <div className="banner-header">
                <h1 className="banner-title">
                  Welcome
                  <span className="small"> To</span>
                  <br /> Data Visualization Port{' '}
                  <span className="abbr">(DVP)</span>
                </h1>
                <p className="span_book_18">
                  A Small Leap towards Application of Open Data on Aid
                  and Budget in Nepal.
                </p>
              </div>
              <figure className="banner-image">
                <img src={Main} alt="laptop-img-banner" />
              </figure>
            </div>
            <div className="bottom-border-block" />
          </div>
        </section>

        <section className="home-content">
          <div className="container-fluid">
            <div className="content-title">
              <h2>Visualisation Structures</h2>
              <p className="span_book_18">
                Amazing tools for all your data solution.
              </p>
            </div>

            <div className="content-tools">
              <div className="tools-list">
                <div className="row no-gutters rw-mod">
                  <LandingCard
                    cardClass="col-lg-3 col-md-4 col-sm-6 col-xs-12 cl-md"
                    cardTitle="Sakchyam Partnerships"
                    cardDescription="Revised Indicators as per the Budget Allocated to the Access to Finance Programme, and Over Achieved Indicators"
                    cardLists={[
                      'Partner Organisation',
                      'Project Intervention',
                      'Outreach Beneficiaries & Benefits',
                    ]}
                    permissions={permissions}
                    cardUrl="/partnership"
                    cardPermission="view_logentry"
                    cardImage={GridImg}
                  />
                  <LandingCard
                    cardClass="col-lg-3 col-md-4 col-sm-6 col-xs-12 cl-md"
                    cardTitle="Logical Framework"
                    cardDescription="Revised Indicators as per the Budget Allocated to the Access to Finance Programme, and Over Achieved Indicators"
                    cardLists={['Impact', 'Outcome', 'Output']}
                    permissions={permissions}
                    cardUrl="/logframe"
                    cardPermission="view_logentry"
                    cardImage={GridImg}
                  />
                  <LandingCard
                    cardClass="col-lg-3 col-md-4 col-sm-6 col-xs-12 cl-md"
                    cardTitle="Automation"
                    cardDescription="Revised Indicators as per the Budget Allocated to the Access to Finance Programme, and Over Achieved Indicators"
                    cardLists={[
                      'Partner Organisation',
                      'Automation Outreach',
                      'Tablet Deployed',
                      'Automation Benefits',
                    ]}
                    permissions={permissions}
                    cardUrl="/automation"
                    cardPermission="view_automation"
                    cardImage={AutomationImg}
                  />
                  <LandingCard
                    cardClass="col-lg-3 col-md-4 col-sm-6 col-xs-12 cl-md"
                    cardTitle="Product/Process Innovations"
                    cardDescription="Revised Indicators as per the Budget Allocated to the Access to Finance Programme, and Over Achieved Indicators"
                    cardLists={[
                      'Partner Organisation',
                      'Automation Outreach',
                      'Tablet Deployed',
                      'Automation Benefits',
                    ]}
                    permissions={permissions}
                    cardUrl="/productprocess"
                    cardPermission="view_automation"
                    cardImage={GridImg}
                  />
                  <LandingCard
                    cardClass="col-lg-3 col-md-4 col-sm-6 col-xs-12 cl-md"
                    cardTitle="Payment Systems"
                    cardDescription="Revised Indicators as per the Budget Allocated to the Access to Finance Programme, and Over Achieved Indicators"
                    cardLists={[
                      'Partner Organisation',
                      'Automation Outreach',
                      'Tablet Deployed',
                      'Automation Benefits',
                    ]}
                    permissions={permissions}
                    cardUrl="/paymentsystems"
                    cardPermission="view_automation"
                    cardImage={GridImg}
                  />
                  <LandingCard
                    cardClass="col-lg-3 col-md-4 col-sm-6 col-xs-12 cl-md"
                    cardTitle="MFS"
                    cardDescription="Revised Indicators as per the Budget Allocated to the Access to Finance Programme, and Over Achieved Indicators"
                    cardLists={[
                      'Partner Organisation',
                      'Automation Outreach',
                      'Tablet Deployed',
                      'Automation Benefits',
                    ]}
                    permissions={permissions}
                    cardUrl="/mfs"
                    cardPermission="view_automation"
                    cardImage={GridImg}
                  />
                  <LandingCard
                    cardClass="col-lg-3 col-md-4 col-sm-6 col-xs-12 cl-md"
                    cardTitle="Financial Literacy Initiatives"
                    cardDescription="Revised Indicators as per the Budget Allocated to the Access to Finance Programme, and Over Achieved Indicators"
                    cardLists={[
                      'Partner Organisation',
                      'Automation Outreach',
                      'Tablet Deployed',
                      'Automation Benefits',
                    ]}
                    permissions={permissions}
                    cardUrl="/financial"
                    cardPermission="view_automation"
                    cardImage={GridImg}
                  />
                  <LandingCard
                    cardClass="col-lg-3 col-md-4 col-sm-6 col-xs-12 cl-md"
                    cardTitle="Outreach Expansion"
                    cardDescription="Revised Indicators as per the Budget Allocated to the Access to Finance Programme, and Over Achieved Indicators"
                    cardLists={[
                      'Partner Organisation',
                      'Automation Outreach',
                      'Tablet Deployed',
                      'Automation Benefits',
                    ]}
                    permissions={permissions}
                    cardUrl="/outreachexpansion"
                    cardPermission="view_logentry"
                    cardImage={GridImg}
                  />
                  <LandingCard
                    cardClass="col-lg-3 col-md-4 col-sm-6 col-xs-12 cl-md"
                    cardTitle="Insurance"
                    cardDescription="Revised Indicators as per the Budget Allocated to the Access to Finance Programme, and Over Achieved Indicators"
                    cardLists={[
                      'Partner Organisation',
                      'Automation Outreach',
                      'Tablet Deployed',
                      'Automation Benefits',
                    ]}
                    permissions={permissions}
                    cardUrl="/insurance"
                    cardPermission="view_logentry"
                    cardImage={GridImg}
                  />
                </div>
              </div>
            </div>

            <div className="data-portals">
              {permissions &&
              permissions[0] &&
              permissions[0].email ? (
                <>
                  <h2>Ready to explore data</h2>
                  <p className="span_book_18">
                    Amazing tools for all your data solution.
                  </p>
                </>
              ) : (
                <>
                  <h2>Ready to explore data?</h2>
                  <p className="span_book_18">
                    Amazing tools for all your data solution.
                  </p>
                  <Link to="/login">
                    <button type="button">
                      <a className="span_heavy_15">Explore</a>
                    </button>
                  </Link>
                </>
              )}

              {/* <Link to="/login"><button type="button"><a className="span_heavy_15">Explore</a></button></Link> */}
              <img
                src={LoginIllustration}
                alt=""
                className="data-sidebg"
              />
            </div>
          </div>
        </section>
        <button
          type="button"
          className="scroll-top scroll-to-target open"
          data-target="html"
          onClick={this.handleTopClick}
        >
          <i className="material-icons">arrow_upward</i>
        </button>
        <Footer />
      </>
    );
  }
}

export default Landing;
