/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LogoWhite from '../../img/logo-white.png';
import LogoIllustration from '../../img/Login-illustration.png';
import SakLogo from '../../img/saklogo.png';
import UkAid from '../../img/ukaid.png';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
      this.updateWindowDimensions();
  
      window.addEventListener('resize', this.updateWindowDimensions);
    }
  
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }
  
    updateWindowDimensions = () => {
      console.log(screen.height, 'screen');
      console.log(window.innerHeight, 'windowheight');
      if (window.innerHeight === screen.height) {
        const loginWrapper = document.getElementsByClassName(
          'login-wrapper',
        )[0];
        loginWrapper.style.height = `${screen.height}px`;
        console.log(loginWrapper, 'if loginwrapper');
  
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
        console.log('else loginwrapper');
  
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
        return ( 
          <div className="login-page login-reset-page">
            <div className="container-fluid p-0">
              <div className="login-wrapper">
                <aside className="login-sidebar">
                  <div className="login">
                    <div className="login-header">
                      <div className="logo"><Link to="/login"><img src={LogoWhite} alt="Louis Berger" /></Link></div>
                      <div className="title">
                        <h2>
                          Welcome
                          <span>to</span>
                          <br />
                          {' '}
                          Data Visualization Port (DVP)
                        </h2>
                        <span className="span_heavy_15">A Small Leap towards Application of Open Data on Aid and Budget in Nepal.</span>
                      </div>
                    </div>
                    <div className="login-body">
                      <div className="image-content">
                        <img src={LogoIllustration} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="login-footer">
                    <span className="span_book_14">© 2020 Sakchyam. All rights reserved.</span>
                    <span className="span_book_14">
                      Privacy
                      <span className="border-span">|</span>
                      Terms of Service
                    </span>
                  </div>
                   
                </aside>

                <main className="main-section">
                  <a label="backwardlogin" href="login.html" className="backward-login"> </a>
                  <div className="login-content reset-content">
                    <div className="login-header">
                      <h2>Can’t log in?</h2>
                      <span className="span_book_15">Restore access to your account</span>
                    </div>

                    <form className="login-form">
                      <div className="form-group">
                        <label htmlFor="inputEmail" className="span_heavy_15">We’ll send a recovery link to</label>
                        <input type="text" className="form-control span_book_15" id="inputEmail" placeholder="Your email address" />
                      </div>

                      <div className="btn-wrap">
                        <button type="submit"><a href="index.html" className="span_heavy_15">Reset password</a></button>
                      </div>
                    </form>
                  </div>
                    
                  <div className="login-footer reset-footer">
                    <img src={SakLogo} alt="sakchyam_logo" />
                    <img src={UkAid} alt="UKaid_logo" />
                  </div>
                </main>
              </div>
            </div>
          </div>
         );
    }
}
 
export default ChangePassword;