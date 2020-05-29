import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import MapComponent from '../MapComponent/MapComponent';

function getClassName(i) {
  if (i % 12 === 0) return 'is-color1';
  if (i % 12 === 1) return 'is-color2';
  if (i % 12 === 2) return 'is-color3';
  if (i % 12 === 3) return 'is-color4';
  if (i % 12 === 4) return 'is-color5';
  if (i % 12 === 5) return 'is-color6';
  if (i % 12 === 6) return 'is-color7';
  if (i % 12 === 7) return 'is-color8';
  if (i % 12 === 8) return 'is-color9';
  if (i % 12 === 9) return 'is-color10';
  if (i % 12 === 10) return 'is-color11';
  if (i % 12 === 11) return 'is-color12';
  if (i % 12 === 12) return 'is-color13';
  if (i % 12 === 13) return 'is-color14';
  return 'is-green';
}
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
    const a =
      automationReducer.automationRightSidePartnerData &&
      automationReducer.automationRightSidePartnerData[0] &&
      automationReducer.automationRightSidePartnerData[0].partner_data.map(
        data => {
          return data.branch;
        },
      );
    const maxBranchValue = Math.max(a && [...a]);

    // console.log(a, 'aaaa');
    // console.log(maxBranchValue, 'bbbb');
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
                <div className="branch-list">
                  {automationReducer.automationRightSidePartnerData &&
                    automationReducer
                      .automationRightSidePartnerData[0] &&
                    automationReducer.automationRightSidePartnerData[0].partner_data.map(
                      (data, i) => {
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
                        let initials =
                          data.partner_name.match(/\b\w/g) || [];
                        initials = (
                          (initials.shift() || '') +
                          (initials.pop() || '')
                        ).toUpperCase();
                        return (
                          <div key={data.id} className="branch">
                            <div
                              className={`branch-icon ${getClassName(
                                i,
                              )}`}
                            >
                              <span>{initials}</span>
                            </div>
                            <div
                              className="branch-bar"
                              tooltip={`${data.partner_name}:${data.branch}`}
                              flow="up"
                              style={{ width: branchPercent }}
                            >
                              {/* <div className="branch-content">
                                <span>Chimek</span>
                                <b>{singlebranchValue}</b>
                              </div> */}
                            </div>
                          </div>
                        );
                      },
                    )}
                </div>
              </div>
            </div>
            <div className="sidebar-widget">
              <div className="widget-body">
                <div id="area-chart">
                  {/* <ReactApexChart
                    options={areaChartOptions}
                    series={areaChartOptions.series}
                    type="area"
                    // height="350"
                    // width="370"
                  /> */}
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
