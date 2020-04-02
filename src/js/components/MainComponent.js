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
      activeLayer: 'IMPACT INDICATOR 1',
      activeDate: [],
      updateChart: false,
    };
  }

  handleIndicators = data => {
    this.setState({ activeIndicator: data });
  };

  handleActiveLayer = clickedLayer => {
    this.setState({ activeLayer: clickedLayer });
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
  };

  render() {
    const {
      activeIndicator,
      statsData,
      activeLayer,
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
                {/* <ReactTooltip /> */}
                <p>
                  Revised Indicators as per the Budget Allocated to
                  the Access to Finance Programme, and Over Achieved
                  Indicators
                </p>
              </div>
              <div className="dashed" />
              <div className="banner-footer">
                <h5>ACCESS TO FINANCE FOR POOR (AFP) PROGRAMME </h5>
                <p>Based on Results from Implementation Phase</p>
                <h4>
                  <time>December 2014</time>
                  <span>to</span>
                  <time>December 2019</time>
                </h4>
              </div>
            </div>
          </section>
        </Slide>
        <Slide>
          <section className="content">
            <LeftSidebarMain
              handleActiveLayer={this.handleActiveLayer}
              handleActiveDate={this.handleActiveDate}
            />
            <MiddleChartSection
              activeLayer={activeLayer}
              activeDate={activeDate}
              updateChart={updateChart}
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
