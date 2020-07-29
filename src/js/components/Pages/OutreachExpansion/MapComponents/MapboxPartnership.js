/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import VectorTileMapbox from './VectorTileMapbox';
import PlotVector from './PlotVector';
import {
  getMapDataByProvince,
  getMapDataByDistrict,
  getMapDataByMunicipality,
  filterMapDataOfCircleMarkerWithViewDataBy,
  getPartnershipAllData,
  getFilteredMapData,
} from '../../../../actions/partnership.actions';

class MapboxPartnership extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredMapData: '',
      filteredByYearlyFund: '',
      filteredBySocialSecurity: '',
      filteredByPopulation: '',
      filteredByHDI: '',
      hoveredMunicipalityId: 0,
      secondaryData: '',
      selectedMuni: '',
    };
    this.markerRef = React.createRef();
    this.keyRef = React.createRef();
  }

  componentDidMount() {
    this.props.getMapDataByProvince();
    this.props.getMapDataByDistrict();
    // this.props.getPartnershipAllData();
    this.props.getMapDataByMunicipality();
    this.props.addMap();

    this.setState({
      filteredMapData: this.props.partnershipReducer.filteredMapData,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { outreachReducer } = this.props;

    if (prevProps.outreachReducer !== outreachReducer) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        secondaryData: outreachReducer.secondarData.data,
      });
    }

    if (prevProps.mapViewDataBy !== this.props.mapViewDataBy) {
      if (this.props.mapViewDataBy !== 'investment_focus') {
        this.props.filterMapDataOfCircleMarkerWithViewDataBy(
          this.props.mapViewDataBy,
          this.props.mapViewBy,
        );
      }
    }
    if (
      prevProps.partnershipReducer !== this.props.partnershipReducer
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        filteredMapData: this.props.partnershipReducer
          .filteredMapData,
      });
    }

    if (prevProps.outreachReducer !== outreachReducer) {
      const filteredByYearlyFund = outreachReducer.secondarData.data.map(
        muni => ({
          id: muni.municipality_code,
          code: muni.municipality_code,
          count: muni.yearly_fund,
        }),
      );

      const filteredBySocialSecurity = outreachReducer.secondarData.data.map(
        muni => ({
          id: muni.municipality_code,
          code: muni.municipality_code,
          count: muni.social_security_recipients,
        }),
      );

      const filteredByPopulation = outreachReducer.secondarData.data.map(
        muni => ({
          id: muni.municipality_code,
          code: muni.municipality_code,
          count: muni.population,
        }),
      );

      const filteredByHDI = outreachReducer.secondarData.data.map(
        muni => ({
          id: muni.municipality_code,
          code: muni.municipality_code,
          count: muni.hdi * 100,
        }),
      );
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        filteredByYearlyFund,
        filteredBySocialSecurity,
        filteredByPopulation,
        filteredByHDI,
      });
    }
  }

  setHoveredMunicipalityId = id => {
    const { secondaryData } = this.state;
    let tempId = 0;

    // eslint-disable-next-line array-callback-return
    secondaryData.map(data => {
      // eslint-disable-next-line radix
      if (parseInt(data.municipality_code) === parseInt(id)) {
        console.log('condition met');
        this.setState({ selectedMuni: data });
        tempId = id;
      } else {
        this.setState({ selectedMuni: '' });
      }
    });
    this.setState({ hoveredMunicipalityId: tempId });
  };

  render() {
    const {
      filteredMapData,
      filteredByYearlyFund,
      filteredByHDI,
      filteredByPopulation,
      filteredBySocialSecurity,
      hoveredMunicipalityId,
      selectedMuni,
    } = this.state;
    const {
      mapViewBy,
      setMapViewBy,
      vectorTileUrl,
      mapViewDataBy,
      map,
      localOutreachSelected,
    } = this.props;

    // const inputDivisions =
    //   mapViewBy === 'province'
    //     ? [0, 10, 20, 30, 40, 50, 60, 70]
    //     : [0, 2, 4, 6, 8, 10, 12, 14, 20];

    // const { mapDataForCircleMarker } = this.props.partnershipReducer;

    let choroplethData = filteredMapData;

    switch (localOutreachSelected) {
      case 'Yearly government funding':
        choroplethData = filteredByYearlyFund;
        break;
      case 'Population of local unit':
        choroplethData = filteredByPopulation;
        break;
      case 'HDI of District':
        choroplethData = filteredByHDI;
        break;
      case 'Social security receipeints':
        choroplethData = filteredBySocialSecurity;
        break;
      default:
        choroplethData = filteredMapData;
    }

    // eslint-disable-next-line no-unused-expressions
    selectedMuni && console.log('selectedMuni present', selectedMuni);

    return (
      <>
        <div id="key" ref={this.keyRef} />
        <div id="map">
          {map && (
            <div>
              <PlotVector
                handleFederalClickOnMap={
                  this.props.handleFederalClickOnMap
                }
                setMapViewBy={setMapViewBy}
                vectorTileUrl={vectorTileUrl}
                map={map}
                choroplethData={choroplethData}
                color="#eb5149"
                localOutreachSelected={localOutreachSelected}
                setHoveredMunicipalityId={
                  this.setHoveredMunicipalityId
                }
              />

              {hoveredMunicipalityId !== 0 && (
                <div className="map-popup">
                  <div className="map-popup-container">
                    <div className="map-popup-body">
                      <div className="map-popup-header">
                        <h3>Pancheswor Rural Municipality</h3>
                        <h5>Baitadi</h5>
                      </div>
                      <span className="close-icon">
                        <i className="material-icons">close</i>
                      </span>
                      <div className="map-popup-content">
                        <ul className="map-popup-list">
                          <li>
                            <p>Head-Quarter of the Local Unit</p>
                            <b>Aam Chaura</b>
                          </li>
                          <li>
                            <p>HDI of District</p>
                            <b>0.416</b>
                          </li>
                          <li>
                            <p>Population in Local Unit</p>
                            <b>18,766</b>
                          </li>
                          <li>
                            <p>Yearly Central Government Funding</p>
                            <b>Rs. 237,703,000</b>
                          </li>
                          <li>
                            <p>Social Security Payment Recipients</p>
                            <b>3,001</b>
                          </li>
                          <li>
                            <p>Yearly Social Security Payments</p>
                            <b>Rs. 40,622,000</b>
                          </li>
                          <li>
                            <p>
                              Road distance from nearest commercial
                              bank before establishment of branch
                            </p>
                            <b>21</b>
                          </li>
                        </ul>
                      </div>
                      <div className="map-popup-footer">
                        <h5>Available Means of Communication</h5>
                        <ul className="communication">
                          <li>
                            <i className="material-icons check">
                              check_circle
                            </i>
                            <span>Landline</span>
                          </li>
                          <li>
                            <i className="material-icons cancel">
                              cancel
                            </i>
                            <span>Mobile internet</span>
                          </li>
                          <li>
                            <i className="material-icons check">
                              check_circle
                            </i>
                            <span>mobile</span>
                          </li>
                          <li>
                            <i className="material-icons cancel">
                              cancel
                            </i>
                            <span>other internet</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* <VectorTileMapbox
                handleFederalClickOnMap={
                  this.props.handleFederalClickOnMap
                }
                setMapViewBy={setMapViewBy}
                mapViewBy={mapViewBy}
                mapViewDataBy={mapViewDataBy}
                vectorTileUrl={vectorTileUrl}
                map={map}
                choroplethData={filteredMapData}
                circleMarkerData={mapDataForCircleMarker}
                // divisions={inputDivisions}
                label
                color="#eb5149"
              /> */}
              <div ref={this.markerRef} />
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({
  partnershipReducer,
  outreachReducer,
}) => ({
  partnershipReducer,
  outreachReducer,
});
export default connect(mapStateToProps, {
  getMapDataByProvince,
  getMapDataByDistrict,
  getMapDataByMunicipality,
  filterMapDataOfCircleMarkerWithViewDataBy,
  getPartnershipAllData,
  getFilteredMapData,
})(MapboxPartnership);
