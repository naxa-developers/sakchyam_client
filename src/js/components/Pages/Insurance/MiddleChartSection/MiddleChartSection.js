import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  render() {
    const {
      state: { selectedModal, activeModal },
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
    // console.log(

    if (radialData && radialData.children) {
      formatData(radialData.children);
    }
    return (
      <div className="literacy-tab-item" style={{ display: 'block' }}>
        {activeModal && (
          <Modal
            groupedStackData={groupedStackData}
            handleShowBarOf={handleShowBarOf}
            resetFilters={resetFilters}
            selectedModal={selectedModal}
            handleModal={this.handleModal}
            activeModal={activeModal}
            component={() => this.getModalContent(selectedModal)}
          />
        )}
        <div className="graph-view">
          <div className="row">
            {/* <CardTab
              resetFunction={() => {
                this.props.resetRadialData();
              }}
              cardTitle="Sakchyam Investment Focus"
              cardClass="col-xl-12"
              cardChartId="sunburst"
              handleModal={this.handleModal}
              handleSelectedModal={() => {
                this.handleSelectedModal('sunburst');
              }}
              renderChartComponent={() => {
                return (
                  <SunburstContainer
                    data={radialData}
                    height={250}
                    width={250}
                    count_member="size"
                    onClick={this.handleSunburstClick}
                  />
                );
              }}
            /> */}
            <CardTab
              resetFunction={() => {
                this.props.resetBarDatas();
                this.props.handleShowBarOf('Provinces');
              }}
              showBarof={showBarof}
              handleShowBarOf={handleShowBarOf}
              cardTitle="Province Wise Budget & Beneficiaries Count"
              cardClass="col-xl-6"
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

            <CardTab
              resetFunction={() => {
                this.props.resetBarDatas();
                this.props.handleShowBarOf('Provinces');
              }}
              showBarof={showBarof}
              handleShowBarOf={handleShowBarOf}
              cardTitle="Province Wise Budget & Beneficiaries Count"
              cardClass="col-xl-6"
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

            <CardTab
              resetFunction={() => {
                this.props.resetBarDataByInvestmentFocus();
                this.props.handleShowBarOfInvestmentBudgetBenefBar(
                  'investmentFocus',
                );
              }}
              showBarof={showBarofInvestmentBudgetBenef}
              handleShowBarOf={
                handleShowBarOfInvestmentBudgetBenefBar
              }
              cardTitle="Investment Focus Wise Budget & Beneficiaries Count"
              cardClass="col-xl-6"
              cardChartId="stackedWithInvestment"
              handleModal={this.handleModal}
              handleSelectedModal={() => {
                this.handleSelectedModal('stackedWithInvestment');
              }}
              renderChartComponent={() => {
                return (
                  <StackedBarWithInvestment
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
                    showBarofInvestmentBudgetBenef={
                      showBarofInvestmentBudgetBenef
                    }
                    handleShowBarOfInvestmentBudgetBenefBar={
                      handleShowBarOfInvestmentBudgetBenefBar
                    }
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
