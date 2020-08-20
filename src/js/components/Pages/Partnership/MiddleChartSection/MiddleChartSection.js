import React, { Component } from 'react';
import { connect } from 'react-redux';
import data from './timelineData';
import links from './timelineLinks';
import Sunburst from '../Charts/SunBurst/SunBurst';
import GroupedBar from '../Charts/GroupedBar/GroupedBar';
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
    // this.props.getRadialData(this.props.viewDataBy);
    // setTimeout(() => {
    //   this.props.getRadialData();
    // }, 500);
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
    // const that = this;
    const clickedName = e.data.name;
    this.props.resetLeftSideBarSelection();
    // console.log(clickedName, 'clicked');
    // console.log(
    //   partnershipInvestmentFocus.filter(investment => {
    //     return investment.investment_primary === clickedName;
    //   }),
    // );
    // if (
    //   partnershipInvestmentFocus.filter(investment => {
    //     return investment.investment_primary === clickedName;
    //   })
    // ) {
    // console.log('found if');
    if (clickedName === 'Partnership') {
      // alert('partnership');
      this.props.resetRadialData();
      this.props.resetFilters();
    } else {
      document
        .querySelectorAll(`[data-label='${clickedName}']`)[0]
        .click();
      // document.getElementsByName(clickedName)[0].click();
      this.props.applyBtnClick();
    }
    // }
    // console.log(this.props, 'partnership');
    // console.log(e.data.name);
  };

  // sunburstColorFn = () => {
  //   alert('test');
  // };

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
        isLeverageBarClicked,
        handleLeverageBarClicked,
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
            height={window.innerWidth < 1400 ? 560 : 700}
            width={900}
            count_member="size"
            activeModal={activeModal}
            onClick={this.handleSunburstClick}
            // reset={this.props.resetSunburst}
          />
          // <Sunburst
          //   data={radialData}
          //   height={700}
          //   width={900}
          //   count_member="size"
          //   onClick={this.handleSunburstClick}
          //   // activeModal={props.activeModal}
          // />
        );

      case 'sankey':
        return <SankeyChart activeModal />;
      case 'radar':
        return <RadarChart activeModal />;
      case 'circle':
        return <CirclePackChart activeModal />;
      case 'groupedChart':
        return (
          <div id="barContainer" style={{ width: '1900px' }}>
            <StackedBarWithAllFederal
              cardTitle="Federal Wise Budget & Beneficiaries Count"
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
          <div id="barContainer" style={{ width: '1900px' }}>
            <StackedBarWithInvestment
              cardTitle="Investment Focus Wise Budget & Beneficiaries Count"
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
          <div id="barContainer" style={{ width: '1900px' }}>
            <LeverageStackedBar
              isLeverageBarClicked={isLeverageBarClicked}
              handleLeverageBarClicked={handleLeverageBarClicked}
              cardTitle="Investment Focus Wise Budget & Beneficiaries Count"
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
      // case 'timeline':
      //   return (
      //     <div className="time-line-container">
      //       <Timeline
      //         nonEditableName
      //         data={data}
      //         links={links}
      //         mode="year"
      //       />
      //     </div>
      //   );

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
        isLeverageBarClicked,
        handleLeverageBarClicked,
      },
    } = this;
    const {
      partnershipReducer: { radialData },
    } = this.props;
    // console.log(

    if (radialData && radialData.children) {
      formatData(radialData.children);
    }
    //   'radialData',
    // );
    // console.log(radialData && radialData, 'radialData');
    return (
      <div
        className="literacy-tab-item"
        style={
          activeView === 'visualization'
            ? { display: 'block' }
            : { display: 'none' }
        }
      >
        {activeModal && (
          <Modal
            // visible={selectedModal === 'bar' ? true : false}
            // modalHeader="Sakchyam Investment Focus"
            groupedStackData={groupedStackData}
            showBarof={showBarof}
            handleShowBarOf={handleShowBarOf}
            resetFilters={resetFilters}
            selectedModal={selectedModal}
            handleModal={this.handleModal}
            activeModal={activeModal}
            component={() => this.getModalContent(selectedModal)}
            handleShowBarOfInvestmentBudgetBenefBar={
              handleShowBarOfInvestmentBudgetBenefBar
            }
          />
        )}
        <div className="graph-view">
          <div className="row">
            <CardTab
              resetFunction={() => {
                // this.props.resetLeftSideBarSelection();
                this.props.resetRadialData();
                this.props.resetFilters();
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
                    height={400}
                    width={690}
                    count_member="size"
                    onClick={this.handleSunburstClick}
                    // labelFunc={node => node.data.name}
                    // colorFunc={node => 'red'}

                    // reset={this.props.resetSunburst}
                  />
                );
              }}
            />
            <CardTab
              resetFunction={() => {
                this.props.resetBarDatas();
                this.props.handleShowBarOf('Provinces');
                this.props.resetFilters();
              }}
              showBarof={showBarof}
              handleShowBarOf={handleShowBarOf}
              cardTitle="Federal Wise Budget & Beneficiaries Count"
              cardClass="col-xl-6"
              cardChartId="groupedChart"
              handleModal={this.handleModal}
              handleSelectedModal={() => {
                this.handleSelectedModal('groupedChart');
              }}
              renderChartComponent={() => {
                return (
                  // <StackedBarWithProvince
                  //   viewDataBy={viewDataBy}
                  //   activeModal={activeModal}
                  //   investmentFocusSelection={
                  //     investmentFocusSelection
                  //   }
                  //   partnerSelection={partnerSelection}
                  //   partnerTypeSelection={partnerTypeSelection}
                  //   projectSelection={projectSelection}
                  //   projectStatus={projectStatus}
                  //   showBarof={showBarof}
                  //   handleShowBarOf={handleShowBarOf}
                  // />
                  <StackedBarWithAllFederal
                    viewDataBy={viewDataBy}
                    activeModal={activeModal}
                    investmentFocusSelection={
                      investmentFocusSelection
                    }
                    cardView
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
            {viewDataBy !== 'Leverage' && (
              <CardTab
                resetFunction={() => {
                  this.props.resetBarDataByInvestmentFocus();
                  this.props.handleShowBarOfInvestmentBudgetBenefBar(
                    'investmentFocus',
                  );
                  this.props.resetFilters();
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
            )}
            {viewDataBy === 'Leverage' && (
              <CardTab
                resetFunction={() => {
                  this.props.resetLeverageData();
                  this.props.resetFilters();
                }}
                cardTitle="S-CF Funds & Leverage By Investment Focus"
                cardClass="col-xl-6"
                cardChartId="leverageChart"
                handleModal={this.handleModal}
                handleSelectedModal={() => {
                  this.handleSelectedModal('leverageChart');
                }}
                renderChartComponent={() => {
                  return (
                    <LeverageStackedBar
                      isLeverageBarClicked={isLeverageBarClicked}
                      handleLeverageBarClicked={
                        handleLeverageBarClicked
                      }
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
            )}
            {/* <CardTab
              cardTitle="Key Services Introduced"
              cardClass="col-xl-6"
              cardChartId="radar"
              handleModal={this.handleModal}
              handleSelectedModal={() => {
                this.handleSelectedModal('radar');
              }}
              renderChartComponent={() => {
                return <RadarChart />;
              }}
            /> */}
            {/* <CardTab
              cardTitle="Zoomable Circle Packing"
              cardClass="col-xl-6"
              cardChartId="circle"
              handleModal={this.handleModal}
              handleSelectedModal={() => {
                this.handleSelectedModal('circle');
              }}
              renderChartComponent={() => {
                return <CirclePackChart />;
              }}
            /> */}
            {/* <CardTab
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
            /> */}
            {/* <CardTab
              cardTitle="Projects Timeline"
              cardClass="col-xl-12"
              cardChartId="sankeyChart"
              handleModal={this.handleModal}
              handleSelectedModal={() => {
                this.handleSelectedModal('timeline');
              }}
              renderChartComponent={() => {
                return (
                  <div className="time-line-container">
                    <Timeline
                      nonEditableName
                      data={data}
                      links={links}
                      mode="year"
                    />
                  </div>
                );
              }}
            /> */}
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
