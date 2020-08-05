import React, { Component } from 'react';
import { connect } from 'react-redux';
import OutreachTab from './common/OutreachTab';
import { getOverviewData } from '../../../actions/partnership.actions';

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

  componentDidMount() {
    this.props.getOverviewData();
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
            {/* {activeView === 'visualization' ? (
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
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <a
                onClick={() => {
                  setActiveView('visualization');
                }}
                // onKeyDown={() => {
                //   setActiveView('visualization');
                // }}
                role="tab"
                tabIndex="0"
              >
                Back to Visualization
              </a>
            )} */}
          </div>
          <div className="aside-body">
            <div className="sidebar-widget">
              <div className="widget-body">
                <ul className="widget-list">
                  <OutreachTab
                    title="Key Innovations"
                    number={overviewData.investment_focus}
                    iconTitle="flag"
                  />
                  <OutreachTab
                    title="Partner Institutions"
                    number={overviewData.project}
                    iconTitle="location_city"
                  />
                  <OutreachTab
                    title="No. of Cashpoint Agents Deployed"
                    number={numberWithCommas(
                      parseInt(overviewData.beneficiary, 10),
                    )}
                    iconTitle="poll"
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
export default connect(mapStateToProps, { getOverviewData })(
  RightSideBar,
);
