import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    };
  }

  calculateTotalBeneficiaries = (
    selectedPartner = [],
    selectedProgram = [],
  ) => {
    const {
      financialReducer: { financialData },
    } = this.props;

    const arr = [];
    const arr2 = [];
    financialData.map(item => {
      const obj = arr.find(x => x.partner_id === item.partner_id);
      const obj2 = arr2.find(x => x.program_id === item.program_id);
      if (!obj) {
        arr.push(item);
      }
      if (!obj2) {
        arr2.push(item);
      }
      return true;
    });

    // console.log(arr2, 'arr');

    let tempBeneficiary = 0;
    let partnerBeneficiary = 0;
    // let bothBeneficiary = 0;

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
      financialData.map(item => {
        if (
          // selectedPartner.includes(item.partner_id) &&
          selectedProgram.includes(item.program_id)
        ) {
          totalBeneficiary += item.value;
        }
        return true;
      });
    } else if (
      selectedPartner.length > 0 &&
      selectedProgram.length > 0
    ) {
      financialData.map(item => {
        if (
          selectedPartner.includes(item.partner_id) &&
          selectedProgram.includes(item.program_id)
        ) {
          totalBeneficiary += item.value;
        }
        return true;
      });
    }

    // debugger;
    // console.log(tempBeneficiary, 'tempBeneficiary');

    return totalBeneficiary;
  };

  calculatePartnerCount = selectedPartner => {
    const { financialData } = this.props.financialReducer;
    let partnerCount;

    if (selectedPartner.length !== 0) {
      partnerCount = selectedPartner.length;
    } else {
      const arr = [];
      financialData.map(item => {
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

  calculateFilteredData = (selectedProgram, checkedPartnerItems) => {
    const { financialData } = this.props.financialReducer;
    const filteredData = [];

    financialData.map(item => {
      if (selectedProgram.length === 0) {
        checkedPartnerItems.map(i => {
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
                count: 1,
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
            checkedPartnerItems.map(i => {
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
                    count: 1,
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
        filteredData.push({
          program_code: item.program_code,
          program_id: item.program_id,
          program_name: item.program_name,
          value: item.value,
          count: 1,
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
    const { selectedProgram, checkedPartnerItems } = this.props;
    const { financialData } = this.props.financialReducer;

    const filteredData = this.calculateFilteredData(
      selectedProgram,
      checkedPartnerItems,
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
    );
    const partnerCount = this.calculatePartnerCount(
      checkedPartnerItems,
    );
    const programCount = this.calculateProgramCount(selectedProgram);

    this.setState({
      totalBeneficiaries,
      partnerCount,
      programCount,
      maxValue,
      filteredData,
    });
  };

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
  }

  handleHover = id => {
    this.setState(prevState => ({
      isHovered: !prevState.isHovered,
      hoverID: id,
    }));
  };

  handleUnhover = () => {
    this.setState({ isHovered: false, hoverID: 1 });
  };

  render() {
    const {
      financialProgram,
      financialData,
    } = this.props.financialReducer;

    const {
      showRightSidebar,
      handleRightSidebarShow,
      selectedProgram,
      checkedPartnerItems,
    } = this.props;

    // const tempArr = [];
    // let totalBeneficiaries = 0;

    // financialData.map(item => {
    //   const obj = tempArr.find(x => x.partner_id === item.partner_id);
    //   if (!obj) {
    //     if (checkedPartnerItems.length !== 0) {
    //       checkedPartnerItems.map(i => {
    //         if (item.partner_id === i) {
    //           tempArr.push(item);
    //           totalBeneficiaries += item.single_count;
    //         }
    //         return true;
    //       });
    //     } else {
    //       tempArr.push(item);
    //       totalBeneficiaries += item.single_count;
    //     }
    //   }
    //   return true;
    // });

    // let filteredData = [];

    // financialData.map(item => {
    //   if (checkedPartnerItems.length !== 0) {
    //     checkedPartnerItems.map(i => {
    //       if (item.partner_id === i) {
    //         const obj = filteredData.find(
    //           x => x.program_id === item.program_id,
    //         );
    //         if (!obj) {
    //           filteredData.push({
    //             program_code: item.program_code,
    //             program_id: item.program_id,
    //             program_name: item.program_name,
    //             value: item.value,
    //           });
    //         } else {
    //           const objIndex = filteredData.findIndex(
    //             p => p.program_id === item.program_id,
    //           );
    //           filteredData[objIndex].value += item.value;
    //         }
    //       }
    //       return true;
    //     });
    //   } else {
    //     const obj = filteredData.find(
    //       x => x.program_id === item.program_id,
    //     );
    //     if (!obj) {
    //       filteredData.push({
    //         program_code: item.program_code,
    //         program_id: item.program_id,
    //         program_name: item.program_name,
    //         value: item.value,
    //       });
    //     } else {
    //       const objIndex = filteredData.findIndex(
    //         i => i.program_id === item.program_id,
    //       );
    //       filteredData[objIndex].value += item.value;
    //     }
    //   }
    //   return true;
    // });
    // const neww = [];
    // if (selectedProgram.length !== 0) {
    //   selectedProgram.map(item => {
    //     const arr = filteredData.filter(i => i.program_id === item);
    //     neww.push(arr);
    //     return true;
    //   });
    //   filteredData = neww;
    // }

    // let maxValue = 0;
    // filteredData.map(item => {
    //   if (maxValue < item.value) {
    //     maxValue = item.value;
    //   }
    //   return true;
    // });

    const {
      isHovered,
      hoverID,
      totalBeneficiaries,
      filteredData,
      partnerCount,
      programCount,
      maxValue,
    } = this.state;
    return (
      <aside className="sidebar right-sidebar literacy-right-sidebar">
        <div className="sidebar-in">
          <div className="right-sidebar-header">
            <h5>Overview</h5>
          </div>
          <div className="aside-body">
            <div className="sidebar-widget">
              <div className="widget-body is-dark">
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
                      <h6>Program Initiative</h6>
                      <span>{programCount}</span>
                    </div>
                    <div className="widget-icon">
                      <span>
                        <i className="material-icons">business</i>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="sidebar-widget program-widget">
              <h5>Beneficiaries Count</h5>
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

                {/* <div className="program-list">
                  <div className="program-info">
                    <div className="info-in">
                      <h5>PGT</h5>
                      <div className="program-text">
                        <i className="material-icons">business</i>
                        <span>14</span>
                      </div>
                    </div>
                  </div>
                  <div className="program">
                    <div
                      className="program-bar is-red"
                      tooltip="Chhimek Laghubitta Bittiya Sanstha:162"
                      flow="up"
                      style={{ width: '56%' }}
                    >
                      197298
                    </div>
                  </div>
                </div>
                <div className="program-list">
                  <div className="program-info">
                    <div className="info-in">
                      <h5>Centre meeting</h5>
                      <div className="program-text">
                        <i className="material-icons">business</i>
                        <span>14</span>
                      </div>
                    </div>
                  </div>
                  <div className="program">
                    <div
                      className="program-bar is-orange"
                      tooltip="Chhimek Laghubitta Bittiya Sanstha:162"
                      flow="up"
                      style={{ width: '56%' }}
                    >
                      197298
                    </div>
                  </div>
                </div>
                <div className="program-list">
                  <div className="program-info">
                    <div className="info-in">
                      <h5>IVR</h5>
                      <div className="program-text">
                        <i className="material-icons">business</i>
                        <span>14</span>
                      </div>
                    </div>
                  </div>
                  <div className="program">
                    <div
                      className="program-bar is-blue"
                      tooltip="Chhimek Laghubitta Bittiya Sanstha:162"
                      flow="up"
                      style={{ width: '56%' }}
                    >
                      197298
                    </div>
                  </div>
                </div>
                <div className="program-list">
                  <div className="program-info">
                    <div className="info-in">
                      <h5>Tab</h5>
                      <div className="program-text">
                        <i className="material-icons">business</i>
                        <span>14</span>
                      </div>
                    </div>
                  </div>
                  <div className="program">
                    <div
                      className="program-bar is-pink"
                      tooltip="Chhimek Laghubitta Bittiya Sanstha:162"
                      flow="up"
                      style={{ width: '56%' }}
                    >
                      197298
                    </div>
                  </div>
                </div>
                <div className="program-list">
                  <div className="program-info">
                    <div className="info-in">
                      <h5>Tab</h5>
                      <div className="program-text">
                        <i className="material-icons">business</i>
                        <span>14</span>
                      </div>
                    </div>
                  </div>
                  <div className="program">
                    <div
                      className="program-bar is-other"
                      tooltip="Chhimek Laghubitta Bittiya Sanstha:162"
                      flow="up"
                      style={{ width: '56%' }}
                    >
                      197298
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="sidebar-widget timeline-widget">
              <h5>Timeline of Financial Literacy Initiative</h5>
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
                  {/* <li className="active">
                    <div className="date-time">
                      <time>2015</time>
                      <b>Jun</b>
                    </div>
                    <div className="timeline-content ">
                      <div className="timeline-text">
                        Year-round 12 module Financial Literacy
                      </div>
                    </div>
                  </li>
                  <li className="">
                    <div className="date-time">
                      <time>2015</time>
                      <b>Jun</b>
                    </div>
                    <div className="timeline-content ">
                      <div className="timeline-text">
                        Year-round 12 module Financial Literacy
                      </div>
                    </div>
                  </li>
                  <li className="">
                    <div className="date-time">
                      <time>2015</time>
                      <b>Jun</b>
                    </div>
                    <div className="timeline-content ">
                      <div className="timeline-text">
                        Year-round 12 module Financial Literacy
                      </div>
                    </div>
                  </li> */}
                </ul>
              </div>
            </div>
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
