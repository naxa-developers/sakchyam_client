/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import Loading from '../../../common/Loading';

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

function numberWithCommas(x) {
  if (x !== null) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return x;
}
class RightSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeClickPartners, automationReducer } = this.props;
    if (
      automationReducer.automationRightSidePartnerData !==
      prevProps.automationReducer.automationRightSidePartnerData
    ) {
      if (activeClickPartners.length > 0) {
        this.setState({
          selectedList:
            automationReducer.automationRightSidePartnerData[0]
              .partner_data,
        });
      } else {
        this.setState({ selectedList: [] });
      }
    }
  }

  render() {
    const { selectedList } = this.state;
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
      rightSideBarLoader,
      tableDataLoading,
      showBeneficiary,
      branchesCooperative,
      loading,
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

    return (
      <aside className="sidebar right-sidebar">
        <div className="sidebar-in">
          <div className="right-sidebar-header">
            <h5>Result</h5>
            {!loading && (
              <a
                style={{
                  opacity: 1,
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                }}
                // style={{ cursor: 'pointer' }}
                onClick={toggleTableViewButton}
                onKeyDown={toggleTableViewButton}
                role="tab"
                tabIndex="0"
              >
                View on table
              </a>
            )}
          </div>
          <div className="aside-body">
            <div className="sidebar-widget">
              <div className="widget-body">
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
                  <Loading loaderState={loading} />
                  <li>
                    <div className="widget-content">
                      <h6>
                        {automationReducer.automationRightSidePartnerData &&
                        automationReducer
                          .automationRightSidePartnerData[0] &&
                        automationReducer
                          .automationRightSidePartnerData[0]
                          .total_partner > 1
                          ? 'Partner Institutions'
                          : 'Partner Institution'}
                      </h6>
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
                      <h6>
                        {branchesCooperative === 2
                          ? 'Branches'
                          : branchesCooperative === 0
                          ? 'Cooperative'
                          : 'Branches/Cooperative'}
                      </h6>
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
                  <li
                    style={
                      showBeneficiary === true
                        ? { display: 'flex' }
                        : { display: 'none' }
                    }
                  >
                    <div className="widget-content">
                      <h6>Beneficiaries</h6>
                      <span>
                        {automationReducer.automationRightSidePartnerData &&
                        automationReducer
                          .automationRightSidePartnerData[0] &&
                        automationReducer
                          .automationRightSidePartnerData[0]
                          .total_beneficiary !== 0
                          ? automationReducer.automationRightSidePartnerData &&
                            automationReducer
                              .automationRightSidePartnerData[0] &&
                            numberWithCommas(
                              automationReducer
                                .automationRightSidePartnerData[0]
                                .total_beneficiary,
                            )
                          : 'N/A'}
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
              <h5>
                {selectedList && selectedList.length > 1
                  ? 'Selected Partners'
                  : 'Selected Partner'}
              </h5>
              <div className="widget-body">
                {selectedList &&
                  selectedList.length === 0 &&
                  'No Partner Selected'}
                {selectedList &&
                  selectedList.map((data, i) => {
                    let initials =
                      data.partner_name.match(/\b\w/g) || [];
                    initials = (
                      (initials.shift() || '') +
                      (initials.pop() || '')
                    ).toUpperCase();
                    return (
                      <li
                        key={data.id}
                        role="tab"
                        className="selectedPartner"
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
                              <b>
                                {data.beneficiary &&
                                  numberWithCommas(data.beneficiary)}
                              </b>
                            </div>
                          </div>
                          <div className="orgnization-info">
                            <a>
                              Province
                              <span>{data.province_covered}</span>
                            </a>
                            <a>
                              District
                              <span>{data.district_covered}</span>
                            </a>
                            <a>
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
                            />
                          </div>
                        );
                      },
                    )}
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
