import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from '../../../common/Select/Select';

class FilterTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeView: 'visualization',
      activeFilter: false,
      mapViewBy: 'province',
      selectedProvince: [],
      selectedDistrict: [],
      selectedMunicipality: [],
    };
  }

  setActiveFilter = () => {
    this.setState(prevState => ({
      activeFilter: !prevState.activeFilter,
    }));
  };

  setMapViewBy = clicked => {
    this.setState({ mapViewBy: clicked });
  };

  render() {
    const {
      state: {
        activeView,
        activeFilter,
        mapViewBy,
        selectedProvince,
        selectedDistrict,
        selectedMunicipality,
      },
      props: {
        partnershipReducer: {
          allProvinceList,
          allDistrictList,
          allMunicipalityList,
        },
      },
    } = this;
    return (
      <div
        className={`partnership-filter ${
          activeView === 'map' ? 'is-position' : ''
        }`}
      >
        <div className={`filter-bar ${activeFilter ? 'active' : ''}`}>
          <button
            type="button"
            onClick={this.setActiveFilter}
            className="common-buttonm is-borderm filter-button is-icon"
          >
            <i className="material-icons">filter_list</i>
            <span>Filters</span>
          </button>
          <div className="filter-content">
            <div className="view-list">
              <span>view by</span>
              <ul className="tab-list">
                <li
                  className={mapViewBy === 'province' ? 'active' : ''}
                >
                  <a
                    role="tab"
                    tabIndex="-1"
                    onClick={() => {
                      this.setMapViewBy('province');
                    }}
                    onKeyUp={() => {
                      this.setMapViewBy('province');
                    }}
                  >
                    Province
                  </a>
                </li>
                <li
                  className={mapViewBy === 'district' ? 'active' : ''}
                >
                  <a
                    role="tab"
                    tabIndex="-1"
                    onClick={() => {
                      this.setMapViewBy('district');
                    }}
                    onKeyUp={() => {
                      this.setMapViewBy('district');
                    }}
                  >
                    District
                  </a>
                </li>
                <li
                  className={
                    mapViewBy === 'municipality' ? 'active' : ''
                  }
                >
                  <a
                    role="tab"
                    tabIndex="-1"
                    onClick={() => {
                      this.setMapViewBy('municipality');
                    }}
                    onKeyUp={() => {
                      this.setMapViewBy('municipality');
                    }}
                  >
                    Municipality
                  </a>
                </li>
              </ul>
            </div>
            <div className="filter-row">
              <div className="filter-list">
                <div className="form-group province">
                  <Select
                    withCheckbox
                    name="Select Province"
                    options={allProvinceList && allProvinceList}
                    onChange={selectedOptions => {
                      this.setState({
                        selectedProvince: selectedOptions,
                      });
                      // eslint-disable-next-line react/jsx-curly-newline
                    }}
                  />
                </div>
                {mapViewBy === 'municipality' ||
                mapViewBy === 'district' ? (
                  <div className="form-group district">
                    <Select
                      withCheckbox
                      name="Select District"
                      options={allDistrictList && allDistrictList}
                      onChange={selectedOptions => {
                        this.setState({
                          selectedDistrict: selectedOptions,
                        });
                        // eslint-disable-next-line react/jsx-curly-newline
                      }}
                    />
                  </div>
                ) : null}
                {mapViewBy === 'municipality' && (
                  <div className="form-group municipality">
                    <Select
                      withCheckbox
                      name="Select Municipality"
                      options={
                        allMunicipalityList && allMunicipalityList
                      }
                      onChange={selectedOptions => {
                        this.setState({
                          selectedMunicipality: selectedOptions,
                        });
                        // eslint-disable-next-line react/jsx-curly-newline
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="buttons is-end">
                <button
                  type="button"
                  onClick={this.resetFilters}
                  className="common-button is-clear"
                >
                  <i className="material-icons">refresh</i>
                </button>
                <button
                  onClick={this.handleApplyFederalFilter}
                  type="button"
                  className="common-button is-clear"
                >
                  Apply
                </button>
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

export default connect(mapStateToProps, {})(FilterTab);
