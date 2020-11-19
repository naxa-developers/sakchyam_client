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
let sankeyTitle = '';
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

  getCheckboxId = (status, name) => {
    const {
      partnersList,
      projectLists,
    } = this.props.partnershipReducer;
    let output;
    if (status === 'partner') {
      const selectedItem = partnersList.filter(d => d.name === name);
      output = selectedItem[0].id;
    } else if (status === 'project') {
      const selectedItem = projectLists.filter(d => d.name === name);
      output = selectedItem[0].id;
    }
    return output;
  };

  handleSunburstClick = e => {
    const {
      partnersList,
      partnershipInvestmentFocus,
      projectLists,
    } = this.props.partnershipReducer;
    // const that = this;
    this.props.resetLeftSideBarSelection();

    console.log(e, 'e');
    const clickedName = e.data.name;
    const iterate = obj => {
      if (obj) {
        Object.keys(obj).forEach(key => {
          // console.log(obj[key]);
          if (obj[key] && obj[key].name) {
            const element = document.querySelector(
              `[data-label='${obj[key].name}`,
            );
            // console.log(this.getCheckboxId('project', obj[key].name));
            if (element) {
              if (element.className === 'investment_checkbox') {
                console.log(obj[key].name);
                document
                  .querySelector(`[data-label='${obj[key].name}']`)
                  .click();
              }
              setTimeout(() => {
                if (element.className === 'project_checkbox') {
                  console.log(
                    this.getCheckboxId('project', obj[key].name),
                  );
                  this.props.handleProjectSelection(
                    this.getCheckboxId('project', obj[key].name),
                  );
                }
                if (element.className === 'partner_checkbox') {
                  console.log(
                    this.getCheckboxId('partner', obj[key].name),
                  );
                  this.props.handlePartnerSelection(
                    this.getCheckboxId('partner', obj[key].name),
                  );
                }
              }, 1000);
              console.log(element.className);

              if (
                element.className.replace(' ', '') ===
                'partnerType_badge'
              ) {
                document
                  .querySelector(`[data-label='${obj[key].name}']`)
                  .click();
                // console.log(obj[key].name);
              }
              // document
              //   .querySelector(`[data-label='${obj[key].name}']`)
              //   .click();
            }
          }
          if (key === 'parent') {
            iterate(obj[key]);
          }
        });
      }
    };

    // this.props.resetLeftSideBarSelection();
    //
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
    //
    if (clickedName === 'Partnership') {
      // alert('partnership');
      this.props.resetRadialData();
      this.props.resetFilters();
    } else {
      iterate(e);
      // document
      //   .querySelectorAll(`[data-label='${clickedName}']`)[0]
      //   .click();
      // document.getElementsByName(clickedName)[0].click();
      setTimeout(() => {
        this.props.applyBtnClick(false);
      }, 1000);
    }
    // }
    //
    //
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
            domId="test1"
            data={radialData}
            height={window.innerWidth < 1400 ? 460 : 700}
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
        return <SankeyChart activeModal cardTitle={sankeyTitle} />;
      case 'radar':
        return <RadarChart activeModal />;
      case 'circle':
        return <CirclePackChart activeModal />;
      case 'groupedChart':
        return (
          <div id="barContainer">
            <StackedBarWithAllFederal
              cardTitle="Province/District/Municipality Wise Budget & Beneficiaries Count"
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
              cardTitle={`${
                showBarofInvestmentBudgetBenef === 'investmentFocus'
                  ? 'Investment Focus'
                  : 'Project'
              } Wise Budget & Beneficiaries Count`}
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
              cardTitle="S-CF Funds & Leverage By Investment Focus"
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
        notificationHandler,
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
    //

    if (viewDataBy === 'allocated_budget') {
      sankeyTitle = 'Budget Allocated';
    } else if (viewDataBy === 'allocated_beneficiary') {
      sankeyTitle = 'Beneficiary Reached';
    }
    return (
      <div
        id="literacy-tab-items"
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
            notificationHandler={notificationHandler}
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
              notificationHandler={notificationHandler}
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
                    domId="test2"
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
              notificationHandler={notificationHandler}
              resetFunction={() => {
                this.props.resetBarDatas();
                this.props.handleShowBarOf('Provinces');
                this.props.resetFilters();
              }}
              showBarof={showBarof}
              handleShowBarOf={handleShowBarOf}
              cardTitle="Province/District/Municipality Budget & Beneficiaries Count"
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
                notificationHandler={notificationHandler}
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
                cardTitle={`${
                  showBarofInvestmentBudgetBenef === 'investmentFocus'
                    ? 'Investment Focus'
                    : 'Project'
                } Wise Budget & Beneficiaries Count`}
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
                notificationHandler={notificationHandler}
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
            <CardTab
              notificationHandler={notificationHandler}
              resetFunction={this.props.resetSankeyChartData}
              cardTitle={sankeyTitle}
              cardClass="col-xl-12"
              cardChartId="sankeyChart"
              handleModal={this.handleModal}
              handleSelectedModal={() => {
                this.handleSelectedModal('sankey');
              }}
              renderChartComponent={() => {
                return (
                  <SankeyChart
                    cardTitle={sankeyTitle}
                    cardWidth={sankeyChartwidth}
                    activeModal={activeModal}
                    activeOverview={activeOverview}
                  />
                );
              }}
            />
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
