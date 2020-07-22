import React from 'react';
import { connect } from 'react-redux';

import html2canvas from 'html2canvas';
import saveAs from 'file-saver';

import Header from '../../Header';
import LeftSideBar from './LeftSideBar/LeftSideBar';
import RightSideBar from './RightSideBar/RightSideBar';
import Modal from './Modal';
import {
  getProductProcessData,
  getProductProcessList,
  filterProductNameList,
  filterPartnerNameList,
  filterBubbleChartData,
  filterRadarChartData,
  filterBarChartData,
  filterHeatmapChartData,
  filterOverviewDataPP,
  resetAllChartPP,
} from '../../../actions/productProcess.actions';
import BubbleChart from './Charts/BubbleChart/BubbleChart';
import HeatmapChart from './Charts/Heatmap/HeatmapChart';
import RadarChart from './Charts/Radar/RadarChart';
import BarChart from './Charts/BarChart/BarChart';
import DownloadIcon from '../../../../img/get_app.png';
import ExpandIcon from '../../../../img/open_in_full-black-18dp.png';

// CHART CARD TITLES
const chartTitles = {
  bubbleTitle: 'Product/Process Innovations',
  radarTitle: 'Number of products in Innovation Area by Partner Type',
  barTitle: 'Number of products by Market Failure',
  heatmapTitle:
    'Number of products by Market Failure and Innovation Area',
};

