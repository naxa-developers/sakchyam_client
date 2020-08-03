/* eslint-disable no-var */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable radix */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import OutreachTab from './common/OutreachTab';
import { removeDuplicates } from '../../common/removeDuplicates';

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

const getFormattedDate = date => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var month = date.substr(5, 2);
  var day = date.substr(8, 2);

  const filteredDate = `${monthNames[parseInt(month) - 1]} ${day}`;
  return filteredDate;
};

class RightSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPopulation: '',
      totalFunding: '',
      totalReceipients: '',
      totalPayments: '',
      totalBranch: '',
      totalBLB: '',
      totalPartners: '',
      yearArray: '',
      filteredPrimaryData: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { outreachReducer, primaryData } = this.props;

    if (prevProps.outreachReducer !== outreachReducer) {
      const conditionCheck =
        outreachReducer &&
        outreachReducer.secondarData &&
        outreachReducer.secondarData.data;
      const totalPopulation =
        conditionCheck &&
        outreachReducer.secondarData.data.reduce(
          (total, i) => total + i.population,
          0,
        );

      const totalFunding =
        conditionCheck &&
        outreachReducer.secondarData.data.reduce(
          (total, i) => total + i.yearly_fund,
          0,
        );

      const totalReceipients =
        conditionCheck &&
        outreachReducer.secondarData.data.reduce(
          (total, i) => total + i.social_security_recipients,
          0,
        );

      const totalPayments =
        conditionCheck &&
        outreachReducer.secondarData.data.reduce(
          (total, i) => total + i.yearly_social_security_payment,
          0,
        );
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        totalPopulation,
        totalFunding,
        totalReceipients,
        totalPayments,
      });
    }

    if (prevProps.primaryData !== primaryData) {
      let totalBranch = 0;
      let totalBLB = 0;
      primaryData.forEach(element => {
        if (element.point_service === 'Branch') {
          totalBranch += 1;
        }
        if (element.point_service === 'BLB') {
          totalBLB += 1;
        }
      });

      const uniquePartners = removeDuplicates(primaryData, 'partner');

      const dateSorted = primaryData.sort(function(a, b) {
        return (
          new Date(a.date_established) - new Date(b.date_established)
        );
      });

      const withYearKey = dateSorted.map(data => ({
        ...data,
        year: parseInt(data.date_established.substring(0, 4)),
      }));

      const yearArray = withYearKey.map(data => ({
        year: data.year,
      }));

      const uniqueYearArray = removeDuplicates(yearArray, 'year');

      this.setState({
        totalBranch,
        totalBLB,
        totalPartners: uniquePartners.length,
        yearArray: uniqueYearArray,
        filteredPrimaryData: withYearKey,
      });
    }
  }

  render() {
    const {
      props: {
        activeView,
        activeOverview,
        setActiveView,
        setActiveOverview,
        mapViewDataBy,
      },
    } = this;

    const {
      totalPopulation,
      totalFunding,
      totalReceipients,
      totalPayments,
      totalBranch,
      totalBLB,
      totalPartners,
      yearArray,
      filteredPrimaryData,
    } = this.state;
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
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              // <a
              //   onClick={() => {
              //     setActiveView('visualization');
              //   }}
              //   role="tab"
              //   tabIndex="0"
              // >
              //   Back to Visualization
              // </a>
              <></>
            )}
          </div>
          <div className="aside-body">
            {mapViewDataBy === 'general_outreach' ? (
              <div className="sidebar-widget">
                <div className="widget-body">
                  <ul className="widget-list">
                    <li>
                      <div className="widget-content">
                        <h6>Branches</h6>
                        <span>{totalBranch}</span>
                      </div>
                      <div className="widget-icon">
                        <span>
                          <i className="material-icons">business</i>
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="widget-content">
                        <h6>BLB</h6>
                        <span>{totalBLB}</span>
                      </div>
                      <div className="widget-icon">
                        <span>
                          <i className="material-icons">flag</i>
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="widget-content">
                        <h6>Partner Institutions</h6>
                        <span>{totalPartners}</span>
                      </div>
                      <div className="widget-icon">
                        <span>
                          <i className="material-icons">
                            location_city
                          </i>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="sidebar-widget">
                <div className="widget-body">
                  <ul className="widget-list">
                    <OutreachTab
                      title="Population in the Local Unit"
                      number={totalPopulation}
                      iconTitle="people"
                    />
                    <OutreachTab
                      title="Yearly Central Government Funding"
                      number={totalFunding}
                      iconTitle="monetization_on"
                    />
                    <OutreachTab
                      title="Social Security Payment Recipients"
                      number={totalReceipients}
                      iconTitle="people"
                    />
                    <OutreachTab
                      title="Yearly Social Security Payments"
                      number={totalPayments.toFixed(2)}
                      iconTitle="monetization_on"
                    />
                  </ul>
                </div>
              </div>
            )}

            <div className="sidebar-widget timeline-widget">
              <h5>Initiative Timeline</h5>
              <div className="widget-body">
                <div className="timeline">
                  {yearArray &&
                    yearArray.map(year => {
                      return (
                        <ul className="year">
                          <div className="date-time">
                            <time>{year.year}</time>
                          </div>
                          {filteredPrimaryData &&
                            filteredPrimaryData.map(data => {
                              if (data.year === year.year) {
                                return (
                                  <li
                                    className={
                                      data.point_service === 'Branch'
                                        ? 'active'
                                        : ''
                                    }
                                  >
                                    <div className="timeline-content ">
                                      <div className="timeline-text">
                                        <span>
                                          {getFormattedDate(
                                            data.date_established,
                                          )}
                                        </span>
                                        <p>
                                          {data.partner} at{' '}
                                          {data.market_name}
                                        </p>
                                      </div>
                                    </div>
                                  </li>
                                );
                              }
                              return true;
                            })}
                        </ul>
                      );
                    })}
                </div>
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

const mapStateToProps = ({ outreachReducer }) => ({
  outreachReducer,
});
export default connect(mapStateToProps)(RightSideBar);
