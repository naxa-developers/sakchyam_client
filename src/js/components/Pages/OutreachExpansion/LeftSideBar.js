import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckBox from '../../common/Checkbox';
import FinancialLeftCard from '../../common/FinancialLeftCard';
import GroupCheckedbox from '../../common/GroupedCheckbox/GroupedCheckbox';

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxes: [],
    };
  }

  handleCheckboxgroupChange = updatedUsecaseCBState => {
    this.setState({
      checkboxes: updatedUsecaseCBState,
    });
  };

  render() {
    const {
      state: { checkboxes },
      props: {
        handleInvestmentFocusCheckbox,
        investmentFocusSelection,
        projectSelection,
        handleProjectSelectionCheckbox,
        G2PTypes,
        partnerSelection,
        handlePartnerSelectionCheckbox,
        serviceType,
        handlePartnerType,
        applyBtnClick,
        handlePartnerParentCheckbox,
        handleProjectParentCheckbox,
        handleInvestmentParentCheckbox,
        resetFilters,
        demonstrationType,
      },
    } = this;
    const {
      partnershipInvestmentFocus,
      projectLists,
      partnersList,
      filteredPartnerList,
    } = this.props.partnershipReducer;
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
            <div className="search-bar mb-10">
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
            </div>
          </div>
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
                        onChange={handleInvestmentParentCheckbox}
                      />
                      <label htmlFor="Initiative1">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    {partnershipInvestmentFocus &&
                      partnershipInvestmentFocus.map(
                        partnershipFocus => {
                          return (
                            <CheckBox
                              id={partnershipFocus.id}
                              className="investment_checkbox"
                              key={partnershipFocus.id}
                              label={
                                partnershipFocus.investment_primary
                              }
                              name={
                                partnershipFocus.investment_primary
                              }
                              changeHandler={
                                handleInvestmentFocusCheckbox
                              }
                              checked={investmentFocusSelection.includes(
                                partnershipFocus.investment_primary,
                              )}
                            />
                          );
                        },
                      )}
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
                      />
                      <label htmlFor="Initiative14">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    {filteredPartnerList &&
                      filteredPartnerList.map(partner => {
                        return (
                          <CheckBox
                            id={partner.id}
                            className="partner_checkbox"
                            key={partner.id}
                            label={partner.name}
                            name={partner.code}
                            changeHandler={
                              handlePartnerSelectionCheckbox
                            }
                            checked={partnerSelection.includes(
                              partner.code,
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
                      handlePartnerType('Branch', 1);
                    }}
                    onKeyUp={() => {
                      handlePartnerType('Branch', 1);
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
                      handlePartnerType('BLB', 1);
                    }}
                    onKeyUp={() => {
                      handlePartnerType('BLB', 1);
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
                      handlePartnerType('Yes', 2);
                    }}
                    onKeyUp={() => {
                      handlePartnerType('Yes', 2);
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
                      handlePartnerType('No', 2);
                    }}
                    onKeyUp={() => {
                      handlePartnerType('No', 2);
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
                      handlePartnerType('Yes', 3);
                    }}
                    onKeyUp={() => {
                      handlePartnerType('Yes', 3);
                    }}
                  >
                    <span>Yes</span>
                  </a>
                  <a
                    className={
                      demonstrationType.includes('No') ? 'active' : ''
                    }
                    role="tab"
                    tabIndex="-1"
                    onClick={() => {
                      handlePartnerType('No', 3);
                    }}
                    onKeyUp={() => {
                      handlePartnerType('No', 3);
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
        </div>
      </aside>
    );
  }
}

const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});
export default connect(mapStateToProps, {})(LeftSideBar);
