/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BG from '../../img/BG.jpg';
import Main from '../../img/Main.png';
import GridImg from '../../img/grid-img.png';
import LoginIllustration from '../../img/Login-illustration.png';
import Footer from './Footer';
import Header from './Header';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  componentDidMount() {
    this.updateWindowDimensions();

    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    // console.log(screen.height, 'screen');
    // console.log(window.innerHeight, 'windowheight');
    if (window.innerHeight === screen.height) {
      const loginWrapper = document.getElementsByClassName(
        'banner',
      )[0];
      // loginWrapper.style.height = `${screen.height}px`;
      loginWrapper.style.height = `${window.innerHeight}px`;
    } else {
      const loginWrapper = document.getElementsByClassName(
        'banner',
      )[0];
      loginWrapper.style.height = `${screen.height}px`;
    }
  };

  render() {
    return (
      <>
        <Header headerTransparent />
        <section className="banner">
          <div className="banner_content" style={{ backgroundImage: `url(${BG})` }}> 
            <div className="banner-header">
              <h1 className="banner-title">
                Welcome
                <span className="small">to</span>
                <br />
                {' '}
                Data Visualization Tool 
                {' '}
                <span className="abbr">(DVT)</span>
              </h1>
              <p className="span_book_18">A Small Leap towards Application of Open Data on Aid and Budget in Nepal.</p>
            </div>
            
            <div className="banner-image"> 
              <img src={Main} alt="laptop-img-banner" /> 
            </div> 
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
                      <button type="button" className="deny_button"><span className="span_heavy_15">No Access</span></button>
                      <a href="#/" className="span_book_14">
                        <span>Log in</span>
                        {' '}
                        to get an access!
                      </a>
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
                      <Link to="/logframe"><button type="button" className="access_button"><span className="span_heavy_15">View</span></button></Link>
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
                      <a href="index.html"><button type="button" className="access_button"><span className="span_heavy_15">View</span></button></a>
                      <img className="grid-img" src={GridImg} alt="" />
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
                      <button type="button" className="deny_button"><span className="span_heavy_15">No Access</span></button>
                      <a href="#/" className="span_book_14">
                        <span>Log in</span>
                        {' '}
                        to get an access!
                      </a>
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
                      <a href="index.html"><button type="button" className="access_button"><span className="span_heavy_15">View</span></button></a>
                      <a href="#/" className="span_book_14">
                        <span>Log in</span>
                        {' '}
                        to get an access!
                      </a>
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
                      <button type="button" className="deny_button"><span className="span_heavy_15">View</span></button>
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
                      <a href="index.html"><button type="button" className="access_button"><span className="span_heavy_15">View</span></button></a>
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
                      <a href="index.html"><button type="button" className="access_button"><span className="span_heavy_15">View</span></button></a>
                      <a href="#/" className="span_book_14">
                        <span>Log in</span>
                        {' '}
                        to get an access!
                      </a>
                      <img className="grid-img" src={GridImg} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="data-portals">
              <h2>Ready to explore data?</h2>
              <p className="span_book_18">Amazing tools for all your data solution.</p>
              <button type="button"><a className="span_heavy_15">Explore</a></button>
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
