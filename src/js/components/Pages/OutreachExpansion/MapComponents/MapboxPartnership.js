/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-case-declarations */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import ContentLoader from 'react-content-loader';
import { connect } from 'react-redux';
import PlotVector from './PlotVector';
import MunicipalityPopUp from './MunicipalityPopUp';
import MarkerPopup from './MarkerPopUp';

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
      hoveredMunicipalityId: 0,
      secondaryData: '',
      selectedMuni: '',
      YesNo: false,
      markerData: '',
      markerOpen: false,
    };
    this.markerRef = React.createRef();
    this.keyRef = React.createRef();
  }

  componentDidMount() {
    this.props.addMap();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      outreachReducer,
      localOutreachSelected,
      mapViewBy,
      mapViewDataBy,
      primaryData,
    } = this.props;

    const {
      provinceData,
      districtData,
      municipalityData,
    } = outreachReducer;

    if (prevProps.outreachReducer.provinceData !== provinceData) {
      const outreachProvince = provinceData.map(p => ({
        id: p.code,
        code: p.code,
        count: p.count,
      }));
      this.setState({
        filteredMapData: outreachProvince,
      });
    }

    if (prevProps.outreachReducer !== outreachReducer) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        secondaryData: outreachReducer.secondarData.data,
      });
    }

    if (prevProps.mapViewDataBy !== mapViewDataBy) {
      if (mapViewDataBy === 'general_outreach') {
        this.setState({
          filteredMapData: provinceData,
          YesNo: false,
        });
      }
    }

    if (mapViewDataBy === 'general_outreach') {
      if (prevProps.mapViewBy !== mapViewBy) {
        let choroplethData;
        switch (mapViewBy) {
          case 'province':
            const outreachProvince = provinceData.map(p => ({
              id: p.code,
              code: p.code,
              count: p.count,
            }));
            choroplethData = outreachProvince;
            break;
          case 'district':
            const outreachDistrict = districtData.map(p => ({
              id: p.code,
              code: p.code,
              count: p.count,
            }));
            choroplethData = outreachDistrict;
            break;
          case 'municipality':
            const outreachMunicipality = municipalityData.map(p => ({
              id: p.code,
              code: p.code,
              count: p.count,
            }));
            choroplethData = outreachMunicipality;
            break;
          default:
            choroplethData = outreachReducer.provinceDsta;
        }

        this.setState({ filteredMapData: choroplethData });
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (prevProps.localOutreachSelected !== localOutreachSelected) {
        let choroplethData;
        let YesNo = false;
        const { data } = outreachReducer.secondarData;
        let temp;

        // eslint-disable-next-line default-case
        switch (localOutreachSelected) {
          case 'Yearly Central Government Funding':
            // eslint-disable-next-line no-case-declarations
            const filteredByYearlyFund = data.map(muni => ({
              id: muni.municipality_code,
              code: muni.municipality_code,
              count: muni.yearly_fund,
            }));
            choroplethData = filteredByYearlyFund;
            break;
          case 'Population in the Local Unit':
            const filteredByPopulation = data.map(muni => ({
              id: muni.municipality_code,
              code: muni.municipality_code,
              count: muni.population,
            }));
            choroplethData = filteredByPopulation;
            break;
          case 'HDI of District':
            const filteredByHDI = data.map(muni => ({
              id: muni.municipality_code,
              code: muni.municipality_code,
              count: muni.hdi * 100,
            }));
            choroplethData = filteredByHDI;
            break;
          case 'Social Security Payment Recipients':
            const filteredBySocialSecurity = data.map(muni => ({
              id: muni.municipality_code,
              code: muni.municipality_code,
              count: muni.social_security_recipients,
            }));
            choroplethData = filteredBySocialSecurity;
            break;
          case 'Yearly Social Security Payments':
            const filteredBySSPayments = data.map(muni => ({
              id: muni.municipality_code,
              code: muni.municipality_code,
              count: muni.yearly_social_security_payment,
            }));
            choroplethData = filteredBySSPayments;
            break;
          case 'Nearest Police Presence(Distance)':
            temp = data.filter(d => d.nearest_police_distance !== -1);

            const filteredByPPDistance = temp.map(muni => ({
              id: muni.municipality_code,
              code: muni.municipality_code,
              count: muni.nearest_police_distance,
            }));
            choroplethData = filteredByPPDistance;
            break;

          case 'Road distance from nearest Commercial Bank Branch (in KM)':
            temp = data.filter(d => d.nearest_branch_distance !== -1);
            const filteredByCCDistance = temp.map(muni => ({
              id: muni.municipality_code,
              code: muni.municipality_code,
              count: muni.nearest_branch_distance,
            }));
            choroplethData = filteredByCCDistance;
            break;

          case 'Nearest Road Access(Distance)':
            temp = data.filter(d => d.nearest_road_distance !== -1);
            const filteredByNRADistance = temp.map(muni => ({
              id: muni.municipality_code,
              code: muni.municipality_code,
              count: muni.nearest_road_distance,
            }));
            choroplethData = filteredByNRADistance;
            break;

          case 'Nearest Road Access(TypeOfRoad)':
            temp = data.map(d => ({ type: d.nearest_road_type }));
            console.log('temp value', temp);
            // temp = data.filter(d => d.nearest_road_distance !== -1);
            // const filteredByNRADistance = temp.map(muni => ({
            //   id: muni.municipality_code,
            //   code: muni.municipality_code,
            //   count: muni.nearest_road_distance,
            // }));
            // choroplethData = filteredByNRADistance;
            break;

          case 'Available Means of Communication(Landline)':
            const filteredByLandline = data.map(muni => ({
              id: muni.municipality_code,
              code: muni.municipality_code,
              count: muni.communication_landline === 'Yes' ? 1 : 0,
            }));
            choroplethData = filteredByLandline;
            YesNo = true;
            break;
          case 'Available Means of Communication(Mobile)':
            const filteredByMobile = data.map(muni => ({
              id: muni.municipality_code,
              code: muni.municipality_code,
              count: muni.communication_mobile === 'Yes' ? 1 : 0,
            }));
            choroplethData = filteredByMobile;
            YesNo = true;
            break;
          case 'Available Means of Communication(Internet)':
            const filteredByInternet = data.map(muni => ({
              id: muni.municipality_code,
              code: muni.municipality_code,
              count: muni.communication_internet === 'Yes' ? 1 : 0,
            }));
            choroplethData = filteredByInternet;
            YesNo = true;
            break;
          case 'Available Means of Communication(OtherInternet)':
            const filteredByOther = data.map(muni => ({
              id: muni.municipality_code,
              code: muni.municipality_code,
              count:
                muni.communication_internet_other === 'Yes' ? 1 : 0,
            }));
            choroplethData = filteredByOther;
            YesNo = true;
            break;
          case 'Availability of Electricity(MainGrid)':
            const filteredByMainGrid = data.map(muni => ({
              id: muni.municipality_code,
              code: muni.municipality_code,
              count:
                muni.available_electricity_maingrid === 'Yes' ? 1 : 0,
            }));
            choroplethData = filteredByMainGrid;
            YesNo = true;
            break;
          case 'Availability of Electricity(Micro-Hydro)':
            const filteredByMicro = data.map(muni => ({
              id: muni.municipality_code,
              code: muni.municipality_code,
              count:
                muni.available_electricity_micro_hydro === 'Yes'
                  ? 1
                  : 0,
            }));
            choroplethData = filteredByMicro;
            YesNo = true;
            break;
        }

        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ YesNo, filteredMapData: choroplethData });
      }
    }
  }

  setHoveredMunicipalityId = id => {
    const { secondaryData } = this.state;
    const { mapViewDataBy } = this.props;
    let tempId = 0;

    if (mapViewDataBy !== 'general_outreach') {
      // eslint-disable-next-line array-callback-return
      secondaryData.map(data => {
        // eslint-disable-next-line radix
        if (parseInt(data.municipality_code) === parseInt(id)) {
          this.setState({ selectedMuni: data });
          tempId = id;
        }
      });

      this.setState({ hoveredMunicipalityId: tempId });
    }
  };

  markerEventHandler = e => {
    this.setState({ markerOpen: true, markerData: e });
  };

  closeMarker = () => {
    this.setState({ markerOpen: false });
  };

  render() {
    const {
      filteredMapData,
      hoveredMunicipalityId,
      selectedMuni,
      YesNo,
      markerOpen,
      markerData,
    } = this.state;
    const { map, loading } = this.props;

    const choroplethData = filteredMapData;
    return (
      <>
        <div id="key" ref={this.keyRef} />

        <div id="map">
          {map && (
            <div>
              <PlotVector
                choroplethData={choroplethData}
                color="#eb5149"
                YesNo={YesNo}
                {...this.props}
                setHoveredMunicipalityId={
                  this.setHoveredMunicipalityId
                }
                markerEventHandler={this.markerEventHandler}
              />

              {hoveredMunicipalityId !== 0 && (
                <MunicipalityPopUp selectedMuni={selectedMuni} />
              )}
              {markerOpen && (
                <MarkerPopup
                  markerData={markerData}
                  closeMarker={this.closeMarker}
                />
              )}
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
export default connect(mapStateToProps)(MapboxPartnership);
