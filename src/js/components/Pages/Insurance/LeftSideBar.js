/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckBox from '../../common/Checkbox';
import { removeDuplicates } from '../../common/utilFunctions';

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partnerList: '',
      innovationList: '',
      productList: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { insuranceData } = this.props.insuranceReducer;

    if (prevProps.insuranceReducer.insuranceData !== insuranceData) {
      const parList = insuranceData.data.map(item => ({
        id: item.id,
        partner_name: item.partner_name,
      }));
      const partnerList = removeDuplicates(parList, 'partner_name');

      const innList = insuranceData.data.map(item => ({
        id: item.id,
        innovation: item.innovation,
      }));
      const innovationList = removeDuplicates(innList, 'innovation');

      const proList = insuranceData.data.map(item => ({
        id: item.id,
        product: item.product,
      }));
      const productList = removeDuplicates(proList, 'product');
      this.setState({ partnerList, innovationList, productList });
    }
  }

  render() {
    const {
      props: {
        institutionSelection,
        innovationSelection,
        productSelection,
        isAllInnovationSelected,
        isAllProductSelected,
        isAllInstitutionSelected,
        handleInstitutionCheckbox,
        handelInnovationCheckbox,
        handelProductCheckbox,
        handelProductParentCheckbox,
        handleInstitutionParentCheckbox,
        handelInnovationParentCheckbox,
        applyBtnClick,
        resetFilters,
      },
      state: { partnerList, innovationList, productList },
    } = this;
    return (
      <aside className="sidebar left-sidebar literacy-sidebar">
        <div className="sidebar-in">
          <div className="aside-header ">
            <button
              type="button"
              className="common-button is-bg partnership-button"
            >
              Insurance
            </button>
          </div>
          <div className="aside-body apply-body">
            <div className="sidebar-widget partner-institue">
              <h6 className="title">Partner Institutions</h6>
              <div className="widget-body">
                <div className="checklist-group">
                  <div className="checklist-header">
                    <div className="custom-checkbox">
                      <input
                        id="Initiative1"
                        type="checkbox"
                        name="Initiative1"
                        value="all"
                        checked={isAllInstitutionSelected}
                        onChange={handleInstitutionParentCheckbox}
                      />
                      <label htmlFor="Initiative1">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    {partnerList &&
                      partnerList.map(partner => {
                        return (
                          <CheckBox
                            id={partner.id}
                            className="investment_checkbox"
                            key={partner.id}
                            label={partner.partner_name}
                            name={partner.partner_name}
                            changeHandler={handleInstitutionCheckbox}
                            checked={institutionSelection.includes(
                              partner.partner_name,
                            )}
                          />
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>

            <div
              className="sidebar-widget partner-institue"
              style={{ paddingTop: '2vh' }}
            >
              <h6 className="title">Innovation</h6>
              <div className="widget-body">
                <div className="checklist-group">
                  <div className="checklist-header">
                    <div className="custom-checkbox">
                      <input
                        id="Initiative7"
                        type="checkbox"
                        name="Initiative7"
                        onChange={handelInnovationParentCheckbox}
                        checked={isAllInnovationSelected}
                      />
                      <label htmlFor="Initiative7">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    {innovationList &&
                      innovationList.map(inn => {
                        return (
                          <CheckBox
                            id={inn.id}
                            className="project_checkbox"
                            key={inn.id}
                            label={inn.innovation}
                            name={inn.innovation}
                            changeHandler={handelInnovationCheckbox}
                            checked={innovationSelection.includes(
                              inn.innovation,
                            )}
                          />
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>

            <div
              className="sidebar-widget partner-institue"
              style={{ paddingTop: '2vh' }}
            >
              <h6 className="title">Products</h6>
              <div className="widget-body">
                <div className="checklist-group">
                  <div className="checklist-header">
                    <div className="custom-checkbox">
                      <input
                        id="Initiative14"
                        type="checkbox"
                        name="Initiative14"
                        onChange={handelProductParentCheckbox}
                        checked={isAllProductSelected}
                      />
                      <label htmlFor="Initiative14">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    {productList &&
                      productList.map(pro => {
                        return (
                          <CheckBox
                            id={pro.id}
                            className="product_checkbox"
                            key={pro.id}
                            label={pro.product}
                            name={pro.product}
                            changeHandler={handelProductCheckbox}
                            checked={productSelection.includes(
                              pro.product,
                            )}
                          />
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="apply-buttons buttons end">
              <button
                type="button"
                onClick={resetFilters}
                className="common-button is-clear "
              >
                reset
              </button>
              <button
                onClick={applyBtnClick}
                type="button"
                className="common-button is-bg"
              >
                apply
              </button>
            </div>
          </div>
        </div>
      </aside>
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
export default connect(mapStateToProps, {})(LeftSideBar);
