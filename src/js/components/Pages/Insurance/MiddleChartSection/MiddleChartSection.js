import React, { Component } from 'react';
import { connect } from 'react-redux';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import RadarChart from '../Charts/RadarChart/RadarChart';
import CirclePackChart from '../Charts/CirclePack/CirclePackChart';
import SankeyChart from '../Charts/SankeyChart/SankeyChart';
import Modal from '../../../common/Modal';
import CardTab from '../common/CardTab';
import StackedBarWithProvince from '../Charts/StackedBarWithProvince/StackedBarWithProvince';
import StackedBarWithInvestment from '../Charts/StackedBarWithInvestment/StackedBarWithInvestment';
import {
  getRadialData,
  resetBarDatas,
  resetRadialData,
  resetSankeyChartData,
  resetLeverageData,
  resetBarDataByInvestmentFocus,
} from '../../../../actions/partnership.actions';
import LeverageStackedBar from '../Charts/LeverageStackedBar/LeverageStackedBar';
import SunburstContainer from '../Charts/SunBurst';
import StackedBarWithAllFederal from '../Charts/StackedBarWithAllFederal/StackedBarWithAllFederal';
import DownloadIcon from '../../../../../img/get_app.png';
import ExpandIcon from '../../../../../img/open_in_full-black-18dp.png';
import DonutChart from '../Charts/DonutChart';

