import React, { Component } from 'react';

class LeftSidebarMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndicator: 'Output',
    };
  }

  handleIndicators = data => {
    this.setState({ activeIndicator: data });
  };

  render() {
    const { activeIndicator } = this.state;
    return (
      <div className="sidebar">
        <ul className="sidebar-li">
          <h2>Indicators</h2>
          <li
            role="tab"
            className="li-dropdown"
            value="Input"
            onClick={() => {
              this.handleIndicators('Input');
            }}
            onKeyDown={() => {
              this.handleIndicators('Input');
            }}
          >
            Input
            <span className="tooltip-list">
              Sustainable improvements in the livelihoods of poor
              people
            </span>
            <ul
              className={`sidebar-sublist ${
                activeIndicator === 'Input' ? 'active-li' : 'false'
              }`}
            >
              <li>
                <a href="#foo">Input1</a>
              </li>
              <li>
                <a href="#foo">Input2</a>
              </li>
              <li>
                <a href="#foo">Input3</a>
              </li>
              <li>
                <a href="#foo">Input4</a>
              </li>
            </ul>
          </li>
          <li
            role="tab"
            className="li-dropdown"
            value="Output"
            onClick={() => {
              this.handleIndicators('Output');
            }}
            onKeyDown={() => {
              this.handleIndicators('Output');
            }}
          >
            Output
            <span className="tooltip-list">
              Sustainable improvements in the livelihoods of poor
              people
            </span>
            <ul
              className={`sidebar-sublist ${
                activeIndicator === 'Output' ? 'active-li' : 'false'
              }`}
            >
              <li>
                <a href="#foo">Output1</a>
              </li>
              <li>
                <a href="#foo">Output2</a>
              </li>
              <li>
                <a href="#foo">Output3</a>
              </li>
              <li>
                <a href="#foo">Output4</a>
              </li>
            </ul>
          </li>
          <li
            role="tab"
            className="li-dropdown"
            onClick={() => {
              this.handleIndicators('Outcome');
            }}
            onKeyDown={() => {
              this.handleIndicators('Outcome');
            }}
          >
            Outcome
            <span className="tooltip-list">
              Sustainable improvements in the livelihoods of poor
              people
            </span>
            <ul
              className={`sidebar-sublist ${
                activeIndicator === 'Outcome' ? 'active-li' : 'false'
              }`}
            >
              <li>
                <a href="#foo">Outcome1</a>
              </li>
              <li>
                <a href="#foo">Outcome2</a>
              </li>
              <li>
                <a href="#foo">Outcome3</a>
              </li>
              <li>
                <a href="#foo">Outcome4</a>
              </li>
            </ul>
          </li>
          <li
            role="tab"
            className="li-dropdown"
            value="Impact"
            onClick={() => {
              this.handleIndicators('Impact');
            }}
            onKeyDown={() => {
              this.handleIndicators('Impact');
            }}
          >
            Impact
            <span className="tooltip-list">
              Sustainable improvements in the livelihoods of poor
              people
            </span>
            <ul
              className={`sidebar-sublist ${
                activeIndicator === 'Impact' ? 'active-li' : 'false'
              }`}
            >
              <li>
                <a href="#foo">Impact1</a>
              </li>
              <li>
                <a href="#foo">Impact2</a>
              </li>
              <li>
                <a href="#foo">Impact3</a>
              </li>
              <li>
                <a href="#foo">Impact4</a>
              </li>
            </ul>
          </li>
        </ul>

        <ul className="date-list">
          <h2>Time period</h2>
          <li>
            <span>Year 1</span>
            Dec 14 - Aug 15
          </li>
          <li>
            <span>Year 2</span>
            Dec 15- Aug 16
          </li>
          <li>
            <span>Year 3</span>
            Dec 16 - Aug 17
          </li>
          <li>
            <span>Year 4</span>
            Dec 17 - Aug 18
          </li>
          <li>
            <span>Year 5</span>
            Dec 18 - Aug 19
          </li>
        </ul>
      </div>
    );
  }
}

export default LeftSidebarMain;
