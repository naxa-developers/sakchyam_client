/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import RadarChart from '../Charts/RadarChart/RadarChart';
import CirclePackChart from '../Charts/CirclePack/CirclePackChart';
import Modal from '../../../common/Modal';
import CardTab from '../common/CardTab';
import StackedBarWithProvince from '../Charts/StackedBarWithProvince/StackedBarWithProvince';
import StackedBarWithInvestment from '../Charts/StackedBarWithInvestment/StackedBarWithInvestment';
import LeverageStackedBar from '../Charts/LeverageStackedBar/LeverageStackedBar';
import SunburstContainer from '../Charts/SunBurst';
import StackedBarWithAllFederal from '../Charts/StackedBarWithAllFederal/StackedBarWithAllFederal';
import DownloadIcon from '../../../../../img/get_app.png';
import ExpandIcon from '../../../../../img/open_in_full-black-18dp.png';
import DonutChartInsurance from '../Charts/DonutChart/DonutChartInsurance';
import SankeyChartInsurance from '../Charts/SankeyChart/SankeyChartInsurance';
import BarChartInsurance from '../Charts/BarChart/BarChartInsurance';

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
    };
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
        return <SankeyChartInsurance activeModal />;
      case 'radar':
        return <RadarChart activeModal />;
      case 'circle':
        return <CirclePackChart activeModal />;
      case 'groupedChart':
        return (
          <div
            id="barContainer"
            style={{ width: '1900px', overflowX: 'scroll' }}
          />
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
      props: {
        viewDataBy,
        showBarof,
        handleShowBarOf,
        insuranceData,
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
                  <BarChartInsurance
                    clickIndex={this.state.clickIndex}
                    insuranceData={insuranceData}
                    handleClickIndex={this.handleClickIndex}
                  />
                );
              }}
            />

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
                  <DonutChartInsurance
                    insuranceData={insuranceData}
                  />
                );
              }}
            />
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
                  <SankeyChartInsurance
                    insuranceData={insuranceData}
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
export default connect(mapStateToProps)(MiddleChartSection);
