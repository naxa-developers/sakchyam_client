/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Headers from '../../Header';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import MiddleChartSection from './MiddleChartSection/MiddleChartSection';
import {
  getPartnershipInvestmentFocus,
  getProjectListData,
  getMapDataByDistrict,
  getMapDataByMunicipality,
  getFilteredMapData,
  getRadialData,
  getPartnersList,
  filterPartnerListByPartnerType,
  filterFinancialDataWithAllFilters,
  filterRadialData,
  getBarDataByBenefBudget,
  getBarDataByInvestmentFocus,
  getSankeyChartData,
  filterSankeyChartData,
  getOverviewData,
  filterOverviewData,
  filterFinancialDataWithAllFiltersAndFederal,
  getPartnershipAllData,
  resetBarDatas,
  resetRadialData,
  resetSankeyChartData,
  resetOverviewData,
  resetLeverageData,
  resetBarDataByInvestmentFocus,
  filterLeverageData,
  filterBarDataByInvestment,
} from '../../../actions/partnership.actions';

import { fetchInsuranceData } from '../../../actions/insurance.actions';
import Loading from '../../common/Loading';

class MainPartnership extends Component {
  constructor() {
    super();
    this.state = {
      insuranceData: '',
      institutionSelection: [],
      innovationSelection: [],
      productSelection: [],
      isAllInstitutionSelected: false,
      isAllInnovationSelected: false,
      isAllProductSelected: false,
      investmentFocusSelection: [],
      projectSelection: [],
      partnerSelection: [],
      projectStatus: [],
      partnerType: [],
      isAllPartnerSelected: false,
      isAllProjectSelected: false,
      isAllInvestmentFocusSelected: false,
      showBarof: 'Provinces',
      showBarofInvestmentBudgetBenef: 'investmentFocus',
      activeOverview: false,
      viewDataBy: 'allocated_beneficiary',
      mapViewDataBy: '',
      activeView: 'visualization',
      mapViewBy: 'province',
    };
  }

  componentDidMount() {
    const { viewDataBy } = this.state;
    this.props.fetchInsuranceData();
    this.props.getPartnersList();
    this.props.getProjectListData();
    this.props.getPartnershipInvestmentFocus();
    this.props.getBarDataByBenefBudget(viewDataBy);
    this.props.getBarDataByInvestmentFocus(viewDataBy);
    this.props.getSankeyChartData();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      investmentFocusSelection,
      viewDataBy,
      mapViewBy,
      partnerSelection,
      projectSelection,
      projectStatus,
      partnerType,
      mapViewDataBy,
    } = this.state;

    const { insuranceData } = this.props.insuranceReducer;

