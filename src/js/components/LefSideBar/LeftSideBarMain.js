import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

let dateArray = [];

class LeftSidebarMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndicator: 'Output',
      // activeLayer: 'Output',
      listOfSubCategory: [],
    };
  }

  handleIndicators = data => {
    this.setState({ activeIndicator: data });
  };

  handleYear = e => {
    // push uniques
    if (dateArray.indexOf(e) === -1) {
      dateArray.push(e);
    } else {
      dateArray = dateArray.filter(f => f !== e);
    }
  };

  componentDidMount() {
    // sakchyam.naxa.com.np/api/v1/log_category
    const that = this;
    fetch('https://sakchyam.naxa.com.np/api/v1/log-category')
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            `Looks like there was a problem. Status Code: ${response.status}`,
          );
          return;
        }
        // Examine the text in the response
        response.json().then(function(data) {
          // console.log(data, 'data');
          that.setState({ listOfSubCategory: data });
        });
      })
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
  }

  render() {
    const { activeIndicator, listOfSubCategory } = this.state;
    const {
      handleActiveLayer,
      handleActiveDate,
      dateRange,
      activeDate,
    } = this.props;
    return (
      <div className="sidebar">
        <ul className="sidebar-li">
          <h2>Indicators</h2>

          {listOfSubCategory.map(data => {
            return (
              <li
                role="tab"
                className="li-dropdown"
                value={data.name}
                onClick={() => {
                  this.handleIndicators(data.name);
                }}
                onKeyDown={() => {
                  this.handleIndicators(data.name);
                }}
              >
                {/* <ReactTooltip /> */}
                {data.name}
                <span className="tooltip-list">
                  <span className="text">
                    Sustainable improvements in the livelihoods of
                    poor people
                  </span>
                </span>
                <ul
                  className={`sidebar-sublist ${
                    activeIndicator === data.name
                      ? 'active-li'
                      : 'false'
                  }`}
                >
                  {data.subcat.map(el => {
                    return (
                      <li>
                        <a
                          role="button"
                          tabIndex="0"
                          onClick={() => {
                            handleActiveLayer(el.name);
                          }}
                          onKeyDown={() => {
                            handleActiveLayer(el.name);
                          }}
                        >
                          {el.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}

          {/* <li
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
          </li> */}
        </ul>

        <ul className="date-list">
          <h2>Time period</h2>
          {dateRange.map(d => {
            console.log(d);
            return (
              <li
                role="tab"
                className={
                  activeDate.includes(d.range) ? 'active' : ''
                }
                onClick={() => {
                  handleActiveDate(d.range);
                }}
                onKeyDown={() => {
                  handleActiveDate(d.range);
                }}
              >
                <span>{d.name}</span>
                {/* {d.range} */}
              </li>
            );
          })}
          <li>
            <a href="#" className="clear">
              Clear
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default LeftSidebarMain;
