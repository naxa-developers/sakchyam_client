/* eslint-disable radix */
/* eslint-disable consistent-return */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeftSideAutomationLoader from '../Loader';
import { ResponsiveListLoader } from '../../../common/Loaders';
import {
  getCodes,
  removeDuplicates,
} from '../../../common/utilFunctions';

function getClassName(i) {
  if (i % 12 === 0) return 'is-color1';
  if (i % 12 === 1) return 'is-color2';
  if (i % 12 === 2) return 'is-color3';
  if (i % 12 === 3) return 'is-color4';
  if (i % 12 === 4) return 'is-color5';
  if (i % 12 === 5) return 'is-color6';
  if (i % 12 === 6) return 'is-color7';
  if (i % 12 === 7) return 'is-color8';
  if (i % 12 === 8) return 'is-color9';
  if (i % 12 === 9) return 'is-color10';
  if (i % 12 === 10) return 'is-color11';
  if (i % 12 === 11) return 'is-color12';
  if (i % 12 === 12) return 'is-color13';
  if (i % 12 === 13) return 'is-color14';
  return 'is-green';
}

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partnerList: '',
      dataLoading: true,
      count: 0,
      finalList: '',
      partnersByDivision: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      automationReducer,
      searchText,
      selectedProvince,
      selectedDistrict,
      selectedMunicipality,
      automationReducer: { automationTableData },
    } = this.props;
    const { count, finalList, partnersByDivision } = this.state;

    if (
      automationTableData !==
      prevProps.automationReducer.automationTableData
    ) {
      if (selectedProvince.length > 0) {
        const codes = getCodes(selectedProvince);
        const filteredList = [];
        const partnerList = [];

        codes.forEach(province => {
          automationTableData.forEach(partner => {
            if (
              parseInt(province) === parseInt(partner.province_code)
            ) {
              filteredList.push(partner);
            }
          });
        });

        const uniquePartners = removeDuplicates(
          filteredList,
          'partner_id',
        );

        uniquePartners.forEach(parts => {
          finalList.forEach(fParts => {
            if (
              parseInt(parts.partner_id) ===
              parseInt(fParts.partner_id)
            ) {
              partnerList.push(fParts);
            }
          });
        });

        this.setState({
          partnerList,
          partnersByDivision: partnerList,
        });

        // console.log('automation tablet data', automationTableData);
      }

      if (selectedDistrict.length > 0) {
        const codes = getCodes(selectedDistrict);
        const filteredList = [];
        const partnerList = [];

        codes.forEach(province => {
          automationTableData.forEach(partner => {
            if (
              parseInt(province) === parseInt(partner.district_code)
            ) {
              filteredList.push(partner);
            }
          });
        });

        const uniquePartners = removeDuplicates(
          filteredList,
          'partner_id',
        );

        uniquePartners.forEach(parts => {
          finalList.forEach(fParts => {
            if (
              parseInt(parts.partner_id) ===
              parseInt(fParts.partner_id)
            ) {
              partnerList.push(fParts);
            }
          });
        });

        this.setState({
          partnerList,
          partnersByDivision: partnerList,
        });
      }

      if (selectedMunicipality.length > 0) {
        const codes = getCodes(selectedMunicipality);
        const filteredList = [];
        const partnerList = [];

        codes.forEach(province => {
          automationTableData.forEach(partner => {
            if (
              parseInt(province) ===
              parseInt(partner.municipality_code)
            ) {
              filteredList.push(partner);
            }
          });
        });

        const uniquePartners = removeDuplicates(
          filteredList,
          'partner_id',
        );

        uniquePartners.forEach(parts => {
          finalList.forEach(fParts => {
            if (
              parseInt(parts.partner_id) ===
              parseInt(fParts.partner_id)
            ) {
              partnerList.push(fParts);
            }
          });
        });

        this.setState({
          partnerList,
          partnersByDivision: partnerList,
        });
      }

      if (
        selectedDistrict.length === 0 &&
        selectedMunicipality.length === 0 &&
        selectedProvince.length === 0
      ) {
        this.setState({
          partnerList: finalList,
          partnersByDivision: '',
        });
      }
    }

    if (
      automationReducer.automationRightSidePartnerData !==
      prevProps.automationReducer.automationRightSidePartnerData
    ) {
      if (count === 0) {
        this.setState({
          partnerList:
            automationReducer.automationRightSidePartnerData[0]
              .partner_data,
          dataLoading: false,
          count: 1,
          finalList:
            automationReducer.automationRightSidePartnerData[0]
              .partner_data,
        });
      }
    }

    if (prevProps.searchText !== searchText) {
      if (searchText.length === 0) {
        this.setState({
          partnerList: finalList,
        });
      } else {
        const list =
          partnersByDivision.length > 0
            ? partnersByDivision
            : finalList;
        const tempArray = list.filter(partner =>
          partner.partner_name
            .toUpperCase()
            .includes(searchText.toUpperCase()),
        );
        this.setState({
          partnerList: tempArray,
        });
      }
    }
  }

  render() {
    const { partnerList, dataLoading } = this.state;

    const {
      activeClickPartners,
      handleActiveClickPartners,
      activeOutreachButton,
      toggleOutreachButton,
      refreshSelectedPartnerBtn,
      handleSearchTextChange,
      activeTableView,
      searchText,
    } = this.props;

    console.log('partners list', partnerList);

    return (
      <aside className="sidebar left-sidebar">
        <div className="sidebar-in">
          <div className="aside-header">
            <button type="button" className="common-button is-bg">
              Automation (Tablet Banking)
            </button>
            <div className="search-bar">
              <div className="search-wrap">
                <span className="search-icon">
                  <i className="material-icons">search</i>
                </span>
                <input
                  type="search"
                  value={searchText}
                  onChange={e => {
                    handleSearchTextChange(e);
                  }}
                  className="form-control"
                  placeholder="search"
                />
              </div>
              <div
                style={
                  activeTableView
                    ? { display: 'none' }
                    : { display: 'block' }
                }
                className="inline-group"
              >
                <b>Coverage</b>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={activeOutreachButton}
                    onClick={toggleOutreachButton}
                  />
                  <span className="slider" />
                </label>
              </div>
            </div>
            <div className="select-org">
              <b className="counter">
                <span>{activeClickPartners.length}</span>
                items selected
              </b>
              <span>
                <i
                  role="button"
                  tabIndex="0"
                  onClick={refreshSelectedPartnerBtn}
                  onKeyDown={refreshSelectedPartnerBtn}
                  className="material-icons"
                >
                  refresh
                </i>
              </span>
            </div>
          </div>
          <div className="aside-body">
            {dataLoading ? (
              <>
                <LeftSideAutomationLoader />
              </>
            ) : (
              <ul className="table-ranking-list">
                {partnerList && partnerList.length < 1 ? (
                  <h4 style={{ margin: '103px' }}>No Data</h4>
                ) : (
                  partnerList &&
                  partnerList.map((data, i) => {
                    let initials =
                      data.partner_name.match(/\b\w/g) || [];
                    initials = (
                      (initials.shift() || '') +
                      (initials.pop() || '')
                    ).toUpperCase();
                    //
                    return (
                      <li
                        key={data.id}
                        role="tab"
                        className={
                          activeClickPartners.includes(
                            data.partner_id,
                          )
                            ? 'active'
                            : ''
                        }
                        onClick={() => {
                          handleActiveClickPartners(data.partner_id);
                        }}
                        onKeyPress={() => {
                          handleActiveClickPartners(data.partner_id);
                        }}
                      >
                        <div
                          className={`organization-icon ${getClassName(
                            data.id,
                          )}`}
                        >
                          <span>{initials}</span>
                        </div>
                        <div className="organization-content">
                          <h5>{data.partner_name}</h5>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>
            )}
          </div>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = ({ automationReducer }) => ({
  automationReducer,
});
export default connect(mapStateToProps, {})(LeftSideBar);
