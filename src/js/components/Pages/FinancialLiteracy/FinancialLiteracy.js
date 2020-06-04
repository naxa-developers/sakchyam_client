import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../Header';
import DownloadIcon from '../../../../img/get_app.png';
import ExpandIcon from '../../../../img/open_in_full-black-18dp.png';
import LeftSideBar from './LeftSideBar/LeftSideBar';
import RightSideBar from './RightSideBar/RightSideBar';

class FinancialLiteracy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Header />
        <div className="automation-wrapper literacy-wrapper">
          <LeftSideBar />
          <main className="main">
            <div className="main-card map-card" />
            <div className="main-card literacy-main-card">
              <div className="literacy-tab">
                <ul>
                  <li>
                    <a href="#">Visualisation</a>
                  </li>
                  <li className="active">
                    <a href="#">data</a>
                  </li>
                </ul>
              </div>

              <div className="literacy-tab-content">
                <div className="literacy-tab-item">
                  <div className="graph-view">
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="card">
                          <div className="card-header">
                            <h5>
                              Contribution of program initiatives
                            </h5>
                            <div className="header-icons">
                              <span className="">
                                <img src={DownloadIcon} alt="open" />
                              </span>
                              <span className="">
                                <img src={ExpandIcon} alt="open" />
                              </span>
                            </div>
                          </div>
                          <div className="card-body" />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="card">
                          <div className="card-header">
                            <h5>
                              Contribution of program initiatives
                            </h5>
                            <div className="header-icons">
                              <span className="">
                                <img src={DownloadIcon} alt="open" />
                              </span>
                              <span className="">
                                <img src={ExpandIcon} alt="open" />
                              </span>
                            </div>
                          </div>
                          <div className="card-body" />
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="card">
                          <div className="card-header">
                            <h5>
                              Contribution of program initiatives
                            </h5>
                            <div className="header-icons">
                              <span className="">
                                <img src={DownloadIcon} alt="open" />
                              </span>
                              <span className="">
                                <img src={ExpandIcon} alt="open" />
                              </span>
                            </div>
                          </div>
                          <div className="card-body" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="literacy-tab-item"
                  style={{ display: 'none' }}
                >
                  <div className="table-card">
                    <div className="table-card-header">
                      <div className="filter-content">
                        <div className="filter-row">
                          <div className="filter-list">
                            <strong>sort by</strong>
                            <div className="form-group">
                              <div
                                className="select-dropdown"
                                id="duration_id"
                              >
                                <span className="span-label span-dropdown">
                                  All
                                </span>
                                <ul
                                  className="select-list"
                                  id="dropdown-list"
                                >
                                  <li className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="check_time"
                                    />
                                    <label htmlFor="check_time">
                                      <i className="icon-ok-2" />
                                      All
                                    </label>
                                  </li>
                                  <li className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="check_time"
                                    />
                                    <label htmlFor="check_time">
                                      <i className="icon-ok-2" />
                                      Milestone Year 1
                                    </label>
                                  </li>
                                  <li className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="check_time2"
                                    />
                                    <label htmlFor="check_time2">
                                      Milestone Year 2
                                    </label>
                                  </li>
                                  <li className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="check_time3"
                                    />
                                    <label htmlFor="check_time3">
                                      Milestone Year 3
                                    </label>
                                  </li>
                                  <li className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="check_time4"
                                    />
                                    <label htmlFor="check_time4">
                                      Milestone Year 4
                                    </label>
                                  </li>
                                  <li className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="check_time5"
                                    />
                                    <label htmlFor="check_time5">
                                      Milestone Year 5
                                    </label>
                                  </li>
                                  <li className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="check_time6"
                                    />
                                    <label htmlFor="check_time6">
                                      Milestone Year 6
                                    </label>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="search-bar">
                            <div className="search-wrap">
                              <span className="search-icon">
                                <i className="material-icons">
                                  search
                                </i>
                              </span>
                              <input
                                type="search"
                                className="form-control"
                                placeholder="search"
                              />
                            </div>
                            <div className="export-button">
                              <i className="material-icons">
                                get_app
                              </i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="table-card-body">
                      <div className="table-responsive automation-table">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>
                                <div className="table-head">
                                  <i className="material-icons">
                                    location_city
                                  </i>
                                  <span>Partner Institutions</span>
                                </div>
                              </th>
                              <th>
                                <div className="table-head">
                                  <span>PGT</span>
                                </div>
                              </th>
                              <th>
                                <div className="table-head">
                                  <span>center meeting</span>
                                </div>
                              </th>
                              <th>
                                <div className="table-head">
                                  <span>IVR</span>
                                </div>
                              </th>
                              <th>
                                <div className="table-head">
                                  <span>Tab</span>
                                </div>
                              </th>
                              <th>
                                <div className="table-head">
                                  <span>Street Drama</span>
                                </div>
                              </th>
                              <th>
                                <div className="table-head">
                                  <span>others</span>
                                </div>
                              </th>
                              <th>
                                <div className="table-head">
                                  <span>Total count</span>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="form-header active">
                              <td colSpan="8">
                                <h5>
                                  <i className="material-icons">
                                    arrow_drop_down
                                  </i>
                                  <span>Microfinance</span>
                                </h5>
                              </td>
                            </tr>
                            <tr className="data">
                              <td>
                                <div className="organization">
                                  <div className="organization-icon is-green">
                                    <span>ch</span>
                                  </div>
                                  <div className="organization-content">
                                    <b>Sana Kisan</b>
                                  </div>
                                </div>
                              </td>
                              <td> 11,935 </td>
                              <td> 11,935 </td>
                              <td> 7,703 </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span> 1,442 </span>
                              </td>
                              <td>
                                <span className="total-count">
                                  {' '}
                                  11,935
                                </span>
                              </td>
                            </tr>
                            <tr className="data">
                              <td>
                                <div className="organization">
                                  <div className="organization-icon is-green">
                                    <span>ch</span>
                                  </div>
                                  <div className="organization-content">
                                    <b>Sana Kisan</b>
                                  </div>
                                </div>
                              </td>
                              <td> 11,935 </td>
                              <td> 11,935 </td>
                              <td> 7,703 </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span> 1,442 </span>
                              </td>
                              <td>
                                <span className="total-count">
                                  {' '}
                                  11,935
                                </span>
                              </td>
                            </tr>
                            <tr className="data">
                              <td>
                                <div className="organization">
                                  <div className="organization-icon is-green">
                                    <span>ch</span>
                                  </div>
                                  <div className="organization-content">
                                    <b>Sana Kisan</b>
                                  </div>
                                </div>
                              </td>
                              <td> 11,935 </td>
                              <td> 11,935 </td>
                              <td> 7,703 </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span> 1,442 </span>
                              </td>
                              <td>
                                <span className="total-count">
                                  {' '}
                                  11,935
                                </span>
                              </td>
                            </tr>
                            <tr className="data">
                              <td>
                                <div className="organization">
                                  <div className="organization-icon is-green">
                                    <span>ch</span>
                                  </div>
                                  <div className="organization-content">
                                    <b>Sana Kisan</b>
                                  </div>
                                </div>
                              </td>
                              <td> 11,935 </td>
                              <td> 11,935 </td>
                              <td> 7,703 </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span> 1,442 </span>
                              </td>
                              <td>
                                <span className="total-count">
                                  {' '}
                                  11,935
                                </span>
                              </td>
                            </tr>
                            <tr className="data">
                              <td>
                                <div className="organization">
                                  <div className="organization-icon is-green">
                                    <span>ch</span>
                                  </div>
                                  <div className="organization-content">
                                    <b>Sana Kisan</b>
                                  </div>
                                </div>
                              </td>
                              <td> 11,935 </td>
                              <td> 11,935 </td>
                              <td> 7,703 </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span> 1,442 </span>
                              </td>
                              <td>
                                <span className="total-count">
                                  {' '}
                                  11,935
                                </span>
                              </td>
                            </tr>
                            <tr className="form-header">
                              <td colSpan="8">
                                <h5>
                                  <i className="material-icons">
                                    arrow_drop_down
                                  </i>
                                  <span>
                                    Commercial Bank & Others
                                  </span>
                                </h5>
                              </td>
                            </tr>
                            <tr className="data">
                              <td>
                                <div className="organization">
                                  <div className="organization-icon is-green">
                                    <span>ch</span>
                                  </div>
                                  <div className="organization-content">
                                    <b>Sana Kisan</b>
                                  </div>
                                </div>
                              </td>
                              <td> 11,935 </td>
                              <td> 11,935 </td>
                              <td> 7,703 </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span> 1,442 </span>
                              </td>
                              <td>
                                <span className="total-count">
                                  {' '}
                                  11,935
                                </span>
                              </td>
                            </tr>
                            <tr className="data">
                              <td>
                                <div className="organization">
                                  <div className="organization-icon is-green">
                                    <span>ch</span>
                                  </div>
                                  <div className="organization-content">
                                    <b>Sana Kisan</b>
                                  </div>
                                </div>
                              </td>
                              <td> 11,935 </td>
                              <td> 11,935 </td>
                              <td> 7,703 </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span> 1,442 </span>
                              </td>
                              <td>
                                <span className="total-count">
                                  {' '}
                                  11,935
                                </span>
                              </td>
                            </tr>
                            <tr className="data">
                              <td>
                                <div className="organization">
                                  <div className="organization-icon is-green">
                                    <span>ch</span>
                                  </div>
                                  <div className="organization-content">
                                    <b>Sana Kisan</b>
                                  </div>
                                </div>
                              </td>
                              <td> 11,935 </td>
                              <td> 11,935 </td>
                              <td> 7,703 </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span> 1,442 </span>
                              </td>
                              <td>
                                <span className="total-count">
                                  {' '}
                                  11,935
                                </span>
                              </td>
                            </tr>
                            <tr className="data">
                              <td>
                                <div className="organization">
                                  <div className="organization-icon is-green">
                                    <span>ch</span>
                                  </div>
                                  <div className="organization-content">
                                    <b>Sana Kisan</b>
                                  </div>
                                </div>
                              </td>
                              <td> 11,935 </td>
                              <td> 11,935 </td>
                              <td> 7,703 </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span> 1,442 </span>
                              </td>
                              <td>
                                <span className="total-count">
                                  {' '}
                                  11,935
                                </span>
                              </td>
                            </tr>
                            <tr className="data">
                              <td>
                                <div className="organization">
                                  <div className="organization-icon is-green">
                                    <span>ch</span>
                                  </div>
                                  <div className="organization-content">
                                    <b>Sana Kisan</b>
                                  </div>
                                </div>
                              </td>
                              <td> 11,935 </td>
                              <td> 11,935 </td>
                              <td> 7,703 </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span>-</span>
                              </td>
                              <td>
                                <span> 1,442 </span>
                              </td>
                              <td>
                                <span className="total-count">
                                  {' '}
                                  11,935
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <RightSideBar />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FinancialLiteracy);
