/* eslint-disable react/no-unused-state */
/* eslint-disable prettier/prettier */
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
import AlertComponent from '../../common/Notifier';
import colorPicker1 from './colorUtils';

const getInitials = title => {
  const initials = title
    .split(' ')
    .map(word => word[0])
    .join('');

  return initials;
};

function convertLabelName(name) {
  const nameArr = name.split(' ');
  let firstElement;
  let rest;
  if (nameArr.length < 3) {
    // eslint-disable-next-line prefer-destructuring
    firstElement = nameArr[0];
    rest = name
      .split(' ')
      .slice(1)
      .join(' ');
  } else {
    firstElement = `${nameArr[0]} ${nameArr[1]}`;
    rest = name
      .split(' ')
      .slice(2)
      .join(' ');
  }

  const newName = [firstElement, rest];

  return newName;
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
      isDownloading: false,
      clickedPartnerName: '',
      isBarChartClicked: false,
      chartData2: {},
      alertMessage: '',
      isTreeMapClicked: false,
      treeMapData2: {},
    };
    this.sankeyRef = React.createRef();
  }

  async componentDidMount() {
    await this.props.getPartnersList();
    await this.props.getFinancialProgram();
    await this.props.getFinancialData();
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

  handleTreeMapClick = () => {
    this.setState(prev => ({
      isTreeMapClicked: !prev.isTreeMapClicked,
    }));
  };

  resetTreeMapClick = () => {
    this.setState({
      isTreeMapClicked: false,
    });
  };

  generateTreeMapData = id => {
    // console.log(id, 'generateTreeMapData');
    const arr = [];
    const {
      financialReducer: { financialData },
    } = this.props;

    financialData.map(item => {
      if (id === item.program_name) {
        if (this.state.checkedPartnerItems.length === 0) {
          arr.push({
            id: item.partner_id,
            name: item.partner_name,
            name1: getInitials(item.partner_name),
            loc: item.value,
          });
        } else {
          this.state.checkedPartnerItems.map(i => {
            if (item.partner_id === i) {
              arr.push({
                id: item.partner_id,
                name: item.partner_name,
                name1: getInitials(item.partner_name),
                loc: item.value,
              });
            }
            return true;
          });
        }
      }
      return true;
    });

    // CALCULATE PERCENTAGE
    let total = 0;

    arr.map(item => {
      total += item.loc;
      return true;
    });

    arr.map((item, index) => {
      arr[index].percent = `${((item.loc / total) * 100).toFixed(
        1,
      )}%`;
      return true;
    });

    const updatedTreeMapData = { name: 'program1', children: arr };
    this.setState({
      treeMapData2: updatedTreeMapData,
    });
  };

  notificationHandler = () => {
    this.setState({
      alertMessage: 'The infographics will be downloaded shortly.',
    });

    setTimeout(() => {
      this.setState({ alertMessage: '' });
    }, 3000);
  };

  handleBarChartReset = () => {
    this.setState(prev => ({
      isBarChartClicked: !prev.isBarChartClicked,
      clickedPartnerName: '',
    }));
  };

  generateBarChartData = (i, options) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const clickedPartner = options.xaxis.categories[i];
    // .join(' ');
    const {
      financialReducer: { filteredByProgramDefault, financialData },
    } = this.props;
    const { selectedProgram1: selectedProgram } = this.state;

    this.setState({ clickedPartnerName: clickedPartner });

    let filteredData = [];

    const exception = [
      'Kisan Microfinance',
      'Kisan Cooperative',
      'Mahila Samudayik',
      'Mahila Sahayatra',
    ];

    if (selectedProgram.length === 0) {
      filteredData = financialData.filter(item => {
        if (
          Array.isArray(clickedPartner) &&
          exception.includes(clickedPartner.join(' '))
        ) {
          return (
            item.partner_name
              .split(' ')
              .slice(0, 2)
              .join(' ') === clickedPartner.join(' ')
          );
        }
        return (
          item.partner_name.substr(
            0,
            item.partner_name.indexOf(' '),
          ) === clickedPartner
        );
      });
    } else {
      filteredData = financialData.filter(item => {
        if (selectedProgram.includes(item.program_id)) {
          if (
            Array.isArray(clickedPartner) &&
            exception.includes(clickedPartner.join(' '))
          ) {
            return (
              item.partner_name
                .split(' ')
                .slice(0, 2)
                .join(' ') === clickedPartner.join(' ')
            );
          }
          return (
            item.partner_name.substr(
              0,
              item.partner_name.indexOf(' '),
            ) === clickedPartner
          );
        }
        return false;
      });
    }

    filteredData.sort((a, b) => b.value - a.value);

    if (clickedPartner === 'Chhimek') {
      const arr1 = [];
      filteredData.forEach(item => {
        if (item.program_name === 'Other Initiatives')
          arr1.push({
            ...item,
            program_name: 'Dedicated Financial Literacy Sessions',
          });
        else arr1.push(item);
      });
      filteredData = arr1;
    }

    const arr = [];
    const categories = [];
    const allProgramColor = [];
    filteredData.map(item => {
      arr.push(item.value);
      categories.push(convertLabelName(item.program_name));
      allProgramColor.push(colorPicker1(item.program_id));
      return true;
    });

    this.setState(prevState => ({
      chartData2: {
        series: [{ data: arr }],

        options: {
          ...options,
          plotOptions: {
            ...options.plotOptions,
            bar: {
              ...options.plotOptions.bar,
              distributed: true,
              // barHeight: '1%',
              columnWidth: '15%',
            },
          },
          colors: allProgramColor,
          xaxis: {
            ...options.xaxis,
            categories,
            labels: {
              ...options.xaxis.labels,
            },
          },
          title: {
            text: prevState.clickedPartnerName,
            floating: true,
            offsetY: 0,
            align: 'center',
            style: {
              color: '#444',
              fontFamily: 'Avenir Book',
            },
          },
        },
      },
      isBarChartClicked: !prevState.isBarChartClicked,
    }));
  };

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
    this.notificationHandler();
    this.setState({ isDownloading: true });
    const name = filename ? filename : 'chart';
    const chartEl = document.querySelector(`#${chartid}`);
    const useWidth = chartEl.scrollWidth;

    setTimeout(() => {
      html2canvas(chartEl, {
        allowTaint: true,
        scale: 5,
        width:useWidth
      }).then(canvas => {
        canvas.toBlob(function(blob) {
          saveAs(blob, `${name}.png`);
        });
      });
    }, 500);

    setTimeout(() => {
      this.setState({ isDownloading: false });
    }, 600);
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
      isBarChartClicked: false,
      clickedPartnerName: '',
      isBarChartToggled:false,
    });
    this.handleUnCheck();
    this.props.getFinancialData();
    // this.handleBarChartReset();
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
    this.props.filterTableDataByPartner(checkedPartnerItems,partnerType);
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
            isTreeMapClicked={this.state.isTreeMapClicked}
            resetTreeMapClick={this.resetTreeMapClick}
            handleTreeMapClick={this.handleTreeMapClick}
            // handleTreeMapBackBtn={this.handleTreeMapBackBtn}
            // setTreeMapBackBtnFalse={this.setTreeMapBackBtnFalse}
            generateTreeMapData={this.generateTreeMapData}
            DownloadIcon={DownloadIcon}
            ExpandIcon={ExpandIcon}
            downloadPng={this.downloadPng}
            handleModal={this.handleModal}
            handleSelectedModal={this.handleSelectedModal}
            checkedPartnerItems={this.state.checkedPartnerItems}
            treeMapData2={this.state.treeMapData2}
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
            generateBarChartData={this.generateBarChartData}
            isBarChartClicked={this.state.isBarChartClicked}
            chartData2={this.state.chartData2}
            handleBarChartReset={this.handleBarChartReset}
            clickedPartnerName={this.state.clickedPartnerName}
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
        clickedPartnerName,
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
        isDownloading,
        alertMessage,
      },
    } = this;
    return (
      <>
        {/* <Header /> */}

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
                {visualizationType === 'Visualisation' &&
                <div
                  className="goto-sankey"
                  onClick={this.handleScrollToSankey}
                >
                  <GoToSankey />
                  <span className="goto-sankey-text">
                    Go to Sankey
                  </span>
                </div>}
              </div>

              <div
                className="literacy-tab-content"
                style={{
                  width: showRightSidebar ? '63vw' : '79vw',
                }}
              >
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
                        <div className="card" id="chart-horizontal">
                          <HorizontalChart
                            isDownloading={isDownloading}
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
                            generateBarChartData={
                              this.generateBarChartData
                            }
                            isBarChartClicked={
                              this.state.isBarChartClicked
                            }
                            chartData2={this.state.chartData2}
                            handleBarChartReset={
                              this.handleBarChartReset
                            }
                            clickedPartnerName={clickedPartnerName}
                          />
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="card" id="chart-donut">
                          <div className="card-header">
                            <h5>
                              Financial Literacy Beneficiaries Mix by
                              Partner Types
                            </h5>
                            {!isDownloading && (
                              <div className="header-icons">
                                <span
                                  className=""
                                  onClick={() => {
                                    this.downloadPng(
                                      'chart-donut',
                                      'Financial Literacy Beneficiaries Mix by Partner Type',
                                    );
                                  }}
                                  onKeyDown={() => {
                                    this.downloadPng(
                                      'chart-donut',
                                      'Financial Literacy Beneficiaries Mix by Partner Type',
                                    );
                                  }}
                                  role="tab"
                                  tabIndex="0"
                                >
                                  <img
                                    src={DownloadIcon}
                                    alt="open"
                                  />
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
                            )}
                          </div>
                          <div className="card-body">
                            <DonutChart
                              selectedProgram={selectedProgram1}
                              selectedPartner={checkedPartnerItems1}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-12">
                        <div className="card" id="chart-treemap">
                          <TreeMapDiagram
                            isTreeMapClicked={
                              this.state.isTreeMapClicked
                            }
                            resetTreeMapClick={this.resetTreeMapClick}
                            handleTreemap={this.resetTreeMapClick}
                            handleTreeMapClick={
                              this.handleTreeMapClick
                            }
                            treeMapData2={this.state.treeMapData2}
                            // setTreeMapBackBtnFalse={
                            //   this.setTreeMapBackBtnFalse
                            // }
                            generateTreeMapData={
                              this.generateTreeMapData
                            }
                            isDownloading={isDownloading}
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

                    <div
                      className="card"
                      ref={this.sankeyRef}
                      id="chart-sankey"
                    >
                      <div className="card-header">
                        <h5>Beneficiaries Reached By Partners</h5>
                        {!isDownloading && (
                          <div className="header-icons">
                            <span
                              className
                              onClick={() => {
                                this.downloadPng(
                                  'chart-sankey',
                                  'Beneficiaries Reached By Partners',
                                );
                              }}
                              onKeyDown={() => {
                                this.downloadPng(
                                  'chart-sankey',
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
                        )}
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
              notificationHandler={this.notificationHandler}
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
            handelAlerts={this.notificationHandler}
          />

          {alertMessage && (
            <AlertComponent message={alertMessage} case="warning" />
          )}
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
