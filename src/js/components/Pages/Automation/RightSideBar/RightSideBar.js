import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import MapComponent from '../MapComponent/MapComponent';

class RightSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { automationReducer } = this.props;
    const {
      tabletsDeployed,
      branchesCountOptions,
      areaChartOptions,
      toggleRightSideBarButton,
      toggleTableViewButton,
      activeRightSideBar,
    } = this.props;
    // console.log(automationReducer, 'autpo');
    const { partnersData } = this.props;
    return (
      <aside className="sidebar right-sidebar">
        <div className="sidebar-in">
          <div className="right-sidebar-header">
            <h5>Result</h5>
            <a onClick={toggleTableViewButton} href="#">
              View on table
            </a>
          </div>
          <div className="aside-body">
            <div className="sidebar-widget">
              <div className="widget-body is-dark">
                <ul className="widget-list is-clear">
                  <li>
                    <div className="widget-content">
                      <h6>Tablets Deployed</h6>
                    </div>
                    <div className="widget-icon">
                      <span>
                        <i className="material-icons">tablet_mac</i>
                      </span>
                    </div>
                  </li>
                </ul>
                <div id="motivation-pie">
                  <ReactApexChart
                    options={tabletsDeployed}
                    series={tabletsDeployed.series}
                    type="donut"
                    height="140"
                  />
                </div>
                <ul className="widget-list">
                  <li>
                    <div className="widget-content">
                      <h6>Partner Institutions</h6>
                      <span>
                        {automationReducer.automationRightSidePartnerData &&
                          automationReducer
                            .automationRightSidePartnerData[0] &&
                          automationReducer
                            .automationRightSidePartnerData[0]
                            .total_partner}
                      </span>
                    </div>
                    <div className="widget-icon">
                      <span>
                        <i className="material-icons">
                          location_city
                        </i>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="widget-content">
                      <h6>Branches</h6>
                      <span>
                        {automationReducer.automationRightSidePartnerData &&
                          automationReducer
                            .automationRightSidePartnerData[0] &&
                          automationReducer
                            .automationRightSidePartnerData[0]
                            .total_branch}
                      </span>
                    </div>
                    <div className="widget-icon">
                      <span>
                        <i className="material-icons">business</i>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="widget-content">
                      <h6>Beneficiaries</h6>
                      <span>
                        {automationReducer.automationRightSidePartnerData &&
                          automationReducer
                            .automationRightSidePartnerData[0] &&
                          automationReducer
                            .automationRightSidePartnerData[0]
                            .total_beneficiary}
                      </span>
                    </div>
                    <div className="widget-icon">
                      <span>
                        <i className="material-icons">people</i>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="sidebar-widget">
              <h5>branches Count</h5>
              <div className="widget-body">
                {/* <div id="normal-chart">
                  <ReactApexChart
                    options={branchesCountOptions}
                    series={branchesCountOptions.series}
                    type="bar"
                    height="130"
                  />
                </div> */}
                {automationReducer.automationRightSidePartnerData &&
                  automationReducer
                    .automationRightSidePartnerData[0] &&
                  automationReducer.automationRightSidePartnerData[0].partner_data.map(
                    data => {
                      const totalBranch =
                        automationReducer
                          .automationRightSidePartnerData[0]
                          .total_branch;
                      const singlebranchValue = data.branch;
                      const BranchpercentCalculate =
                        (singlebranchValue / totalBranch) * 100;
                      const branchPercent = Math.round(
                        BranchpercentCalculate,
                      );

                      return (
                        <div key={data.id} className="branch-list">
                          <div className="branch">
                            <div
                              className="branch-bar"
                              style={{ width: branchPercent }}
                            >
                              <div className="branch-content">
                                <span>Chimek</span>
                                <b>{singlebranchValue}</b>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    },
                  )}
              </div>
            </div>
            <div className="sidebar-widget">
              <div className="widget-body">
                <div id="area-chart">
                  <ReactApexChart
                    options={areaChartOptions}
                    series={areaChartOptions.series}
                    type="area"
                    // height="350"
                    // width="370"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`expand-button ${
            activeRightSideBar ? '' : 'active'
          }`}
        >
          <button
            type="button"
            onClick={toggleRightSideBarButton}
            onKeyPress={toggleRightSideBarButton}
            className="common-button is-clear close-all"
          >
            <i className="material-icons">chevron_right</i>
          </button>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = ({ automationReducer }) => ({
  automationReducer,
});
export default connect(mapStateToProps, {})(RightSideBar);
