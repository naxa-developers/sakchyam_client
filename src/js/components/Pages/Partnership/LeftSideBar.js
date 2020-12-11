import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckBox from '../../common/Checkbox';
import FinancialLeftCard from '../../common/FinancialLeftCard';
import GroupCheckedbox from '../../common/GroupedCheckbox/GroupedCheckbox';
import BadgeLoader from '../MFS/SkeletonLoader/BadgeLoader';
import BadgesLoader from '../../common/SkeletonLoader/BadgesLoader';
import { sortArrayByAnyKey } from '../../utils/utilities';

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
      partnerTypeList,
      filteredPartnerList,
    } = this.props.partnershipReducer;
    if (partnershipInvestmentFocus) {
      sortArrayByAnyKey(
        partnershipInvestmentFocus,
        'investment_primary',
      );
    }
    if (projectLists) {
      sortArrayByAnyKey(projectLists, 'name');
    }
    if (partnerTypeList) {
      sortArrayByAnyKey(partnerTypeList);
    }
    if (filteredPartnerList) {
      sortArrayByAnyKey(filteredPartnerList, 'name');
    }

    return (
      <aside className="sidebar left-sidebar literacy-sidebar">
        <div className="sidebar-in">
          <div className="aside-header ">
            <button
              type="button"
              className="common-button is-bg partnership-button"
            >
              sakchyam partnerships
            </button>
          </div>
          <div className="aside-body apply-body">
            <div className="sidebar-widget partner-institue">
              <h6 className="title">Investment Focus</h6>
              <div className="widget-body">
                {partnershipInvestmentFocus.length < 1 ? (
                  <BadgeLoader />
                ) : (
                  <div className="checklist-group">
                    <div className="checklist-header">
                      <div className="custom-checkbox">
                        <input
                          id="Initiative1"
                          className="allCheckbox"
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
                )}
              </div>
            </div>
            {/* <div className="sidebar-widget">
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
            </div> */}
            <div className="sidebar-widget partner-institue">
              <h6 className="title">Projects</h6>
              <div className="widget-body">
                {projectLists.length < 1 ? (
                  <BadgeLoader />
                ) : (
                  <div className="checklist-group">
                    <div className="checklist-header">
                      <div className="custom-checkbox">
                        <input
                          id="Initiative7"
                          className="allCheckbox"
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
                )}
              </div>
            </div>
            <div className="sidebar-widget">
              <h6 className="title">Partner Type</h6>
              <div className="widget-body">
                {partnerTypeList.length < 1 ? (
                  <BadgesLoader />
                ) : (
                  <div className="widget-tag partner-tag">
                    {partnerTypeList.map(data => {
                      return (
                        <a
                          data-label={data}
                          className={`partnerType_badge ${
                            partnerType.includes(data) ? 'active' : ''
                          }`}
                          role="tab"
                          tabIndex="-1"
                          onClick={() => {
                            handlePartnerType(data);
                          }}
                          onKeyUp={() => {
                            handlePartnerType(data);
                          }}
                        >
                          <span>{data}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="sidebar-widget partner-institue">
              <h6 className="title">Partner Institution</h6>
              <div className="widget-body">
                {filteredPartnerList.length < 1 ? (
                  <BadgeLoader />
                ) : (
                  <div className="checklist-group">
                    <div className="checklist-header">
                      <div className="custom-checkbox">
                        <input
                          id="Initiative14"
                          className="allCheckbox"
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
                          // console.log(partner, 'partner');
                          return (
                            <CheckBox
                              id={partner.id}
                              className="partner_checkbox"
                              key={partner.id}
                              label={partner.name}
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
                )}
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
