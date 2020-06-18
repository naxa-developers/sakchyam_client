import React, { Component } from 'react';

class FinancialLeftCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        {/* <div className="sidebar-widget partner-institue">
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
                  partnershipInvestmentFocus.map(partnershipFocus => {
                    return (
                      <CheckBox
                        key={partnershipFocus.id}
                        label={partnershipFocus.investment_primary}
                        name={partnershipFocus.investment_primary}
                        changeHandler={handleInvestmentFocusCheckbox}
                        checked={investmentFocusSelection.includes(
                          partnershipFocus.investment_primary,
                        )}
                      />
                    );
                  })}
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
                  projectStatus.includes('completed') ? 'active' : ''
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
                  projectStatus.includes('ongoing') ? 'active' : ''
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
        </div> */}
      </>
    );
  }
}

export default FinancialLeftCard;
