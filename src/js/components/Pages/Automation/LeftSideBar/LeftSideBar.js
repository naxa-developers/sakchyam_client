import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      automationDataByPartner,
      dataLoading,
    } = this.props.automationReducer;
    const {
      activeClickPartners,
      handleActiveClickPartners,
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
                  className="form-control"
                  placeholder="search"
                />
              </div>
              <div className="inline-group">
                <b>Outreach</b>
                <label className="switch">
                  <input type="checkbox" value="" />
                  <span className="slider" />
                </label>
              </div>
            </div>
          </div>
          <div className="aside-body">
            <ul className="table-ranking-list">
              {automationDataByPartner &&
                automationDataByPartner.map(data => {
                  let initials = data.name.match(/\b\w/g) || [];
                  initials = (
                    (initials.shift() || '') + (initials.pop() || '')
                  ).toUpperCase();
                  // console.log(data, 'data');
                  return (
                    <li
                      role="tab"
                      className={
                        activeClickPartners.includes(data.name)
                          ? 'active'
                          : ''
                      }
                      onClick={() => {
                        handleActiveClickPartners(data.name);
                      }}
                      onKeyPress={() => {
                        handleActiveClickPartners(data.name);
                      }}
                    >
                      <div className="organization-icon is-green">
                        <span>{initials}</span>
                      </div>
                      <div className="organization-content">
                        <h5>{data.name}</h5>
                        <div className="icon-list">
                          <div className="icons">
                            <i className="material-icons">
                              tablet_mac
                            </i>
                            <b>335</b>
                          </div>
                          <div className="icons">
                            <i className="material-icons">business</i>
                            <b>33</b>
                          </div>
                          <div className="icons">
                            <i className="material-icons">people</i>
                            <b>23</b>
                          </div>
                        </div>
                        <div className="orgnization-info">
                          <a href="#">
                            Province
                            <span>2</span>
                          </a>
                          <a href="#">
                            District
                            <span>22</span>
                          </a>
                          <a href="#">
                            Local units
                            <span>16</span>
                          </a>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
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
