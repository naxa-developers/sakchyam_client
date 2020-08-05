import React from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import { connect } from 'react-redux';
import DownloadIcon from '../../../../../img/get_app.png';
import ExpandIcon from '../../../../../img/open_in_full-black-18dp.png';
import { resetBarDatas } from '../../../../actions/partnership.actions';
import FilterTab from './FilterTab';

const downloadPng = (chartid, imageTitle) => {
  // document.querySelector('.info-header-bottom').style.display =
  //   'none';
  // document
  //   .querySelector('.download-dropdown')
  //   .classList.remove('active');
  setTimeout(() => {
    // document
    //   .querySelector(`.${chartid}`)
    //   .append(<label>Varun</label>);
    html2canvas(document.querySelector(`#${chartid}`), {
      // logging: true,
      // letterRendering: 1,
      allowTaint: true,
      // scale: window.devicePixelRatio,
      // windowWidth: window.innerWidth,
      // windowHeight: window.innerHeight + 120,
      // x: 20,
      // y: 70,
      // width: window.innerWidth + 40,
      // height: window.innerHeight + 40,
      // foreignObjectRendering: true,
      // useCORS: true,
    }).then(canvas => {
      canvas.toBlob(function(blob) {
        saveAs(blob, `${imageTitle}.png`);
      });
    });
  }, 500);

  // this.setState({ downloadActive: false });
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
  const modalHeader =
    cardChartId === 'sunburst'
      ? 'Sakchyam Investment Focus'
      : cardChartId === 'groupedChart'
      ? 'Province Wise Programme Results'
      : cardChartId === 'leverageChart'
      ? 'S-CF Funds & Leverage By Investment Focus'
      : cardChartId === 'radar'
      ? 'Key Services Introduced'
      : cardChartId === 'sankeyChart'
      ? 'Beneficiaries Reached'
      : cardChartId === 'timeline'
      ? 'Projects Timeline'
      : cardChartId === 'stackedWithInvestment'
      ? 'Investment Focus Wise Budget & Beneficiaries Count'
      : '';
  const selectedChartId =
    cardChartId === 'groupedChart'
      ? 'stacked_chart'
      : cardChartId === 'leverageChart'
      ? 'leverage_chart'
      : cardChartId === 'sankeyChart'
      ? 'sankey_chart'
      : cardChartId === 'sunburst'
      ? 'sunburst-wrapper'
      : cardChartId === 'stackedWithInvestment'
      ? 'stackedWithInvestment'
      : '';
  return (
    <div className={cardClass}>
      <div className="card" id={cardChartId}>
        <div className="card-header">
          <h5>{cardTitle}</h5>
          <div className="header-icons">
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
                downloadPng(cardChartId, modalHeader);
              }}
              onKeyDown={() => {
                downloadPng(cardChartId, modalHeader);
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
