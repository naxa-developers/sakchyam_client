/* eslint-disable lines-between-class-members */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckBox from '../../../common/Checkbox';

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      innovationArea,
      productCategory,
      productName,
      partnerType,
      partnerName,
      marketFailure,

      handleInnovationAreaParentCheckbox,
      handleInnovationAreaCheckbox,
      innovationAreaSelection,
      handleProductCategoryParentCheckbox,
      handleProductCategoryCheckbox,
      productCategorySelection,
      handleProductNameParentCheckbox,
      handleProductNameCheckbox,
      productNameSelection,
      handlePartnerNameParentCheckbox,
      handlePartnerNameCheckbox,
      partnerNameSelection,
      handleMarketFailureParentCheckbox,
      handleMarketFailureCheckbox,
      marketFailureSelection,
      handlePartnerType,
      partnerTypeSelection,

      resetClick,
      applyClick,
    } = this.props;

    return (
      <aside className="sidebar left-sidebar literacy-sidebar">
        <div className="sidebar-in">
          <div className="aside-header">
            <button type="button" className="common-button is-bg">
              Product/Process Innovations
            </button>
          </div>
          <div className="aside-body apply-body">
            <div className="sidebar-widget partner-institue">
              <h6 className="title">Innovation Area</h6>
              <div className="widget-body">
                <div className="checklist-group">
                  <div className="checklist-header">
                    <div className="custom-checkbox">
                      <input
                        id="innovation_area"
                        type="checkbox"
                        name="InnovationArea"
                        value="all"
                        onChange={handleInnovationAreaParentCheckbox}
                      />
                      <label htmlFor="innovation_area">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    {innovationArea &&
                      innovationArea.map(item => {
                        return (
                          <CheckBox
                            id={`${item.id}innovation`}
                            className="innovationarea_checkbox"
                            key={item.id}
                            label={item.name}
                            name={item.name}
                            changeHandler={
                              handleInnovationAreaCheckbox
                            }
                            checked={innovationAreaSelection.includes(
                              item.name,
                            )}
                          />
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="sidebar-widget partner-institue">
              <h6 className="title">Product Category</h6>
              <div className="widget-body">
                <div className="checklist-group">
                  <div className="checklist-header">
                    <div className="custom-checkbox">
                      <input
                        id="product_category"
                        type="checkbox"
                        name="product_category"
                        value="all"
                        onChange={handleProductCategoryParentCheckbox}
                      />
                      <label htmlFor="product_category">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    {productCategory &&
                      productCategory.map(item => {
                        return (
                          <CheckBox
                            id={`${item.id}productCat`}
                            className="productcategory_checkbox"
                            key={item.id}
                            label={item.name}
                            name={item.name}
                            changeHandler={
                              handleProductCategoryCheckbox
                            }
                            checked={productCategorySelection.includes(
                              item.name,
                            )}
                          />
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="sidebar-widget partner-institue">
              <h6 className="title">Product Name</h6>
              <div className="widget-body">
                <div className="checklist-group">
                  <div className="checklist-header">
                    <div className="custom-checkbox">
                      <input
                        id="product_name"
                        type="checkbox"
                        name="ProductName"
                        value="all"
                        onChange={handleProductNameParentCheckbox}
                      />
                      <label htmlFor="product_name">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    {productName &&
                      productName.map(item => {
                        return (
                          <CheckBox
                            id={`${item.id}productNam`}
                            className="productname_checkbox"
                            key={item.id}
                            label={item.name}
                            name={item.name}
                            changeHandler={handleProductNameCheckbox}
                            checked={productNameSelection.includes(
                              item.name,
                            )}
                          />
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="sidebar-widget">
              <h6 className="title">Partner Type</h6>
              <div className="widget-body">
                <div className="widget-tag partner-tag">
                  {partnerType &&
                    partnerType.map(item => {
                      return (
                        <a
                          key={item.id}
                          onClick={() => {
                            handlePartnerType(`${item.name}`);
                          }}
                          onKeyDown={() => {
                            handlePartnerType(`${item.name}`);
                          }}
                          className={
                            partnerTypeSelection.includes(
                              `${item.name}`,
                            )
                              ? 'active'
                              : ''
                          }
                          role="tab"
                          tabIndex="0"
                        >
                          <span>{item.name}</span>
                        </a>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="sidebar-widget partner-institue">
              <h6 className="title">Partner Institution</h6>
              <div className="widget-body">
                <div className="checklist-group">
                  <div className="checklist-header">
                    <div className="custom-checkbox">
                      <input
                        id="partner_name"
                        type="checkbox"
                        name="PartnerName"
                        value="all"
                        onChange={handlePartnerNameParentCheckbox}
                      />
                      <label htmlFor="partner_name">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    {partnerName &&
                      partnerName.map(item => {
                        return (
                          <CheckBox
                            id={`${item.id}partner`}
                            className="partnername_checkbox"
                            key={item.id}
                            label={item.name}
                            name={item.name}
                            changeHandler={handlePartnerNameCheckbox}
                            checked={partnerNameSelection.includes(
                              item.name,
                            )}
                          />
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="sidebar-widget partner-institue">
              <h6 className="title">Market Failures</h6>
              <div className="widget-body">
                <div className="checklist-group">
                  <div className="checklist-header">
                    <div className="custom-checkbox">
                      <input
                        id="market_failure"
                        type="checkbox"
                        name="MarketFailure"
                        value="all"
                        onChange={handleMarketFailureParentCheckbox}
                      />
                      <label htmlFor="market_failure">All</label>
                    </div>
                  </div>
                  <ul className="checkbox-list">
                    {marketFailure &&
                      marketFailure.map(item => {
                        return (
                          <CheckBox
                            id={`${item.id}market`}
                            className="marketfailure_checkbox"
                            key={item.id}
                            label={item.name}
                            name={item.name}
                            changeHandler={
                              handleMarketFailureCheckbox
                            }
                            checked={marketFailureSelection.includes(
                              item.name,
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
                onClick={resetClick}
                type="button"
                className="common-button is-clear "
              >
                reset
              </button>
              <button
                onClick={applyClick}
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

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(LeftSideBar);
