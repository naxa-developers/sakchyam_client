import React, { Component } from 'react';
import { connect } from 'react-redux';

class RightSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      hoverID: 1,
    };
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

    const tempArr = [];
    let totalBeneficiaries = 0;

    financialData.map(item => {
      const obj = tempArr.find(x => x.partner_id === item.partner_id);
      if (!obj) {
        checkedPartnerItems.map(i => {
          if (item.partner_id === i) {
            tempArr.push(item);
            totalBeneficiaries += item.single_count;
          }
          return true;
        });
      }
      return true;
    });

    const filteredData = [];

    financialData.map(item => {
      if (checkedPartnerItems.length !== 0) {
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
              });
            } else {
              const objIndex = filteredData.findIndex(
                p => p.program_id === item.program_id,
              );
              filteredData[objIndex].value += item.value;
            }
          }
          return true;
        });
      } else {
        const obj = filteredData.find(
          x => x.program_id === item.program_id,
        );
        if (!obj) {
          filteredData.push({
            program_code: item.program_code,
            program_id: item.program_id,
            program_name: item.program_name,
            value: item.value,
          });
        } else {
          const objIndex = filteredData.findIndex(
            i => i.program_id === item.program_id,
          );
          filteredData[objIndex].value += item.value;
        }
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

    const { isHovered, hoverID } = this.state;
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
                      <span>{totalBeneficiaries}</span>
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
                      <h6>Partner Institutions</h6>
                      <span>{checkedPartnerItems.length}</span>
                    </div>
                    <div className="widget-icon">
                      <span>
                        <i className="material-icons">business</i>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="widget-content">
                      <h6>Program Initiative</h6>
                      <span>{selectedProgram.length}</span>
                    </div>
                    <div className="widget-icon">
                      <span>
                        <i className="material-icons">people</i>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="sidebar-widget program-widget">
              <h5>Branches Count</h5>
              <div className="widget-body">
                {filteredData &&
                  filteredData.map(item => {
                    // console.log(item, 'itemx');
                    // colors.map(color => {
                    const width = (item.value * 100) / maxValue;

                    // if (item.total !== 0) {
                    return (
                      <div className="program-list">
                        <div className="program-info">
                          <div className="info-in">
                            <h5>{item.program_name}</h5>
                            <div className="program-text">
                              <i className="material-icons">
                                business
                              </i>
                              <span>{item.program_code}</span>
                              {/* <span>{item.code}</span> */}
                            </div>
                          </div>
                        </div>
                        <div className="program">
                          <div
                            className="program-bar is-red"
                            tooltip="Chhimek Laghubitta Bittiya Sanstha:162"
                            flow="up"
                            style={{ width: `${width}%` }}
                          >
                            {item.value}
                          </div>
                        </div>
                      </div>
                    );
                    // }
                    // return false;

                    // });
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
              <h5>Initiative Timeline</h5>
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
