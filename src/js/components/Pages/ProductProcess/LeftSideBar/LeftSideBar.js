/* eslint-disable lines-between-class-members */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <aside className="sidebar left-sidebar literacy-sidebar">
        <div className="sidebar-in">
          <div className="aside-header">
            <button type="button" className="common-button is-bg">
              Product/Process Innovations
            </button>
          </div>
          <div className="aside-body">
            <div className="sidebar-widget partner-institue">
              <h6 className="title">Innovation Area</h6>
              <div className="widget-body">
                <div className="checklist-group">
                  <div className="checklist-header">
                    <div className="custom-checkbox">
                      <input
                        id="all_partner"
                        type="checkbox"
                        name="Initiative"
                        // checked={isAllPartnerSelected}
                        // onClick={handlePartnerParentCheckbox}
                      />
                      <label htmlFor="all_partner">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    {/* {filteredPartnersList &&
                      filteredPartnersList.map(data => {
                        return (
                          <li key={data.id}>
                            <a>
                              <div className="custom-checkbox">
                                <input
                                  id={data.partner_id}
                                  className="partner_checkbox"
                                  type="checkbox"
                                  name={data.partner_name}
                                  onClick={handlePartnerChange}
                                />
                                <label htmlFor={data.partner_id}>
                                  <span>{data.partner_name}</span>
                                </label>
                              </div>
                            </a>
                          </li>
                        );
                      })} */}
                  </ul>
                </div>
              </div>
            </div>

            <div className="sidebar-widget">
              <h6 className="title">Partner Type</h6>
              <div className="widget-body">
                <div className="widget-tag partner-tag">
                  <a
                  // onClick={() => {
                  // handlePartnerType('Microfinance Institutions');
                  // }}
                  // onKeyDown={() => {
                  // handlePartnerType('Microfinance Institutions');
                  // }}
                  // className={}
                  // partnerType.includes(
                  //   'Microfinance Institutions',
                  // )
                  //   ? 'active'
                  //   : ''

                  // }
                  // role="tab"
                  // tabIndex="0"
                  >
                    <span>Microfinance</span>
                  </a>
                  <a
                  // onClick={() => {
                  //   handlePartnerType(
                  //     'Commercial Bank and Other Partners',
                  //   );
                  // }}
                  // onKeyDown={() => {
                  //   handlePartnerType(
                  //     'Commercial Bank and Other Partners',
                  //   );
                  // }}
                  // className={
                  //   partnerType.includes(
                  //     'Commercial Bank and Other Partners',
                  //   )
                  //     ? 'active'
                  //     : ''
                  // }
                  // tabIndex="0"
                  // role="tab"
                  >
                    <span>Commercial Bank / Other Partners</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="sidebar-widget">
              <h6 className="title">Financial Literacy Initiative</h6>
              <div className="widget-body">
                <div className="widget-tag Program-tag" />
              </div>
            </div>
            <div className="apply-buttons buttons end">
              <button
                // onClick={resetClick}
                type="button"
                className="common-button is-clear "
              >
                reset
              </button>
              <button
                // onClick={applyClick}
                type="button"
                className="common-button is-bg"
              >
                apply
              </button>
            </div>
          </div>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeftSideBar);
