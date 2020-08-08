/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckBox from '../../common/Checkbox';
import { removeDuplicates } from '../../common/utilFunctions';

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expansionList: '',
      fiList: '',
      partnerList: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { primaryData } = this.props.outreachReducer;

    if (prevProps.outreachReducer.primaryData !== primaryData) {
      const expList = primaryData.map(item => ({
        id: item.id,
        expansion_driven_by: item.expansion_driven_by,
      }));
      const expansionList = removeDuplicates(
        expList,
        'expansion_driven_by',
      );

      const finanList = primaryData.map(item => ({
        id: item.id,
        partner_type: item.partner_type,
      }));
      const fiList = removeDuplicates(finanList, 'partner_type');

      const partList = primaryData.map(item => ({
        id: item.id,
        partner: item.partner,
      }));
      const partnerList = removeDuplicates(partList, 'partner');

      this.setState({ expansionList, fiList, partnerList });
    }
  }

  render() {
    const {
      state: { expansionList, fiList, partnerList },
      props: {
        mapViewDataBy,
        partnerSelection,
        expsnsionSelection,
        handelExpansionCheckbox,
        handlePartnerSelectionCheckbox,
        handlePartnerParentCheckbox,
        handelExpansionParentCheckbox,
        G2PTypes,
        serviceType,
        handelMultiChoice,
        demonstrationType,
        applyBtnClick,
        resetFilters,
        isAllPartnerSelected,
        isAllInvestmentFocusSelected,
        institutionSelection,
        isAllInstitutionSelected,
        handleInstitutionParentCheckbox,
        handleInstitutionSelectionCheckbox,
      },
    } = this;
    return (
      <aside className="sidebar left-sidebar literacy-sidebar">
        <div className="sidebar-in">
          <div className="aside-header ">
            <button
              type="button"
              className="common-button is-bg partnership-button"
            >
              outreach expansion
            </button>
            {/* <div className="search-bar mb-10">
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
            </div> */}
          </div>
          {mapViewDataBy === 'general_outreach' && (
            <div className="aside-body outreach-body">
              <div className="sidebar-widget partner-institue">
                <h6 className="title">Expansion Driven by </h6>
                <div className="widget-body">
                  <div className="checklist-group">
                    <div className="checklist-header">
                      <div className="custom-checkbox">
                        <input
                          id="Initiative1"
                          type="checkbox"
                          name="Initiative1"
                          value="all"
                          onChange={handelExpansionParentCheckbox}
                          checked={isAllInvestmentFocusSelected}
                        />
                        <label htmlFor="Initiative1">All</label>
                      </div>
                    </div>
                    <ul className="checkbox-list">
                      {expansionList &&
                        expansionList.map(partnershipFocus => {
                          return (
                            <CheckBox
                              id={partnershipFocus.id}
                              className="investment_checkbox"
                              key={partnershipFocus.id}
                              label={
                                partnershipFocus.expansion_driven_by
                              }
                              name={
                                partnershipFocus.expansion_driven_by
                              }
                              changeHandler={handelExpansionCheckbox}
                              checked={expsnsionSelection.includes(
                                partnershipFocus.expansion_driven_by,
                              )}
                            />
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="sidebar-widget partner-institue"
                style={{ marginTop: '2vh' }}
              >
                <h6 className="title">Type of FI </h6>
                <div className="widget-body">
                  <div className="checklist-group">
                    <div className="checklist-header">
                      <div className="custom-checkbox">
                        <input
                          id="Initiative14"
                          type="checkbox"
                          name="Initiative14"
                          onChange={handlePartnerParentCheckbox}
                          checked={isAllPartnerSelected}
                        />
                        <label htmlFor="Initiative14">All</label>
                      </div>
                    </div>
                    <ul className="checkbox-list">
                      {fiList &&
                        fiList.map(partner => {
                          return (
                            <CheckBox
                              id={partner.id}
                              className="partner_checkbox"
                              key={partner.id}
                              label={partner.partner_type}
                              name={partner.partner_type}
                              changeHandler={
                                handlePartnerSelectionCheckbox
                              }
                              checked={partnerSelection.includes(
                                partner.partner_type,
                              )}
                            />
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className="sidebar-widget partner-institue"
                style={{ marginTop: '2vh' }}
              >
                <h6 className="title">Partner Institution</h6>
                <div className="widget-body">
                  <div className="checklist-group">
                    <div className="checklist-header">
                      <div className="custom-checkbox">
                        <input
                          id="Initiative15"
                          type="checkbox"
                          name="Initiative15"
                          onChange={handleInstitutionParentCheckbox}
                          checked={isAllInstitutionSelected}
                        />
                        <label htmlFor="Initiative15">All</label>
                      </div>
                    </div>
                    <ul className="checkbox-list">
                      {partnerList &&
                        partnerList.map(partner => {
                          return (
                            <CheckBox
                              id={partner.id}
                              className="institution_checkbox"
                              key={partner.id}
                              label={partner.partner}
                              name={partner.partner}
                              changeHandler={
                                handleInstitutionSelectionCheckbox
                              }
                              checked={institutionSelection.includes(
                                partner.partner,
                              )}
                            />
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className="sidebar-widget"
                style={{ marginTop: '1vh' }}
              >
                <h6 className="title">POINT OF SERVICE</h6>
                <div className="widget-body">
                  <div className="widget-tag partner-tag">
                    <a
                      data-label="Microfinance Institutions/Cooperatives"
                      className={
                        serviceType.includes('Branch') ? 'active' : ''
                      }
                      role="tab"
                      tabIndex="-1"
                      onClick={() => {
                        handelMultiChoice('Branch', 1);
                      }}
                      onKeyUp={() => {
                        handelMultiChoice('Branch', 1);
                      }}
                    >
                      <span>Branch</span>
                    </a>
                    <a
                      data-label="Commercial Bank and Other Partners"
                      className={
                        serviceType.includes('BLB') ? 'active' : ''
                      }
                      role="tab"
                      tabIndex="-1"
                      onClick={() => {
                        handelMultiChoice('BLB', 1);
                      }}
                      onKeyUp={() => {
                        handelMultiChoice('BLB', 1);
                      }}
                    >
                      <span>BLB</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="sidebar-widget">
                <h6 className="title">G2P PAYMENT</h6>
                <div className="widget-body">
                  <div className="widget-tag partner-tag">
                    <a
                      data-label="Microfinance Institutions/Cooperatives"
                      className={
                        G2PTypes.includes('Yes') ? 'active' : ''
                      }
                      role="tab"
                      tabIndex="-1"
                      onClick={() => {
                        handelMultiChoice('Yes', 2);
                      }}
                      onKeyUp={() => {
                        handelMultiChoice('Yes', 2);
                      }}
                    >
                      <span>Yes</span>
                    </a>
                    <a
                      data-label="Commercial Bank and Other Partners"
                      className={
                        G2PTypes.includes('No') ? 'active' : ''
                      }
                      role="tab"
                      tabIndex="-1"
                      onClick={() => {
                        handelMultiChoice('No', 2);
                      }}
                      onKeyUp={() => {
                        handelMultiChoice('No', 2);
                      }}
                    >
                      <span>No</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="sidebar-widget">
                <h6 className="title">DEMONSTRATION EFFECT</h6>
                <div className="widget-body">
                  <div className="widget-tag partner-tag">
                    <a
                      className={
                        demonstrationType.includes('Yes')
                          ? 'active'
                          : ''
                      }
                      role="tab"
                      tabIndex="-1"
                      onClick={() => {
                        handelMultiChoice('Yes', 3);
                      }}
                      onKeyUp={() => {
                        handelMultiChoice('Yes', 3);
                      }}
                    >
                      <span>Yes</span>
                    </a>
                    <a
                      className={
                        demonstrationType.includes('No')
                          ? 'active'
                          : ''
                      }
                      role="tab"
                      tabIndex="-1"
                      onClick={() => {
                        handelMultiChoice('No', 3);
                      }}
                      onKeyUp={() => {
                        handelMultiChoice('No', 3);
                      }}
                    >
                      <span>No</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="apply-buttons buttons end">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="common-button is-clear "
                >
                  reset
                </button>
                <button
                  onClick={applyBtnClick}
                  type="button"
                  className="common-button is-bg"
                >
                  apply
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    );
  }
}

const mapStateToProps = ({ outreachReducer }) => ({
  outreachReducer,
});
export default connect(mapStateToProps, {})(LeftSideBar);
