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
        projectStatus,
        handleProjectStatus,
        partnerSelection,
        handlePartnerSelectionCheckbox,
        partnerType,
        handlePartnerType,
        applyBtnClick,
        handlePartnerParentCheckbox,
        handleProjectParentCheckbox,
        handleInvestmentParentCheckbox,
        resetFilters,
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
          </div>
          <div className="aside-body">
            <div className="sidebar-widget partner-institue">
              <h6 className="title">Investment Focus</h6>
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
            <div className="sidebar-widget">
              <h6 className="title">project status</h6>
              <div className="widget-body">
                <div className="widget-tag partner-tag">
                  <a
                    className={
                      projectStatus.includes('Completed')
                        ? 'active'
                        : ''
                    }
                    role="tab"
                    tabIndex="-1"
                    onClick={() => {
                      handleProjectStatus('Completed');
                    }}
                    onKeyUp={() => {
                      handleProjectStatus('Completed');
                    }}
                  >
                    <span>completed</span>
                  </a>
                  <a
                    className={
                      projectStatus.includes('Ongoing')
                        ? 'active'
                        : ''
                    }
                    role="tab"
                    tabIndex="-1"
                    onClick={() => {
                      handleProjectStatus('Ongoing');
                    }}
                    onKeyUp={() => {
                      handleProjectStatus('Ongoing');
                    }}
                  >
                    <span>ongoing</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="sidebar-widget partner-institue">
              <h6 className="title">Projects</h6>
              <div className="widget-body">
                <div className="checklist-group">
                  <div className="checklist-header">
                    <div className="custom-checkbox">
                      <input
                        id="Initiative7"
                        type="checkbox"
                        name="Initiative7"
                        onChange={handleProjectParentCheckbox}
                      />
                      <label htmlFor="Initiative7">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    {/* <GroupCheckedbox
                      checkboxes={projectLists}
                      onCheckboxGroupChange={
                        this.handleCheckboxgroupChange
                      }
                    /> */}
                    {projectLists &&
                      projectLists.map(project => {
                        return (
                          <CheckBox
                            id={project.id}
                            className="project_checkbox"
                            key={project.id}
                            label={project.name}
                            name={project.id}
                            changeHandler={
                              handleProjectSelectionCheckbox
                            }
                            checked={projectSelection.includes(
                              project.id,
                            )}
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
                    data-label="Microfinance Institutions/Cooperatives"
                    className={
                      partnerType.includes(
                        'Microfinance Institutions/Cooperatives',
                      )
                        ? 'active'
                        : ''
                    }
                    role="tab"
                    tabIndex="-1"
                    onClick={() => {
                      handlePartnerType(
                        'Microfinance Institutions/Cooperatives',
                      );
                    }}
                    onKeyUp={() => {
                      handlePartnerType(
                        'Microfinance Institutions/Cooperatives',
                      );
                    }}
                  >
                    <span>Microfinance</span>
                  </a>
                  <a
                    data-label="Commercial Bank and Other Partners"
                    className={
                      partnerType.includes(
                        'Commercial Bank and Other Partners',
                      )
                        ? 'active'
                        : ''
                    }
                    role="tab"
                    tabIndex="-1"
                    onClick={() => {
                      handlePartnerType(
                        'Commercial Bank and Other Partners',
                      );
                    }}
                    onKeyUp={() => {
                      handlePartnerType(
                        'Commercial Bank and Other Partners',
                      );
                    }}
                  >
                    <span>Commercial Bank</span>
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
