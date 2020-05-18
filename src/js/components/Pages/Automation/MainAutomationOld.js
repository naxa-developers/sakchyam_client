import React, { Component } from 'react';
import L from 'leaflet';
import { connect } from 'react-redux';
import MapComponent from './MapComponent/MapComponent';
import {
  getAllAutomationDataByPartner,
  getAutomationDataByProvince,
  getAutomationDataByDistrict,
  getAutomationDataByMunicipality,
} from '../../../actions/automation.actions';

export const activeIcon = new L.Icon({
  iconUrl: '../../../src/img/marker.png',
  iconRetinaUrl: '../../../src/img/marker.png',
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 25],
  shadowUrl: '../assets/marker-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
});
export const inactiveIcon = new L.Icon({
  iconUrl: '../../../src/img/firstaid.svg',
  iconRetinaUrl: '../../../src/img/firstaid.svg',
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 25],
  shadowUrl: '../assets/marker-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
});
class MainAutomation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeClickPartners: [],
    };
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    this.props.getAutomationDataByMunicipality();
    this.props.getAllAutomationDataByPartner();
    this.props.getAutomationDataByProvince();
    this.props.getAutomationDataByDistrict();
  }

  handleActiveClickPartners = clicked => {
    console.log(clicked, 'name');
    const { activeClickPartners } = this.state;
    if (activeClickPartners.includes(clicked)) {
      const removedPartnersFull = activeClickPartners.filter(function(
        partner,
      ) {
        return partner !== clicked;
      });

      this.setState({
        activeClickPartners: removedPartnersFull,
      });
      // Object.entries(mapLayers).forEach(([key, value]) => {
      //   if (
      //     value.options &&
      //     value.options.attribution &&
      //     value.options.attribution.name &&
      //     value.options.attribution.name === clicked
      //   ) {
      //     console.log(value.options.attribution.name);
      //     value.setIcon(activeIcon);
      //   }
      // });
    } else {
      const joined = activeClickPartners.concat(clicked);
      this.setState({ activeClickPartners: joined });
    }

    // console.log(mapLayers['30'].setIcon(inactiveIcon), 'mapref');
    // eslint-disable-next-line no-restricted-syntax
    // for (var i=0; i>map)
    // for (const property in object) {
    //   if (object.hasOwnProperty(property)) {
    //     // Do things here
    //   }
    // }
  };

  componentDidUpdate(prevProps, prevState) {
    const { activeClickPartners } = this.state;
    if (prevState.activeClickPartners !== activeClickPartners) {
      const mapLayers = this.mapRef.current.leafletElement._layers;
      console.log(activeClickPartners, 'activeClick');
      if (activeClickPartners.length === 0) {
        Object.entries(mapLayers).forEach(([key, value]) => {
          if (
            value.options &&
            value.options.attribution &&
            value.options.attribution.name
          ) {
            console.log(value.options.attribution.name);
            value.setIcon(activeIcon);
          }
        });
      } else {
        Object.entries(mapLayers).forEach(([key, value]) => {
          if (
            value.options &&
            value.options.attribution &&
            value.options.attribution.name
          ) {
            console.log(value.options.attribution.name);
            value.setIcon(inactiveIcon);
          }
        });
      }
      activeClickPartners.map(data => {
        Object.entries(mapLayers).forEach(([key, value]) => {
          if (
            value.options &&
            value.options.attribution &&
            value.options.attribution.name &&
            value.options.attribution.name === data
          ) {
            console.log(value.options.attribution.name);
            value.setIcon(activeIcon);
            value.openPopup();
          }
        });
        return true;
      });
      // Object.entries(mapLayers).forEach(([key, value]) => {
      //   if (
      //     value.options &&
      //     value.options.attribution &&
      //     value.options.attribution.name &&
      //     value.options.attribution.name !== clicked
      //   ) {
      //     console.log(value.options.attribution.name);
      //     value.setIcon(inactiveIcon);
      //   }
      // });
    }
  }

  render() {
    const { activeClickPartners } = this.state;
    const {
      automationDataByPartner,
      automationDataByProvince,
      automationChoroplethData,
      dataLoading,
    } = this.props.automationReducer;
    return (
      <>
        <div
          className="w3-sidebar w3-light-grey w3-bar-block"
          style={{ width: '25%' }}
        >
          <h3 className="w3-bar-item">Menu</h3>
          {automationDataByPartner &&
            automationDataByPartner.map(data => {
              // console.log(data, 'data');
              return (
                <a
                  role="link"
                  tabIndex="0"
                  className={`w3-bar-item w3-button ${
                    activeClickPartners.includes(data.name)
                      ? 'active_automation'
                      : ''
                  } `}
                  onClick={() => {
                    this.handleActiveClickPartners(data.name);
                  }}
                  onKeyPress={() => {
                    this.handleActiveClickPartners(data.name);
                  }}
                >
                  {data.name}
                  <br />
                  <span>
                    Tablets Deployed:
                    {data.num_tablet_deployed}
                  </span>
                </a>
              );
            })}
        </div>

        <div style={{ marginLeft: '25%' }}>
          <div className="w3-container w3-teal">
            <h1>My Page</h1>
          </div>

          <div className="w3-container">
            <MapComponent
              handleActiveClickPartners={
                this.handleActiveClickPartners
              }
              mapRef={this.mapRef}
            />
          </div>
        </div>
        {/* <aside>
          <div>
          <ul>
          <li>Varun</li>
          <li>Pradhan</li>
          <li>Section</li>
          </ul>
          </div>
        </aside>
      <MapComponent mapRef={this.mapRef} /> */}
      </>
    );
  }
}
const mapStateToProps = ({ automationReducer }) => ({
  automationReducer,
});
export default connect(mapStateToProps, {
  getAllAutomationDataByPartner,
  getAutomationDataByProvince,
  getAutomationDataByDistrict,
  getAutomationDataByMunicipality,
})(MainAutomation);
