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

import {
  getPartnersList,
  getFinancialData,
  getFinancialProgram,
  filterFinancialDataForGraph,
  filterPartnersByType,
} from '../../../actions/financial.actions';
import HorizontalChart from './Charts/HorizontalChart';
import DonutChart from './Charts/DonutChart';
import SankeyDiagram from './Charts/SankeyDiagram';
import TreeMapDiagram from './Charts/TreeMapDiagram';
import TableData from './TableData/TableData';
import Modal from './Modal';

class FinancialLiteracy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRightSidebar: true,
      partnerType: [],
      checkedPartnerItems: [],
      isAllPartnerSelected: false,
      selectedProgram: [],
      visualizationType: 'Visualisation',
      activeSortBy: false,
      activeModal: false,
    };
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
          checkedPartnerItems.push(allPartnerElement[i].id);
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
    this.setState({ visualizationType: clicked });
  };

  toggleSortBy = () => {
    this.setState(prevState => ({
      activeSortBy: !prevState.activeSortBy,
    }));
  };

  downloadPng = () => {
    // document.querySelector('.info-header-bottom').style.display =
    //   'none';
    // document
    //   .querySelector('.download-dropdown')
    //   .classList.remove('active');
    setTimeout(() => {
      html2canvas(document.querySelector('#horizontal-chart'), {
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
          saveAs(blob, 'Dashboard.png');
        });
      });
    }, 500);

    // this.setState({ downloadActive: false });
  };

  applyClick = () => {
    const { checkedPartnerItems, selectedProgram } = this.state;
    this.props.filterFinancialDataForGraph(
      checkedPartnerItems,
      selectedProgram,
    );
  };

  handleModal = () => {
    this.setState(prevState => ({
      activeModal: !prevState.activeModal,
    }));
  };

  render() {
    const {
      state: {
        checkedPartnerItems,
        isAllPartnerSelected,
        partnerType,
        selectedProgram,
        visualizationType,
        activeSortBy,
        showRightSidebar,
        activeModal,
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
          <Modal
            handleModal={this.handleModal}
            activeModal={activeModal}
            component={() => {
              return (
                <div className="card-body">
                  {/* <div
                    className="container"
                    style={{
                      height: '445px',
                      overflowY: 'scroll',
                    }}
                  > */}
                  <SankeyDiagram />
                  {/* </div> */}
                </div>
              );
            }}
          />
          <LeftSideBar
            applyClick={this.applyClick}
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
                    <div className="row">
                      <div className="col-xl-6">
                        <div className="card" id="card-horizontal">
                          <div className="card-header">
                            <h5>
                              Contribution of program initiatives
                            </h5>
                            <div className="header-icons">
                              <span
                                onClick={this.downloadPng}
                                onKeyDown={this.downloadPng}
                                className=""
                                role="tab"
                                tabIndex="0"
                              >
                                <img src={DownloadIcon} alt="open" />
                              </span>
                              <span
                                role="tab"
                                tabIndex="0"
                                onClick={this.handleModal}
                                onKeyDown={this.handleModal}
                              >
                                <img src={ExpandIcon} alt="open" />
                              </span>
                            </div>
                          </div>
                          <div className="card-body">
                            <div
                              className="container"
                              style={{
                                height: '445px',
                                overflowY: 'scroll',
                              }}
                            >
                              <HorizontalChart />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="card" id="chart-donut">
                          <div className="card-header">
                            <h5>
                              Contribution of program initiatives
                            </h5>
                            <div className="header-icons">
                              <span className="">
                                <img src={DownloadIcon} alt="open" />
                              </span>
                              <span className="">
                                <img src={ExpandIcon} alt="open" />
                              </span>
                            </div>
                          </div>
                          <div className="card-body">
                            <DonutChart />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                        <div className="card" id="">
                          <div className="card-header">
                            <h5>
                              Contribution of program initiatives
                            </h5>
                            <div className="header-icons">
                              <span className="">
                                <img src={DownloadIcon} alt="open" />
                              </span>
                              <span className="">
                                <img src={ExpandIcon} alt="open" />
                              </span>
                            </div>
                          </div>
                          <div className="card-body">
                            <TreeMapDiagram
                              checkedPartnerItems={
                                this.state.checkedPartnerItems
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="card">
                          <div className="card-header">
                            <h5>
                              Contribution of program initiatives
                            </h5>
                            <div className="header-icons">
                              <span className="">
                                <img src={DownloadIcon} alt="open" />
                              </span>
                              <span className="">
                                <img src={ExpandIcon} alt="open" />
                              </span>
                            </div>
                          </div>
                          <div className="card-body">
                            <SankeyDiagram />
                          </div>
                        </div>
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
          <RightSideBar
            showRightSidebar={showRightSidebar}
            selectedProgram={selectedProgram}
            checkedPartnerItems={checkedPartnerItems}
            handleRightSidebarShow={this.handleRightSidebarShow}
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
})(FinancialLiteracy);
