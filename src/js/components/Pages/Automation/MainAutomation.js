import React, { Component } from 'react';

import { connect } from 'react-redux';
import MapComponent from './MapComponent';
import { getAutomationDataByPartner } from '../../../actions/automation.actions';

class MainAutomation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    this.props.getAutomationDataByPartner();
  }

  render() {
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
          {automationDataByPartner && automationDataByPartner && (
            <a href="#" className="w3-bar-item w3-button">
              Link 1
            </a>
          )}
        </div>

        <div style={{ marginLeft: '25%' }}>
          <div className="w3-container w3-teal">
            <h1>My Page</h1>
          </div>

          <div className="w3-container">
            <MapComponent mapRef={this.mapRef} />
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
  getAutomationDataByPartner,
})(MainAutomation);
