import React, { Component } from "react";
import "../../css/bootstrap.min.css";
import "../../css/style.css";
import Header from "../../includes/Header";
import Sidebar from "../../includes/Sidebar";
// import Datasetpage from './includes/Datasetpage';
import MapComponent from "./MapComponent";
import RightSidebar from "../../includes/RightSidebar";
import ViewDetailsPopup from "../../includes/ViewDetailsPopup";
import Axios from "axios";

import AddInnovationForm from "./Form/AddInnovationForm";

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: true,
      formOpen: false,
      innovationData: [],
      provinceCounts: [],
      orgTypes: [],
      categorylist:[],
      countslist:[],
      sidebarExpanded: false,
      ViewDetailsPopupOpen: {clicked: false, data: {}},
      orgTypeCounts : {counts:[], categories: []},
      stageCounts : {counts:[], categories: []},
      typeCounts : {counts:[], categories: []},
      categoryCounts : {counts:[], categories: []},
      timePeriodCounts : {counts:[], categories: []},
      teamSizeCounts : {counts:[], categories: []},
      timeSeriesCounts : {counts:[], categories: []},
      supportCounts : {receivedcounts:[], needcounts:[], categories: []},
      stageData: [],
      typeData: [],
      categoryData: [],
      timePeriodData: [],
      teamSizeData: [],
      timeSeriesData: [],
      supportData: [],
      typeCategoryData: [],
    };
    this.mapRef = React.createRef();
    this.formMapRef = React.createRef();
  }
  closeModal = (e) => {
    // console.log(e, 'eee');
    e.preventDefault();
    this.setState({ modalOpen: false });
  };
  handleFormOpen = (openForm) => {
    // console.log(openForm, 'openform');
    this.setState({ formOpen: openForm }, () =>
      this.formMapRef.current.leafletElement.invalidateSize()
    );
  };
  closeInnovationForm = (e) => {
    this.setState({ formOpen: false });
  };
  expandBar = (expanded) => {
    this.setState({ sidebarExpanded: expanded });
  };

  // getAllInnovationData = () => {
  //   let currentComponent = this;
  //   fetch(`${process.env.PUBLIC_URL}/api/v1/inovation/`)
  //     .then(function(response) {
  //       if (response.status !== 200) {
  //         console.log(
  //           "Looks like there was a problem. Status Code: " + response.status
  //         );
  //         return;
  //       } // Examine the text in the response
  //       response.json().then(function(data) {
  //         // console.log(data, "data ddd")
  //         currentComponent.setState({ innovationData: data });
  //       });
  //     })
  //     .catch(function(err) {
  //       console.log("Fetch Error :-S", err);
  //     });
  // };

  getOrganizationType = () => {
    let currentComponent = this;
    fetch(`${process.env.PUBLIC_URL}/api/v1/organization-type/`)
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        } // Examine the text in the response
        response.json().then(function(data) {
          // console.log(data, "data ddd")
          currentComponent.setState({ orgTypes: data });
          var cats = [];
          data.map((cat) => {
            cats.push(cat.name);
          });
          currentComponent.setState({
            countslist: new Array(cats.length).fill(0),
            categorylist: cats,
          });
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  };
  
  getTimeSeriesData = () => {
    let currentComponent = this;
    fetch(`${process.env.PUBLIC_URL}/api/v1/time-series/`)
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        } // Examine the text in the response
        response.json().then(function(res) {
          currentComponent.setState({
            timeSeriesData: res,
          });
        });
      })
      .catch(function(err) {
        console.log("Fetch Error :-S", err);
      });
  }

  handleStage = (data) => {
    this.setState({stageData: data});
  }
  handletype = (data) => {
    this.setState({typeData: data});
  }
  handlecategory = (data) => {
    this.setState({categoryData: data});
  }
  handleTimePeriod = (data) => {
    this.setState({timePeriodData: data});
  }
  handleTeamSize = (data) => {
    this.setState({teamSizeData: data});
  }
  handleSupport = (data) => {
    this.setState({supportData: data});
  }
  handleTypeCategory = (data) => {
    this.setState({typeCategoryData: data});
  }
  handleViewDetailsClick = (data) => {
    console.log(data, "clicked view details");
    this.setState({ ViewDetailsPopupOpen: data });
  };
  componentWillMount() {}
  componentDidMount() {
    // this.getAllInnovationData();
    this.getOrganizationType();
    this.getTimeSeriesData()
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.innovations != [] &&
      this.state.orgTypeCounts.counts != [] &&
      prevProps.innovations != this.props.innovations
    ) {
      var innovationData = this.props.innovations;
      var provinceCount = [0, 0, 0, 0, 0, 0, 0];
      var orgTypeCount = {
        counts: this.state.countslist,
        categories: this.state.categorylist,
      };
      // console.log(this.props.innovations, "data ddd");
      innovationData.map(data =>{
        // console.log(data , "data")
        data.province!=null && provinceCount[data.province.id-1]++;
        orgTypeCount.categories.map((cat,i) => {
          if(data.organization_type!=null && data.organization_type.name == cat){
            orgTypeCount.counts[i]++;
          }
        })
      });
      // console.log(orgTypeCount ,"provincecount");
      this.setState({provinceCounts: provinceCount})
      this.setState({orgTypeCounts:orgTypeCount});

    }
        if(prevState.stageData != this.state.stageData){
          var stageData = this.state.stageData;
          var stageCount = this.state.stageCounts;
          stageData.map((data,i) =>{
            stageCount.counts[i] = data.count;
            stageCount.categories[i] = data.value;
          })
          this.setState({stageCounts:{counts:stageCount.counts, categories: stageCount.categories}})
        }
        if(prevState.typeData != this.state.typeData){
          var typeData = this.state.typeData;
          var typeCount = this.state.typeCounts;
          typeData.map((data,i) =>{
            typeCount.counts[i] = data.count;
            typeCount.categories[i] = data.value;
          })
          this.setState({typeCounts:{counts:typeCount.counts, categories: typeCount.categories}})
        }
        if(prevState.categoryData != this.state.categoryData){
          var categoryData = this.state.categoryData;
          var categoryCount = this.state.categoryCounts;
          categoryData.map((data,i) =>{
            categoryCount.counts[i] = data.count;
            categoryCount.categories[i] = data.value;
          })
          this.setState({categoryCounts:{counts:categoryCount.counts, categories: categoryCount.categories}})
        }
        if(prevState.timePeriodData != this.state.timePeriodData){
          var timePeriodData = this.state.timePeriodData;
          var timePeriodCount = this.state.timePeriodCounts;
          timePeriodData.map((data,i) =>{
            timePeriodCount.counts[i] = data.count;
            timePeriodCount.categories[i] = data.value;
          })
          console.log(timePeriodCount, "tp counts")
          this.setState({timePeriodCounts:{counts:timePeriodCount.counts, categories: timePeriodCount.categories}})
        }
        if(prevState.teamSizeData != this.state.teamSizeData){
          var teamSizeData = this.state.teamSizeData;
          var teamSizeCount = this.state.teamSizeCounts;
          teamSizeData.map((data,i) =>{
            teamSizeCount.counts[i] = data.count;
            teamSizeCount.categories[i] = data.name;
          })
          this.setState({teamSizeCounts:{counts:teamSizeCount.counts, categories: teamSizeCount.categories}})
        }
        if(prevState.timeSeriesData != this.state.timeSeriesData){
          var timeSeriesData = this.state.timeSeriesData;
          var timeSeriesCount = this.state.timeSeriesCounts;
          timeSeriesData.map((data,i) =>{
            timeSeriesCount.counts[i] = data.count;
            timeSeriesCount.categories[i] = data.date;
          })
          this.setState({timeSeriesCounts:{counts:timeSeriesCount.counts, categories: timeSeriesCount.categories}})
        }
        if(prevState.supportData != this.state.supportData){
          var supportData = this.state.supportData;
          var supportCount = this.state.supportCounts;
          supportData.map((data,i) =>{
            supportCount.receivedcounts[i] = data.support_received_count;
            supportCount.needcounts[i] = data.support_need_count;
            supportCount.categories[i] = data.value;
          })
          console.log(supportCount, "support count")
          this.setState({supportCounts:{receivedcounts:supportCount.receivedcounts, needcounts:supportCount.needcounts, categories: supportCount.categories}})
        }
    
  }
  render() {
    var innovationDataProps = {
      innovationData: this.props.innovations
    };
    
    return (
      <>
        <Header openInnovationFormModal={this.handleFormOpen} />
        <div
          className={
            this.state.sidebarExpanded == false
              ? "innovation-wrapper"
              : "innovation-wrapper expand-sidebar"
          }
        >
          {/* toggle class sidebar-expand for view all graph */}
          <main className="main">
            <div className="main-card">
              <MapComponent
                mapRef={this.formMapRef}
                provinceCounts={this.state.provinceCounts}
                {...innovationDataProps}
                viewDetailsClicked={this.handleViewDetailsClick}
              />
              {/* <Datasetpage /> */}
              <Sidebar />
            </div>
          </main>
          <RightSidebar provinceCounts={this.state.provinceCounts} orgCounts={this.state.orgTypeCounts} stageCounts={this.state.stageCounts} typeCounts={this.state.typeCounts} categoryCounts={this.state.categoryCounts} timePeriodCounts={this.state.timePeriodCounts} teamSizeCounts={this.state.teamSizeCounts} timeSeriesCounts={this.state.timeSeriesCounts} supportCounts={this.state.supportCounts} typeCategoryCounts={this.state.typeCategoryData} {...innovationDataProps} viewDetailsClicked={this.handleViewDetailsClick} expandRightsidebar={this.expandBar}/>

          <AddInnovationForm
            formOpen={this.state.formOpen}
            closeInnovationForm={this.closeInnovationForm}
            formMapRef={this.state.formMapRef}
            stagesData = {this.handleStage}
            typesData = {this.handletype}
            categoryData = {this.handlecategory}
            timePeriodData = {this.handleTimePeriod}
            teamSizeData = {this.handleTeamSize}
            supportData = {this.handleSupport}
            typeCategoryData = {this.handleTypeCategory}
          />

          <ViewDetailsPopup
            ViewDetailsPopupOpen={this.state.ViewDetailsPopupOpen}
            viewDetailsClicked={this.handleViewDetailsClick}
          />
          <div
            id="modalPopup"
            className={
              this.state.modalOpen == true
                ? "popup window-popup open"
                : "popup window-popup"
            }
          >
            <div className="popup-container lg-popup">
              <div className="popup-body">
                <span className="close-icon">
                  <i className="material-icons" onClick={this.closeModal}>
                    close
                  </i>
                </span>
                <div className="popup-header">
                  <h3>
                    Welcome to Covid Innovations in Nepal 2019 Mapping
                    Initiative
                  </h3>
                </div>
                <div className="popup-content">
                  <p>
                    Wide ranges of data driven innovations have been initiated
                    by various organizations to practically inform and respond
                    to damage to lives caused COVID-19. With numerous
                    initiatives on information platforms, data visualization
                    systems, robotics initiatives and others flooding in the
                    online scene, it is pertinent to keep inventory of
                    initiatives for the public consumption.
                  </p>
                  <p>
                    This initiative attempts at identifying all COVID-19 related
                    projects and initiatives in Nepal and South Asia through
                    crowd reporting/crowd mapping and making the information
                    open. By revealing details of the current project, this
                    initiative hopes to reduce redundancy as well as help to
                    collaborate with each other that again helps to utilize
                    resources effectively.
                  </p>
                </div>
                <div className="popup-footer buttons start">
                  <button
                    type="submit"
                    className="common-button is-bg"
                    onClick={this.closeModal}
                  >
                    View Innovation Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MainComponent;
