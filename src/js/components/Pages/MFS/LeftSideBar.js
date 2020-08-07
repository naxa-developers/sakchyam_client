import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckBox from '../../common/Checkbox';
import FinancialLeftCard from '../../common/FinancialLeftCard';
import GroupCheckedbox from '../../common/GroupedCheckbox/GroupedCheckbox';
import FilterChip from './common/FilterChip';
import BadgeLoader from './SkeletonLoader/BadgeLoader';
import SelectList from '../../common/SelectList';

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
        selectedPartner,
        handlePartnerSelection,
        selectedInnovation,
        handleInnovationSelection,
        handleInnovationAllSelection,
        selectedAchievement,
        handleAchievementSelection,
        handleAchievementAllSelection,
        partnerType,
        handlePartnerType,
        applyBtnClick,
        resetFilters,
      },
    } = this;
    const {
      innovationList,
      achievementList,
      partnerList,
      mfsListLoading,
    } = this.props.mfsReducer;
    return (
      <aside className="sidebar left-sidebar literacy-sidebar">
        <div className="sidebar-in">
          <div className="aside-header ">
            <button
              type="button"
              className="common-button is-bg partnership-button"
            >
              Mobile Financing Services
            </button>
          </div>
          <div className="aside-body apply-body">
            <div className="sidebar-widget">
              <h6 className="title">Partner Institutions</h6>
              <div className="widget-body">
                <div className="widget-tag partner-tag">
                  {mfsListLoading ? (
                    <BadgeLoader />
                  ) : (
                    partnerList &&
                    partnerList.map(partner => {
                      return (
                        <FilterChip
                          name={partner.partner_name}
                          handleClick={handlePartnerSelection}
                          chipState={selectedPartner}
                        />
                      );
                    })
                  )}
                  {/* <a
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
                  </a> */}
                </div>
              </div>
            </div>
            <div className="sidebar-widget partner-institue">
              <h6 className="title">Key Innovation</h6>
              <div className="widget-body pd0">
                <div className="checklist-header">
                  <div className="custom-checkbox">
                    <input
                      id="innovationAll"
                      className="allCheckbox"
                      type="checkbox"
                      name="innovationAll"
                      value="all"
                      onChange={handleInnovationAllSelection}
                    />
                    <label htmlFor="innovationAll">All</label>
                  </div>
                </div>
                {mfsListLoading ? (
                  <BadgeLoader />
                ) : (
                  <ul className="checkbox-list default-list">
                    {innovationList &&
                      innovationList.map(innov => {
                        return (
                          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                          // <div
                          //   role="button"
                          //   tabIndex="0"
                          //   onClick={() => {
                          //     handleInnovationSelection(innov);
                          //   }}
                          //   onKeyDown={() => {
                          //     handleInnovationSelection(innov);
                          //   }}
                          // >
                          //   <label>{innov}</label>
                          // </div>
                          // <SelectList
                          //   // id={project.id}
                          //   className="project_checkbox"
                          //   // key={project.id}
                          //   label={innov}
                          //   name={innov}
                          //   clickHandler={handleInnovationSelection}
                          //   checked={selectedInnovation.includes(
                          //     innov,
                          //   )}
                          // />
                          <CheckBox
                            id={innov}
                            className="innovation_checkbox"
                            // key={partnershipFocus.id}
                            label={innov}
                            name={innov}
                            changeHandler={handleInnovationSelection}
                            // checked={investmentFocusSelection.includes(
                            //   innov,
                            // )}
                          />
                        );
                      })}
                  </ul>
                )}
              </div>
            </div>
            <div className="sidebar-widget partner-institue">
              <h6 className="title">Achievement Type</h6>
              <div className="widget-body pd0">
                <div className="checklist-header">
                  <div className="custom-checkbox">
                    <input
                      id="achievementAll"
                      className="allCheckbox"
                      type="checkbox"
                      name="achievementAll"
                      value="all"
                      onChange={handleAchievementAllSelection}
                    />
                    <label htmlFor="achievementAll">All</label>
                  </div>
                </div>
                {mfsListLoading ? (
                  <BadgeLoader />
                ) : (
                  <ul className="checkbox-list default-list">
                    {/* <GroupCheckedbox
                      checkboxes={projectLists}
                      onCheckboxGroupChange={
                        this.handleCheckboxgroupChange
                      }
                    /> */}

                    {achievementList &&
                      achievementList.map(achievement => {
                        return (
                          // <div
                          //   role="button"
                          //   tabIndex="0"
                          //   onClick={() => {
                          //     handleAchievementSelection(
                          //       achievement,
                          //     );
                          //   }}
                          //   onKeyDown={() => {
                          //     handleAchievementSelection(
                          //       achievement,
                          //     );
                          //   }}
                          // >
                          //   <label>{achievement}</label>
                          // </div>
                          // <SelectList
                          //   // id={project.id}
                          //   className="project_checkbox"
                          //   // key={project.id}
                          //   label={achievement}
                          //   name={achievement}
                          //   clickHandler={handleAchievementSelection}
                          //   checked={selectedAchievement.includes(
                          //     achievement,
                          //   )}
                          // />
                          <CheckBox
                            id={achievement}
                            className="achievement_checkbox"
                            // key={partnershipFocus.id}
                            label={achievement}
                            name={achievement}
                            changeHandler={handleAchievementSelection}
                            // checked={investmentFocusSelection.includes(
                            //   innov,
                            // )}
                          />
                        );
                      })}
                  </ul>
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

const mapStateToProps = ({ mfsReducer }) => ({
  mfsReducer,
});
export default connect(mapStateToProps, {})(LeftSideBar);
