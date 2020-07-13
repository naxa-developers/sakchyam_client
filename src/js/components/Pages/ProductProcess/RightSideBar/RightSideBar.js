/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  CaretUp,
  CaretDown,
} from '../../FinancialLiteracy/RightSideBar/Caret';

class RightSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverID: 1,
      innovationAreaCount: '-',
      partnerInstitutionCount: '-',
      productCount: '-',
      defaultInnovation: '',
      defaultPartner: '',
      defaultProduct: '',
    };
  }

  componentDidUpdate(prevProps) {
    const {
      productProcessReducer: {
        overviewData: {
          innovationAreaCount,
          partnerInstitutionCount,
          productCount,
        },
        timelineData,
      },
    } = this.props;
    if (
      this.props.productProcessReducer.overviewData !==
      prevProps.productProcessReducer.overviewData
    ) {
      this.setState({
        innovationAreaCount,
        partnerInstitutionCount,
        productCount,
      });
      if (
        innovationAreaCount !== 0 &&
        partnerInstitutionCount !== 0 &&
        productCount !== 0
      ) {
        this.setState({
          defaultInnovation: innovationAreaCount,
          defaultPartner: partnerInstitutionCount,
          defaultProduct: productCount,
        });
      }
    }
    if (
      this.props.productProcessReducer.timelineData !==
      prevProps.productProcessReducer.timelineData
    ) {
      this.setState({
        timelineData,
      });
    }
  }

  render() {
    const {
      showRightSidebar,
      handleRightSidebarShow,
      productProcessReducer: { overviewData },
    } = this.props;

    const {
      innovationAreaCount,
      partnerInstitutionCount,
      productCount,

      defaultInnovation,
      defaultPartner,
      defaultProduct,
      timelineData,
      hoverID,
    } = this.state;

    return (
      <aside className="sidebar right-sidebar literacy-right-sidebar">
        <div className="sidebar-in">
          <div className="right-sidebar-header">
            <h5>Overview</h5>
          </div>
          <div className="aside-body">
            <div className="sidebar-widget">
              <div className="widget-body">
                <ul className="widget-list">
                  <li>
                    <div className="widget-content">
                      <h6>Innovation area</h6>
                      <span>
                        {innovationAreaCount !== 0
                          ? innovationAreaCount
                          : defaultInnovation}
                        {/* {numberWithCommas(totalBeneficiaries)} */}
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
                      <span>
                        {partnerInstitutionCount !== 0
                          ? partnerInstitutionCount
                          : defaultPartner}
                      </span>
                      {/* <span>{partnerCount}</span> */}
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
                      <h6>Products</h6>
                      <span>
                        {productCount !== 0
                          ? productCount
                          : defaultProduct}
                      </span>
                      {/* <span>{programCount}</span> */}
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
            {/* <div className="sidebar-widget program-widget">
              <h5 style={{ textTransform: 'none' }}>
                Beneficiaries and Partner Count
              </h5>
              <div className="widget-body"></div>
            </div> */}
            <div className="sidebar-widget timeline-widget">
              <h5 style={{ textTransform: 'none' }}>
                PRODUCT TIMELINE
              </h5>
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
                                onClick={
                                  e =>
                                    this.handleTimelineToggle(
                                      item.year,
                                      e,
                                    )
                                  // eslint-disable-next-line react/jsx-curly-newline
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
                            // style={{ display: 'none' }}
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
                                        <p>{list.name}</p>
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

const mapStateToProps = ({ productProcessReducer }) => ({
  productProcessReducer,
});

export default connect(mapStateToProps)(RightSideBar);
