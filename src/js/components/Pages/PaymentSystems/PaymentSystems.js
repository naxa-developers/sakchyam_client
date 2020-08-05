/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import Header from '../../Header';
import DiagramSection from './DiagramSection/DiagramSection';
import ContentSection from './ContentSection/ContentSection';

class PaymentSystems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedActive: false,
      isBlueActive: false,
      isGreenActive: false,
    };
  }

  render() {
    return (
      <>
        <Header />
        <div className="payment-body">
          <button type="button" className="common-button is-bg">
            Payment system
          </button>
          <div className="payment-wrapper">
            <DiagramSection />

            <ContentSection />
          </div>
        </div>
      </>
    );
  }
}

export default PaymentSystems;
