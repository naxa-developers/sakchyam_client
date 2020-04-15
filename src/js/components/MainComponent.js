import React, { Component } from 'react';
import { FullPage, Slide } from 'react-full-page';
import Background from '../../img/banner.png';

import Header from './Header';
import LeftSidebarMain from './LefSideBar/LeftSideBarMain';

import MiddleChartSection from './MiddleChartSection/MiddleChartSection';

let dateArray = [];
class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLayer: '',
      dateRange: [],
      activeModal: 'false',
      // width: '',
      // height: '',
      activeIndicator: [],
      activeDate: [],
      updateChart: false,
    };
  }

  handleOneTimeLayerChange = () => {
    console.log('clicked');
    this.setState({ activeLayer: 'Impact Indicator 1' });
  };

  handleIndicators = data => {
    const { activeIndicator } = this.state;
    this.setState({ activeIndicator: data });
  };

  handleActiveLayer = clickedLayer => {
    this.setState({ activeLayer: clickedLayer });
  };

  getDateRange = totalDateRange => {
    this.setState({ dateRange: totalDateRange });
  };

  handleActiveDate = e => {
    // push uniques
    const { updateChart } = this.state;
    this.setState({ updateChart: !updateChart });
    if (dateArray.indexOf(e) === -1) {
      dateArray.push(e);
    } else {
      dateArray = dateArray.filter(f => f !== e);
    }
    dateArray.sort();
    this.setState({
      activeDate: dateArray,
    });
    // this.setState({ activeDate: e });
  };

  handleArrowClick = () => {
    window.scrollTo(0, this.headRef.current);
    window.scrollTo({
      top: this.headRef.current,
      left: 0,
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

  handleModal = () => {
    console.log('statemodal', this.state.activeModal);
    this.setState(prevState => ({
      activeModal: !prevState.activeModal,
    }));
    const bodyEl = document.getElementById('body');
    if (this.state.activeModal === false) {
      bodyEl.className = 'modal-open';
    } else {
      bodyEl.className = '';
    }
  };

  updateWindowDimensions = () => {
    console.log(screen.height, 'screen');
    console.log(window.height, 'windowheight');
    // this.setState({
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    // });
    // console.log(window.innerWidth, 'width');
    // console.log(window.innerHeight, 'height');
    // console.log(
    //   (document.getElementsByClassName(
    //     'banner',
    //   )[0].style.height = `${window.innerHeight + 200}px`),
    // );
    // document.getElementsByClassName(
    //   'banner',
    // )[0].style.height = `${window.innerHeight}px`;
    // const header = document.getElementsByClassName('main-header');
    // const footer = document.getElementsByClassName('main-footer');
    // const content = document.getElementsByClassName('main');
    // const banner = window.innerHeight - header[0].offsetHeight;
    // console.log(banner, 'banner');
    // console.log(footer, 'footer');
    // const height = window.innerHeight - header[0].offsetHeight;
    // content[0].style.minHeight = banner;
    // console.log(
    //   (document.getElementsByClassName(
    //     'banner-content',
    //   )[0].style.minHeight = banner),
    //   'banner-content',
    // );
    // console.log(height, 'height');
  };

  render() {
    const {
      // activeIndicator,
      // statsData,
      // width,
      // height,
      activeLayer,
      dateRange,
      activeDate,
      activeModal,
      updateChart,
    } = this.state;
    return (
      <>
        <Header />
        {/* <main
          className="main"
          ref={arg => {
            this.headRef = arg;
          }}
        > */}
        <main className="main">
          {/* <section
            ref={arg => {
              this.headRef = arg;
            }}
            className="banner"
            id="banner"
            style={{
              backgroundImage: `url(${Background})`,
            }}
          >
            <div className="banner-content">
              <div className="banner-header">
                <h1>
                  Sakchyam Access
                  <span> to</span>
                  <br />
                  Finance Programme Logical Framework
                </h1>
                <h3 className="h3-white">
                  Revised Indicators as per the Budget Allocated to
                  the Access to Finance Programme, and Over Achieved
                  Indicators
                </h3>
              </div>
              <div className="dashed" />
              <div className="banner-footer">
                <h4>ACCESS TO FINANCE FOR POOR (AFP) PROGRAMME </h4>
                <span className="span_book_15">
                  Based on Results from Implementation Phase
                </span>
                <p className="span_black_15">
                  <time>December 2014</time>
                  <span className="span_book_15"> to </span>
                  <time>December 2019</time>
                </p>
              </div>
            </div>
          </section> */}

          <section className="content content-mod">
            <div
              className={`modal fade modal-wrapper ${
                activeModal === true ? 'show' : ''
              }`}
              style={
                activeModal === true
                  ? { display: 'block' }
                  : { display: 'none' }
              }
              id="exampleModalCenter"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-modal="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content modal-container">
                  <div className="popup-block" id="popup">
                    <div className="popup-container">
                      <div className="popup-content">
                        <span
                          className="close"
                          label="close"
                          role="button"
                          tabIndex="0"
                          onClick={this.handleModal}
                          onKeyDown={this.handleModal}
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                        />
                        <span className="important" />
                        <p className="span_book_15">
                          Income increase is derived from loan
                          disbursed to beneficiaries by the partner
                          BFIs considering that income increases by
                          £0.24 per £1 loan borrowed by the
                          beneficiaries (based on Sakchyam Mid-term
                          Evaluation Survey 2019 findings).By
                          investing the principal borrowed in
                          agriculture and non-agricultural economic
                          activities/MSMEs, beneficiaries realize a
                          24% net increase in income. Loan fund
                          disbursed by partner BFIs to target group is
                          one of the key indicators for monitoring.
                          Increased income at beneficiaries level is
                          directly dependent on the loan disbursed to
                          the beneficiaries for the productive
                          investment. Sakchyam encourages partners to
                          disburse more loans to productive sectors
                          both in terms of number of beneficiaries,
                          volume of loan including encouragment and
                          support to design and implement appropriate
                          loan product (s), promote financial literacy
                          and provide enterprise related trainings to
                          help increase demand for loan and
                          investment. Saving generates some interest
                          (different rate) as well as funds for
                          investment that attribute to increase in
                          income. Furthermore, the actual attribution
                          measurement of income increased will be
                          measured at the end-line surveys.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <LeftSidebarMain
              activeDate={activeDate}
              activeLayer={activeLayer}
              handleActiveLayer={this.handleActiveLayer}
            />
            <MiddleChartSection
              activeLayer={activeLayer}
              activeDate={activeDate}
              updateChart={updateChart}
              handleOneTimeLayerChange={this.handleOneTimeLayerChange}
              getDateRange={this.getDateRange}
              handleActiveDate={this.handleActiveDate}
              dateRange={dateRange}
              handleModal={this.handleModal}
            />
          </section>
        </main>
        {/* </main> */}

        {/* <button
          type="button"
          className="scroll-top scroll-to-target open"
          data-target="html"
          onClick={this.handleArrowClick}
        >
          <i className="material-icons">arrow_upward</i>
        </button> */}
      </>
    );
  }
}

export default MainComponent;
