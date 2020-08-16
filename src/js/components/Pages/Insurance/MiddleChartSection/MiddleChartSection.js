/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import RadarChart from '../Charts/RadarChart/RadarChart';
import CirclePackChart from '../Charts/CirclePack/CirclePackChart';
import Modal from './Modal';
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
      isBarChartToggled: false,
      selectedTab: 'innovation',
      selectedTabBar: 'insurance-premium',
      modalHeader: '',
    };
  }

  setSelectedTabBar = e => {
    this.setState({ selectedTabBar: e });
  };

  setSelectedTabDonut = e => {
    this.setState({ selectedTab: e });
  };

  handleBarChartToggle = () => {
    this.setState(prevState => ({
      isBarChartToggled: !prevState.isBarChartToggled,
    }));
  };

  handleModal = () => {
    this.setState(prevState => ({
      activeModal: !prevState.activeModal,
    }));
  };

  handleSelectedModal = value => {
    const modalHeader =
      value === 'bar'
        ? 'Partner wise distribution of Amount of Insurance Premium (NPR) and Amount of Sum Insured'
        : value === 'donut'
        ? 'Ratio of number of insurance policies sold'
        : 'Sankey chart based on number of insurance policies sold';

    this.setState({
      selectedModal: value,
      modalHeader,
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
    const { activeModal, selectedTab, selectedTabBar } = this.state;

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
        insuranceData,
      },
    } = this;
    const {
      partnershipReducer: { radialData },
    } = this.props;
    switch (contentType) {
      case 'bar':
        return (
          <BarChartInsurance
            activeModal
            insuranceData={insuranceData}
            selectedTabBar={selectedTabBar}
            setSelectedTabBar={this.setSelectedTabBar}
          />
        );

      case 'donut':
        return (
          <DonutChartInsurance
            activeModal
            insuranceData={insuranceData}
            selectedTab={selectedTab}
            setSelectedTabDonut={this.setSelectedTabDonut}
          />
        );
      case 'sankey':
        return (
          <SankeyChartInsurance
            activeModal
            insuranceData={insuranceData}
          />
        );

      default:
        break;
    }
    return true;
  };

  downloadPng = (chartid, filename) => {
    this.setState({ isDownloading: true });
    const name = filename ? filename : 'chart';
    const icons = document.querySelector('.header-icons');
    icons.style.display = 'none';

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
      // this.setState({ isDownloading: false });
      icons.style.display = 'block';
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
    const {
      activeModal,
      selectedModal,
      selectedTab,
      selectedTabBar,
      modalHeader,
    } = this.state;

    return (
      <div className="literacy-tab-item" style={{ display: 'block' }}>
        {activeModal && (
          <Modal
            // visible={selectedModal === 'bar' ? true : false}
            modalHeader={modalHeader}
            // groupedStackData={groupedStackData}
            showBarof={showBarof}
            handleShowBarOf={handleShowBarOf}
            // resetFilters={resetFilters}
            selectedModal={selectedModal}
            handleModal={this.handleModal}
            activeModal={activeModal}
            component={() => this.getModalContent(selectedModal)}
          />
        )}
        <div className="graph-view">
          <div className="row">
            <div className="col-xl-12">
              <div className="card" id="bar-chart">
                <BarChartInsurance
                  clickIndex={this.state.clickIndex}
                  insuranceData={insuranceData}
                  handleClickIndex={this.handleClickIndex}
                  // showRightSidebar={showRightSidebar}
                  activeModal={false}
                  // activeModal={activeModal}
                  // barTitle={barTitle}
                  barTitle="Partner wise distribution of Amount of Insurance Premium (NPR) and Amount of Sum Insured"
                  isDownloading={false}
                  DownloadIcon={DownloadIcon}
                  ExpandIcon={ExpandIcon}
                  downloadPng={this.downloadPng}
                  handleModal={this.handleModal}
                  handleSelectedModal={this.handleSelectedModal}
                  handleBarChartToggle={this.handleBarChartToggle}
                  isBarChartToggled={this.state.isBarChartToggled}
                  selectedTabBar={selectedTabBar}
                  setSelectedTabBar={this.setSelectedTabBar}
                />
              </div>
            </div>

            <CardTab
              resetFunction={this.props.resetSankeyChartData}
              cardTitle="Ratio of number of insurance policies sold"
              cardClass="col-xl-12"
              cardChartId="insurance-donut"
              handleModal={this.handleModal}
              handleSelectedModal={() => {
                this.handleSelectedModal('donut');
              }}
              renderChartComponent={() => {
                return (
                  <DonutChartInsurance
                    insuranceData={insuranceData}
                    selectedTab={selectedTab}
                    setSelectedTabDonut={this.setSelectedTabDonut}
                    activeModal={activeModal}
                  />
                );
              }}
            />
            <CardTab
              resetFunction={this.props.resetSankeyChartData}
              cardTitle="Sankey chart based on number of insurance policies sold"
              cardClass="col-xl-12"
              cardChartId="insurance-sankey"
              handleModal={this.handleModal}
              handleSelectedModal={() => {
                this.handleSelectedModal('sankey');
              }}
              renderChartComponent={() => {
                return (
                  <SankeyChartInsurance
                    insuranceData={insuranceData}
                    activeModal={activeModal}
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
