import React, { Component } from 'react';
import { connect } from 'react-redux';
import Timeline from 'react-gantt-timeline';
import data from './timelineData';
import links from './timelineLinks';
import Sunburst from '../Charts/SunBurst/SunBurst';
import GroupedBar from '../Charts/GroupedBar/GroupedBar';
import RadarChart from '../Charts/RadarChart/RadarChart';
import CirclePackChart from '../Charts/CirclePack/CirclePackChart';
import SankeyChart from '../Charts/SankeyChart/SankeyChart';
import Modal from '../../../common/Modal';
import CardTab from '../common/CardTab';

class MiddleChartSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: false,
      selectedModal: '',
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

  getModalContent = contentType => {
    const { activeModal } = this.state;
    const {
      props: {
        activeView,
        activeOverview,
        sankeyChartwidth,
        viewDataBy,
        partnerSelection,
        projectSelection,
        projectStatus,
        showBarof,
        handleShowBarOf,
      },
    } = this;
    const {
      partnershipReducer: { radialData },
    } = this.props;
    switch (contentType) {
      case 'sunburst':
        return (
          <Sunburst
            data={radialData}
            height={700}
            width={900}
            count_member="size"
            activeModal={activeModal}
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
          <GroupedBar
            viewDataBy={viewDataBy}
            activeModal={activeModal}
            partnerSelection={partnerSelection}
            projectSelection={projectSelection}
            projectStatus={projectStatus}
            showBarof={showBarof}
            handleShowBarOf={handleShowBarOf}
          />
        );
      case 'timeline':
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

      default:
        break;
    }
    return true;
  };

  render() {
    const {
      state: { selectedModal, activeModal },
      props: {
        activeView,
        activeOverview,
        sankeyChartwidth,
        viewDataBy,
        partnerSelection,
        projectSelection,
        projectStatus,
        showBarof,
        handleShowBarOf,
      },
    } = this;
    const {
      partnershipReducer: { radialData },
    } = this.props;
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
            selectedModal={selectedModal}
            handleModal={this.handleModal}
            activeModal={activeModal}
            component={() => this.getModalContent(selectedModal)}
          />
        )}
        <div className="graph-view">
          <div className="row">
            <CardTab
              cardTitle="Sakchyam Investment Focus"
              cardClass="col-xl-12"
              cardChartId="sunburst"
              handleModal={this.handleModal}
              handleSelectedModal={() => {
                this.handleSelectedModal('sunburst');
              }}
              renderChartComponent={() => {
                return (
                  radialData &&
                  radialData && (
                    <Sunburst
                      data={radialData}
                      height={500}
                      width={900}
                      count_member="size"
                      onClick={e => {
                        console.log('clicked', e.data.name);
                      }}
                    />
                  )
                );
              }}
            />
            <CardTab
              cardTitle="Province Wise Programme Results"
              cardClass="col-xl-6"
              cardChartId="sunburst"
              handleModal={this.handleModal}
              handleSelectedModal={() => {
                this.handleSelectedModal('groupedChart');
              }}
              renderChartComponent={() => {
                return (
                  <GroupedBar
                    viewDataBy={viewDataBy}
                    activeModal={activeModal}
                    partnerSelection={partnerSelection}
                    projectSelection={projectSelection}
                    projectStatus={projectStatus}
                    showBarof={showBarof}
                    handleShowBarOf={handleShowBarOf}
                  />
                );
              }}
            />
            <CardTab
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
            />
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
              cardTitle="Beneficiaries Reached"
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
                    activeOverview={activeOverview}
                  />
                );
              }}
            />
            <CardTab
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
export default connect(mapStateToProps, {})(MiddleChartSection);
