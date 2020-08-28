/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import Modal from './Modal';
import CardTab from '../common/CardTab';
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
      isBarChartClicked: false,
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

  handleBarChartClick = () => {
    this.setState(prevState => ({
      isBarChartClicked: !prevState.isBarChartClicked,
    }));
  };

  resetBarChartClick = () => {
    this.setState({
      isBarChartClicked: false,
    });
  };

  handleModal = () => {
    this.setState(prevState => ({
      activeModal: !prevState.activeModal,
    }));
  };

  handleSelectedModal = value => {
    const { selectedTabBar, isBarChartClicked } = this.state;

    const barTitle =
      selectedTabBar === 'insurance-premium' && !isBarChartClicked
        ? 'Partner wise distribution of Amount of Insurance Premium (NPR)'
        : selectedTabBar === 'insurance-premium' && isBarChartClicked
        ? 'Product wise distribution of Amount of Insurance Premium (NPR)'
        : selectedTabBar !== 'insurance-premium' && !isBarChartClicked
        ? 'Partner wise distribution of Amount of Sum Insured'
        : 'Product wise distribution of Amount of Sum Insured';

    const modalHeader =
      value === 'bar'
        ? barTitle
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
    const {
      activeModal,
      selectedTab,
      selectedTabBar,
      isBarChartClicked,
      barTitle,
    } = this.state;

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
      loading,
    } = this.props;
    switch (contentType) {
      case 'bar':
        return (
          <BarChartInsurance
            // activeModal={this.state.activeModal}
            // insuranceData={insuranceData}
            // selectedTabBar={selectedTabBar}
            // setSelectedTabBar={this.setSelectedTabBar}
            // resetBarChartClick={this.resetBarChartClick}
            // isBarChartClicked={this.state.isBarChartClicked}
            // handleBarChartClick={this.handleBarChartClick}
            loading={loading}
            insuranceData={insuranceData}
            showRightSidebar={!activeOverview}
            activeModal={activeModal}
            barTitle={barTitle}
            DownloadIcon={DownloadIcon}
            ExpandIcon={ExpandIcon}
            downloadPng={this.downloadPng}
            handleModal={this.handleModal}
            handleSelectedModal={this.handleSelectedModal}
            selectedTabBar={selectedTabBar}
            setSelectedTabBar={this.setSelectedTabBar}
            isBarChartClicked={isBarChartClicked}
            handleBarChartClick={this.handleBarChartClick}
            resetBarChartClick={this.resetBarChartClick}
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

    const barTab = document.querySelector('#bar-tab-insurance');
    barTab.style.display = 'none';

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
      barTab.style.display = 'block';
    }, 600);
  };

  render() {
    const {
      props: {
        showBarof,
        handleShowBarOf,
        insuranceData,
        activeOverview,
        loading,
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
      isBarChartToggled,
      isBarChartClicked,
    } = this.state;

    const barTitle =
      selectedTabBar === 'insurance-premium' && !isBarChartClicked
        ? 'Partner wise distribution of Amount of Insurance Premium (NPR)'
        : selectedTabBar === 'insurance-premium' && isBarChartClicked
        ? 'Product wise distribution of Amount of Insurance Premium (NPR)'
        : selectedTabBar !== 'insurance-premium' && !isBarChartClicked
        ? 'Partner wise distribution of Amount of Sum Insured'
        : 'Product wise distribution of Amount of Sum Insured';

    const donutTitle =
      selectedTab === 'innovation'
        ? 'Innovation wise ratio of number of insurance policies sold'
        : selectedTab === 'product'
        ? 'Product wise ratio of number of insurance policies sold'
        : 'Partner wise ratio of number of insurance policies sold';

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
            selectedTabBar={selectedTabBar}
            selectedTab={selectedTab}
            isBarChartClicked={isBarChartClicked}
          />
        )}
        <div className="graph-view">
          <div className="row">
            <div className="col-xl-12">
              <div className="card" id="bar-chart">
                <BarChartInsurance
                  loading={loading}
                  insuranceData={insuranceData}
                  showRightSidebar={!activeOverview}
                  activeModal={activeModal}
                  barTitle={barTitle}
                  DownloadIcon={DownloadIcon}
                  ExpandIcon={ExpandIcon}
                  downloadPng={this.downloadPng}
                  handleModal={this.handleModal}
                  handleSelectedModal={this.handleSelectedModal}
                  selectedTabBar={selectedTabBar}
                  setSelectedTabBar={this.setSelectedTabBar}
                  isBarChartClicked={isBarChartClicked}
                  handleBarChartClick={this.handleBarChartClick}
                  resetBarChartClick={this.resetBarChartClick}
                />
              </div>
            </div>

            <CardTab
              resetFunction={this.props.resetSankeyChartData}
              cardTitle={donutTitle}
              cardClass="col-xl-12"
              cardChartId="insurance-donut"
              handleModal={this.handleModal}
              handleSelectedModal={() => {
                this.handleSelectedModal('donut');
              }}
              renderChartComponent={() => {
                return (
                  <DonutChartInsurance
                    loading={loading}
                    insuranceData={insuranceData}
                    selectedTab={selectedTab}
                    setSelectedTabDonut={this.setSelectedTabDonut}
                    activeModal={activeModal}
                    showRightSidebar={!activeOverview}
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
                    loading={loading}
                    insuranceData={insuranceData}
                    activeModal={activeModal}
                    showRightSidebar={!activeOverview}
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
