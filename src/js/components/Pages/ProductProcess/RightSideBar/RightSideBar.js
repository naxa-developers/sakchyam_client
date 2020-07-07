/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class RightSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      innovationAreaCount: '-',
      partnerInstitutionCount: '-',
      productCount: '-',
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
    }
  }

  render() {
    const {
      showRightSidebar,
      productProcessReducer: { overviewData },
    } = this.props;

    const {
      innovationAreaCount,
      partnerInstitutionCount,
      productCount,
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
                      <h6>Innovation area</h6>
                      <span>
                        {innovationAreaCount}
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
                      <span>{partnerInstitutionCount}</span>
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
                      <span>{productCount}</span>
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
                <ul className="timeline" />
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
            // onClick={handleRightSidebarShow}
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
