/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CaretDown, CaretUp } from './Caret';
import './custom.css';
import {
  WidgetCardLoader,
  WidgetBodyLoader,
} from '../Loader/RightSidebarLoaderFL';

function colorPicker(i) {
  if (i % 20 === 0) return '#91664E';
  if (i % 20 === 1) return '#13A8BE';
  if (i % 20 === 2) return '#13A8BE'; // #FF6D00
  if (i % 20 === 3) return '#DE2693';
  if (i % 20 === 4) return '#B1B424';
  if (i % 20 === 5) return '#2196F3';
  if (i % 20 === 6) return '#B1B424'; // #4CE2A7
  if (i % 20 === 7) return '#1967A0';
  if (i % 20 === 8) return '#00C853';
  if (i % 20 === 9) return '#E11D3F'; // #651FFF
  if (i % 20 === 10) return '#FF6D00'; // #B71DE1
  if (i % 20 === 11) return '#DE2693'; // #FFCD00
  if (i % 20 === 12) return '#1F8AE4'; // #E11D3F
  if (i % 20 === 13) return '#FF1500';
  if (i % 20 === 14) return '#C5E11D';
  if (i % 20 === 15) return '#CDACF2';
  if (i % 20 === 16) return 'AFDE0E';
  if (i % 20 === 17) return '#FF5576';
  if (i % 20 === 18) return '#BFEDF5';
  if (i % 20 === 19) return '#E0CBAB';
  if (i % 20 === 20) return '#FF5E00';
  return '#FFD400';
}

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
    this.state = {
      isHovered: false,
      hoverID: 1,
      totalBeneficiaries: 0,
      partnerCount: 0,
      programCount: 0,
      filteredData: [],
      maxValue: 0,
      timelineData: [],
    };
  }

  calculateTotalBeneficiaries = (
    selectedPartner = [],
    selectedProgram = [],
    partnerType = [],
  ) => {
    const {
      financialReducer: { financialData },
    } = this.props;

    let newData = [];
    if (partnerType.length === 0 || partnerType.length === 2) {
      newData = financialData;
    } else {
      newData = financialData.filter(item =>
        partnerType.includes(item.partner_type),
      );
    }

    const arr = [];
    newData.map(item => {
      const obj = arr.find(x => x.partner_id === item.partner_id);
      if (!obj) {
        arr.push(item);
      }
      return true;
    });

    let tempBeneficiary = 0;
    let partnerBeneficiary = 0;

    arr.map(i => {
      tempBeneficiary += i.single_count;
      if (selectedPartner.includes(i.partner_id))
        partnerBeneficiary += i.single_count;
      return true;
    });

    let totalBeneficiary = 0;
    if (
      selectedPartner.length === 0 &&
      selectedProgram.length === 0
    ) {
      totalBeneficiary = tempBeneficiary;
    } else if (
      selectedPartner.length > 0 &&
      selectedProgram.length === 0
    ) {
      totalBeneficiary = partnerBeneficiary;
    } else if (
      selectedPartner.length === 0 &&
      selectedProgram.length > 0
    ) {
      // newData.map(item => {
      //   if (
      //     // selectedPartner.includes(item.partner_id) &&
      //     selectedProgram.includes(item.program_id)
      //   ) {
      //     totalBeneficiary += item.value;
      //   }
      //   return true;
      // });
      totalBeneficiary = tempBeneficiary;
    } else if (
      selectedPartner.length > 0 &&
      selectedProgram.length > 0
    ) {
      // newData.map(item => {
      //   if (
      //     selectedPartner.includes(item.partner_id) &&
      //     selectedProgram.includes(item.program_id)
      //   ) {
      //     totalBeneficiary += item.value;
      //   }
      //   return true;
      // });
      totalBeneficiary = partnerBeneficiary;
    }

    return totalBeneficiary;
  };

  calculatePartnerCount = (selectedPartner, partnerType = []) => {
    const {
      financialReducer: { financialData },
    } = this.props;
    let partnerCount;

    let newData = [];
    if (partnerType.length === 0 || partnerType.length === 2) {
      newData = financialData;
    } else {
      newData = financialData.filter(item =>
        partnerType.includes(item.partner_type),
      );
    }

    if (selectedPartner.length !== 0) {
      partnerCount = selectedPartner.length;
    } else {
      const arr = [];
      newData.map(item => {
        const obj = arr.find(x => x.partner_id === item.partner_id);
        if (!obj) {
          arr.push(item);
        }
        return true;
      });
      partnerCount = arr.length;
    }

    return partnerCount;
  };

  calculateProgramCount = selectedProgram => {
    const { financialData } = this.props.financialReducer;
    let programCount;

    if (selectedProgram.length !== 0) {
      programCount = selectedProgram.length;
    } else {
      const arr = [];
      financialData.map(item => {
        const obj = arr.find(x => x.program_id === item.program_id);
        if (!obj) {
          arr.push(item);
        }
        return true;
      });
      programCount = arr.length;
    }

    return programCount;
  };

  calculateFilteredData = (
    selectedProgram,
    checkedPartnerItems,
    partnerType = [],
  ) => {
    const {
      financialReducer: { financialData, partnersList },
    } = this.props;
    const filteredData = [];

    let newData = [];
    if (partnerType.length === 0 || partnerType.length === 2) {
      newData = financialData;
    } else {
      newData = financialData.filter(item =>
        partnerType.includes(item.partner_type),
      );
    }

    let checkedPartner;

    if (checkedPartnerItems.length === 0) {
      const tempArr = [];
      partnersList.map(item => {
        tempArr.push(item.partner_id);

        return true;
      });
      checkedPartner = tempArr;
    } else {
      checkedPartner = checkedPartnerItems;
    }

    newData.map(item => {
      if (selectedProgram.length === 0) {
        checkedPartner.map(i => {
          if (item.partner_id === i) {
            const obj = filteredData.find(
              x => x.program_id === item.program_id,
            );
            if (!obj) {
              filteredData.push({
                program_code: item.program_code,
                program_id: item.program_id,
                program_name: item.program_name,
                value: item.value,
                count: item.value !== 0 ? 1 : 0,
              });
            } else {
              const objIndex = filteredData.findIndex(
                p => p.program_id === item.program_id,
              );
              filteredData[objIndex].value += item.value;
              if (item.value !== 0) filteredData[objIndex].count += 1;
            }
          }
          return true;
        });
      } else {
        selectedProgram.map(y => {
          if (item.program_id === y) {
            checkedPartner.map(i => {
              if (item.partner_id === i) {
                const obj = filteredData.find(
                  x => x.program_id === item.program_id,
                );
                if (!obj) {
                  filteredData.push({
                    program_code: item.program_code,
                    program_id: item.program_id,
                    program_name: item.program_name,
                    value: item.value,
                    count: item.value !== 0 ? 1 : 0,
                  });
                } else {
                  const objIndex = filteredData.findIndex(
                    p => p.program_id === item.program_id,
                  );
                  filteredData[objIndex].value += item.value;
                  if (item.value !== 0)
                    filteredData[objIndex].count += 1;
                }
              }
              return true;
            });
          }
          return true;
        });
      }
      return true;
    });
    // filteredData.sort((a, b) => a.program_id - b.program_id);
    return filteredData;
  };

  getInitialOverviewData = () => {
    const { selectedProgram, checkedPartnerItems } = this.props;
    const { financialData } = this.props.financialReducer;

    const totalBeneficiaries = this.calculateTotalBeneficiaries(
      checkedPartnerItems,
    );
    const partnerCount = this.calculatePartnerCount(
      checkedPartnerItems,
    );
    const programCount = this.calculateProgramCount(selectedProgram);

    // CALCULATE INITIAL BRANCHES COUNT
    const filteredData = [];

    financialData.map(item => {
      const obj = filteredData.find(
        x => x.program_id === item.program_id,
      );

      if (!obj) {
        console.log('this runs', item);
        filteredData.push({
          program_code: item.program_code,
          program_id: item.program_id,
          program_name: item.program_name,
          value: item.value,
          count: item.value !== 0 ? 1 : 0,
        });
      } else {
        const objIndex = filteredData.findIndex(
          p => p.program_id === item.program_id,
        );
        filteredData[objIndex].value += item.value;
        if (item.value !== 0) filteredData[objIndex].count += 1;
      }

      return true;
    });

    console.log('obj value check', filteredData);

    let maxValue = 0;
    filteredData.map(item => {
      if (maxValue < item.value) {
        maxValue = item.value;
      }
      return true;
    });

    // filteredData.sort((a, b) => b.program_id - a.program_id);

    this.setState({
      totalBeneficiaries,
      partnerCount,
      programCount,
      filteredData,
      maxValue,
    });
  };

  updateOverviewData = () => {
    const {
      selectedProgram,
      checkedPartnerItems,
      partnerType,
      financialReducer: { financialData },
    } = this.props;

    const filteredData = this.calculateFilteredData(
      selectedProgram,
      checkedPartnerItems,
      partnerType,
    );

    let maxValue = 0;
    filteredData.map(item => {
      if (maxValue < item.value) {
        maxValue = item.value;
      }
      return true;
    });

    const totalBeneficiaries = this.calculateTotalBeneficiaries(
      checkedPartnerItems,
      selectedProgram,
      partnerType,
    );
    const partnerCount = this.calculatePartnerCount(
      checkedPartnerItems,
      partnerType,
    );
    const programCount = this.calculateProgramCount(
      selectedProgram,
      // partnerType,
    );

    this.setState({
      totalBeneficiaries,
      partnerCount,
      programCount,
      maxValue,
      filteredData,
    });
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2700);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.financialReducer.financialData !==
      this.props.financialReducer.financialData
    ) {
      this.getInitialOverviewData();
    }
    // if (prevProps.selectedProgram !== this.props.selectedProgram) {
    //   this.updateOverviewData();
    // }
    // if (
    //   prevProps.checkedPartnerItems !== this.props.checkedPartnerItems
    // ) {
    //   this.updateOverviewData();
    // }

    if (
      prevProps.selectedProgram !== this.props.selectedProgram ||
      prevProps.checkedPartnerItems !== this.props.checkedPartnerItems
    ) {
      this.updateOverviewData();
    }
    if (
      prevProps.financialReducer.financialProgram !==
      this.props.financialReducer.financialProgram
    ) {
      this.generateTimelineData();
    }
  }

  generateTimelineData = () => {
    const {
      financialReducer: { financialProgram },
    } = this.props;
    // const data = financialProgram.filter(item => item.total === 0);
    const data = [];
    financialProgram.forEach(item => {
      if (item.date !== null) {
        const obj = data.some(
          x => x.date.slice(0, 7) === item.date.slice(0, 7),
        );
        if (!obj) {
          data.push({
            date: item.date,
            name: [item.name],
          });
        } else {
          const objIndex = data.findIndex(
            i => i.date.slice(0, 7) === item.date.slice(0, 7),
          );
          data[objIndex].name.push(item.name);
        }
      }
    });

    // const data = financialProgram;

    const allYears = [];
    data.filter(item => {
      const year = item.date.substring(0, 4);
      allYears.push(year);
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

    data.map(item => {
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

    setTimeout(() => {
      const x = document.getElementById(`${years[0]}`);
      x.style.display = 'block';
      this.setState({ [years[0]]: true });
    }, 200);

    this.setState({
      timelineData: arr,
    });
  };

  handleHover = id => {
    this.setState(prevState => ({
      isHovered: !prevState.isHovered,
      hoverID: id,
    }));
  };

  handleUnhover = () => {
    this.setState({ isHovered: false, hoverID: 1 });
  };

  handleTimelineToggle = (key, e) => {
    const x = document.getElementById(`${key}`);
    const y = document.querySelectorAll('.timeline-display');

    // for (let i = 0; i < y.length; i += 1) {
    //   if (y[i].contains(e.target)) {
    //     y[i].style.display = 'block';
    //   } else {
    //     y[i].style.display = 'none';
    //   }
    // }
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
      financialProgram,
      financialData,
      loading,
    } = this.props.financialReducer;

    const {
      showRightSidebar,
      handleRightSidebarShow,
      selectedProgram,
      checkedPartnerItems,
    } = this.props;

    const {
      isHovered,
      hoverID,
      totalBeneficiaries,
      filteredData,
      partnerCount,
      programCount,
      maxValue,
      timelineData,
    } = this.state;

    return (
      <aside className="sidebar right-sidebar literacy-right-sidebar">
        <div className="sidebar-in">
          <div className="right-sidebar-header">
            <h5>Overview</h5>
          </div>
          <div className="aside-body">
            <div className="sidebar-widget">
              <div
                className="widget-body"
                style={{ backgroundColor: '#f7f7f7' }}
              >
                {loading ? (
                  <WidgetCardLoader />
                ) : (
                  <ul className="widget-list">
                    <li>
                      <div className="widget-content">
                        <h6>Total Beneficiaries</h6>
                        <span>
                          {numberWithCommas(totalBeneficiaries)}
                        </span>
                      </div>
                      <div className="widget-icon">
                        <span>
                          <i className="material-icons">people</i>
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="widget-content">
                        <h6>Partner Institutions</h6>
                        <span>{partnerCount}</span>
                      </div>
                      <div className="widget-icon">
                        <span>
                          <i className="material-icons">
                            location_city
                          </i>
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="widget-content">
                        <h6>Financial Literacy Initiative</h6>
                        <span>{programCount}</span>
                      </div>
                      <div className="widget-icon">
                        <span>
                          <i className="material-icons">business</i>
                        </span>
                      </div>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className="sidebar-widget program-widget">
              {loading ? (
                <WidgetBodyLoader />
              ) : (
                <>
                  <h5>Beneficiaries and Partner Count</h5>
                  <div className="widget-body">
                    {filteredData &&
                      filteredData.map(item => {
                        if (item.value !== 0) {
                          const width = (item.value * 100) / maxValue;

                          return (
                            <div
                              className="program-list"
                              key={item.program_id}
                            >
                              <div className="program-info">
                                <div className="info-in">
                                  <h6 style={{ fontSize: '12px' }}>
                                    {item.program_name}
                                  </h6>

                                  <div className="program-text">
                                    <i className="material-icons">
                                      location_city
                                    </i>

                                    <span>{item.count}</span>
                                    {/* <span>{item.code}</span> */}
                                  </div>
                                </div>
                              </div>
                              <div className="program">
                                <div
                                  className="program-bar"
                                  tooltip={`${
                                    item.program_name
                                  }: ${numberWithCommas(item.value)}`}
                                  flow="down"
                                  style={{
                                    width: `${width}%`,
                                    backgroundColor: colorPicker(
                                      item.program_id,
                                    ),
                                  }}
                                >
                                  {/* {numberWithCommas(item.value)} */}
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return true;
                      })}
                  </div>
                </>
              )}
            </div>
            <div className="sidebar-widget timeline-widget">
              <h5 style={{ marginBottom: 0 }}>Initiative Timeline</h5>
              <div className="widget-body">
                <div className="timeline">
                  {timelineData &&
                    timelineData.map(item => {
                      return (
                        <ul className="year">
                          <div className="date-time" id="timeline-id">
                            <div
                              style={{
                                // display: 'inline-flex',
                                background: '#f7f7f7',
                                width: 'inherit',
                              }}
                            >
                              <time
                                onClick={e =>
                                  this.handleTimelineToggle(
                                    item.year,
                                    e,
                                  )
                                }
                                style={{
                                  cursor: 'pointer',
                                  display: 'flex',
                                }}
                              >
                                {/* <button
                                type="button"
                                className="common-button is-bg"
                              >
                                {item.year}
                              </button> */}
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
                              if (Object.entries(list).length !== 0) {
                                temp = (
                                  <li
                                    key={item.id}
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
                                        <ul>
                                          {list.name.map(nam => (
                                            <li
                                              style={{
                                                listStyle: 'disc',
                                              }}
                                            >
                                              <p>{nam}</p>
                                            </li>
                                          ))}
                                        </ul>
                                        {/* <p>{list.name}</p> */}
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

                  {/* <ul className="year">
                    <div className="date-time">
                      <time>2015</time>
                    </div>
                    <li className="active">
                      <div className="timeline-content ">
                        <div className="timeline-text">
                          <span>1 june</span>
                          <p>
                            Year-round 12 module Financial Literacy
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="blank" />
                    <li className="blank" />
                    <li className="blank" />
                    <li className="blank" />
                    <li className="blank" />
                    <li className="blank" />
                    <li className="blank" />
                    <li className="">
                      <div className="timeline-content ">
                        <div className="timeline-text">
                          <p>
                            Year-round 12 module Financial Literacy
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>

            {/* <div className="sidebar-widget timeline-widget">
              <h5 style={{ textTransform: 'none' }}>
                Timeline of Financial Literacy Initiative
              </h5>
              <div className="widget-body">
                <ul className="timeline">
                  {financialProgram &&
                    financialProgram.map((item, index) => {
                      const date = new Date(item.date);
                      if (item.total === 0) {
                        return (
                          <li
                            key={item.id}
                            className={
                              hoverID === index ? 'active' : ''
                            }
                          >
                            <div className="date-time">
                                <time>{date.getFullYear()}</time>
                              <b>
                                {date.toDateString().split(' ')[1]}
                              </b>
                            </div>
                            <div
                              onMouseEnter={() => {
                                this.handleHover(index);
                              }}
                              onMouseLeave={() => {
                                this.handleUnhover(index);
                              }}
                              className="timeline-content "
                            >
                              <div className="timeline-text">
                                {item.name}
                              </div>
                            </div>
                          </li>
                        );
                      }
                      return null;
                    })}
                </ul>
              </div>
            </div> */}
          </div>
        </div>
        <div
          className={
            showRightSidebar
              ? 'expand-button'
              : 'expand-button active'
          }
          style={{ zIndex: 1000 }}
        >
          <button
            type="button"
            className="common-button is-clear close-all"
            onClick={handleRightSidebarShow}
          >
            <i className="material-icons">chevron_right</i>
          </button>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = ({ financialReducer }) => ({
  financialReducer,
});
export default connect(mapStateToProps, {})(RightSideBar);
