/* eslint-disable lines-between-class-members */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckBox from '../../../common/Checkbox';

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      innovationArea,
      productCategory,
      productName,
      partnerType,
      partnerInstitution,
      marketFailure,

      handleInnovationAreaCheckbox,
    } = this.props;

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
                        onClick={handleInnovationAreaCheckbox}
                      />
                      <label htmlFor="all_partner">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    {productCategory &&
                      productCategory.map((item, index) => {
                        return (
                          <CheckBox
                            id={index}
                            className="investment_checkbox"
                            // key={index}
                            label={item}
                            name={item}
                            changeHandler={
                              handleInnovationAreaCheckbox
                            }
                            // checked={investmentFocusSelection.includes(
                            //   partnershipFocus.investment_primary,
                            // )}
                          />
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="sidebar-widget partner-institue">
              <h6 className="title">Product Category</h6>
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
                    {innovationArea &&
                      innovationArea.map((item, index) => {
                        return (
                          <CheckBox
                            id={index}
                            className="investment_checkbox"
                            // key={index}
                            label={item}
                            name={item}
                            // changeHandler={
                            //   handleInvestmentFocusCheckbox
                            // }
                            // checked={investmentFocusSelection.includes(
                            //   partnershipFocus.investment_primary,
                            // )}
                          />
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="sidebar-widget partner-institue">
              <h6 className="title">Product Name</h6>
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
                    {productName &&
                      productName.map((item, index) => {
                        return (
                          <CheckBox
                            id={index}
                            className="investment_checkbox"
                            // key={index}
                            label={item}
                            name={item}
                            // changeHandler={
                            //   handleInvestmentFocusCheckbox
                            // }
                            // checked={investmentFocusSelection.includes(
                            //   partnershipFocus.investment_primary,
                            // )}
                          />
                        );
                      })}
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

            <div className="sidebar-widget partner-institue">
              <h6 className="title">Partner Institution</h6>
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
                    {partnerInstitution &&
                      partnerInstitution.map((item, index) => {
                        return (
                          <CheckBox
                            id={index}
                            className="investment_checkbox"
                            // key={index}
                            label={item}
                            name={item}
                            // changeHandler={
                            //   handleInvestmentFocusCheckbox
                            // }
                            // checked={investmentFocusSelection.includes(
                            //   partnershipFocus.investment_primary,
                            // )}
                          />
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="sidebar-widget partner-institue">
              <h6 className="title">Market Failures</h6>
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
                    {marketFailure &&
                      marketFailure.map((item, index) => {
                        return (
                          <CheckBox
                            id={index}
                            className="investment_checkbox"
                            // key={index}
                            label={item}
                            name={item}
                            // changeHandler={
                            //   handleInvestmentFocusCheckbox
                            // }
                            // checked={investmentFocusSelection.includes(
                            //   partnershipFocus.investment_primary,
                            // )}
                          />
                        );
                      })}
                  </ul>
                </div>
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
