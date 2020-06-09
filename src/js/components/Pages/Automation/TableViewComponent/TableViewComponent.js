/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getBranchesTableDataByFed,
  getBranchesTableData,
  getDistrictDataFromProvince,
  getMunicipalityDataFromDistrict,
} from '../../../../actions/automation.actions';
import TableViewSkeleton from '../../../common/TableViewSkeleton';
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
class TableViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableProvinceDropdown: false,
      tableDistrictDropdown: false,
      tableMunicipalityDropdown: false,
      tableSelectedProvinceDropdown: [],
      tableSelectedDistrictDropdown: [],
      tableSelectedMunicipalityDropdown: [],
      tableSelectedProvince: [],
      tableSelectedDistrict: [],
      tableSelectedMunicipality: [],
      tableSelectedProvinceName: [],
      tableSelectedDistrictName: [],
      tableSelectedMunicipalityName: [],
      tableDataTypeLevel: 'municipality',
      isLoading: false,
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
      const provinceNames = allProvinceName.map(data => {
        return data.name;
      });
      const provinceNamesDropdown = allProvinceName.map(data => {
        return data.code;
      });
      // console.log(provinceCheckboxes, 'checkboxes');
      this.setState({
        tableSelectedProvince: a,
        tableSelectedProvinceDropdown: provinceNamesDropdown,
        tableSelectedProvinceName: provinceNames,
      });
    } else {
      this.setState({
        tableSelectedProvince: [],
        tableSelectedProvinceDropdown: [],
        tableSelectedProvinceName: [],
      });
    }
  };

  handleProvinceSingleClick = (value, id, name) => {
    const {
      tableSelectedProvince,
      tableSelectedProvinceDropdown,
      tableSelectedProvinceName,
    } = this.state;
    if (tableSelectedProvince.includes(value)) {
      const a = tableSelectedProvince.filter(data => data !== value);
      const filteredProvinceName = tableSelectedProvinceName.filter(
        data => data !== name,
      );
      const d = tableSelectedProvinceDropdown.filter(
        data => data !== id,
      );
      this.setState({
        tableSelectedProvince: a,
        tableSelectedProvinceDropdown: d,
        tableSelectedProvinceName: filteredProvinceName,
      });
    } else {
      const b = tableSelectedProvince.concat(value);
      const c = tableSelectedProvinceDropdown.concat(id);
      const filteredProvinceName = tableSelectedProvinceName.concat(
        name,
      );
      this.setState({
        tableSelectedProvince: b,
        tableSelectedProvinceDropdown: c,
        tableSelectedProvinceName: filteredProvinceName,
      });
    }
  };

  handleDistrictAllCheck = event => {
    const { allDistrictName } = this.props.automationReducer;

    if (event.target.checked) {
      const a = allDistrictName.map(data => {
        return data.id;
      });
      const districtNames = allDistrictName.map(data => {
        return data.name;
      });
      const districtNamesDropdown = allDistrictName.map(data => {
        return data.code;
      });
      // console.log(provinceCheckboxes, 'checkboxes');
      this.setState({
        tableSelectedDistrict: a,
        tableSelectedDistrictDropdown: districtNamesDropdown,
        tableSelectedDistrictName: districtNames,
      });
    } else {
      this.setState({
        tableSelectedDistrict: [],
        tableSelectedDistrictDropdown: [],
        tableSelectedDistrictName: [],
      });
    }
  };

  handleDistrictSingleClick = (value, id, name) => {
    const {
      tableSelectedDistrict,
      tableSelectedDistrictDropdown,
      tableSelectedDistrictName,
    } = this.state;
    if (tableSelectedDistrict.includes(value)) {
      const a = tableSelectedDistrict.filter(data => data !== value);
      const d = tableSelectedDistrictDropdown.filter(
        data => data !== id,
      );
      const filteredDistrictName = tableSelectedDistrictName.filter(
        data => data !== name,
      );
      this.setState({
        tableSelectedDistrict: a,
        tableSelectedDistrictDropdown: d,
        tableSelectedDistrictName: filteredDistrictName,
      });
    } else {
      const b = tableSelectedDistrict.concat(value);
      const c = tableSelectedDistrictDropdown.concat(id);
      const filteredDistrictName = tableSelectedDistrictName.concat(
        name,
      );
      this.setState({
        tableSelectedDistrict: b,
        tableSelectedDistrictDropdown: c,
        tableSelectedDistrictName: filteredDistrictName,
      });
    }
  };

  handleMunicipalityAllCheck = event => {
    const { allMunicipalityName } = this.props.automationReducer;

    if (event.target.checked) {
      const a = allMunicipalityName.map(data => {
        return data.id;
      });
      const MunicipalityNames = allMunicipalityName.map(data => {
        return data.name;
      });
      const MunicipalityNamesDropdown = allMunicipalityName.map(
        data => {
          return data.code;
        },
      );
      // console.log(provinceCheckboxes, 'checkboxes');
      this.setState({
        tableSelectedMunicipality: a,
        tableSelectedMunicipalityDropdown: MunicipalityNamesDropdown,
        tableSelectedMunicipalityName: MunicipalityNames,
      });
    } else {
      this.setState({
        tableSelectedMunicipality: [],
        tableSelectedMunicipalityDropdown: [],
        tableSelectedMunicipalityName: [],
      });
    }
  };

  handleMunicipalitySingleClick = (value, id, name) => {
    const {
      tableSelectedMunicipality,
      tableSelectedMunicipalityDropdown,
      tableSelectedMunicipalityName,
    } = this.state;
    if (tableSelectedMunicipality.includes(value)) {
      const a = tableSelectedMunicipality.filter(
        data => data !== value,
      );
      const d = tableSelectedMunicipalityDropdown.filter(
        data => data !== id,
      );
      const filteredMunicipalityName = tableSelectedMunicipalityName.filter(
        data => data !== name,
      );
      this.setState({
        tableSelectedMunicipality: a,
        tableSelectedMunicipalityDropdown: d,
        tableSelectedMunicipalityName: filteredMunicipalityName,
      });
    } else {
      const b = tableSelectedMunicipality.concat(value);
      const c = tableSelectedMunicipalityDropdown.concat(id);
      const filteredMunicipalityName = tableSelectedMunicipalityName.concat(
        name,
      );
      this.setState({
        tableSelectedMunicipality: b,
        tableSelectedMunicipalityDropdown: c,
        tableSelectedMunicipalityName: filteredMunicipalityName,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { tableSelectedMunicipality } = this.state;
    if (
      prevProps.automationReducer.automationTableData !==
      this.props.automationReducer.automationTableData
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isLoading: false });
    }
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
        this.state.tableSelectedProvinceDropdown,
      );
    }
    if (
      prevState.tableSelectedDistrict !==
      this.state.tableSelectedDistrict
    ) {
      this.props.getMunicipalityDataFromDistrict(
        this.state.tableSelectedDistrictDropdown,
      );
    }

    if (
      prevState.tableDataTypeLevel !== this.state.tableDataTypeLevel
    ) {
      if (this.state.tableDataTypeLevel === 'municipality') {
        this.props.getBranchesTableData('municipality');
      }
      if (this.state.tableDataTypeLevel === 'district') {
        this.props.getBranchesTableData('district');
      }
      if (this.state.tableDataTypeLevel === 'province') {
        this.props.getBranchesTableData('province');
      }
    }
  }

  applyClickForPartnerFilter = () => {
    this.setState({ isLoading: true });
    const {
      tableSelectedMunicipality,
      tableSelectedMunicipalityDropdown,
      tableSelectedDistrict,
      tableSelectedProvince,
    } = this.state;
    const { activeClickPartners } = this.props;
    this.props.getBranchesTableDataByFed(
      {
        municipality: tableSelectedMunicipalityDropdown,
        district: tableSelectedDistrict,
        province: tableSelectedProvince,
      },
      activeClickPartners,
    );
  };

  handleResetButtonForFilter = () => {
    this.props.getBranchesTableData();
    this.setState({
      tableSelectedProvince: [],
      tableSelectedDistrict: [],
      tableSelectedMunicipality: [],
    });
  };

  toggleDataState = state => {
    this.setState({ tableDataTypeLevel: state });
  };

  exportTableToExcel = () => {
    // let downloadLink;
    const dataType = 'application/vnd.ms-excel';
    const tableSelect = document.getElementById('table_id');
    const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    const FullDate = new Date();
    const date = `${FullDate.getFullYear()}/${FullDate.getDay()}/${FullDate.getMonth()}`;
    // console.log(date, 'date');
    // Specify file name
    const filename = `automationData${date}.xls`;

    // Create download link element
    const downloadLink = document.createElement('a');

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      const blob = new Blob(['\ufeff', tableHTML], {
        type: dataType,
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = `data:${dataType}, ${tableHTML}`;

      // Setting the file name
      downloadLink.download = filename;

      // triggering the function
      downloadLink.click();
    }
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
      tableSelectedProvinceDropdown,
      tableSelectedDistrictDropdown,
      tableSelectedMunicipalityDropdown,
      tableSelectedProvinceName,
      tableSelectedDistrictName,
      tableSelectedMunicipalityName,
      isLoading,
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
        <iframe
          id="txtArea1"
          title="table"
          style={{ display: 'none' }}
        />
        <div className="table-card-header">
          <div className="top-header">
            <h5>Result</h5>
            <a
              role="tab"
              tabIndex="0"
              onClick={toggleTableViewButton}
              onKeyDown={toggleTableViewButton}
            >
              View on map
            </a>
          </div>

          <div className="filter-content">
            {/* <div className="view-list">
              <span>view by</span>
              <ul className="tab-list">
                <li
                  role="tab"
                  className={`${
                    tableDataTypeLevel === 'province' ? 'active' : ''
                  }`}
                  onClick={() => {
                    this.toggleDataState('province');
                  }}
                  onKeyPress={() => {
                    this.toggleDataState('province');
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
                    this.toggleDataState('district');
                  }}
                  onKeyPress={() => {
                    this.toggleDataState('district');
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
                    this.toggleDataState('municipality');
                  }}
                  onKeyPress={() => {
                    this.toggleDataState('municipality');
                  }}
                >
                  <a href="#">Municipality</a>
                </li>
              </ul>
            </div> */}
            <div className="filter-row">
              <div className="filter-list">
                {/* <DropdownCheckbox /> */}
                <div
                  className="select-dropdown"
                  id="filter_dropdown_province_table"
                  tooltip={
                    tableSelectedProvinceName.length === 0
                      ? ''
                      : `${
                          tableSelectedProvinceName.length ===
                          allProvinceName.length
                            ? 'All'
                            : tableSelectedProvinceName
                        }`
                  }
                  flow="up"
                >
                  <span
                    className={`span-label ${
                      tableProvinceDropdown ? 'span-active' : ''
                    } `}
                    onClick={this.handleProvinceDropdown}
                    onKeyDown={this.handleProvinceDropdown}
                    role="tab"
                    tabIndex="0"
                    style={
                      tableDataTypeLevel === 'province' ||
                      tableDataTypeLevel === 'district'
                        ? { display: 'none' }
                        : { display: 'block' }
                    }
                  >
                    {tableSelectedProvinceName.length === 0
                      ? 'Select Province'
                      : `${
                          tableSelectedProvinceName.length ===
                          allProvinceName.length
                            ? 'All'
                            : tableSelectedProvinceName
                        }`}
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
                                data.code,
                              )}
                              onClick={() => {
                                this.handleProvinceSingleClick(
                                  data.code,
                                  data.id,
                                  data.name,
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
                  tooltip={
                    tableSelectedDistrictName.length === 0
                      ? ''
                      : `${
                          tableSelectedDistrictName.length ===
                          allDistrictName.length
                            ? 'All'
                            : tableSelectedDistrictName
                        }`
                  }
                  flow="up"
                >
                  <Loading loaderState={isLoading} />

                  <span
                    className={`span-label ${
                      tableDistrictDropdown ? 'span-active' : ''
                    } `}
                  >
                    {tableSelectedDistrictName.length === 0
                      ? 'Select District'
                      : `${
                          tableSelectedDistrictName.length ===
                          allDistrictName.length
                            ? 'All'
                            : tableSelectedDistrictName
                        }`}
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
                                data.code,
                              )}
                              onClick={() => {
                                this.handleDistrictSingleClick(
                                  data.id,
                                  data.code,
                                  data.name,
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
                    {tableSelectedMunicipalityName.length === 0
                      ? 'Select Municipality'
                      : `${
                          tableSelectedMunicipalityName.length ===
                          allMunicipalityName.length
                            ? 'All'
                            : tableSelectedMunicipalityName
                        }`}
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
                              checked={tableSelectedMunicipalityDropdown.includes(
                                data.code,
                              )}
                              onClick={() => {
                                this.handleMunicipalitySingleClick(
                                  data.id,
                                  data.code,
                                  data.name,
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
                  id="btnExport"
                  type="button"
                  onClick={this.exportTableToExcel}
                  className="common-button is-border"
                >
                  EXPORT
                </button>
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
            <table className="table" id="table_id">
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
                automationTableData.length < 1 ? (
                  <div>
                    <h3>No Data</h3>
                  </div>
                ) : (
                  automationTableData.map(data => {
                    let initials = data.partner.match(/\b\w/g) || [];
                    initials = (
                      (initials.shift() || '') +
                      (initials.pop() || '')
                    ).toUpperCase();
                    return (
                      <tr key={data.id}>
                        <td>
                          <b>{data.branch}</b>
                        </td>
                        <td>
                          <div className="organization">
                            <div className="organization-icon is-yellow">
                              <span>{initials}</span>
                            </div>
                            <div className="organization-content">
                              <b>{data.partner}</b>
                            </div>
                          </div>
                        </td>
                        <td>{data.province}</td>
                        <td>{data.district}</td>
                        <td>{data.municipality}</td>
                        <td>
                          <b className="deployed">{data.tablets}</b>
                        </td>
                      </tr>
                    );
                  })
                )
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
