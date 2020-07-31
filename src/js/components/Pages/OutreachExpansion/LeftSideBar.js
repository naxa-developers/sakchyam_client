/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckBox from '../../common/Checkbox';
import FinancialLeftCard from '../../common/FinancialLeftCard';
import GroupCheckedbox from '../../common/GroupedCheckbox/GroupedCheckbox';
import { removeDuplicates } from '../../common/removeDuplicates';

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // checkboxes: [],
      expansionList: '',
      fiList: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { partnershipReducer, primaryData } = this.props;
    const { partnershipInvestmentFocus } = partnershipReducer;
    // if (
    //   prevProps.partnershipReducer.partnershipInvestmentFocus !==
    //   partnershipInvestmentFocus
    // ) {
    //   console.log(
    //     'partnershipReducer',
    //     partnershipReducer.partnershipInvestmentFocus,
    //   );
    // }
    if (prevProps.primaryData !== primaryData) {
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
      this.setState({ expansionList, fiList });
    }
  }

  // handleCheckboxgroupChange = updatedUsecaseCBState => {
  //   this.setState({
  //     checkboxes: updatedUsecaseCBState,
  //   });
  // };

  render() {
    const {
      state: { expansionList, fiList },
      props: {
        partnerSelection,
        expsnsionSelection,
        handelExpansionCheckbox,
        handlePartnerSelectionCheckbox,
        handlePartnerParentCheckbox,
        handelExpansionParentCheckbox,
        G2PTypes,
        serviceType,
        handlePartnerType,
        demonstrationType,
        applyBtnClick,
        resetFilters,
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
                            name={partner.id}
                            changeHandler={
                              handlePartnerSelectionCheckbox
                            }
                            checked={partnerSelection.includes(
                              partner.id,
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
