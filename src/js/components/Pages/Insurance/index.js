/* eslint-disable array-callback-return */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Headers from '../../Header';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import MiddleChartSection from './MiddleChartSection/MiddleChartSection';

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
      isAllInvestmentFocusSelected: false,
      activeOverview: false,
    };
  }

  componentDidMount() {
    this.props.fetchInsuranceData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { insuranceData } = this.props.insuranceReducer;

    if (prevProps.insuranceReducer.insuranceData !== insuranceData) {
      this.setState({ insuranceData: insuranceData.data });
    }
  }

  setActiveOverview = () => {
    this.setState(prevState => ({
      activeOverview: !prevState.activeOverview,
    }));
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
      // console.log('if case should be false');
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
      // console.log('else case should be true');
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
      // console.log('if case should be false');
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
      // console.log('else case should be true');
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
      // console.log('if case should be false');
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
      // console.log('else case should be true');
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
    // console.log(value);
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

  resetLeftFilters = () => {
    this.setState({
      institutionSelection: [],
      innovationSelection: [],
      productSelection: [],
      isAllInstitutionSelected: false,
      isAllInnovationSelected: false,
      isAllProductSelected: false,
      insuranceData: this.props.insuranceReducer.insuranceData.data,
    });
  };

  handelApplyFilters = () => {
    const {
      institutionSelection,
      innovationSelection,
      productSelection,
    } = this.state;

    let filteredData = [];
    const insuranceData = this.props.insuranceReducer.insuranceData
      .data;

    if (
      institutionSelection.length === 0 &&
      innovationSelection.length === 0 &&
      productSelection.length === 0
    ) {
      filteredData = insuranceData;
    }

    if (institutionSelection.length > 0) {
      const value =
        filteredData.length > 0 ? filteredData : insuranceData;
      filteredData = [];
      institutionSelection.map(type => {
        value.map(data => {
          if (type === data.partner_name) {
            filteredData.push(data);
          }
        });
      });
    }

    if (innovationSelection.length > 0) {
      const value =
        filteredData.length > 0 ? filteredData : insuranceData;
      filteredData = [];
      innovationSelection.map(type => {
        value.map(data => {
          if (type === data.innovation) {
            filteredData.push(data);
          }
        });
      });
    }

    if (productSelection.length > 0) {
      const value =
        filteredData.length > 0 ? filteredData : insuranceData;
      filteredData = [];
      productSelection.map(type => {
        value.map(data => {
          if (type === data.product) {
            filteredData.push(data);
          }
        });
      });
    }

    this.setState({
      insuranceData: filteredData,
    });
  };

  render() {
    const {
      state: {
        activeOverview,
        institutionSelection,
        innovationSelection,
        isAllInnovationSelected,
        isAllProductSelected,
        isAllInstitutionSelected,
        productSelection,
        insuranceData,
      },
    } = this;

    return (
      <>
        {/* <Headers /> */}
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
            resetFilters={this.resetLeftFilters}
            applyBtnClick={this.handelApplyFilters}
          />
          <main className="main">
            <div className="main-card literacy-main-card product-process-custom">
              {/* <Loading
                loaderState={!isDataFetched}
                top="50%"
                left="46%"
              /> */}

              <div className="literacy-tab-content">
                <MiddleChartSection
                  insuranceData={insuranceData}
                  activeOverview={activeOverview}
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
const mapStateToProps = ({ insuranceReducer }) => ({
  insuranceReducer,
});
export default connect(mapStateToProps, {
  fetchInsuranceData,
})(MainPartnership);
