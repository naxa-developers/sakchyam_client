/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import { connect } from 'react-redux';
import DownloadIcon from '../../../../../img/get_app.png';
import ExpandIcon from '../../../../../img/open_in_full-black-18dp.png';
import { resetBarDatas } from '../../../../actions/partnership.actions';

const downloadPng = (chartid, imageTitle) => {
  const icons = document.querySelectorAll('#insurance-icons');
  icons.forEach(el => (el.style.display = 'none'));

  const pieTab = document.querySelector('#donut-tab-insurance');
  pieTab.style.display = 'none';

  setTimeout(() => {
    html2canvas(document.querySelector(`#${chartid}`), {
      allowTaint: true,
      scale: 5,
    }).then(canvas => {
      canvas.toBlob(function(blob) {
        saveAs(blob, `${imageTitle}.png`);
      });
    });
  }, 500);

  setTimeout(() => {
    icons.forEach(el => (el.style.display = 'block'));
    pieTab.style.display = 'block';
  }, 600);
};
const CardTab = ({
  resetFunction,
  handleShowBarOf,
  cardTitle,
  cardClass,
  cardChartId,
  handleModal,
  handleSelectedModal,
  renderChartComponent,
  showBarof,
}) => {
  return (
    <div className={cardClass}>
      <div className="card" id={cardChartId}>
        <div className="card-header">
          <h5>{cardTitle}</h5>
          <div className="header-icons" id="insurance-icons">
            {/* <div className="card-switcher">
                      <small>OFF</small>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider" />
                      </label>
                      <small>ON</small>
                    </div> */}
            {cardChartId === 'groupedChart' ? (
              showBarof !== 'Provinces' && (
                <button
                  // id="chart-reset"
                  type="button"
                  onClick={() => {
                    handleShowBarOf('Provinces');
                    resetFunction();
                  }}
                  className="is-border common-button chart-reset"
                >
                  Reset
                </button>
              )
            ) : cardChartId === 'sunburst' ? (
              <button
                // id="chart-reset"
                type="button"
                onClick={() => {
                  resetFunction();
                }}
                className="is-border common-button chart-reset"
              >
                Reset
              </button>
            ) : cardChartId === 'leverageChart' ? (
              <button
                // id="chart-reset"
                type="button"
                onClick={() => {
                  resetFunction();
                }}
                className="is-border common-button chart-reset"
              >
                Reset
              </button>
            ) : cardChartId === 'stackedWithInvestment' ? (
              showBarof !== 'investmentFocus' && (
                <button
                  // id="chart-reset"
                  type="button"
                  onClick={() => {
                    resetFunction();
                  }}
                  className="is-border common-button chart-reset"
                >
                  Reset
                </button>
              )
            ) : null}
            <span
              className=""
              onClick={() => {
                downloadPng(cardChartId, cardTitle);
              }}
              onKeyDown={() => {
                downloadPng(cardChartId, cardTitle);
              }}
              role="button"
              tabIndex="-1"
            >
              <img src={DownloadIcon} alt="open" />
            </span>
            <span
              role="tab"
              tabIndex="0"
              onClick={() => {
                handleModal();
                handleSelectedModal(cardChartId);
              }}
              onKeyDown={() => {
                handleModal();
                handleSelectedModal(cardChartId);
              }}
              className="zoom"
              popup-link="graph-modal"
            >
              <img src={ExpandIcon} alt="open" />
            </span>
          </div>
        </div>
        <div className="card-body" id={cardChartId}>
          {renderChartComponent()}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ partnershipReducer }) => ({
  partnershipReducer,
});
export default connect(mapStateToProps, { resetBarDatas })(CardTab);
