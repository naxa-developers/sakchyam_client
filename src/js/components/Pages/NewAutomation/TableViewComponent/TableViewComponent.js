/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from '../../../common/Select/Select';
import {
  getBranchesTableDataByFed,
  getBranchesTableData,
  getDistrictDataFromProvince,
  getMunicipalityDataFromDistrict,
} from '../../../../actions/automation.actions';
import TableViewSkeleton from '../../../common/TableViewSkeleton';
import Loading from '../../../common/Loading';
import {
  provinceLists,
  districtLists,
  municipalityLists,
  districtListByProvince,
  muniByDistrict,
} from '../../../common/adminList';

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
      provinceListT: provinceLists(),
      districtListT: districtLists(),
      municipalityListT: municipalityLists(),
      selectedProvinceT: '',
      selectedDistrictT: null,
      selectedMunicipalityT: null,
      tableDataTypeLevel: 'municipality',

      isLoading: false,
    };
  }

  componentDidMount() {}

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
      provinceListT,
      districtListT,
      municipalityListT,
      tableDataTypeLevel,
    } = this.state;
    const {
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
              style={{ cursor: 'pointer' }}
            >
              View on map
            </a>
          </div>

          <div className="filter-content">
            <div className="filter-row">
              <div className="filter-list">
                <div className="form-group">
                  <Select
                    idValue="table_view"
                    withCheckbox
                    name="Select Province Table"
                    options={provinceListT && provinceListT}
                    onChange={selected => {
                      console.log('selected option', selected);
                      this.setState({
                        selectedProvinceT: selected,
                      });
                      // eslint-disable-next-line react/jsx-curly-newline
                    }}
                  />
                </div>
                {tableDataTypeLevel === 'municipality' ||
                tableDataTypeLevel === 'district' ? (
                  <div className="form-group">
                    <Select
                      idValue="table_view"
                      withCheckbox
                      name="Select District Table"
                      options={districtListT && districtListT}
                      onChange={selectedOptions => {
                        this.setState({
                          selectedDistrictT: selectedOptions,
                        });
                        // eslint-disable-next-line react/jsx-curly-newline
                      }}
                    />
                  </div>
                ) : null}
                {tableDataTypeLevel === 'municipality' && (
                  <div className="form-group">
                    <Select
                      idValue="table_view"
                      withCheckbox
                      name="Select Municipality Table"
                      options={municipalityListT && municipalityListT}
                      onChange={selectedOptions => {
                        this.setState({
                          selectedMunicipalityT: selectedOptions,
                        });
                        // eslint-disable-next-line react/jsx-curly-newline
                      }}
                    />
                  </div>
                )}
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
