/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  CaretUp,
  CaretDown,
} from '../../FinancialLiteracy/RightSideBar/Caret';
import { WidgetCardLoader } from '../../FinancialLiteracy/Loader/RightSidebarLoaderFL';
import { downloadPng } from '../../../common/utilFunctions';
import DownloadIcon from '../../../../../img/get_app.png';

class RightSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHoverd: false,
      hoverID: 0,
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

      const years = [];
      timelineData.forEach(item => years.push(item.year));

      const maxYear = Math.max(...years);

      setTimeout(() => {
        const x = document.getElementById(maxYear);
        x.style.display = 'block';
        this.setState({ [maxYear]: true });
      }, 200);
    }
    //   setTimeout(() => {
    //     const x = document.getElementById(`${years[0]}`);
    //     x.style.display = 'block';
    //     this.setState({ [years[0]]: true });
    //   }, 200);
    // }
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
      showRightSidebar,
      handleRightSidebarShow,
      notificationHandler,
      productProcessReducer: { overviewData, loading },
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
            <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ flex: 1 }}>
                <h5>Overview</h5>
              </div>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <div
                  className="widget-icon"
                  onClick={() => {
                    notificationHandler();
                    downloadPng(
                      'download-id',
                      'Product Process Overview ',
                    );
                  }}
                  style={{ paddingRight: '10px', cursor: 'pointer' }}
                >
                  <img
                    alt="cat"
                    src={DownloadIcon}
                    style={{ height: '18px', width: '18px' }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="aside-body">
            <div className="sidebar-widget" id="download-id">
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
                        <h6>Innovation area</h6>
                        <span>
                          {/* {innovationAreaCount !== 0
                          ? innovationAreaCount
                          : defaultInnovation} */}
                          {/* {numberWithCommas(totalBeneficiaries)} */}
                          {innovationAreaCount}
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
                          {/* {partnerInstitutionCount !== 0
                          ? partnerInstitutionCount
                          : defaultPartner} */}
                          {partnerInstitutionCount}
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
                          {/* {productCount !== 0
                          ? productCount
                          : defaultProduct} */}
                          {productCount}
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
                )}
              </div>
            </div>

            <div className="sidebar-widget timeline-widget">
              <h5 style={{ textTransform: 'none', marginBottom: 0 }}>
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
                              if (Object.entries(list).length !== 0) {
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
