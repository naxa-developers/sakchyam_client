import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import MapComponent from '../MapComponent/MapComponent';

class RightSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      tabletsDeployed,
      branchesCountOptions,
      areaChartOptions,
      toggleRightSideBarButton,
      toggleTableViewButton,
    } = this.props;
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
                        {partnersData && partnersData.total_partner}
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
                        {partnersData && partnersData.total_branch}
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
                        {partnersData &&
                          partnersData.total_beneficiary}
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
                <div id="normal-chart">
                  <ReactApexChart
                    options={branchesCountOptions}
                    series={branchesCountOptions.series}
                    type="bar"
                    height="130"
                    // width="10"
                  />
                </div>
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
        <div className="expand-button">
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

export default RightSideBar;
