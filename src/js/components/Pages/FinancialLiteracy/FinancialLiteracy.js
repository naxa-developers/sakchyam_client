/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import Header from '../../Header';
import DownloadIcon from '../../../../img/get_app.png';
import ExpandIcon from '../../../../img/open_in_full-black-18dp.png';
import LeftSideBar from './LeftSideBar/LeftSideBar';
import RightSideBar from './RightSideBar/RightSideBar';
import GoToSankey from './GoToSankey';
import './custom.css';

import {
  getPartnersList,
  getFinancialData,
  getFinancialProgram,
  filterFinancialDataForGraph,
  filterPartnersByType,
  filterTableDataByPartner,
  // filterDataForRightSidebar,
} from '../../../actions/financial.actions';
import HorizontalChart from './Charts/HorizontalChart';
import DonutChart from './Charts/DonutChart';
import SankeyDiagram from './Charts/SankeyDiagram';
import TreeMapDiagram from './Charts/TreeMapDiagram';
import TableData from './TableData/TableData';
import Modal from './Modal';

function numberWithCommas(x) {
  if (x !== null) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return x;
}

function colorPicker(i) {
  if (i % 12 === 0) return '#E11D3F';
  if (i % 12 === 1) return '#FF6D00';
  if (i % 12 === 2) return '#13A8BE';
  if (i % 12 === 3) return '#DE2693';
  if (i % 12 === 4) return '#B1B424';
  if (i % 12 === 5) return '#2196F3';
  if (i % 12 === 6) return '#4CE2A7';
  if (i % 12 === 7) return '#1967A0';
  if (i % 12 === 8) return '#FFCD00';
  if (i % 12 === 9) return '#651FFF';
  if (i % 12 === 10) return '#B71DE1';
  if (i % 12 === 11) return '#00C853';
  if (i % 12 === 12) return '#91664E';
  if (i % 12 === 13) return '#FF1500';
  if (i % 12 === 13) return '#C5E11D';
  return 'green';
}
class FinancialLiteracy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRightSidebar: true,
      selectedModal: '',
      partnerType: [],
      checkedPartnerItems: [],
      checkedPartnerItems1: [],
      isAllPartnerSelected: false,
      selectedProgram: [],
      selectedProgram1: [],
      visualizationType: 'Visualisation',
      activeSortBy: false,
      activeModal: false,
      modalHeader: '',
      isBarChartToggled: false,
    };
    this.sankeyRef = React.createRef();
  }

  componentDidMount() {
    this.props.getPartnersList();
    this.props.getFinancialProgram();
    this.props.getFinancialData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.financialReducer.filterFinancialDataForGraph !==
      this.props.financialReducer.filterFinancialDataForGraph
    ) {
      this.props.filterFinancialDataForGraph();
    }
    if (prevState.partnerType !== this.state.partnerType) {
      this.props.filterPartnersByType(this.state.partnerType);
      this.setState({ checkedPartnerItems: [] });
    }
  }

  handleBarChartToggle = () => {
    this.setState(prevState => ({
      isBarChartToggled: !prevState.isBarChartToggled,
    }));
  };

  handleRightSidebarShow = () => {
    this.setState(prevState => ({
      showRightSidebar: !prevState.showRightSidebar,
    }));
  };

  handlePartnerChange = e => {
    const item = parseInt(e.target.id, 10);
    const isProjectChecked = e.target.checked;
    const { checkedPartnerItems } = this.state;
    if (isProjectChecked === true) {
      const joined = checkedPartnerItems.concat(item);
      this.setState({
        checkedPartnerItems: joined,
        // isAllPartnerSelected: true,
        // isAllPartnerSelected: true,
      });
    } else {
      const filteredData = checkedPartnerItems.filter(
        data => data !== item,
      );
      this.setState({
        checkedPartnerItems: filteredData,
        isAllPartnerSelected: false,
      });
    }
  };

  handlePartnerParentCheckbox = e => {
    // e.stopPropagation();
    const { checkedPartnerItems, isAllPartnerSelected } = this.state;
    if (isAllPartnerSelected) {
      const allPartnerElement = document.getElementsByClassName(
        'partner_checkbox',
      );

      for (let i = 0; i < allPartnerElement.length; i += 1) {
        allPartnerElement[i].checked = false;
      }
      this.setState({
        checkedPartnerItems: [],
        isAllPartnerSelected: false,
      });
    } else {
      this.setState({
        isAllPartnerSelected: true,
      });
      if (e.target.checked === true) {
        const allPartnerElement = document.getElementsByClassName(
          'partner_checkbox',
        );

        for (let i = 0; i < allPartnerElement.length; i += 1) {
          allPartnerElement[i].checked = true;
          checkedPartnerItems.push(
            parseInt(allPartnerElement[i].id, 10),
          );
        }
        this.setState({
          checkedPartnerItems,
        });
        // this.setState({
        //   checkedProgressItems: joined,
        // });
      }
    }
  };

  handlePartnerType = clickedValue => {
    this.handleUnCheck();
    this.setState({ isAllPartnerSelected: false });

    const { partnerType } = this.state;
    if (partnerType.includes(clickedValue)) {
      const filteredData = partnerType.filter(
        data => data !== clickedValue,
      );
      this.setState({ partnerType: filteredData });
    } else {
      const addedPartnerType = partnerType.concat(clickedValue);
      this.setState({ partnerType: addedPartnerType });
    }
  };

  handleSelectedProgram = clickedValue => {
    const { selectedProgram } = this.state;
    if (selectedProgram.includes(clickedValue)) {
      const filteredData = selectedProgram.filter(
        data => data !== clickedValue,
      );
      this.setState({
        selectedProgram: filteredData,
      });
    } else {
      const addedProgram = selectedProgram.concat(clickedValue);
      this.setState({ selectedProgram: addedProgram });
    }
  };

  handleVisualizationType = clicked => {
    this.setState({
      visualizationType: clicked,
    });
  };

  toggleSortBy = () => {
    this.setState(prevState => ({
      activeSortBy: !prevState.activeSortBy,
    }));
  };

  downloadPng = (chartid, filename) => {
    const name = filename ? filename : 'chart';
    // document.querySelector('.info-header-bottom').style.display =
    //   'none';
    // document
    //   .querySelector('.download-dropdown')
    //   .classList.remove('active');
    setTimeout(() => {
      html2canvas(document.querySelector(`#${chartid}`), {
        // logging: true,
        // letterRendering: 1,
        allowTaint: true,
        // scale: window.devicePixelRatio,
        // windowWidth: window.innerWidth,
        // windowHeight: window.innerHeight + 120,
        // x: 20,
        // y: 70,
        // width: window.innerWidth + 40,
        // height: window.innerHeight + 40,
        // foreignObjectRendering: true,
        // useCORS: true,
      }).then(canvas => {
        canvas.toBlob(function(blob) {
          saveAs(blob, `${name}.png`);
        });
      });
    }, 500);

    // this.setState({ downloadActive: false });
  };

  handleUnCheck = () => {
    const x = document.getElementsByClassName('partner_checkbox');
    for (let i = 0; i < x.length; i += 1) {
      x[i].checked = false;
    }
  };

  resetClick = () => {
    this.setState({
      partnerType: [],
      checkedPartnerItems: [],
      checkedPartnerItems1: [],
      isAllPartnerSelected: false,
      selectedProgram: [],
      selectedProgram1: [],
    });
    this.handleUnCheck();
    this.props.getFinancialData();
  };

  applyClick = () => {
    const {
      checkedPartnerItems,
      selectedProgram,
      partnerType,
    } = this.state;
    this.props.filterFinancialDataForGraph(
      checkedPartnerItems,
      selectedProgram,
      partnerType,
    );

    this.setState({
      checkedPartnerItems1: checkedPartnerItems,
      selectedProgram1: selectedProgram,
    });
    this.props.filterTableDataByPartner(checkedPartnerItems);
  };

  handleScrollToSankey = () => {
    this.sankeyRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
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

  // eslint-disable-next-line consistent-return
  getModalContent = contentType => {
    const { activeModal } = this.state;
    switch (contentType) {
      case 'sankey':
        return <SankeyDiagram activeModal />;

      case 'tree':
        return (
          <TreeMapDiagram
            activeModal={activeModal}
            // isTreeMapClicked={this.state.isTreeMapClicked}
            // handleTreeMapBackBtn={this.handleTreeMapBackBtn}
            // setTreeMapBackBtnFalse={this.setTreeMapBackBtnFalse}
            // generateTreeMapData={this.generateTreeMapData}
            DownloadIcon={DownloadIcon}
            ExpandIcon={ExpandIcon}
            downloadPng={this.downloadPng}
            handleModal={this.handleModal}
            handleSelectedModal={this.handleSelectedModal}
            checkedPartnerItems={this.state.checkedPartnerItems}
          />
        );
      case 'bar':
        // return <HorizontalChart activeModal />;
        return (
          <HorizontalChart
            isToggled={this.state.isBarChartToggled}
            handleBarChartToggle={this.handleBarChartToggle}
            activeModal={activeModal}
            DownloadIcon={DownloadIcon}
            ExpandIcon={ExpandIcon}
            downloadPng={this.downloadPng}
            handleModal={this.handleModal}
            handleSelectedModal={this.handleSelectedModal}
            selectedProgram={this.state.selectedProgram1}
            // showRightSidebar={this.state.showRightSidebar}
          />
        );

      case 'donut':
        return <DonutChart activeModal />;

      default:
        break;
    }
  };

  render() {
    const {
      state: {
        checkedPartnerItems1,
        isAllPartnerSelected,
        partnerType,
        selectedProgram,
        selectedProgram1,
        visualizationType,
        activeSortBy,
        showRightSidebar,
        activeModal,
        selectedModal,
        modalHeader,
      },
    } = this;
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
            applyClick={this.applyClick}
            resetClick={this.resetClick}
            checkedPartnerItems={this.checkedPartnerItems}
            isAllPartnerSelected={isAllPartnerSelected}
            handleSelectedProgram={this.handleSelectedProgram}
            selectedProgram={selectedProgram}
            partnerType={partnerType}
            handlePartnerType={this.handlePartnerType}
            handlePartnerChange={this.handlePartnerChange}
            handlePartnerParentCheckbox={
              this.handlePartnerParentCheckbox
            }
          />
          <main className="main">
            <div className="main-card map-card" />
            <div className="main-card literacy-main-card">
              <div className="literacy-tab">
                <ul>
                  <li
                    className={
                      visualizationType === 'Visualisation'
                        ? 'active'
                        : ''
                    }
                  >
                    <a
                      // href="#visualisation"
                      role="tab"
                      tabIndex="0"
                      onClick={() => {
                        this.handleVisualizationType('Visualisation');
                      }}
                      onKeyDown={() => {
                        this.handleVisualizationType('Visualisation');
                      }}
                    >
                      Visualisation
                    </a>
                  </li>
                  <li
                    className={
                      visualizationType === 'Data' ? 'active' : ''
                    }
                  >
                    <a
                      role="tab"
                      tabIndex="0"
                      onClick={() => {
                        this.handleVisualizationType('Data');
                      }}
                      onKeyDown={() => {
                        this.handleVisualizationType('Data');
                      }}
                    >
                      data
                    </a>
                  </li>
                </ul>
                <div
                  className="goto-sankey"
                  onClick={this.handleScrollToSankey}
                >
                  <GoToSankey />
                  <span className="goto-sankey-text">
                    Go to Sankey
                  </span>
                </div>
              </div>

              <div className="literacy-tab-content">
                <div className="literacy-tab-item">
                  <div
                    className="graph-view"
                    style={
                      visualizationType === 'Visualisation'
                        ? { display: 'block' }
                        : { display: 'none' }
                    }
                  >
                    {/* <button
                      type="button"
                      className="is-border common-button"
                      onClick={this.handleScrollToSankey}
                      style={{
                        position: 'absolute',
                        right: '50px',
                        top: '22px',
                      }}
                    >
                      Go to Sankey
                    </button> */}
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="card">
                          {/* <div className="card-header">
                            <h5>
                              Beneficiary Reached Per Program by
                              Partners
                            </h5>
                            <div className="header-icons">
                              <div className="card-switcher">
                                <small>OFF</small>
                                <label className="switch">
                                  <input type="checkbox" />
                                  <span className="slider">
                                  </span>
                                </label>
                                <small>ON</small>
                              </div>
                              <span
                                onClick={() => {
                                  this.downloadPng(
                                    'horizontal-chart',
                                  );
                                }}
                                onKeyDown={() => {
                                  this.downloadPng(
                                    'horizontal-chart',
                                  );
                                }}
                                className=""
                                role="tab"
                                tabIndex="0"
                              >
                                <img src={DownloadIcon} alt="open" />
                              </span>
                              <span
                                role="tab"
                                tabIndex="0"
                                onClick={() => {
                                  this.handleModal();
                                  this.handleSelectedModal('bar');
                                }}
                                onKeyDown={() => {
                                  this.handleModal();
                                  this.handleSelectedModal('bar');
                                }}
                              >
                                <img src={ExpandIcon} alt="open" />
                              </span>
                            </div>
                          </div>
                          <div className="card-body">
                            <div
                              className="horizontal-chart"
                              style={{
                                height: '400px',
                              }}
                            >
                              <HorizontalChart
                                showRightSidebar={showRightSidebar}
                              />
                            </div>
                          </div>
                        </div> */}
                          <HorizontalChart
                            isToggled={this.state.isBarChartToggled}
                            DownloadIcon={DownloadIcon}
                            ExpandIcon={ExpandIcon}
                            downloadPng={this.downloadPng}
                            handleModal={this.handleModal}
                            handleBarChartToggle={
                              this.handleBarChartToggle
                            }
                            handleSelectedModal={
                              this.handleSelectedModal
                            }
                            selectedProgram={selectedProgram1}
                            checkedPartnerItems={
                              this.state.checkedPartnerItems
                            }
                            showRightSidebar={showRightSidebar}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="card" id="chart-donut">
                          <div className="card-header">
                            <h5>
                              Financial Literacy Beneficiaries Mix by
                              Partner Type
                            </h5>
                            <div className="header-icons">
                              <span
                                className=""
                                onClick={() => {
                                  this.downloadPng(
                                    'donut-chart',
                                    'Financial Literacy Beneficiaries Mix by Partner Type',
                                  );
                                }}
                                onKeyDown={() => {
                                  this.downloadPng(
                                    'donut-chart',
                                    'Financial Literacy Beneficiaries Mix by Partner Type',
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
                                    'donut',
                                    'Financial Literacy Beneficiaries Mix by Partner Type',
                                  );
                                }}
                                onKeyDown={() => {
                                  this.handleModal();
                                  this.handleSelectedModal(
                                    'donut',
                                    'Financial Literacy Beneficiaries Mix by Partner Type',
                                  );
                                }}
                              >
                                <img src={ExpandIcon} alt="open" />
                              </span>
                            </div>
                          </div>
                          <div className="card-body">
                            <DonutChart
                              selectedProgram={selectedProgram1}
                              selectedPartner={checkedPartnerItems1}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-6">
                        <div className="card" id="">
                          <TreeMapDiagram
                            // isTreeMapClicked={
                            //   this.state.isTreeMapClicked
                            // }
                            // handleTreeMapBackBtn={
                            //   this.handleTreeMapBackBtn
                            // }
                            // setTreeMapBackBtnFalse={
                            //   this.setTreeMapBackBtnFalse
                            // }
                            // generateTreeMapData={
                            //   this.generateTreeMapData
                            // }
                            DownloadIcon={DownloadIcon}
                            ExpandIcon={ExpandIcon}
                            downloadPng={this.downloadPng}
                            handleModal={this.handleModal}
                            handleSelectedModal={
                              this.handleSelectedModal
                            }
                            checkedPartnerItems={
                              this.state.checkedPartnerItems
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="card" ref={this.sankeyRef}>
                      <div className="card-header">
                        <h5>Beneficiaries Reached By Partners</h5>
                        <div className="header-icons">
                          <span
                            className
                            onClick={() => {
                              this.downloadPng(
                                'sankey-chart',
                                'Beneficiaries Reached By Partners',
                              );
                            }}
                            onKeyDown={() => {
                              this.downloadPng(
                                'sankey-chart',
                                'Beneficiaries Reached By Partners',
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
                            <img src={ExpandIcon} alt="open" />
                          </span>
                        </div>
                      </div>
                      <div className="card-body">
                        <SankeyDiagram
                          showRightSidebar={showRightSidebar}
                        />
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
                >
                  <TableData
                    activeSortBy={activeSortBy}
                    toggleSortBy={this.toggleSortBy}
                  />
                </div>
              </div>
            </div>
          </main>
          {/* <Modal
            handleModal={this.handleModal}
            activeModal={activeModal}
            component={() => {
              if (selectedModal === 'bar') return <HorizontalChart />;
              if (selectedModal === 'donut') return <DonutChart />;
              if (selectedModal === 'tree')
                return (
                  <TreeMapDiagram
                    checkedPartnerItems={
                      this.state.checkedPartnerItems
                    }
                  />
                );
              return <SankeyDiagram />;
            }}
          /> */}
          {/* {selectedModal === 'bar' ? ( */}
          {activeModal && (
            <Modal
              // visible={selectedModal === 'bar' ? true : false}
              isBarChartToggled={this.state.isBarChartToggled}
              selectedModal={selectedModal}
              handleModal={this.handleModal}
              activeModal={activeModal}
              header={modalHeader}
              component={() => this.getModalContent(selectedModal)}
            />
          )}
          {/* ) : ( */}
          {/* <Modal
            visible={selectedModal === 'donut' ? true : false}
            handleModal={this.handleModal}
            activeModal={activeModal}
            component={() => {
              return <DonutChart />;
            }}
          />
          <Modal
            visible={selectedModal === 'tree' ? true : false}
            handleModal={this.handleModal}
            activeModal={activeModal}
            component={() => {
              return (
                // <TreeMapDiagram
                //   checkedPartnerItems={this.state.checkedPartnerItems}
                // />
                <TreeMapDiagram />
              );
            }}
          /> */}
          {/* ) : ( */}
          {/* <Modal
            visible={selectedModal === 'sankey' ? true : false}
            handleModal={this.handleModal}
            activeModal={activeModal}
            component={() => {
              return <SankeyDiagram visible="true" />;
            }}
          /> */}
          {/* )} */}
          <RightSideBar
            showRightSidebar={showRightSidebar}
            selectedProgram={selectedProgram1}
            checkedPartnerItems={checkedPartnerItems1}
            handleRightSidebarShow={this.handleRightSidebarShow}
            partnerType={partnerType}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ financialReducer }) => ({
  financialReducer,
});
export default connect(mapStateToProps, {
  getPartnersList,
  getFinancialData,
  getFinancialProgram,
  filterFinancialDataForGraph,
  filterPartnersByType,
  filterTableDataByPartner,
  // filterDataForRightSidebar,
})(FinancialLiteracy);
