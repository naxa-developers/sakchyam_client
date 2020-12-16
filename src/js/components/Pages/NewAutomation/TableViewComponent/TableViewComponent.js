/* eslint-disable react/no-did-update-set-state */
/* eslint-disable prefer-const */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from '../../../common/Select/Select';
import {
  getBranchesTableDataByFed,
  getBranchesTableData,
  getTableDataByPartnerSelect,
} from '../../../../actions/automation.actions';
import TableViewSkeleton from '../../../common/TableViewSkeleton';

import {
  provinceLists,
  districtLists,
  municipalityLists,
  districtListByProvince,
  muniByDistrict,
} from '../../../common/adminList';
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
      provinceListT: provinceLists(),
      districtListT: districtLists(),
      municipalityListT: municipalityLists(),
      selectedProvinceT: [],
      selectedDistrictT: [],
      selectedMunicipalityT: [],
      tableDataTypeLevel: 'municipality',
      isLoading: false,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const { selectedProvinceT, selectedDistrictT } = this.state;

    const { activeClickPartners, automationReducer } = this.props;

    if (prevState.selectedProvinceT !== selectedProvinceT) {
      // let districts;
      // if (
      //   (selectedProvinceT[0] &&
      //     selectedProvinceT[0].value === 'all') ||
      //   selectedProvinceT.length === 0
      // ) {
      //   districts = districtLists();
      // } else {
      //   districts = districtListByProvince(
      //     selectedProvinceT,
      //     districtListT,
      //   );
      // }
      // this.setState({
      //   selectedDistrictT: '',
      //   selectedMunicipalityT: '',
      //   districtListT: districts,
      // });
    }

    if (prevState.selectedDistrictT !== selectedDistrictT) {
      // let municipality;
      // if (
      //   (selectedDistrictT &&
      //     selectedDistrictT[0] &&
      //     selectedDistrictT[0].value === 'all') ||
      //   selectedDistrictT.length === 0
      // ) {
      //   municipality = municipalityLists();
      // } else {
      //   municipality = muniByDistrict(
      //     selectedDistrictT,
      //     municipalityListT,
      //   );
      // }
      // this.setState({
      //   selectedMunicipalityT: '',
      //   municipalityListT: municipality,
      // });
    }
  }

  applyClickForPartnerFilter = () => {
    this.props.handleStateLevel();
    // const { activeClickPartners } = this.props;
    // const {
    //   selectedProvinceT,
    //   selectedDistrictT,
    //   selectedMunicipalityT,
    // } = this.state;
    // let provinceCodes = [];
    // let muniCodes = [];
    // let districtCodes = [];

    // const condition =
    //   selectedDistrictT.length > 0 ||
    //   selectedProvinceT.length > 0 ||
    //   selectedMunicipalityT.length > 0;

    // if (selectedProvinceT.length > 0) {
    //   provinceCodes = this.getCodes(selectedProvinceT);
    // }

    // if (selectedDistrictT.length > 0) {
    //   districtCodes = this.getCodes(selectedDistrictT);
    // }

    // if (selectedMunicipalityT.length > 0) {
    //   muniCodes = this.getCodes(selectedMunicipalityT);
    // }

    // if (condition) {
    //   this.props.getBranchesTableDataByFed(
    //     {
    //       municipality: muniCodes,
    //       district: districtCodes,
    //       province: provinceCodes,
    //     },
    //     activeClickPartners,
    //   );
    // }
  };

  getCodes = array => {
    // let filteredList = array;
    // if (array[0].value === 'all') {
    //   filteredList = array.filter(item => item.value !== 'all');
    // }
    // const codeList = filteredList.map(item => item.code);
    // return codeList;
  };

  handleResetButtonForFilter = () => {
    // this.setState({
    //   provinceListT: provinceLists(),
    //   districtListT: districtLists(),
    //   municipalityListT: municipalityLists(),
    //   selectedProvinceT: '',
    //   selectedDistrictT: [],
    //   selectedMunicipalityT: [],
    // });
    // const { activeClickPartners } = this.props;
    // if (activeClickPartners) {
    //   this.props.getTableDataByPartnerSelect(activeClickPartners);
    // } else {
    //   this.props.getBranchesTableData();
    // }
  };

  exportTableToExcel = () => {
    // let downloadLink;
    const dataType = 'application/vnd.ms-excel';
    const tableSelect = document.getElementById('table_id');
    const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    const FullDate = new Date();
    const date = `${FullDate.getFullYear()}/${FullDate.getDay()}/${FullDate.getMonth()}`;
    //
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
      tableDataTypeLevel,
      selectedProvinceT,
      selectedDistrictT,
      selectedMunicipalityT,
    } = this.state;

    const {
      provinceList,
      municipalityList,
      districtList,
    } = this.props;
    const { automationTableData } = this.props.automationReducer;
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
              style={{
                fontSize: '.8125rem',
                color: 'white',
                backgroundColor: '#F4A535',
                borderColor: '#F4A535',
                padding: ' .25rem 1rem',
                cursor: 'pointer',
                borderRadius: '5px',
              }}
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
                    selectedItem={selectedProvinceT}
                    name="Select Province"
                    options={provinceList && provinceList}
                    onChange={selectedOptions => {
                      this.props.handleAdminSelects(
                        selectedOptions,
                        'province',
                      );
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
                      selectedItem={selectedDistrictT}
                      name="Select District"
                      options={districtList && districtList}
                      onChange={selectedOptions => {
                        this.props.handleAdminSelects(
                          selectedOptions,
                          'district',
                        );
                      }}
                    />
                  </div>
                ) : null}
                {tableDataTypeLevel === 'municipality' && (
                  <div className="form-group">
                    <Select
                      idValue="table_view"
                      withCheckbox
                      selectedItem={selectedMunicipalityT}
                      name="Select Municipality"
                      options={municipalityList && municipalityList}
                      onChange={selectedOptions => {
                        this.props.handleAdminSelects(
                          selectedOptions,
                          'municipality',
                        );
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
                  style={{
                    fontSize: '.8125rem',
                    color: 'white',
                    backgroundColor: '#F4A535',
                    borderColor: '#F4A535',
                    padding: ' .25rem 1rem',
                  }}
                >
                  EXPORT
                </button>
                <button
                  type="button"
                  className="common-button is-clear"
                  onClick={this.props.refreshSelectedPartnerBtn}
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
          <div
            className="table-responsive automation-table"
            id="view_automation_table"
          >
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
  getTableDataByPartnerSelect,
  getBranchesTableData,
})(TableViewComponent);
