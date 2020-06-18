import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckBox from '../../common/Checkbox';
import FinancialLeftCard from '../../common/FinancialLeftCard';

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      // state: {},
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
              sakchyam partnerships
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
                        onChange={handleInvestmentFocusCheckbox}
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
                      projectStatus.includes('completed')
                        ? 'active'
                        : ''
                    }
                    role="tab"
                    tabIndex="-1"
                    onClick={() => {
                      handleProjectStatus('completed');
                    }}
                    onKeyUp={() => {
                      handleProjectStatus('completed');
                    }}
                  >
                    <span>completed</span>
                  </a>
                  <a
                    className={
                      projectStatus.includes('ongoing')
                        ? 'active'
                        : ''
                    }
                    role="tab"
                    tabIndex="-1"
                    onClick={() => {
                      handleProjectStatus('ongoing');
                    }}
                    onKeyUp={() => {
                      handleProjectStatus('ongoing');
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
                      />
                      <label htmlFor="Initiative7">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    {projectLists &&
                      projectLists.map(project => {
                        return (
                          <CheckBox
                            key={project.id}
                            label={project.name}
                            name={project.name}
                            changeHandler={
                              handleProjectSelectionCheckbox
                            }
                            checked={projectSelection.includes(
                              project.name,
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
                      />
                      <label htmlFor="Initiative14">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    {filteredPartnerList &&
                      filteredPartnerList.map(partner => {
                        return (
                          <CheckBox
                            key={partner.id}
                            label={partner.name}
                            name={partner.name}
                            changeHandler={
                              handlePartnerSelectionCheckbox
                            }
                            checked={partnerSelection.includes(
                              partner.name,
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
                className="common-button is-clear "
              >
                reset
              </button>
              <button
                type="button"
                className="common-button is-bg is-disable"
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
