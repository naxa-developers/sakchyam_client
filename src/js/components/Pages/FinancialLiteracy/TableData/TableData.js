import React, { Component } from 'react';
import { connect } from 'react-redux';

class TableData extends Component {
  constructor() {
    super();
    this.state = {
      searchKeyword: '',
    };
  }

  searchText = e => {
    this.setState({ searchKeyword: e.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchKeyword !== this.state.searchKeyword) {
      console.log(this.state.searchKeyword, 'keyword');
      const searched = this.props.financialReducer.allTableData.filter(
        data => {
          return data.partner_name
            .toUpperCase()
            .includes(this.state.searchKeyword);
        },
      );
    }
  }

  exportTableToExcel = () => {
    // let downloadLink;
    const dataType = 'application/vnd.ms-excel';
    const tableSelect = document.getElementById('financial_table');
    const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    const FullDate = new Date();
    const date = `${FullDate.getFullYear()}/${FullDate.getDay()}/${FullDate.getMonth()}`;
    // console.log(date, 'date');
    // Specify file name
    const filename = `financialData${date}.xls`;

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
    const { searchKeyword } = this.state;
    const {
      allTableData,
      financialProgram,
    } = this.props.financialReducer;
    const { activeSortBy, toggleSortBy } = this.props;
    return (
      <>
        <div className="table-card">
          <div className="table-card-header">
            <div className="filter-content">
              <div className="filter-row">
                <div className="filter-list">
                  {/* <strong>sort by</strong>
                  <div className="form-group">
                    <div className="select-dropdown" id="duration_id">
                      <select>
                        <option>Name</option>
                        <option>Name</option>
                        <option>Name</option>
                        <option>Name</option>
                      </select>
                      <span
                        role="tab"
                        tabIndex="0"
                        onClick={toggleSortBy}
                        onKeyDown={toggleSortBy}
                        className="span-label span-dropdown"
                      >
                        All
                      </span>
                      <ul
                        className={`select-list ${
                          activeSortBy === true ? 'active' : ''
                        }`}
                        id="dropdown-list"
                      >
                        <li className="checkbox">
                          <label htmlFor="check_time">
                            <i className="icon-ok-2" />
                            Name
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div> */}
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
                      onChange={this.searchText}
                    />
                  </div>
                  <div
                    role="button"
                    tabIndex="0"
                    onClick={this.exportTableToExcel}
                    onKeyDown={this.exportTableToExcel}
                    className="export-button"
                  >
                    <i className="material-icons">get_app</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="table-card-body">
            <div className="table-responsive automation-table">
              <table className="table" id="financial_table">
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
                    {financialProgram &&
                      financialProgram.map(programList => {
                        if (programList.total !== 0)
                          return (
                            <th>
                              <div className="table-head">
                                <span>{programList.name}</span>
                              </div>
                            </th>
                          );
                        return null;
                      })}
                    <th>
                      <div className="table-head">
                        <span>Total count</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr className="form-header active">
                    <td colSpan="8">
                      <h5>
                        <i className="material-icons">
                          arrow_drop_down
                        </i>
                        <span>Microfinance</span>
                      </h5>
                    </td>
                  </tr> */}
                  {allTableData &&
                    allTableData.map(data => {
                      data.names.sort(function(a, b) {
                        const nameA = a.program_id; // ignore upper and lowercase
                        const nameB = b.program_id; // ignore upper and lowercase
                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }

                        // names must be equal
                        return 0;
                      });
                      let initials =
                        data.partner_name.match(/\b\w/g) || [];
                      initials = (
                        (initials.shift() || '') +
                        (initials.pop() || '')
                      ).toUpperCase();
                      return (
                        <tr className="data">
                          <td>
                            <div className="organization">
                              <div className="organization-icon is-green">
                                <span>{initials}</span>
                              </div>
                              <div className="organization-content">
                                <b>{data.partner_name}</b>
                              </div>
                            </div>
                          </td>
                          {data.names.map(program => {
                            return <td>{program.value}</td>;
                          })}
                          <td>
                            <span className="total-count">
                              {' '}
                              {data.names[0].single_count}
                            </span>
                          </td>
                        </tr>
                      );
                    })}

                  {/* <tr className="data">
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
                      <span className="total-count"> 11,935</span>
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
                      <span className="total-count"> 11,935</span>
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
                      <span className="total-count"> 11,935</span>
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
                      <span className="total-count"> 11,935</span>
                    </td>
                  </tr> */}
                  {/* <tr className="form-header">
                    <td colSpan="8">
                      <h5>
                        <i className="material-icons">
                          arrow_drop_down
                        </i>
                        <span>Commercial Bank & Others</span>
                      </h5>
                    </td>
                  </tr> */}
                  {/* <tr className="data">
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
                      <span className="total-count"> 11,935</span>
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
                      <span className="total-count"> 11,935</span>
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
                      <span className="total-count"> 11,935</span>
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
                      <span className="total-count"> 11,935</span>
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
                      <span className="total-count"> 11,935</span>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ financialReducer }) => ({
  financialReducer,
});
export default connect(mapStateToProps, {})(TableData);
