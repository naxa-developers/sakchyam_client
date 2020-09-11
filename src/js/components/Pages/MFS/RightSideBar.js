import React, { Component } from 'react';
import { connect } from 'react-redux';
import OutreachTab from './common/OutreachTab';
import { getOverviewData } from '../../../actions/partnership.actions';
import DownloadIcon from '../../../../img/get_app.png';
import downloadOverviewSection from '../../utils/overviewDownload';

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
        selectedInnovation,
        setActiveView,
        setActiveOverview,
      },
    } = this;
    const {
      mfsReducer: { mfsOverviewData },
    } = this.props;
    return (
      <aside
        className="sidebar right-sidebar literacy-right-sidebar"
        style={{ maxWidth: '345px' }}
      >
        <div className="sidebar-in">
          <div className="right-sidebar-header">
            <h5>Overview</h5>
            <span
              className="download-span"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                this.props.notificationHandler();
                downloadOverviewSection(
                  '.overview-section',
                  'Partnership Overview',
                );
              }}
              onKeyDown={() => {
                this.props.notificationHandler();
                downloadOverviewSection(
                  '.overview-section',
                  'MFS Overview',
                );
              }}
              role="button"
              tabIndex="-1"
            >
              <img src={DownloadIcon} alt="open" />
            </span>
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
            <div className="sidebar-widget overview-section">
              <div className="widget-body bg-clr">
                <ul className="widget-list">
                  <OutreachTab
                    title="Key Innovations"
                    number={mfsOverviewData.innovationNo}
                    iconTitle="flag"
                  />
                  <OutreachTab
                    title="Partner Institutions"
                    number={mfsOverviewData.partnerNo}
                    iconTitle="location_city"
                  />
                  <OutreachTab
                    title={
                      mfsOverviewData.totalCashpoint
                        ? 'Total Achieved Number'
                        : selectedInnovation
                    }
                    number={numberWithCommas(
                      parseInt(mfsOverviewData.totalCashpoint, 10),
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

const mapStateToProps = ({ mfsReducer }) => ({
  mfsReducer,
});
export default connect(mapStateToProps, { getOverviewData })(
  RightSideBar,
);
