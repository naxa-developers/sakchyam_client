import React, { Component } from 'react';

class DropdownCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="select-dropdown" id="filter_dropdown">
        <span className="span-label span-active">Time period</span>
        <ul className="select-list active" id="dropdown-list">
          <li className="checkbox">
            <input type="checkbox" id="check_time5" />
            <label htmlFor="check_time5">
              <i className="icon-ok-2" />
              Select Province1
            </label>
          </li>
          <li className="checkbox">
            <input type="checkbox" id="check_time6" />
            <label htmlFor="check_time6">
              <i className="icon-ok-2" />
              Select Province2
            </label>
          </li>
          <li className="checkbox">
            <input type="checkbox" id="check_time7" />
            <label htmlFor="check_time7">
              <i className="icon-ok-2" />
              Select Province3
            </label>
          </li>
          <li className="checkbox">
            <input type="checkbox" id="check_time8" />
            <label htmlFor="check_time8">
              <i className="icon-ok-2" />
              Select Province4
            </label>
          </li>
        </ul>
      </div>
    );
  }
}

export default DropdownCheckbox;
