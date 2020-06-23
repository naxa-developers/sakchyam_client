import React, { Component } from 'react';
import { connect } from 'react-redux';
import OutreachTab from './common/OutreachTab';

const outreachTabTitle = [
  'Investment Focus',
  'Projects Implemented',
  'Partner Institutions',
  'Total Beneficiaries Reached',
  'Sakchyam Investment (GBP)',
  'New Physical Branches Established',
  'New BLBs Established',
  'Number of Tablet Banking Points',
  'Innovative Products Introduced',
];
function numberWithCommas(x) {
  if (x !== null) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return x;
}
class RightSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      props: {
        activeView,
        activeOverview,
        setActiveView,
        setActiveOverview,
      },
    } = this;
    const {
      partnershipReducer: { overviewData },
    } = this.props;
    return (
      <aside
        className="sidebar right-sidebar literacy-right-sidebar"
        style={{ maxWidth: '345px' }}
      >
        <div className="sidebar-in">
          <div className="right-sidebar-header">
            <h5>Overview</h5>
            {activeView === 'visualization' ? (
              <a
                onClick={() => {
                  setActiveView('map');
                }}
                onKeyUp={() => {
                  setActiveView('map');
                }}
                role="tab"
                tabIndex="0"
              >
                View on map
              </a>
            ) : (
              <a
                onClick={() => {
                  setActiveView('visualization');
                }}
                onKeyUp={() => {
                  setActiveView('visualization');
                }}
                role="tab"
                tabIndex="0"
              >
                Back to Visualization
              </a>
            )}
          </div>
          <div className="aside-body">
            <div className="sidebar-widget">
              <div className="widget-body is-dark">
                <ul className="widget-list">
                  <OutreachTab
                    title="Investment Focus"
                    number={overviewData.investment_focus}
                    iconTitle="payments"
                  />
                  <OutreachTab
                    title="Projects Implemented"
                    number={overviewData.project}
                    iconTitle="assignment"
                  />
                  {/* <OutreachTab
                    title="Partner Institutions"
                    number={112}
                    iconTitle="location_city"
                  /> */}
                  <OutreachTab
                    title="Total Beneficiaries Reached"
                    number={numberWithCommas(
                      parseInt(overviewData.beneficiary, 10),
                    )}
                    iconTitle="people"
                  />
                  <OutreachTab
                    title="Sakchyam Investment(GBP)"
                    number={numberWithCommas(
                      Math.round(overviewData.total_budget),
                    )}
                    iconTitle="monetization_on"
                  />
                  <OutreachTab
                    title="New Physical Branches Established"
                    number={overviewData.branch}
                    iconTitle="store"
                  />
                  <OutreachTab
                    title="New BLBs Established"
                    number={overviewData.blb}
                    iconTitle="account_balance"
                  />
                  {/* <OutreachTab
                    title="Extension Counter"
                    number={112}
                    iconTitle="local_convenience_store"
                  /> */}
                  <OutreachTab
                    title="Number of Tablet Banking Points"
                    number={overviewData.tablet}
                    iconTitle="tablet_mac"
                  />
                  <OutreachTab
                    title="Innovative Products Introduced"
                    number={overviewData.other_products}
                    iconTitle="local_offer"
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`expand-button ${
            activeOverview ? 'active' : ''
          } `}
        >
          <button
            type="button"
            onClick={setActiveOverview}
            className="common-button is-clear close-all"
          >
            <i className="material-icons">chevron_right</i>
          </button>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});
export default connect(mapStateToProps, {})(RightSideBar);
