/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import { connect } from 'react-redux';
import DownloadIcon from '../../../../../img/get_app.png';
import ExpandIcon from '../../../../../img/open_in_full-black-18dp.png';
import { resetBarDatas } from '../../../../actions/partnership.actions';
import FilterTab from './FilterTab';
import FilterBadge from './FilterBadge';

const downloadPng = (chartid, imageTitle) => {
  document.querySelectorAll('.download-span').forEach(el => {
    // eslint-disable-next-line no-param-reassign
    el.style.display = 'none';
  });
  document.querySelectorAll('.apexcharts-title-text').forEach(el => {
    // eslint-disable-next-line no-param-reassign
    el.style.display = 'block';
  });

  document.querySelectorAll('.expand-span').forEach(el => {
    // eslint-disable-next-line no-param-reassign
    el.style.display = 'none';
  });
  document.querySelectorAll('.chart-label').forEach(el => {
    // eslint-disable-next-line no-param-reassign
    el.style.display = 'block';
  });
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
      scale: 5,
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
      document.querySelectorAll('.download-span').forEach(el => {
        // eslint-disable-next-line no-param-reassign
        el.style.display = 'block';
      });
      document.querySelectorAll('.expand-span').forEach(el => {
        // eslint-disable-next-line no-param-reassign
        el.style.display = 'block';
      });
      document.querySelectorAll('.chart-label').forEach(el => {
        // eslint-disable-next-line no-param-reassign
        el.style.display = 'none';
      });
      document
        .querySelectorAll('.apexcharts-title-text')
        .forEach(el => {
          // eslint-disable-next-line no-param-reassign
          el.style.display = 'none';
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
  style,
  disableResetButton,
  disableExpand,
  radioBtn,
  radioBtnProps,
  setShowBarChartBy,
  showBarChartBy,
  resetFilters,
  badgeProp,
  notificationHandler,
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
      : cardChartId === 'mfsBar'
      ? 'Federal Wise Achievement Type'
      : cardChartId === 'stacked_chart'
      ? cardTitle
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
      <div className="card">
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
            {badgeProp && (
              <div className="partnership-tab" id="bar-tab-insurance">
                <ul>
                  <FilterBadge
                    viewDataBy={showBarChartBy}
                    onclick={() => {
                      setShowBarChartBy(badgeProp[0]);
                    }}
                    dataTitle={badgeProp[0]}
                    title={badgeProp[0]}
                  />
                  <FilterBadge
                    viewDataBy={showBarChartBy}
                    onclick={() => {
                      setShowBarChartBy(badgeProp[1]);
                    }}
                    dataTitle={badgeProp[1]}
                    title={badgeProp[1]}
                  />
                </ul>
              </div>
            )}
            {radioBtn && (
              <div className="card-switcher">
                <small>{radioBtnProps[0]}</small>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={showBarChartBy}
                    onChange={() => {
                      setShowBarChartBy(!showBarChartBy);
                    }}
                  />
                  <span className="slider" />
                </label>
                <small>{radioBtnProps[1]}</small>
              </div>
            )}
            {!disableResetButton && cardChartId === 'groupedChart' ? (
              showBarof !== 'Provinces' && (
                <button
                  // id="chart-reset"
                  type="button"
                  onClick={() => {
                    handleShowBarOf('Provinces');
                    resetFunction();
                    resetFilters();
                  }}
                  className="is-border common-button chart-reset download-span"
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
                  resetFilters();
                }}
                className="is-border common-button chart-reset download-span"
              >
                Reset
              </button>
            ) : cardChartId === 'leverageChart' ? (
              <button
                // id="chart-reset"
                type="button"
                onClick={() => {
                  resetFunction();
                  resetFilters();
                }}
                className="is-border common-button chart-reset download-span"
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
                    resetFilters();
                  }}
                  className="is-border common-button chart-reset download-span"
                >
                  Reset
                </button>
              )
            ) : cardChartId === 'stacked_chart' &&
              showBarof === 'Districts' ? (
              <button
                // id="chart-reset"
                type="button"
                onClick={() => {
                  resetFunction();
                }}
                className="is-border common-button chart-reset download-span"
              >
                Reset
              </button>
            ) : null}
            {cardChartId !== 'sunburst' && (
              <span
                className="download-span"
                onClick={() => {
                  notificationHandler();
                  downloadPng(cardChartId, modalHeader);
                }}
                onKeyDown={() => {
                  notificationHandler();
                  downloadPng(cardChartId, modalHeader);
                }}
                role="button"
                tabIndex="-1"
              >
                <img src={DownloadIcon} alt="open" />
              </span>
            )}
            {!disableExpand && (
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
                className="zoom expand-span"
                popup-link="graph-modal"
              >
                <img src={ExpandIcon} alt="open" />
              </span>
            )}
          </div>
        </div>
        <div className="card-body" style={style} id={cardChartId}>
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
