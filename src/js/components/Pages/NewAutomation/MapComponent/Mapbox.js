/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable no-unused-expressions */
/* eslint-disable default-case */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-case-declarations */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import ContentLoader from 'react-content-loader';
import { connect } from 'react-redux';
import Switch from 'react-switch';
import PlotVector from './PlotVector';
import PopUp from './divisionInfoPopUp';
import {
  removeDuplicates,
  aggregateCounts,
} from '../../../common/utilFunctions';

const MyLoader = () => (
  <ContentLoader
    height="90vh"
    speed={1}
    backgroundColor="#b3b3b3"
    foregroundColor="#9a9a9a"
    viewBox="0 0 380 70"
  >
    <rect x="0" y="0" width="100%" height="100%" />
  </ContentLoader>
);

class MapboxPartnership extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredMapData: '',
      hoveredId: '',
      secondaryData: '',
      selectedMuni: '',
      YesNo: false,
      markerData: '',
      markerOpen: false,
      activeMarkers: '',
      inactiveMarkers: '',
      popUpData: '',
      showBranches: false,
      checked: false,
    };
    this.markerRef = React.createRef();
    this.keyRef = React.createRef();
  }

  componentDidMount() {
    this.props.addMap();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      automationChoroplethData,
      automationTableData,
    } = this.props.automationReducer;
    const {
      mapViewBy,
      activeClickPartners,
      activeOutreachButton,
    } = this.props;

    if (
      automationChoroplethData !==
      prevProps.automationReducer.automationChoroplethData
    ) {
      this.setState({ allData: automationChoroplethData });

      if (mapViewBy === 'province') {
        const provinceData = automationChoroplethData.map(item => ({
          id: item.id,
          code: item.id,
          count: item.count,
        }));
        // console.log('map view by province', provinceData);
        this.setState({ filteredMapData: provinceData });
      }

      if (mapViewBy === 'district') {
        const districtData = automationChoroplethData.map(item => ({
          id: item.id,
          code: item.id,
          count: item.count,
        }));
        this.setState({ filteredMapData: districtData });
      }
      if (mapViewBy === 'municipality') {
        if (
          automationChoroplethData &&
          automationChoroplethData[0] &&
          automationChoroplethData[0].name
        ) {
          const districtData = automationChoroplethData.map(item => ({
            id: item.munid,
            code: item.munid,
            count: item.count,
          }));
          this.setState({ filteredMapData: districtData });
        } else {
          const districtData = automationChoroplethData.map(item => ({
            id: item.id,
            code: item.id,
            count: item.count,
          }));
          this.setState({ filteredMapData: districtData });
        }
      }
    }

    if (
      automationTableData !==
      prevProps.automationReducer.automationTableData
    ) {
      this.setState({ tableData: automationTableData });
    }

    if (prevProps.activeOutreachButton !== activeOutreachButton) {
      if (activeOutreachButton) {
        this.setState({ showBranches: false });
      }
    }

    if (prevProps.activeClickPartners !== activeClickPartners) {
      if (activeClickPartners.length === 0) {
        this.setState({ showBranches: false });
      }
    }
  }

  setHoveredMunicipalityId = id => {
    // console.log('id oh region', id);
    const { tableData } = this.state;
    const { mapViewBy, activeOutreachButton } = this.props;
    let data;
    if (id !== 0) {
      if (activeOutreachButton) {
        this.setState({ hoveredId: id });
      }

      if (mapViewBy === 'province') {
        const province = tableData.filter(
          region => region.province_code === parseInt(id),
        );

        const arrayNew = aggregateCounts(province);

        const uniqueData = removeDuplicates(arrayNew, 'partner');

        const totalCount = uniqueData.reduce(
          (total, i) => total + i.count,
          0,
        );

        if (province.length > 0) {
          data = {
            uniqueData,
            totalCount,
            name: province[0].province,
          };
          if (activeOutreachButton) {
            this.setState({ popUpData: data });
          }
        } else {
          this.setState({ hoveredId: '' });
        }
      }
      if (mapViewBy === 'district') {
        const province = tableData.filter(
          region => region.district_code === parseInt(id),
        );

        const arrayNew = aggregateCounts(province);

        const uniqueData = removeDuplicates(arrayNew, 'partner');

        const totalCount = uniqueData.reduce(
          (total, i) => total + i.count,
          0,
        );

        console.log('value of pro', province);
        if (province.length > 0) {
          if (activeOutreachButton) {
            data = {
              uniqueData,
              totalCount,
              name: province[0].district,
            };
            this.setState({ popUpData: data });
          }
        } else {
          this.setState({ hoveredId: '' });
        }
      }
      if (mapViewBy === 'municipality') {
        const municipality = tableData.filter(
          region => region.municipality_code === parseInt(id),
        );

        const arrayNew = aggregateCounts(municipality);

        const uniqueData = removeDuplicates(arrayNew, 'partner');

        const totalCount = uniqueData.reduce(
          (total, i) => total + i.count,
          0,
        );
        if (
          municipality &&
          municipality[0] &&
          municipality[0].municipality
        ) {
          data = {
            uniqueData,
            totalCount,
            name: municipality[0].municipality,
          };
          if (activeOutreachButton) {
            this.setState({ popUpData: data });
          }
        } else {
          this.setState({ hoveredId: '' });
        }
      }
    } else {
      this.setState({ hoveredId: '' });
      data = {};
    }
    return data;
  };

  toogleBranches = () => {
    this.setState(prevState => ({
      showBranches: !prevState.showBranches,
    }));
  };

  render() {
    const {
      filteredMapData,
      hoveredId,
      popUpData,
      showBranches,
    } = this.state;
    const {
      map,
      loading,
      activeOutreachButton,
      mapViewBy,
      activeClickPartners,
    } = this.props;

    const choroplethData = activeOutreachButton
      ? filteredMapData
      : '';

    const migrationLineCondition =
      !activeOutreachButton && activeClickPartners.length > 0;

    return (
      <>
        <div id="key" ref={this.keyRef} />

        <div id="map">
          {map && (
            <div>
              <PlotVector
                choroplethData={choroplethData}
                showBranches={showBranches}
                color="#000080"
                {...this.props}
                setHoveredMunicipalityId={
                  this.setHoveredMunicipalityId
                }
                // markerEventHandler={this.markerEventHandler}
              />

              <div ref={this.markerRef} />
            </div>
          )}
          {loading && (
            <div
              style={{
                position: 'relative',
                ZIndex: '10',
              }}
            >
              {' '}
              <MyLoader />
            </div>
          )}
          {hoveredId && (
            <PopUp data={popUpData} mapViewBy={mapViewBy} />
          )}
        </div>
        {migrationLineCondition && (
          <div className="overlay-automation">
            <div
              style={{ display: 'block' }}
              className="inline-group"
            >
              <b>View Branches</b>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={showBranches}
                  onClick={() => {
                    this.toogleBranches();
                  }}
                />
                <span className="slider" />
              </label>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ automationReducer }) => ({
  automationReducer,
});
export default connect(mapStateToProps)(MapboxPartnership);
