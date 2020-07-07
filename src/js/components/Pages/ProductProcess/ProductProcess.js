import React from 'react';
import { connect } from 'react-redux';
import Header from '../../Header';
import LeftSideBar from './LeftSideBar/LeftSideBar';
import RightSideBar from './RightSideBar/RightSideBar';
import { getProductProcessList } from '../../../actions/productProcess.actions';
import BubbleChart from './Charts/BubbleChart/BubbleChart';
import HeatmapChart from './Charts/Heatmap/HeatmapChart';
import RadarChart from './Charts/Radar/RadarChart';

class ProductProcess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // innovationArea: [],
      // productCategory: [],
      // productName: [],
      // partnerType: [],
      // partnerInstitution: [],
      // marketFailure: [],

      showRightSidebar: true,
    };
  }

  componentDidMount() {
    // const { getProductProcessList } = this.props;
    this.props.getProductProcessList();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      productProcessReducer: {
        innovationAreaList,
        productCategoryList,
        productNameList,
        partnerTypeList,
        partnerNameList,
        marketFailureList,
      },
    } = this.props;
    if (
      prevProps.productProcessReducer.innovationAreaList !==
      this.props.productProcessReducer.innovationAreaList
    ) {
      // comment
    }
  }

  handleRightSidebarShow = () => {
    this.setState(prevState => ({
      showRightSidebar: !prevState.showRightSidebar,
    }));
  };

  handleInnovationAreaCheckbox = e => {
    console.log(e.target);
  };

  render() {
    const { showRightSidebar } = this.state;
    const { visualizationType } = this.props;
    const {
      productProcessReducer: {
        innovationAreaList,
        productCategoryList,
        productNameList,
        partnerTypeList,
        partnerNameList,
        marketFailureList,
      },
    } = this.props;
    return (
      <>
        <Header />
        <div
          className={
            showRightSidebar
              ? 'automation-wrapper literacy-wrapper'
              : 'automation-wrapper literacy-wrapper expand-right-sidebar'
          }
        >
          <LeftSideBar
            innovationArea={innovationAreaList}
            productCategory={productCategoryList}
            productName={productNameList}
            partnerType={partnerTypeList}
            partnerName={partnerNameList}
            marketFailure={marketFailureList}
            handleInnovationAreaCheckbox={
              this.handleInnovationAreaCheckbox
            }
          />

          <main className="main">
            <div className="main-card map-card" />
            <div className="main-card literacy-main-card">
              <div className="literacy-tab-content">
                <div className="literacy-tab-item">
                  <div className="graph-view">
                    <div className="row">
                      {/* <div className="col-xl-12">
                        <div className="card" />
                      </div> */}
                      <div className="col-xl-6">
                        <div className="card" id="chart-donut">
                          <div className="card-header">
                            <h5>Product Results</h5>
                            <div className="header-icons">
                              <span
                                className=""
                                onClick={() => {
                                  this.downloadPng('donut-chart');
                                }}
                                onKeyDown={() => {
                                  this.downloadPng('donut-chart');
                                }}
                                role="tab"
                                tabIndex="0"
                              >
                                {/* <img src={DownloadIcon} alt="open" /> */}
                              </span>
                              <span
                                className=""
                                role="tab"
                                tabIndex="0"
                                onClick={() => {
                                  this.handleModal();
                                  this.handleSelectedModal(
                                    'donut',
                                    'Ratio of Microfinance and Commercial',
                                  );
                                }}
                                onKeyDown={() => {
                                  this.handleModal();
                                  this.handleSelectedModal(
                                    'donut',
                                    'Ratio of Microfinance and Commercial',
                                  );
                                }}
                              >
                                {/* <img src={ExpandIcon} alt="open" /> */}
                              </span>
                            </div>
                          </div>
                          <div className="card-body">
                            <BubbleChart />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="card" id="chart-donut">
                          <div className="card-header">
                            <h5>Innovation Area Radar Chart</h5>
                            <div className="header-icons">
                              <span
                                className=""
                                onClick={() => {
                                  this.downloadPng('donut-chart');
                                }}
                                onKeyDown={() => {
                                  this.downloadPng('donut-chart');
                                }}
                                role="tab"
                                tabIndex="0"
                              >
                                {/* <img src={DownloadIcon} alt="open" /> */}
                              </span>
                              <span
                                className=""
                                role="tab"
                                tabIndex="0"
                                onClick={() => {
                                  this.handleModal();
                                  this.handleSelectedModal(
                                    'donut',
                                    'Ratio of Microfinance and Commercial',
                                  );
                                }}
                                onKeyDown={() => {
                                  this.handleModal();
                                  this.handleSelectedModal(
                                    'donut',
                                    'Ratio of Microfinance and Commercial',
                                  );
                                }}
                              >
                                {/* <img src={ExpandIcon} alt="open" /> */}
                              </span>
                            </div>
                          </div>
                          <div className="card-body">
                            <RadarChart />
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-xl-6">
                        <div className="card" id="">
                          <RadarChart />
                        </div>
                      </div> */}
                    </div>

                    <div className="card" ref={this.sankeyRef}>
                      <div className="card-header">
                        <h5>Heatmap Chart</h5>
                        <div className="header-icons">
                          <span
                            className
                            onClick={() => {
                              this.downloadPng('sankey-chart');
                            }}
                            onKeyDown={() => {
                              this.downloadPng('sankey-chart');
                            }}
                            role="tab"
                            tabIndex="0"
                          >
                            {/* <img src={DownloadIcon} alt="open" /> */}
                          </span>
                          <span
                            className=""
                            role="tab"
                            tabIndex="0"
                            onClick={() => {
                              this.handleModal();
                              this.handleSelectedModal(
                                'sankey',
                                'Beneficiaries Reached By Partners',
                              );
                            }}
                            onKeyDown={() => {
                              this.handleModal();
                              this.handleSelectedModal(
                                'sankey',
                                'Beneficiaries Reached By Partners',
                              );
                            }}
                          >
                            {/* <img src={ExpandIcon} alt="open" /> */}
                          </span>
                        </div>
                      </div>
                      <div className="card-body">
                        <HeatmapChart />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="literacy-tab-item"
                  style={
                    visualizationType === 'Data'
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                />
              </div>
            </div>
          </main>

          <RightSideBar showRightSidebar={showRightSidebar} />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ productProcessReducer }) => ({
  productProcessReducer,
});
export default connect(mapStateToProps, {
  getProductProcessList,
})(ProductProcess);
