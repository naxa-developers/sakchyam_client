import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIndicatorsCategory } from '../../actions/logFrame.actions';

let dateArray = [];

class LeftSidebarMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndicator: 'IMPACT',
      // activeLayer: 'Output',
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
    this.props.getIndicatorsCategory();
    // const that = this;
    // fetch('https://sakchyam.naxa.com.np/api/v1/log-category')
    //   .then(function(response) {
    //     if (response.status !== 200) {
    //       // console.log(
    //       //   `Looks like there was a problem. Status Code: ${response.status}`,
    //       // );
    //       return;
    //     }
    //     // Examine the text in the response
    //     response.json().then(function(data) {
    //       // console.log(data, 'data');
    //       that.setState({ listOfSubCategory: data });
    //     });
    //   })
    //   .catch(function(err) {
    //     return err;
    //     // console.error(err);
    //     // console.log('Fetch Error :-S', err);
    //   });
  }

  render() {
    // const arraylist = [];

    const { activeIndicator } = this.state;
    const {
      handleActiveLayer,
      handleActiveDate,
      activeLayer,
      dateRange,
      activeDate,
    } = this.props;
    const {
      props: { logFrameReducer },
    } = this;
    // console.log(this.props, 'incid');
    // const a =
    //   listOfSubCategory &&
    //   listOfSubCategory.map(data => {
    //     data.subcat.map(subdata => {
    //       return arraylist.push(subdata.name);
    //     });
    //   });
    // console.log(arraylist, 'arrrrr');
    return (
      <div className="sidebar" id="sidebar-toggle">
        <ul className="sidebar-li">
          <h2>Indicators</h2>

          {logFrameReducer.indicatorCategory.map(data => {
            console.log(data, 'data');
            return (
              <li
                role="tab"
                className={`${
                  activeIndicator === data.name ? 'active' : ''
                }`}
                value={data.name}
                onClick={() => {
                  this.handleIndicators(data.name);
                }}
                onKeyDown={() => {
                  this.handleIndicators(data.name);
                }}
              >
                <a href="#/">
                  {/* <ReactTooltip /> */}
                  {data.name}
                  <span className="tooltip-list">{data.title}</span>
                </a>
                <ul
                  className={`sidebar-sublist ${
                    activeIndicator === data.name
                      ? 'active-li'
                      : 'false'
                  }`}
                >
                  {data.subcat.map(el => {
                    return (
                      <li
                        className={
                          activeLayer === el.name
                            ? 'active-sublist'
                            : ''
                        }
                      >
                        <a
                          role="button"
                          tabIndex="0"
                          className={el.name.split(' ').join('')}
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

        {/* <ul className="date-list">
          <h2>Time period</h2>
          {dateRange.map(d => {
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
              </li>
            );
          })}
        </ul> */}
      </div>
    );
  }
}
const mapStateToProps = ({ logFrameReducer }) => ({
  logFrameReducer,
});
export default connect(mapStateToProps, { getIndicatorsCategory })(
  LeftSidebarMain,
);
