import React, { Component } from 'react';

class TableViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { toggleTableViewButton } = this.props;
    return (
      <div className="main-card table-card">
        <div className="table-card-header">
          <div className="top-header">
            <h5>Result</h5>
            <a onClick={toggleTableViewButton} href="#">
              View on map
            </a>
          </div>
          <div className="filter-content">
            <div className="view-list">
              <span>view by</span>
              <ul className="tab-list">
                <li className="active">
                  <a href="#">Province</a>
                </li>
                <li>
                  <a href="#">District</a>
                </li>
                <li>
                  <a href="#">Municipality</a>
                </li>
              </ul>
            </div>
            <div className="filter-row">
              <div className="filter-list">
                <div className="form-group">
                  <select className="form-control">
                    <option selected>select province</option>
                    <option>province 1</option>
                    <option>province 2</option>
                    <option>province 3</option>
                    <option>province 4</option>
                    <option>province 5</option>
                    <option>province 6</option>
                    <option>province 7</option>
                  </select>
                </div>
                <div className="form-group">
                  <select className="form-control">
                    <option selected>select province</option>
                    <option>province 1</option>
                    <option>province 2</option>
                    <option>province 3</option>
                    <option>province 4</option>
                    <option>province 5</option>
                    <option>province 6</option>
                    <option>province 7</option>
                  </select>
                </div>
                <div className="form-group">
                  <select className="form-control">
                    <option selected>select province</option>
                    <option>province 1</option>
                    <option>province 2</option>
                    <option>province 3</option>
                    <option>province 4</option>
                    <option>province 5</option>
                    <option>province 6</option>
                    <option>province 7</option>
                  </select>
                </div>
                <div className="buttons is-end">
                  <button
                    type="button"
                    className="common-button is-clear"
                  >
                    <i className="material-icons">refresh</i>
                  </button>
                  <button
                    type="button"
                    className="common-button is-clear"
                  >
                    Apply
                  </button>
                </div>
              </div>
              <div className="search-bar">
                <div className="search-wrap">
                  <span className="search-icon">
                    <i className="material-icons">search</i>
                  </span>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="search"
                  />
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
                      <i className="material-icons">business</i>
                      <span>Branches</span>
                    </div>
                  </th>
                  <th>
                    <div className="table-head">
                      <i className="material-icons">location_city</i>
                      <span>Partner Institutions</span>
                    </div>
                  </th>
                  <th>
                    <div className="table-head">
                      <span>Provinces</span>
                    </div>
                  </th>
                  <th>
                    <div className="table-head">
                      <span>Districts</span>
                    </div>
                  </th>
                  <th>
                    <div className="table-head">
                      <span>Municipality</span>
                    </div>
                  </th>
                  <th>
                    <div className="table-head">
                      <i className="material-icons">tablet_mac</i>
                      <span>Tablet Deployed</span>
                    </div>
                  </th>
                  <th>
                    <div className="table-head">
                      <i className="material-icons">people</i>
                      <span>Beneficiaries</span>
                    </div>
                  </th>
                  <th>
                    <div className="table-head">
                      <span>local unit</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>Baraula</b>
                  </td>
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
                  <td>2</td>
                  <td>Pyuthan</td>
                  <td>Rural Municipality</td>
                  <td>
                    <b className="deployed">2</b>
                  </td>
                  <td>
                    <b>22</b>
                  </td>
                  <td>
                    <b>16</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Amargadhi Gankhet Digital Point</b>
                  </td>
                  <td>
                    <div className="organization">
                      <div className="organization-icon is-yellow">
                        <span>sk</span>
                      </div>
                      <div className="organization-content">
                        <b>Sana Kisan</b>
                      </div>
                    </div>
                  </td>
                  <td>2</td>
                  <td>Pyuthan</td>
                  <td>Rural Municipality</td>
                  <td>
                    <b className="deployed">2</b>
                  </td>
                  <td>
                    <b>22</b>
                  </td>
                  <td>
                    <b>16</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Abukhairine Branch</b>
                  </td>
                  <td>
                    <div className="organization">
                      <div className="organization-icon is-red">
                        <span>ch</span>
                      </div>
                      <div className="organization-content">
                        <b>Sana Kisan</b>
                      </div>
                    </div>
                  </td>
                  <td>2</td>
                  <td>Pyuthan</td>
                  <td>Rural Municipality</td>
                  <td>
                    <b className="deployed">2</b>
                  </td>
                  <td>
                    <b>22</b>
                  </td>
                  <td>
                    <b>16</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Bangsingh</b>
                  </td>
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
                  <td>2</td>
                  <td>Pyuthan</td>
                  <td>Rural Municipality</td>
                  <td>
                    <b className="deployed">2</b>
                  </td>
                  <td>
                    <b>22</b>
                  </td>
                  <td>
                    <b>16</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Rakam</b>
                  </td>
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
                  <td>2</td>
                  <td>Pyuthan</td>
                  <td>Rural Municipality</td>
                  <td>
                    <b className="deployed">2</b>
                  </td>
                  <td>
                    <b>22</b>
                  </td>
                  <td>
                    <b>16</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Aathbiskot</b>
                  </td>
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
                  <td>2</td>
                  <td>Pyuthan</td>
                  <td>Rural Municipality</td>
                  <td>
                    <b className="deployed">2</b>
                  </td>
                  <td>
                    <b>22</b>
                  </td>
                  <td>
                    <b>16</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Dhuwang</b>
                  </td>
                  <td>
                    <div className="organization">
                      <div className="organization-icon is-yellow">
                        <span>sk</span>
                      </div>
                      <div className="organization-content">
                        <b>Sana Kisan</b>
                      </div>
                    </div>
                  </td>
                  <td>2</td>
                  <td>Pyuthan</td>
                  <td>Rural Municipality</td>
                  <td>
                    <b className="deployed">2</b>
                  </td>
                  <td>
                    <b>22</b>
                  </td>
                  <td>
                    <b>16</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Pakala</b>
                  </td>
                  <td>
                    <div className="organization">
                      <div className="organization-icon is-red">
                        <span>ch</span>
                      </div>
                      <div className="organization-content">
                        <b>Sana Kisan</b>
                      </div>
                    </div>
                  </td>
                  <td>2</td>
                  <td>Pyuthan</td>
                  <td>Rural Municipality</td>
                  <td>
                    <b className="deployed">2</b>
                  </td>
                  <td>
                    <b>22</b>
                  </td>
                  <td>
                    <b>16</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Amargadhi Chipur Digital Point</b>
                  </td>
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
                  <td>2</td>
                  <td>Pyuthan</td>
                  <td>Rural Municipality</td>
                  <td>
                    <b className="deployed">2</b>
                  </td>
                  <td>
                    <b>22</b>
                  </td>
                  <td>
                    <b>16</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Amargadhi Bhadrapur Digital Point</b>
                  </td>
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
                  <td>2</td>
                  <td>Pyuthan</td>
                  <td>Rural Municipality</td>
                  <td>
                    <b className="deployed">2</b>
                  </td>
                  <td>
                    <b>22</b>
                  </td>
                  <td>
                    <b>16</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default TableViewComponent;
