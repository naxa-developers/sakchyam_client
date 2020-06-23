import React, { Component } from 'react';
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
                    number={2}
                    iconTitle="payments"
                  />
                  <OutreachTab
                    title="Projects Implemented"
                    number={54}
                    iconTitle="assignment"
                  />
                  {/* <OutreachTab
                    title="Partner Institutions"
                    number={112}
                    iconTitle="location_city"
                  /> */}
                  <OutreachTab
                    title="Total Beneficiaries Reached"
                    number={2}
                    iconTitle="people"
                  />
                  <OutreachTab
                    title="Sakchyam Investment(GBP)"
                    number="रू 589,509,062"
                    iconTitle="monetization_on"
                  />
                  <OutreachTab
                    title="New Physical Branches Established"
                    number={112}
                    iconTitle="store"
                  />
                  <OutreachTab
                    title="New BLBs Established"
                    number={54}
                    iconTitle="account_balance"
                  />
                  {/* <OutreachTab
                    title="Extension Counter"
                    number={112}
                    iconTitle="local_convenience_store"
                  /> */}
                  <OutreachTab
                    title="Number of Tablet Banking Points"
                    number={54}
                    iconTitle="tablet_mac"
                  />
                  <OutreachTab
                    title="Innovative Products Introduced"
                    number={54}
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

export default RightSideBar;
