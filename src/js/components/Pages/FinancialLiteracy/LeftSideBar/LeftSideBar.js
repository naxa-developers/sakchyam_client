import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeftSidebarLoaderFL from '../Loader/LeftSidebarLoaderFL';

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
class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({ loading: false });
    // }, 2700);
  }

  render() {
    const {
      partnersList,
      financialProgram,
      filteredPartnersList,
    } = this.props.financialReducer;
    const {
      // state: {},
      props: {
        handlePartnerChange,
        handlePartnerParentCheckbox,
        handlePartnerType,
        partnerType,
        selectedProgram,
        handleSelectedProgram,
        isAllPartnerSelected,
        applyClick,
        resetClick,
        loading,
        checkedPartnerItems,
      },
    } = this;

    console.log(loading, 'loading');
    return (
      <aside className="sidebar left-sidebar literacy-sidebar">
        {loading ? (
          <LeftSidebarLoaderFL />
        ) : (
          <div className="sidebar-in">
            <div className="aside-header">
              <button type="button" className="common-button is-bg">
                Financial Literacy
              </button>
            </div>
            <div className="aside-body apply-body">
              <div className="sidebar-widget">
                <h6 className="title">Partner Type</h6>
                <div className="widget-body">
                  <div className="widget-tag partner-tag">
                    <a
                      onClick={() => {
                        handlePartnerType(
                          'Microfinance Institutions',
                        );
                      }}
                      onKeyDown={() => {
                        handlePartnerType(
                          'Microfinance Institutions',
                        );
                      }}
                      className={
                        partnerType.includes(
                          'Microfinance Institutions',
                        )
                          ? 'active'
                          : ''
                      }
                      role="tab"
                      tabIndex="0"
                    >
                      <span>Microfinance</span>
                    </a>
                    <a
                      onClick={() => {
                        handlePartnerType(
                          'Commercial Bank and Other Partners',
                        );
                      }}
                      onKeyDown={() => {
                        handlePartnerType(
                          'Commercial Bank and Other Partners',
                        );
                      }}
                      className={
                        partnerType.includes(
                          'Commercial Bank and Other Partners',
                        )
                          ? 'active'
                          : ''
                      }
                      tabIndex="0"
                      role="tab"
                    >
                      <span style={{ textTransform: 'none' }}>
                        Commercial Banks and PSPs
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="sidebar-widget partner-institue">
                <h6 className="title">Partner Institution</h6>
                <div className="widget-body">
                  <div className="checklist-group">
                    <div className="checklist-header">
                      <div className="custom-checkbox">
                        <input
                          id="all_partner"
                          type="checkbox"
                          name="Initiative"
                          checked={isAllPartnerSelected}
                          onClick={handlePartnerParentCheckbox}
                        />
                        <label htmlFor="all_partner">All</label>
                      </div>
                    </div>
                    <ul className="checkbox-list">
                      {filteredPartnersList &&
                        filteredPartnersList.map(data => {
                          return (
                            <li key={data.id}>
                              <a>
                                <div className="custom-checkbox">
                                  <input
                                    id={data.partner_id}
                                    className="partner_checkbox"
                                    type="checkbox"
                                    name={data.partner_name}
                                    onClick={handlePartnerChange}
                                  />
                                  <label htmlFor={data.partner_id}>
                                    <span>{data.partner_name}</span>
                                  </label>
                                </div>
                              </a>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="sidebar-widget">
                <h6 className="title">
                  Financial Literacy Initiative
                </h6>
                <div className="widget-body">
                  <div className="widget-tag Program-tag">
                    {financialProgram &&
                      financialProgram.map(data => {
                        if (data.total !== 0)
                          return (
                            <a
                              onClick={() => {
                                handleSelectedProgram(data.id);
                              }}
                              onKeyDown={() => {
                                handleSelectedProgram(data.id);
                              }}
                              className={
                                selectedProgram.includes(data.id)
                                  ? 'active'
                                  : ''
                              }
                              tabIndex="0"
                              role="tab"
                            >
                              <small
                                className="icon"
                                style={{
                                  backgroundColor: colorPicker(
                                    data.id,
                                  ),
                                }}
                              />
                              <span>{data.name}</span>
                            </a>
                          );
                        return null;
                      })}

                    {/* <a href="#" className="active">
                    <small className="icon is-orange" />
                    <span>Centre meeting</span>
                  </a>
                  <a href="#">
                    <small className="icon is-blue" />
                    <span>IVR</span>
                  </a>
                  <a href="#">
                    <small className="icon is-pink" />
                    <span>Tab</span>
                  </a>
                  <a href="#">
                    <small className="icon is-green" />
                    <span>street drama</span>
                  </a>
                  <a href="#">
                    <small className="icon is-other" />
                    <span>others</span>
                  </a> */}
                  </div>
                </div>
              </div>
              <div className="apply-buttons buttons end">
                <button
                  onClick={resetClick}
                  type="button"
                  className="common-button is-clear "
                >
                  reset
                </button>
                <button
                  onClick={applyClick}
                  type="button"
                  className="common-button is-bg"
                >
                  apply
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    );
  }
}

const mapStateToProps = ({ financialReducer }) => ({
  financialReducer,
});
export default connect(mapStateToProps, {})(LeftSideBar);
