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
    const {
      automationReducer: { automationLeftSidePartnerData },
    } = this.props;
    const { automationReducer } = this.props;
    const {
      tabletsDeployed,
      branchesCountOptions,
      areaChartOptions,
      toggleRightSideBarButton,
      toggleTableViewButton,
      activeRightSideBar,
      activeClickPartners,
    } = this.props;
    const a =
      automationReducer.automationRightSidePartnerData &&
      automationReducer.automationRightSidePartnerData[0] &&
      automationReducer.automationRightSidePartnerData[0].partner_data.map(
        data => {
          return data.branch;
        },
      );

    const maxBranchValue = a && Math.max(...a);
    const selectedPartnerList =
      automationLeftSidePartnerData &&
      automationLeftSidePartnerData.filter((data, i) => {
        // console.log(data.partner_id, 'data id');
        // console.log(
        //   activeClickPartners && activeClickPartners[0],
        //   'clickedParters',
        // );
        const b = activeClickPartners && activeClickPartners;
        // console.log(b, 'b');
        // console.log(
        //   data.partner_id.includes(
        //     activeClickPartners && activeClickPartners,
        //   ),
        //   'clickedParters',
        // );
        // return true;
        return b.includes(data.partner_id);
      });
    // console.log(selectedPartnerList, 'selectedParnterList');
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
              <h5>Selected Partner</h5>
              <div className="widget-body">
                {selectedPartnerList &&
                  selectedPartnerList.map((data, i) => {
                    let initials =
                      data.partner_name.match(/\b\w/g) || [];
                    initials = (
                      (initials.shift() || '') +
                      (initials.pop() || '')
                    ).toUpperCase();
                    console.log(data, 'data');
                    return (
                      <li
                        key={data.id}
                        role="tab"
                        className="selectedPartner"
                        // onClick={() => {
                        //   handleActiveClickPartners(data.partner_id);
                        // }}
                        // onKeyPress={() => {
                        //   handleActiveClickPartners(data.partner_id);
                        // }}
                      >
                        <div
                          className={`organization-icon ${getClassName(
                            data.id,
                          )}`}
                        >
                          <span>{initials}</span>
                        </div>
                        <div className="organization-content">
                          <h5>{data.partner_name}</h5>
                          <div className="icon-list">
                            <div className="icons">
                              <i className="material-icons">
                                tablet_mac
                              </i>
                              <b>{data.tablets_deployed}</b>
                            </div>
                            <div className="icons">
                              <i className="material-icons">
                                business
                              </i>
                              <b>{data.branch}</b>
                            </div>
                            <div className="icons">
                              <i className="material-icons">people</i>
                              <b>{data.beneficiary}</b>
                            </div>
                          </div>
                          <div className="orgnization-info">
                            <a href="#">
                              Province
                              <span>{data.province_covered}</span>
                            </a>
                            <a href="#">
                              District
                              <span>{data.district_covered}</span>
                            </a>
                            <a href="#">
                              Local units
                              <span>{data.municipality_covered}</span>
                            </a>
                          </div>
                        </div>
                      </li>
                    );
                  })}
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
                          (singlebranchValue / maxBranchValue) * 100;
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
                                data.id,
                              )}`}
                            >
                              <span>{initials}</span>
                            </div>
                            <div
                              className="branch-bar"
                              tooltip={`${data.partner_name}:${data.branch}`}
                              flow="up"
                              style={{ width: `${branchPercent}%` }}
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
            {/* <div className="sidebar-widget">
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
            </div> */}
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
