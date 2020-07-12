import React from 'react';
import { connect } from 'react-redux';
import Header from '../../Header';
import LeftSideBar from './LeftSideBar/LeftSideBar';
import RightSideBar from './RightSideBar/RightSideBar';
import {
  getProductProcessData,
  getProductProcessList,
  filterProductNameList,
  filterPartnerNameList,
  filterRadarChartData,
  filterBarChartData,
  filterHeatmapChartData,
} from '../../../actions/productProcess.actions';
import BubbleChart from './Charts/BubbleChart/BubbleChart';
import HeatmapChart from './Charts/Heatmap/HeatmapChart';
import RadarChart from './Charts/Radar/RadarChart';
import BarChart from './Charts/BarChart/BarChart';

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
    const {
      productCategorySelection,
      partnerTypeSelection,
    } = this.state;
    this.props.getProductProcessList();
    this.props.getProductProcessData();
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
          projectSelection: [],
        };
      }
      if (!checked) {
        const newArr = innovationAreaSelection.filter(
          daily => daily !== name,
        );
        return {
          innovationAreaSelection: newArr,
          projectSelection: [],
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
          projectSelection: [],
        };
      }
      if (!checked) {
        const newArr = productCategorySelection.filter(
          daily => daily !== name,
        );
        return {
          productCategorySelection: newArr,
          projectSelection: [],
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
          projectSelection: [],
        };
      }
      if (!checked) {
        const newArr = productNameSelection.filter(
          daily => daily !== name,
        );
        return {
          productNameSelection: newArr,
          projectSelection: [],
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
          projectSelection: [],
        };
      }
      if (!checked) {
        const newArr = partnerNameSelection.filter(
          daily => daily !== name,
        );
        return {
          partnerNameSelection: newArr,
          projectSelection: [],
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
          projectSelection: [],
        };
      }
      if (!checked) {
        const newArr = marketFailureSelection.filter(
          daily => daily !== name,
        );
        return {
          marketFailureSelection: newArr,
          projectSelection: [],
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

  applyClick = () => {
    const {
      innovationAreaSelection,
      partnerTypeSelection,
      marketFailureSelection,
      productNameSelection,
    } = this.state;

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
    } = this.state;
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
            applyClick={this.applyClick}
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
                      <div className="col-xl-6">
                        <div className="card" id="chart-donut">
                          <div className="card-header">
                            <h5>Bar Chart</h5>
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
                            <BarChart />
                          </div>
                        </div>
                      </div>
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
  getProductProcessData,
  getProductProcessList,
  filterProductNameList,
  filterPartnerNameList,
  filterRadarChartData,
  filterBarChartData,
  filterHeatmapChartData,
})(ProductProcess);