    if (
      prevState.investmentFocusSelection !== investmentFocusSelection
    ) {
      this.props.getProjectListData(investmentFocusSelection);
      this.props.filterPartnerListByPartnerType(partnerType);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isAllProjectSelected: false });
    }
    if (prevState.mapViewDataBy !== mapViewDataBy) {
      let view = 'investment';
      if (this.props.mapViewDataBy === 'allocated_beneficiary') {
        view = 'total_beneficiary';
      } else if (this.props.mapViewDataBy === 'allocated_budget') {
        view = 'total_beneficiary';
      }
    }
    if (prevState.mapViewBy !== mapViewBy) {
      let view = 'investment';
      if (this.props.mapViewDataBy === 'allocated_beneficiary') {
        view = 'total_beneficiary';
      } else if (this.props.mapViewDataBy === 'allocated_budget') {
        view = 'total_beneficiary';
      }
    }
    if (prevState.viewDataBy !== viewDataBy) {
      if (viewDataBy !== 'Leverage') {
        this.props.getSankeyChartData(viewDataBy);
        this.props.filterRadialData(
          viewDataBy,
          investmentFocusSelection,
          projectSelection,
          partnerType,
          partnerSelection,
          projectStatus,
        );
      }
    }
    if (prevState.partnerType !== partnerType) {
      this.props.filterPartnerListByPartnerType(partnerType);
    }

    if (prevProps.insuranceReducer.insuranceData !== insuranceData) {
      this.setState({ insuranceData: insuranceData.data });
    }
  }

  setActiveOverview = () => {
    this.setState(prevState => ({
      activeOverview: !prevState.activeOverview,
    }));
  };

  handleShowBarOf = value => {
    this.setState({ showBarof: value });
  };

  handleShowBarOfInvestmentBudgetBenefBar = value => {
    this.setState({ showBarofInvestmentBudgetBenef: value });
  };

  handleInvestmentParentCheckbox = e => {
    const {
      investmentFocusSelection,
      isAllInvestmentFocusSelected,
    } = this.state;
    if (isAllInvestmentFocusSelected) {
      const allInvestmentElement = document.getElementsByClassName(
        'investment_checkbox',
      );

      for (let i = 0; i < allInvestmentElement.length; i += 1) {
        allInvestmentElement[i].checked = false;
      }
      this.setState({
        investmentFocusSelection: [],
        isAllInvestmentFocusSelected: false,
      });
    } else {
      this.setState({
        isAllInvestmentFocusSelected: true,
      });
      if (e.target.checked === true) {
        const allInvestmentElement = document.getElementsByClassName(
          'investment_checkbox',
        );
        const selectedInvestment = investmentFocusSelection;
        for (let i = 0; i < allInvestmentElement.length; i += 1) {
          allInvestmentElement[i].checked = true;
          selectedInvestment.push(allInvestmentElement[i].name);
        }
        this.setState({
          investmentFocusSelection: selectedInvestment,
        });
      }
    }
  };

  handleInstitutionParentCheckbox = e => {
    // e.stopPropagation();
    const {
      institutionSelection,
      isAllInstitutionSelected,
    } = this.state;

    if (isAllInstitutionSelected) {
      console.log('if case should be false');
      const allInvestmentElement = document.getElementsByClassName(
        'investment_checkbox',
      );

      for (let i = 0; i < allInvestmentElement.length; i += 1) {
        allInvestmentElement[i].checked = false;
      }
      this.setState({
        institutionSelection: [],
        isAllInstitutionSelected: false,
      });
    } else {
      console.log('else case should be true');
      this.setState({
        isAllInstitutionSelected: true,
      });
      if (e.target.checked === true) {
        const allInvestmentElement = document.getElementsByClassName(
          'investment_checkbox',
        );
        const selectedInstitution = institutionSelection;
        for (let i = 0; i < allInvestmentElement.length; i += 1) {
          allInvestmentElement[i].checked = true;
          selectedInstitution.push(allInvestmentElement[i].name);
        }
        this.setState({
          institutionSelection: selectedInstitution,
        });
      }
    }
  };

  handelInnovationParentCheckbox = e => {
    const {
      innovationSelection,
      isAllInnovationSelected,
    } = this.state;

    if (isAllInnovationSelected) {
      console.log('if case should be false');
      const allInvestmentElement = document.getElementsByClassName(
        'project_checkbox',
      );

      for (let i = 0; i < allInvestmentElement.length; i += 1) {
        allInvestmentElement[i].checked = false;
      }
      this.setState({
        innovationSelection: [],
        isAllInnovationSelected: false,
      });
    } else {
      console.log('else case should be true');
      this.setState({
        isAllInnovationSelected: true,
      });
      if (e.target.checked === true) {
        const allInvestmentElement = document.getElementsByClassName(
          'project_checkbox',
        );
        const selectedInstitution = innovationSelection;
        for (let i = 0; i < allInvestmentElement.length; i += 1) {
          allInvestmentElement[i].checked = true;
          selectedInstitution.push(allInvestmentElement[i].name);
        }
        this.setState({
          innovationSelection: selectedInstitution,
        });
      }
    }
  };

  handelProductParentCheckbox = e => {
    const { productSelection, isAllProductSelected } = this.state;

    if (isAllProductSelected) {
      console.log('if case should be false');
      const allInvestmentElement = document.getElementsByClassName(
        'product_checkbox',
      );

      for (let i = 0; i < allInvestmentElement.length; i += 1) {
        allInvestmentElement[i].checked = false;
      }
      this.setState({
        productSelection: [],
        isAllProductSelected: false,
      });
    } else {
      console.log('else case should be true');
      this.setState({
        isAllProductSelected: true,
      });
      if (e.target.checked === true) {
        const allInvestmentElement = document.getElementsByClassName(
          'product_checkbox',
        );
        const selectedInstitution = productSelection;
        for (let i = 0; i < allInvestmentElement.length; i += 1) {
          allInvestmentElement[i].checked = true;
          selectedInstitution.push(allInvestmentElement[i].name);
        }
        this.setState({
          productSelection: selectedInstitution,
        });
      }
    }
  };

  handleInvestmentFocusCheckbox = e => {
    const {
      state: { investmentFocusSelection },
    } = this;
    const {
      target: { name, checked, value },
    } = e;
    console.log(value);
    this.setState(preState => {
      if (checked) {
        return {
          investmentFocusSelection: [
            ...preState.investmentFocusSelection,
            name,
          ],
          projectSelection: [],
        };
      }
      if (!checked) {
        const newArr = investmentFocusSelection.filter(
          daily => daily !== name,
        );
        return {
          investmentFocusSelection: newArr,
          projectSelection: [],
        };
      }
      return null;
    });
  };

  handleInstitutionCheckbox = e => {
    const {
      state: { institutionSelection },
    } = this;
    const {
      target: { name, checked, value },
    } = e;
    // console.log(value);
    this.setState(preState => {
      if (checked) {
        return {
          institutionSelection: [
            ...preState.institutionSelection,
            name,
          ],
        };
      }
      if (!checked) {
        const newArr = institutionSelection.filter(
          daily => daily !== name,
        );
        return {
          institutionSelection: newArr,
        };
      }
      return null;
    });
  };

  handelInnovationCheckbox = e => {
    const {
      state: { innovationSelection },
    } = this;
    const {
      target: { name, checked, value },
    } = e;
    this.setState(preState => {
      if (checked) {
        return {
          innovationSelection: [
            ...preState.innovationSelection,
            name,
          ],
        };
      }
      if (!checked) {
        const newArr = innovationSelection.filter(
          daily => daily !== name,
        );
        return {
          innovationSelection: newArr,
        };
      }
      return null;
    });
  };

  handelProductCheckbox = e => {
    const {
      state: { productSelection },
    } = this;
    const {
      target: { name, checked, value },
    } = e;
    this.setState(preState => {
      if (checked) {
        return {
          productSelection: [...preState.productSelection, name],
        };
      }
      if (!checked) {
        const newArr = productSelection.filter(
          daily => daily !== name,
        );
        return {
          productSelection: newArr,
        };
      }
      return null;
    });
  };

  handleProjectParentCheckbox = e => {
    // e.stopPropagation();
    const { projectSelection, isAllProjectSelected } = this.state;
    if (isAllProjectSelected) {
      const allProjectElement = document.getElementsByClassName(
        'project_checkbox',
      );

      for (let i = 0; i < allProjectElement.length; i += 1) {
        allProjectElement[i].checked = false;
      }
      this.setState({
        projectSelection: [],
        isAllProjectSelected: false,
      });
    } else {
      this.setState({
        isAllProjectSelected: true,
      });
      if (e.target.checked === true) {
        const allProjectElement = document.getElementsByClassName(
          'project_checkbox',
        );
        const selectedProject = projectSelection;
        for (let i = 0; i < allProjectElement.length; i += 1) {
          allProjectElement[i].checked = true;
          selectedProject.push(
            parseInt(allProjectElement[i].name, 10),
          );
        }
        this.setState({
          projectSelection: selectedProject,
        });
        // this.setState({
        //   checkedProgressItems: joined,
        // });
      }
    }
  };

  handleProjectSelectionCheckbox = e => {
    const {
      state: { projectSelection, isAllPartnerSelected },
    } = this;
    const {
      target: { name, checked },
    } = e;

    this.setState(preState => {
      if (checked) {
        return {
          projectSelection: [
            ...preState.projectSelection,
            parseInt(name, 10),
          ],
        };
      }
      if (!checked) {
        const newArr = projectSelection.filter(
          projectselected => projectselected !== parseInt(name, 10),
        );
        return { projectSelection: newArr };
      }
      return null;
    });
  };

  handlePartnerParentCheckbox = e => {
    // e.stopPropagation();
    const { partnerSelection, isAllPartnerSelected } = this.state;
    if (isAllPartnerSelected) {
      const allPartnerElement = document.getElementsByClassName(
        'partner_checkbox',
      );

      for (let i = 0; i < allPartnerElement.length; i += 1) {
        allPartnerElement[i].checked = false;
      }
      this.setState({
        partnerSelection: [],
        isAllPartnerSelected: false,
      });
    } else {
      this.setState({
        isAllPartnerSelected: true,
      });
      if (e.target.checked === true) {
        const allPartnerElement = document.getElementsByClassName(
          'partner_checkbox',
        );
        const selectedPartner = partnerSelection;
        for (let i = 0; i < allPartnerElement.length; i += 1) {
          allPartnerElement[i].checked = true;
          selectedPartner.push(
            parseInt(allPartnerElement[i].name, 10),
          );
        }
        this.setState({
          partnerSelection: selectedPartner,
        });
        // this.setState({
        //   checkedProgressItems: joined,
        // });
      }
    }
  };

  handleProjectStatus = clickedValue => {
    const { projectStatus } = this.state;
    if (projectStatus.includes(clickedValue)) {
      const filteredData = projectStatus.filter(
        data => data !== clickedValue,
      );
      this.setState({ projectStatus: filteredData });
    } else {
      const addedPartnerType = projectStatus.concat(clickedValue);
      this.setState({ projectStatus: addedPartnerType });
    }
  };

  handlePartnerType = clickedValue => {
    const { partnerType } = this.state;
    if (partnerType.includes(clickedValue)) {
      const filteredData = partnerType.filter(
        data => data !== clickedValue,
      );
      this.setState({ partnerType: filteredData });
    } else {
      const addedPartnerType = partnerType.concat(clickedValue);
      this.setState({ partnerType: addedPartnerType });
    }
  };

  applyBtnClick = () => {
    const {
      viewDataBy,
      partnerSelection,
      projectSelection,
      projectStatus,
      investmentFocusSelection,
      partnerType,
      activeView,
      selectedMunicipality,
      selectedDistrict,
      selectedProvince,
    } = this.state;
    if (activeView === 'visualization') {
      this.handleShowBarOf('Provinces');
      this.handleShowBarOfInvestmentBudgetBenefBar('investmentFocus');

      this.props.filterOverviewData(
        investmentFocusSelection,
        projectSelection,
        partnerType,
        partnerSelection,
      );
      this.props.filterFinancialDataWithAllFiltersAndFederal(
        { selectedMunicipality, selectedDistrict, selectedProvince },
        investmentFocusSelection,
        viewDataBy,
        partnerType,
        partnerSelection,
        projectSelection,
        projectStatus,
      );

      this.props.filterBarDataByInvestment(
        'province',
        viewDataBy,
        partnerType,
        partnerSelection,
        projectSelection,
        projectStatus,
        investmentFocusSelection,
      );
      this.props.filterRadialData(
        viewDataBy,
        investmentFocusSelection,
        projectSelection,
        partnerType,
        partnerSelection,
        projectStatus,
      );

      this.props.filterSankeyChartData(
        viewDataBy,
        investmentFocusSelection,
        projectSelection,
        partnerType,
        partnerSelection,
        projectStatus,
      );
      this.props.filterLeverageData(
        investmentFocusSelection,
        projectSelection,
      );
    }
  };

  // eslint-disable-next-line consistent-return

  resetLeftSideBarSelection = () => {
    this.setState({
      investmentFocusSelection: [],
      partnerSelection: [],
      projectSelection: [],
      partnerType: [],
    });
  };

  resetFilters = () => {
    const { mapViewBy, activeView } = this.state;
    this.resetLeftSideBarSelection();
    this.setState({
      partnerType: [],
    });
    if (activeView === 'visualization') {
      this.props.resetSankeyChartData();
      this.props.resetOverviewData();
      this.props.resetLeverageData();
      this.props.resetBarDatas();
      this.props.resetBarDataByInvestmentFocus();
    }
  };

  render() {
    const {
      state: {
        activeOverview,
        viewDataBy,
        mapViewDataBy,
        activeView,
        investmentFocusSelection,
        institutionSelection,
        innovationSelection,
        isAllInnovationSelected,
        isAllProductSelected,
        isAllInstitutionSelected,
        productSelection,
        projectSelection,
        projectStatus,
        partnerSelection,
        partnerType,
        showBarof,
        showBarofInvestmentBudgetBenef,
        insuranceData,
      },
    } = this;
    const { isDataFetched } = this.props.partnershipReducer;
    const sankeyChartwidth =
      document.getElementById('sankeyChart') &&
      document.getElementById('sankeyChart').offsetWidth;

    console.log('is all partner selecte', isAllInstitutionSelected);

    return (
      <>
        <Headers />
        <div
          className={`automation-wrapper literacy-wrapper ${
            activeOverview ? 'expand-right-sidebar' : ''
          }`}
        >
          <LeftSideBar
            insuranceData={insuranceData}
            institutionSelection={institutionSelection}
            innovationSelection={innovationSelection}
            productSelection={productSelection}
            isAllInnovationSelected={isAllInnovationSelected}
            isAllProductSelected={isAllProductSelected}
            isAllInstitutionSelected={isAllInstitutionSelected}
            handleInstitutionCheckbox={this.handleInstitutionCheckbox}
            handelInnovationCheckbox={this.handelInnovationCheckbox}
            handelProductCheckbox={this.handelProductCheckbox}
            handleInstitutionParentCheckbox={
              this.handleInstitutionParentCheckbox
            }
            ha
            handelProductParentCheckbox={
              this.handelProductParentCheckbox
            }
            handelInnovationParentCheckbox={
              this.handelInnovationParentCheckbox
            }
            resetFilters={this.resetFilters}
            applyBtnClick={this.applyBtnClick}
          />
          <main className="main">
            <div className="main-card literacy-main-card">
              {/* <Loading
                loaderState={!isDataFetched}
                top="50%"
                left="46%"
              /> */}

              <div className="literacy-tab-content">
                <MiddleChartSection
                  resetLeftSideBarSelection={
                    this.resetLeftSideBarSelection
                  }
                  groupedStackData={[
                    {
                      investmentFocusSelection,
                      viewDataBy,
                      partnerType,
                      partnerSelection,
                      projectSelection,
                      projectStatus,
                    },
                  ]}
                  resetFilters={this.resetFilters}
                  viewDataBy={viewDataBy}
                  mapViewDataBy={mapViewDataBy}
                  sankeyChartwidth={sankeyChartwidth}
                  activeOverview={activeOverview}
                  activeView={activeView}
                  investmentFocusSelection={investmentFocusSelection}
                  partnerSelection={partnerSelection}
                  partnerTypeSelection={partnerType}
                  projectSelection={projectSelection}
                  projectStatus={projectStatus}
                  showBarof={showBarof}
                  handleShowBarOf={this.handleShowBarOf}
                  showBarofInvestmentBudgetBenef={
                    showBarofInvestmentBudgetBenef
                  }
                  handleShowBarOfInvestmentBudgetBenefBar={
                    this.handleShowBarOfInvestmentBudgetBenefBar
                  }
                  applyBtnClick={this.applyBtnClick}
                />
              </div>
            </div>
          </main>
          <div className="popup" id="graph-modal">
            <div className="popup-container lg-popup">
              <div className="popup-body">
                <span className="close-icon">
                  <i className="material-icons">close</i>
                </span>
                <div className="popup-header no-flex">
                  <h3>modal header</h3>
                </div>
                <div className="popup-content" />
                <div className="popup-footer buttons is-end">
                  <button
                    type="button"
                    className="common-button is-border"
                  >
                    <span>cancel</span>
                  </button>
                  <button
                    type="button"
                    className="common-button is-bg"
                  >
                    <span>save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <RightSideBar
            activeOverview={activeOverview}
            setActiveOverview={this.setActiveOverview}
            insuranceData={insuranceData}
          />
        </div>
      </>
    );
  }
}
const mapStateToProps = ({
  partnershipReducer,
  insuranceReducer,
}) => ({
  partnershipReducer,
  insuranceReducer,
});
export default connect(mapStateToProps, {
  fetchInsuranceData,
  getPartnershipInvestmentFocus,
  getProjectListData,
  getMapDataByDistrict,
  getMapDataByMunicipality,
  getFilteredMapData,
  getRadialData,
  getPartnersList,
  filterPartnerListByPartnerType,
  filterFinancialDataWithAllFilters,
  filterRadialData,
  getBarDataByBenefBudget,
  getSankeyChartData,
  filterSankeyChartData,
  getOverviewData,
  filterOverviewData,
  filterFinancialDataWithAllFiltersAndFederal,
  getPartnershipAllData,
  resetBarDatas,
  resetRadialData,
  resetSankeyChartData,
  resetOverviewData,
  resetLeverageData,
  filterLeverageData,
  getBarDataByInvestmentFocus,
  filterBarDataByInvestment,
  resetBarDataByInvestmentFocus,
})(MainPartnership);
