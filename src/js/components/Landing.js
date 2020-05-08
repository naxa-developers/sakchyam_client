/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AutomationImg from '../../img/Automation.svg'
import BG from '../../img/BG.jpg';
import Main from '../../img/Main.png';
import GridImg from '../../img/grid-img.png';
import LoginIllustration from '../../img/Login-illustration.png';
import Footer from './Footer';
import Header from './Header';

let permissionObject={}
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissions: []
    };
  }

  handleTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  componentDidMount() {
    const today= localStorage.getItem('loginTime')
    const currentTime = new Date().valueOf();
    console.log(currentTime,'cuirren  ')
    const expireTime= localStorage.getItem('expirationTime')
    console.log(Date.parse(expireTime),'expireTime  ')
    console.log(currentTime <= expireTime && expireTime.valueOf());
    if (currentTime >= Date.parse(expireTime)) {
      // console.log('correct');
      localStorage.removeItem('userToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('loginTime');
      localStorage.removeItem('expirationTime');
      localStorage.removeItem('userPermission');
            window.location.reload()

    } else {
      // alert('else')
     
      // window.location.reload()
      // console.log('incorrect');
    }
    const permissionData = localStorage.getItem('userPermission');
    permissionObject= JSON.parse(permissionData)
    this.setState({permissions: permissionObject})
    // console.log(permissionObject,'permission');
    this.updateWindowDimensions();

    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    // var $header = $('.main-header');
    // var $footer = $('.main-footer');
    // var $content = $('.main');
    // var $banner=$(window).height() - $header.height();
    // var height = $(window).height() - $header.height() + $footer.height();
    
    // const $header = document.getElementsByClassName('main-header')[0];
    // const $footer = document.getElementsByClassName('main-footer')[0];
    // const $content = document.getElementsByClassName('main')[0];
    // const $banner = window.innerHeight - $header.offsetHeight;
    // const height = window.innerHeight - $header.offsetHeight;
    // // const height = window.innerHeight - $header.offsetHeight + $footer.offsetHeight;
    // console.log($banner,'banner height')
    // console.log(height,' height')
    // $content.style.minHeight= height
    // console.log(window.innerHeight,'window height')
    // console.log($header.offsetHeight,'header height')
    // console.log(screen.height, 'screen');
    // console.log(window.innerHeight, 'windowheight');

    // if (window.innerHeight === screen.height) {
    //   const loginWrapper = document.getElementsByClassName(
    //     'banner',
    //   )[0];
    //   // loginWrapper.style.height = `${screen.height}px`;
    //   loginWrapper.style.height = `${window.innerHeight}px`;
    // } else {
    //   const loginWrapper = document.getElementsByClassName(
    //     'banner',
    //   )[0];
    //   loginWrapper.style.height = `${screen.height}px`;
    // }
  };

  render() {
    const {permissions}=this.state;
    return (
      <>
        <Header headerTransparent disableScroll />
        <section className="banner">
          <div className="banner_content" style={{ backgroundImage: `url(${BG})` }}> 
            
            <div className="container">
              <div className="banner-header">
                <h1 className="banner-title">
                  Welcome
                  <span className="small"> To</span>
                  <br />
                  {' '}
                  Data Visualization Port 
                  {' '}
                  <span className="abbr">(DVP)</span>
                </h1>
                <p className="span_book_18">A Small Leap towards Application of Open Data on Aid and Budget in Nepal.</p>
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
              <p className="span_book_18">Amazing tools for all your data solution.</p>
            </div>

            <div className="content-tools">
              <div className="tools-list">
                <div className="row no-gutters rw-mod">
                  <div className=" col-lg-3 col-md-4 col-sm-6 col-xs-12 cl-md">
                    <div className="tools-intro">
                      <div className="info">
                        <h4>Sakchyam Partnerships</h4>
                        <p className="span_book_15">Revised Indicators as per the Budget Allocated to the Access to Finance Programme, and Over Achieved Indicators</p>
                        <ul className="lists">
                          <li className="span_heavy_15">Partner Organisation</li>
                          <li className="span_heavy_15">Project Intervention</li>  
                          <li className="span_heavy_15">Outreach Beneficiaries</li>
                          <li className="span_heavy_15">
                            <span>and</span>
                            {' '}
                            Benefits
                          </li>
                        </ul>
                      </div>
                      {permissions && permissions[0] && permissions[0].permission.includes("") ?
                        <Link to="/automation"><button type="button" className="access_button"><span className="span_heavy_15">View</span></button></Link>
                        :
                        permissions && permissions[0] && permissions[0].email 
                        ? 
                          <>
                            <button type="button" className="deny_button"><span className="span_heavy_15">No Access</span></button>
                            <a href="#/" className="span_book_14">
                              You dont have permission to get an access!
                            </a>
                          </> 
                          :null}
                      {permissions && permissions[0] && permissions[0].email ?
                       null : 
                       <>
                         <Link to="/login"><button type="button" className="deny_button"><span className="span_heavy_15">No Access</span></button></Link>
                         <Link to="/login" className="span_book_14">
                           <span className="view">Log in</span>
                           to get an access!
                         </Link>
                       </>}
                      <img className="grid-img" src={GridImg} alt="" />
                    </div>
                  </div>

                  <div className=" col-lg-3 col-md-4 col-sm-6 col-xs-12 cl-md cl-md">
                    <div className="tools-intro">
                      <div className="info">
                        <h4>Logical Framework</h4>
                        <p className="span_book_15">Revised Indicators as per the Budget Allocated to the Access to Finance Programme, and Over Achieved Indicators</p>
                        <ul className="lists">
                          <li className="span_heavy_15">Impact</li>
                          <li className="span_heavy_15">outcome</li>  
                          <li className="span_heavy_15">output</li>
                        </ul>                        
                      </div>
                      {permissions && permissions[0] && permissions[0].permission.includes("view_logentry") ?
                        <Link to="/logframe"><button type="button" className="access_button"><span className="span_heavy_15">View</span></button></Link>
                        :
                        permissions && permissions[0] && permissions[0].email 
                        ? 
                          <>
                            <button type="button" className="deny_button"><span className="span_heavy_15">No Access</span></button>
                            <a href="#/" className="span_book_14">
                              You dont have permission to get an access!
                            </a>
                          </> 
                          :null}
                      {permissions && permissions[0] && permissions[0].email ?
                       null : 
                       <>
                         <Link to="/login"><button type="button" className="deny_button"><span className="span_heavy_15">No Access</span></button></Link>
                         <Link to="/login" className="span_book_14">
                           <span className="view">Log in</span>
                           to get an access!
                         </Link>
                       </>}
                      <img className="grid-img" src={GridImg} alt="" />
                    </div>
                  </div>

                  <div className=" col-lg-3 col-md-4 col-sm-6 col-xs-12 cl-md">
                    <div className="tools-intro">
                      <div className="info">
                        <h4>Automation</h4>
                        <p className="span_book_15">Revised Indicators as per the Budget Allocated to the Access to Finance Programme, and Over Achieved Indicators</p>
                        <ul className="lists">
                          <li className="span_heavy_15">Partner Organisation</li>
                          <li className="span_heavy_15">Project Intervention</li>  
                          <li className="span_heavy_15">Outreach Beneficiaries</li>
                          <li className="span_heavy_15">
                            <span>and</span>
                            {' '}
                            Benefits
                          </li>
                        </ul>                    
                      </div>
                      {permissions && permissions[0] && permissions[0].permission.includes("") ?
                        <Link to="/automation"><button type="button" className="access_button"><span className="span_heavy_15">View</span></button></Link>
                        :
                        permissions && permissions[0] && permissions[0].email 
                        ? 
                          <>
                            <button type="button" className="deny_button"><span className="span_heavy_15">No Access</span></button>
                            <a href="#/" className="span_book_14">
                              You dont have permission to get an access!
                            </a>
                          </> 
                          :null}
                      {permissions && permissions[0] && permissions[0].email ?
                       null : 
                       <>
                         <Link to="/login"><button type="button" className="deny_button"><span className="span_heavy_15">No Access</span></button></Link>
                         <Link to="/login" className="span_book_14">
                           <span className="view">Log in</span>
                           to get an access!
                         </Link>
                       </>}
                      <img className="grid-img" src={AutomationImg} alt="" />
                    </div>
                  </div>

                  <div className=" col-lg-3 col-md-4 col-sm-6 col-xs-12 cl-md">
                    <div className="tools-intro">
                      <div className="info">
                        <h4>Product/Process Innovations</h4>
                        <p className="span_book_15">Revised Indicators as per the Budget Allocated to the Access to Finance Programme, and Over Achieved Indicators</p>
                        <ul className="lists">
                          <li className="span_heavy_15">Partner Organisation</li>
                          <li className="span_heavy_15">Project Intervention</li>  
                          <li className="span_heavy_15">Outreach Beneficiaries</li>
                          <li className="span_heavy_15">
                            <span>and</span>
                            {' '}
                            Benefits
                          </li>
                        </ul>                        
                      </div>
                      {permissions && permissions[0] && permissions[0].permission.includes("") ?
                        <Link to="/automation"><button type="button" className="access_button"><span className="span_heavy_15">View</span></button></Link>
                        :
                        permissions && permissions[0] && permissions[0].email 
                        ? 
                          <>
                            <button type="button" className="deny_button"><span className="span_heavy_15">No Access</span></button>
                            <a href="#/" className="span_book_14">
                              You dont have permission to get an access!
                            </a>
                          </> 
                          :null}
                      {permissions && permissions[0] && permissions[0].email ?
                       null : 
                       <>
                         <Link to="/login"><button type="button" className="deny_button"><span className="span_heavy_15">No Access</span></button></Link>
                         <Link to="/login" className="span_book_14">
                           <span className="view">Log in</span>
                           to get an access!
                         </Link>
                       </>}
                      <img className="grid-img" src={GridImg} alt="" />
                    </div>
                  </div>
                  <div className=" col-lg-3 col-md-4 col-sm-6 col-xs-12 cl-md">
                    <div className="tools-intro">
                      <div className="info">
                        <h4>Payment Systems</h4>
                        <p className="span_book_15">Revised Indicators as per the Budget Allocated to the Access to Finance Programme, and Over Achieved Indicators</p>
                        <ul className="lists">
                          <li className="span_heavy_15">Partner Organisation</li>
                          <li className="span_heavy_15">Project Intervention</li>  
                          <li className="span_heavy_15">Outreach Beneficiaries</li>
                          <li className="span_heavy_15">
                            <span>and</span>
                            Benefits
                          </li>
                        </ul>
                      </div>
                      {permissions && permissions[0] && permissions[0].permission.includes("") ?
                        <Link to="/automation"><button type="button" className="access_button"><span className="span_heavy_15">View</span></button></Link>
                        :
                        permissions && permissions[0] && permissions[0].email 
                        ? 
                          <>
                            <button type="button" className="deny_button"><span className="span_heavy_15">No Access</span></button>
                            <a href="#/" className="span_book_14">
                              You dont have permission to get an access!
                            </a>
                          </> 
                          :null}
                      {permissions && permissions[0] && permissions[0].email ?
                       null : 
                       <>
                         <Link to="/login"><button type="button" className="deny_button"><span className="span_heavy_15">No Access</span></button></Link>
                         <Link to="/login" className="span_book_14">
                           <span className="view">Log in</span>
                           to get an access!
                         </Link>
                       </>}
                      <img className="grid-img" src={GridImg} alt="" />
                    </div>
                  </div>
                            
                  <div className=" col-lg-3 col-md-4 col-sm-6 col-xs-12 cl-md">
                    <div className="tools-intro">
                      <div className="info">
                        <h4>MFS</h4>
                        <p className="span_book_15">Revised Indicators as per the Budget Allocated to the Access to Finance Programme, and Over Achieved Indicators</p>
                        <ul className="lists">
                          <li className="span_heavy_15">Impact</li>
                          <li className="span_heavy_15">Outcome</li>  
                          <li className="span_heavy_15">Output</li>
                        </ul>
                      </div>
                      {permissions && permissions[0] && permissions[0].permission.includes("") ?
                        <Link to="/automation"><button type="button" className="access_button"><span className="span_heavy_15">View</span></button></Link>
                        :
                        permissions && permissions[0] && permissions[0].email 
                        ? 
                          <>
                            <button type="button" className="deny_button"><span className="span_heavy_15">No Access</span></button>
                            <a href="#/" className="span_book_14">
                              You dont have permission to get an access!
                            </a>
                          </> 
                          :null}
                      {permissions && permissions[0] && permissions[0].email ?
                       null : 
                       <>
                         <Link to="/login"><button type="button" className="deny_button"><span className="span_heavy_15">No Access</span></button></Link>
                         <Link to="/login" className="span_book_14">
                           <span className="view">Log in</span>
                           to get an access!
                         </Link>
                       </>}
                      <img className="grid-img" src={GridImg} alt="" />
                    </div>
                  </div>

                  <div className=" col-lg-3 col-md-4 col-sm-6 col-xs-12 cl-md">
                    <div className="tools-intro">
                      <div className="info">
                        <h4>Financial Literacy Initiatives</h4>
                        <p className="span_book_15">Revised Indicators as per the Budget Allocated to the Access to Finance Programme, and Over Achieved Indicators</p>
                        <ul className="lists">
                          <li className="span_heavy_15">Partner Organisation</li>
                          <li className="span_heavy_15">Project Intervention</li>  
                          <li className="span_heavy_15">Outreach Beneficiaries</li>
                          <li className="span_heavy_15">
                            <span>and</span>
                            {' '}
                            Benefits
                          </li>
                        </ul>
                      </div>
                      {permissions && permissions[0] && permissions[0].permission.includes("") ?
                        <Link to="/automation"><button type="button" className="access_button"><span className="span_heavy_15">View</span></button></Link>
                        :
                        permissions && permissions[0] && permissions[0].email 
                        ? 
                          <>
                            <button type="button" className="deny_button"><span className="span_heavy_15">No Access</span></button>
                            <a href="#/" className="span_book_14">
                              You dont have permission to get an access!
                            </a>
                          </> 
                          :null}
                      {permissions && permissions[0] && permissions[0].email ?
                       null : 
                       <>
                         <Link to="/login"><button type="button" className="deny_button"><span className="span_heavy_15">No Access</span></button></Link>
                         <Link to="/login" className="span_book_14">
                           <span className="view">Log in</span>
                           to get an access!
                         </Link>
                       </>}
                      <img className="grid-img" src={GridImg} alt="" />
                    </div>
                  </div>

                  <div className=" col-lg-3 col-md-4 col-sm-6 col-xs-12 cl-md">
                    <div className="tools-intro">
                      <div className="info">
                        <h4>Outreach Expansion</h4>
                        <p className="span_book_15">Revised Indicators as per the Budget Allocated to the Access to Finance Programme, and Over Achieved Indicators</p>
                        <ul className="lists">
                          <li className="span_heavy_15">Partner Organisation</li>
                          <li className="span_heavy_15">Project Intervention</li>  
                          <li className="span_heavy_15">Outreach Beneficiaries</li>
                          <li className="span_heavy_15">
                            <span>and</span>
                            {' '}
                            Benefits
                          </li>
                        </ul>
                      </div>
                      {permissions && permissions[0] && permissions[0].permission.includes("") ?
                        <Link to="/automation"><button type="button" className="access_button"><span className="span_heavy_15">View</span></button></Link>
                        :
                        permissions && permissions[0] && permissions[0].email 
                        ? 
                          <>
                            <button type="button" className="deny_button"><span className="span_heavy_15">No Access</span></button>
                            <a href="#/" className="span_book_14">
                              You dont have permission to get an access!
                            </a>
                          </> 
                          :null}
                      {permissions && permissions[0] && permissions[0].email ?
                       null : 
                       <>
                         <Link to="/login"><button type="button" className="deny_button"><span className="span_heavy_15">No Access</span></button></Link>
                         <Link to="/login" className="span_book_14">
                           <span className="view">Log in</span>
                           to get an access!
                         </Link>
                       </>}
                      <img className="grid-img" src={GridImg} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="data-portals">
              {permissions && permissions[0] && permissions[0].email ? 
                <>
                  <h2>Ready to explore data</h2>
                  <p className="span_book_18">Amazing tools for all your data solution.</p>
                </> : 
                <>
                  <h2>Ready to explore data?</h2>
                  <p className="span_book_18">Amazing tools for all your data solution.</p>
                  <Link to="/login"><button type="button"><a className="span_heavy_15">Explore</a></button></Link>
                </>}
              
              {/* <Link to="/login"><button type="button"><a className="span_heavy_15">Explore</a></button></Link> */}
              <img src={LoginIllustration} alt="" className="data-sidebg" />
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
