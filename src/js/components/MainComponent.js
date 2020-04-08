/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { FullPage, Slide } from 'react-full-page';
// import ReactTooltip from 'react-tooltip';
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
      // width: '',
      // height: '',
      activeIndicator: [],
      activeDate: [],
      updateChart: false,
    };
  }

  handleOneTimeLayerChange = () => {
    this.setState({ activeLayer: 'Impact Indicator 1' });
  };

  handleIndicators = data => {
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
    this.setState({ updateChart: !this.state.updateChart });
    if (dateArray.indexOf(e) === -1) {
      dateArray.push(e);
    } else {
      dateArray = dateArray.filter(f => f !== e);
    }
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

  updateWindowDimensions = () => {
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
    document.getElementsByClassName(
      'banner',
    )[0].style.height = `${window.innerHeight}px`;
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
      activeIndicator,
      // statsData,
      // width,
      // height,
      activeLayer,
      dateRange,
      activeDate,
      updateChart,
    } = this.state;
    return (
      <FullPage>
        <Header />
        {/* <main
          className="main"
          ref={arg => {
            this.headRef = arg;
          }}
        > */}
        <Slide>
          <main className="main">
            <section
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
            </section>
          </main>
        </Slide>
        <Slide>
          <section className="content">
            <LeftSidebarMain
              activeDate={activeDate}
              handleActiveLayer={this.handleActiveLayer}
              handleActiveDate={this.handleActiveDate}
              dateRange={dateRange}
            />
            <MiddleChartSection
              activeLayer={activeLayer}
              activeDate={activeDate}
              updateChart={updateChart}
              handleOneTimeLayerChange={this.handleOneTimeLayerChange}
              getDateRange={this.getDateRange}
            />
          </section>

          {/* </main> */}

          <button
            type="button"
            className="scroll-top scroll-to-target open"
            data-target="html"
            onClick={this.handleArrowClick}
          >
            <i className="material-icons">arrow_upward</i>
          </button>
        </Slide>
      </FullPage>
    );
  }
}

export default MainComponent;
