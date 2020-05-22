import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getBranchesTableDataByFed,
  getBranchesTableData,
  getDistrictDataFromProvince,
  getMunicipalityDataFromDistrict,
} from '../../../../actions/automation.actions';
import TableViewSkeleton from '../../../common/TableViewSkeleton';

class TableViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableProvinceDropdown: false,
      tableDistrictDropdown: false,
      tableMunicipalityDropdown: false,
      tableSelectedProvince: [],
      tableSelectedDistrict: [],
      tableSelectedMunicipality: [],
      tableDataTypeLevel: 'municipality',
    };
  }

  componentDidMount() {
    const provinceEl = document.getElementById(
      'filter_dropdown_province_table',
    );
    const districtEl = document.getElementById(
      'filter_dropdown_district_table',
    );
    const municipalityEl = document.getElementById(
      'filter_dropdown_municipality_table',
    );
    document.addEventListener('click', async event => {
      const isClickInside = provinceEl.contains(event.target);
      if (!isClickInside) {
        this.setState({
          tableProvinceDropdown: false,
          // searchDropdown: false,
        });
        // the click was outside the specifiedElement, do something
      }
    });
    document.addEventListener('click', async event => {
      const isClickInside = districtEl.contains(event.target);
      if (!isClickInside) {
        this.setState({
          tableDistrictDropdown: false,
          // searchDropdown: false,
        });
        // the click was outside the specifiedElement, do something
      }
    });
    document.addEventListener('click', async event => {
      const isClickInside = municipalityEl.contains(event.target);
      if (!isClickInside) {
        this.setState({
          tableMunicipalityDropdown: false,
          // searchDropdown: false,
        });
        // the click was outside the specifiedElement, do something
      }
    });
  }

  handleProvinceDropdown = () => {
    this.setState(prevState => ({
      tableProvinceDropdown: !prevState.tableProvinceDropdown,
    }));
  };

  handleDistrictDropdown = () => {
    this.setState(prevState => ({
      tableDistrictDropdown: !prevState.tableDistrictDropdown,
    }));
  };

  handleMunicipalityDropdown = () => {
    this.setState(prevState => ({
      tableMunicipalityDropdown: !prevState.tableMunicipalityDropdown,
    }));
  };

  handleProvinceAllCheck = event => {
    const { allProvinceName } = this.props.automationReducer;
    if (event.target.checked) {
      const a = allProvinceName.map(data => {
        return data.id;
      });
      // console.log(provinceCheckboxes, 'checkboxes');
      this.setState({ tableSelectedProvince: a });
    } else {
      this.setState({ tableSelectedProvince: [] });
    }
  };

  handleProvinceSingleClick = value => {
    const { tableSelectedProvince } = this.state;
    if (tableSelectedProvince.includes(value)) {
      const a = tableSelectedProvince.filter(data => data !== value);
      this.setState({ tableSelectedProvince: a });
    } else {
      const b = tableSelectedProvince.concat(value);
      this.setState({ tableSelectedProvince: b });
    }
  };

  handleDistrictAllCheck = event => {
    const { allDistrictName } = this.props.automationReducer;

    if (event.target.checked) {
      const a = allDistrictName.map(data => {
        return data.id;
      });
      // console.log(provinceCheckboxes, 'checkboxes');
      this.setState({ tableSelectedDistrict: a });
    } else {
      this.setState({ tableSelectedDistrict: [] });
    }
  };

  handleDistrictSingleClick = value => {
    const { tableSelectedDistrict } = this.state;
    if (tableSelectedDistrict.includes(value)) {
      const a = tableSelectedDistrict.filter(data => data !== value);
      this.setState({ tableSelectedDistrict: a });
    } else {
      const b = tableSelectedDistrict.concat(value);
      this.setState({ tableSelectedDistrict: b });
    }
  };

  handleMunicipalityAllCheck = event => {
    const { allMunicipalityName } = this.props.automationReducer;

    if (event.target.checked) {
      const a = allMunicipalityName.map(data => {
        return data.id;
      });
      // console.log(provinceCheckboxes, 'checkboxes');
      this.setState({ tableSelectedMunicipality: a });
    } else {
      this.setState({ tableSelectedMunicipality: [] });
    }
  };

  handleMunicipalitySingleClick = value => {
    const { tableSelectedMunicipality } = this.state;
    if (tableSelectedMunicipality.includes(value)) {
      const a = tableSelectedMunicipality.filter(
        data => data !== value,
      );
      this.setState({ tableSelectedMunicipality: a });
    } else {
      const b = tableSelectedMunicipality.concat(value);
      this.setState({ tableSelectedMunicipality: b });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { tableSelectedMunicipality } = this.state;
    // if (
    //   prevState.tableSelectedMunicipality !==
    //   this.state.tableSelectedMunicipality
    // ) {
    //   this.props.getBranchesTableDataByMunicipality(
    //     tableSelectedMunicipality,
    //   );
    // }
    if (
      prevState.tableSelectedProvince !==
      this.state.tableSelectedProvince
    ) {
      this.props.getDistrictDataFromProvince(
        this.state.tableSelectedProvince,
      );
    }
    if (
      prevState.tableSelectedDistrict !==
      this.state.tableSelectedDistrict
    ) {
      this.props.getMunicipalityDataFromDistrict(
        this.state.tableSelectedDistrict,
      );
    }
  }

  applyClickForPartnerFilter = () => {
    const {
      tableSelectedMunicipality,
      tableSelectedDistrict,
      tableSelectedProvince,
    } = this.state;
    this.props.getBranchesTableDataByFed({
      municipality: tableSelectedMunicipality,
      district: tableSelectedDistrict,
      province: tableSelectedProvince,
    });
  };

  handleResetButtonForFilter = () => {
    this.props.getBranchesTableData();
    this.setState({
      tableSelectedProvince: [],
      tableSelectedDistrict: [],
      tableSelectedMunicipality: [],
    });
  };

  render() {
    const {
      tableProvinceDropdown,
      tableMunicipalityDropdown,
      tableDistrictDropdown,
      tableSelectedProvince,
      tableSelectedDistrict,
      tableSelectedMunicipality,
      tableDataTypeLevel,
    } = this.state;
    const {
      allProvinceName,
      allDistrictName,
      allMunicipalityName,
      automationTableData,
      tableDataLoading,
    } = this.props.automationReducer;
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
                <li
                  role="tab"
                  className={`${
                    tableDataTypeLevel === 'province' ? 'active' : ''
                  }`}
                  onClick={() => {
                    this.handleStateLevel('province');
                  }}
                  onKeyPress={() => {
                    this.handleStateLevel('province');
                  }}
                >
                  <a href="#">Province</a>
                </li>
                <li
                  role="tab"
                  className={`${
                    tableDataTypeLevel === 'district' ? 'active' : ''
                  }`}
                  onClick={() => {
                    this.handleStateLevel('district');
                  }}
                  onKeyPress={() => {
                    this.handleStateLevel('district');
                  }}
                >
                  <a href="#">District</a>
                </li>
                <li
                  role="tab"
                  className={`${
                    tableDataTypeLevel === 'municipality'
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => {
                    this.handleStateLevel('municipality');
                  }}
                  onKeyPress={() => {
                    this.handleStateLevel('municipality');
                  }}
                >
                  <a href="#">Municipality</a>
                </li>
              </ul>
            </div>
            <div className="filter-row">
              <div className="filter-list">
                {/* <DropdownCheckbox /> */}
                <div
                  className="select-dropdown"
                  id="filter_dropdown_province_table"
                >
                  <span
                    className={`span-label ${
                      tableProvinceDropdown ? 'span-active' : ''
                    } `}
                    onClick={this.handleProvinceDropdown}
                    onKeyDown={this.handleProvinceDropdown}
                    role="tab"
                    tabIndex="0"
                  >
                    Province
                  </span>
                  <ul
                    className={`select-list ${
                      tableProvinceDropdown ? 'active' : ''
                    }`}
                    id="dropdown-list"
                  >
                    <li className="checkbox">
                      <input
                        type="checkbox"
                        id="allProvinceCheck_table"
                        onClick={this.handleProvinceAllCheck}
                        checked={
                          tableSelectedProvince.length ===
                          allProvinceName.length
                            ? true
                            : false
                        }
                      />
                      <label htmlFor="allProvinceCheck_table">
                        <i className="icon-ok-2" />
                        All
                      </label>
                    </li>
                    {allProvinceName &&
                      allProvinceName.map((data, i) => {
                        return (
                          <li key={data.id} className="checkbox">
                            <input
                              type="checkbox"
                              id={`check_time_table${i}`}
                              checked={tableSelectedProvince.includes(
                                data.id,
                              )}
                              onClick={() => {
                                this.handleProvinceSingleClick(
                                  data.id,
                                );
                              }}
                            />
                            <label htmlFor={`check_time_table${i}`}>
                              <i className="icon-ok-2" />
                              {data.name}
                            </label>
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <div
                  className="select-dropdown"
                  id="filter_dropdown_district_table"
                  onClick={this.handleDistrictDropdown}
                  onKeyDown={this.handleDistrictDropdown}
                  role="tab"
                  tabIndex="0"
                >
                  <span
                    className={`span-label ${
                      tableDistrictDropdown ? 'span-active' : ''
                    } `}
                  >
                    District
                  </span>
                  <ul
                    className={`select-list ${
                      tableDistrictDropdown ? 'active' : ''
                    }`}
                    id="dropdown-list-district_table"
                  >
                    <li className="checkbox">
                      <input
                        type="checkbox"
                        id="allDistrictCheck_table"
                        onClick={this.handleDistrictAllCheck}
                        checked={
                          tableSelectedDistrict.length ===
                          allDistrictName.length
                            ? true
                            : false
                        }
                      />
                      <label htmlFor="allDistrictCheck_table">
                        <i className="icon-ok-2" />
                        All
                      </label>
                    </li>
                    {allDistrictName &&
                      allDistrictName.map((data, i) => {
                        return (
                          <li key={data.id} className="checkbox">
                            <input
                              type="checkbox"
                              id={`check_district_table${i}`}
                              checked={tableSelectedDistrict.includes(
                                data.id,
                              )}
                              onClick={() => {
                                this.handleDistrictSingleClick(
                                  data.id,
                                );
                              }}
                            />
                            <label
                              htmlFor={`check_district_table${i}`}
                            >
                              <i className="icon-ok-2" />
                              {data.name}
                            </label>
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <div
                  className="select-dropdown"
                  id="filter_dropdown_municipality_table"
                  onClick={this.handleMunicipalityDropdown}
                  onKeyDown={this.handleMunicipalityDropdown}
                  role="tab"
                  tabIndex="0"
                >
                  <span
                    className={`span-label ${
                      tableMunicipalityDropdown ? 'span-active' : ''
                    } `}
                  >
                    Municipality
                  </span>
                  <ul
                    className={`select-list ${
                      tableMunicipalityDropdown ? 'active' : ''
                    }`}
                    id="dropdown-list-mun"
                  >
                    <li className="checkbox">
                      <input
                        type="checkbox"
                        id="allMunicipalityCheck_table"
                        onClick={this.handleMunicipalityAllCheck}
                        checked={
                          tableSelectedMunicipality.length ===
                          allMunicipalityName.length
                            ? true
                            : false
                        }
                      />
                      <label htmlFor="allMunicipalityCheck_table">
                        <i className="icon-ok-2" />
                        All
                      </label>
                    </li>
                    {allMunicipalityName &&
                      allMunicipalityName.map((data, i) => {
                        return (
                          <li key={data.id} className="checkbox">
                            <input
                              type="checkbox"
                              id={`check_mun_table${i}`}
                              checked={tableSelectedMunicipality.includes(
                                data.id,
                              )}
                              onClick={() => {
                                this.handleMunicipalitySingleClick(
                                  data.id,
                                );
                              }}
                            />
                            <label htmlFor={`check_mun_table${i}`}>
                              <i className="icon-ok-2" />
                              {data.name}
                            </label>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className="buttons is-end">
                <button
                  type="button"
                  className="common-button is-clear"
                  onClick={this.handleResetButtonForFilter}
                >
                  <i className="material-icons">refresh</i>
                </button>
                <button
                  type="button"
                  className="common-button is-clear"
                  onClick={this.applyClickForPartnerFilter}
                >
                  Apply
                </button>
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
                </tr>
              </thead>
              <tbody>
                {// tableDataLoading ? (
                //   <TableViewSkeleton />
                // ) : (
                automationTableData &&
                  automationTableData.map(data => {
                    return (
                      <tr key={data.id}>
                        <td>
                          <b>{data.branch}</b>
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
                          <b className="deployed">
                            {data.num_tablet_deployed}
                          </b>
                        </td>
                      </tr>
                    );
                  })
                // )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ automationReducer }) => ({
  automationReducer,
});
export default connect(mapStateToProps, {
  getBranchesTableDataByFed,
  getBranchesTableData,
  getDistrictDataFromProvince,
  getMunicipalityDataFromDistrict,
})(TableViewComponent);
