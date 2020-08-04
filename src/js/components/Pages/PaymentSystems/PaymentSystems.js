/* eslint-disable react/no-unused-state */
import React from 'react';
import Header from '../../Header';
import DiagramSection from './DiagramSection/DiagramSection';
import ContentSection from './ContentSection/ContentSection';

const PaymentSystems = () => {
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
};

export default PaymentSystems;
