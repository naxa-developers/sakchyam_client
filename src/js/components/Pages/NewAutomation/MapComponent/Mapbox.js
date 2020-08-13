/* eslint-disable no-unused-expressions */
/* eslint-disable default-case */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-case-declarations */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import ContentLoader from 'react-content-loader';
import { connect } from 'react-redux';
import PlotVector from './PlotVector';
import PopUp from './divisionInfoPopUp';

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
    };
    this.markerRef = React.createRef();
    this.keyRef = React.createRef();
  }

  componentDidMount() {
    this.props.addMap();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      automationDataByMunicipality,
      automationDataByDistrict,
      automationDataByProvince,
      automationChoroplethData,
    } = this.props.automationReducer;
    const { mapViewBy } = this.props;

    if (
      automationChoroplethData !==
      prevProps.automationReducer.automationChoroplethData
    ) {
      // console.log(
      //   'new choropleth data recived',
      //   mapViewBy,
      //   automationChoroplethData,
      // );

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
  }

  setHoveredMunicipalityId = id => {
    // console.log('id oh region', id, this.state.filteredMapData);
    // const { filteredMapData } = this.state;
    // const { mapViewBy } = this.props;
    // if (id !== 0) {
    //   this.setState({ hoveredId: id });
    //   if (mapViewBy === 'province') {
    //     const province = filteredMapData.filter(
    //       region => region.code === id,
    //     );
    //     console.log('region', province);
    //   }
    // } else {
    //   this.setState({ hoveredId: '' });
    // }
  };

  render() {
    const { filteredMapData, hoveredId } = this.state;
    const { map, loading, activeOutreachButton } = this.props;

    const choroplethData = activeOutreachButton
      ? filteredMapData
      : '';

    return (
      <>
        <div id="key" ref={this.keyRef} />

        <div id="map">
          {map && (
            <div>
              <PlotVector
                choroplethData={choroplethData}
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
          {/* {hoveredId && <PopUp />} */}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ automationReducer }) => ({
  automationReducer,
});
export default connect(mapStateToProps)(MapboxPartnership);
