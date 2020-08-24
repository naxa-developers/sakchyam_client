/* eslint-disable react/no-unused-state */
import React from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import Header from '../../Header';
import DiagramSection from './DiagramSection/DiagramSection';
import ContentSection from './ContentSection/ContentSection';
import './custom-payment.scss';

const downloadPng = chartid => {
  setTimeout(() => {
    html2canvas(document.querySelector(`#${chartid}`), {
      allowTaint: true,
    }).then(canvas => {
      canvas.toBlob(function(blob) {
        saveAs(blob, 'payment_systems.png');
      });
    });
  }, 500);
};

const PaymentSystems = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="payment-body">
        <button type="button" className="common-button is-bg">
          Payment system
        </button>
        <button
          type="button"
          className="common-button is-bg"
          style={{ position: 'absolute', right: '30px' }}
          onClick={() => downloadPng('payment-diagram')}
        >
          Download
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
