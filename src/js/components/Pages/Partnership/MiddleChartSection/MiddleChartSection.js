import React, { Component } from 'react';
import { connect } from 'react-redux';
import DownloadIcon from '../../../../../img/get_app.png';
import ExpandIcon from '../../../../../img/open_in_full-black-18dp.png';
import Sunburst from '../Charts/SunBurst/SunBurst';
import sunBurstData from '../Charts/SunBurst/sunburstData';
import StackedBar from '../Charts/StackedBar/StackedBar';
import RadarChart from '../Charts/RadarChart/RadarChart';
import CirclePackChart from '../Charts/CirclePack/CirclePackChart';
import SankeyChart from '../Charts/SankeyChart/SankeyChart';

class MiddleChartSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      //   state: {},
      props: { activeView, activeOverview, sankeyChartwidth },
    } = this;
    const {
      partnershipReducer: { radialData },
    } = this.props;
    // console.log(radialData && radialData, 'radialData');
    return (
      <div
        className="literacy-tab-item"
        style={
          activeView === 'visualization'
            ? { display: 'block' }
            : { display: 'none' }
        }
      >
        <div className="graph-view">
          <div className="row">
            <div className="col-xl-6">
              <div className="card">
                <div className="card-header">
                  <h5>Investment focus zoomable sunburst</h5>
                  <div className="header-icons">
                    <div className="card-switcher">
                      <small>OFF</small>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                      <small>ON</small>
                    </div>
                    <span className="">
                      <img src={DownloadIcon} alt="open" />
                    </span>
                    <span className="zoom" popup-link="graph-modal">
                      <img src={ExpandIcon} alt="open" />
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  {radialData && radialData && (
                    <Sunburst
                      data={radialData}
                      width={500}
                      height={370}
                      count_member="size"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="card">
                <div className="card-header">
                  <h5>Stacked bar with Partner Type</h5>
                  <div className="header-icons">
                    <div className="card-switcher">
                      <small>OFF</small>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                      <small>ON</small>
                    </div>
                    <span className="">
                      <img src={DownloadIcon} alt="open" />
                    </span>
                    <span className="">
                      <img src={ExpandIcon} alt="open" />
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <StackedBar />
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="card">
                <div className="card-header">
                  <h5>Spider Net diagram</h5>
                  <div className="header-icons">
                    <div className="card-switcher">
                      <small>OFF</small>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                      <small>ON</small>
                    </div>
                    <span className="">
                      <img src={DownloadIcon} alt="open" />
                    </span>
                    <span className="zoom" popup-link="graph-modal">
                      <img src={ExpandIcon} alt="open" />
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <RadarChart />
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="card">
                <div className="card-header">
                  <h5>Zoomable Circle Packing</h5>
                  <div className="header-icons">
                    <div className="card-switcher">
                      <small>OFF</small>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                      <small>ON</small>
                    </div>
                    <span className="">
                      <img src={DownloadIcon} alt="open" />
                    </span>
                    <span className="">
                      <img src={ExpandIcon} alt="open" />
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <CirclePackChart />
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h5>Contribution of program initiatives</h5>
                  <div className="header-icons">
                    <div className="card-switcher">
                      <small>OFF</small>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                      <small>ON</small>
                    </div>
                    <span className="">
                      <img src={DownloadIcon} alt="open" />
                    </span>
                    <span className="">
                      <img src={ExpandIcon} alt="open" />
                    </span>
                  </div>
                </div>
                <div className="card-body" id="sankeyChart">
                  <SankeyChart
                    cardWidth={sankeyChartwidth}
                    activeOverview={activeOverview}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});
export default connect(mapStateToProps, {})(MiddleChartSection);