class ProductProcess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      innovationAreaSelection: [],
      isAllInnovationAreaSelected: false,
      productCategorySelection: [],
      isAllProductCategorySelected: false,
      productNameSelection: [],
      isAllProductNameSelected: false,

      partnerNameSelection: [],
      isAllPartnerNameSelected: false,
      marketFailureSelection: [],
      isAllMarketFailureSelected: false,
      partnerTypeSelection: [],

      showRightSidebar: true,
      activeModal: false,
      selectedModal: '',
      modalHeader: '',
    };
  }

  componentDidMount() {
    this.props.getProductProcessList();
    // this.props.getProductProcessData();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      productCategorySelection,
      partnerTypeSelection,
    } = this.state;
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
      prevState.productCategorySelection !== productCategorySelection
    ) {
      this.props.filterProductNameList(productCategorySelection);
    }
    if (prevState.partnerTypeSelection !== partnerTypeSelection) {
      this.props.filterPartnerNameList(partnerTypeSelection);
    }
  }

  downloadPng = (chartid, imageTitle) => {
    setTimeout(() => {
      html2canvas(document.querySelector(`#${chartid}`), {
        allowTaint: true,
      }).then(canvas => {
        canvas.toBlob(function(blob) {
          saveAs(blob, `${imageTitle}.png`);
        });
      });
    }, 500);
  };

  handleRightSidebarShow = () => {
    this.setState(prevState => ({
      showRightSidebar: !prevState.showRightSidebar,
    }));
  };

  handleInnovationAreaParentCheckbox = e => {
    const {
      innovationAreaSelection,
      isAllInnovationAreaSelected,
    } = this.state;
    if (isAllInnovationAreaSelected) {
      const allInnovationAreaElement = document.getElementsByClassName(
        'innovationarea_checkbox',
      );
      for (let i = 0; i < allInnovationAreaElement.length; i += 1) {
        allInnovationAreaElement[i].checked = false;
      }
      this.setState({
        innovationAreaSelection: [],
        isAllInnovationAreaSelected: false,
      });
    } else {
      this.setState({
        isAllInnovationAreaSelected: true,
      });
      if (e.target.checked === true) {
        const allInnovationAreaElement = document.getElementsByClassName(
          'innovationarea_checkbox',
        );
        const selectedInnovationArea = innovationAreaSelection;
        for (let i = 0; i < allInnovationAreaElement.length; i += 1) {
          allInnovationAreaElement[i].checked = true;
          selectedInnovationArea.push(
            allInnovationAreaElement[i].name,
          );
        }
        this.setState({
          innovationAreaSelection: selectedInnovationArea,
        });
      }
    }
  };

  handleInnovationAreaCheckbox = e => {
    const {
      state: { innovationAreaSelection },
    } = this;
    const {
      target: { name, checked, value },
    } = e;
    this.setState(preState => {
      if (checked) {
        return {
          innovationAreaSelection: [
            ...preState.innovationAreaSelection,
            name,
          ],
          // projectSelection: [],
        };
      }
      if (!checked) {
        const newArr = innovationAreaSelection.filter(
          daily => daily !== name,
        );
        return {
          innovationAreaSelection: newArr,
          // projectSelection: [],
        };
      }
      return null;
    });
  };

  handleProductCategoryParentCheckbox = e => {
    const {
      productCategorySelection,
      isAllProductCategorySelected,
    } = this.state;
    if (isAllProductCategorySelected) {
      const allProductCategoryElement = document.getElementsByClassName(
        'productcategory_checkbox',
      );
      for (let i = 0; i < allProductCategoryElement.length; i += 1) {
        allProductCategoryElement[i].checked = false;
      }
      this.setState({
        productCategorySelection: [],
        isAllProductCategorySelected: false,
      });
    } else {
      this.setState({
        isAllProductCategorySelected: true,
      });
      if (e.target.checked === true) {
        const allProductCategoryElement = document.getElementsByClassName(
          'productcategory_checkbox',
        );
        const selectedProductCategory = productCategorySelection;
        for (
          let i = 0;
          i < allProductCategoryElement.length;
          i += 1
        ) {
          allProductCategoryElement[i].checked = true;
          selectedProductCategory.push(
            allProductCategoryElement[i].name,
          );
        }
        this.setState({
          productCategorySelection: selectedProductCategory,
        });
      }
    }
  };

  handleProductCategoryCheckbox = e => {
    const {
      state: { productCategorySelection },
    } = this;
    const {
      target: { name, checked, value },
    } = e;
    this.setState(preState => {
      if (checked) {
        return {
          productCategorySelection: [
            ...preState.productCategorySelection,
            name,
          ],
          // projectSelection: [],
        };
      }
      if (!checked) {
        const newArr = productCategorySelection.filter(
          daily => daily !== name,
        );
        return {
          productCategorySelection: newArr,
          // projectSelection: [],
        };
      }
      return null;
    });
  };

  handleProductNameParentCheckbox = e => {
    const {
      productNameSelection,
      isAllProductNameSelected,
    } = this.state;
    if (isAllProductNameSelected) {
      const allProductNameElement = document.getElementsByClassName(
        'productname_checkbox',
      );
      for (let i = 0; i < allProductNameElement.length; i += 1) {
        allProductNameElement[i].checked = false;
      }
      this.setState({
        productNameSelection: [],
        isAllProductNameSelected: false,
      });
    } else {
      this.setState({
        isAllProductNameSelected: true,
      });
      if (e.target.checked === true) {
        const allProductNameElement = document.getElementsByClassName(
          'productname_checkbox',
        );
        const selectedProductName = productNameSelection;
        for (let i = 0; i < allProductNameElement.length; i += 1) {
          allProductNameElement[i].checked = true;
          selectedProductName.push(allProductNameElement[i].name);
        }
        this.setState({
          productNameSelection: selectedProductName,
        });
      }
    }
  };

  handleProductNameCheckbox = e => {
    const {
      state: { productNameSelection },
    } = this;
    const {
      target: { name, checked, value },
    } = e;
    this.setState(preState => {
      if (checked) {
        return {
          productNameSelection: [
            ...preState.productNameSelection,
            name,
          ],
          // projectSelection: [],
        };
      }
      if (!checked) {
        const newArr = productNameSelection.filter(
          daily => daily !== name,
        );
        return {
          productNameSelection: newArr,
          // projectSelection: [],
        };
      }
      return null;
    });
  };

  handlePartnerNameParentCheckbox = e => {
    const {
      partnerNameSelection,
      isAllPartnerNameSelected,
    } = this.state;
    if (isAllPartnerNameSelected) {
      const allPartnerNameElement = document.getElementsByClassName(
        'partnername_checkbox',
      );
      for (let i = 0; i < allPartnerNameElement.length; i += 1) {
        allPartnerNameElement[i].checked = false;
      }
      this.setState({
        partnerNameSelection: [],
        isAllPartnerNameSelected: false,
      });
    } else {
      this.setState({
        isAllPartnerNameSelected: true,
      });
      if (e.target.checked === true) {
        const allPartnerNameElement = document.getElementsByClassName(
          'partnername_checkbox',
        );
        const selectedPartnerName = partnerNameSelection;
        for (let i = 0; i < allPartnerNameElement.length; i += 1) {
          allPartnerNameElement[i].checked = true;
          selectedPartnerName.push(allPartnerNameElement[i].name);
        }
        this.setState({
          partnerNameSelection: selectedPartnerName,
        });
      }
    }
  };

  handlePartnerNameCheckbox = e => {
    const {
      state: { partnerNameSelection },
    } = this;
    const {
      target: { name, checked, value },
    } = e;
    this.setState(preState => {
      if (checked) {
        return {
          partnerNameSelection: [
            ...preState.partnerNameSelection,
            name,
          ],
          // projectSelection: [],
        };
      }
      if (!checked) {
        const newArr = partnerNameSelection.filter(
          daily => daily !== name,
        );
        return {
          partnerNameSelection: newArr,
          // projectSelection: [],
        };
      }
      return null;
    });
  };

  handleMarketFailureParentCheckbox = e => {
    const {
      marketFailureSelection,
      isAllMarketFailureSelected,
    } = this.state;
    if (isAllMarketFailureSelected) {
      const allMarketFailureElement = document.getElementsByClassName(
        'marketfailure_checkbox',
      );
      for (let i = 0; i < allMarketFailureElement.length; i += 1) {
        allMarketFailureElement[i].checked = false;
      }
      this.setState({
        marketFailureSelection: [],
        isAllMarketFailureSelected: false,
      });
    } else {
      this.setState({
        isAllMarketFailureSelected: true,
      });
      if (e.target.checked === true) {
        const allMarketFailureElement = document.getElementsByClassName(
          'marketfailure_checkbox',
        );
        const selectedMarketFailure = marketFailureSelection;
        for (let i = 0; i < allMarketFailureElement.length; i += 1) {
          allMarketFailureElement[i].checked = true;
          selectedMarketFailure.push(allMarketFailureElement[i].name);
        }
        this.setState({
          marketFailureSelection: selectedMarketFailure,
        });
      }
    }
  };

  handleMarketFailureCheckbox = e => {
    const {
      state: { marketFailureSelection },
    } = this;
    const {
      target: { name, checked, value },
    } = e;
    this.setState(preState => {
      if (checked) {
        return {
          marketFailureSelection: [
            ...preState.marketFailureSelection,
            name,
          ],
          // projectSelection: [],
        };
      }
      if (!checked) {
        const newArr = marketFailureSelection.filter(
          daily => daily !== name,
        );
        return {
          marketFailureSelection: newArr,
          // projectSelection: [],
        };
      }
      return null;
    });
  };

  handlePartnerType = clickedValue => {
    const { partnerTypeSelection } = this.state;
    if (partnerTypeSelection.includes(clickedValue)) {
      const filteredData = partnerTypeSelection.filter(
        data => data !== clickedValue,
      );
      this.setState({ partnerTypeSelection: filteredData });
    } else {
      const addedPartnerType = partnerTypeSelection.concat(
        clickedValue,
      );
      this.setState({ partnerTypeSelection: addedPartnerType });
    }
  };

  getModalContent = contentType => {
    const { activeModal } = this.state;

    switch (contentType) {
      case 'bubble':
        return <BubbleChart activeModal />;
      case 'radar':
        return <RadarChart activeModal />;
      case 'bar':
        return <BarChart activeModal />;
      case 'heatmap':
        return (
          <HeatmapChart
            showRightSidebar={this.state.showRightSidebar}
            activeModal={this.state.activeModal}
          />
        );

      default:
        break;
    }
    return true;
  };

  handleModal = () => {
    this.setState(prevState => ({
      activeModal: !prevState.activeModal,
    }));
  };

  handleSelectedModal = (value, title) => {
    this.setState({
      selectedModal: value,
      modalHeader: title,
    });
  };

  applyClick = () => {
    const {
      innovationAreaSelection,
      partnerTypeSelection,
      marketFailureSelection,
      partnerNameSelection,
      productNameSelection,
      productCategorySelection,
    } = this.state;

    this.props.filterBubbleChartData(
      innovationAreaSelection,
      productCategorySelection,
      partnerTypeSelection,
      // partnerNameSelection,
      productNameSelection,
    );
    this.props.filterRadarChartData(
      innovationAreaSelection,
      partnerTypeSelection,
    );
    this.props.filterBarChartData(
      marketFailureSelection,
      productNameSelection,
    );
    this.props.filterHeatmapChartData(
      innovationAreaSelection,
      marketFailureSelection,
    );
    this.props.filterOverviewDataPP(
      innovationAreaSelection,
      partnerNameSelection,
      productNameSelection,
      productCategorySelection,
      partnerTypeSelection,
      marketFailureSelection,
    );
  };

  // handleUnCheck = () => {};

  resetClick = () => {
    this.setState({
      innovationAreaSelection: [],
      isAllInnovationAreaSelected: false,
      productCategorySelection: [],
      isAllProductCategorySelected: false,
      productNameSelection: [],
      isAllProductNameSelected: false,
      partnerNameSelection: [],
      isAllPartnerNameSelected: false,
      marketFailureSelection: [],
      isAllMarketFailureSelected: false,
      partnerTypeSelection: [],
    });
    // this.handleUnCheck();
    this.props.resetAllChartPP();
  };

  render() {
    const {
      showRightSidebar,
      innovationAreaSelection,
      productCategorySelection,
      productNameSelection,
      partnerNameSelection,
      marketFailureSelection,
      partnerTypeSelection,

      activeModal,
      selectedModal,
      modalHeader,
    } = this.state;

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

    const {
      bubbleTitle,
      barTitle,
      radarTitle,
      heatmapTitle,
    } = chartTitles;

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
            innovationAreaSelection={innovationAreaSelection}
            productCategory={productCategoryList}
            productCategorySelection={productCategorySelection}
            productNameSelection={productNameSelection}
            partnerNameSelection={partnerNameSelection}
            marketFailureSelection={marketFailureSelection}
            partnerTypeSelection={partnerTypeSelection}
            productName={productNameList}
            partnerType={partnerTypeList}
            partnerName={partnerNameList}
            marketFailure={marketFailureList}
            handleInnovationAreaCheckbox={
              this.handleInnovationAreaCheckbox
            }
            handleInnovationAreaParentCheckbox={
              this.handleInnovationAreaParentCheckbox
            }
            handleProductCategoryParentCheckbox={
              this.handleProductCategoryParentCheckbox
            }
            handleProductCategoryCheckbox={
              this.handleProductCategoryCheckbox
            }
            handleProductNameParentCheckbox={
              this.handleProductNameParentCheckbox
            }
            handleProductNameCheckbox={this.handleProductNameCheckbox}
            handlePartnerNameParentCheckbox={
              this.handlePartnerNameParentCheckbox
            }
            handlePartnerNameCheckbox={this.handlePartnerNameCheckbox}
            handleMarketFailureParentCheckbox={
              this.handleMarketFailureParentCheckbox
            }
            handleMarketFailureCheckbox={
              this.handleMarketFailureCheckbox
            }
            handlePartnerType={this.handlePartnerType}
            resetClick={this.resetClick}
            applyClick={this.applyClick}
          />

          <main className="main">
            <div className="main-card map-card" />
            <div className="main-card literacy-main-card">
              <div className="literacy-tab-content">
                <div className="literacy-tab-item">
                  {activeModal && (
                    <Modal
                      // visible={selectedModal === 'bar' ? true : false}
                      modalHeader={modalHeader}
                      // handleShowBarOf={handleShowBarOf}
                      // resetFilters={resetFilters}
                      selectedModal={selectedModal}
                      handleModal={this.handleModal}
                      activeModal={activeModal}
                      component={
                        () => this.getModalContent(selectedModal)
                        // eslint-disable-next-line react/jsx-curly-newline
                      }
                    />
                  )}
                  <div className="graph-view">
                    <div className="row">
                      {/* <div className="col-xl-12">
                        <div className="card" />
                      </div> */}
                      <div className="col-xl-12">
                        <div className="card" id="heatmap-chart">
                          <div className="card-header">
                            <h5>{heatmapTitle}</h5>
                            <div className="header-icons">
                              <span
                                className=""
                                onClick={() => {
                                  this.downloadPng(
                                    'heatmap-chart',
                                    `${heatmapTitle}`,
                                  );
                                }}
                                onKeyDown={() => {
                                  this.downloadPng(
                                    'heatmap-chart',
                                    `${heatmapTitle}`,
                                  );
                                }}
                                role="tab"
                                tabIndex="0"
                              >
                                <img src={DownloadIcon} alt="open" />
                              </span>
                              <span
                                className=""
                                role="tab"
                                tabIndex="0"
                                onClick={() => {
                                  this.handleModal();
                                  this.handleSelectedModal(
                                    'heatmap',
                                    `${heatmapTitle}`,
                                  );
                                }}
                                onKeyDown={() => {
                                  this.handleModal();
                                  this.handleSelectedModal(
                                    'heatmap',
                                    `${heatmapTitle}`,
                                  );
                                }}
                              >
                                <img src={ExpandIcon} alt="open" />
                              </span>
                            </div>
                          </div>
                          <div className="card-body">
                            <HeatmapChart
                              showRightSidebar={showRightSidebar}
                              activeModal={activeModal}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-12">
                        <div className="card" id="bar-chart">
                          <div className="card-header">
                            <h5>{barTitle}</h5>
                            <div className="header-icons">
                              <span
                                className=""
                                onClick={() => {
                                  this.downloadPng(
                                    'bar-chart',
                                    `${barTitle}`,
                                  );
                                }}
                                onKeyDown={() => {
                                  this.downloadPng(
                                    'bar-chart',
                                    `${barTitle}`,
                                  );
                                }}
                                role="tab"
                                tabIndex="0"
                              >
                                <img src={DownloadIcon} alt="open" />
                              </span>
                              <span
                                className=""
                                role="tab"
                                tabIndex="0"
                                onClick={() => {
                                  this.handleModal();
                                  this.handleSelectedModal(
                                    'bar',
                                    `${barTitle}`,
                                  );
                                }}
                                onKeyDown={() => {
                                  this.handleModal();
                                  this.handleSelectedModal(
                                    'bar',
                                    `${barTitle}`,
                                  );
                                }}
                              >
                                <img src={ExpandIcon} alt="open" />
                              </span>
                            </div>
                          </div>
                          <div className="card-body">
                            <BarChart
                              showRightSidebar={showRightSidebar}
                              // activeModal={activeModal}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="card" id="bubble-chart">
                          <div className="card-header">
                            <h5>{bubbleTitle}</h5>
                            <div className="header-icons">
                              <span
                                className=""
                                onClick={() => {
                                  this.downloadPng(
                                    'bubble-chart',
                                    `${bubbleTitle}`,
                                  );
                                }}
                                onKeyDown={() => {
                                  this.downloadPng(
                                    'bubble-chart',
                                    `${bubbleTitle}`,
                                  );
                                }}
                                role="tab"
                                tabIndex="0"
                              >
                                <img src={DownloadIcon} alt="open" />
                              </span>
                              <span
                                className=""
                                role="tab"
                                tabIndex="0"
                                onClick={() => {
                                  this.handleModal();
                                  this.handleSelectedModal(
                                    'bubble',
                                    `${bubbleTitle}`,
                                  );
                                }}
                                onKeyDown={() => {
                                  this.handleModal();
                                  this.handleSelectedModal(
                                    'bubble',
                                    `${bubbleTitle}`,
                                  );
                                }}
                              >
                                <img src={ExpandIcon} alt="open" />
                              </span>
                            </div>
                          </div>
                          <div className="card-body">
                            {/* <BubbleChart activeModal={activeModal} /> */}
                            <BubbleChart />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="card" id="radar-chart">
                          <div className="card-header">
                            <h5>{radarTitle}</h5>
                            <div className="header-icons">
                              <span
                                className=""
                                onClick={() => {
                                  this.downloadPng(
                                    'radar-chart',
                                    `${radarTitle}`,
                                  );
                                }}
                                onKeyDown={() => {
                                  this.downloadPng(
                                    'radar-chart',
                                    `${radarTitle}`,
                                  );
                                }}
                                role="tab"
                                tabIndex="0"
                              >
                                <img src={DownloadIcon} alt="open" />
                              </span>
                              <span
                                className=""
                                role="tab"
                                tabIndex="0"
                                onClick={() => {
                                  this.handleModal();
                                  this.handleSelectedModal(
                                    'radar',
                                    `${radarTitle}`,
                                  );
                                }}
                                onKeyDown={() => {
                                  this.handleModal();
                                  this.handleSelectedModal(
                                    'radar',
                                    `${radarTitle}`,
                                  );
                                }}
                              >
                                <img src={ExpandIcon} alt="open" />
                              </span>
                            </div>
                          </div>
                          <div className="card-body">
                            <RadarChart />
                            {/* <RadarChart activeModal={activeModal} /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <RightSideBar
            showRightSidebar={showRightSidebar}
            handleRightSidebarShow={this.handleRightSidebarShow}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ productProcessReducer }) => ({
  productProcessReducer,
});
export default connect(mapStateToProps, {
  getProductProcessData,
  getProductProcessList,
  filterProductNameList,
  filterPartnerNameList,
  filterBubbleChartData,
  filterRadarChartData,
  filterBarChartData,
  filterHeatmapChartData,
  filterOverviewDataPP,
  resetAllChartPP,
})(ProductProcess);
