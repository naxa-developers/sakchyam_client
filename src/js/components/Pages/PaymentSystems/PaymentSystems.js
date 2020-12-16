/* eslint-disable no-shadow */
/* eslint-disable react/no-unused-state */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';

import getPaymentSystemsData from '../../../actions/paymentSystems.actions';
import DiagramSection from './DiagramSection/DiagramSection';
import ContentSection from './ContentSection/ContentSection';
import './custom-payment.scss';

const downloadPng = chartid => {
  const downloadIcon = document.querySelector(
    '#payment-download-btn',
  );
  const LeftCardZIndex = document.querySelector(
    '.payment-sidebar-cover',
  );
  downloadIcon.style.display = 'none';
  LeftCardZIndex.style.zIndex = '-1';
  const element = document.querySelector(`.${chartid}`);
  const useWidth = element.offsetWidth;
  const useHeight = element.offsetHeight;
  setTimeout(() => {
    html2canvas(element, {
      allowTaint: true,
      scale: 1,
      // width: useWidth,
      height: useHeight,
    }).then(canvas => {
      canvas.toBlob(function(blob) {
        saveAs(blob, 'payment_systems.png');
      });
    });
  }, 500);

  setTimeout(() => {
    downloadIcon.style.display = 'block';
    LeftCardZIndex.style.zIndex = '0';
  }, 600);
};

const PaymentSystems = ({
  getPaymentSystemsData,
  paymentData,
  contentData,
}) => {
  useEffect(() => {
    getPaymentSystemsData();
  }, []);

  return (
    <>
      <div className="payment-body">
        <button type="button" className="common-button is-bg">
          Payment system
        </button>
        <button
          type="button"
          className="common-button is-bg"
          id="payment-download-btn"
          style={{ position: 'absolute', right: '30px', top: '0px' }}
          onClick={() => downloadPng('payment-body')}
        >
          Download
        </button>

        <DiagramSection contentData={contentData} />

        {/* <div className="payment-wrapper">
          <DiagramSection />

          <ContentSection contentData={contentData} />
        </div> */}
      </div>
    </>
  );
};

const mapStateToProps = ({ paymentSystemsReducer }) => ({
  paymentData: paymentSystemsReducer.paymentData,
  contentData: paymentSystemsReducer.contentData,
});

export default connect(mapStateToProps, { getPaymentSystemsData })(
  PaymentSystems,
);
