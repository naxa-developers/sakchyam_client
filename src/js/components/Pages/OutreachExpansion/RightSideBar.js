/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-var */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable radix */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import OutreachTab from '../../common/overviewTab';
import {
  removeDuplicates,
  numberWithCommas,
  getFormattedDate,
} from '../../common/utilFunctions';

import { CaretUp, CaretDown } from '../../common/Caret';

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
    this.state = {
      isHovered: false,
      hoverID: 0,
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

      // eslint-disable-next-line no-use-before-define
      const timelineData = generateTimelineData(primaryData);
      // console.log('time data', timeliendata);

      const years = [];
      timelineData.forEach(item => years.push(item.year));

      const maxYear = Math.max(...years);

      setTimeout(() => {
        const x = document.getElementById(maxYear);
        x.style.display = 'block';
        this.setState({ [maxYear]: true });
      }, 200);

      this.setState({
        totalBranch,
        totalBLB,
        totalPartners: uniquePartners.length,
        yearArray: uniqueYearArray,
        filteredPrimaryData: withYearKey,
        timelineData,
      });
    }
  }

  handleHover = id => {
    this.setState(prevState => ({
      isHovered: !prevState.isHovered,
      hoverID: id,
    }));
  };

  handleUnhover = () => {
    this.setState({ isHovered: false, hoverID: '' });
  };

  handleTimelineToggle = key => {
    const x = document.getElementById(`${key}`);
    const y = document.querySelectorAll('.timeline-display');

    if (x.style.display !== 'none') {
      x.style.display = 'none';
      this.setState({ [key]: false });
    } else {
      x.style.display = 'block';
      this.setState({ [key]: true });
    }
  };

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
      timelineData,
      hoverID,
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
                      number={numberWithCommas(totalPopulation)}
                      iconTitle="people"
                    />
                    <OutreachTab
                      title="Yearly Central Government Funding"
                      number={numberWithCommas(totalFunding)}
                      iconTitle="monetization_on"
                    />
                    <OutreachTab
                      title="Social Security Payment Recipients"
                      number={numberWithCommas(totalReceipients)}
                      iconTitle="people"
                    />
                    <OutreachTab
                      title="Yearly Social Security Payments"
                      number={numberWithCommas(
                        totalPayments.toFixed(2),
                      )}
                      iconTitle="monetization_on"
                    />
                  </ul>
                </div>
              </div>
            )}

            {mapViewDataBy === 'general_outreach' && (
              <div className="sidebar-widget timeline-widget">
                <h5>Timeline of Establishment</h5>
                <div
                  className="widget-body"
                  style={{ paddingTop: '0' }}
                >
                  <div className="timeline">
                    {timelineData &&
                      timelineData.map(item => {
                        return (
                          <ul className="year">
                            <div
                              className="date-time"
                              id="timeline-id"
                            >
                              <div
                                style={{
                                  // display: 'inline-flex',
                                  background: '#f7f7f7',
                                  width: 'inherit',
                                }}
                              >
                                <time
                                  onClick={
                                    () =>
                                      this.handleTimelineToggle(
                                        item.year,
                                      )
                                    // eslint-disable-next-line react/jsx-curly-newline
                                  }
                                  style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                  }}
                                >
                                  {item.year}
                                  <div style={{ height: 'auto' }}>
                                    {this.state[item.year] ? (
                                      <CaretUp />
                                    ) : (
                                      <CaretDown />
                                    )}
                                  </div>
                                </time>
                              </div>
                            </div>
                            <div
                              id={item.year}
                              className="timeline-display"
                              style={{ display: 'none' }}
                            >
                              {item.program.map((list, index) => {
                                const date = new Date(list.date);
                                const dateNumber = date.getDate();
                                const monthName = date
                                  .toDateString()
                                  .split(' ')[1];

                                let temp = '';
                                if (
                                  Object.entries(list).length !== 0
                                ) {
                                  temp = (
                                    <li
                                      // key={item.id}
                                      className={
                                        hoverID === index
                                          ? 'active'
                                          : ''
                                      }
                                    >
                                      <div className="timeline-content ">
                                        <div
                                          onMouseEnter={() => {
                                            this.handleHover(index);
                                          }}
                                          onMouseLeave={() => {
                                            this.handleUnhover(index);
                                          }}
                                          className="timeline-text"
                                        >
                                          <span>
                                            {`${monthName}
                                   ${item.year}`}
                                          </span>
                                          <p>
                                            {list.partner} at{' '}
                                            {list.market_name}
                                          </p>
                                        </div>
                                      </div>
                                    </li>
                                  );
                                } else {
                                  temp = <li className="blank" />;
                                }
                                return temp;
                              })}
                            </div>
                          </ul>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
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

const generateTimelineData = data => {
  // remove data with null date values

  const filteredData = [];
  data.forEach(item => {
    if (item.date_established !== null)
      filteredData.push({
        date: item.date_established,
        partner: item.partner,
        market_name: item.market_name,
      });
  });

  const allYears = [];
  filteredData.filter(item => {
    const year = item.date.substring(0, 4);
    if (!allYears.includes(year)) allYears.push(year);
    return true;
  });

  const a = Math.min(...allYears);
  const b = Math.max(...allYears);
  const years = [];

  let initial = a;
  for (let i = 0; i <= b - a; i += 1) {
    years.push(initial);
    initial += 1;
  }

  years.sort((c, d) => d - c);

  const arr = [];

  years.map((item, index) => {
    arr.push({
      id: index + 1,
      year: item,
      program: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    });
    return true;
  });

  filteredData.map(item => {
    const date = new Date(item.date);
    const year = item.date.substring(0, 4);
    const month = date.getMonth();

    arr.map(i => {
      if (i.year.toString() === year) {
        // eslint-disable-next-line no-param-reassign
        i.program[month] = { ...item };
      }
      return true;
    });
    return true;
  });

  return arr;
};