function formatData(fulldata) {
  fulldata.forEach(datum => {
    if (datum.children && datum.children.length > 0) {
      formatData(datum.children);
    }
    // eslint-disable-next-line no-param-reassign
    datum.size = Math.round(datum.size);
  });
}
class MiddleChartSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: false,
      selectedModal: '',
      isDownloading: false,
    };
  }

  componentDidMount() {
    this.props.getRadialData();
  }

  handleModal = () => {
    this.setState(prevState => ({
      activeModal: !prevState.activeModal,
    }));
  };

  handleSelectedModal = value => {
    this.setState({
      selectedModal: value,
    });
  };

  handleSunburstClick = e => {
    const {
      partnersList,
      partnershipInvestmentFocus,
      projectLists,
    } = this.props.partnershipReducer;
    const clickedName = e.data.name;
    this.props.resetLeftSideBarSelection();
    if (clickedName === 'Partnership') {
      this.props.resetRadialData();
      this.props.resetFilters();
    }
    document
      .querySelectorAll(`[data-label='${clickedName}']`)[0]
      .click();
    this.props.applyBtnClick();
  };

  getModalContent = contentType => {
    const { activeModal } = this.state;
    const {
      props: {
        activeView,
        activeOverview,
        sankeyChartwidth,
        viewDataBy,
        investmentFocusSelection,
        partnerSelection,
        partnerTypeSelection,
        projectSelection,
        projectStatus,
        showBarof,
        handleShowBarOf,
        showBarofInvestmentBudgetBenef,
        handleShowBarOfInvestmentBudgetBenefBar,
      },
    } = this;
    const {
      partnershipReducer: { radialData },
    } = this.props;
    switch (contentType) {
      case 'sunburst':
        return (
          <SunburstContainer
            data={radialData}
            height={700}
            width={900}
            count_member="size"
            activeModal={activeModal}
            // reset={this.props.resetSunburst}
          />
        );

      case 'sankey':
        return <SankeyChart activeModal />;
      case 'radar':
        return <RadarChart activeModal />;
      case 'circle':
        return <CirclePackChart activeModal />;
      case 'groupedChart':
        return (
          <div
            id="barContainer"
            style={{ width: '1900px', overflowX: 'scroll' }}
          >
            <StackedBarWithAllFederal
              viewDataBy={viewDataBy}
              activeModal={activeModal}
              investmentFocusSelection={investmentFocusSelection}
              partnerSelection={partnerSelection}
              partnerTypeSelection={partnerTypeSelection}
              projectSelection={projectSelection}
              projectStatus={projectStatus}
              showBarof={showBarof}
              handleShowBarOf={handleShowBarOf}
            />
          </div>
        );
      case 'stackedWithInvestment':
        return (
          <div
            id="barContainer"
            style={{ width: '1900px', overflowX: 'scroll' }}
          >
            <StackedBarWithInvestment
              viewDataBy={viewDataBy}
              activeModal={activeModal}
              investmentFocusSelection={investmentFocusSelection}
              partnerSelection={partnerSelection}
              partnerTypeSelection={partnerTypeSelection}
              projectSelection={projectSelection}
              projectStatus={projectStatus}
              showBarof={showBarof}
              handleShowBarOf={handleShowBarOf}
              showBarofInvestmentBudgetBenef={
                showBarofInvestmentBudgetBenef
              }
              handleShowBarOfInvestmentBudgetBenefBar={
                handleShowBarOfInvestmentBudgetBenefBar
              }
            />
          </div>
        );
      case 'leverageChart':
        return (
          <div
            id="barContainer"
            style={{ width: '1900px', overflowX: 'scroll' }}
          >
            <LeverageStackedBar
              viewDataBy={viewDataBy}
              activeModal={activeModal}
              investmentFocusSelection={investmentFocusSelection}
              partnerSelection={partnerSelection}
              partnerTypeSelection={partnerTypeSelection}
              projectSelection={projectSelection}
              projectStatus={projectStatus}
              showBarof={showBarof}
              handleShowBarOf={handleShowBarOf}
            />
          </div>
        );

      default:
        break;
    }
    return true;
  };

  downloadPng = (chartid, filename) => {
    this.setState({ isDownloading: true });
    const name = filename ? filename : 'chart';
    setTimeout(() => {
      html2canvas(document.querySelector(`#${chartid}`), {
        allowTaint: true,
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

  render() {
    const {
      state: { selectedModal, activeModal, isDownloading },
      props: {
        resetFilters,
        resetLeftSideBarSelection,
        activeView,
        activeOverview,
        sankeyChartwidth,
        viewDataBy,
        investmentFocusSelection,
        partnerSelection,
        partnerTypeSelection,
        projectSelection,
        projectStatus,
        showBarof,
        handleShowBarOf,
        showBarofInvestmentBudgetBenef,
        handleShowBarOfInvestmentBudgetBenefBar,
        groupedStackData,
      },
    } = this;
    const {
      partnershipReducer: { radialData },
    } = this.props;

    if (radialData && radialData.children) {
      formatData(radialData.children);
    }
    return (
      <div className="literacy-tab-item" style={{ display: 'block' }}>
        <div className="graph-view">
          <div className="row">
            <CardTab
              resetFunction={() => {
                this.props.resetBarDatas();
                this.props.handleShowBarOf('Provinces');
              }}
              showBarof={showBarof}
              handleShowBarOf={handleShowBarOf}
              cardTitle="Province Wise Budget & Beneficiaries Count"
              cardClass="col-xl-12"
              cardChartId="groupedChart"
              handleModal={this.handleModal}
              handleSelectedModal={() => {
                this.handleSelectedModal('groupedChart');
              }}
              renderChartComponent={() => {
                return (
                  <StackedBarWithProvince
                    viewDataBy={viewDataBy}
                    activeModal={activeModal}
                    investmentFocusSelection={
                      investmentFocusSelection
                    }
                    partnerSelection={partnerSelection}
                    partnerTypeSelection={partnerTypeSelection}
                    projectSelection={projectSelection}
                    projectStatus={projectStatus}
                    showBarof={showBarof}
                    handleShowBarOf={handleShowBarOf}
                  />
                );
              }}
            />
            {/* <div className="col-xl-12">
              <div className="card" id="chart-donut">
                <div className="card-header">
                  <h5>
                    Financial Literacy Beneficiaries Mix by Partner
                    Type
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
                  )}
                </div>
                <div className="card-body">
                  <DonutChart
                    selectedProgram={selectedProgram1}
                    selectedPartner={checkedPartnerItems1}
                  />
                </div>
              </div>
            </div> */}
            <CardTab
              resetFunction={this.props.resetSankeyChartData}
              cardTitle={
                viewDataBy === 'allocated_budget'
                  ? 'Budget Reached'
                  : 'Beneficiary Reached'
              }
              cardClass="col-xl-12"
              cardChartId="sankeyChart"
              handleModal={this.handleModal}
              handleSelectedModal={() => {
                this.handleSelectedModal('sankey');
              }}
              renderChartComponent={() => {
                return (
                  <SankeyChart
                    cardWidth={sankeyChartwidth}
                    activeModal={activeModal}
                    activeOverview={activeOverview}
                  />
                );
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});
export default connect(mapStateToProps, {
  getRadialData,
  resetBarDatas,
  resetLeverageData,
  resetRadialData,
  resetSankeyChartData,
  resetBarDataByInvestmentFocus,
})(MiddleChartSection);
