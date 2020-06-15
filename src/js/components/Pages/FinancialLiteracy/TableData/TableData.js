import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSearchedDataOnTable } from '../../../../actions/financial.actions';

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
    const { searchKeyword } = this.state;
    if (prevState.searchKeyword !== searchKeyword) {
      // console.log(this.state.searchKeyword, 'keyword');
      this.props.getSearchedDataOnTable(searchKeyword);
    }
  }

  sortTable = n => {
    // let table;
    let rows;
    let switching;
    let i;
    let x;
    let y;
    let shouldSwitch;
    let dir;
    let switchcount = 0;
    const table = document.getElementById('financial_table');
    switching = true;
    // Set the sorting direction to ascending:
    dir = 'asc';
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < rows.length - 1; i += 1) {
        // start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName('TD')[n];
        y = rows[i + 1].getElementsByTagName('TD')[n];
        /* check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir === 'asc') {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir === 'desc') {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir === 'first') {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            // if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount += 1;
      } else if (switchcount === 0 && dir === 'asc') {
        dir = 'desc';
        switching = true;
      } else if (switchcount === 1 && dir === 'first') {
        dir = 'first';
        switching = true;
      }
      /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
    }
  };

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
      filteredTableData,
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
                    <th
                      onClick={() => {
                        this.sortTable(0);
                      }}
                    >
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
                            <th
                              onClick={() => {
                                this.sortTable(1);
                              }}
                            >
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
                  {filteredTableData &&
                    filteredTableData.map(data => {
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
export default connect(mapStateToProps, { getSearchedDataOnTable })(
  TableData,
);
