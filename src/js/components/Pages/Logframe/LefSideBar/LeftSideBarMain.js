/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIndicatorsCategory } from '../../../../actions/logFrame.actions';

let dateArray = [];

class LeftSidebarMain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleYear = e => {
    // push uniques
    if (dateArray.indexOf(e) === -1) {
      dateArray.push(e);
    } else {
      dateArray = dateArray.filter(f => f !== e);
    }
  };

  componentDidMount() {
    this.props.getIndicatorsCategory();
    const {
      logFrameReducer: { indicatorCategory },
    } = this.props;
    const b = [];
    const a = indicatorCategory.map(data => {
      data.subcat.map(subdata => {
        //
        return b.push(subdata.name);
      });
      return true;
    });
    //
  }

  render() {
    // const arraylist = [];

    // const { activeIndicator } = this.state;
    const {
      handleActiveLayer,
      handleActiveDate,
      activeLayer,
      dateRange,
      activeDate,
      activeListItem,
      handleActiveListItem,
      activeListFilteredData,
      backNavigationClick,
      handleSubCatClick,
    } = this.props;
    const {
      props: {
        logFrameReducer,
        handleActiveIndicator,
        activeIndicator,
      },
    } = this;
    return (
      <div className="sidebar" id="sidebar-toggle">
        <ul
          className="sidebar-li"
          style={
            activeListItem
              ? { display: 'none' }
              : { display: 'block' }
          }
        >
          <h5>Logical framework</h5>
          {logFrameReducer.indicatorCategory.map(data => {
            return (
              // Number 1 change
              <li
                className={
                  activeIndicator === data.name ? 'active' : ''
                }
                role="tab"
                onClick={() => handleActiveListItem(data.name)}
                onKeyPress={() => handleActiveListItem(data.name)}
              >
                <div className="li-wrap">
                  <a>{data.name}</a>
                  <p>{data.title}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <div
          className="more-content"
          style={
            activeListItem
              ? { display: 'block' }
              : { display: 'none' }
          }
        >
          <a
            onClick={backNavigationClick}
            onKeyDown={backNavigationClick}
            tabIndex="0"
            role="tab"
            className="previous-nav"
          >
            <i className="material-icons">keyboard_arrow_left</i>
            Back
          </a>
          {activeListFilteredData && activeListFilteredData[0] && (
            <div className="info-list" id="output2">
              <div className="li-heading">
                <span>{activeListFilteredData[0].name}</span>
                <p>{activeListFilteredData[0].title}</p>
              </div>
              <ul>
                {activeListFilteredData[0].subcat.map(data => {
                  // const regex = /[+-]?\d+(?:\.\d+)?/g;
                  // const indicatorNumber = regex.exec(data.name)[0];
                  const indicatorNumber =
                    data.name.includes('Indicator') &&
                    data.name.split('Indicator')[1].split(' ')[1];
                  return (
                    <li
                      className={
                        data.name === activeLayer ? 'active' : ''
                      }
                      role="tab"
                      onClick={() => handleSubCatClick(data.name)}
                      onKeyPress={() => handleSubCatClick(data.name)}
                    >
                      <a>
                        {indicatorNumber}: {data.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
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
