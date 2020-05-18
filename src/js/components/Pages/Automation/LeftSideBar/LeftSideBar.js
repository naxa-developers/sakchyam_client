import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeftSideAutomationLoader from '../../../common/SkeletonLoading';

function getClassName(i) {
  if (i % 3 === 0) return 'is-red';
  if (i % 3 === 1) return 'is-yellow';
  return 'is-green';
}
class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      automationLeftSidePartnerData,
      dataLoading,
    } = this.props.automationReducer;
    // const a =
    //   automationDataByPartner &&
    //   automationDataByPartner.filter(data => {
    //     return data.name.includes('Ch');
    //   });
    // console.log(a);
    const {
      activeClickPartners,
      handleActiveClickPartners,
      activeOutreachButton,
      toggleOutreachButton,
      searchText,
      handleSearchTextChange,
    } = this.props;
    return (
      <aside className="sidebar left-sidebar">
        <div className="sidebar-in">
          <div className="aside-header">
            <button type="button" className="common-button is-bg">
              Automation (Tablet Banking)
            </button>
            <div className="search-bar">
              <div className="search-wrap">
                <span className="search-icon">
                  <i className="material-icons">search</i>
                </span>
                <input
                  type="search"
                  value={searchText}
                  onChange={e => {
                    handleSearchTextChange(e);
                  }}
                  className="form-control"
                  placeholder="search"
                />
              </div>
              <div className="inline-group">
                <b>Outreach</b>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={activeOutreachButton}
                    onClick={toggleOutreachButton}
                  />
                  <span className="slider" />
                </label>
              </div>
            </div>
          </div>
          <div className="aside-body">
            {dataLoading ? (
              <LeftSideAutomationLoader />
            ) : (
              <ul className="table-ranking-list">
                {automationLeftSidePartnerData &&
                  automationLeftSidePartnerData.map((data, i) => {
                    let initials =
                      data.partner_name.match(/\b\w/g) || [];
                    initials = (
                      (initials.shift() || '') +
                      (initials.pop() || '')
                    ).toUpperCase();
                    // console.log(data, 'data');
                    return (
                      <li
                        role="tab"
                        className={
                          activeClickPartners.includes(
                            data.partner_name,
                          )
                            ? 'active'
                            : ''
                        }
                        onClick={() => {
                          handleActiveClickPartners(
                            data.partner_name,
                          );
                        }}
                        onKeyPress={() => {
                          handleActiveClickPartners(
                            data.partner_name,
                          );
                        }}
                      >
                        <div
                          className={`organization-icon ${getClassName(
                            i,
                          )}`}
                        >
                          <span>{initials}</span>
                        </div>
                        <div className="organization-content">
                          <h5>{data.partner_name}</h5>
                          <div className="icon-list">
                            <div className="icons">
                              <i className="material-icons">
                                tablet_mac
                              </i>
                              <b>{data.tablets_deployed}</b>
                            </div>
                            <div className="icons">
                              <i className="material-icons">
                                business
                              </i>
                              <b>{data.branch}</b>
                            </div>
                            <div className="icons">
                              <i className="material-icons">people</i>
                              <b>{data.beneficiary}</b>
                            </div>
                          </div>
                          <div className="orgnization-info">
                            <a href="#">
                              Province
                              <span>{data.province_covered}</span>
                            </a>
                            <a href="#">
                              District
                              <span>{data.district_covered}</span>
                            </a>
                            <a href="#">
                              Local units
                              <span>{data.municipality_covered}</span>
                            </a>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = ({ automationReducer }) => ({
  automationReducer,
});
export default connect(mapStateToProps, {})(LeftSideBar);
