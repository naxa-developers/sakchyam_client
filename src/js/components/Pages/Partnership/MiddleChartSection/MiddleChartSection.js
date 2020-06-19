import React, { Component } from 'react';
import { connect } from 'react-redux';
import DownloadIcon from '../../../../../img/get_app.png';
import ExpandIcon from '../../../../../img/open_in_full-black-18dp.png';
import Sunburst from '../Charts/SunBurst/SunBurst';
import GroupedBar from '../Charts/GroupedBar/GroupedBar';
import RadarChart from '../Charts/RadarChart/RadarChart';
import CirclePackChart from '../Charts/CirclePack/CirclePackChart';
import SankeyChart from '../Charts/SankeyChart/SankeyChart';
import Modal from '../../FinancialLiteracy/Modal';

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
    switch (contentType) {
      case 'sunburst':
        return <Sunburst activeModal />;

      case 'sankey':
        return <SankeyChart activeModal />;
      case 'radar':
        return <RadarChart activeModal />;
      case 'circle':
        return <CirclePackChart activeModal />;
      case 'groupedChart':
        return <GroupedBar activeModal />;

      default:
        break;
    }
    return true;
  };

  render() {
    const {
      state: { selectedModal, activeModal },
      props: { activeView, activeOverview, sankeyChartwidth },
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

            selectedModal={selectedModal}
            handleModal={this.handleModal}
            // activeModal={activeModal}
            component={() => this.getModalContent(selectedModal)}
          />
        )}
        <div className="graph-view">
          <div className="row">
            <div className="col-xl-6">
              <div className="card">
                <div className="card-header">
                  <h5>Investment focus zoomable sunburst</h5>
                  <div className="header-icons">
                    {/* <div className="card-switcher">
                      <small>OFF</small>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                      <small>ON</small>
                    </div> */}
                    <span className="">
                      <img src={DownloadIcon} alt="open" />
                    </span>
                    <span className="zoom" popup-link="graph-modal">
                      <img src={ExpandIcon} alt="open" />
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  {radialData && radialData && (
                    <Sunburst
                      data={radialData}
                      width={500}
                      height={370}
                      count_member="size"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="card">
                <div className="card-header">
                  <h5>Stacked bar with Partner Type</h5>
                  <div className="header-icons">
                    {/* <div className="card-switcher">
                      <small>OFF</small>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                      <small>ON</small>
                    </div> */}
                    <span className="">
                      <img src={DownloadIcon} alt="open" />
                    </span>
                    <span
                      role="tab"
                      tabIndex="0"
                      onClick={() => {
                        this.handleModal();
                        this.handleSelectedModal('groupedChart');
                      }}
                      onKeyDown={() => {
                        this.handleModal();
                        this.handleSelectedModal('groupedChart');
                      }}
                      className="zoom"
                      popup-link="graph-modal"
                    >
                      <img src={ExpandIcon} alt="open" />
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <GroupedBar />
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="card">
                <div className="card-header">
                  <h5>Spider Net diagram</h5>
                  <div className="header-icons">
                    {/* <div className="card-switcher">
                      <small>OFF</small>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                      <small>ON</small>
                    </div> */}
                    <span className="">
                      <img src={DownloadIcon} alt="open" />
                    </span>
                    <span
                      role="tab"
                      tabIndex="0"
                      onClick={() => {
                        this.handleModal();
                        this.handleSelectedModal('radar');
                      }}
                      onKeyDown={() => {
                        this.handleModal();
                        this.handleSelectedModal('radar');
                      }}
                      className="zoom"
                      popup-link="graph-modal"
                    >
                      <img src={ExpandIcon} alt="open" />
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <RadarChart />
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="card">
                <div className="card-header">
                  <h5>Zoomable Circle Packing</h5>
                  <div className="header-icons">
                    {/* <div className="card-switcher">
                      <small>OFF</small>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                      <small>ON</small>
                    </div> */}
                    <span className="">
                      <img src={DownloadIcon} alt="open" />
                    </span>
                    <span
                      role="tab"
                      tabIndex="0"
                      onClick={() => {
                        this.handleModal();
                        this.handleSelectedModal('circle');
                      }}
                      onKeyDown={() => {
                        this.handleModal();
                        this.handleSelectedModal('circle');
                      }}
                      className="zoom"
                      popup-link="graph-modal"
                    >
                      <img src={ExpandIcon} alt="open" />
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <CirclePackChart />
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h5>Contribution of program initiatives</h5>
                  <div className="header-icons">
                    {/* <div className="card-switcher">
                      <small>OFF</small>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                      <small>ON</small>
                    </div> */}
                    <span className="">
                      <img src={DownloadIcon} alt="open" />
                    </span>
                    <span
                      role="tab"
                      tabIndex="0"
                      onClick={() => {
                        this.handleModal();
                        this.handleSelectedModal('sankey');
                      }}
                      onKeyDown={() => {
                        this.handleModal();
                        this.handleSelectedModal('sankey');
                      }}
                      className="zoom"
                      popup-link="graph-modal"
                    >
                      <img src={ExpandIcon} alt="open" />
                    </span>
                  </div>
                </div>
                <div className="card-body" id="sankeyChart">
                  <SankeyChart
                    cardWidth={sankeyChartwidth}
                    activeOverview={activeOverview}
                  />
                </div>
              </div>
            </div>
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
